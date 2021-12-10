import React, { useCallback, useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import { ReactComponent as WfairIcon } from '../../../data/icons/wfair-symbol.svg';
import Dropdown from '../../Dropdown';
import { convertCurrency, getUserKycData } from '../../../api/index';
import transakSDK from '@transak/transak-sdk';
import transakConfig from 'constants/transakConfig';
import { numberWithCommas } from '../../../utils/common';
import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import classNames from 'classnames';
import { addMetaMaskEthereum } from 'utils/helpers/ethereum';
import * as _ from 'lodash';
import { TransactionActions } from 'store/actions/transaction';

const BuyWithFiatTab = ({ hidePopup , showWalletBuyWfairPopup, showTransakSuccessPopup, user, fetchWalletTransactions }) => {
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
  const [WFAIRToken, setWFAIRToken] = useState(0);
  const [userKycData, setUserKycData] = useState(null);
  const [userKyc, setUserKyc] = useState(null);

  const handleWFAIRClick = useCallback(async () => {
    await addMetaMaskEthereum();
  }, []);

  const transakPopUp = (userData) => {
    transakConfig.partnerCustomerId = user.userId
    transakConfig.fiatAmount = currency;
    transakConfig.fiatCurrency = selectedCurrency.label.toLocaleUpperCase();
    transakConfig.email = user.email;
    transakConfig.userData = userData;
    console.log(currency);
    let transak = new transakSDK(transakConfig);
    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, data => {
      // console.log(data);
    });

    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, data => {
      // in case required to trigger a function on close
      showWalletBuyWfairPopup()
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, orderData => {
      console.log({orderData});
      showTransakSuccessPopup(
      {
        fiatAmount: orderData.status.fiatAmount,
        fiatCurrency: orderData.status.fiatCurrency,
        cryptoAmount: orderData.status.cryptoAmount,
        cryptoCurrency: orderData.status.cryptoCurrency,
        equivalenceWFAIR: WFAIRToken,
        explorer: orderData.status.walletLink,
      });
      transak.close();

      fetchWalletTransactions();

    });
  };

  useEffect(() => {
    currencyLostFocus();
  }, [selectedCurrency]);

  const selectContent = event => {
    event.target.select();
  }

  const currencyChange = event => {
    const inputCurrency = event.target.value > 2000 ? 2000 : event.target.value;
    setCurrency(inputCurrency);
  }

  const currencyLostFocus = async (event) => {
    if (currency > 0) {

      const convertCurrencyPayload = {
        convertFrom: selectedCurrency.label.toLocaleUpperCase(),
        convertTo: 'WFAIR',
        amount: currency
      };

      const { response } = await convertCurrency(convertCurrencyPayload);
      const { convertedAmount } = response?.data;
      const adjustedAmount = convertedAmount * 0.9; //90% of estimated amount to consider Transak fees
      const roundedAmount = Math.floor(Number(adjustedAmount) * 100) / 100;

      let WfairTokenValue = !roundedAmount ? 0 : numberWithCommas(roundedAmount);

      setWFAIRToken(WfairTokenValue);
    }
  }

  useEffect(() => {
    // reload kyc only if has really changed
    const one = _.omit(user.kyc, [ '_id']);
    const two = _.omit(userKyc, [ '_id']);
    if(!_.isEqual(one, two)){
      setUserKyc({...user.kyc});
      fetchUserKycData(user);
    }
  }, [user]);

  const fetchUserKycData = async user => {
    if(!user?.kyc?.uid) {
      setUserKycData(null);
      return;
    }
    const userKycDataResponse = await getUserKycData(user.userId).catch(err => {
      console.error("Can't get user kyc data by id:", err);
    });
    setUserKycData(userKycDataResponse?.response?.data?.userInfo);
  };

  const extractFirstLastFromFullname = (name) => {
    var nameParts = ['',''];
    if(!name) return nameParts;

    name = name.trim();
    if(name.indexOf(' ') > -1) {
      let split = name.split(' ');
      nameParts[0] = split[0];
      nameParts[1] = split.splice(1).join(' ');
    } else if(name.length > 0){
      const middle = name.length/2;
      nameParts[0] = name.substring(0, middle);
      nameParts[1] = name.substring(middle, name.length);
    }
    return nameParts;
  }
  const OnClickTransakContinue = async () => {
    hidePopup();
    console.log('user kyc:', user?.kyc);
    if(!user.kyc){
      // this should open kyc in fractal first
      // const kycUrl = ApiUrls.BACKEND_URL + ApiUrls.KYC_START_FOR_USER.replace(':userId', user.userId);
      // window.open(kycUrl, "fractal", "width=480,height=700,top=150,left=150");
      transakPopUp(null);
    }
    else {
      /*
      FRACTAL INFO
      date_of_birth,
      full_name,
      identification_document_country,
      identification_document_number,
      identification_document_type,
      place_of_birth,
      residential_address,
      residential_address_country,
      */
      var fract = {...userKycData};
      const nameParts = extractFirstLastFromFullname(fract.full_name);
      var transakUserData = {
        "firstName": nameParts[0],
        "lastName": nameParts[1],
        "email": user.email,
        "mobileNumber": null,//"+19692154942",
        "dob": fract.date_of_birth,//"1994-11-26",
        "address": {
            "addressLine1": fract.residential_address,
            "addressLine2": null,
            "city": null,//"San Francisco",
            "state": null,//"CA",
            "postCode": null,//"94111",
            "countryCode": fract.residential_address_country
        }
      };
      transakPopUp(transakUserData);
    }
  };

  const onCurrencyChange = val => {
    setSelectedCurrency(CURRENCY_OPTIONS.find(c => c.value === val));
  };

  return (
    <div className={styles.buyWithFiatTabContainer}>
      <div className={styles.wfairCalculatorContainer}>
        {/* Currency */}
        <div className={styles.inputContiner}>
          <div className={styles.labelContainer}>
            <span>You pay</span>
          </div>
          <input
            type="number"
            value={currency}
            min={1}
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
        {/* WFAIR TOKEN */}
        <div className={styles.inputContiner}>
          <div className={styles.labelContainer}>
            <span>You receive (estimate)</span>
          </div>
          <input disabled readOnly value={WFAIRToken} />
          <div className={styles.inputRightContainer}>
            <div className={styles.coinWrapper}>
              <WfairIcon className={styles.wfairLogo} onClick={handleWFAIRClick} /><span>WFAIR</span>
            </div>
          </div>
        </div>
        <div className={styles.textContainer}>
          <p>The value shown in WFAIR is an estimate. Transactions are subject to price fluctuations.</p>
          <p>All transactions are processed via the external partner Transak.com. When you click the button below, you will be redirected to the partner page to complete the transaction.</p>
        </div>
        <button
          className={classNames(styles.transankContineButton, currency === 0 ? styles.disabled : null)}
          onClick={OnClickTransakContinue}
          disabled={currency === 0}
        >
          Continue with Transak
        </button>
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



export default connect(mapStateToProps, mapDispatchToProps)(BuyWithFiatTab);
