import { put } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import * as Api from '../../api';
import { getNews } from '../../api/third-party';
import { EventActions } from '../actions/event';
import { select } from 'redux-saga/effects';
import AuthState from '../../constants/AuthState';
import _ from 'lodash';
import { UserActions } from '../actions/user';

const fetchAll = function* (action) {
  const authState = yield select(state => state.authentication.authState);
  const response = yield call(Api.listEvents);

  if (response) {
    const events = response.data;

    yield put(
      EventActions.fetchAllSucceeded({
        events,
      })
    );
  } else {
    yield put(EventActions.fetchAllFailed());
  }
};

const fetchAllSucceeded = function* (action) {
  const events = action.events;

  if (!_.isEmpty(events)) {
    const currentlyFetchingUsers = [];

    for (const event of events) {
      const bets = event.bets;

      if (!_.isEmpty(bets)) {
        for (const bet of bets) {
          const users = yield select(state => state.user.users);
          const userId = bet.creator;

          if (userId) {
            const userFetched =
              _.some(users, {
                userId: userId,
              }) || currentlyFetchingUsers[userId] !== undefined;

            if (!userFetched) {
              currentlyFetchingUsers[userId] = true;
              yield put(UserActions.fetch({ userId }));
            }
            // TODO fetch all user at once
          }
        }
      }
    }
  }
};

const fetchFilteredEvents = function* ({ payload }) {
  try {
    // SM: perhaps better solution should be considered, instead of setting token in header for each request
    // in the handler itself
    const token = yield select(state => state.authentication.token);
    Api.setToken(token);

    const defaultParams = yield select(state => state.event.defaultParams);

    const newDefaultParams = { ...defaultParams, ...payload };

    const { data } = yield call(() => Api.listEventsFiltered(newDefaultParams));

    yield put(EventActions.setDefaultParamsValues(newDefaultParams));
    yield put(EventActions.fetchFilteredEventsSuccess(data));
  } catch (error) {
    yield put(EventActions.fetchFilteredEventsFail());
  }
};

const fetchHomeEvents = function* (action) {
  const defaultParams = yield select(state => state.event.defaultParams);
  const params = {
    ...defaultParams,
    type: action.eventType,
    page: action.page,
    count: action.count,
    category: action.category || 'all',
    upcoming: action.upcoming,
    deactivated: action.deactivated,
  };

  const response = yield call(Api.listEventsFiltered, params);

  if (response) {
    yield put(
      EventActions.fetchHomeEventsSuccess({
        eventType: params.type,
        state: action.state,
        events: response.data,
        page: params.page,
        count: params.count,
      })
    );
  } else {
    yield put(EventActions.fetchHomeEventsFail());
  }
};

const fetchTags = function* (action) {
  const response = yield call(Api.getTags);

  if (response) {
    yield put(
      EventActions.fetchTagsSuccess({
        tags: response.data.data,
      })
    );
  } else {
    yield put(EventActions.fetchTagsFail());
  }
};

const fetchHistoryChartData = function* ({ betId, params }) {
  try {
    // SM: perhaps better solution should be considered, instead of setting token in header for each request
    // in the handler itself
    const token = yield select(state => state.authentication.token);
    Api.setToken(token);

    const { data } = yield call(() =>
      Api.getEventHistoryChartData(betId ?? params.betId, params)
    );

    yield put(EventActions.fetchChartDataSuccess(data));
  } catch (error) {
    yield put(EventActions.fetchChartDataFail());
  }
};

const fetchNewsData = function* ({ params }) {
  try {
    const { data } = yield call(() => getNews(params));

    yield put(EventActions.fetchNewsDataSuccess(data));
  } catch (error) {
    yield put(EventActions.fetchNewsDataFail());
  }
};

export default {
  fetchAll,
  fetchAllSucceeded,
  fetchFilteredEvents,
  fetchHomeEvents,
  fetchTags,
  fetchHistoryChartData,
  fetchNewsData,
};
