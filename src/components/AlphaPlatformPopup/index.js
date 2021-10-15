import styles from './styles.module.scss';
import { connect } from 'react-redux';
import Button from '../Button';
import { PopupActions } from '../../store/actions/popup';
// swiper bundle styles
import 'swiper/swiper-bundle.min.css';

// swiper core styles
import 'swiper/swiper.min.css';
// modules styles
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import alphaPlatformStep1 from '../../data/images/alpha-platforms/card_01.png';
import alphaPlatformStep2 from '../../data/images/alpha-platforms/card_02.png';
import alphaPlatformStep3 from '../../data/images/alpha-platforms/card_03.png';
import alphaPlatformStep4 from '../../data/images/alpha-platforms/card_04.png';

import classNames from 'classnames';

const AlphaPlatformPopup = ({ closed, hidePopup }) => {
  const renderExplanationAlphaPlatformss = () => {
    const renderSteps = () => {
      return (
        <div className={styles.stepsContainer}>
          <div className={styles.stepItem}>
            <img src={alphaPlatformStep1} />
          </div>
          <div className={styles.stepItem}>
            <img src={alphaPlatformStep2} />
          </div>
          <div className={styles.stepItem}>
            <img src={alphaPlatformStep3} />
          </div>
          <div className={styles.stepItem}>
            <img src={alphaPlatformStep4} />
          </div>
        </div>
      );
    };

    return (
      <div className={styles.explanationImageContainer}>
        <h3 className={styles.explanationTextHeadline}>
          How does it work?
          <span className={styles.explanationTextHeadlineUnderline}></span>
        </h3>
        <div className={styles.visualSteps}>{renderSteps()}</div>

        <div className={styles.checkMore}>
          For more information,{' '}
          <a
            href={
              'https://wallfair.gitbook.io/wallfair/the-magical-leaderboard'
            }
            target={'_blank'}
          >
            check our gitbook !
          </a>
        </div>
      </div>
    );
  };

  const renderCTAButton = () => {
    return (
      <Button
        withoutBackground={true}
        onClick={hidePopup}
        className={styles.ctaButton}
      >
        Let's do it!
      </Button>
    );
  };

  return (
    <div
      className={classNames(
        styles.explanationContainer,
        styles.explanationContainerVisual
      )}
    >
      {renderExplanationAlphaPlatformss()}
      {renderCTAButton()}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(AlphaPlatformPopup);
