import React, { useCallback, useEffect, useState } from 'react';
import styles from '../withdraw.module.scss';
import InputLineSeparator from '../../../data/images/input_line_separator.png';
import Dropdown from '../../Dropdown';

import { ReactComponent as WfairIcon } from '../../../data/icons/wfair-symbol.svg';
import { getWithdrawQuote, processWithdraw, getWithdrawStatus, convertCurrency } from '../../../api/index';
import classNames from 'classnames';
import { numberWithCommas } from '../../../utils/common';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import { addMetaMaskEthereum } from 'utils/helpers/ethereum';
import WithdrawalSuccessPopup from 'components/WithdrawalSuccessPopup';
// import { TOKEN_NAME } from 'constants/Token';
import { selectUser } from 'store/selectors/authentication';
import { useSelector } from 'react-redux';
import EthereumLogoActive from '../../../data/icons/ethereum-logo-icon-active.svg';
import EthereumLogo from '../../../data/icons/ethereum-logo-icon.svg';
import PolygonLogoActive from '../../../data/icons/polygon-logo-active.svg';
import PolygonLogo from '../../../data/icons/polygon-logo.svg';
import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';

const networkName = {
  polygon: 'MATIC',
  ethereum: 'ETH',
};

const WithdrawTab = () => {
  const [address, setAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [activeNetwork, setActiveNetwork] = useState(networkName.polygon);
  const [transaction, setTransaction] = useState(false);
  const [amountFees, setAmountFees] = useState(0);
  const [fiatEquivalence, setFiatEquivalence] = useState(0);
  const [responseProps, setResponseProps] = useState({});

  const { balance } =
    useSelector(selectUser);

  useEffect(() => {
    tokenAmountLostFocus();
  }, [activeNetwork]);

  const renderSuccess = ({withdrawAmount, fiatEquivalence, amountFees, calculatedAmount}) => {
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
    )
  }

  const selectContent = event => {
    event.target.select();
  };

  const handleWFAIRClick = useCallback(async () => {
    await addMetaMaskEthereum();
  }, []);

  const addressChange = useCallback(event => {
    const inputAddress = event.target.value;
    setAddress(inputAddress);
  }, []);

  const tokenAmountChange = useCallback(value => {
    setTokenAmount(value);
  }, []);

  const addressLostFocus = useCallback(event => {
    const inputAddress = event.target.value;
    const regex = /^0x[a-fA-F0-9]{40}$/g;
    const valid = inputAddress.match(regex);

    if (!valid) {
      console.error('wrong 0x address format');
      return;
    }

    setAddress(inputAddress);
  }, []);

  const tokenAmountLostFocus = async event => {
    if (tokenAmount > 0) {
      
      const payload = {
        amount: tokenAmount,
        network: activeNetwork,
      }

      const { response, error } = await getWithdrawQuote(payload);
      console.log(response);
      if (error) {
        console.log(error);
        console.error(error.message);
        return;
      }

      const { withdraw_amount:withdrawAmount, withdraw_fee:withdrawFee } = response?.data;
      const parsedWithdrawAmount = parseFloat(withdrawAmount).toFixed(4);
      const parsedFees = parseFloat(withdrawFee).toFixed(4);

      setAmountFees(parsedFees);
      setWithdrawAmount(parsedWithdrawAmount);

      const convertCurrencyPayload = {
        convertFrom: 'USD',
        convertTo: 'WFAIR',
        amount: parsedWithdrawAmount,
      };

      const { response:responseConvertion } = await convertCurrency(convertCurrencyPayload);
      const { WFAIR } = responseConvertion?.data;
      const quoteUSD = WFAIR.quote?.USD.price;
      
      const marketValue = parsedWithdrawAmount > 0 && Number(parsedWithdrawAmount * parseFloat(quoteUSD)).toFixed(2);
      let withdrawMarketValue = !marketValue
        ? 0
        : numberWithCommas(marketValue);

      setFiatEquivalence(withdrawMarketValue);
    }
  };

  const handleWithdraw = async () => {
      const payload = {
        amount: tokenAmount,
        network: activeNetwork,
        toAddress: address,
      }

      const { response, error } = await processWithdraw(payload);
      console.log(response);
      if (error) {
        console.error(error.message);
        return;
      }

      const { withdraw_amount:calculatedAmount, withdraw_fee:amountFees, network, external_transaction_id:externalTransactionId } = response?.data;

      setTransaction(true);
      setResponseProps({
        withdrawAmount: tokenAmount,
        calculatedAmount,
        amountFees,
        fiatEquivalence,
        network,
        externalTransactionId
      })
  }

  return (
    <div className={styles.withdrawContainer}>
      {!transaction && ( <>
        <h2>Withdraw</h2>
        {/* Crypto Tabs */}
        <div className={styles.cryptoTabsContainer}>
          <div
            className={classNames(
              styles.cryptoTab,
              activeNetwork === networkName.polygon && styles.cryptoTabActive
            )}
            onClick={() => setActiveNetwork(networkName.polygon)}
          >
            <img
              className={styles.imageSizePolygon}
              src={activeNetwork === networkName.polygon ? PolygonLogoActive : PolygonLogo} 
              alt="Polygon Logo"
            />
          </div>
          <div
            className={classNames(
              styles.cryptoTab,
              activeNetwork === networkName.ethereum && styles.cryptoTabActive
            )}
            onClick={() => setActiveNetwork(networkName.ethereum)}
          >
            <img
              className={styles.imageSizeEthereum}
              src={activeNetwork === networkName.ethereum ? EthereumLogoActive : EthereumLogo} 
              alt="Ethereum Logo"
            />
          </div>
        </div>

        {/* Input Fields */}
        <div className={styles.inputFieldsContainer}>
          {/* Currency */}
          <div className={styles.addressInputContainer}>
            <div className={styles.labelContainer}>
              <span>
                {activeNetwork === networkName.polygon && (
                  'Polygon Wallet Address'
                )}
                {activeNetwork === networkName.ethereum && (
                  'Ethereum Wallet Address'
                )}
              </span>
            </div>
            <input
              type="text"
              value={address}
              onChange={addressChange}
              onBlur={addressLostFocus}
              onClick={selectContent}
              placeholder={`Add your ${activeNetwork === networkName.polygon ? 'Polygon' : 'Ethereum'} wallet address`}
            />
          </div>

          <div className={styles.balanceContainer}>
            <span>Balance: {numberWithCommas(parseFloat(balance).toFixed(2))} {'WFAIR'}</span>
          </div>

          {/* WFAIR TOKEN */}
          <div className={styles.cryptoInputContainer}>
            <div className={styles.labelContainer}>
              <span>Amount you wish to withdraw</span>
            </div>
            <NumberCommaInput 
              value={tokenAmount} 
              onChange={tokenAmountChange}
              onBlur={tokenAmountLostFocus}
              onClick={selectContent}
            />
            <div className={styles.inputRightContainer}>
              <WfairIcon className={styles.wfairLogo} onClick={handleWFAIRClick} />
              <span>WFAIR</span>
            </div>
          </div>
          <div className={styles.InputLineSeparator}>
            <img src={InputLineSeparator} alt="input_line_separator" />
          </div>
          {/* WFAIR TOKEN */}
          <div className={styles.cryptoInputContainer}>
            <div className={styles.labelContainer}>
              <span>You receive (estimate)</span><span className={styles.gasFeeLabel}>{amountFees > 0 && `Fee: ±${amountFees} WFAIR`}</span>
            </div>
            <input
              disabled
              readOnly
              value={withdrawAmount}
            />
            <div className={styles.inputRightContainer}>
              <WfairIcon className={styles.wfairLogo} onClick={handleWFAIRClick} />
              <span>WFAIR</span>
            </div>
          </div>
          <div className={styles.equivalentFiat}>
            <span>Estimated market value: ± ${fiatEquivalence}</span>
          </div>

          {/* <div className={styles.calculation}>
            <p>Estimated Transaction Fee: 123 WFAIR </p>
            
            <p><b>You receive (estimate): 111 WFAIR </b></p>
          </div> 
          */}

          {/* Content */}
          <div className={styles.cryptoContent}>
            <p>Before proceeding, please double check that the wallet address is correct. Transactions are irreversible, and if you put the wrong address, your funds will be lost.</p>
          </div>

          <button
            className={classNames(styles.confirmButton, tokenAmount === 0 || address === null ? styles.disabled : null)}
            onClick={handleWithdraw}
            disabled={tokenAmount === 0 || address === null}
          >
            Confirm Amount
          </button>
        </div>
      </>)}

      {transaction &&
        renderSuccess(responseProps)
      }



    </div>
  );
};

export default WithdrawTab;
