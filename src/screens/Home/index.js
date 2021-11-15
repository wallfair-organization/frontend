import { useEffect, memo, useState} from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import { connect, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import EventsCarouselContainer from '../../components/EventsCarouselContainer';
import Leaderboard from '../../components/Leaderboard';
import Lightbox from '../../components/Lightbox/Lightbox';
import UniswapContent from '../../components/Lightbox/UniswapContent';
import { Link, useLocation, useParams } from 'react-router-dom';
import { EventActions } from 'store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import Routes from 'constants/Routes';
import ContentFooter from '../../components/ContentFooter';
import { PopupActions } from '../../store/actions/popup';
import State from '../../helper/State';
import { getTradeById } from '../../api';
import ActivitiesTracker from '../../components/ActivitiesTracker';
import SocialIcons from 'components/SocialIcons';
import YellowButton from 'components/YellowButton';
import { GeneralActions } from '../../store/actions/general';
import { NEW_SLOTS_GAMES } from '../../constants/Games';
import GameCards from '../../components/GameCards';
import SlotGameIconBg from '../../data/images/house-games/title.svg';
import howTokenWorkTitle from '../../data/images/token/title.svg';
import howTokenWorkPToken from '../../data/images/token/PToken.png';
import howTokenWorkWToken from '../../data/images/token/WToken.png';
import alpacaActivities from '../../data/images/alpaca-activities.svg';
import whoWeAreTitle from '../../data/images/who-are-wallfair/title.svg';
import whoWeAreLogo from '../../data/images/who-are-wallfair/logo.png';
import whoWeAreAlphaLogo from '../../data/images/who-are-wallfair/alpha-logo.png';
import whoWeAreCard1 from '../../data/images/who-are-wallfair/who-is-wallfair.png';
import whoWeAreCard2 from '../../data/images/who-are-wallfair/what-is-alpha.png';
import whoWeAreCard3 from '../../data/images/who-are-wallfair/competetive.png';
import whoWeAreCard4 from '../../data/images/who-are-wallfair/rewards.png';
import EventActivitiesTracker from '../../components/EventActivitiesTracker';
import TabOptions from 'components/TabOptions';
import ActivityTable from 'components/EventActivitiesTracker/ActivityTable';
import { RosiGameActions } from 'store/actions/rosi-game';
import useRosiData from 'hooks/useRosiData';
import gameCard1 from '../../data/images/house-games/card-1.png';
import gameCard5 from '../../data/images/house-games/card-5.png';
import gameCard3 from '../../data/images/house-games/card-3.png';
import gameCard4 from '../../data/images/house-games/card-4.png';

const Home = ({ tags, setOpenDrawer, fetchTags, showPopup, events, refreshHighData, refreshLuckyData, connected, userId, refreshMyBetsData}) => {
  const isMount = useIsMount();
  const { eventId, betId, tradeId } = useParams();
  const location = useLocation();
  let urlParams = new URLSearchParams(location.search);

  const dispatch = useDispatch();
  const {
    highData,
    luckyData,
    myBetsData,
  } = useRosiData();
  const [activityTabIndex, setActivityTabIndex] = useState(0);
  let activityTabOptions = [
    { name: 'ALL', index: 0 },
    { name: 'HIGH WINS', index: 1 },
    { name: 'LUCKY WINS', index: 2 },
  ];

  if(userId) activityTabOptions.push({name: 'MY BETS', index: 3});

  const handleActivitySwitchTab = ({ index }) => {
    switch (index) {
      case 1: // high wins
        refreshHighData();
        break;
      case 2: // lucky wins
        refreshLuckyData();
        break;
      case 3:
        if(userId) refreshMyBetsData({userId});
        break;
    }
    setActivityTabIndex(index);
  };
  const getActivityTableData = () => {
    switch (activityTabIndex) {
      case 1:
        return highData || [];
      case 2:
        return luckyData || [];
      case 3:
        return myBetsData || [];
    }
  }

  useEffect(() => {
    refreshHighData();
    refreshLuckyData();
    if(userId) refreshMyBetsData({userId});
  }, [dispatch, connected]);

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

  const handleRefPersistent = () => {
    const ref = urlParams.get('ref');

    if (ref) {
      localStorage.setItem('urlParam_ref', ref);
    }
  };

  useEffect(() => {
    if (isMount) {
      fetchTags();
      renderBetApprovePopup();
      handleRefPersistent();
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

  const renderRosiBanner = () => {
    return (
      <Link data-tracking-id="home-play-elon" to={Routes.elonGame}>
        <div className={styles.banner}>
          <div className={styles.title}>Play the Elon Game</div>
          <button className={styles.button}>SIGN UP!</button>
        </div>
      </Link>
    );
  };
  const renderHowTokenWorks = () => {
    return (
      <div className={styles.howTokenWorks}>
        <div className={styles.title}>
          <img src={howTokenWorkTitle} alt="" />
          <h2>
          How our tokens work?
          </h2>
        </div>
        <div className={styles.tokenDetail}>
          <Grid container>
            <Grid item md={4} xs={12}>
              <div className={styles.token}>
                <div className={styles.thumbnail}>
                  <img src={howTokenWorkPToken} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>$PFAIR Token?</h3>
                  <p>
                    PFAIR is Wallfair's FREE-TO-PLAY token. The tokens can be
                    used in the ALPACASINO playground for risk and care free
                    betting fun
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item md={4} xs={12}>
              <div className={styles.token}>
                <div className={styles.thumbnail}>
                  <img src={howTokenWorkWToken} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>$WFAIR Token?</h3>
                  <p>
                    WFAIR tokens are your betting cryptocurrency, these are can
                    transfered at anytime for real world cash
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item md={4} xs={12}>
              <div className={styles.token}>
                <div className={styles.thumbnail}>
                  <img src={howTokenWorkWToken} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>WEEKLY Awards</h3>
                  <p>
                    Keep playing and rise to the top of the leaderboard every week 
                    and increase the chances of winning real WFAIR tokens.
                    Winners will be announced every Sunday!
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
  const renderWhoWeAre = () => {
    return (
      <div className={styles.whoWeAre}>
        <div className={styles.title}>
          <img src={whoWeAreTitle} alt="" />
          <h2>
            About Alpacasino
            {/* <img src={whoWeAreLogo} alt="" /> */}
          </h2>
        </div>
        <div className={styles.cardBox}>
          <Grid container>
            <Grid item lg={3} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnail}>
                  <img src={whoWeAreCard1} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>
                    Who is Alpacasino
                  </h3>
                  <p>
                    Alpacasino is a new type of crypocurrency betting platform
                    which is more entertaining and easier than any other
                    platform out there!
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <div className={styles.card}>
                <div
                  className={styles.thumbnail}
                  style={{ marginBottom: '-25px' }}
                >
                  <img src={whoWeAreCard2} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>
                    What Is
                    <img src={whoWeAreAlphaLogo} alt="" />
                  </h3>
                  <p>
                    Alpacasino Alpha is your safe betting playground, bet without
                    the worry of losing. We’re giving 5,000 $PFAIR Tokens for
                    exclusive access to risk free fun.
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnail}>
                  <img src={whoWeAreCard3} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>Competive Edge</h3>
                  <p>
                    More you win the higher you climb the monthly community
                    leaderboards. We’ve added some secret challenges to reward
                    you even more $PFAIR Tokens ...
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <div className={styles.card}>
                <div
                  className={styles.thumbnail}
                  style={{ marginBottom: '-70px', marginTop: '-100px' }}
                >
                  <img src={whoWeAreCard4} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>Real Rewards</h3>
                  <p>
                    More you win the higher you climb the monthly community
                    leaderboards. We’ve added some secret challenges to reward
                    you even more $PFAIR Tokens ...
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
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
      <div className={styles.activities}>
        <div className={styles.title}>
            <img src={alpacaActivities} alt="" />
            <h2>
              Activities
            </h2>
        </div>
        <Grid item xs={12} >
          <div className={styles.activityWrapper}>
            <TabOptions options={activityTabOptions} className={styles.tabLayout}>
              {option => (
                <div
                  className={
                    option.index === activityTabIndex
                      ? styles.tabItemSelected
                      : styles.tabItem
                  }
                  onClick={() => handleActivitySwitchTab(option)}
                >
                  {option.name}
                </div>
              )}
            </TabOptions>
            <div className={styles.activityContainer}>
              {activityTabIndex === 0 && (
                <EventActivitiesTracker
                  activitiesLimit={50}
                  className={styles.activitiesTrackerGamesBlock}
                  preselectedCategory={'game'}
                  hideSecondaryColumns={true}
                />
              )}
              {activityTabIndex !== 0 && (
                <ActivityTable
                  hideSecondaryColumns={true}
                  rowData={getActivityTableData()}
                />
              )}
            </div>
          </div>
        </Grid>
      </div>
      );
  };

  const renderGamesCards = () => {
    return (
      <div className={styles.gameCards}>
        <div className={styles.title}>
          <img src={SlotGameIconBg} alt={'Visit slot games'} />
          <h2>House Games</h2>
        </div>
        <div className={styles.cardBox}>
          <Grid container>
            <Grid item lg={3} md={6} xs={12}>
              <Link to={'/games/alpaca-wheel'}>
                <img src={gameCard1} alt="" />
              </Link>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <img src={gameCard5} alt="" />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <img src={gameCard3} alt="" />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <img src={gameCard4} alt="" />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <BaseContainerWithNavbar>
      {/* {renderHeadline()} */}
      {/* <Header /> */}
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {renderRosiBanner()}
          {/* <EventsCarouselContainer eventType="non-streamed" /> */}
          {/*<EventsCarouselContainer eventType="streamed" />*/}
          {renderGamesCards()}
          {renderHowTokenWorks()}
          {renderWhoWeAre()}
          {renderCategoriesAndLeaderboard()}
          {renderUniswap()}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.event.tags,
    events: state.event.events,
    connected: state.websockets.connected,
    userId: state.authentication.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshHighData: () => dispatch(RosiGameActions.fetchHighData()),
    refreshLuckyData: () => dispatch(RosiGameActions.fetchLuckyData()),
    refreshMyBetsData: (data) => dispatch(RosiGameActions.fetchMyBetsData(data)),
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

const Connected = connect(mapStateToProps, mapDispatchToProps)(Home);
export default memo(Connected);
