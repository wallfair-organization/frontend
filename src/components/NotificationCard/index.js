import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './styles.module.scss';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import { UserNotificationTypes } from '../../store/actions/alert';
import medalSilver from '../../data/icons/medal-second.png';

const NotificationsItem = ({ notification, onMarkAsRead, events }) => {
  const markNotificationRead = () => {
    onMarkAsRead(notification);
  };

  const tryLoadEventFromPayload = () => {
    if (notification.payload?.eventId) {
      return events?.find(e => e._id === notification.payload.eventId);
    }
    return null;
  };

  const replaceEventWithLink = message => {
    let eventSlug = notification.payload?.eventSlug;
    if (!eventSlug) {
      const event = tryLoadEventFromPayload();
      if (event) {
        eventSlug = event.slug;
      }
    }
    if (eventSlug) {
      const [beforeLink, afterLink] = message.split('[event]');
      return (
        <>
          {beforeLink}
          <Link to={`/trade/${eventSlug}`} onClick={markNotificationRead}>
            event
          </Link>
          {afterLink}
        </>
      );
    }
  };

  const getMessageContent = () => {
    let messageContent = notification.message;
    if (messageContent?.indexOf('[event]') > -1) {
      messageContent = replaceEventWithLink(messageContent);
    }

    return (
      <p>
        {notification.payload?.betQuestion && (
          <em>{notification.payload?.betQuestion}</em>
        )}
        {messageContent}
      </p>
    );
  };

  let imageUrl = notification.payload?.imageUrl;
  if (notification.type === UserNotificationTypes.USER_AWARD) {
    imageUrl = medalSilver;
  }

  return (
    notification && (
      <>
        <div key={notification.id} className={style.notificationCardUnread}>
          <div className={style.notificationCardContent}>
            <div className={style.notificationMessage}>
              {getMessageContent()}

              <div className={style.imageContainer}>
                {imageUrl ? (
                  <img
                    className={style.notificationCardThumbnail}
                    alt={'notification'}
                    src={imageUrl}
                  />
                ) : null}
              </div>
              <Icon
                className={style.closeIcon}
                iconType={IconType.deleteInput}
                onClick={markNotificationRead}
              />
            </div>
          </div>
        </div>
      </>
    )
  );
};

const mapStateToProps = state => {
  return {
    events: state.event.events,
  };
};

export default connect(mapStateToProps, null)(NotificationsItem);
