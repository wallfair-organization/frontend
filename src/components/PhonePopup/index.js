import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss';
import InputBox from '../InputBox';
import Button from '../Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { OnboardingActions } from 'store/actions/onboarding';
import ButtonTheme from 'components/Button/ButtonTheme';
import StepBar from 'components/StepBar';
import Routes from 'constants/Routes';
import { sendSms } from 'api';

const PhonePopup = ({
  hidePopup = () => {},
  showOnboardingFlowNext,
  initialOnboarding
}) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState('49');
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
      setErrorMessage('');
  }, [phoneNumber]);

  const sendVerification = async () => {
    let fullPhoneNumber = country + phoneNumber;
    if (!fullPhoneNumber.startsWith('+')) {
      fullPhoneNumber = '+' + fullPhoneNumber;
    }

    let response;
    try {
      response = await sendSms(fullPhoneNumber);
      console.log(response);
      if (!response.error) {
        setErrorMessage('');
        showOnboardingFlowNext({
          phoneNumber: fullPhoneNumber,
          initialOnboarding
        });
        hidePopup();
      } else {
        setErrorMessage(
          <div>
            {response.error.message}
          </div>
        );
      }

    } catch (err) {
      console.error('checkPhoneNumber err', err);
      
    }
  };

  return (
    <div className={styles.phonePopup}>
      <StepBar step={2} size={4} />
      <h2 className={styles.title}>Verify your phone number</h2>
      <div className={styles.container}>
        <div className={styles.description}>
          We'll send you a SMS with a 6-digit code to verify your number
        </div>
        <InputBox
          className={styles.inputBox}
          placeholder="123 456 789"
          value={phoneNumber}
          setValue={setPhoneNumber}
          // onConfirm={onConfirm}
          hasCountry={true}
          setCountry={setCountry}
          country={country}
        />
        {!_.isEmpty(errorMessage) && (
          <div className={styles.errorHandLing}>{errorMessage}</div>
        )}
        <div className={styles.buttons}>

          <Button
            onClick={sendVerification}
            withoutBackground={true}
            className={styles.button}
            disabledWithOverlay={false}
            disabled={!!errorMessage}
            theme={ButtonTheme.primaryButtonXL}
          >
            Send verification code
          </Button>
        </div>
        <span className={styles.terms}>By continuing I accept the <a href={Routes.terms} target="_blank" rel="noreferrer">Terms and Conditions</a> and <a href={Routes.privacy} target="_blank" rel="noreferrer">Privacy Policy</a>. Also I confirm that I am over 18 years old.</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showOnboardingFlowNext: ({ phoneNumber, initialOnboarding }) => {
      dispatch(
        OnboardingActions.next({
            payload: {
              phoneNumber,
              initialOnboarding,
            }
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(PhonePopup);
