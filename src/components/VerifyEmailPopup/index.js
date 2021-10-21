import _ from 'lodash';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { resendEmailVerification } from '../../api';
import Button from '../Button';
import { ReactComponent as SuccessIcon } from '../../data/icons/success-circle.svg';
import { ReactComponent as FailedIcon } from '../../data/icons/failed-circle.svg';

const VerifyEmailPopup = ({
  closed,
  hidePopup,
  emailVerificationState,
  emailVerificationUserId,
}) => {
  const onResendClick = async () => {
    hidePopup();
    await resendEmailVerification(emailVerificationUserId);
  };

  const onCloseClick = () => {
    hidePopup();
  };

  return (
    <div className={styles.welcomeContainer}>
      <div
        className={classNames(styles.welcomeContentContainer, styles.hidden)}
      >
        <div className={styles.welcomeContentOverlay}></div>
        <div className={styles.welcomeContent}></div>
      </div>
      <div className={classNames(styles.welcomeAuthContainer)}>
        <div className={styles.verifyBlock}>
          {emailVerificationState && (
            <SuccessIcon className={styles.successIcon} />
          )}
          {!emailVerificationState && (
            <FailedIcon className={styles.failedIcon} />
          )}

          <span className={styles.shortcutText}>
            Verification{' '}
            {emailVerificationState
              ? 'was successful'
              : !emailVerificationState
              ? 'has failed'
              : 'is running'}
            .
          </span>

          {!emailVerificationState && (
            <Button
              withoutBackground={true}
              className={styles.resendEmailButton}
              onClick={onResendClick}
            >
              Resend verification email
            </Button>
          )}

          {emailVerificationState && (
            <Button
              withoutBackground={true}
              className={styles.resendEmailButton}
              onClick={onCloseClick}
            >
              Start trading!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const emailVerificationState = state.authentication.emailVerificationState;
  const emailVerificationUserId = state.authentication.emailVerificationUserId;
  return {
    emailVerificationState,
    emailVerificationUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPopup);
