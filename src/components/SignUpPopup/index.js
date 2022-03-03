import Icon from '../Icon';
import LogoMini from '../../data/images/wfair-logo-splash.png';
import IconType from '../Icon/IconType';
import React from 'react';
import styles from './styles.module.scss';
import { connect, useSelector } from 'react-redux';
import Button from '../Button';
import { LOGGED_IN } from 'constants/AuthState';
import { TOKEN_NAME } from '../../constants/Token';
import { selectTotalUsers } from '../../store/selectors/leaderboard';
import { OnboardingActions } from 'store/actions/onboarding';
import { currencyDisplay } from 'helper/Currency';

const SignUpPopup = ({ authState, startOnboarding }) => {
  const totalUsers = useSelector(selectTotalUsers);

  const renderWelcomeText = () => {
    return (
      <div className={styles.welcomeTextContainer}>
        <img className={styles.logoMini} src={LogoMini} alt="logo" />
        <span className={styles.welcomeTextText}>Sign up now and get</span>
        <span className={styles.welcomeTextHeadline}>
          100 {currencyDisplay(TOKEN_NAME)} for testing.
          <span className={styles.welcomeTextHeadlineUnderline}></span>
        </span>
        <ul className={styles.featureList}>
          {/* <li>Only {totalUsers}/5000 slots available</li> */}
          <li>PFAIR = WFAIR playmoney</li>
          <li>No risk of losing any real money</li>
          <li>100% free</li>
        </ul>
      </div>
    );
  };

  const goToJoinPage = () => {
    if (authState !== LOGGED_IN) {
      startOnboarding();
    }
  };

  const renderStartTradingButton = () => {
    return (
      <Button
        withoutBackground={true}
        className={styles.joinNowButton}
        onClick={goToJoinPage}
      >
        Join now
      </Button>
    );
  };

  return (
    <div className={styles.welcomeContainer} onClick={goToJoinPage}>
      <span className={styles.welcomeConfettiRight}>
        <Icon iconType={IconType.confettiRight} iconTheme={null} />
      </span>
      {renderWelcomeText()}
      {renderStartTradingButton()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    user: state.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startOnboarding: () => {
      dispatch(OnboardingActions.start());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPopup);
