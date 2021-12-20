import { useEffect, useState, memo } from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { LOGGED_IN } from 'constants/AuthState';
import { EXTERNAL_GAMES } from '../../constants/Games';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import Lightbox from '../../components/Lightbox/Lightbox';
import UniswapContent from '../../components/Lightbox/UniswapContent';
import Button from '../../components/Button';
import { Link, useLocation, useParams } from 'react-router-dom';
import { EventActions } from 'store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import { PopupActions } from '../../store/actions/popup';
import State from '../../helper/State';
import { getTradeById } from '../../api';
import SocialIcons from 'components/SocialIcons';
import GameSmartsoft from 'components/GameSmartsoft';
import { GeneralActions } from '../../store/actions/general';
import howTokenWorkPToken from '../../data/images/token/PToken.png';
import howTokenWorkWToken from '../../data/images/token/WToken.png';
import EloneWithPhone from '../../data/images/elon-with-phone.png';
import gameCardWheel from '../../data/images/house-games/card-wheel.png';
import gameCardElon from '../../data/images/house-games/card-elon.png';
import gameCardPlinko from '../../data/images/house-games/card-plinko.png';
import gameCardPumpDump from '../../data/images/house-games/card-pumpdump.png';
import gameCardMines from '../../data/images/house-games/card-mines.png';
import MagentaAlpaca from '../../data/images/alpaca-dopter/magenta-alpaca.png';
import MagentaChip from '../../data/images/alpaca-dopter/magenta-chip.png';
import MagentaThumbnail from '../../data/images/candy-1.png';
import BlueAlpaca from '../../data/images/alpaca-dopter/blue-alpaca.png';
import BlueChip from '../../data/images/alpaca-dopter/blue-chip.png';
import YellowAlpaca from '../../data/images/alpaca-dopter/yellow-alpaca.png';
import YellowChip from '../../data/images/alpaca-dopter/yellow-chip.png';
import YellowThumbnail from '../../data/images/candy-3.png';
import AlphaLogo from '../../data/images/alpaca-dopter/alpha.png';
import { ReactComponent as LimitedOffer } from '../../data/images/limited-offer.svg';

import AlpacaHeader from 'data/images/alpaca-header.png';
import TopFront from '../../data/images/top-front-corner-image.png';
import TopBack from '../../data/images/top-back-corner-image.png';
import BottomFront from '../../data/images/bottom-front-corner-image.png';
import BottomBack from '../../data/images/bottom-back-corner-image.png';
import AlpacaBlue from '../../data/images/bottom-popup-images.png';
import AlpacaYellow from '../../data/images/home/alpaca-yellow.svg';

import FairPiece from '../../data/images/home/fair-piece.svg';
import UniquePiece from '../../data/images/home/unique-piece.svg';
import SocialPiece from '../../data/images/home/social-piece.svg';
import PlinkoAlpaca from '../../data/images/home/plinko-alpaca.svg';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core';
import AboutFirstImage from '../../data/images/about-1-image.png';
import AboutSecondImage from '../../data/images/about-2-image.png';
import AboutTopAlpaca from '../../data/images/about-top-alpaca.png';
import AboutThirdImage from '../../data/images/about-3-image.png';



import EventActivitiesTab from 'components/EventActivitiesTabs';
import classNames from 'classnames';
import useOAuthCallback from 'hooks/useOAuthCallback';
import { OnboardingActions } from 'store/actions/onboarding';
import GameContentCards from 'components/GameContentCards/GameContentCards';
import { TOKEN_NAME } from 'constants/Token';
import AmbassadorBanner from 'components/AmbassadorBanner';
import NftBanner from 'components/NftBanner';

