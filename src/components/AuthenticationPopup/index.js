import classNames from 'classnames';
import Authentication from 'components/Authentication';
import styles from './styles.module.scss';
import PopupTopImg from '../../data/backgrounds/popup/popup-top.png';
import PopupLeftImg from '../../data/backgrounds/popup/popup-left.png';
import PopupRightImg from '../../data/backgrounds/popup/popup-right.png';
import PopupBottomImg from '../../data/backgrounds/popup/popup-bottom.png';

const AuthenticationPopup = ({ authenticationType, preloadEmailSignUp }) => {

  return (
    <div className={classNames(styles.registration, authenticationType === 'login' && styles.portraitBg)}>
      {/* <img src={PopupTopImg} className={styles.popupTop} alt='popup-top'/>
      <img src={PopupLeftImg} className={styles.popupLeft} alt='popup-left'/>
      <img src={PopupRightImg} className={styles.popupRight} alt='popup-right'/>
      <img src={PopupBottomImg} className={styles.popupBottom} alt='popup-bottom'/> */}
      <h2 className={classNames(styles.title, authenticationType === 'login' && styles.portrait)}>
        {/* {authenticationType === 'register' ? 'Final Step' : 'Login'} */}
      </h2>
      <div className={classNames(styles.form, authenticationType === 'login' && styles.loginForm)}>
          <Authentication
            authenticationType={authenticationType}
            preloadEmailSignUp={preloadEmailSignUp}
          />
      </div>
    </div>
  );
};

export default AuthenticationPopup;
