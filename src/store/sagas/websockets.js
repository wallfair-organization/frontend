import { take, put, call, select, delay } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { RosiGameActions } from '../actions/rosi-game';
import { NotificationActions } from '../actions/notification';
import { AlertActions, UserNotificationTypes } from '../actions/alert';
import _ from 'lodash';
import ChatMessageType from '../../components/ChatMessageWrapper/ChatMessageType';
import { ChatActions } from '../actions/chat';
import { WebsocketsActions, UserMessageRoomId } from '../actions/websockets';
import { createSocket, websocket } from '../../api/websockets';
import { createMatchSelector } from 'connected-react-router';
import Routes from '../../constants/Routes';
import { matchPath } from 'react-router';
import {
  UNIVERSAL_EVENTS_ROOM_ID,
  API_INFO_CHANNEL,
} from 'constants/Activities';
import { EventActions } from '../actions/event';
import { ChartParamsActions } from '../actions/chart-params';
import {
  InfoChannelActions,
} from '../actions/info-channel';
import trackedActivities from '../../components/ActivitiesTracker/trackedActivities';
import { GAMES } from '../../constants/Games';
import { UserActions } from '../actions/user';
import { ObjectId } from '../../helper/Games';
import * as Api from '../../api';

function createSocketChannel(socket) {
  return eventChannel(emit => {
    const connectHandler = () => {
      const message = {
        type: 'connect',
      };

      emit(message);
    };
    const chatMessageHandler = event => {
      const message = {
        ...event,
      };

      emit(message);
    };
    const addBetCreatedHandler = event => {
      const message = {
        ...event,
      };

      emit(message);
    };

    const addNewBetPlaceHandler = event => {
      const message = {
        ...event,
      };

      emit(message);
    };

    const addNewBetPullOutHandler = event => {
      const message = {
        ...event,
      };

      emit(message);
    };

    const notificationHandler = notification => {
      emit({
        type: 'notification',
        ...notification,
      });
    };

    const errorHandler = errorEvent => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason));
    };

    const casinoStartHandler = event => {
      const message = {
        type: ChatMessageType.casinoStart,
        ...event,
      };

      emit(message);
    };

    const casinoEndHandler = event => {
      const message = {
        type: ChatMessageType.casinoEnd,
        ...event,
      };

      emit(message);
    };

    const casinoTradeHandler = event => {
      const message = {
        type: ChatMessageType.casinoTrade,
        ...event,
      };

      emit(message);
    };

    const casinoRewardHandler = event => {
      const message = {
        type: ChatMessageType.casinoReward,
        ...event,
      };

      emit(message);
    };

    const casinoBetCanceledHandler = data => {
      const message = {
        ...data,
        type: ChatMessageType.casinoCancel,
      };

      emit(message);
    };

    const betStartedHandler = data => {
      const message = {
        ...data,
        type: UserNotificationTypes.BET_STARTED,
      };

      emit(message);
    };

    const infoChannelHandler = data => {
      const message = {
        type: 'INFO_CHANNEL',
        eventName: data.type,
        data: data?.data,
      };
      emit(message);
    };

    const onAnyListener = (eventName, data) => {
      const message = {
        type: 'any',
        eventName,
        data,
      };
      emit(message);
    };

    // setup the subscription
    socket.on('connect', connectHandler);
    socket.on('chatMessage', chatMessageHandler);
    socket.on('betCreated', addBetCreatedHandler);
    socket.on('betPlaced', addNewBetPlaceHandler);
    socket.on('betPulledOut', addNewBetPullOutHandler);
    socket.on('notification', notificationHandler);
    socket.on('error', errorHandler);
    socket.on('CASINO_START', casinoStartHandler);
    socket.on('CASINO_END', casinoEndHandler);
    socket.on('CASINO_TRADE', casinoTradeHandler);
    socket.on('CASINO_REWARD', casinoRewardHandler);
    socket.on('EVENT_BET_STARTED', betStartedHandler);
    socket.on('CASINO_CANCEL', casinoBetCanceledHandler);
    socket.on('INFO_CHANNEL', infoChannelHandler);
    socket.onAny(onAnyListener);

    const unsubscribe = () => {
      socket.off('chatMessage', chatMessageHandler);
      socket.off('betCreated', addBetCreatedHandler);
      socket.off('betPlaced', addNewBetPlaceHandler);
      socket.off('betPulledOut', addNewBetPullOutHandler);
      socket.off('notification', notificationHandler);
      socket.off('CASINO_START', casinoStartHandler);
      socket.off('CASINO_END', casinoEndHandler);
      socket.off('CASINO_TRADE', casinoTradeHandler);
      socket.off('CASINO_REWARD', casinoRewardHandler);
      socket.off('EVENT_BET_STARTED', betStartedHandler);
      socket.off('CASINO_CANCEL', casinoBetCanceledHandler);
      socket.off('INFO_CHANNEL', infoChannelHandler);
      socket.offAny(onAnyListener);
    };

    return unsubscribe;
  });
}

