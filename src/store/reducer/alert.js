import _ from 'lodash';
import AlertType from '../../components/AlertBox/AlertType';
import SelectionHelper from '../../helper/SelectionHelper';
import update from 'immutability-helper';
import { AlertTypes } from '../actions/alert';
import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
  alerts: [],
  nextAlertId: 0,
};

const removeAll = (action, state) => {
  return update(state, {
    $set: initialState,
  });
};

const remove = (action, state) => {
  const targetIndex = _.findIndex(state.alerts, ['id', action.id]);

  return update(state, {
    alerts: {
      $splice: [[targetIndex, 1]],
    },
  });
};

const showResult = (action, state) => {
  const type = SelectionHelper.get(action.type, {
    [AlertTypes.SHOW_ERROR]: AlertType.error,
    [AlertTypes.SHOW_SUCCESS]: AlertType.success,
  });
  const nextAlertId = state.nextAlertId;

  return update(state, {
    alerts: {
      $push: [
        {
          id: nextAlertId,
          message: action.message,
          type,
        },
      ],
    },
    nextAlertId: {
      $set: nextAlertId + 1,
    },
  });
};

const showNotification = (action, state) => {
  const nextAlertId = state.nextAlertId;

  return update(state, {
    alerts: {
      $push: [
        {
          id: nextAlertId,
          notification: {
            ...action.notification,
            payload: {
              ...action.notification,
            },
          },
          type: AlertType.notification,
        },
      ],
    },
    nextAlertId: {
      $set: nextAlertId + 1,
    },
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case LOCATION_CHANGE:
    case AlertTypes.REMOVE_ALL:
      return removeAll(action, state);
    case AlertTypes.REMOVE:
      return remove(action, state);
    case AlertTypes.SHOW_ERROR:
    case AlertTypes.SHOW_SUCCESS:
      return showResult(action, state);
    case AlertTypes.SHOW_NOTIFICATION:
      return showNotification(action, state);
    default:
      return state;
    // @formatter:on
  }
}
