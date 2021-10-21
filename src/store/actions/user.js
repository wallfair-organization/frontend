import { makeActionCreator } from '../../helper/Store';

export const UserTypes = {
  FETCH: 'User/FETCH',
  FETCH_SUCCEEDED: 'User/FETCH_SUCCEEDED',
  FETCH_FAILED: 'User/FETCH_FAILED',
  UPDATE_PREFERENCES: 'User/UPDATE_PREFERENCES',
  REQUEST_TOKENS: 'User/REQUEST_TOKENS',
  REQUEST_TOKENS_SUCCEEDED: 'User/REQUEST_TOKENS_SUCCEEDED',
  REQUEST_TOKENS_FAILED: 'User/REQUEST_TOKENS_FAILED',
};

const fetch = makeActionCreator(UserTypes.FETCH, {
  userId: null,
  forceFetch: false,
});

const fetchFailed = makeActionCreator(UserTypes.FETCH_FAILED, {
  userId: null,
});

const fetchSucceeded = makeActionCreator(UserTypes.FETCH_SUCCEEDED, {
  user: null,
});

const updatePreferences = makeActionCreator(UserTypes.UPDATE_PREFERENCES, {
  userId: null,
  preferences: null,
});

const requestTokens = makeActionCreator(UserTypes.REQUEST_TOKENS);
const requestTokensSucceeded = makeActionCreator(
  UserTypes.REQUEST_TOKENS_SUCCEEDED
);
const requestTokensFailed = makeActionCreator(UserTypes.REQUEST_TOKENS_FAILED);

export const UserActions = {
  fetch,
  fetchFailed,
  fetchSucceeded,
  updatePreferences,
  requestTokens,
  requestTokensSucceeded,
  requestTokensFailed,
};
