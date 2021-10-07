import { makeActionCreator } from '../../helper/Store';

export const WebsocketsTypes = {
  INIT: 'Websockets/INIT',
  INIT_SUCCEEDED: 'Websockets/INIT_SUCCEEDED',
  INIT_FAILED: 'Websockets/INIT_FAILED',
  CONNECTED: 'Websockets/CONNECTED',
  DISCONNECTED: 'Websockets/DISCONNECTED',
  CLOSE: 'Websockets/CLOSE',
  JOIN_ROOM: 'Websockets/JOIN_ROOM',
  LEAVE_ROOM: 'Websockets/LEAVE_ROOM',
  SEND_CHAT_MESSAGE: 'Websockets/SEND_CHAT_MESSAGE',
  SEND_NOTIFICATION: 'Websockets/SEND_NOTIFICATION',
};
// initialize websockets and open event channel
const init = makeActionCreator(WebsocketsTypes.INIT);
const initFailed = makeActionCreator(WebsocketsTypes.INIT_FAILED, {
  error: null,
});
const initSucceeded = makeActionCreator(WebsocketsTypes.INIT_SUCCEEDED);
const connected = makeActionCreator(WebsocketsTypes.CONNECTED);
const disconnected = makeActionCreator(WebsocketsTypes.DISCONNECTED);
const close = makeActionCreator(WebsocketsTypes.CLOSE);
const joinRoom = makeActionCreator(WebsocketsTypes.JOIN_ROOM, {
  userId: null,
  roomId: null,
});
const leaveRoom = makeActionCreator(WebsocketsTypes.LEAVE_ROOM, {
  userId: null,
  roomId: null,
});
const sendChatMessage = makeActionCreator(WebsocketsTypes.SEND_CHAT_MESSAGE, {
  messageObject: null,
});
const sendNotification = makeActionCreator(WebsocketsTypes.SEND_NOTIFICATION, {
  notificationObject: null,
});
export const WebsocketsActions = {
  init,
  initSucceeded,
  initFailed,
  connected,
  disconnected,
  close,
  joinRoom,
  leaveRoom,
  sendChatMessage,
  sendNotification,
};
