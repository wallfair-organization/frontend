import _ from 'lodash';
import update from 'immutability-helper';
import { ChatTypes } from '../actions/chat';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';

const initialState = {
  messagesByRoom: {},
};

const sortChatMessages = chatMessages =>
  chatMessages.sort((a = {}, b = {}) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    return aDate < bDate ? -1 : aDate === bDate ? 0 : 1;
  });

const addMessage = (action, state) => {
  const current = _.get(state, ['messagesByRoom', action.roomId], []);

  return update(state, {
    messagesByRoom: {
      [action.roomId]: {
        $set: sortChatMessages([...current, ...[action.message]]),
      },
    },
  });
};

const fetchByRoomSuccess = (action, state) => {
  const currentMessages = _.get(state, ['messagesByRoom', action.roomId], []);
  const notificationMessages = currentMessages.filter(m =>
    [
      ChatMessageType.createBet,
      ChatMessageType.placeBet,
      ChatMessageType.pulloutBet,
    ].includes(m.type)
  );

  return update(state, {
    messagesByRoom: {
      [action.roomId]: {
        $set: sortChatMessages([...notificationMessages, ...action.messages]),
      },
    },
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case ChatTypes.ADD_MESSAGE:
      return addMessage(action, state);
    case ChatTypes.FETCH_BY_ROOM_SUCCESS:
      return fetchByRoomSuccess(action, state);
    default:
      return state;
    // @formatter:on
  }
}
