import { AuthenticationTypes } from '../actions/authentication';
import { put } from 'redux-saga/effects';
import { AlertActions } from '../actions/alert';
import { EventTypes } from '../actions/event';
import { BetTypes } from '../actions/bet';
import { delay } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';

const getFailMessage = action => {
  switch (action.type) {
    case AuthenticationTypes.REQUEST_SMS_FAILED:
      return 'An error occurred requesting sms. Please try again!';

    case AuthenticationTypes.VERIFY_SMS_FAILED:
      return 'An error occurred verifying sms. Please try again!';

    case AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED:
      return 'An error occurred saving details. Please try again!';

    case AuthenticationTypes.FETCH_REFERRALS_FAILED:
      return 'An error occurred fetching referral list. Please try again!';

    case EventTypes.FETCH_ALL_FAILED:
      return 'An error occurred fetching all events.';

    case EventTypes.CREATE_EVENT_FAILED:
      return 'An error occurred while creating event.';

    case EventTypes.EDIT_EVENT_FAILED:
      return 'An error occurred while updating event.';

    case EventTypes.DELETE_EVENT_FAILED:
      return 'An error occurred while deleting event.';

    case BetTypes.CREATE_FAILED:
      return 'An error occurred creating the trade. Please try again.';

    case BetTypes.EDIT_FAILED:
      return 'An error occurred updating the bet. Please try again.';

    case BetTypes.PLACE_FAILED:
      return 'An error occurred placing on the position. Please try again.';

    case BetTypes.PULL_OUT_BET_FAILED:
      return 'An error occurred selling position';
  }

  return null;
};

const getSuccessMessage = action => {
  switch (action.type) {
    case EventTypes.CREATE_EVENT_SUCCEEDED:
      return 'The event was successfully created!';

    case EventTypes.EDIT_EVENT_SUCCEEDED:
      return 'The event was successfully updated!';

    case EventTypes.DELETE_EVENT_SUCCEEDED:
      return 'The event was successfully deleted!';

    case BetTypes.CREATE_SUCCEEDED:
      return 'The bet was successfully created!';

    case BetTypes.EDIT_SUCCEEDED:
      return 'The bet was successfully updated!';

    case BetTypes.PLACE_SUCCEEDED:
      // return 'The position was placed successfully!';
      return null;

    case BetTypes.PULL_OUT_BET_SUCCEEDED:
      return 'The position was sold successfully!';
  }

  return null;
};

const handleFail = function* (action) {
  const message = getFailMessage(action);

  yield put(
    AlertActions.showError({
      message,
    })
  );
};

const handleSuccess = function* (action) {
  const message = getSuccessMessage(action);

  if (message) {
    yield put(
      AlertActions.showSuccess({
        message,
      })
    );
  }
};

const handleShown = function* (action) {
  const nextId = yield select(state => state.alert.nextAlertId);
  const id = nextId - 1;

  yield delay(8 * 1000);
  yield put(
    AlertActions.removeAlert({
      id,
    })
  );
};

export default {
  handleFail,
  handleSuccess,
  handleShown,
};
