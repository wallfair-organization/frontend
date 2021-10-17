import Icon from '../Icon';
import LogoMini from '../../data/images/logo.png';
import IconType from '../Icon/IconType';
import React from 'react';
import styles from './styles.module.scss';
import { connect, useSelector } from 'react-redux';
import Button from '../Button';
import { PopupActions } from '../../store/actions/popup';
import { LOGGED_IN } from 'constants/AuthState';
import { TOKEN_NAME } from '../../constants/Token';
import PopupTheme from '../Popup/PopupTheme';
import AuthenticationType from '../Authentication/AuthenticationType';
import { selectTotalUsers } from '../../store/selectors/leaderboard';

const SignUpPopup = ({ closed, user, hidePopup, showPopup, authState }) => {
  const totalUsers = useSelector(selectTotalUsers);

  const renderWelcomeText = () => {
    return (
      <div className={styles.welcomeTextContainer}>
        <img className={styles.logoMini} src={LogoMini} />
        <span className={styles.welcomeTextText}>Sign up now and get</span>
        <span className={styles.welcomeTextHeadline}>
          5,000 {TOKEN_NAME} for testing.
          <span className={styles.welcomeTextHeadlineUnderline}></span>
        </span>
        <ul className={styles.featureList}>
          <li>Only {totalUsers}/500 slots available</li>
          <li>PFAIR = WFAIR playmoney</li>
          <li>No risk of losing any real money</li>
        </ul>
      </div>
    );
  };

  const goToJoinPage = () => {
    if (authState !== LOGGED_IN) {
      showPopup(PopupTheme.auth, {
        small: true,
        authenticationType: AuthenticationType.register,
      });
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
    <div className={styles.welcomeContainer}>
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
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPopup);
