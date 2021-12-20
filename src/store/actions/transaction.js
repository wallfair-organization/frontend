import { makeActionCreator } from '../../helper/Store';

export const TransactionTypes = {
  FETCH_ALL: 'Transaction/FETCH_ALL',
  FETCH_ALL_FAILED: 'Transaction/FETCH_ALL_FAILED',
  FETCH_ALL_SUCCEEDED: 'Transaction/FETCH_ALL_SUCCEEDED',
  FETCH_WALLET_TRANSACTIONS: 'Transaction/FETCH_WALLET_TRANSACTIONS',
  FETCH_WALLET_TRANSACTIONS_FAILED:
    'Transaction/FETCH_WALLET_TRANSACTIONS_FAILED',
  FETCH_WALLET_TRANSACTIONS_SUCCEEDED:
    'Transaction/FETCH_WALLET_TRANSACTIONS_SUCCEEDED',
  FETCH_WALLET_TRANSACTIONS_LOADING:
    'Transaction/FETCH_WALLET_TRANSACTIONS_LOADING',
};

const fetchAll = makeActionCreator(TransactionTypes.FETCH_ALL);

const fetchAllSucceeded = makeActionCreator(
  TransactionTypes.FETCH_ALL_SUCCEEDED,
  {
    transactions: null,
  }
);

const fetchAllFailed = makeActionCreator(TransactionTypes.FETCH_ALL_FAILED);

const fetchWalletTransactions = makeActionCreator(
  TransactionTypes.FETCH_WALLET_TRANSACTIONS
);

const fetchWalletTransactionsSuceeded = makeActionCreator(
  TransactionTypes.FETCH_WALLET_TRANSACTIONS_SUCCEEDED,
  {
    transactions: null,
  }
);

const fetchWalletTransactionsFailed = makeActionCreator(
  TransactionTypes.FETCH_WALLET_TRANSACTIONS_FAILED
);

const fetchWalletTransactionsLoading = makeActionCreator(
  TransactionTypes.FETCH_WALLET_TRANSACTIONS_LOADING
);

export const TransactionActions = {
  fetchAll,
  fetchAllSucceeded,
  fetchAllFailed,
  fetchWalletTransactions,
  fetchWalletTransactionsSuceeded,
  fetchWalletTransactionsFailed,
  fetchWalletTransactionsLoading,
};
