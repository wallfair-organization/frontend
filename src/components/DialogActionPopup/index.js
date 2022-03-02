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
import { useHistory } from 'react-router-dom';
import Routes from 'constants/Routes';

const actionTypes = {
  [actions.cancelBet]: {
    title: 'Cancel Event',
    text: 'Are you sure you want to cancel the event?',
    acceptLabel: 'Cancel Event',
    declineLabel: "Don't Cancel",
    getBody: e => (
      <p className={styles.text}>
        Are you sure you want to cancel the event?
        <strong>{e?.event?.name}</strong>
      </p>
    ),
    onAccept: ({ bet, event }, _actions, data, history) =>
      Api.cancelBet(bet.id, data).then(() =>
        history.push(
          Routes.getRouteWithParameters(Routes.event, {
            eventSlug: event.slug,
          })
        )
      ),
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
    onAccept: (bet, _actions, _form, history) =>
      Api.deleteBet(bet.id).then(() => history.push('/events')),
  },
  [actions.deleteEvent]: {
    title: 'Delete Event',
    text: 'Are you sure you want to delete the event?',
    acceptLabel: 'Delete',
    declineLabel: 'Cancel',
    onAccept: ({ slug }, _actions, _form, history) =>
      Api.deleteEvent(slug).then(() => history.push('/events')),
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

  const history = useHistory();

  if (!actionTypes[actionType]) {
    return;
  }

  const body = !!getBody ? (
    getBody(data)
  ) : (
    <p className={styles.text}>
      {text}
      {declineLabel !== 'Disabled' && <strong>"{data?.market_question}"</strong>}
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
          onClick={() => onAccept(data, actionDispatchers, formData, history)}
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
        dispatch(EventActions.deleteEvent({ eventId }));
      },
      hidePopup: () => {
        dispatch(PopupActions.hide());
      },
    },
  };
};

export default connect(null, mapDispatchToProps)(DialogActionPopup);