const notificationTypes = {
  EVENT_START: 'Notification/EVENT_START',
  EVENT_USER_REWARD: 'Notification/EVENT_USER_REWARD',
  EVENT_CANCEL: 'Notification/EVENT_CANCEL',
  EVENT_BET_STARTED: 'Notification/EVENT_BET_STARTED',
};

export function* init() {
  yield call(close);
  const token = yield select(state => state.authentication.token);
  try {
    const socket = yield call(createSocket, token);
    const socketChannel = yield call(createSocketChannel, socket);
    yield put(WebsocketsActions.initSucceeded());
    while (true) {
      try {
        const payload = yield take(socketChannel);
        const type = _.get(payload, 'type');
        let uid;

        switch (type) {
          case 'connect':
            if (socket && socket.connected) {
              yield put(WebsocketsActions.connected());
              const userId = yield select(state => state.authentication.userId);
              const rooms = yield select(state => state.websockets.rooms);
              if (rooms) {
                for (let roomId of rooms) {
                  yield put(
                    WebsocketsActions.joinRoom({
                      userId,
                      roomId: roomId,
                    })
                  );
                }
              }
            } else {
              yield put(WebsocketsActions.disconnected());
            }
            break;
          case ChatMessageType.casinoStart:
            yield put(RosiGameActions.setHasStarted(payload));
            yield put(RosiGameActions.resetCashedOut());
            break;
          case ChatMessageType.casinoEnd:
            const userId = yield select(state => state.authentication.userId);
            yield put(
              RosiGameActions.addLastCrash({
                nextGameAt: payload.nextGameAt,
                crashFactor: payload.crashFactor,
                gameHash: payload.gameId,
                userId,
              })
            );
            break;
          case ChatMessageType.casinoTrade:
            const u = yield select(state => state.authentication.userId);
            yield put(
              RosiGameActions.addInGameBet({ ...payload, clientUserId: u })
            );
            break;
          case ChatMessageType.casinoReward:
            uid = yield select(state => state.authentication.userId);
            yield put(
              RosiGameActions.addReward({ ...payload, clientUserId: uid })
            );
            break;
          case ChatMessageType.casinoCancel:
            uid = yield select(state => state.authentication.userId);
            yield put(
              RosiGameActions.handleCancelBet({ ...payload, clientUserId: uid })
            );
            break;
          case ChatMessageType.pulloutBet:
          case ChatMessageType.createBet:
          case ChatMessageType.event:
          case ChatMessageType.game:
          case ChatMessageType.user:
            yield put(
              ChatActions.addMessage({
                roomId: payload.roomId,
                message: payload,
              })
            );
            break;
          case 'notification':
          case UserNotificationTypes.BET_RESOLVED:
          case UserNotificationTypes.BET_CLOSED:
          case UserNotificationTypes.EVENT_BET_CANCELLED:
          case UserNotificationTypes.EVENT_CANCEL:
          case UserNotificationTypes.EVENT_RESOLVE:
          case UserNotificationTypes.EVENT_USER_REWARD:
          case UserNotificationTypes.USER_AWARD:
          case UserNotificationTypes.EVENT_USER_KYC_UPDATE:
            yield put(
              AlertActions.showNotification({
                notification: payload,
              })
            );
            yield put(ChatActions.fetchByRoom({ roomId: UserMessageRoomId }));
            if (type === UserNotificationTypes.EVENT_USER_KYC_UPDATE) {
              yield put(UserActions.fetch({ forceFetch: true }));
            }
            break;
          case notificationTypes.EVENT_BET_STARTED:
            yield put(EventActions.fetchAll());
            break;
          case 'INFO_CHANNEL':
            yield put(InfoChannelActions.setPrices(payload.data));
            break;
          case 'any':
            if (trackedActivities.indexOf(payload.eventName) > -1) {
              yield put(
                NotificationActions.addActivity({
                  activity: payload.data,
                  eventName: payload.eventName,
                })
              );
            }

            if (payload.eventName === ChatMessageType.placeBet) {
              const chartParams = yield select(state => state.chartParams);
              yield put(
                ChartParamsActions.updateChartParams({
                  ...chartParams,
                  reload: new Date(),
                })
              );
            }
            break;
        }
      } catch (err) {
        console.error('socket error:', err);
        // socketChannel is still open in catch block
        // if we want end the socketChannel, we need close it explicitly
        // socketChannel.close()
      }
    }
  } catch (error) {
    yield put(WebsocketsActions.initFailed({ error }));
  }
}

const isActivitiesPage = (currentAction, pathSlugs) =>
  currentAction[0] === 'activities' || pathSlugs[0] === 'activities';
const isHomePage = (currentAction, pathSlugs) =>
  ['', 'logout'].includes(currentAction[0]) ||
  ['', 'logout'].includes(pathSlugs[0]);
const isGamePage = (currentAction, pathSlugs) =>
  (currentAction[0] === 'games' || pathSlugs[0] === 'games') &&
  (pathSlugs.length > 1 || currentAction.length > 1);
const isExternalPage = (currentAction, pathSlugs) =>
  (currentAction[0] === 'external-game' || pathSlugs[0] === 'external-game') &&
  (pathSlugs.length > 1 || currentAction.length > 1);
