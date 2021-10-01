import _ from 'lodash';

import Icon from '../Icon';
import IconType from '../Icon/IconType';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import Button from '../Button';
import { PopupActions } from '../../store/actions/popup';
import { TOKEN_NAME } from '../../constants/Token';
import { useCallback, useState } from 'react';

const WelcomeView = ({ closed, user, hidePopup }) => {
  const [readMore, setReadMore] = useState(false);

  const handleClickReadMore = useCallback(
    event => {
      setReadMore(true);
    },
    [setReadMore]
  );

  const renderHeadline = () => {
    const name = _.get(user, 'name');

    return (
      <span className={styles.welcomeHeadline}>Welcome! We just sent you</span>
    );
  };

  const renderWelcomeText = () => {
    return (
      <div className={styles.welcomeTextContainer}>
        <span className={styles.welcomeTextHeadline}>
          5.000 {TOKEN_NAME}
          <span>*</span>
          <span className={styles.welcomeTextHeadlineUnderline}></span>
        </span>
        <span className={styles.welcomeHeadline}>
          to get you started on the full Wallfair experience!
        </span>
        <span className={styles.welcomeTextText}>
          Refer a friend and get additional 500 {TOKEN_NAME}.
        </span>
      </div>
    );
  };

  const renderAlphaDisclaimer = () => {
    return (
      <div className={styles.welcomeTextContainer}>
        <span className={styles.disclaimer}>
          * Please be aware that the platform you are currently using is based
          on the virtual WFAIR tokens that have been implemented with the
          purpose to provide a full impression of the Wallfair gaming
          experience.{' '}
          {!readMore && (
            <span className={styles.readmore} onClick={handleClickReadMore}>
              READ MORE
            </span>
          )}
        </span>

        {readMore && (
          <span className={styles.disclaimer}>
            The platform is currently being optimized on testnet before going
            live on mainnet. Your token count will be accurately recorded on the
            internal ledger, which is why you will not be able to trade, sell or
            stake the tokens outside or extract them from the platform for now,
            however, we would like to disclose that the blockchain component of
            the platform will be implemented within the next 3 months (we will
            inform you accordingly) - thereafter, you will be able to use the
            token at their full capacity. In the meantime, please enjoy the
            testnet version!
          </span>
        )}
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
      {renderAlphaDisclaimer()}
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
