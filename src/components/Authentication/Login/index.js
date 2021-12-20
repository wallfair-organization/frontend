import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { AuthenticationActions } from '../../../store/actions/authentication';
import { FormGroup, InputLabel } from '../../Form';
import InputBox from 'components/InputBox';
import Button from '../../Button';
import HighlightType from '../../Highlight/HighlightType';
import ReactTooltip from 'react-tooltip';
import SocialLogin from '../SocialLogin';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import AuthenticationType from '../AuthenticationType';
import { OnboardingActions } from 'store/actions/onboarding';
import classNames from 'classnames';

const Login = ({
  errorState,
  initForgotPassword,
  login,
  styles,
  openSignUpPopup,
}) => {

  const [email, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [submitInProgress, setSubmitInProgress] = useState(false);

  let fooRef = useRef(null);
  let emailRef = useRef(null);
  let pwRef = useRef(null);
  let genericRef = useRef(null);

  useEffect(() => {
    ReactTooltip.rebuild();

    if (errorState) {
      setSubmitInProgress(false);
      fooRef.current = genericRef;
      setError(errorState);
      ReactTooltip.show(fooRef);
    }

    return () => {
      setError(null);
    };
  }, [errorState, fooRef]);

  const emailIsValid = () => {
    const regExpression = /^[a-z0-9+._-]+@[a-z0-9+._-]+$/;
    return regExpression.test(String(email).toLowerCase());
  };

  const passwordIsValid = () => {
    return password && password.length >= 8 && password.length <= 255;
  };

  const validateInput = (options) => {
    let error;
    if (!passwordIsValid() && !forgotPassword) {
      error = 'Your password needs to be 8 characters long';
      fooRef = pwRef;
    }

    if (!emailIsValid()) {
      error = 'Not a valid email address';
      fooRef = emailRef;
    }
    if (options && options.emailOnly && email.length === 0) {
      error = undefined;
      ReactTooltip.hide(emailRef);
    }

    setError(error);
    if (error) {
      ReactTooltip.show(fooRef);
    }

    return error;
  };

  const onConfirm = () => {
    const error = validateInput();
    if (error) return;
    setSubmitInProgress(true);

    if (forgotPassword) {
      initForgotPassword(email);
    } else {
      login({
        email,
        password,
      });
    }
  };

  const renderForgotPasswordLink = () => {
    return (
      <div
        onClick={() => setForgotPassword(true)}
        className={classNames('global-link-style', styles.forgotPasswordLink)}
        hidden={forgotPassword}
      >
        Forgot Password
      </div>
    );
  };

  return (
    <>
      <form
        className={classNames(styles.authenticationInputBoxContainer, forgotPassword && styles.forgotPassword)}
        onSubmit={onConfirm}
      >
        {errorState && (
          <div
            ref={(ref) => (genericRef = ref)}
            data-tip
            data-event="none"
            data-event-off="dblclick"
            className={styles.errorBox}
          >
            {errorState}
          </div>
        )}

        <ReactTooltip
          getContent={() => error}
          place="bottom"
          effect="solid"
          type="error"
          backgroundColor={'#ff0000'}
          className={styles.stepsTooltipError}
        />

        <FormGroup
          className={styles.formGroup}
          data-tip
          rootRef={(ref) => (emailRef = ref)}
          data-event="none"
          data-event-off="dblclick"
        >
          <InputLabel className={styles.inputLabel}>E-Mail address</InputLabel>
          <InputBox
            type="email"
            className={styles.inputBox}
            placeholder="john.doe@gmail.com"
            value={email}
            disabled={submitInProgress}
            setValue={(e) => {
              setInputEmail(e.trim().toLowerCase());
            }}
            onConfirm={onConfirm}
            onBlur={() => validateInput({ emailOnly: true })}
          />
        </FormGroup>

        {!forgotPassword && (
          <FormGroup
            className={styles.formGroup}
            data-tip
            rootRef={(ref) => (pwRef = ref)}
            data-event="none"
            data-event-off="dblclick"
            hidden={forgotPassword}
          >
            <InputLabel className={styles.inputLabel}>Password</InputLabel>
            <InputBox
              type="password"
              className={styles.inputBox}
              placeholder="***********"
              value={password}
              setValue={setPassword}
              disabled={submitInProgress}
              onConfirm={onConfirm}
            />
          </FormGroup>
        )}

        {renderForgotPasswordLink()}

        <Button
          onClick={onConfirm}
          className={styles.submitButton}
          disabled={submitInProgress}
        >
          {forgotPassword ? 'Send' : 'Login'}
        </Button>
      </form>
      {!forgotPassword && (
        <div className={styles.dontHaveAnAccount}>
          <p>
            or continue with
          </p>
          <SocialLogin styles={styles} signUp={false}/>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    errorState: state.authentication.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => {
      dispatch(AuthenticationActions.login(payload));
    },
    initForgotPassword: (email) => {
      dispatch(AuthenticationActions.forgotPassword({ email }));
    },
    openSignUpPopup: () => {
      dispatch(
        OnboardingActions.start({options:{
          preloadEmailSignUp: true,
        }})
      )
      // dispatch(
      //   PopupActions.show({
      //     popupType: PopupTheme.auth,
      //     options: {
      //       authenticationType: AuthenticationType.register,
      //       preloadEmailSignUp: true,
      //       small: false,
      //     },
      //   })
      // );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