const isEvoplayPage = (currentAction, pathSlugs) =>
  (currentAction[0] === 'evoplay-game' || pathSlugs[0] === 'evoplay-game') &&
  (pathSlugs.length > 1 || currentAction.length > 1);
const isSoftswissPage = (currentAction, pathSlugs) =>
  currentAction[0] === 'softswiss-game' || pathSlugs[0] === 'softswiss-game';

export function* joinOrLeaveRoomOnRouteChange(action) {
  const ready = yield select(state => state.websockets.init);
  const connected = yield select(state => state.websockets.connected);

  if (!ready && !connected) {
    return yield call(init);
    // @TODO: we need to call/fork from init to join-or-leave
  }

  const userId = yield select(state => state.authentication.userId);
  const currentRooms = yield select(state => state.websockets.rooms) || [];
  const pathname = yield select(state => state.router.location.pathname);
  const currentAction = action.payload.location.pathname.slice(1).split('/');
  const pathSlugs = pathname.slice(1).split('/');
  let newRoomsToJoin = [];

  if (currentAction[0] === 'trade' || pathSlugs[0] === 'trade') {
    const eventSlug = pathSlugs[1];
    const event = yield call(
      Api.getEventBySlug,
      !!currentAction[1] ? currentAction[1] : eventSlug
    );
    if (event) newRoomsToJoin.push(event.id);
  }

  if (
    isActivitiesPage(currentAction, pathSlugs) ||
    isHomePage(currentAction, pathSlugs)
  ) {
    newRoomsToJoin.push(UNIVERSAL_EVENTS_ROOM_ID);
  }

  if (isGamePage(currentAction, pathSlugs)) {
    const game = Object.values(GAMES).find(
      g => g.slug === (pathSlugs[1] || currentAction[1])
    );
    if (game) {
      newRoomsToJoin.push(game.id);
      newRoomsToJoin.push(UNIVERSAL_EVENTS_ROOM_ID);
    }
  }
  if (isEvoplayPage(currentAction, pathSlugs)) {
    newRoomsToJoin.push(pathSlugs[1]);
    newRoomsToJoin.push(UNIVERSAL_EVENTS_ROOM_ID);
  }
  if (isExternalPage(currentAction, pathSlugs)) {
    newRoomsToJoin.push(ObjectId(pathSlugs[1]));
    newRoomsToJoin.push(UNIVERSAL_EVENTS_ROOM_ID);
  }

  if (isSoftswissPage(currentAction, pathSlugs)) {
    newRoomsToJoin.push(pathSlugs[1]);
    newRoomsToJoin.push(UNIVERSAL_EVENTS_ROOM_ID);
  }

  //JOIN TO API INFO CHANNEL
  newRoomsToJoin.push(API_INFO_CHANNEL);

  // leave all non active rooms except UserMessageRoomId
  for (let roomIdToLeave of currentRooms) {
    if (
      roomIdToLeave !== UserMessageRoomId &&
      !newRoomsToJoin.includes(roomIdToLeave)
    ) {
      yield put(
        WebsocketsActions.leaveRoom({
          userId,
          roomId: roomIdToLeave,
        })
      );
    }
  }

  // join all non already active rooms
  for (let roomId of newRoomsToJoin) {
    if (!currentRooms.includes(roomId)) {
      yield put(
        WebsocketsActions.joinRoom({
          userId,
          roomId: roomId,
        })
      );
    }
  }
}

export function* connected() {
  const location = yield select(state => state.router.location);
  const matchesTradeRoute = matchPath(location.pathname, Routes.event);

  if (matchesTradeRoute) {
    const { params } = yield select(state =>
      createMatchSelector({ path: Routes.event })(state)
    );
    const { eventId } = params;

    if (eventId) {
      const userId = yield select(state => state.authentication.userId);
      yield put(
        WebsocketsActions.joinRoom({
          userId,
          roomId: eventId,
        })
      );
    }
  }
}

export function* joinRoom(action) {
  const init = yield select(state => state.websockets.init);
  const connected = yield select(state => state.websockets.connected);

  if (init && websocket && connected) {
    websocket.emit('joinRoom', action);
  }
}

export function* leaveRoom(action) {
  const init = yield select(state => state.websockets.init);

  if (init && websocket) {
    websocket.emit('leaveRoom', action);
  }
}

export function* sendChatMessage(action) {
  const init = yield select(state => state.websockets.init);
  const connected = yield select(state => state.websockets.connected);
  const token = yield select(state => state.authentication.token);

  if (init && websocket && connected && token) {
    websocket.emit('chatMessage', action.messageObject);
  }
}

export function close() {
  if (websocket && websocket.connected) {
    websocket.emit('forceDisconnect');
  }
}

export function* idleCheck() {
  if (websocket && !websocket.connected) {
    yield put(WebsocketsActions.disconnected());
  }

  yield delay(5000);
  yield call(idleCheck);
}

export default {
  init,
  connected,
  joinRoom,
  leaveRoom,
  sendChatMessage,
  joinOrLeaveRoomOnRouteChange,
  idleCheck,
  close,
};
