import { WebsocketsTypes } from '../actions/websockets';

const initialState = {
  init: false,
  connected: false,
  room: null,
};

const initSucceeded = (action, state) => {
  return { ...state, init: true, connected: false };
};
const close = (action, state) => {
  return { ...state, init: false, connected: false };
};
const connected = (action, state) => {
  return { ...state, connected: true };
};
const disconnected = (action, state) => {
  return { ...state, connected: false };
};
const joinRoom = (action, state) => {
  return { ...state, room: action.roomId };
};
const leaveRoom = (action, state) => {
  return { ...state, room: null };
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case WebsocketsTypes.INIT_SUCCEEDED:
      return initSucceeded(action, state);

    case WebsocketsTypes.CLOSE:
      return close(action, state);

    case WebsocketsTypes.CONNECTED:
      return connected(action, state);

    case WebsocketsTypes.DISCONNECTED:
      return disconnected(action, state);

    case WebsocketsTypes.JOIN_ROOM:
      return joinRoom(action, state);

    case WebsocketsTypes.LEAVE_ROOM:
      return leaveRoom(action, state);

    default:
      return state;
    // @formatter:on
  }
}
