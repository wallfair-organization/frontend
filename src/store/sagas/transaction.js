import * as Api from '../../api';
import _ from 'lodash';
import AuthState from '../../constants/AuthState';
import { call, put, select } from 'redux-saga/effects';
import { TransactionActions } from '../actions/transaction';

const fetchTransactions = function* () {
  const authState = yield select(state => state.authentication.authState);

  if (authState === AuthState.LOGGED_IN) {
    const response = yield call(Api.getTransactions);

    if (response) {
      const transactions = _.get(response, 'data', []);

      yield put(
        TransactionActions.fetchAllSucceeded({
          transactions,
        })
      );
    } else {
      yield put(TransactionActions.fetchAllFailed());
    }
  }
};

const fetchWalletTransactions = function* () {
  const authState = yield select(state => state.authentication.authState);
  try {
    if (authState !== AuthState.LOGGED_IN) {
      throw new Error('Not logged in.');
    }

    yield put(TransactionActions.fetchWalletTransactionsLoading());

    const { data } = yield call(Api.getWalletTransactions);

    const statuses = ['in_review', 'review_rejected', 'new', 'processing', 'completed'];

    const transactions = data
      .reduce(
        (acc, transaction, _, all) => { // group all transaction log iterations
          const alreadyFound = acc.some(
            ({ external_transaction_id }) =>
              external_transaction_id === transaction.external_transaction_id
          );

          if(alreadyFound) {
            return acc;
          }

          const logs = all
            .filter(
              ({ external_transaction_id }) =>
                external_transaction_id === transaction.external_transaction_id
            )
            .sort(
              (a, b) => statuses.indexOf(b.status) - statuses.indexOf(a.status)
            )
          const highestLog = logs[0];
          if(transaction.originator === 'withdraw') {
            const { fee = null } = logs.find((log) => !!log.fee);
            highestLog.fee = fee;
          }

          return [...acc, highestLog];
      },
        []
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .reduce((acc, transaction) => {
        const key = transaction.originator;
        return {
          ...acc,
          [key]: [...(acc[key] || []), transaction],
        };
      }, {});

    yield put(
      TransactionActions.fetchWalletTransactionsSuceeded({
        transactions,
      })
    );

  } catch (err) {
    yield put(TransactionActions.fetchWalletTransactionsFailed());
  }
}

export default {
  fetchTransactions,
  fetchWalletTransactions,
};
