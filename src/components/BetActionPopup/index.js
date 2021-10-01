import * as Api from 'api';
import Button from 'components/Button';
import _ from 'lodash';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import styles from './styles.module.scss';
import HighlightType from 'components/Highlight/HighlightType';
import { Input, InputLabel } from 'components/Form';
import { useState } from 'react';

const actionTypes = {
  cancel: {
    title: 'Cancel Bet',
    text: 'Are you sure you want to cancel the bet?',
    acceptLabel: 'Cancel Bet',
    declineLabel: "Don't Cancel",
    onAccept: (bet, data, hide) =>
      Api.cancelBet(bet._id, data).then(() => hide()),
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
  delete: {
    title: 'Delete Bet',
    text: 'Are you sure you want to delete the bet?',
    acceptLabel: 'Delete',
    declineLabel: 'Cancel',
    onAccept: (bet, _, hide) => Api.deleteBet(bet._id).then(() => hide()),
  },
};

const BetActionPopup = ({ bet, actionType, hidePopup }) => {
  const { onAccept, title, text, getBody, acceptLabel, declineLabel, form } =
    actionTypes[actionType];

  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(!form);

  if (!actionTypes[actionType]) {
    return;
  }

  const body = !!getBody ? (
    getBody(bet, styles)
  ) : (
    <p className={styles.text}>
      {text}
      <strong>"{bet?.marketQuestion}"</strong>
    </p>
  );

  return (
    <div className={styles.contentContainer}>
      <h2 className={styles.title}>{title}</h2>

      {body}

      {!!form && form(formData, setFormData, setIsFormValid)}

      <div className={styles.buttonContainer}>
        <Button
          withoutBackground={true}
          className={styles.declineButton}
          onClick={hidePopup}
        >
          {declineLabel}
        </Button>

        <Button
          className={styles.acceptButton}
          highlightType={HighlightType.highlightModalButton}
          withoutBackground={true}
          disabled={!isFormValid}
          onClick={() => onAccept(bet, formData, hidePopup)}
        >
          {acceptLabel}
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(BetActionPopup);
