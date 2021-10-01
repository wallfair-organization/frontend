import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import styles from './styles.module.scss';
import AuthenticationType from 'components/Authentication/AuthenticationType';

const SignUp = () => {
  const dispatch = useDispatch();

  const showLoginPopup = () => {
    dispatch(
      PopupActions.show({
        popupType: PopupTheme.auth,
        options: {
          small: true,
          authenticationType: AuthenticationType.register,
        },
      })
    );
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>
        Sign up now, place a bet and start winning.
      </h1>
      <h6 className={styles.subHeading}>Join the ride.</h6>
      <Button className={styles.button} onClick={showLoginPopup}>
        Sign up
      </Button>
    </section>
  );
};

export default SignUp;
