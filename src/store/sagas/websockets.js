import { take, put, call, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { RosiGameActions } from '../actions/rosi-game';
import { NotificationActions } from '../actions/notification';
import _ from 'lodash';
import ChatMessageType from '../../components/ChatMessageWrapper/ChatMessageType';
import { ChatActions } from '../actions/chat';
import { WebsocketsActions } from '../actions/websockets';
import { createSocket, websocket } from '../../api/websockets';
import { createMatchSelector } from 'connected-react-router';
import Routes from '../../constants/Routes';
import { matchPath } from 'react-router';
import { ROSI_GAME_EVENT_ID } from 'constants/RosiGame';

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
    };

    return unsubscribe;
  });
}

const notificationTypes = {
  EVENT_START: 'Notification/EVENT_START',
  EVENT_RESOLVE: 'Notification/EVENT_RESOLVE',
  EVENT_CANCEL: 'Notification/EVENT_CANCEL',
};

export function* init() {
  const token = yield select(state => state.authentication.token);

  try {
    const socket = yield call(createSocket, token);
    const socketChannel = yield call(createSocketChannel, socket);

    yield put(WebsocketsActions.initSucceeded());

    while (true) {
      try {
        const payload = yield take(socketChannel);
        const type = _.get(payload, 'type');

        switch (type) {
          case 'connect':
            yield put(WebsocketsActions.connected());
            break;
          case ChatMessageType.casinoStart:
            yield put(
              RosiGameActions.setHasStarted({
                timeStarted: payload.timeStarted,
              })
            );
            yield put(RosiGameActions.resetCashedOut());
            break;
          case ChatMessageType.casinoEnd:
            yield put(
              RosiGameActions.addLastCrash({
                crashFactor: payload.crashFactor,
              })
            );
            break;
          case ChatMessageType.casinoTrade:
            yield put(RosiGameActions.addInGameBet(payload));
            break;
          case ChatMessageType.casinoReward:
            console.log(payload);
            break;
          case ChatMessageType.pulloutBet:
          case ChatMessageType.createBet:
          case ChatMessageType.placeBet:
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
          case notificationTypes.EVENT_CANCEL:
          case notificationTypes.EVENT_RESOLVE:
          case notificationTypes.EVENT_START:
            yield put(
              NotificationActions.addNotification({
                eventId: payload.eventId,
                notification: payload,
              })
            );
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

export function* joinOrLeaveRoomOnRouteChange(action) {
  const connected = yield select(state => state.websockets.connected);

  if (!connected) {
    yield call(init);
    // @TODO: we need to call/fork from init to join-or-leave
  } else {
    const userId = yield select(state => state.authentication.userId);
    const room = yield select(state => state.websockets.room);
    const pathname = yield select(state => state.router.location.pathname);
    const currentAction = action.payload.location.pathname.slice(1).split('/');
    const pathSlugs = pathname.slice(1).split('/');
    // event page

    if (currentAction[0] === 'trade' || pathSlugs[0] === 'trade') {
      const eventSlug = pathSlugs[1];
      const events = yield select(state => state.event.events);
      const event = events.find(
        e => e.slug === (!!currentAction[1] ? currentAction[1] : eventSlug)
      );

      if (eventSlug !== currentAction[1]) {
        if (room) {
          yield put(
            WebsocketsActions.leaveRoom({
              userId,
              roomId: room,
            })
          );
        }
        if (event) {
          yield put(
            WebsocketsActions.joinRoom({
              userId,
              roomId: event._id,
            })
          );
        }
      } else {
        yield put(
          WebsocketsActions.joinRoom({
            userId,
            roomId: event._id,
          })
        );
      }
    } else if (pathSlugs[1] === 'rosi-game') {
      if (room) {
        yield put(
          WebsocketsActions.leaveRoom({
            userId,
            roomId: room,
          })
        );
      }

      yield put(
        WebsocketsActions.joinRoom({
          userId,
          roomId: ROSI_GAME_EVENT_ID,
        })
      );
    } else {
      if (room) {
        yield put(
          WebsocketsActions.leaveRoom({
            userId,
            roomId: room,
          })
        );
      }
    }
  }
}

export function* connected(action) {
  const location = yield select(state => state.router.location);
  const matchesTradeRoute = matchPath(location.pathname, Routes.bet);

  if (matchesTradeRoute) {
    const { params } = yield select(state =>
      createMatchSelector({ path: Routes.bet })(state)
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

export default {
  init,
  connected,
  joinRoom,
  leaveRoom,
  sendChatMessage,
  joinOrLeaveRoomOnRouteChange,
};
