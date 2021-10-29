import { makeActionCreator } from '../../helper/Store';

export const AlertTypes = {
  REMOVE: 'Alert/REMOVE',
  REMOVE_ALL: 'Alert/REMOVE_ALL',
  SHOW_ERROR: 'Alert/SHOW_ERROR',
  SHOW_SUCCESS: 'Alert/SHOW_SUCCESS',
  SHOW_NOTIFICATION: 'Alert/SHOW_NOTIFICATION',
};

const removeAlert = makeActionCreator(AlertTypes.REMOVE, {
  id: null,
});

const removeAlerts = makeActionCreator(AlertTypes.REMOVE_ALL);

const showError = makeActionCreator(AlertTypes.SHOW_ERROR, {
  id: null,
  message: null,
});

const showSuccess = makeActionCreator(AlertTypes.SHOW_SUCCESS, {
  id: null,
  message: null,
});

const showNotification = makeActionCreator(AlertTypes.SHOW_NOTIFICATION, {
  id: null,
  notification: null,
});

export const AlertActions = {
  removeAlert,
  removeAlerts,
  showError,
  showSuccess,
  showNotification,
};
