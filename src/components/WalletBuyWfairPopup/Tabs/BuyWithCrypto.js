import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import Dropdown from '../../Dropdown';
import { ReactComponent as ArrowUp } from '../../../data/icons/arrow_up_icon.svg';
import { ReactComponent as ArrowDown } from '../../../data/icons/arrow_down_icon.svg';
import { ReactComponent as BitcoinIcon } from '../../../data/icons/bitcoin-symbol.svg';
import { ReactComponent as EthereumIcon } from '../../../data/icons/ethereum-symbol.svg';
import { ReactComponent as LitecoinIcon } from '../../../data/icons/litecoin-symbol.svg';
import { ReactComponent as WfairIcon } from '../../../data/icons/wfair-symbol.svg';
import {convertCurrency, generateCryptopayChannel, sendBuyWithCrypto} from '../../../api/index'
import classNames from 'classnames';
import { numberWithCommas, shortenAddress } from '../../../utils/common';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import { addMetaMaskEthereum } from 'utils/helpers/ethereum';
import QRCode from 'react-qr-code';
import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';
import { TOKEN_NAME } from 'constants/Token';
import Button from 'components/Button';
import useDebounce from 'hooks/useDebounce';
import Text from 'helper/Text';

const cryptoShortName = {
  bitcoin: 'BTC',
  ethereum: `ETH`,
  litecoin: `LTC`,
};

const BuyWithCrypto = () => {
  const [currency, setCurrency] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);
  const [activeTab, setActiveTab] = useState('bitcoin');
  const [address, setAddress] = useState('');
  const [uri, setUri] = useState('');
  const [errorFetchingChannel, setErrorFetchingChannel] = useState(false);

  useEffect(() => {
    onCurrencyChange(currency);
    fetchReceiverAddress(activeTab);
  }, [activeTab]);

  const handleWFAIRClick = useCallback(async () => {
    await addMetaMaskEthereum();
  }, []);

  const selectContent = event => {
    event.target.select();
  };

  const fetchReceiverAddress = useCallback(async (tab) => {
    const currencyName = cryptoShortName[tab];
    const channel = await generateCryptopayChannel({ currency: currencyName });
    
    if(channel.error) {
      return setErrorFetchingChannel(true);
    }

    setErrorFetchingChannel(false);
    setAddress(channel.address);
    setUri(channel.uri);
  }, [activeTab]);

  const onCurrencyChange = useCallback(async (value) => {
    setCurrency(value);
    if (value > 0) {
      const convertCurrencyPayload = {
        convertFrom: cryptoShortName[activeTab],
        convertTo: 'WFAIR',
        amount: value,
      };

      const { response } = await convertCurrency(convertCurrencyPayload);
      const { convertedAmount } = response?.data;
      const convertedTokenValue = !convertedAmount
        ? 0
        : convertedAmount.toFixed(4);

      const roundedAmount = Math.floor(Number(convertedTokenValue) * 100) / 100;
      let WfairTokenValue = !roundedAmount
        ? 0
        : numberWithCommas(roundedAmount);

      setTokenValue(WfairTokenValue);
    }
  }, [activeTab]);

  const onChangeAmount = useDebounce({
    callback: onCurrencyChange,
    delay: 500,
  });

  return (
    <div className={styles.buyWithCryptoContainer}>
      {/* Crypto Tabs */}
      <div className={styles.cryptoTabsContianer}>
        <div
          className={classNames(
            styles.cryptoTab,
            activeTab === 'bitcoin' && styles.cryptoTabActive
          )}
          onClick={() => setActiveTab('bitcoin')}
        >
          <BitcoinIcon />
          <p className={styles.fullName}>Bitcoin</p>
          <p className={styles.shortName}>BTC</p>
        </div>
        <div
          className={classNames(
            styles.cryptoTab,
            activeTab === 'ethereum' && styles.cryptoTabActive
          )}
          onClick={() => setActiveTab('ethereum')}
        >
          <EthereumIcon />
          <p className={styles.fullName}>Ethereum</p>
          <p className={styles.shortName}>ETH</p>
        </div>
        <div
          className={classNames(
            styles.cryptoTab,
            activeTab === 'litecoin' && styles.cryptoTabActive
          )}
          onClick={() => setActiveTab('litecoin')}
        >
          <LitecoinIcon />
          <p className={styles.fullName}>Litecoin</p>
          <p className={styles.shortName}>LTC</p>
        </div>
      </div>

      {/* Crypto Calculator */}
      <div className={styles.cryptoCalculatorContainer}>
        {/* Content */}
        <div className={styles.cryptoContent}>
          <p>
            To deposit {cryptoShortName[activeTab]}, simply make a transfer to
            the wallet provided below.
          </p>
        </div>

        {/* QR code and address */}
        {!errorFetchingChannel && (
          <div className={styles.transferInformation}>
            <div className={styles.qrCodeImg}>
              {uri && <QRCode value={uri} size={125} />}
            </div>
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
            <p>Currently not available.</p>
          </div>
        )}

        <div className={styles.cryptoContent}>
          <p>
            Use the calculator to estimate how much WFAIR you can get by
            depositing cryptos.
          </p>
        </div>

        {/* Currency */}

        <div className={styles.cryptoInputsWrapper}>
          <div className={styles.cryptoInputContiner}>
            <div className={styles.labelContainer}>
              <span>You pay</span>
            </div>
            <NumberCommaInput
              value={currency}
              min={0}
              max={2000}
              onChange={onChangeAmount}
              onClick={selectContent}
            />
            <div className={styles.inputRightContainer}>
              {activeTab === 'bitcoin' && (
                <>
                  <BitcoinIcon />
                  BTC
                </>
              )}
              {activeTab === 'ethereum' && (
                <>
                  <EthereumIcon />
                  ETH
                </>
              )}
              {activeTab === 'litecoin' && (
                <>
                  <LitecoinIcon />
                  LTC
                </>
              )}
            </div>
          </div>

          {/* WFAIR TOKEN */}
          <div className={styles.cryptoInputContiner}>
            <div className={styles.labelContainer}>
              <span>You receive (estimate)</span>
            </div>
            <input disabled readOnly value={tokenValue} />
            <div className={styles.inputRightContainer}>
              <WfairIcon
                className={styles.wfairLogo}
                onClick={handleWFAIRClick}
              />
              <span>{TOKEN_NAME}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyWithCrypto;
