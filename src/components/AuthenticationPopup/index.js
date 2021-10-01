import classNames from 'classnames';
import Authentication from 'components/Authentication';
import TimeCounter from 'components/TimeCounter';
import { TOKEN_NAME } from 'constants/Token';
import styles from './styles.module.scss';
import timerStyles from './timer-styles.module.scss';
import { ReactComponent as ConfettiLeft } from '../../data/icons/confetti-left.svg';
import { ReactComponent as ConfettiRight } from '../../data/icons/confetti-right.svg';

const AuthenticationPopup = ({ authenticationType }) => {
  const promoDeadline = '2021-10-12T08:00:00';
  const isPromoWindow = true;

  const renderPromoMessage = () => (
    <div className={styles.promoMessage}>
      <div className={styles.timeContainer}>
        <TimeCounter endDate={promoDeadline} externalStyles={timerStyles} />
      </div>
      <p>
        Sign up <strong>now</strong> for a chance to be one of the 500 early
        access testers to earn
      </p>
      <span className={styles.prizeAmount}>5.000 {TOKEN_NAME}</span>
      <ConfettiLeft className={styles.confettiLeft} />
      <ConfettiRight className={styles.confettiRight} />
    </div>
  );

  return (
    <div
      className={classNames(
        styles.registration,
        isPromoWindow && styles.registrationWithPromo
      )}
    >
      {isPromoWindow && renderPromoMessage()}
      <div className={styles.form}>
        <Authentication authenticationType={authenticationType} />
      </div>
    </div>
  );
};

export default AuthenticationPopup;
