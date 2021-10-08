import _ from 'lodash';
import ChatMessageWrapper from '../ChatMessageWrapper';
import classNames from 'classnames';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType from '../../components/Icon/IconType';
import Input from '../Input';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { WebsocketsActions } from '../../store/actions/websockets';
import { usePrevPropValue } from '../../hooks/usePrevPropValue';
import { useIsMount } from '../hoc/useIsMount';
import { LOGGED_IN } from 'constants/AuthState';
import { ChatActions } from 'store/actions/chat';

const Chat = ({
  className,
  inputClassName,
  messagesClassName,
  user,
  roomId,
  chatMessageType,
  messages,
  total,
  loading,
  skipped,
  sendChatMessage,
  hideInput = false,
  connected,
  fetchChatMessages,
}) => {
  const messageListRef = useRef();
  const [message, setMessage] = useState('');
  const [lastMessageSent, setLastMessageSent] = useState(0);
  const [skip, setSkip] = useState(0);
  const prevMessages = usePrevPropValue(messages);
  const isMount = useIsMount();
  const [paginationReady, setPaginationReady] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [prevScrollPosition, setPrevScrollPosition] = useState(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(null);

  const LIMIT = 20;

  let intersectionObservableRef = useRef();
  const observer = useRef();
  const intersectionElementRef = useCallback(
    e => {
      intersectionObservableRef.current = e;

      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            if (paginationReady && skip !== skipped) {
              const offset = total - messages.length;
              const limit = offset < LIMIT ? offset : LIMIT;
              fetchChatMessages(roomId, limit, skip);
              setPrevScrollHeight(messageListRef.current.scrollHeight);
              setPrevScrollPosition(messageListRef.current.scrollTop);
            } else {
              setPaginationReady(true);
            }
          }
        },
        { threshold: 0.5 }
      );

      if (e) {
        observer.current.observe(e);
      }
    },
    [loading, hasMore, paginationReady, skip, skipped]
  );

  const isLoggedIn = () => user.authState === LOGGED_IN;

  useEffect(() => {
    return () => {
      const { current } = intersectionObservableRef;

      if (current && observer.current) {
        observer.current.disconnect();
        observer.current.unobserve(current);
      }
    };
  }, []);

  useEffect(() => {
    setSkip(messages.length);
    setHasMore(messages.length < total);

    const messageList = messageListRef.current;

    if (prevScrollHeight && messageList.scrollHeight !== prevScrollHeight) {
      messageListRef.current.scrollTo({
        top: prevScrollPosition + messageList.scrollHeight - prevScrollHeight,
        left: 0,
        behavior: 'instant',
      });
      setPrevScrollHeight(null);
      setPrevScrollPosition(null);
    } else if (
      messageList.scrollHeight - messageList.clientHeight <
      messageList.scrollTop + 100
    ) {
      messageListScrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (
      (messages &&
        prevMessages &&
        messages.length &&
        prevMessages.length &&
        messages.length > prevMessages.length &&
        !paginationReady) ||
      isMount
    ) {
      messageListScrollToBottom();
      setPaginationReady(true);
    }
  }, [messages, prevMessages, isMount, paginationReady]);

  const onMessageSend = () => {
    if (message) {
      const messageTime = new Date();
      const currentTimeStamp = +messageTime;

      if (currentTimeStamp - lastMessageSent >= 2 * 1000) {
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
          date: messageTime,
          userId: user?.userId,
        };

        setPaginationReady(false);
        setMessage('');
        sendChatMessage(messageData);
        setLastMessageSent(currentTimeStamp);
      }
    }
  };

  const renderMessages = () => {
    return (
      <>
        {hasMore && (
          <div
            ref={intersectionElementRef}
            className={styles.paginationIntersection}
          ></div>
        )}

        {_.map(messages, (chatMessage, index) => {
          const date = _.get(chatMessage, 'date');
          return (
            <ChatMessageWrapper
              key={chatMessage._id}
              message={chatMessage}
              date={date}
              parentRef={messageListRef}
              lastMessage={index === messages.length - 1}
            />
          );
        })}
      </>
    );
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
        className={classNames(styles.messageContainer, messagesClassName)}
        ref={messageListRef}
      >
        {renderMessages()}
      </div>
      <div
        className={classNames(
          styles.messageInput,
          inputClassName,
          hideInput ? styles.messageInputHidden : null,
          !isLoggedIn() || !connected ? styles.disabled : null
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
  const messagesByRoom = _.get(
    state,
    ['chat', 'messagesByRoom', ownProps.roomId],
    {}
  );
  return {
    user: state.authentication,
    messages: messagesByRoom.messages || [],
    total: messagesByRoom.total || 0,
    loading: state.chat.messagesByRoom.loading,
    skipped: messagesByRoom.skip,
    connected: state.websockets.connected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendChatMessage: messageObject => {
      dispatch(WebsocketsActions.sendChatMessage({ messageObject }));
    },
    fetchChatMessages: (roomId, limit, skip) => {
      dispatch(ChatActions.fetchByRoom({ roomId, limit, skip }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
