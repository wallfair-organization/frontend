import InputBox from '../InputBox';
import styles from './styles.module.scss';
import { AuthenticationActions } from '../../store/actions/authentication';
import { connect, useSelector } from 'react-redux';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import CheckBox from '../CheckBox';
import ReactTooltip from 'react-tooltip';
import { FormGroup, InputLabel } from '@material-ui/core';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import AuthenticationType from './AuthenticationType';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { selectTotalUsers } from '../../store/selectors/leaderboard';

const Authentication = ({
  loading,
  errorState,
  authenticationType,
  signUp,
  login,
  initForgotPassword,
  popupVisible,
}) => {
  const location = useLocation();
  let urlParams = new URLSearchParams(location.search);
  const [email, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [legalAuthorizationAgreed, setLegalAuthorizationAgreed] =
    useState(false);
  const [error, setError] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [ageOver18, setAgeOver18] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(false);
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [focusTrap, setFocusTrap] = useState([]);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const totalUsers = useSelector(selectTotalUsers);

  let fooRef = useRef(null);
  let emailRef = useRef(null);
  let pwRef = useRef(null);
  let pwConfirmRef = useRef(null);
  let acceptRef = useRef(null);
  let genericRef = useRef(null);
  let ageRef = useRef(null);

  const isSignUp = () => authenticationType === AuthenticationType.register;

  const action = isSignUp() ? 'Sign Up' : 'Login';

  useEffect(() => {
    const focusTrapElements = document.querySelectorAll(
      "input[type='email'], input[type='password']"
    );
    setFocusTrap([...focusTrapElements]);
  }, []);

  useEffect(() => {
    setInputEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setLegalAuthorizationAgreed(false);
    setError(null);
    setForgotPassword(false);
    setSubmitInProgress(false);
  }, [popupVisible]);

  useEffect(() => {
    ReactTooltip.rebuild();

    if (errorState) {
      setSubmitInProgress(false);
      fooRef.current = genericRef;
      setError(errorState);
      ReactTooltip.show(fooRef);
      if (isSignUp()) handleReCaptchaVerify();
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

  const passwordsMatch = () => {
    return passwordConfirmation && password === passwordConfirmation;
  };

  const validateInput = options => {
    let error;

    if (isSignUp() && !forgotPassword && !legalAuthorizationAgreed) {
      error = 'Confirm that you agree with Terms and Conditions';
      fooRef = acceptRef;
    }
    if (isSignUp() && !forgotPassword && !ageOver18) {
      error = 'You need to be at least 18 years old to use the platform';
      fooRef = ageRef;
    }
    if (isSignUp() && !forgotPassword && !passwordsMatch()) {
      error = 'Passwords do not match';
      fooRef = pwConfirmRef;
    }
    if (!passwordIsValid() && !forgotPassword) {
      error = 'Your password needs to be 8 characters long';
      fooRef = pwRef;
    }
    if (!emailIsValid()) {
      error = 'Not a valid email address';
      fooRef = emailRef;
    }
    if (emailIsValid() && options && options.emailOnly) {
      error = undefined;
      ReactTooltip.hide(emailRef);
    }

    setError(error);
    if (error) {
      ReactTooltip.show(fooRef);
    }

    return error;
  };

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return;

    const token = await executeRecaptcha('join');
    if (!token) return handleReCaptchaVerify();

    setRecaptchaToken(token);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const onConfirm = () => {
    const error = validateInput();
    if (error) return;

    setSubmitInProgress(true);

    if (forgotPassword) {
      initForgotPassword(email);
    } else {
      const refLocalStorage = localStorage.getItem('urlParam_ref');

      isSignUp()
        ? signUp({
            email,
            password,
            passwordConfirm: passwordConfirmation,
            ref: refLocalStorage,
            recaptchaToken,
          })
        : login({
            email,
            password,
          });
    }
  };

  const handleFocusTrap = e => {
    if (e.key !== 'Tab') {
      return;
    }

    e.preventDefault();

    const indexOfFocusedElement = focusTrap.indexOf(document.activeElement);
    let nextPosition = indexOfFocusedElement + 1;

    if (nextPosition === focusTrap.length) {
      nextPosition = 0;
    }

    if (focusTrap[nextPosition]) {
      focusTrap[nextPosition].focus();
    }
  };

  const renderInputBoxes = () => {
    return (
      <form
        className={styles.authenticationInputBoxContainer}
        onSubmit={onConfirm}
      >
        {errorState && (
          <div
            ref={ref => (genericRef = ref)}
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
          ref={ref => (emailRef = ref)}
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
            setValue={e => {
              setInputEmail(e.trim().toLowerCase());
            }}
            onConfirm={onConfirm}
            onBlur={() => validateInput({ emailOnly: true })}
            onKeyDown={handleFocusTrap}
          />
        </FormGroup>

        {!forgotPassword && (
          <FormGroup
            className={styles.formGroup}
            data-tip
            ref={ref => (pwRef = ref)}
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
              onKeyDown={handleFocusTrap}
            />
          </FormGroup>
        )}

        {authenticationType === AuthenticationType.register && !forgotPassword && (
          <FormGroup
            className={styles.formGroup}
            data-tip
            ref={ref => (pwConfirmRef = ref)}
            data-event="none"
            data-event-off="dblclick"
          >
            <InputLabel className={styles.inputLabel}>
              Confirm Password
            </InputLabel>
            <InputBox
              type="password"
              className={styles.inputBox}
              placeholder="***********"
              value={passwordConfirmation}
              setValue={setPasswordConfirmation}
              disabled={submitInProgress}
              onConfirm={onConfirm}
              onKeyDown={handleFocusTrap}
            />
          </FormGroup>
        )}
        {isSignUp() && renderLegalAuthorizationAgeVerification()}
        {isSignUp() && renderLegalAuthorizationAgreementCheckBox()}
        {!isSignUp() && renderForgotPasswordLink()}

        <Button
          onClick={onConfirm}
          withoutBackground={true}
          highlightType={HighlightType.highlightAuthButton}
          className={styles.submitButton}
          disabled={
            submitInProgress || (isSignUp() && !forgotPassword && !ageOver18)
          }
          disabledWithOverlay={true}
        >
          <span>{forgotPassword ? 'Send' : action}</span>
        </Button>
      </form>
    );
  };

  const renderLegalAuthorizationAgeVerification = () => {
    return (
      <div ref={ref => (ageRef = ref)} className={styles.formGroup}>
        <InputLabel className={styles.inputLabel}>
          Please verify your age together
        </InputLabel>
        <div className={styles.ageVerificationForm}>
          <span
            onClick={() => setAgeOver18(true)}
            className={ageOver18 ? styles.solidButton : styles.outlinedButton}
          >
            <span>I am over 18</span>
          </span>
          <span
            onClick={() => setAgeOver18(false)}
            className={ageOver18 ? styles.outlinedButton : styles.solidButton}
          >
            <span>I am under 18</span>
          </span>
        </div>
      </div>
    );
  };
  const renderLegalAuthorizationAgreementCheckBox = () => {
    const legalAuthorizationAgreementText = (
      <p
        ref={ref => (acceptRef = ref)}
        data-tip
        data-event="none"
        data-event-off="dblclick"
        className={styles.authenticationLegalAuthorizationAgreementText}
      >
        I have read and agree to the{' '}
        <a
          href="https://files.wallfair.io/wallfair_t_and_c.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Terms and Conditions
        </a>
      </p>
    );

    return !ageOver18 ? (
      <span className={styles.errorText}>
        You need to be above 18 years old in order to use this system
      </span>
    ) : (
      <CheckBox
        className={styles.authenticationLegalAuthorizationAgreementCheckBox}
        checked={legalAuthorizationAgreed}
        setChecked={setLegalAuthorizationAgreed}
        text={legalAuthorizationAgreementText}
      />
    );
  };

  const renderForgotPasswordLink = () => {
    return (
      <div
        onClick={() => setForgotPassword(true)}
        className={styles.forgotPasswordLink}
        hidden={forgotPassword}
      >
        Forgot Password
      </div>
    );
  };

  return (
    <div className={styles.authentication}>
      <h2 className={styles.title}>
        {forgotPassword ? 'Password Reset' : action}
      </h2>
      {isSignUp() && (
        <h3 className={styles.totalCount}>
          {totalUsers}/5000 slots available
          <span className={styles.underline}></span>
        </h3>
      )}
      {renderInputBoxes()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authentication.loading,
    errorState: state.authentication.error,
    popupVisible: state.popup.visible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: payload => {
      dispatch(AuthenticationActions.signUp(payload));
    },
    login: payload => {
      dispatch(AuthenticationActions.login(payload));
    },
    initForgotPassword: email => {
      dispatch(AuthenticationActions.forgotPassword({ email }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
