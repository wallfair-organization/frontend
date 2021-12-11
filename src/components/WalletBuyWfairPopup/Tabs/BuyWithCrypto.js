import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import Dropdown from '../../Dropdown';
import { ReactComponent as ArrowUp } from '../../../data/icons/arrow_up_icon.svg';
import { ReactComponent as ArrowDown } from '../../../data/icons/arrow_down_icon.svg';
import { ReactComponent as BitcoinIcon } from '../../../data/icons/bitcoin-symbol.svg';
import { ReactComponent as EthereumIcon } from '../../../data/icons/ethereum-symbol.svg';
import { ReactComponent as LitecoinIcon } from '../../../data/icons/litecoin-symbol.svg';
import { ReactComponent as WfairIcon } from '../../../data/icons/wfair-symbol.svg';
import { convertCurrency } from '../../../api/index';
import classNames from 'classnames';
import { numberWithCommas } from '../../../utils/common';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import { addMetaMaskEthereum } from 'utils/helpers/ethereum';
import QRCode from 'react-qr-code';
import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';

const cryptoShortName = {
  bitcoin: 'BTC',
  ethereum: `ETH`,
  litecoin: `LTC`,
};
const cryptoRegexFormat = {
  bitcoin: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/g,
  ethereum: /^0x[a-fA-F0-9]{40}$/g,
  litecoin: /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/g,
};

const depositAddress = {
  bitcoin: process.env.REACT_APP_DEPOSIT_WALLET_BITCOIN,
  ethereum: process.env.REACT_APP_DEPOSIT_WALLET_ETHEREUM,
  litecoin: process.env.REACT_APP_DEPOSIT_WALLET_LITECOIN,
};

const BuyWithCrypto = () => {
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
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [currency, setCurrency] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);
  const [activeTab, setActiveTab] = useState('bitcoin');
  const [address, setAddress] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [url, setUrl] = useState('');
  const [transaction, setTransaction] = useState(false);

  useEffect(() => {
    currencyLostFocus();
    setCryptoAddress('')
  }, [activeTab, selectedCurrency]);

  const handleWFAIRClick = useCallback(async () => {
    await addMetaMaskEthereum();
  }, []);

  const selectContent = event => {
    event.target.select();
  };

  const currencyChange = value => {
    const inputCurrency = value > 2000 ? 2000 : value;
    setCurrency(inputCurrency);
  };

  const currencyLostFocus = async event => {
    if (currency > 0) {
      const convertCurrencyPayload = {
        convertFrom: cryptoShortName[activeTab],
        convertTo: 'WFAIR',
        amount: currency,
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
  };

  const OnClickConfirmAmount = () => {
    setAddress(depositAddress[activeTab]);
    setTransaction(!transaction);
  };

  const cryptoAddressChange = useCallback(event => {
  const inputAddress = event.target.value;
  setCryptoAddress(inputAddress);
}, []);

const cryptoAddressLostFocus = useCallback(event => {
  const inputAddress = event.target.value;
  const regex = cryptoRegexFormat[activeTab];
  const valid = inputAddress.match(regex);

  if (!valid) {
    console.error(`wrong ${activeTab} address format`);
    return;
  }

  setCryptoAddress(inputAddress);
}, []);


  return (
    <div className={styles.buyWithCryptoContainer}>
      {!transaction && (
        <>
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
            {/* Crypto Address */}
            <div className={styles.addressInputContainer}>
              <div className={styles.labelContainer}>
                <span>{activeTab} Wallet Address</span>
              </div>
              <input
                type="text"
                value={cryptoAddress}
                onChange={cryptoAddressChange}
                onBlur={cryptoAddressLostFocus}
                onClick={selectContent}
                placeholder={`Add your ${cryptoShortName[activeTab]} wallet address`}
              />
            </div>

            {/* Currency */}
            <div className={styles.cryptoInputContiner}>
              <div className={styles.labelContainer}>
                <span>You pay</span>
              </div>
              <NumberCommaInput
                value={currency}
                min={1}
                max={2000}
                onChange={currencyChange}
                onBlur={currencyLostFocus}
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
                {/* <img src={WallfairInput} alt="wallfair-input" /> */}
              </div>
            </div>
            <div className={styles.InputLineSeparator}>
              <img src={InputLineSeparator} alt="input_line_separator" />
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
                <span>WFAIR</span>
              </div>
            </div>

            {/* Content */}
            <div className={styles.cryptoContent}>
              <p>
                Transactions with BTC, ETH and LTC are being manually processed
                for the time being, and can take a few hours. We intend to
                automate this in the next weeks.
              </p>
              <p>
                Please follow the instructions provided in the next step in
                order to use this method of deposit.
              </p>
            </div>

            <button
              className={classNames(
                styles.transankContineButton,
                currency === 0 ? styles.disabled : null
              )}
              onClick={OnClickConfirmAmount}
              disabled={currency === 0}
            >
              Confirm Amount
            </button>
          </div>
        </>
      )}

      {/* transaction Section */}
      {transaction && (
        <div className={styles.transactionContainer}>
          <div className={styles.transferSection}>
            <span
              className={styles.backBtn}
              onClick={() => setTransaction(false)}
            >
              Back
            </span>
            <p>
              Please transfer{' '}
              <span>
                {currency} {cryptoShortName[activeTab]}
              </span>{' '}
              to the following {cryptoShortName[activeTab]} Address
            </p>
            <div className={styles.qrCodeImg}>
              {address && <QRCode value={address} size={150} />}
            </div>
            <ReferralLinkCopyInputBox
              className={styles.referralLink}
              inputTheme={InputBoxTheme.copyToClipboardInputWhite}
              forDeposit={address}
            />
            <p>
              Once transaction is completed, please send proof of transaction
              via email to{' '}
              <a href="mailto:deposits@alpacasino.io?subject=Deposit">
                deposits@alpacasino.io
              </a>
            </p>
            {/* <div className={styles.transferSectionCopy}>
              <p>Send Transaction URL</p>
              <div className={styles.cryptoUrlContiner}>
                <input
                  type="text"
                  value={url}
                  placeholder="Paste URL here"
                  onChange={e => setUrl(e.target.value)}
                />
              </div>
            </div>
            <button className={styles.sendUrlBtn}> Send</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyWithCrypto;
