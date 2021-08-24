import AlertSagas                             from './alert';
import AuthenticationSagas                    from './authentication';
import BetSagas                               from './bet';
import EventSagas                             from './event';
import TransactionSagas                       from './transaction';
import UserSagas                              from './user';
import ChatSagas                              from './chat';
import WebsocketsSagas                        from './websockets';
import LeaderboardSagas                       from "./leaderboard";
import {all, select}                          from 'redux-saga/effects';
import { AuthenticationActions }              from '../actions/authentication';
import { AuthenticationTypes }                from '../actions/authentication';
import { BetActions }                         from '../actions/bet';
import { BetTypes }                           from '../actions/bet';
import { EventActions }                       from '../actions/event';
import { EventTypes }                         from '../actions/event';
import { REHYDRATE }                          from 'redux-persist';
import { takeLatest, takeEvery, put }         from 'redux-saga/effects';
import { TransactionActions }                 from '../actions/transaction';
import { TransactionTypes }                   from '../actions/transaction';
import { UserTypes }                          from '../actions/user';
import { PopupActions }             from '../actions/popup';
import { AlertTypes }                         from '../actions/alert';
import { ChatTypes, ChatActions }             from '../actions/chat';
import { WebsocketsTypes, WebsocketsActions } from '../actions/websockets';
import { LOCATION_CHANGE }                    from 'connected-react-router';
import { LeaderboardActions, LeaderboardTypes }                   from '../actions/leaderboard';
import PopupTheme                   from '../../components/Popup/PopupTheme';

const root = function* () {
    yield all([
        // @formatter:off
        takeLatest([AuthenticationTypes.LOGOUT],                         AuthenticationSagas.logout),
        takeLatest([AuthenticationTypes.VERIFY_SMS],                     AuthenticationSagas.verifySms),
        takeLatest([AuthenticationTypes.REQUEST_SMS],                    AuthenticationSagas.requestSms),
        takeLatest([AuthenticationTypes.SET_EMAIL],                      AuthenticationSagas.setAdditionalInformation),
        takeLatest([AuthenticationTypes.VERIFY_EMAIL],                   AuthenticationSagas.verifyEmail),
        takeLatest([AuthenticationTypes.FETCH_REFERRALS],                AuthenticationSagas.fetchReferrals),
        takeLatest([AuthenticationTypes.FETCH_REFERRALS_SUCCEEDED],      AuthenticationSagas.fetchReferralsSucceeded),
        takeLatest([AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED], AuthenticationSagas.registrationSucceeded),
        takeLatest([
            AuthenticationTypes.VERIFY_SMS_SUCCEEDED,
            AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED,
        ],                                                                      AuthenticationSagas.authenticationSucceeded),
        takeEvery([
            AuthenticationTypes.REQUEST_SMS_FAILED,
            AuthenticationTypes.VERIFY_SMS_FAILED,
            AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED,
            AuthenticationTypes.FETCH_REFERRALS_FAILED,
            EventTypes.FETCH_ALL_FAILED,
            BetTypes.CREATE_FAILED,
            BetTypes.PLACE_FAILED,
            BetTypes.PULL_OUT_BET_FAILED,
        ],                                                                      AlertSagas.handleFail),
        takeEvery([
            BetTypes.CREATE_SUCCEEDED,
            BetTypes.PLACE_SUCCEEDED,
            BetTypes.PULL_OUT_BET_SUCCEEDED,
        ],                                                                      AlertSagas.handleSuccess),
        takeEvery( [
            AlertTypes.SHOW_SUCCESS,
            AlertTypes.SHOW_ERROR,
        ],                                                                      AlertSagas.handleShown),
        takeLatest([EventTypes.FETCH_ALL],                               EventSagas.fetchAll),
        takeLatest([EventTypes.FETCH_ALL_SUCCEEDED],                     EventSagas.fetchAllSucceeded),
        takeLatest([EventTypes.FETCH_FILTERED],                          EventSagas.fetchFilteredEvents),
        takeLatest([BetTypes.PLACE],                                     BetSagas.place),
        takeLatest([BetTypes.CREATE],                                    BetSagas.create),
        takeLatest([BetTypes.SET_COMMITMENT],                            BetSagas.setCommitment),
        takeEvery( [BetTypes.FETCH_OUTCOMES],                            BetSagas.fetchOutcomes),
        takeEvery( [BetTypes.FETCH_SELL_OUTCOMES],                       BetSagas.fetchSellOutcomes),
        takeLatest([BetTypes.FETCH_OPEN_BETS],                           BetSagas.fetchOpenBets),
        takeLatest([BetTypes.FETCH_OPEN_BETS_SUCCEEDED],                 BetSagas.fetchOpenBetsSucceeded),
        takeEvery( [BetTypes.PULL_OUT_BET],                              BetSagas.pullOut),
        takeLatest([TransactionTypes.FETCH_ALL],                         TransactionSagas.fetchTransactions),
        takeEvery( [UserTypes.FETCH],                                    UserSagas.fetch),
        takeEvery( [UserTypes.FETCH_SUCCEEDED],                          UserSagas.fetchSucceeded),
        takeEvery( [ChatTypes.ADD_MESSAGE],                              ChatSagas.addMessage),
        takeEvery( [ChatTypes.FETCH],                                    ChatSagas.fetch),
        takeLatest( [ChatTypes.FETCH_INITIAL],                           ChatSagas.fetchInitial),
        takeLatest( [WebsocketsTypes.INIT],                              WebsocketsSagas.init),
        takeLatest( [WebsocketsTypes.CONNECTED],                         WebsocketsSagas.connected),
        takeEvery( [WebsocketsTypes.JOIN_ROOM],                          WebsocketsSagas.joinRoom),
        takeEvery( [WebsocketsTypes.LEAVE_ROOM],                         WebsocketsSagas.leaveRoom),
        takeEvery( [WebsocketsTypes.SEND_CHAT_MESSAGE],                  WebsocketsSagas.sendChatMessage),
        takeEvery( [LOCATION_CHANGE],                                    WebsocketsSagas.joinOrLeaveRoomOnRouteChange),
        takeLatest([REHYDRATE],                                          AuthenticationSagas.restoreToken),
        takeLatest([REHYDRATE],                                          AuthenticationSagas.refreshImportantData),
        takeLatest([REHYDRATE],                                          AuthenticationSagas.firstSignUpPopup),
        takeLatest([REHYDRATE],                                          ChatSagas.rehydrate),
        takeLatest([LeaderboardTypes.FETCH_ALL],                         LeaderboardSagas.fetchAll),
        takeLatest([REHYDRATE],                                          rehydrationDone),
        // @formatter:on
    ]);
};

const rehydrationDone = function* () {
    yield preLoading();
};

const preLoading = function* () {
    yield put(EventActions.fetchAll());
    yield put(AuthenticationActions.fetchReferrals());
    yield put(BetActions.fetchOpenBets());
    yield put(TransactionActions.fetchAll());
    yield put(ChatActions.fetchInitial());
    yield put(WebsocketsActions.init());

    const userId = yield select(state => state.authentication.userId);
    if(userId) {
        yield put(WebsocketsActions.joinRoom({
            userId,
            eventId: 'undefinedRoom',
        }));
    };

    yield put(PopupActions.show({
        popupType: PopupTheme.connectWallet,
    }));
};

export default {
    root,
};
