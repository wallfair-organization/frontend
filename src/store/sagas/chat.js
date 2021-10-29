import * as Api from '../../api';
import { call, put, select } from 'redux-saga/effects';
import { ChatActions } from '../actions/chat';
import _ from 'lodash';
import State from '../../helper/State';
import { UserActions } from '../actions/user';
import { AlertActions } from 'store/actions/alert';
import { UserMessageRoomId } from '../actions/websockets';

const addMessage = function* (action) {
  const userId = _.get(action, ['message', 'userId']);

  if (userId) {
    const users = yield select(state => state.user.users);
    const user = State.getUser(userId, users);

    if (!user) {
      yield put(
        UserActions.fetch({
          userId,
        })
      );
    }
  }
};

const fetchByRoom = function* (action) {
  const { roomId, limit = 20, skip = 0 } = action;
  const { response, error } =
    roomId === UserMessageRoomId
      ? yield call(Api.fetchChatMessagesByUser, limit, skip)
      : yield call(Api.fetchChatMessagesByRoom, roomId, limit, skip);

  if (response) {
    yield put(
      ChatActions.fetchByRoomSuccess({
        roomId,
        messages: response.data.messages,
        total: response.data.total,
        skip,
        limit,
      })
    );
  } else {
    yield put(ChatActions.fetchByRoomFail({ roomId }));
    yield put(AlertActions.showError(error));
  }
};

const setMessageRead = function* (action) {
  const messageId = action?.messageId;
  const roomId = action?.roomId || UserMessageRoomId;
  if (messageId) {
    yield call(Api.setUserMessageRead, messageId);
    yield fetchByRoom({ roomId });
  }
};

export default {
  addMessage,
  fetchByRoom,
  setMessageRead,
};
