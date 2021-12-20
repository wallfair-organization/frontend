export const TxDataTypes = {
  SET_HASH: 'TX_DATA/SET_HASH',
  SET_BLOCKED: 'TX_DATA/SET_BLOCKED',
  SET_TXSUCCESS: 'TX_DATA/SET_TXSUCCESS',
  SET_FORM_ERROR: 'TX_DATA/SET_FORM_ERROR',
  SET_ACTIVE_NETWORK: 'TX_DATA/SET_ACTIVE_NETWORK',
  SET_TRANSACTION_AMOUNT: 'TX_DATA/SET_TRANSACTION_AMOUNT',
};

const txActions = {
  setter: payload => ({
    type: TxDataTypes.SET_HASH,
    payload,
  }),
  setBlocked: payload => ({
    type: TxDataTypes.SET_BLOCKED,
    payload,
  }),

  setTXSuccess: payload => ({
    type: TxDataTypes.SET_TXSUCCESS,
    payload,
  }),
  setformError: payload => ({
    type: TxDataTypes.SET_FORM_ERROR,
    payload,
  }),
  setNotActiveNetwork: payload => ({
    type: TxDataTypes.SET_ACTIVE_NETWORK,
    payload,
  }),
  setTransactionAmount: payload => ({
    type: TxDataTypes.SET_TRANSACTION_AMOUNT,
    payload,
  }),
};

export const TxDataActions = txActions;
