import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss';
import InputBox from '../InputBox';
import Button from '../Button';
import { connect, useDispatch } from 'react-redux';
import _ from 'lodash';
import { OnboardingActions } from 'store/actions/onboarding';
import ButtonTheme from 'components/Button/ButtonTheme';
import StepBar from 'components/StepBar';
import Routes from 'constants/Routes';
import { sendSms } from 'api';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import {ReactComponent as WLogo} from '../../data/images/bonus/w-logo-white.svg';

const PhonePopup = ({
  hidePopup = () => {},
  showOnboardingFlowNext,
  initialOnboarding
}) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState('49');
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

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

        dispatch(
          PopupActions.show({
            popupType: PopupTheme.phoneVerification,
            options: {
              phoneNumber: fullPhoneNumber,
              small: false,
            },
          })
        );

        // hidePopup();
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
      <WLogo />
      <h2 className={styles.title}>Not so fast!</h2>
      <div className={styles.container}>
        <div className={styles.description}>
          Before you can claim bonuses for the first time, you need to <b>verify your phone</b>. Your phone will be linked to your profile. This is a <b>one-time necessary step</b>.
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
            theme={ButtonTheme.primaryButtonL}
          >
            Continue
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
