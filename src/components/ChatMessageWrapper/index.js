import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import DateText from '../../helper/DateText';
import ChatMessageType from './ChatMessageType';
import ChatMessage from '../ChatMessage';
import BetActionChatMessage from '../BetActionChatMessage';

const ChatMessageWrapper = ({ message, date, parentRef, lastMessage }) => {
  const [dateString, setDateString] = useState('');

  const updateDateText = useCallback(() => {
    const dateText = DateText.getChatTimeText(date);

    setDateString(dateText);
  }, [date]);

  useEffect(() => {
    updateDateText();

    const timerId = window.setInterval(updateDateText, 5 * 1000);

    return () => clearInterval(timerId);
  }, [date, updateDateText]);

  const renderMessageContent = () => {
    const type = _.get(message, 'type');
    const user = _.get(message, 'user');
    const userId = _.get(message, 'userId');

    switch (type) {
      case ChatMessageType.event:
      case ChatMessageType.game:
      case ChatMessageType.user:
        return (
          <ChatMessage
            lastMessage={lastMessage}
            parentRef={parentRef}
            user={user}
            userId={userId}
            message={_.get(message, 'message')}
            dateString={dateString}
          />
        );

      case ChatMessageType.createBet:
      case ChatMessageType.placeBet:
      case ChatMessageType.pulloutBet:
        return (
          <BetActionChatMessage
            lastMessage={lastMessage}
            parentRef={parentRef}
            chatMessageType={type}
            message={message}
            user={user}
            dateString={dateString}
          />
        );
    }

    return null;
  };

  return renderMessageContent();
};

export default ChatMessageWrapper;
