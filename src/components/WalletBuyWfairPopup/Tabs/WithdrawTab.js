import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../withdraw.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import _ from 'lodash';
import { ReactComponent as WfairIcon } from '../../../data/icons/wfair-symbol.svg';
import {
  getWithdrawQuote,
  processWithdraw,
  convertCurrency,
} from '../../../api/index';
import classNames from 'classnames';
import { ethers } from 'ethers';
import { numberWithCommas } from '../../../utils/common';
import { addMetaMaskEthereum } from 'utils/helpers/ethereum';
import WithdrawalSuccessPopup from 'components/WithdrawalSuccessPopup';
import { selectUser } from 'store/selectors/authentication';
import { useDispatch, useSelector } from 'react-redux';
import EthereumLogoActive from '../../../data/icons/ethereum-logo-icon-active.svg';
import PolygonLogoActive from '../../../data/icons/polygon-logo-active.svg';
import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';
import { TOKEN_NAME } from 'constants/Token';
import ReactTooltip from 'react-tooltip';
import { FormGroup } from 'components/Form';
import WithdrawalErrorPopup from 'components/WithdrawalErrorPopup';
import Button from 'components/Button';
import { RECAPTCHA_KEY } from 'constants/Api';
import { AlertActions } from 'store/actions/alert';

const minTokenWithdrawAmount = 1000;

const networkName = {
  polygon: 'MATIC',
  ethereum: 'ETH',
};

