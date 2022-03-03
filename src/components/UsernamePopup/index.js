import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss';
import InputBox from '../InputBox';
import Button from '../Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { checkUsername } from '../../api';
import { OnboardingActions } from 'store/actions/onboarding';
import ButtonTheme from 'components/Button/ButtonTheme';
import StepBar from 'components/StepBar';
import Routes from 'constants/Routes';

const UsernamePopup = ({
                         hidePopup = () => {
                         },
                         showOnboardingFlowNext,
                         suggestion,
                         getSuggestion
                       }) => {
  const [username, setUsername] = useState(suggestion || '');
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    if(!suggestion) {
      getSuggestion();
    }
    setUsername(suggestion)
  }, [suggestion])
  useEffect(() => {
    const len = username.length
    if(len < 3 || len > 25){
      setErrorMessage('Username length should be from 3 to 25 characters long');
    } else {
      setErrorMessage('');
    }
  }, [username])
  const onConfirm = async () => {
    //check unique username
    let response;
    try {
      response = await checkUsername(username);
    } catch (err) {
      console.error('checkUsername err', err);
    }

    const isUnique = _.get(response, 'data.isUnique', false);

    if (isUnique) {
      setErrorMessage('');
      showOnboardingFlowNext(username)
      hidePopup();
    } else {
      setErrorMessage(
        <div>
          Username <b>"{username}"</b> already exists. Please use another name.
        </div>
      );
    }
  };

  // const skipUsername = () => {
  //   hidePopup();
  //   showOnboardingFlowNext('');
  // };

  return (
    <div className={styles.usernamePopup}>
      <StepBar step={0} size={4} />
      <h2 className={styles.title}>How should we call you?</h2>
      <div className={styles.container}>
        <div className={styles.description}>
          Enter your username or <span onClick={getSuggestion} className={styles.randomizeButton}>randomize</span> it.
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
            onClick={onConfirm}
            withoutBackground={true}
            className={styles.button}
            disabledWithOverlay={false}
            disabled={!!errorMessage}
            theme={ButtonTheme.primaryButtonXL}
          >
            Next Step
          </Button>
        </div>
        <span className={styles.terms}>By continuing I accept the <a href={Routes.terms} target="_blank" rel="noreferrer">Terms and Conditions</a> and <a href={Routes.privacy} target="_blank" rel="noreferrer">Privacy Policy</a>. Also I confirm that I am over 18 years old.</span>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    suggestion: state.onboarding.suggestion
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showOnboardingFlowNext: username => {
      dispatch(
        OnboardingActions.next({
            payload: {username}
        })
      );
    },
    getSuggestion: () => {
      dispatch(OnboardingActions.getUsername())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsernamePopup);
