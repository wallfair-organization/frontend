import _ from 'lodash';
import styles from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import classNames from 'classnames';
import { useRef, useEffect, useState } from 'react';

const ChatMessage = ({ user, message, dateString, className }) => {
  const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));
  const userName = _.get(user, 'username', 'Unknown');
  const [isVisible, setVisible] = useState(false);

  const domRef = useRef(null);

  useEffect(() => {
    const { current } = domRef;
    const observer = new IntersectionObserver(entries => {
      setVisible(entries[0].isIntersecting);
    });

    observer.observe(current);

    return () => {
      if (current) {
        observer.unobserve(current);
        observer.disconnect(current);
      }
    };
  }, []);

  return (
    <div
      className={classNames(
        styles.chatMessage,
        className,
        isVisible ? styles.isVisible : null
      )}
      ref={domRef}
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
