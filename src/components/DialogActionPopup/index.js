import * as Api from 'api';
import Button from 'components/Button';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import styles from './styles.module.scss';
import HighlightType from 'components/Highlight/HighlightType';
import { Input, InputLabel } from 'components/Form';
import { useState } from 'react';
import actions from './DialogActions';
import { EventActions } from 'store/actions/event';

const actionTypes = {
  [actions.cancelBet]: {
    title: 'Cancel Bet',
    text: 'Are you sure you want to cancel the bet?',
    acceptLabel: 'Cancel Bet',
    declineLabel: "Don't Cancel",
    onAccept: (bet, { hidePopup }, data) =>
      Api.cancelBet(bet._id, data).then(() => hidePopup()),
    form: (_, setData, setValid) => {
      const setForm = reason => {
        setData({ reasonOfCancellation: reason });
        setValid(reason?.length > 0);
      };
      return (
        <form className={styles.form}>
          <InputLabel>Cancellation Reason</InputLabel>
          <Input onChange={setForm} />
        </form>
      );
    },
  },
  [actions.deleteBet]: {
    title: 'Delete Bet',
    text: 'Are you sure you want to delete the bet?',
    acceptLabel: 'Delete',
    declineLabel: 'Cancel',
    onAccept: (bet, { hidePopup }) =>
      Api.deleteBet(bet._id).then(() => hidePopup()),
  },
  [actions.deleteEvent]: {
    title: 'Delete Event',
    text: 'Are you sure you want to delete the event?',
    acceptLabel: 'Delete',
    declineLabel: 'Cancel',
    onAccept: ({ _id }, { deleteEvent }) => deleteEvent(_id),
    getBody: e => (
      <p className={styles.text}>
        Are you sure you want to delete the event?
        <strong>{e?.name}</strong>
      </p>
    ),
  },
  [actions.disableSharing]: {
    title: 'Wallfair',
    text: 'Sharing is disabled during closed testing',
    acceptLabel: 'Ok',
    declineLabel: 'Disabled',
    onAccept: (data, { hidePopup }) => hidePopup(),
  },
};

const DialogActionPopup = ({ data, actionType, actionDispatchers }) => {
  const { onAccept, title, text, getBody, acceptLabel, declineLabel, form } =
    actionTypes[actionType];

  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(!form);

  if (!actionTypes[actionType]) {
    return;
  }

  const body = !!getBody ? (
    getBody(data)
  ) : (
    <p className={styles.text}>
      {text}
      {declineLabel !== 'Disabled' && <strong>"{data?.marketQuestion}"</strong>}
    </p>
  );

  return (
    <div className={styles.contentContainer}>
      <h2 className={styles.title}>{title}</h2>

      {body}

      {!!form && form(formData, setFormData, setIsFormValid)}

      <div className={styles.buttonContainer}>
        {declineLabel !== 'Disabled' && (
          <Button
            withoutBackground={true}
            className={styles.declineButton}
            onClick={actionDispatchers.hidePopup}
          >
            {declineLabel}
          </Button>
        )}
        <Button
          className={styles.acceptButton}
          highlightType={HighlightType.highlightModalButton}
          withoutBackground={true}
          disabled={!isFormValid}
          onClick={() => onAccept(data, actionDispatchers, formData)}
        >
          {acceptLabel}
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    actionDispatchers: {
      deleteEvent: eventId => {
        dispatch(EventActions.deleteEvent(eventId));
      },
      hidePopup: () => {
        dispatch(PopupActions.hide());
      },
    },
  };
};

export default connect(null, mapDispatchToProps)(DialogActionPopup);
