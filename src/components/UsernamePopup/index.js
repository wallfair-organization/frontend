import { useState } from 'react';
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

const UsernamePopup = ({
  hidePopup = () => {},
  loading,
  showWelcome,
  updateUser,
  user,
}) => {
  const [username, setUsername] = useState('');

  const isAuthenticated = () => user.authState === authState.LOGGED_IN;

  const onConfirm = () => {
    if (!isAuthenticated()) return;

    const payload = {
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
      username,
    };
    updateUser(payload);
  };

  const skipUsername = () => {
    hidePopup();
    showWelcome();
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
    showWelcome: () => {
      dispatch(
        PopupActions.show({
          popupType: PopupTheme.welcome,
        })
      );
    },
    updateUser: payload => {
      dispatch(
        AuthenticationActions.initiateUpdateUserData(
          {
            user: payload,
          },
          true
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsernamePopup);
