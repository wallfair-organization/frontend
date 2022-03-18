import React, { useState, useEffect, useCallback, useMemo } from 'react';
import _ from 'lodash';
import { numberWithCommas } from '../../utils/common';
import WFAIRTransfer from '../WFAIRTransfer';
import styles from './styles.module.scss';
import TokenNumberInput from 'components/TokenNumberInput';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import { TxDataActions } from 'store/actions/txProps';
import Button from 'components/Button';
import { convertCurrency } from 'api';
import { TOKEN_NAME } from 'constants/Token';

const TokenTransfer = ({
  provider,
  balance,
  currency,
  showCancel = false,
  tranferAddress,
  contractAddress,
  showTxModal,
  setter,
  setBlocked,
  setTXSuccess,
  setformError,
  formError,
  setTransactionAmount,
  setCurrency
}) => {
  const [transferValue, setTransferValue] = useState('0');
  const [wfairValue, setWfairValue] = useState('0');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      showTxModal();
    } else {
      setBlocked(false);
      setTXSuccess(false);
      setter(false);
    }
  }, [modalOpen]);

  const calculateConversion = useCallback(
    _.debounce((value) => {
      convertCurrency({
        convertFrom: currency,
        convertTo: TOKEN_NAME,
        amount: value,
      })
        .then(({ response }) => {
          const convertedAmount = response.data?.convertedAmount;
          if (convertedAmount) {
            setWfairValue(parseFloat(convertedAmount).toFixed(4));
          }
        })
        .catch(() => console.error('Failed to convert to wfair'));
    }, 500), []);

  const setInputValue = (value) => {
    setTransferValue(value);
    if (currency !== TOKEN_NAME) {
      calculateConversion(value);
    }
  }

  const handleTransaction = useCallback(() => {
    setBlocked(true);
    setformError('');
    setCurrency(currency);
    WFAIRTransfer({
      provider,
      setter,
      contractAddress,
      currency,
      tokenAmount: transferValue,
      to_address: tranferAddress,
      setBlocked: setBlocked,
      setModalOpen: setModalOpen,
      setTXSuccess: setTXSuccess,
      setformError: setformError,
    });
    setTransactionAmount(transferValue);
    setTransferValue('0');
  }, [provider, setter, tranferAddress, transferValue]);

  const renderBody = () => (
    <>
      <div className={styles.transferWrapper}>
        {formError && (
          <div className={styles.transferFormErrors}>
            <em>{formError}</em>
          </div>
        )}

        {balance > 0 ? (
          <>
            <TokenNumberInput
              className={styles.tokenNumberInput}
              key="transferValue"
              value={transferValue}
              currency={currency}
              setValue={setInputValue}
              minValue={0}
              decimalPlaces={4}
              maxValue={balance}
              halfIcon={false}
              doubleIcon={false}
            />

            <div className={styles.overview}>
              <p className={styles.title}>Deposit Overview</p>
              <div className={styles.overviewItem}>
                <span>Amount</span>
                <span>
                  {numberWithCommas(transferValue)} {currency}
                </span>
              </div>
              <hr />
              {currency !== TOKEN_NAME && (
                <>
                  <div className={styles.overviewItem}>
                    <span>WFAIR</span>
                    <span>
                      {numberWithCommas(wfairValue)} {TOKEN_NAME}
                    </span>
                  </div>
                  <hr />
                </>
              )}
            </div>

            <div className={styles.buttonWrapper}>
              <Button
                className={classNames(
                  styles.transferButton,
                  Number(transferValue) === 0 ? styles.disabled : null
                )}
                onClick={handleTransaction}
                disabled={Number(transferValue) === 0}
              >
                Send Transaction
              </Button>

              {showCancel && (
                <Button
                  className={styles.transferButton}
                  onClick={() => {
                    setformError('');
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className={styles.transfer}>
            Insufficient Balance for a Transfer
          </div>
        )}
      </div>
    </>
  );

  return renderBody();
};

const mapStateToProps = state => {
  return {
    formError: state.txProps.formError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showTxModal: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.txModal }));
    },
    setter: hash => {
      dispatch(TxDataActions.setter(hash));
    },
    setBlocked: blocked => {
      dispatch(TxDataActions.setBlocked(blocked));
    },
    setTXSuccess: TXSuccess => {
      dispatch(TxDataActions.setTXSuccess(TXSuccess));
    },
    setformError: formError => {
      dispatch(TxDataActions.setTXSuccess(formError));
    },
    setTransactionAmount: transactionAmount => {
      dispatch(TxDataActions.setTransactionAmount(transactionAmount));
    },
    setCurrency: currency => {
      dispatch(TxDataActions.setCurrency(currency));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(TokenTransfer));
