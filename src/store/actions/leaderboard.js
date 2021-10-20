import { makeActionCreator } from '../../helper/Store';

export const LeaderboardTypes = {
  FETCH_ALL: 'Leaderboard/FETCH_ALL',
  FETCH_ALL_FAILED: 'Leaderboard/FETCH_ALL_FAILED',
  FETCH_ALL_SUCCEEDED: 'Leaderboard/FETCH_ALL_SUCCEEDED',
  HANDLE_DRAWER: 'Leaderboard/HANDLE_DRAWER',
  FETCH_BY_USER: 'Leaderboard/FETCH_BY_USER',
  FETCH_BY_USER_SUCCESS: 'Leaderboard/FETCH_BY_USER_SUCCESS',
};

const fetchAll = makeActionCreator(LeaderboardTypes.FETCH_ALL, {
  skip: 0,
  limit: 10,
  fetchAfterCurrent: false,
  skipForCurrent: 0,
  limitForCurrent: 0,
});

const fetchAllSucceeded = makeActionCreator(
  LeaderboardTypes.FETCH_ALL_SUCCEEDED,
  {
    leaderboard: null,
  }
);

const fetchAllFailed = makeActionCreator(LeaderboardTypes.FETCH_ALL_FAILED);

const fetchByUser = makeActionCreator(LeaderboardTypes.FETCH_BY_USER, {
  skip: 0,
  limit: 10,
  paginate: false,
});

const fetchByUserSuccess = makeActionCreator(
  LeaderboardTypes.FETCH_BY_USER_SUCCESS,
  {
    users: [],
    skip: null,
    limit: null,
  }
);

const handleDrawer = makeActionCreator(LeaderboardTypes.HANDLE_DRAWER, {
  open: true,
});

export const LeaderboardActions = {
  fetchAll,
  fetchAllSucceeded,
  fetchAllFailed,
  handleDrawer,
  fetchByUser,
  fetchByUserSuccess,
};
