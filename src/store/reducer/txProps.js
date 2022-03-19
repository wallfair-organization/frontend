import _ from 'lodash';
import { TxDataTypes } from '../actions/txProps';

const initialState = {
  blocked: false,
  TXSuccess: false,
  formError: '',
  hash: '',
  action: 'Token Transfer',
  notActiveNetwork: '',
  transactionAmmount: 0,
  currency: '',
};

const setHash = (action, state) => {
  return {
    ...state, 
    hash: action.payload
  };
};

const setBlocked = (action, state) => {
  return {
    ...state, 
    blocked: action.payload
  };
};
const setTxSuccess = (action, state) => {
  return {
    ...state, 
    TXSuccess: action.payload
  };
};

const setFormError = (action, state) => {
  return {
    ...state, 
    formError: action.payload
  };
};
const setActiveNetwork = (action, state) => {
  return {
    ...state, 
    notActiveNetwork: action.payload
  };
};

const setTransactionAmount = (action, state) => {
  return {
    ...state, 
    transactionAmmount: action.payload
  };
};

const setCurrency = (action, state) => {
  return {
    ...state,
    currency: action.currency,
  };
};


export default function (state = initialState, action) {
  switch (action.type) {
    case TxDataTypes.SET_HASH:
      return setHash(action, state);
    case TxDataTypes.SET_BLOCKED:
      return setBlocked(action, state);
    case TxDataTypes.SET_TXSUCCESS:
      return setTxSuccess(action, state);
    case TxDataTypes.SET_FORM_ERROR:
      return setFormError(action, state);
    case TxDataTypes.SET_ACTIVE_NETWORK:
      return setActiveNetwork(action, state);
    case TxDataTypes.SET_TRANSACTION_AMOUNT:
      return setTransactionAmount(action, state);
    case TxDataTypes.SET_CURRENCY:
      return setCurrency(action, state);
    default:
      return state;
  }
}