const Home = ({
  authState,
  tags,
  setOpenDrawer,
  fetchTags,
  showPopup,
  events,
  startOnboardingFlow,
}) => {
  const isMount = useIsMount();
  const { eventId, betId, tradeId } = useParams();
  const location = useLocation();
  let urlParams = new URLSearchParams(location.search);
  const theme = useTheme();
const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
const isSmall = useMediaQuery(theme.breakpoints.down('sm'));


  useOAuthCallback();

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

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
      // fetchTags();
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

  const renderHowTokenWorks = () => {
    return (
      <div className={styles.howTokenWorks}>
        <div className={styles.tokenDetail}>
          <div className={styles.token}>
            <div className={styles.thumbnail}>
              <img src={howTokenWorkPToken} alt="" />
            </div>
            <div className={styles.detail}>
              <h3>$PFAIR Token?</h3>
              <p>
                PFAIR is Wallfair's FREE-TO-PLAY token. The tokens can be used
                in the ALPACASINO playground for risk and care free betting fun
              </p>
            </div>
          </div>
          <div className={styles.token}>
            <div className={styles.thumbnail}>
              <img src={howTokenWorkWToken} alt="" />
            </div>
            <div className={styles.detail}>
              <h3>$WFAIR Token?</h3>
              <p>
                WFAIR is the protocol token used on smart contracts. Alpacasino
                is a play-money simulation (“PFAIR”) of WFAIR use cases. You can
                buy and trade WFAIR{' '}
                <a
                  href="https://wallfair.io/buy-wfair"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
              </p>
            </div>
          </div>
          <div className={styles.token}>
            <div className={styles.thumbnails}>
              <img src={howTokenWorkPToken} alt="" />
              <img className={styles.second} src={howTokenWorkWToken} alt="" />
            </div>
            <div className={styles.detail}>
              <h3>WEEKLY Awards</h3>
              <p>
                Keep playing and rise to the top of the leaderboard every week
                and increase the chances of winning real WFAIR tokens. Winners
                will be announced every Monday!
              </p>
            </div>
          </div>
          <div className={styles.elonImg}>
            <img src={EloneWithPhone} alt="elon-with-phone" />
          </div>
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

  const renderActivities = () => {
    return (
      <div className={styles.activities}>
        <div className={styles.title}>
          <h2>Activities</h2>
        </div>
        <Grid item xs={12}>
          <EventActivitiesTab
            activitiesLimit={50}
            className={styles.activitiesTrackerGamesBlock}
            preselectedCategory={'game'}
            hideSecondaryColumns={true}
            layout="wide"
          ></EventActivitiesTab>
        </Grid>
      </div>
    );
  };

  const renderHouseGames = () => {
    return (
      <div className={styles.gameCards}>
        <div className={styles.title}>
          <h2>Alpaca Games</h2>
          <p>Games available only in Alpacasino. 100% fun & pure love </p>
        </div>
        <div className={styles.cardBox}>
          <Grid container spacing={1} justify="space-between">
            <Grid item lg={2} md={2} xs={6}>
              <Link to={'/games/pump-dump'}>
                <img src={gameCardPumpDump} alt="" />
              </Link>
            </Grid>
            <Grid item lg={2} md={2} xs={6}>
              <Link to={'/games/elon-game'}>
                <img src={gameCardElon} alt="" />
              </Link>
            </Grid>
            <Grid item lg={2} md={2} xs={6}>
              <Link to={'/games/plinko'}>
                <img src={gameCardPlinko} alt="" />
              </Link>
            </Grid>
            <Grid item lg={2} md={2} xs={6}>
              <Link to={'/games/mines'}>
                <img src={gameCardMines} alt="" />
              </Link>
            </Grid>
            <Grid item lg={2} md={2} xs={6}>
              <Link to={'/games/alpaca-wheel'}>
                <img src={gameCardWheel} alt="" />
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  const renderSlogGames = () => {
    return (
      <div className={styles.gameCards}>
        <GameSmartsoft games={EXTERNAL_GAMES} category="Slot Games" />
      </div>
    );
  };

  const renderAboutDescription = () => {
    return (
      <div className={styles.aboutDescritpion}>
        <img className={styles.topImage} src={PlinkoAlpaca} alt='fair-piece'/>
        <Grid container spacing={1} justify="space-between">
          <Grid item lg={4} md={4} xs={12}>
            <div className={styles.parentContainer}>
              <div className={styles.descriptionCardContainer}>
                <div className={styles.descriptionCard}>
                    <h1>Fair</h1>
                    <p>We have a mission to prove that crypto casino can just the pure entertainment. We operate on open source code, provide honest bonuses, and publicly communicate the house edges along with a full history of all the bets. Simply no hidden tricks just awesome fun!</p>
                </div>
                <img className={styles.thumbnail} src={FairPiece} alt='fair-piece'/>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <div className={styles.parentContainer}>
              <div className={styles.descriptionCardContainer}>
                <div className={styles.descriptionCard}>
                  <h1>Unique</h1>
                    <p>In Alpacasino you play with WFAIR, our own crypto currency. It gives you the advantage to earn money even when you are not playing. Stake your winnings and watch your wallet grow! The more people sign up, deposit and play, the higher the value of you wallet! </p>
                </div>
                <img className={styles.thumbnail} src={UniquePiece} alt='unique-piece'/>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <div className={styles.parentContainer}>
              <div className={styles.descriptionCardContainer}>
                <div className={styles.descriptionCard}>
                    <h1>Social</h1>
                    <p>Alpacasino is a part of Alpacaverse our flagship project that presents the future of the speculative entertainment. The future where world of betting, gambling and gaming is blended into one huge theme park metaverse. The place where you meet people and enjoy the excitement of potential rewards!</p>
                </div>
                <img className={styles.thumbnailBack} src={SocialPiece} alt='social-piece'/>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }

  const renderWelcome = () => {
    const showPopupForUnauthenticated = () => {
      if (!isLoggedIn()) {
        startOnboardingFlow();
      }
    };
    return (
      <div className={styles.welcomeContainer}>
        <div className={styles.cardContainer}>
          <div className={styles.cardBox}>
            <p>
              Welcome to
              <br /> <span>Alpacasino</span>
            </p>

            <LimitedOffer />
            <span className={styles.limitedOfferDescription}>
              Join today and receive
              <br />
              <span className={styles.highlighted}>50%</span>
              <br />
              cashback up to
              <br />
              <span className={styles.highlighted}>25 000</span>
              
              <p>WFAIRs</p>
            </span>

            <buton
              className={styles.startButton}
              onClick={showPopupForUnauthenticated}
            >
              Claim the offer!
            </buton>
            <img className={styles.topFront} src={TopFront} alt="" />
            <img className={styles.topBack} src={TopBack} alt="" />
            <img className={styles.bottomFront} src={BottomFront} alt="" />
            <img className={styles.bottomBack} src={BottomBack} alt="" />
          </div>
        </div>
      </div>
    );
  };
  const renderAlpacaDopter = () => {
    return (
      <div className={styles.alpacadopter}>
        <div className={styles.title}>
          <h2>
            Become an Early <span className={styles.pink}>ALPACA</span>DOPTER
          </h2>
        </div>
        <div className={styles.cardBox}>
          <Grid container>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnailMagenta}>
                  <img src={MagentaAlpaca} alt="" />
                  <img src={MagentaChip} alt="" />
                </div>
                <div className={styles.detail}>
                  <div>
                    <h3>Choose your Alpaca</h3>
                    <p>
                      Choose your Alpacavatar and name to join the gang. Play
                      fun games, interact, follow, chat to grow your Alpaca to
                      win the leaderboard and unlock cool NFT and crypto prices.
                    </p>
                  </div>
                  <div
                    className={classNames(styles.thumbnail, styles.cactusJack)}
                  >
                    <img src={YellowThumbnail} alt="" />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnailBlue}>
                  <img src={BlueAlpaca} alt="" />
                  <img src={BlueChip} alt="" />
                </div>
                <div className={styles.detail}>
                  <div>
                    <h3>Grow your Alpaca</h3>
                    <p>
                      You can earn {TOKEN_NAME} tokens in multiple ways: You can
                      play our house games (we are going to launch new games
                      weekly), invite other alpacas, provide feedback and (soon)
                      battle other alpacas(or bet on other alpaca fights) and
                      send tokens among each other.
                    </p>
                  </div>
                  <div className={styles.thumbnail}>
                    <img src={MagentaThumbnail} alt="" />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnailYellow}>
                  <img src={YellowAlpaca} alt="" />
                  <img src={YellowChip} alt="" />
                </div>
                <div className={styles.detail}>
                  <div>
                    <div className={styles.title}>
                      <h3>What</h3>
                    </div>
                    <p>
                      Alpacasino is the first betting and gaming platform
                      powered by Wallfair.
                    </p>
                  </div>
                  <div className={styles.thumbnail}>
                    <img src={YellowThumbnail} alt="" />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        {/* <div className={styles.bottomContainer}>
          <div className={styles.bottomBox}>
            <p>CREATE YOUR OWN <span className={styles.pink}>ALPACA</span> NOW!</p>
          </div>
        </div> */}
      </div>
    );
  };
  const renderAlpacaVerse = () => {
    return (
      <div className={styles.alpacaverse}>
        <div className={styles.title}>
          <h2>
            Welcome to the <span className={styles.pink}>ALPACA</span>VERSE
          </h2>
        </div>
        <GameContentCards />
      </div>
    );
  };

  return (
    <BaseContainerWithNavbar home loggedIn={isLoggedIn()}>
      {/* {renderHeadline()} */}
      {/* <Header /> */}
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {!isLoggedIn() && renderWelcome()}
          {renderHouseGames()}
          {renderSlogGames()}
          {renderAboutDescription()}
          <AmbassadorBanner />
          <div className={styles.nftBannerWrapper}>
            <NftBanner />
          </div>
          {renderActivities()}
          {/* {renderAlpacaDopter()}
          {renderAlpacaVerse()} */}
          {/* {renderHowTokenWorks()} */}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
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
    startOnboardingFlow: () => {
      dispatch(OnboardingActions.start());
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(Home);
export default memo(Connected);
