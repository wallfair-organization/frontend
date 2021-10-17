import classNames from 'classnames';
import Authentication from 'components/Authentication';
import TimeCounter from 'components/TimeCounter';
import { TOKEN_NAME } from 'constants/Token';
import styles from './styles.module.scss';
import timerStyles from './timer-styles.module.scss';
import { ReactComponent as ConfettiLeft } from '../../data/icons/confetti-left.svg';
import { ReactComponent as ConfettiRight } from '../../data/icons/confetti-right.svg';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHA_KEY } from 'constants/Api';
import iPhoneImg from '../../data/images/signup-content/iphone13Pro.jpg';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

const AuthenticationPopup = ({ authenticationType }) => {
  const [showCriteria, setShowCriteria] = useState(!isMobile);

  const promoDeadline =
    process.env.REACT_APP_SIGNUP_PROMO_DEADLINE_DATETIME ||
    '2021-10-22T16:00:00';
  const isPromoWindow =
    AuthenticationType.register === authenticationType &&
    !!promoDeadline &&
    new Date() < new Date(promoDeadline);

  const renderPromoMessage = () => (
    <div className={styles.promoMessage}>
      <div className={styles.timeContainer}>
        <TimeCounter endDate={promoDeadline} externalStyles={timerStyles} />
      </div>
      <p>
        Sign up <strong>now</strong> for a chance to be one of the 5,000 early
        access testers and earn
      </p>
      <span className={styles.prizeAmount}>5,000 {TOKEN_NAME}</span>
      <ConfettiLeft className={styles.confettiLeft} />
      <ConfettiRight className={styles.confettiRight} />
    </div>
  );

  const renderRaffleMessage = () => (
    <div className={classNames([styles.promoMessage, styles.raffle])}>
      <h2 className={styles.giveaway}>iPhone Giveaway!</h2>

      <div className={styles.timeContainer}>
        <TimeCounter endDate={promoDeadline} externalStyles={timerStyles} />
      </div>
      <div className={styles.raffleContent}>
        <img src={iPhoneImg} className={styles.iphone} />
        <div className="text">
          Among the 500
          <br />
          free slots we are
          <br />
          giving away an <br /> <strong>iPhone 13 Pro</strong>
          <br /> by random
          <br />
          selection.
        </div>
      </div>

      {!showCriteria ? (
        <div
          className={styles.buttonContainer}
          onClick={() => setShowCriteria(true)}
        >
          <div className={styles.button}>Learn More</div>
        </div>
      ) : (
        isMobile &&
        false && (
          <div
            className={styles.buttonContainer}
            onClick={() => setShowCriteria(false)}
          >
            <div className={styles.button}>Hide</div>
          </div>
        )
      )}

      {showCriteria ? (
        <>
          <div className={styles.criteria}>
            Criteria
            <span className={styles.underline}></span>
          </div>
          <ul
            className={classNames({
              [styles.hidden]: !showCriteria,
            })}
          >
            <li>
              You are among <strong>top 100</strong> in leaderboard
            </li>
            <li>You have tweeted or insta story tagging Wallfair</li>
            <li>
              You have at least <strong>1 WFAIR</strong> in your wallet at the
              tine of drawing
            </li>
            <li>You have left feedback on what to improve / change</li>
          </ul>
        </>
      ) : null}

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
      {isPromoWindow && renderRaffleMessage()}
      <div className={styles.form}>
        <GoogleReCaptchaProvider
          reCaptchaKey={RECAPTCHA_KEY}
          scriptProps={{
            async: true,
          }}
        >
          <Authentication authenticationType={authenticationType} />
        </GoogleReCaptchaProvider>
      </div>
    </div>
  );
};

export default AuthenticationPopup;
