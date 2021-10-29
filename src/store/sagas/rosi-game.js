import { delay, put } from 'redux-saga/effects';
import { RosiGameActions } from '../actions/rosi-game';

export const endGame = function* () {
  yield put(RosiGameActions.startEndgamePeriod());
  yield delay(1500);
  yield put(RosiGameActions.endEndgamePeriod());
  yield put(RosiGameActions.resetInGameBets());
  yield put(RosiGameActions.resetCashedOut());
};
