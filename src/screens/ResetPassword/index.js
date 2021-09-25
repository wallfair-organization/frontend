import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { AuthenticationActions } from '../../store/actions/authentication';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import { useEffect, useState } from 'react';
import { FormGroup, InputLabel } from '@material-ui/core';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import { useLocation } from 'react-router';

const ResetPassword = ({ loading, errorState, resetPassword }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get('email');
  const passwordResetToken = query.get('passwordResetToken');

  useEffect(() => {
    setError(errorState);
  }, [errorState]);

  const validate = () => {
    let error;

    if (!password || (password.length < 8 && password.length > 255)) {
      error = 'Password invalid';
    } else if (!passwordConfirmation || password !== passwordConfirmation) {
      error = 'Passwords do not match';
    }

    setError(error);
    return error;
  };

  const onSubmit = () => {
    const error = validate();

    if (error) return;

    resetPassword({
      email,
      password,
      passwordConfirmation,
      token: passwordResetToken,
    });
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.resetPassword}>
        <div className={styles.resetPasswordBox}>
          <h2>Reset Password</h2>

          {error && <div className={styles.errorBox}>{error}</div>}

          <FormGroup className={styles.formGroup}>
            <InputLabel className={styles.inputLabel}>Password</InputLabel>
            <InputBox
              type="password"
              className={styles.inputBox}
              placeholder="***********"
              value={password}
              setValue={setPassword}
            />
          </FormGroup>

          <FormGroup className={styles.formGroup}>
            <InputLabel className={styles.inputLabel}>
              Password Confirmation
            </InputLabel>
            <InputBox
              type="password"
              className={styles.inputBox}
              placeholder="***********"
              value={passwordConfirmation}
              setValue={setPasswordConfirmation}
            />
          </FormGroup>

          <Button
            onClick={onSubmit}
            className={styles.submitButton}
            disabled={loading}
            disabledWithOverlay={true}
          >
            <span>Reset</span>
          </Button>
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authentication.loading,
    errorState: state.authentication.error,
    userEmail: state.authentication.email,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: payload => {
      dispatch(AuthenticationActions.resetPassword(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
