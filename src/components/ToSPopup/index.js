import React, {useState} from 'react'
import styles from './styles.module.scss';
import Button from '../Button';
import { connect } from 'react-redux';
import LegalCheckbox from 'components/LegalCheckbox';
import { AuthenticationActions } from 'store/actions/authentication';

const ToSPopup = ({ acceptToSConsent = () => {}, isOnboarding = false }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const onSubmit = () => {
    acceptToSConsent(isOnboarding);
  }

  return (
    <div className={styles.tosPopup}>
      <h2 className={styles.title}>Terms of Service</h2>
      <div className={styles.container}>
        <div className={styles.description}>
          Please review and confirm that you agree with our terms of service.
        </div>
        <LegalCheckbox checked={isAccepted} setChecked={setIsAccepted} />
        <div className={styles.buttons}>
          <Button
            onClick={onSubmit}
            withoutBackground={true}
            className={styles.button}
            disabledWithOverlay={false}
            disabled={!isAccepted}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    acceptToSConsent: (isOnboarding) => {
      dispatch(AuthenticationActions.acceptToSConsent({isOnboarding}))
    }
  };
};

export default connect(null, mapDispatchToProps)(ToSPopup);
