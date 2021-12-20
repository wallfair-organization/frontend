// import React, { useCallback, useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
// import InputLineSeparator from '../../../data/images/input_line_separator.png';
// import { ReactComponent as WfairIcon } from '../../../data/icons/wfair-symbol.svg';
// import Dropdown from '../../Dropdown';
// import { convertCurrency } from '../../../api/index';
// import { numberWithCommas } from '../../../utils/common';
import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import classNames from 'classnames';
// import { addMetaMaskEthereum } from 'utils/helpers/ethereum';
// import * as _ from 'lodash';
import { TransactionActions } from 'store/actions/transaction';
// import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';
// import { TOKEN_NAME } from 'constants/Token';
import Button from 'components/Button';

const BuyWithFiatWallfairWebsiteTab = () => {
  // const CURRENCY_OPTIONS = [
  //   {
  //     label: 'EUR',
  //     value: 0,
  //   },
  //   {
  //     label: 'USD',
  //     value: 1,
  //   },
  // ];
  // const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);
  // const [currency, setCurrency] = useState(0);
  // // const [WFAIRToken, setWFAIRToken] = useState(0);

  // // const handleWFAIRClick = useCallback(async () => {
  // //   await addMetaMaskEthereum();
  // // }, []);

  // // useEffect(() => {
  // //   currencyLostFocus();
  // // }, [selectedCurrency]);

  // // const selectContent = event => {
  // //   event.target.select();
  // // }

  // // const currencyChange = value => {
  // //   const inputCurrency = value > 2000 ? 2000 : value;
  // //   setCurrency(inputCurrency);
  // // }

  // const currencyLostFocus = async (event) => {
  //   if (currency > 0) {

  //     const convertCurrencyPayload = {
  //       convertFrom: selectedCurrency.label.toLocaleUpperCase(),
  //       convertTo: 'WFAIR',
  //       amount: currency
  //     };

  //     const { response } = await convertCurrency(convertCurrencyPayload);
  //     const { convertedAmount } = response?.data;
  //     const adjustedAmount = convertedAmount * 0.9; //90% of estimated amount to consider Transak fees
  //     const roundedAmount = Math.floor(Number(adjustedAmount) * 100) / 100;

  //     let WfairTokenValue = !roundedAmount ? 0 : numberWithCommas(roundedAmount);

  //     setWFAIRToken(WfairTokenValue);
  //   }
  // }

  // const onCurrencyChange = val => {
  //   setSelectedCurrency(CURRENCY_OPTIONS.find(c => c.value === val));
  // };

  return (
    <div className={styles.buyWithFiatTabContainer}>
       <div className={styles.wfairCalculatorContainer}>

      {/*  <div className={styles.inputContiner}>
          <div className={styles.labelContainer}>
            <span>You pay</span>
          </div>
          <NumberCommaInput
            value={currency}
            min={0}
            max={2000}
            onChange={currencyChange}
            onBlur={currencyLostFocus}
            onClick={selectContent}
          />
          <div className={styles.inputRightContainer}>
            <div className={styles.innerContiner}>
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
        <div className={styles.InputLineSeparator}>
          <img src={InputLineSeparator} alt="input_line_separator" />
        </div>
        <div className={styles.inputContiner}>
          <div className={styles.labelContainer}>
            <span>You receive (estimate)</span>
          </div>
          <input disabled readOnly value={WFAIRToken} />
          <div className={styles.inputRightContainer}>
            <div className={styles.coinWrapper}>
              <WfairIcon
                className={styles.wfairLogo}
                onClick={handleWFAIRClick}
              />
              <span>{TOKEN_NAME}</span>
            </div>
          </div>
        </div> */}
        
        <div className={styles.textContainer}>
          <p>
            The alpacasino is powered by the WFAIR tokens and technology.
            While the humans are working to integrate a payment gateway, you can buy WFAIR tokens on the Wallfair website!
          </p>
          <p>
            Once you have bought WFAIR tokens, you can deposit them in the alpacasino!
          </p>
          <p>
            In case of any questions, please get in touch with our <span onClick={() => {window.fcWidget.open()}}>Support</span>. 
          </p>
        </div>
        <a
          href="https://wallfair.io/buy-wfair"
          target="_blank"
          rel="noreferrer">
          <Button
            className={classNames(
              styles.button,
              // currency === 0 ? styles.disabled : null
            )}
    
            // disabled={currency === 0}
          >
            Buy WFAIR at wallfair.io
          </Button>
        </a>
      </div>
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
    showWalletBuyWfairPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletBuyWfair }));
    },
    showTransakSuccessPopup: (options) => {
      dispatch(PopupActions.show({ popupType: PopupTheme.transakSuccess, options}));
    },
    getUserInfoFromFractal: (options) => {
      dispatch(PopupActions.show({ popupType: PopupTheme.transakSuccess, options}));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(BuyWithFiatWallfairWebsiteTab);
