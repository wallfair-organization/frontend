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

  const tokenAmountChange = useCallback(event => {
    const inputAmount = event.target.value;
    setTokenAmount(inputAmount);
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
      const parsedWithdrawAmount = !withdrawAmount ? 0 : parseFloat(withdrawAmount).toFixed(4);
      const parsedFees = !withdrawFee ? 0 : parseFloat(withdrawFee).toFixed(4);
      const calculatedWithdrawAmount = Number(parsedWithdrawAmount - parsedFees).toFixed(4);

      setAmountFees(parsedFees);
      setWithdrawAmount(calculatedWithdrawAmount);

      const convertCurrencyPayload = {
        convertFrom: 'USD',
        convertTo: 'WFAIR',
        amount: calculatedWithdrawAmount,
      };

      const { response:responseConvertion } = await convertCurrency(convertCurrencyPayload);
      const { WFAIR } = responseConvertion?.data;
      const quoteUSD = WFAIR.quote?.USD.price;

      console.log(quoteUSD);
      
      const marketValue = Number(calculatedWithdrawAmount * parseFloat(quoteUSD)).toFixed(2);
      // const roundedAmount = Math.floor(marketValue * 100) / 100;
      let withdrawMarketValue = !marketValue
        ? 0
        : numberWithCommas(marketValue);

      setFiatEquivalence(withdrawMarketValue);
      console.log(withdrawMarketValue);
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

      const { withdraw_amount:withdrawAmount, withdraw_fee:amountFees, network, external_transaction_id:externalTransactionId } = response?.data;

      const calculatedAmount = parseFloat(withdrawAmount) - parseFloat(amountFees);

      setTransaction(true);
      setResponseProps({
        withdrawAmount,
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
        {/* Crypto Tabs */}
        <div className={styles.cryptoTabsContainer}>
          <div
            className={classNames(
              styles.cryptoTab,
              activeNetwork === networkName.polygon && styles.cryptoTabActive
            )}
            onClick={() => setActiveNetwork(networkName.polygon)}
          >
            {/* <BitcoinIcon /> */}
            <p className={styles.fullName}>Polygon</p>
            <p className={styles.shortName}>Polygon</p>
          </div>
          <div
            className={classNames(
              styles.cryptoTab,
              activeNetwork === networkName.ethereum && styles.cryptoTabActive
            )}
            onClick={() => setActiveNetwork(networkName.ethereum)}
          >
            {/* <EthereumIcon /> */}
            <p className={styles.fullName}>Ethereum</p>
            <p className={styles.shortName}>Ethereum</p>
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
              placeholder="Add your wallet address (0x...)"
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
            <input 
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