import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as LeftArrow } from '../../../data/icons/deposit/left-arrow.svg';
import Button from 'components/Button';
import PopupTheme from 'components/Popup/PopupTheme';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import {
  trackWalletFiatProceedPartner,
} from 'config/gtm';
import {
  convertCurrency,
  generateCryptopayChannel,
  generateMoonpayUrl,
} from 'api';
import { numberWithCommas } from 'utils/common';
import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';
import Dropdown from 'components/Dropdown';
import { TOKEN_NAME } from 'constants/Token';
import useDebounce from 'hooks/useDebounce';
import useDepositsCounter from 'hooks/useDepositsCounter';
import { LIMIT_BONUS } from 'constants/Bonus';
import { TransactionActions } from 'store/actions/transaction';

// const stagingGoerliRampURL = "https://ri-widget-staging-goerli2.firebaseapp.com/";
const productionRampURL = 'https://buy.ramp.network/';
const cryptoTransaction = 'BTC';

const CURRENCY_OPTIONS = [
  {
    label: 'EUR',
    value: 0,
  },
  {
    label: 'USD',
    value: 1,
  },
];

const DepositFiat = ({
  user,
  showWalletDepositPopup,
  fetchWalletTransactions,
  hidePopup,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [currency, setCurrency] = useState(100);
  const [WFAIRToken, setWFAIRToken] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [address, setAddress] = useState();
  const [errorFetchingChannel, setErrorFetchingChannel] = useState(false);
  const [loading, setLoading] = useState(false);
  const depositCount = useDepositsCounter();

  useEffect(() => {
    fetchWalletTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectContent = event => {
    event.target.select();
  };

  const onInputAmountChange = async event => {
    if (currency > 0) {
      const convertCurrencyPayload = {
        convertFrom: selectedCurrency.label.toLocaleUpperCase(),
        convertTo: 'WFAIR',
        amount: currency,
      };

      const { response } = await convertCurrency(convertCurrencyPayload);
      const { convertedAmount } = response?.data;
      const adjustedAmount = convertedAmount * 0.9; //90% of estimated amount to consider Transak fees
      const roundedAmount = Math.floor(Number(adjustedAmount) * 100) / 100;

      let WfairTokenValue = !roundedAmount ? 0 : roundedAmount;

      setWFAIRToken(WfairTokenValue);

      const expectedBonus =
        depositCount > 0 ? 0 : Math.min(LIMIT_BONUS, WfairTokenValue);
      setBonus(expectedBonus);
    }
  };

  useEffect(() => {
    onChangeAmount();
  }, [selectedCurrency, currency]);

  const fetchReceiverAddress = useCallback(async tab => {
    const channel = await generateCryptopayChannel({
      currency: cryptoTransaction,
    });

    if (channel.error) {
      return setErrorFetchingChannel(true);
    }

    setErrorFetchingChannel(false);
    setAddress(channel.address);
  }, []);

  useEffect(() => {
    fetchReceiverAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const OnClickContinue = async () => {
  //   if (currency && WFAIRToken) {
  //     try {
  //       trackWalletBuywithfiatRequest();
  //       sendBuyWithFiat({
  //         currency: selectedCurrency.label.toLocaleUpperCase(),
  //         userId: user.userId,
  //         email: user.email,
  //         amount: currency,
  //         estimate: WFAIRToken,
  //       });

  //       setRequestSent(true);
  //     } catch (err) {
  //       console.err('mail not sent!');
  //     }
  //   }
  // };

  const onChangeAmount = useDebounce({
    callback: onInputAmountChange,
    delay: 500,
  });

  const onCurrencyChange = val => {
    setSelectedCurrency(CURRENCY_OPTIONS.find(c => c.value === val));
  };

  const renderBackButton = () => {
    return (
      <div
        className={styles.chooseOtherMethod}
        onClick={showWalletDepositPopup}
      >
        <LeftArrow />
        <span>Other payment methods</span>
      </div>
    );
  };

  const getRampUrl = () => {
    if (address) {
      const rampUrl = `${productionRampURL}?swapAsset=${cryptoTransaction}&fiatValue=${currency}&fiatCurrency=${selectedCurrency.label}&userEmailAddress=${user.email}&userAddress=${address}`;
      window.open(rampUrl);
    }
  };

  const proceedWithMoonpay = async () => {
    const windowRef = window.open();

    setLoading(true);
    const res = await generateMoonpayUrl({
      amount: currency,
      currency: selectedCurrency.label,
    });

    if (res.response.data.url) {
      windowRef.location = res.response.data.url;
      setTimeout(() => hidePopup(), 1000);
    }

    setLoading(false);
  };

  const handlePartnerClick = () => {
    proceedWithMoonpay();
    trackWalletFiatProceedPartner();
  };

  return (
    <div className={styles.depositFiat}>
      {/* <p className={styles.title}>
        WFAIR conversion calculator
      </p>
      <p>
        Alpacasino uses WFAIR currency to play games and win. You can convert your won WFAIR token back into crypto currency or in EUR / USD at any time around the world.
      </p> */}

      {renderBackButton()}

      <p className={styles.title}>Buy with EUR / USD</p>
      <p>Deposit EUR or USD to start playing in a few hours.</p>

      {/* Currency */}
      <div className={styles.formGroupContainer}>
        <span>You pay</span>
        <div className={styles.inputContainer}>
          <NumberCommaInput
            value={currency}
            min={0}
            max={2000}
            onChange={setCurrency}
            // onBlur={onChangeAmount}
            onClick={selectContent}
          />
          <div className={styles.inputRightContainer}>
            <div className={styles.innerContainer}>
              <Dropdown
                style={styles.dropdown}
                value={selectedCurrency.label}
                placeholder="Select currency..."
                setValue={onCurrencyChange}
                options={CURRENCY_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>

      {/* WFAIR TOKEN */}
      <div className={styles.formGroupContainer}>
        <span>Estimate</span>
        <div className={styles.inputContainer}>
          <input disabled readOnly value={numberWithCommas(WFAIRToken)} />
          <div className={styles.inputRightContainer}>
            <div className={styles.coinWrapper}>
              <span>{TOKEN_NAME}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.overview}>
        <p className={styles.title}>Deposit Overview</p>
        <div className={styles.overviewItem}>
          <span>Estimate</span>
          <span>
            {numberWithCommas(WFAIRToken)} {TOKEN_NAME}
          </span>
        </div>
        <hr />
        <div className={styles.overviewItem}>
          <span>Bonus</span>
          <span className={styles.bonus}>
            {numberWithCommas(bonus)} {TOKEN_NAME}
          </span>
        </div>
        <hr />
        <div className={styles.overviewItem}>
          <span className={styles.total}>Total</span>
          <span className={styles.total}>
            {numberWithCommas(parseFloat(WFAIRToken) + parseFloat(bonus))}{' '}
            {TOKEN_NAME}
          </span>
        </div>
        <hr />
      </div>

      <div className={styles.summary}>
        <span>
          Incoming transactions are processed with <b>MATIC</b> via our
          supplier Moonpay. The value will be automatically converted to{' '}
          <b>WFAIR</b> once the transaction is completed.
        </span>
      </div>

      {currency > 0 && user.email && !loading ? (
        <Button onClick={() => handlePartnerClick()}>
          Proceed with partner
        </Button>
      ) : (
        <Button disabled>Proceed with partner</Button>
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
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositFiat);
