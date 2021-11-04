import InputBox from '../InputBox';
import BirthdayField from '../BirthdayField';
import Dropdown from '../Dropdown';
import styles from './styles.module.scss';
import { AuthenticationActions } from '../../store/actions/authentication';
import { connect, useSelector } from 'react-redux';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import CheckBox from '../CheckBox';
import ReactTooltip from 'react-tooltip';
import { FormGroup, InputLabel } from '@material-ui/core';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import AuthenticationType from './AuthenticationType';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { selectTotalUsers } from '../../store/selectors/leaderboard';
import { COUNTRIES } from 'constants/Countries';
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
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [country, setCountry] = useState('US');
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
  let birthRef = useRef(null);
  let countryRef = useRef(null);

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

  const birthdayIsValid = () => {
    const currentYear = new Date().getFullYear();
    const isOver18 =
      currentYear - birthYear > 17 && currentYear - birthYear < 100;
    return (
      birthDay >= 1 &&
      birthDay <= 31 &&
      birthMonth >= 1 &&
      birthMonth <= 12 &&
      isOver18
    );
  };

  const validateInput = options => {
    let error;

    if (isSignUp() && !forgotPassword && !legalAuthorizationAgreed) {
      error = 'Confirm that you agree with Terms and Conditions';
      fooRef = acceptRef;
    }
    if (isSignUp() && !forgotPassword && !birthdayIsValid()) {
      error = 'You need to be at least 18 years old to use the platform';
      fooRef = birthRef;
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
      const birthDate = moment(`${birthDay}/${birthMonth}/${birthYear}`).unix();
      const refLocalStorage = localStorage.getItem('urlParam_ref');

      isSignUp()
        ? signUp({
            email,
            password,
            passwordConfirm: passwordConfirmation,
            birth: birthDate,
            country,
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
        {isSignUp() && renderBirthdayInputFields()}
        {isSignUp() && renderCountryInputField()}
        {isSignUp() && renderLegalAuthorizationAgreementCheckBox()}
        {!isSignUp() && renderForgotPasswordLink()}

        <Button
          onClick={onConfirm}
          withoutBackground={true}
          highlightType={HighlightType.highlightAuthButton}
          className={styles.submitButton}
          disabled={
            submitInProgress ||
            (isSignUp() && !forgotPassword && !legalAuthorizationAgreed)
          }
          disabledWithOverlay={true}
        >
          <span>{forgotPassword ? 'Send' : action}</span>
        </Button>
      </form>
    );
  };

  const renderBirthdayInputFields = () => {
    return (
      <FormGroup
        className={styles.formGroup}
        data-tip
        ref={ref => (birthRef = ref)}
        data-event="none"
        data-event-off="dblclick"
      >
        <InputLabel className={styles.inputLabel}>
          Please enter your date of birth:
        </InputLabel>
        <div className={styles.inputForm}>
          <BirthdayField
            className={styles.birthInputBox}
            placeholder="DD"
            maxValue={31}
            value={birthDay}
            setValue={setBirthDay}
          />
          <BirthdayField
            className={styles.birthInputBox}
            placeholder="MM"
            maxValue={12}
            value={birthMonth}
            setValue={setBirthMonth}
          />
          <BirthdayField
            className={styles.birthInputBox}
            placeholder="YYYY"
            maxValue={2050}
            value={birthYear}
            setValue={setBirthYear}
          />
        </div>
      </FormGroup>
    );
  };

  const renderCountryInputField = () => {
    return (
      <div ref={ref => (countryRef = ref)} className={styles.formGroup}>
        <InputLabel className={styles.inputLabel}>
          Select your country
        </InputLabel>
        <div className={styles.inputForm}>
          <Dropdown
            options={COUNTRIES}
            placeholder={''}
            setValue={setCountry}
            value={country}
            className={styles.select}
          />
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

    return !birthdayIsValid() ? (
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
