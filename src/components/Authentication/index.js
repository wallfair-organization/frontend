import InputBox from '../InputBox';
import styles from './styles.module.scss';
import { AuthenticationActions } from '../../store/actions/authentication';
import { connect } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import CheckBox from '../CheckBox';
import ReactTooltip from 'react-tooltip';
import { FormGroup, InputLabel } from '@material-ui/core';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import AuthenticationType from './AuthenticationType';

const Authentication = ({
  loading,
  errorState,
  authenticationType,
  signUp,
  login,
  initForgotPassword,
  popupVisible,
}) => {
  const [email, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [legalAuthorizationAgreed, setLegalAuthorizationAgreed] =
    useState(false);
  const [error, setError] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);

  let fooRef = useRef(null);
  let emailRef = useRef(null);
  let pwRef = useRef(null);
  let pwConfirmRef = useRef(null);
  let acceptRef = useRef(null);
  let genericRef = useRef(null);

  const isSignUp = () => authenticationType === AuthenticationType.register;

  const action = isSignUp() ? 'Sign Up' : 'Login';

  useEffect(() => {
    setInputEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setLegalAuthorizationAgreed(false);
    setError(null);
    setForgotPassword(false);
  }, [popupVisible]);

  useEffect(() => {
    ReactTooltip.rebuild();

    if (errorState) {
      fooRef.current = genericRef;
      setError(errorState);
      ReactTooltip.show(fooRef);
    }

    return () => {
      setError(null);
    };
  }, [errorState, fooRef]);

  const emailIsValid = () => {
    return email && email.length >= 6;
  };

  const passwordIsValid = () => {
    return password && password.length >= 8 && password.length <= 255;
  };

  const passwordsMatch = () => {
    return passwordConfirmation && password === passwordConfirmation;
  };

  const validateInput = () => {
    let error;

    if (isSignUp() && !forgotPassword && !legalAuthorizationAgreed) {
      error = "Confirm that you're legally authorized";
      fooRef = acceptRef;
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

    setError(error);
    if (error) {
      ReactTooltip.show(fooRef);
    }

    return error;
  };

  const onConfirm = () => {
    const error = validateInput();
    if (error) return;

    if (forgotPassword) {
      initForgotPassword(email);
    } else {
      isSignUp()
        ? signUp({
            email,
            password,
            passwordConfirm: passwordConfirmation,
          })
        : login({
            email,
            password,
          });
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
            className={styles.inputBox}
            placeholder="john.doe@gmail.com"
            value={email}
            setValue={e => {
              setInputEmail(e.trim().toLowerCase());
            }}
            onConfirm={onConfirm}
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
              onConfirm={onConfirm}
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
              onConfirm={onConfirm}
            />
          </FormGroup>
        )}

        {isSignUp() && renderLegalAuthorizationAgreementCheckBox()}
        {!isSignUp() && renderForgotPasswordLink()}

        <Button
          onClick={onConfirm}
          withoutBackground={true}
          highlightType={HighlightType.highlightAuthButton}
          className={styles.submitButton}
          disabled={loading}
          disabledWithOverlay={true}
        >
          <span>{forgotPassword ? 'Send' : action}</span>
        </Button>
      </form>
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

    return (
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
