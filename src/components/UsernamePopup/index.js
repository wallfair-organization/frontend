import React, {useState} from 'react'
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { OnboardingActions } from 'store/actions/onboarding';
import StepBar from '../StepBar';
import UsernameInput from '../UsernameInput';
import { PopupActions } from 'store/actions/popup';

const UsernamePopup = ({
                         hidePopup,
                         showOnboardingFlowNext,
                       }) => {
  const [username, setUsername] = useState('');

  const onSubmit = () => {
    showOnboardingFlowNext(username);
    hidePopup();
  }

  return (
    <div className={styles.usernamePopup}>
      <StepBar step={0} size={4} />
      <UsernameInput onSubmit={onSubmit} updateUsername={setUsername} buttonText='Next Step' />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showOnboardingFlowNext: username => {
      dispatch(
        OnboardingActions.next({
          payload: { username },
        })
      );
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(UsernamePopup);
