import styles from './styles.module.scss';
import _ from 'lodash';
import { connect, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import EventsCarouselContainer from '../../components/EventsCarouselContainer';
import Leaderboard from '../../components/Leaderboard';
import Lightbox from '../../components/Lightbox/Lightbox';
import UniswapContent from '../../components/Lightbox/UniswapContent';
import { Link, useParams } from 'react-router-dom';
import { LeaderboardActions } from '../../store/actions/leaderboard';
import { EventActions } from 'store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import { useEffect } from 'react';
import Routes from 'constants/Routes';
import ContentFooter from '../../components/ContentFooter';
import { PopupActions } from '../../store/actions/popup';
import State from '../../helper/State';
import { getTradeById } from '../../api';
import ActivitiesTracker from '../../components/ActivitiesTracker';
import LandingPage from 'screens/LandingPage';
import classNames from 'classnames';
import SocialIcons from 'components/SocialIcons';
import YellowButton from 'components/YellowButton';
import AlphaPlatformCards from 'components/AlphaPlatformCards';
import { ALPHA_PLATFORMS } from 'constants/AlphaPlatform';
import { GeneralActions } from '../../store/actions/general';

const Home = ({ tags, setOpenDrawer, fetchTags, showPopup, events, users }) => {
  const isMount = useIsMount();
  const { eventId, betId, tradeId } = useParams();
  const userLoggedIn = useSelector(
    state => state.authentication.authState === 'LOGGED_IN'
  );

  const renderBetApprovePopup = async () => {
    if (isMount) {
      if (eventId && betId && tradeId) {
        const event = State.getEventByTrade(betId, events);
        const bet = State.getTradeByEvent(betId, event);
        const tradeResponse = await getTradeById(tradeId).catch(err => {
          console.error("Can't get trade by id:", err);
        });

        const trade = _.get(tradeResponse, 'data', null);

        const options = {
          eventId: eventId,
          betId: betId,
          tradeId: tradeId,
          data: {
            bet: bet,
            trade: trade,
          },
          hideShare: true,
        };

        if (betId && tradeId && eventId) {
          showPopup('betApprove', options);
        }
      }
    }
  };

  useEffect(() => {
    if (isMount) {
      fetchTags();
      renderBetApprovePopup();
    }
  }, []);

  const renderHeadline = () => {
    return (
      <div className={styles.mainHeadline}>
        <h1>Betting Reimagined</h1>

        <div className={styles.slogan}>Clear, Social &amp; Fair</div>

        <SocialIcons
          className={styles.socialIcons}
          dataTrackingIds={{
            telegram: 'home-telegram',
            instagram: 'home-instagram',
            twitter: 'home-twitter',
          }}
        />
      </div>
    );
  };

  const onSeeLeaderboard = () => {
    window.scrollTo(0, 0);
    setOpenDrawer('leaderboard');
  };

  const renderTags = () => {
    return (
      <div className={styles.tags}>
        {tags &&
          tags.map((tag, index) => {
            return (
              <div key={index} className={styles.tag}>
                #{tag}
              </div>
            );
          })}
      </div>
    );
  };

  const renderBlogBanner = () => {
    return (
      <Link data-tracking-id="home-blog-open" to={Routes.blog}>
        <div className={classNames(styles.banner, styles.blogBanner)}>
          {/* <div className={styles.title}>Blog</div> */}
          <div className={styles.title}>
            {'        '}
            <br />
            {'         '}
          </div>
        </div>
      </Link>
    );
  };

  const renderAlphaPlatform = () => {
    return <AlphaPlatformCards alphaplatforms={ALPHA_PLATFORMS} />;
  };

  const renderRosiBanner = () => {
    return (
      <Link data-tracking-id="home-play-elon" to={Routes.rosiGame}>
        <div className={styles.banner}>
          <div className={styles.title}>
            Play the
            <br />
            Elon Game
          </div>
          <YellowButton className={styles.button}>Play now</YellowButton>
        </div>
      </Link>
    );
  };

  const renderUniswap = () => {
    return (
      <div className={styles.lightboxWrapper}>
        <Lightbox>
          <UniswapContent />
        </Lightbox>
      </div>
    );
  };

  const renderCategoriesAndLeaderboard = () => {
    return (
      <div className={styles.bottomWrapper}>
        <div className={styles.categories}>
          <div className={styles.headline}>
            Activities{' '}
            <Link
              data-tracking-id="activities-see-all"
              className={styles.seeAllActivities}
              to={Routes.activities}
            >
              See all
            </Link>
          </div>
          <ActivitiesTracker />
          {/*<CategoryList categories={EVENT_CATEGORIES} />*/}
        </div>
        <div className={styles.leaderboard}>
          <div className={styles.headline}>
            Community Leaderboard
            <div
              className={styles.leaderboardLink}
              onClick={onSeeLeaderboard}
              data-tracking-id="leaderboard-see-leaderboard"
            >
              See Leaderboard
            </div>
          </div>
          <Leaderboard fetch={true} small={true} />
        </div>
      </div>
    );
  };

  //if (!userLoggedIn) return <LandingPage />;

  return (
    <BaseContainerWithNavbar>
      {renderHeadline()}
      {/* <Header /> */}
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {renderAlphaPlatform()}
          {renderRosiBanner()}
          <EventsCarouselContainer eventType="non-streamed" />
          <EventsCarouselContainer eventType="streamed" />
          {renderCategoriesAndLeaderboard()}
          {renderUniswap()}
          <ContentFooter />
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.event.tags,
    events: state.event.events,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
    fetchTags: () => {
      dispatch(EventActions.fetchTags());
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
