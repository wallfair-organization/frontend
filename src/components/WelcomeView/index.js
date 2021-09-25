import _ from 'lodash';

import Icon from '../Icon';
import IconType from '../Icon/IconType';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import Button from '../Button';
import { PopupActions } from '../../store/actions/popup';
import { TOKEN_NAME } from '../../constants/Token';

const WelcomeView = ({ closed, user, hidePopup }) => {
  const renderHeadline = () => {
    const name = _.get(user, 'name');

    return (
      <span className={styles.welcomeHeadline}>
        Welcome {name}, <br />
        free for full Wallfair experience!
      </span>
    );
  };

  const renderWelcomeText = () => {
    return (
      <div className={styles.welcomeTextContainer}>
        <span className={styles.welcomeTextHeadline}>
          5.000 {TOKEN_NAME}
          <span className={styles.welcomeTextHeadlineUnderline}></span>
        </span>
        <span className={styles.welcomeTextText}>
          Refer a friend and get additional 500 {TOKEN_NAME}.
        </span>
      </div>
    );
  };

  const renderStartTradingButton = () => {
    return (
      <Button
        withoutBackground={true}
        onClick={hidePopup}
        className={styles.startTradingButton}
      >
        Start trading!
      </Button>
    );
  };

  return (
    <div className={styles.welcomeContainer}>
      <span className={styles.welcomeConfettiLeft}>
        <Icon iconType={IconType.confettiLeft} iconTheme={null} />
      </span>
      <span className={styles.welcomeConfettiRight}>
        <Icon iconType={IconType.confettiRight} iconTheme={null} />
      </span>
      {renderHeadline()}
      {renderWelcomeText()}
      {renderStartTradingButton()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView);
