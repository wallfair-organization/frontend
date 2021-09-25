import _ from 'lodash';
import ChatMessageWrapper from '../ChatMessageWrapper';
import classNames from 'classnames';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType from '../../components/Icon/IconType';
import Input from '../Input';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { WebsocketsActions } from '../../store/actions/websockets';
import { usePrevPropValue } from '../../hooks/usePrevPropValue';
import { useIsMount } from '../hoc/useIsMount';
import { LOGGED_IN } from 'constants/AuthState';

const Chat = ({
  className,
  inputClassName,
  messagesClassName,
  user,
  roomId,
  chatMessageType,
  messages,
  sendChatMessage,
  hideInput = false,
}) => {
  const messageListRef = useRef();
  const [message, setMessage] = useState('');
  const [lastMessageSent, setLastMessageSent] = useState(0);
  const prevMessages = usePrevPropValue(messages);
  const isMount = useIsMount();

  const isLoggedIn = () => user.authState === LOGGED_IN;

  useEffect(() => {
    if (
      (messages &&
        prevMessages &&
        messages.length &&
        prevMessages.length &&
        messages.length > prevMessages.length) ||
      isMount
    ) {
      messageListScrollToBottom();
    }
  }, [messages, prevMessages, isMount]);

  const onMessageSend = () => {
    if (message) {
      const currentTimeStamp = +new Date();
      const difference = currentTimeStamp - lastMessageSent;

      if (difference >= 2 * 1000) {
        const messageData = {
          roomId,
          user: {
            name: user.name,
            username: user.username,
            profilePicture: user.profilePicture,
            profilePictureUrl: user.profilePictureUrl,
          },
          type: chatMessageType,
          message: message,
          date: new Date(),
          userId: user?.userId,
        };

        setMessage('');
        sendChatMessage(messageData);
        setLastMessageSent(currentTimeStamp);
      }
    }
  };

  const renderMessages = () => {
    return _.map(messages, (chatMessage, index) => {
      const date = _.get(chatMessage, 'date');
      return (
        <ChatMessageWrapper key={index} message={chatMessage} date={date} />
      );
    });
  };

  const messageListScrollToBottom = () => {
    if (messageListRef) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  const onMessageInputChange = event => {
    const value = _.get(event, ['target', 'value'], '');
    const message = _.truncate(value, { length: 400 });

    setMessage(message);
  };

  return (
    <div className={classNames(styles.chatContainer, className)}>
      <div
        className={classNames(messagesClassName, styles.messageContainer)}
        ref={messageListRef}
      >
        {renderMessages()}
      </div>
      <div
        className={classNames(
          styles.messageInput,
          inputClassName,
          hideInput ? styles.messageInputHidden : null,
          !isLoggedIn() ? styles.disabled : null
        )}
      >
        <Input
          type={'text'}
          placeholder={'Comment...'}
          value={message}
          disabled={!isLoggedIn()}
          onChange={onMessageInputChange}
          onSubmit={onMessageSend}
        />
        <button type={'submit'} onClick={onMessageSend}>
          <Icon iconType={IconType.chat} iconTheme={IconTheme.primary} />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authentication,
    messages: _.get(state, ['chat', 'messagesByRoom', ownProps.roomId], []),
    connected: state.websockets.connected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendChatMessage: messageObject => {
      dispatch(WebsocketsActions.sendChatMessage({ messageObject }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
