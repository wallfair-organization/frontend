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
        $set: {
          messages: sortChatMessages([
            ...current.messages,
            ...[action.message],
          ]),
          total: current.total + 1,
        },
      },
    },
  });
};

const fetchByRoomSuccess = (action, state) => {
  const currentMessages = _.get(
    state,
    ['messagesByRoom', action.roomId, 'messages'],
    []
  );
  const notificationMessages = currentMessages
    ? currentMessages.filter(
        m =>
          m &&
          [
            ChatMessageType.createBet,
            ChatMessageType.placeBet,
            ChatMessageType.pulloutBet,
          ].includes(m.type)
      )
    : [];

  return update(state, {
    messagesByRoom: {
      [action.roomId]: {
        $set: {
          messages:
            action.skip !== 0
              ? sortChatMessages([...currentMessages, ...action.messages])
              : sortChatMessages([...notificationMessages, ...action.messages]),
          total: action.total,
          skip: action.skip,
          limit: action.limit,
        },
      },
      loading: {
        $set: false,
      },
    },
  });
};

const showLoading = state => {
  return update(state, {
    messagesByRoom: {
      loading: {
        $set: true,
      },
    },
  });
};

const hideLoading = state => {
  return update(state, {
    messagesByRoom: {
      loading: {
        $set: false,
      },
    },
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case ChatTypes.FETCH_BY_ROOM:
      return showLoading(state);
    case ChatTypes.FETCH_BY_ROOM_FAIL:
      return hideLoading(state);
    case ChatTypes.ADD_MESSAGE:
      return addMessage(action, state);
    case ChatTypes.FETCH_BY_ROOM_SUCCESS:
      return fetchByRoomSuccess(action, state);
    default:
      return state;
    // @formatter:on
  }
}
