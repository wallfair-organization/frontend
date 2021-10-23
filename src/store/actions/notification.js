import { makeActionCreator } from '../../helper/Store';

export const NotificationTypes = {
  ADD_NOTIFICATION: 'Notification/ADD_NOTIFICATION',
  SET_UNREAD: 'Notification/SET_UNREAD',
  ADD_ACTIVITY: 'Notification/ADD_ACTIVITY',
  CLEANUP_ACTIVITIES: 'Notification/CLEANUP_ACTIVITIES',
};

const addNotification = makeActionCreator(NotificationTypes.ADD_NOTIFICATION, {
  eventId: null,
  notification: null,
});

const addActivity = makeActionCreator(NotificationTypes.ADD_ACTIVITY, {
  eventName: null,
  activity: null,
});

const cleanUpActivities = makeActionCreator(
  NotificationTypes.CLEANUP_ACTIVITIES,
  {
    data: null,
  }
);

const setUnread = makeActionCreator(NotificationTypes.SET_UNREAD, {
  notification: null,
});

export const NotificationActions = {
  addNotification,
  addActivity,
  cleanUpActivities,
  setUnread,
};
