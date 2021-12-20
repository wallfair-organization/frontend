import update from 'immutability-helper';
import { TransactionTypes } from '../actions/transaction';

const initialState = {
  transactions: [],
  walletTransactions: {
    isLoading: false,
    isError: false,
    transactions: [],
  }
};

const fetchAllSucceeded = (action, state) => {
  return update(state, {
    transactions: {
      $set: action.transactions,
    },
  });
};

const fetchWalletTransactionsSucceeded = (action, state) => {
  return {
    ...state,
    walletTransactions: {
      isLoading: false,
      isError: false,
      transactions: action.transactions
    },
  };
};

const fetchWalletTransactionsFailed = (state) => {
  return {
    ...state,
    walletTransactions: {
      ...state.walletTransactions,
      isLoading: false,
      isError: true,
    },
  };
};

const fetchWalletTransactionsLoading = (state) => {
  return {
    ...state,
    walletTransactions: {
      ...state.walletTransactions,
      isLoading: true,
      isError: false,
    },
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case TransactionTypes.FETCH_ALL_SUCCEEDED:
      return fetchAllSucceeded(action, state);
    case TransactionTypes.FETCH_WALLET_TRANSACTIONS_SUCCEEDED:
      return fetchWalletTransactionsSucceeded(action, state);
    case TransactionTypes.FETCH_WALLET_TRANSACTIONS_FAILED:
      return fetchWalletTransactionsFailed(state);
    case TransactionTypes.FETCH_WALLET_TRANSACTIONS_LOADING:
      return fetchWalletTransactionsLoading(state);
    default:
      return state;
    // @formatter:on
  }
}
