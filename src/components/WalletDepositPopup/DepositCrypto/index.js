
import { useCallback, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import {convertCurrency, generateCryptopayChannel} from '../../../api/index';
import { numberWithCommas } from 'utils/common';
import Dropdown from 'components/Dropdown';
import {ReactComponent as LeftArrow} from '../../../data/icons/deposit/left-arrow.svg';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import {connect} from 'react-redux';
import { TOKEN_NAME } from 'constants/Token';
import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import QRCode from 'react-qr-code';
import classNames from 'classnames';
import { TransactionActions } from 'store/actions/transaction';

const cryptoShortName = {
  BITCOIN: 'BTC',
  ETHEREUM: `ETH`,
  LITECOIN: `LTC`,
  USDT: 'USDT',
  USDC: 'USDC',
  DAI: 'DAI',
  XRP: 'XRP',
};

const CURRENCY_OPTIONS = [
  {
    label: 'BITCOIN',
    value: 0,
  },
  {
    label: 'ETHEREUM',
    value: 1,
  },
  {
    label: 'LITECOIN',
    value: 2,
  },
  {
    label: 'USDT',
    value: 3,
  },
  {
    label: 'USDC',
    value: 4,
  },
  {
    label: 'DAI',
    value: 5,
  },
  {
    label: 'XRP',
    value: 6,
  },
];

const DepositCrypto = ({ currency, showWalletDepositPopup, fetchWalletTransactions }) => {

  const [selectedCurrency, setSelectedCurrency] = useState(
    CURRENCY_OPTIONS.find(c => c.label === currency) ||  
    CURRENCY_OPTIONS[0]);

  //get updated prices from WS, without using call example = 1 WFAIR
  // const prices = useSelector(selectPrices);
  // console.log('prices', prices);
  // {
  //   "EUR": "0.016501625604087633",
  //   "USD": "0.018742263165526254",
  //   "BTC": "4.465285745077049e-7",
  //   "ETH": "0.000005988034703745713",
  //   "LTC": "0.00013593074842386602",
  //   "_updatedAt": "Thu, 20 Jan 2022 08:42:16 GMT"
  // }

  const [inputAmount, setInputAmount] = useState(0.1);
  const [tokenValue, setTokenValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [uri, setUri] = useState('');
  const [errorFetchingChannel, setErrorFetchingChannel] = useState(false);

  useEffect(() => {
    fetchWalletTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectContent = event => {
    event.target.select();
  }

  useEffect(() => {
    onInputAmountChange(inputAmount);
    fetchReceiverAddress(selectedCurrency.label);
  }, [selectedCurrency.label, inputAmount]);

  const fetchReceiverAddress = useCallback(async (tab) => {
    const currencyName = cryptoShortName[tab];
    const channel = await generateCryptopayChannel({ currency: currencyName });

    if(channel.error) {
      return setErrorFetchingChannel(true);
    }

    setErrorFetchingChannel(false);
    setAddress(channel.address);
    setUri(channel.uri);
  }, [selectedCurrency.label]);

  const onInputAmountChange = useCallback(async (value) => {
    setInputAmount(value);
    if (value > 0) {
      const convertCurrencyPayload = {
        convertFrom: cryptoShortName[selectedCurrency.label],
        convertTo: 'WFAIR',
        amount: value,
      };

      const { response } = await convertCurrency(convertCurrencyPayload);
      const data = response.data;
      const convertedTokenValue = !data.convertedAmount
        ? 0
        : parseFloat(data.convertedAmount).toFixed(4);

      const roundedAmount = Math.floor(Number(convertedTokenValue) * 100) / 100;
      let WfairTokenValue = !roundedAmount
        ? 0
        : roundedAmount;

      setTokenValue(WfairTokenValue);

      const calculatedTotal = Math.floor(WfairTokenValue * 100) / 100;

      setTotal(calculatedTotal);

    } else {
      setTokenValue(0);
      setTotal(0)
    }
  }, [selectedCurrency.label]);

  const onCurrencyChange = val => {
    setSelectedCurrency(CURRENCY_OPTIONS.find(c => c.value === val));
  };

  const renderBackButton = () => {
    return (
      <div className={styles.chooseOtherMethod} onClick={showWalletDepositPopup}>
        <LeftArrow />
        <span>Other payment methods</span>
      </div>
    )
  }

  return (
    <div className={styles.depositCrypto}>
      {/* <p className={styles.title}>

        WFAIR conversion calculator
      </p>
      <p>
        Wallfair uses WFAIR currency to play games and win. You can convert your won WFAIR token back into crypto currency  or in EUR / USD at any time around the world.
      </p> */}

      {renderBackButton()}

      <p className={styles.title}>
        Deposit with Crypto
      </p>
      <p>
        Deposit BTC, ETH or LTC and start playing immediately.
      </p>

      {/* Currency */}
      <div className={styles.formGroupContainer}>
        <span>Choose your currency</span>
        <div className={styles.inputContainer}>
          <Dropdown
            className={styles.dropdown}
            value={selectedCurrency.label}
            placeholder="Select currency..."
            setValue={onCurrencyChange}
            options={CURRENCY_OPTIONS}
          />
        </div>
      </div>


      {!errorFetchingChannel && (
        <div className={styles.transferInformation}>
          <div className={styles.qrCodeImg}>
            {uri && <QRCode value={uri} size={125} />}
          </div>
          <p>Send any amount of {cryptoShortName[selectedCurrency.label]} to the following address<sup>*</sup></p>
          <div className={styles.addressCopy}>
            <ReferralLinkCopyInputBox
              inputTheme={InputBoxTheme.copyToClipboardInputWhite}
              forDeposit={address}
            />
          </div>
        </div>
      )}

      {errorFetchingChannel && (
        <div
          className={classNames(
            styles.transferInformation,
            styles.channelFetchError
          )}
        >
          <p>Wallet address currently not available.</p>
        </div>
      )}

      <div className={styles.formGroupContainer}>
        <span>Conversion Calculator</span>
        <div className={styles.inputContainer}>
          <NumberCommaInput
            value={inputAmount}
            min={0}
            max={2000}
            onChange={setInputAmount}
            onClick={selectContent}
          />
          <div className={styles.inputRightContainer}>
            <div className={styles.coinWrapper}>
              <span>{cryptoShortName[selectedCurrency.label]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.overview}>
        <p className={styles.title}>
          Deposit Overview
        </p>
        <div className={styles.overviewItem}>
          <span>Estimate</span><span>{numberWithCommas(tokenValue)} {TOKEN_NAME}</span>
        </div>
        <hr/>
      </div>

      <div className={styles.summary}>
        <span>Add to Wallfair Account in WFAIR</span>
        <p className={styles.summaryTotal}>{numberWithCommas(total)} {TOKEN_NAME}</p>
      </div>

      {!errorFetchingChannel && (
        (selectedCurrency.label === 'BITCOIN' &&
            <p className={styles.depositNotes}>

              <sup>*</sup>Send any amount of BTC to the following address. 1 confirmation is required. We do not accept BEP20 from Binance.
              Wallfair does not accept bitcoin that originates from any Mixing services; please refrain from depositing directly or indirectly from these services.
            </p>
          )
        ||
        (selectedCurrency.label === 'ETHEREUM' &&
          <p className={styles.depositNotes}>

            <sup>*</sup>Send any amount of ETH to the following address. 3 confirmations is required.
            Wallfair does not accept Ethereum that originates from any Mixing services; please refrain from depositing directly or indirectly from these services.
          </p>
        )
        ||
        (selectedCurrency.label === 'LITECOIN' &&
          <p className={styles.depositNotes}>

            <sup>*</sup>Send any amount of LTC to the following address. 3 confirmations is required.
            Wallfair does not accept Litecoin that originates from any Mixing services; please refrain from depositing directly or indirectly from these services.
          </p>
        )
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const user = state.authentication;
  return {
    user,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    showWalletDepositPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositCrypto);