const WithdrawTab = () => {
  const fooRef = useRef(null);
  let addressRef = useRef(null);
  let amountRef = useRef(null);
  const dispatch = useDispatch();

  const account = ethers.utils.getAddress(window.ethereum?.selectedAddress);
  const [address, setAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [activeNetwork, setActiveNetwork] = useState(networkName.polygon);
  const [transaction, setTransaction] = useState(false);
  const [amountFees, setAmountFees] = useState(0);
  const [fiatEquivalence, setFiatEquivalence] = useState(0);
  const [responseProps, setResponseProps] = useState({});
  const [error, setError] = useState(null);
  const [submitButtonDisable, setSubmitButtonDisable] = useState(true);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [transactionFailedMessage, setTransactionFailedMessage] = useState('');

  const { balance } = useSelector(selectUser);

  useEffect(() => {
    const updateField = async () => {
      await updateReceiveField();
    };

    updateField();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNetwork]);

  useEffect(() => {
    account && setAddress(account);
  }, [account]);

  useEffect(() => {
    ReactTooltip.rebuild();

    if (error) {
      ReactTooltip.show(fooRef.current);
    } else {
      ReactTooltip.hide();
    }
  }, [fooRef, error]);

  useEffect(() => {
    const isAddressValid = isValidAdress(address);
    if (
      isAddressValid !== null &&
      isAddressValid &&
      error === null &&
      withdrawAmount > 0 &&
      tokenAmount >= minTokenWithdrawAmount
    ) {
      setSubmitButtonDisable(false);
    } else {
      setSubmitButtonDisable(true);
      validateInput();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, tokenAmount, withdrawAmount, address, setAddress]);

  const isValidAdress = address => {
    const regex = /^0x[a-fA-F0-9]{40}$/g;
    return address.match(regex);
  };

  const validateInput = options => {
    let formError = null;
    let fieldRef = null;

    if (address && !isValidAdress(address)) {
      formError = 'wrong 0x address format';
      fieldRef = addressRef.current;
    } else if (tokenAmount > 0 && tokenAmount < minTokenWithdrawAmount) {
      formError = `Minimum withdraw limit ${minTokenWithdrawAmount} WFAIR`;
      fieldRef = amountRef.current;
    } else if (withdrawAmount < 0) {
      formError = 'Please consider adding a higher amount to cover the fees';
      fieldRef = amountRef.current;
    }

    setError(formError);
    fooRef.current = fieldRef;

    return formError;
  };

  const renderSuccess = ({
    withdrawAmount,
    fiatEquivalence,
    amountFees,
    calculatedAmount,
  }) => {
    return (
      <WithdrawalSuccessPopup
        amountReceived={withdrawAmount}
        currency={'WFAIR'}
        wfairAmount={tokenAmount}
        fiatEquivalence={fiatEquivalence}
        calculatedAmount={calculatedAmount}
        fee={amountFees}
        network={activeNetwork === 'MATIC' ? 'POLYGON' : 'ETHEREUM'}
      />
    );
  };

  const selectContent = event => {
    event.target.select();
  };

  const handleWFAIRClick = useCallback(async () => {
    await addMetaMaskEthereum();
  }, []);

  const addressChange = event => {
    const inputAddress = event.target.value;
    setAddress(inputAddress);
  };

  const tokenAmountChange = value => {
    setTokenAmount(value);
  };

  useEffect(() => {
    let updateTimer = setTimeout(() => updateReceiveField(), 1 * 1000);

    return () => {
      clearTimeout(updateTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAmount]);

  const updateReceiveField = async () => {
    if (tokenAmount > 0) {
      const payload = {
        amount: tokenAmount,
        network: activeNetwork,
      };

      const { response, error } = await getWithdrawQuote(payload);
      if (error) {
        console.error(error.message);
        return;
      }

      const withdrawAmount = response?.data?.withdraw_amount || 0;
      const withdrawFee = response?.data?.withdraw_fee || 0;

      const parsedWithdrawAmount = parseFloat(withdrawAmount).toFixed(4);
      const parsedFees = parseFloat(withdrawFee).toFixed(4);

      setAmountFees(parsedFees);
      setWithdrawAmount(parsedWithdrawAmount);

      const convertCurrencyPayload = {
        convertFrom: 'USD',
        convertTo: 'WFAIR',
        amount: parsedWithdrawAmount,
      };

      const { response: responseConvertion } = await convertCurrency(
        convertCurrencyPayload
      );
      const { WFAIR } = responseConvertion?.data;
      const quoteUSD = WFAIR.quote?.USD.price;

      const marketValue =
        parsedWithdrawAmount > 0 &&
        Number(parsedWithdrawAmount * parseFloat(quoteUSD)).toFixed(2);
      let withdrawMarketValue = !marketValue
        ? 0
        : numberWithCommas(marketValue);

      setFiatEquivalence(withdrawMarketValue);
    } else {
      setWithdrawAmount(0);
    }
  };

  const handleReCaptchaVerify = () => {
    return new Promise((resolve, _) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(RECAPTCHA_KEY, { action: 'join' })
          .then(token => {
            resolve(token);
          })
      });
    });
  };

  const handleWithdraw = async () => {

    const recaptchaToken = await handleReCaptchaVerify();
    if (!recaptchaToken) {
      dispatch(AlertActions.showError('Recaptcha verification failed! Please try again!'));
      return;
    }

    const payload = {
      amount: tokenAmount,
      network: activeNetwork,
      toAddress: address,
      recaptchaToken
    };

    const { response, error } = await processWithdraw(payload);
    if (error) {
      console.error(error);
      console.error(error.message);
      setTransactionFailedMessage(error.message);
      setTransactionFailed(true);
      return;
    }

    const {
      withdraw_amount: calculatedAmount,
      withdraw_fee: amountFees,
      network,
      external_transaction_id: externalTransactionId,
    } = response?.data;

    setTransaction(true);
    setResponseProps({
      withdrawAmount: tokenAmount,
      calculatedAmount,
      amountFees,
      fiatEquivalence,
      network,
      externalTransactionId,
    });
  };

  const onClickMax = () => {
    setTokenAmount(balance);
    // tokenAmountLostFocus(balance);
  };

  return (
    <div className={styles.withdrawContainer}>
      {!transaction && !transactionFailed && (
        <>
          <h2>Withdraw</h2>
          {/* Crypto Tabs */}
          <div className={styles.cryptoTabsContainer}>
            <div
              className={classNames(
                styles.cryptoTab,
                activeNetwork === networkName.polygon
                  ? styles.cryptoTabActive
                  : styles.cryptoTabInactive
              )}
              onClick={() => setActiveNetwork(networkName.polygon)}
            >
              <img
                className={styles.imageSizePolygon}
                src={PolygonLogoActive}
                alt="Polygon Logo"
              />
            </div>
            <div
              className={classNames(
                styles.cryptoTab,
                activeNetwork === networkName.ethereum
                  ? styles.cryptoTabActive
                  : styles.cryptoTabInactive
              )}
              onClick={() => setActiveNetwork(networkName.ethereum)}
            >
              <img
                className={styles.imageSizeEthereum}
                src={EthereumLogoActive}
                alt="Ethereum Logo"
              />
            </div>
          </div>

          {/* Input Fields */}
          <div className={styles.inputFieldsContainer}>
            <ReactTooltip
              getContent={() => error}
              place="bottom"
              effect="solid"
              type="error"
              backgroundColor={'#ff0000'}
              className={styles.stepsTooltipError}
            />
            <FormGroup
              className={styles.addressInputContainer}
              data-tip
              rootRef={ref => (addressRef.current = ref)}
              data-event="none"
              data-event-off="dblclick"
            >
              <div className={styles.labelContainer}>
                <span>
                  {activeNetwork === networkName.polygon &&
                    'Polygon Wallet Address'}
                  {activeNetwork === networkName.ethereum &&
                    'Ethereum Wallet Address'}
                </span>
              </div>
              <input
                type="text"
                value={address}
                onChange={addressChange}
                onBlur={validateInput}
                onClick={selectContent}
                disabled={true}
                placeholder={`Add your ${
                  activeNetwork === networkName.polygon ? 'Polygon' : 'Ethereum'
                } wallet address`}
              />
            </FormGroup>
            {/* Currency
            <div className={styles.addressInputContainer}>
              <div className={styles.labelContainer}>
                <span>
                  {activeNetwork === networkName.polygon &&
                    'Polygon Wallet Address'}
                  {activeNetwork === networkName.ethereum &&
                    'Ethereum Wallet Address'}
                </span>
              </div>
              <input
                type="text"
                value={address}
                onChange={addressChange}
                onBlur={addressLostFocus}
                onClick={selectContent}
                placeholder={`Add your ${
                  activeNetwork === networkName.polygon ? 'Polygon' : 'Ethereum'
                } wallet address`}
              />
            </div> */}

            <div className={styles.balanceContainer}>
              <span>
                Balance: {numberWithCommas(parseFloat(balance).toFixed(2))}{' '}
                {TOKEN_NAME}
              </span>
            </div>

            {/* WFAIR TOKEN */}
            <FormGroup
              className={styles.cryptoInputContainer}
              data-tip
              rootRef={ref => (amountRef.current = ref)}
              data-event="none"
              data-event-off="dblclick"
            >
              <div className={styles.labelContainer}>
                <span>Amount you wish to withdraw</span>
              </div>
              <NumberCommaInput
                min={0}
                max={balance}
                value={tokenAmount}
                onChange={tokenAmountChange}
                onClick={selectContent}
              />
              <div className={styles.inputRightContainer}>
                <WfairIcon
                  className={styles.wfairLogo}
                  onClick={handleWFAIRClick}
                />
                <span>{TOKEN_NAME}</span>
                <span className={styles.button} onClick={onClickMax}>
                  Max
                </span>
              </div>
            </FormGroup>
            <div className={styles.InputLineSeparator}>
              <img src={InputLineSeparator} alt="input_line_separator" />
            </div>
            {/* WFAIR TOKEN */}
            <div className={styles.cryptoInputContainer}>
              <div className={styles.labelContainer}>
                <span>You receive (estimate)</span>
                <span className={styles.gasFeeLabel}>
                  {amountFees > 0 &&
                    `Fee: ±${parseFloat(amountFees).toFixed(2)} ${TOKEN_NAME}`}
                </span>
              </div>
              <input disabled readOnly value={withdrawAmount} />
              <div className={styles.inputRightContainer}>
                <WfairIcon
                  className={styles.wfairLogo}
                  onClick={handleWFAIRClick}
                />
                <span>{TOKEN_NAME}</span>
              </div>
            </div>
            <div className={styles.equivalentFiat}>
              <span>Estimated market value: ± ${fiatEquivalence}</span>
            </div>

            {/* <div className={styles.calculation}>
            <p>Estimated Transaction Fee: 123 {TOKEN_NAME} </p>
            
            <p><b>You receive (estimate): 111 {TOKEN_NAME} </b></p>
          </div> 
          */}

            {/* Content */}
            <div className={styles.cryptoContent}>
              <p>
                Before proceeding, please double check that the wallet address
                is correct. Transactions are irreversible, and if you put the
                wrong address, your funds will be lost.
              </p>
            </div>

            <Button
              className={classNames(
                // styles.confirmButton,
                submitButtonDisable ? styles.disabled : null
              )}
              onClick={handleWithdraw}
              disabled={submitButtonDisable}
              // disabled={tokenAmount === 0 && error.length > 0 ?}
            >
              Confirm Amount
            </Button>
          </div>
        </>
      )}

      {transaction && renderSuccess(responseProps)}
      {transactionFailed && (
        <WithdrawalErrorPopup
          errorMessage={transactionFailedMessage}
          closeTransactionFailed={setTransactionFailed}
        />
      )}
    </div>
  );
};

export default WithdrawTab;
