import { makeActionCreator } from '../../helper/Store';

export const ChatTypes = {
  ADD_MESSAGE: 'Chat/ADD_MESSAGE',
  FETCH_BY_ROOM: 'Chat/FETCH_BY_ROOM',
  FETCH_BY_ROOM_SUCCESS: 'Chat/FETCH_BY_ROOM_SUCCESS',
  FETCH_BY_ROOM_FAIL: 'Chat/FETCH_BY_ROOM_FAIL',
};

const addMessage = makeActionCreator(ChatTypes.ADD_MESSAGE, {
  roomId: null,
  message: null,
});

const fetchByRoom = makeActionCreator(ChatTypes.FETCH_BY_ROOM, {
  roomId: null,
  limit: 20,
  skip: 0,
});

const fetchByRoomSuccess = makeActionCreator(ChatTypes.FETCH_BY_ROOM_SUCCESS, {
  roomId: null,
  messages: [],
  total: 0,
  skip: null,
  limit: null,
});

const fetchByRoomFail = makeActionCreator(ChatTypes.FETCH_BY_ROOM_FAIL, {
  roomId: null,
});

export const ChatActions = {
  fetch,
  addMessage,
  fetchByRoom,
  fetchByRoomSuccess,
  fetchByRoomFail,
};
