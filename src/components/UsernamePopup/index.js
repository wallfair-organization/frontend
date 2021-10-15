import React, { useState } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as ConfettiLeft } from '../../data/icons/confetti-left.svg';
import { ReactComponent as ConfettiRight } from '../../data/icons/confetti-right.svg';
import InputBox from '../InputBox';
import Button from '../Button';
import HighlightType from '../Highlight/HighlightType';
import { PopupActions } from '../../store/actions/popup';
import { AuthenticationActions } from '../../store/actions/authentication';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';
import authState from 'constants/AuthState';
import _ from 'lodash';
import { checkUsername } from '../../api';

const UsernamePopup = ({
  hidePopup = () => {},
  loading,
  showWelcome,
  updateUser,
  user,
  initialReward,
}) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [profileErrorMessage, setProfileErrorMessage] = useState();

  const isAuthenticated = () => user.authState === authState.LOGGED_IN;

  const onConfirm = async () => {
    if (!isAuthenticated()) return;

    //check unique username
    const response = await checkUsername(username).catch(err => {
      console.error('checkUsername err', err);
    });

    const isUnique = _.get(response, 'data.isUnique', false);

    if (isUnique) {
      setErrorMessage('');
      const payload = {
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        username,
      };
      updateUser(payload, initialReward);
    } else {
      setErrorMessage(
        <div>
          Username <b>"{username}"</b> already exists. Please use another name.
        </div>
      );
    }
  };

  const skipUsername = () => {
    hidePopup();
    showWelcome(initialReward);
  };

  return (
    <div className={styles.usernamePopup}>
      <h2 className={styles.title}>Complete your profile</h2>
      <div className={styles.description}>
        How would you like others to see you? Please pick a username for
        yourself
      </div>
      <InputBox
        className={styles.inputBox}
        placeholder="Your Username..."
        value={username}
        setValue={setUsername}
        onConfirm={onConfirm}
      />
      {!_.isEmpty(errorMessage) && (
        <div className={styles.errorHandLing}>{errorMessage}</div>
      )}
      <div className={styles.buttons}>
        <Button
          onClick={skipUsername}
          withoutBackground={true}
          highlightType={HighlightType.highlightModalButton2Disabled}
          className={styles.button}
        >
          <span>Skip</span>
        </Button>
        <Button
          onClick={onConfirm}
          withoutBackground={true}
          highlightType={
            loading
              ? HighlightType.highlightModalButton2Disabled
              : HighlightType.highlightModalButton2
          }
          className={styles.button}
          disabled={loading}
          disabledWithOverlay={false}
        >
          <span>Submit</span>
        </Button>
      </div>
      <ConfettiLeft className={styles.confettiLeft} />
      <ConfettiRight className={styles.confettiRight} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authentication.loading,
    user: state.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showWelcome: initialReward => {
      dispatch(
        PopupActions.show({
          popupType: PopupTheme.welcome,
          options: {
            initialReward: initialReward,
          },
        })
      );
    },
    updateUser: (payload, initialReward) => {
      dispatch(
        AuthenticationActions.initiateUpdateUserData(
          {
            user: payload,
          },
          true,
          initialReward
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsernamePopup);
