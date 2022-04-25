import React, {useCallback, useEffect, useState} from 'react'
import styles from './styles.module.scss';
import Button from '../Button';
import { connect, useDispatch } from 'react-redux';
import _ from 'lodash';
import { OnboardingActions } from 'store/actions/onboarding';
import ButtonTheme from 'components/Button/ButtonTheme';
import StepBar from 'components/StepBar';
import Routes from 'constants/Routes';
import CodeInputFields from 'components/CodeInputFields';
import { verifySms, sendSms} from 'api';
import { trackSignupPhone } from 'config/gtm';
import { AlertActions } from 'store/actions/alert';
import { PopupActions } from 'store/actions/popup';
import {ReactComponent as WLogo} from '../../data/images/bonus/w-logo-white.svg';

const VerifyPhonePopup = ({
  phoneNumber,
  userId,
}) => {

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

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
        
        dispatch(AlertActions.showSuccess({message:'Phone verified successfully!'}));
        dispatch(PopupActions.hide());

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
      <WLogo />
      <h2 className={styles.title}>Code Verification</h2>
      <div className={styles.container}>
        <div className={styles.description}>
          We have sent you an SMS with a 6-digit code, to verify your number. Enter your code here:
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
            theme={ButtonTheme.primaryButtonL}
          >
            Verify
          </Button>
        </div>
        <div className={styles.terms}>
          <span className={styles.title}>Why is this needed?</span>
          <p>Phone verification is a security measure to protect Wallfair from bot spamming and attacks.</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.authentication.userId,
  }
};

export default connect(mapStateToProps, null)(VerifyPhonePopup);
