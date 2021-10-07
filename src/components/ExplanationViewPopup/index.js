import styles from './styles.module.scss';
import { connect } from 'react-redux';
import Button from '../Button';
import { PopupActions } from '../../store/actions/popup';
import { TOKEN_NAME } from '../../constants/Token';
import { useLocation } from 'react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
// swiper bundle styles
import 'swiper/swiper-bundle.min.css';

// swiper core styles
import 'swiper/swiper.min.css';
// modules styles
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import SwiperCore, { Pagination, Navigation } from 'swiper';

import gamesStep1 from '../../data/images/explanations-popups/games_step1.png';
import gamesStep2 from '../../data/images/explanations-popups/games_step2.png';
import gamesStep3 from '../../data/images/explanations-popups/games_step3.png';

import eventsStep1 from '../../data/images/explanations-popups/events_step1.png';
import eventsStep2 from '../../data/images/explanations-popups/events_step2.png';
import eventsStep3 from '../../data/images/explanations-popups/events_step3.png';
import eventsStep4 from '../../data/images/explanations-popups/events_step4.png';

import classNames from 'classnames';
import { ACTIVITIES_TO_TRACK } from '../../constants/Activities';
import React from 'react';

const ExplanationViewPopup = ({ closed, hidePopup }) => {
  const { pathname } = useLocation();

  const renderExplanationLiveEvents = () => {
    return (
      <div className={styles.explanationTextContainer}>
        <h3 className={styles.explanationTextHeadline}>
          How to participate in Live Events?
          <span className={styles.explanationTextHeadlineUnderline}></span>
        </h3>

        <span className={styles.explanationText}>
          <p>
            Wallfair's Live Events bring an added layer of entertainment to all
            live streams out there. While watching any live stream on Wallfair,
            you can now bet on various exciting events while enjoying the
            stream!
          </p>

          <p>
            To participate, simply choose an event that has an active live
            stream, enter an amount of WFAIR you'd like to wager and finally
            choose your desired outcome(s)!
          </p>

          <p>
            In case the probability of your chosen outcome has deviated from
            your target, you can sell your position at any time before the event
            ends.
          </p>

          <p>
            Wallfair allows you to place a bet anywhere and anytime, while
            granting you the flexibility to trade your positions in the event!
          </p>

          <p>
            In addition, you can chat with the community, share your events, and
            see details about the events and trades!
          </p>
        </span>
      </div>
    );
  };

  const renderExplanationEvents = () => {
    const renderSteps = () => {
      return (
        <div className={styles.stepsContainer}>
          <div className={styles.stepItem}>
            <img src={eventsStep1} />
          </div>
          <div className={styles.stepItem}>
            <img src={eventsStep2} />
          </div>
          <div className={styles.stepItem}>
            <img src={eventsStep3} />
          </div>
          <div className={styles.stepItem}>
            <img src={eventsStep4} />
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
            href={'https://wallfair.gitbook.io/wallfair/placing-a-bet'}
            target={'_blank'}
          >
            check our gitbook !
          </a>
        </div>
      </div>
    );
  };

  const renderExplanationGames = () => {
    const renderSteps = () => {
      return (
        <div className={styles.stepsContainer}>
          <div className={styles.stepItem}>
            <div className={styles.cropGames}>
              <img src={gamesStep1} />
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.cropGames}>
              <img src={gamesStep2} />
            </div>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.cropGames}>
              <img src={gamesStep3} />
            </div>
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
            href={'https://wallfair.gitbook.io/wallfair/placing-a-bet'}
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

  const isLiveEvents = pathname.indexOf('/live-events') != -1;
  const isEvents = pathname.indexOf('/events') != -1;
  const isGames = pathname.indexOf('/games') != -1;

  return (
    <div
      className={classNames(
        styles.explanationContainer,
        isGames || isEvents ? styles.explanationContainerVisual : ''
      )}
    >
      {isLiveEvents && renderExplanationLiveEvents()}
      {isEvents && renderExplanationEvents()}
      {isGames && renderExplanationGames()}
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

export default connect(null, mapDispatchToProps)(ExplanationViewPopup);
