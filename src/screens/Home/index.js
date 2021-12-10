import { useEffect, useState, memo } from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { LOGGED_IN } from 'constants/AuthState';
import {
  EXTERNAL_GAMES
} from '../../constants/Games';
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
import gameCardMines from '../../data/images/house-games/card-mines.png';
import IceCreamImg from '../../data/images/alpaca-verse/ice-cream.png';
import SocialImg from '../../data/images/alpaca-verse/social-img.png';
import GemsImg from '../../data/images/alpaca-verse/gems.png';
import FairImg from '../../data/images/alpaca-verse/fair-img.png';
import StarImg from '../../data/images/alpaca-verse/star.png';
import DecentralImg from '../../data/images/alpaca-verse/decentral-img.png';
import MagentaAlpaca from '../../data/images/alpaca-dopter/magenta-alpaca.png';
import MagentaChip from '../../data/images/alpaca-dopter/magenta-chip.png';
import MagentaThumbnail from '../../data/images/alpaca-dopter/magenta-thumbnail.png';
import BlueAlpaca from '../../data/images/alpaca-dopter/blue-alpaca.png';
import BlueChip from '../../data/images/alpaca-dopter/blue-chip.png';
import BlueThumbnail from '../../data/images/alpaca-dopter/blue-thumbnail.png';
import YellowAlpaca from '../../data/images/alpaca-dopter/yellow-alpaca.png';
import YellowChip from '../../data/images/alpaca-dopter/yellow-chip.png';
import YellowThumbnail from '../../data/images/alpaca-dopter/yellow-thumbnail.png';
import AlphaLogo from '../../data/images/alpaca-dopter/alpha.png';

import EventActivitiesTab from 'components/EventActivitiesTabs';
import classNames from 'classnames';
import useOAuthCallback from 'hooks/useOAuthCallback';
import { OnboardingActions } from 'store/actions/onboarding';

