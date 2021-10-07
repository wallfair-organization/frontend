import _ from 'lodash';
import styles from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
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
}) => {
  const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));
  const userName = _.get(user, 'username', 'Unknown');
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
      <Link to={`/user/${userId}`}>
        <img src={profilePicture} alt={userName} />
      </Link>
      <div>
        <Link to={`/user/${userId}`}>
          <span>
            <small>{userName}</small>
            <small>{dateString}</small>
          </span>
        </Link>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
