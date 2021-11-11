import { io } from 'socket.io-client';
import { BACKEND_SOCKET_URL } from '../constants/Api';

export let websocket = null;
export const createSocket = token => {
  const socket = io(BACKEND_SOCKET_URL, {
    query: `token=${token}`,
    transports: ['websocket'],
  });
  websocket = socket;

  return socket;
};

export default {
  websocket,
  createSocket,
};
