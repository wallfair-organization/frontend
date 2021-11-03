import { delay, put, call } from 'redux-saga/effects';
import { RosiGameActions } from '../actions/rosi-game';
import * as Api from '../../api/crash-game';

export const endGame = function* () {
  yield put(RosiGameActions.startEndgamePeriod());
  yield delay(1500);
  yield put(RosiGameActions.endEndgamePeriod());
  yield put(RosiGameActions.resetInGameBets());
  yield put(RosiGameActions.resetCashedOut());
};

export const fetchLuckyData = function* () {
  try {
    const { data } = yield call(Api.getLuckyUsers);
    yield put(RosiGameActions.fetchLuckyDataComplete(data));
  } catch (error) {
    yield put(RosiGameActions.fetchLuckyDataError(error));
  }
};

export const fetchHighData = function* () {
  try {
    const { data } = yield call(Api.getHighUsers);
    yield put(RosiGameActions.fetchHighDataComplete(data));
  } catch (error) {
    yield put(RosiGameActions.fetchHighDataError(error));
  }
};
