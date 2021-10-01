import _ from 'lodash';
import styles from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import classNames from 'classnames';
import { useState } from 'react';
import { useChatIntersection } from '../../hooks/useChatIntersection';

const ChatMessage = ({
  user,
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
      <img src={profilePicture} alt={userName} />
      <div>
        <span>
          <small>{userName}</small>
          <small>{dateString}</small>
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
