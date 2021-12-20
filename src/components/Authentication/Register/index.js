import Icon from 'components/Icon';
import IconTheme from 'components/Icon/IconTheme';
import IconType from 'components/Icon/IconType';
import PopupTheme from 'components/Popup/PopupTheme';
import { useState } from 'react';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import AuthenticationType from '../AuthenticationType';
import EmailSignUp from './EmailSignUp';
import SocialLogin from '../SocialLogin';

const Register = ({ styles, openLoginPopup, preloadEmailSignUp = false }) => {

  const showNewFeatures =
    process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true';


  const [showEmailSignUp, setShowEmailSignup] = useState(
    !showNewFeatures || preloadEmailSignUp
  );

  return (
    <>
      <h2 className={styles.title}>Sign Up</h2>
      {showEmailSignUp ? (
        <>
          <button
            className={styles.backToSignupOptions}
            onClick={() => setShowEmailSignup(false)}
          >
            Sign up using a different method
          </button>
          <EmailSignUp styles={styles} />
          <SocialLogin
            styles={styles}
          />
        </>
      ) : (
        <div className={styles.signUpOptions}>
          <SocialLogin
            styles={styles}
            prepend={[
              {
                content: (
                  <>
                    <Icon
                      iconType={IconType.email}
                      iconTheme={IconTheme.white}
                      className={styles.buttonIcon}
                    />
                    <span>Sign up with email</span>
                  </>
                ),
                onClick: () => setShowEmailSignup(true),
              },
            ]}
          />
          <div className={styles.alreadyHaveAnAccount}>
            Already have an account?{' '}
            <button type="button" onClick={openLoginPopup}>
              Log in
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLoginPopup: () => {
      dispatch(
        PopupActions.show({
          popupType: PopupTheme.auth,
          options: {
            authenticationType: AuthenticationType.login,
            small: true,
          },
        })
      );
    }
  };
};

export default connect(null, mapDispatchToProps)(Register);
