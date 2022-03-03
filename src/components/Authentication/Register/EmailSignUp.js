import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { AuthenticationActions } from '../../../store/actions/authentication';
import { PopupActions } from '../../../store/actions/popup';
import { FormGroup, InputLabel } from '../../Form';
import InputBox from 'components/InputBox';
import LegalCheckbox from 'components/LegalCheckbox';
import Button from '../../Button';
import ReactTooltip from 'react-tooltip';
import { RECAPTCHA_KEY } from 'constants/Api';
import classNames from 'classnames';
import AuthState from '../../../constants/AuthState';
import ButtonTheme from 'components/Button/ButtonTheme';
import StepBar from 'components/StepBar';

const EmailSignUp = ({
  styles,
  signUp,
  errorState,
  hidePopup,
  username,
  renderSocialLogin,
  authState,
}) => {
  const fooRef = useRef(null);
  let emailRef = useRef(null);
  let pwRef = useRef(null);
  let pwConfirmRef = useRef(null);
  let acceptRef = useRef(null);
  let genericRef = useRef(null);

  const [email, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [legalAuthorizationAgreed, setLegalAuthorizationAgreed] =
    useState(false);
  const [error, setError] = useState(null);
  const [submitInProgress, setSubmitInProgress] = useState(false);


  useEffect(() => {
    ReactTooltip.rebuild();

    if (error || errorState) {
      ReactTooltip.show(fooRef.current);
      setSubmitInProgress(false);
    } else {
      ReactTooltip.hide();
    }
  }, [errorState, fooRef, error]);

  useEffect(() => {
    console.log(authState);
    if (authState === AuthState.LOGGED_IN) {
      hidePopup();
      setSubmitInProgress(false);
    }
  }, [authState]);
  

  const handleReCaptchaVerify = () => {
    return new Promise((resolve, _) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(RECAPTCHA_KEY, { action: 'join' })
          .then(token => {
            resolve(token);
          })
      });
    });
  };

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

  const onConfirm = async () => {
    const error = validateInput();
    if (error) return;
    setSubmitInProgress(true);
    
    handleReCaptchaVerify().then(recaptchaToken => {
      const refLocalStorage = localStorage.getItem('urlParam_ref');
      const sidLocalStorage = localStorage.getItem('urlParam_sid');
      const cidLocalStorage = localStorage.getItem('urlParam_cid');
      signUp({
        username,
        email,
        password,
        passwordConfirm: passwordConfirmation,
        ref: refLocalStorage,
        recaptchaToken,
        sid: sidLocalStorage,
        cid: cidLocalStorage,
      });

    });
  };

  const validateInput = options => {
    let formError = null;
    let fieldRef = null;

    //Used by Social Login buttons
    if (options && options.tosOnly && !legalAuthorizationAgreed) {
      formError = 'Confirm that you agree with Terms and Conditions';
      fieldRef = acceptRef.current;

      setError(formError);
      fooRef.current = fieldRef;

      return formError;
    }

    if (!emailIsValid()) {
      formError = 'Not a valid email address';
      fieldRef = emailRef.current;
      if(options && options.emailOnly && email.length === 0) {
        formError = '';
      }
    } else if (!passwordIsValid()) {
      formError = 'Your password needs to be 8 characters long';
      fieldRef = pwRef.current;
    } else if (!passwordsMatch()) {
      formError = 'Passwords do not match';
      fieldRef = pwConfirmRef.current;
    } else if (!legalAuthorizationAgreed) {
      formError = 'Confirm that you agree with Terms and Conditions';
      fieldRef = acceptRef.current;
    }

    setError(formError);
    fooRef.current = fieldRef;

    return formError;
  };

  return (
    <form
      className={styles.authenticationInputBoxContainer}
      // onSubmit={onConfirm}
    >
      {errorState && (
        <div
          ref={(ref) => (genericRef.current = ref)}
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

      <StepBar step={1} size={4} className={styles.stepBar} />
      <div className={styles.title}>What about your E-Mail address?</div>

      <div className={styles.rowContainer}>
        <div>
          <FormGroup
            className={styles.formGroup}
            data-tip
            rootRef={(ref) => (emailRef.current = ref)}
            data-event="none"
            data-event-off="dblclick"
          >
            <InputLabel className={styles.inputLabel}>
              E-Mail address
            </InputLabel>
            <InputBox
              type="email"
              className={styles.inputBox}
              placeholder="john.doe@gmail.com"
              value={email}
              disabled={submitInProgress}
              setValue={(e) => {
                setError(null);
                setInputEmail(e.trim().toLowerCase());
              }}
              onConfirm={onConfirm}
            />
          </FormGroup>
          <FormGroup
            className={styles.formGroup}
            data-tip
            rootRef={(ref) => (pwRef.current = ref)}
            data-event="none"
            data-event-off="dblclick"
          >
            <InputLabel className={styles.inputLabel}>Password</InputLabel>
            <InputBox
              type="password"
              className={styles.inputBox}
              placeholder="***********"
              value={password}
              setValue={(e) => {
                setError(null);
                setPassword(e);
              }}
              disabled={submitInProgress}
              onConfirm={onConfirm}
            />
          </FormGroup>
          <FormGroup
            className={styles.formGroup}
            data-tip
            rootRef={(ref) => (pwConfirmRef.current = ref)}
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
              setValue={(e) => {
                setError(null);
                setPasswordConfirmation(e);
              }}
              disabled={submitInProgress}
              onConfirm={onConfirm}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup
            className={styles.formGroup}
            data-tip
            rootRef={(ref) => (acceptRef.current = ref)}
            data-event="none"
            data-event-off="dblclick"
          >
            <LegalCheckbox
              checked={legalAuthorizationAgreed}
              setChecked={(e) => {
                setError(null);
                setLegalAuthorizationAgreed(e);
              }}
            />
          </FormGroup>
          <Button
            onClick={onConfirm}
            className={classNames([styles.submitButton, styles.mobile])}
            disabled={submitInProgress || !legalAuthorizationAgreed}
            disabledWithOverlay={false}
            data-action="submit"
          >
            Sign Up with E-mail
          </Button>
          {renderSocialLogin(
            submitInProgress || !legalAuthorizationAgreed,
            validateInput
          )}
        </div>
      </div>
      <Button
        onClick={onConfirm}
        className={classNames([styles.submitButton, styles.desktop])}
        disabled={submitInProgress || !legalAuthorizationAgreed}
        disabledWithOverlay={false}
        theme={ButtonTheme.primaryButtonXL}
      >
        Sign Up with E-mail
      </Button>
      <div className={styles.recaptchaInfo}>
        <p>This site is protected by reCAPTCHA and the Google</p>
        <a
          target="_blank"
          href="https://policies.google.com/privacy"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        <span> and </span>
        <a
          target="_blank"
          href="https://policies.google.com/terms"
          rel="noreferrer"
        >
          Terms of Service
        </a>{' '}
        apply.
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authentication.loading,
    errorState: state.authentication.error,
    popupVisible: state.popup.visible,
    username: state.onboarding.username,
    authState: state.authentication.authState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: payload => {
      dispatch(AuthenticationActions.signUp(payload));
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignUp);
