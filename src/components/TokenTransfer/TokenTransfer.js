import React, { useState, useEffect, useCallback } from 'react';
import { numberWithCommas } from '../../utils/common';
import TxModal from '../TxModal';
import WFAIRTransfer from '../WFAIRTransfer';
import styles from './styles.module.scss';
import Loader from 'components/Loader/Loader';
import TokenNumberInput from 'components/TokenNumberInput';
import { formatToFixed } from 'helper/FormatNumbers';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import { TxDataActions } from 'store/actions/txProps';
import { TOKEN_NAME } from 'constants/Token';
import Button from 'components/Button';
// import AddTokens from 'components/AddTokens';

const TokenTransfer = ({
  provider,
  hash,
  balance,
  showCancel = false,
  tranferAddress,
  contractAddress,
  showTxModal,
  setter,
  setBlocked,
  setTXSuccess,
  setformError,
  formError,
  setTransactionAmount
}) => {
  const [transferValue, setTransferValue] = useState('0');
  // const [blocked, setBlocked] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  // const [TXSuccess, setTXSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // const [formError, setformError] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!modalOpen) {
      setBlocked(false);
      setTXSuccess(false);
      setter(false);
    }
    if (modalOpen) {
      showTxModal();
    }
  }, [modalOpen]);

  const getLookupLabel = () => {
    return Object.keys();
  };

  const handleTransaction = useCallback(() => {
    setBlocked(true);
    setformError('');
    WFAIRTransfer({
      provider,
      setter,
      contractAddress,
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

  if (balance < 1) {
    return isloading ? (
      <Loader />
    ) : (
      <div className={styles.transfer}>Insufficient balance for a deposit</div>
    );
  }

  const renderBody = () => (
    <>
      {/* {modalOpen && (
        <TxModal
          hash={hash}
          blocked={blocked}
          success={TXSuccess}
          setModalOpen={setModalOpen}
          action={'Token Transfer'}
          lookupLabel={getLookupLabel}
        />
      )} */}
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
              currency={'WFAIR'}
              setValue={setTransferValue}
              minValue={0}
              decimalPlaces={0}
              maxValue={formatToFixed(balance)}
              halfIcon={false}
              doubleIcon={false}
            />
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
            {/* <AddTokens /> */}
          </>
        ) : (
          <div className={styles.transfer}>
            Insufficient Balance for a Transfer
          </div>
        )}
      </div>
    </>
  );

  return isloading ? <Loader /> : renderBody();
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
      dispatch(TxDataActions.setTransactionAmount(transactionAmount))
    }

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(TokenTransfer));
