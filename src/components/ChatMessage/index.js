import _ from 'lodash';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChatIntersection } from '../../hooks/useChatIntersection';

const ChatMessage = ({
  user,
  userId,
  message,
  dateString,
  className,
  parentRef,
  lastMessage,
  currentUser,
}) => {
  const userName =
    currentUser?.userId === userId ? 'You' : _.get(user, 'username', 'Unknown');
  const [isVisible, setVisible] = useState(false);
  const elementRef = useChatIntersection(parentRef, setVisible);
  return (
    <div
      className={classNames(
        styles.chatMessage,
        className,
        lastMessage ? styles.newMessage : null,
        isVisible ? styles.isVisible : null
      )}
      ref={elementRef}
    >
      {/* <Link to={`/user/${userId}`}>
        <img src={profilePicture} alt={userName} />
      </Link> */}
      <span className={styles.singleMessageTime}>{dateString}</span>
      <Link
        to={`/user/${userId}`}
        className={classNames(
          styles.singleMessageUser,
          currentUser?.userId === userId && styles.singleMessageCurrentUser
        )}
      >
        {userName}
      </Link>
      {`:`}
      <span className={styles.singleMessage}>{message}</span>
    </div>
  );
};

export default ChatMessage;
