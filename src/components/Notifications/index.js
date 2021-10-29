import style from './styles.module.scss';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import NotificationCard from '../NotificationCard';
import IconTheme from '../Icon/IconTheme';

const Notifications = ({
  total,
  notifications,
  setUnread,
  closeNotifications,
}) => {
  const markAllRead = () => {
    for (const notification of notifications) {
      setUnread(notification);
    }
  };

  return (
    <div className={style.notifications}>
      <div className={style.notificationsHeader}>
        <Icon
          className={style.closeNotifications}
          iconType={IconType.cross}
          onClick={closeNotifications}
        />
        <p className={style.notificationHeadline}>Notifications</p>
        {total > 0 && (
          <p className={style.markRead} onClick={markAllRead}>
            Mark all as read
          </p>
        )}
      </div>
      <div className={style.notificationsHolder}>
        {notifications.map(notification => {
          return (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onMarkAsRead={setUnread}
            />
          );
        })}

        {total === 0 && (
          <div className={style.emptyListWrapper}>
            <div className={style.emptyListPicture}>
              <div className={style.emptyListPictureContainer}>
                <div className={style.iconContainer}>
                  <Icon
                    className={style.emptyListIcon}
                    iconTheme={IconTheme.white}
                    iconType={IconType.success}
                  />
                </div>
              </div>
              <p className={style.emptyListLabel}>No new notifications</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