const Home = ({
  authState,
  tags,
  setOpenDrawer,
  fetchTags,
  showPopup,
  events,
  startOnboardingFlow
}) => {
  const isMount = useIsMount();
  const { eventId, betId, tradeId } = useParams();
  const location = useLocation();
  const [expandSocial, setExpandSocial] = useState(false);
  const [expandFair, setExpandFair] = useState(false);
  const [expandDecentral, setExpandDecentral] = useState(false);
  let urlParams = new URLSearchParams(location.search);

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
          <h2>House Games</h2>
        </div>
        <div className={styles.cardBox}>
          <Grid container spacing={1}>
            <Grid item lg={3} md={6} xs={12}>
              <Link to={'/games/mines'}>
                <img src={gameCardMines} alt="" />
              </Link>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <Link to={'/games/plinko'}>
                <img src={gameCardPlinko} alt="" />
              </Link>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <Link to={'/games/elon-game'}>
                <img src={gameCardElon} alt="" />
              </Link>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
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
        <GameSmartsoft
          games={EXTERNAL_GAMES}
          category="Slot Games"
        />
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
        <div className={styles.cardBox}>
          <h3>
            GET YOUR BONUS<br/>
            AND CREATE YOUR<br/> 
            OWN ALPACA
          </h3>
        </div>
        <Button
          className={styles.startButton}
          onClick={showPopupForUnauthenticated}>
          <span className={styles.buttonText}>START</span>
        </Button>
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
                    <img src={MagentaThumbnail} alt="" />
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
                      You can earn PFAIR tokens in multiple ways: You can play
                      our house games (we are going to launch new games weekly),
                      invite other alpacas, provide feedback and (soon) battle
                      other alpacas(or bet on other alpaca fights) and send
                      tokens among each other.
                    </p>
                  </div>
                  <div className={styles.thumbnail}>
                    <img src={BlueThumbnail} alt="" />
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
                      <h3>What Is</h3>
                      <img src={AlphaLogo} alt="" />
                    </div>
                    <p>
                      Alpacasino is a play-money testing platform for the
                      developers behind Wallfair. We’re using play-money
                      (“PFAIR”) which is completely virtual and you do not need
                      to invest, risk or even lose any real money or
                      cryptocurrencies.
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
    const handleExpandSocial = () => {
      setExpandSocial(!expandSocial);
    };
    const handleExpandFair = () => {
      setExpandFair(!expandFair);
    };
    const handleExpandDecentral = () => {
      setExpandDecentral(!expandDecentral);
    };
    return (
      <div className={styles.alpacaverse}>
        <div className={styles.title}>
          <h2>
            Welcome to the <span className={styles.pink}>ALPACA</span>VERSE
          </h2>
        </div>
        <div className={styles.cardBox}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnail}>
                  <img src={IceCreamImg} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>SOCIAL</h3>
                  {!expandSocial ? (
                    <p>
                      It’s simple: Alpacas are social animals = Alpacasino is a
                      social Betwork. Alpacas from all over the world meet to
                      chat ...
                    </p>
                  ) : (
                    <p>
                      It’s simple: Alpacas are social animals = Alpacasino is a
                      social Betwork. Alpacas from all over the world meet to
                      chat, follow, interact and game together. You can
                      customize and upgrade your Alpaca or check out any Alpacas
                      activity history and copy bets, see other Alpacas activity
                      in real time and chat / follow. Your alpaca grows with
                      tokens owned and you will be able to battle or gang up
                      with other alpacas in the future. Some cool NFT
                      applications and skins might be on their way too ;)
                    </p>
                  )}
                  <button onClick={handleExpandSocial}>
                    {!expandSocial ? 'READ MORE' : 'LESS'}
                  </button>
                </div>
                <div className={styles.thumbnailLast}>
                  <img src={SocialImg} alt="" />
                </div>
              </div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnail}>
                  <img src={GemsImg} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>FAIR</h3>
                  {!expandFair ? (
                    <p>
                      Alpacas are sometimes funny and misbehaving but always
                      fair. We believe in a maximum of transparency ...
                    </p>
                  ) : (
                    <p>
                      Alpacas are sometimes funny and misbehaving but always
                      fair. We believe in a maximum of transparency and
                      blockchain allows for a technical implementation. This way
                      every algorithm and maths behind the games and market
                      makers are transparent from s ource code to unlimited
                      history of outcomes. Every activity of every user and game
                      is transparent. This is a much better approach than
                      unknown and secret algorithms or “random” picks in
                      traditional worlds.
                    </p>
                  )}
                  <button onClick={handleExpandFair}>
                    {!expandFair ? 'READ MORE' : 'LESS'}
                  </button>
                </div>
                <div className={styles.thumbnailLast}>
                  <img src={FairImg} alt="" />
                </div>
              </div>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <div className={styles.card}>
                <div className={styles.thumbnail}>
                  <img src={StarImg} alt="" />
                </div>
                <div className={styles.detail}>
                  <h3>DECENTRAL</h3>
                  {!expandDecentral ? (
                    <p>
                      Alpacas are self governing animals. Wallfair is a
                      combination of smart contracts running on decentralized
                      Polygon blockchain ...
                    </p>
                  ) : (
                    <p>
                      Alpacas are self governing animals. Wallfair is a
                      combination of smart contracts running on decentralized
                      Polygon blockchain as well an ERC 20 utility token. It’s a
                      decentralized technology that allows any game provider to
                      upload games, any user to create new games, events or
                      battles and licensed casino operators to use this
                      open-source, non profit technology. Wallfair is striving
                      to become a fully decentralized autonomous organation
                      (DAO) that is fully governed by the voting of every WFAIR
                      token holder.
                      <br />
                      <br />
                      Every WFAIR holder participates in the growth of the
                      network as WFAIR is the currency used for any interaction,
                      e.g. users signin up / depositing / betting in external
                      applications.
                    </p>
                  )}
                  <button onClick={handleExpandDecentral}>
                    {!expandDecentral ? 'READ MORE' : 'LESS'}
                  </button>
                </div>
                <div className={styles.thumbnailLast}>
                  <img src={DecentralImg} alt="" />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  return (
    <BaseContainerWithNavbar
      home
      loggedIn={isLoggedIn()}
      >
      {/* {renderHeadline()} */}
      {/* <Header /> */}
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {!isLoggedIn() && renderWelcome()}
          {isLoggedIn() && renderHouseGames()}
          {isLoggedIn() && renderSlogGames()}
          {isLoggedIn() && renderActivities()}
          {renderAlpacaDopter()}
          {renderAlpacaVerse()}
          {renderHowTokenWorks()}
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
    startOnboardingFlow: () =>{
      dispatch(OnboardingActions.start());
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(Home);
export default memo(Connected);
