import React, {useCallback, useEffect, useState} from 'react'
import styles from './styles.module.scss';
import Button from '../Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { OnboardingActions } from 'store/actions/onboarding';
import ButtonTheme from 'components/Button/ButtonTheme';
import StepBar from 'components/StepBar';
import Routes from 'constants/Routes';
import CodeInputFields from 'components/CodeInputFields';
import { verifySms, sendSms} from 'api';
import { trackSignupPhone } from 'config/gtm';

const VerifyPhonePopup = ({
  hidePopup = () => {},
  showOnboardingFlowNext,
  phoneNumber,
  userId,
  initialOnboarding
}) => {

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    setErrorMessage('');
  }, [code]);

  const onVerify = async () => {
    const len = code.length;
    if(len < 6){
      setErrorMessage('Code length should be 6 digits long');
      return
    } else {
      setErrorMessage('');
    }

    let response;
    try {
      response = await verifySms(phoneNumber, code, userId);
      
      if (!response.error) {
        setErrorMessage('');
        showOnboardingFlowNext({
          verified:true,
          initialOnboarding,
        });
        trackSignupPhone();

        hidePopup();
      } else {
        setErrorMessage(
          <div>
            {response.error.message}
          </div>
        );
      }
    } catch (err) {
      console.error('verifyCode err', err);
    }
  };

  const resendSms = useCallback(async () => {
    setErrorMessage('');
    await sendSms(phoneNumber);
    setCode('');
  }, [phoneNumber]);

  // const skipVerification = () => {
  //   hidePopup();
  //   showOnboardingFlowNext('');
  // };

  return (
    <div className={styles.usernamePopup}>
      <StepBar step={3} size={4} />
      <h2 className={styles.title}>Code Verification</h2>
      <div className={styles.container}>
        <div className={styles.description}>
          Enter the code you received via SMS here
        </div>
        <CodeInputFields
          fields={6}
          required={true}
          autoFocus={true}
          // onComplete={onVerify}
          onChange={setCode}
        />
        {!_.isEmpty(errorMessage) && (
          <div className={styles.errorHandLing}>{errorMessage}</div>
        )}

        <div className={styles.resend}>
          <span>
            Didn't you received any code?
          </span>
          <button onClick={resendSms}>Resend a new code</button>
        </div>
        <div className={styles.buttons}>

          <Button
            onClick={onVerify}
            withoutBackground={true}
            className={styles.button}
            disabledWithOverlay={false}
            disabled={!!errorMessage}
            theme={ButtonTheme.primaryButtonXL}
          >
            Verify
          </Button>
        </div>
        <span className={styles.terms}>By continuing I accept the <a href={Routes.terms} target="_blank" rel="noreferrer">Terms and Conditions</a> and <a href={Routes.privacy} target="_blank" rel="noreferrer">Privacy Policy</a>. Also I confirm that I am over 18 years old.</span>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.authentication.userId,
    phoneNumber: state.onboarding.phoneNumber,
    initialOnboarding: state.onboarding.initialOnboarding,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    showOnboardingFlowNext: ({verified, initialOnboarding}) => {
      dispatch(
        OnboardingActions.next({
            payload: {
              verified,
              initialOnboarding,
            }
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhonePopup);
