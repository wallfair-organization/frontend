import { put } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import * as Api from '../../api';
import { LeaderboardActions } from '../actions/leaderboard';
import { select } from 'redux-saga/effects';
import State from '../../helper/State';

const fetchAll = function* (action) {
  const userId = yield select(state => state.authentication.userId);
  const leaderboardState = yield select(state => state.leaderboard);
  const users = yield select(state => state.user.users);
  const user = State.getUser(userId, users);
  const limit = action.limit;
  const skip = action.skip;
  const fetchAfterCurrent = action.fetchAfterCurrent;
  const skipForCurrent = user?.rank ? user.rank - action.skipForCurrent : 0;
  const limitForCurrent = user?.rank ? action.limitForCurrent : 5;

  let leaderboard = {
    users: [],
    usersWithCurrent: [],
    currentUser: {
      _id: user?.userId,
      username: user?.username,
      rank: user?.rank,
      amountWon: user?.amountWon,
      toNextRank: user?.toNextRank,
    },
    skip,
    limit,
    fetchAfterOnly: false,
    skipForCurrent,
  };

  if (skip === 0 && fetchAfterCurrent && userId) {
    const response = yield call(Api.getLeaderboard, skip, limit);
    let current = [];

    if (!response.data.users.find(u => u._id === userId)) {
      const responseCurrent = yield call(
        Api.getLeaderboard,
        skipForCurrent,
        limitForCurrent
      );
      current = responseCurrent.data.users;
    }

    leaderboard = {
      ...leaderboard,
      ...response.data,
      usersWithCurrent: current,
    };
  } else if (fetchAfterCurrent) {
    const responseCurrent = yield call(
      Api.getLeaderboard,
      skip,
      limitForCurrent
    );
    leaderboard = {
      ...leaderboard,
      ...responseCurrent.data,
      users: leaderboardState.leaderboard.users,
      usersWithCurrent: [
        ...leaderboardState.leaderboard.usersWithCurrent,
        ...responseCurrent.data.users,
      ],
      limit: limitForCurrent,
      fetchAfterOnly: true,
    };
  } else {
    const response = yield call(Api.getLeaderboard, skip, limit);
    leaderboard = {
      ...leaderboard,
      ...response.data,
      usersWithCurrent: leaderboardState.leaderboard.usersWithCurrent || [],
    };
  }

  yield put(
    LeaderboardActions.fetchAllSucceeded({
      leaderboard,
    })
  );
};

const fetchByUser = function* (action) {
  const response = yield call(Api.getLeaderboard, action.skip, action.limit);

  if (response) {
    yield put(
      LeaderboardActions.fetchByUserSuccess({
        users: response.data.users,
        skip: action.skip,
        limit: action.limit,
        paginate: action.paginate,
      })
    );
  }
};

export default {
  fetchAll,
  fetchByUser,
};
