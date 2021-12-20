import React, { useCallback, useEffect, useState, memo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import lifecycle from 'page-lifecycle'
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBet from 'components/PlaceBet';
import BackLink from 'components/BackLink';
import LastCrashes from 'components/LastCrashes';
import GameAnimation from 'components/RosiGameAnimation';
import GameBets from 'components/GameBets';
import Chat from 'components/Chat';
import { RosiGameActions } from 'store/actions/rosi-game';
import useRosiData from 'hooks/useRosiData';
import styles from './styles.module.scss';
import { AlertActions } from '../../store/actions/alert';
import { UserActions } from '../../store/actions/user';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import { ChatActions } from 'store/actions/chat';
import Share from '../../components/Share';
import PopupTheme from 'components/Popup/PopupTheme';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import { PopupActions } from 'store/actions/popup';
import {
  trackElonCancelBet,
  trackElonCashout,
  trackElonPlaceBet,
  trackPumpDumpCancelBet,
  trackPumpDumpCashout,
  trackPumpDumpPlaceBet,
} from '../../config/gtm';
import { GameApi } from '../../api/crash-game';
import { GAMES } from '../../constants/Games';
import Routes from 'constants/Routes';
import PumpDumpAnimation from '../../components/PumpDumpAnimation';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import TabOptions from 'components/TabOptions';
import PumpDumpAlpaca from '../../data/images/pump-dump/content-pumpdump.png';
import ElonAlpaca from '../../data/images/elongame/content-elon.png';

import classNames from "classnames";


const RosiGame = ({
  showPopup,
  connected,
  userId,
  path,
  token,
  updateUserBalance
}) => {
  const dispatch = useDispatch();
  const {
    lastCrashes,
    inGameBets,
    cashedOut,
    hasStarted,
    isEndgame,
  } = useRosiData();
  const { slug } = useParams();
  const [audio, setAudio] = useState(null);
  const [flag, setFlag] = useState(false);
  const [visibility, setVisibility] = useState('visible');
  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{ name: 'CHAT', index: 0 }];
  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);
  const game = Object.values(GAMES).find(g => g.slug === slug);
  const GAME_TYPE_ID = game.id;
  const Api = new GameApi(game.url, token, game.id);
  function getCurrentGameState(){
    Api.getCurrentGameInfo()
      .then(response => {
        dispatch(
          RosiGameActions.initializeState({
            ...response.data,
            userId,
          })
        );
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
  }
  useEffect(() => {
    getCurrentGameState()
    dispatch(ChatActions.fetchByRoom({ roomId: GAME_TYPE_ID }));
  }, [dispatch, connected]);

  /*
  * When we switch from inactive tab to active
  * request game state
  * */

  useEffect(() => {
    const handler = (event) => {
      if(document.visibilityState === 'visible'){
        if((event.oldState === 'hidden' || event.oldState === 'frozen')
          && (event.newState === 'active' || event.newState === 'passive')){
          getCurrentGameState()
        }
        setVisibility(event.newState)
      }
    };
    lifecycle.addEventListener('statechange', handler);
    return () => {
      lifecycle.removeEventListener('statechange', handler);
    }
  }, [])

  //Bets state update interval
  useEffect(() => {
    const interval = setInterval(() => dispatch(RosiGameActions.tick()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (slug === GAMES['elonGame'].slug) {
        if (hasAcceptedTerms() && !isPopupDisplayed()) {
          showPopup(PopupTheme.explanation);
          localStorage.setItem('gameHowDoesItWorkTip', true);
        }
      }
    }, 1000);
    return () => clearTimeout(timerId);
  }, []);

  const hasAcceptedTerms = () => {
    return localStorage.getItem('acceptedTerms') || false;
  };

  const isPopupDisplayed = () => {
    return localStorage.getItem('gameHowDoesItWorkTip') || false;
  };

  const handleChatSwitchTab = option => {
    setChatTabIndex(option.index);
  };

  async function handleBet(payload, crashFactor) {
    if(flag) return
    setFlag(true)
    audio.playBetSound();
    if (!payload) return;
    try {
      const result = await Api.createTrade(payload);
      if (slug === GAMES['elonGame'].slug) {
        trackElonPlaceBet({ amount: payload.amount, multiplier: crashFactor, autobet: payload.autobet ? 1 : 0 });
      } else if (slug === GAMES['pumpDump'].slug) {
        trackPumpDumpPlaceBet({ amount: payload.amount, multiplier: crashFactor, autobet: payload.autobet ? 1 : 0 });
      }
      dispatch(RosiGameActions.setUserBet(payload));
      setFlag(false)
      updateUserBalance(userId);
      return result;
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: `${slug === GAMES['elonGame'].slug ? 'Elon Game' : 'Pump and Dump'}: Place Bet failed`,
        })
      );
    }
  }

  function handleBetCancel(userId, amount) {
    if(flag) return
    setFlag(true)
    Api.cancelBet()
      .then(() => {
        if (slug === GAMES['elonGame'].slug) {
          trackElonCancelBet({ amount });

        } else if (slug === GAMES['pumpDump'].slug) {
          trackPumpDumpCancelBet({ amount });
        }

        dispatch(RosiGameActions.cancelBet({ userId }));
        setFlag(false);
        updateUserBalance(userId);
        return true
      })
      .catch(() => {
        dispatch(
          AlertActions.showError({
            message: `${slug === GAMES['elonGame'].slug ? 'Elon Game' : 'Pump and Dump'}: Cancel Bet failed`,
          })
        );
        setFlag(false)
        return true
      });
  }

  async function handleCashout(isGuest, autobet) {
    audio.playWinSound();
    if (isGuest) return;
    try {
      const response = await Api.cashOut();
      const { crashFactor: crashFactorCashout, reward } = response.data;

      if (slug === GAMES['elonGame'].slug) {
        trackElonCashout({
          amount: reward,
          multiplier: parseFloat(crashFactorCashout),
          autobet: autobet != null ? 1 : 0,
          accumulated: autobet?.accumulated,
        });

      } else if (slug === GAMES['pumpDump'].slug) {
        trackPumpDumpCashout({
          amount: reward,
          multiplier: parseFloat(crashFactorCashout),
          autobet: autobet != null ? 1 : 0,
          accumulated: autobet?.accumulated,
        });
      }
      updateUserBalance(userId);
      AlertActions.showSuccess(JSON.stringify(response));
      return response;
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: `${slug === GAMES['elonGame'].slug ? 'Elon Game' : 'Pump and Dump'}: Cashout failed`,
        })
      );
    }
  }

  const renderActivities = () => (
    <Grid item xs={12} md={6}>
      <EventActivitiesTabs
              activitiesLimit={50}
              className={styles.activitiesTrackerGamesBlock}
              preselectedCategory={'game'}
              gameId={GAME_TYPE_ID}></EventActivitiesTabs>
    </Grid>
  );

  const renderChat = () => (
    <Grid item xs={12} md={6}>
      <div className={styles.chatWrapper}>
        <TabOptions options={chatTabOptions} className={styles.tabLayout}>
          {option => (
            <div
              className={
                option.index === chatTabIndex
                  ? styles.tabItemSelected
                  : styles.tabItem
              }
              onClick={() => handleChatSwitchTab(option)}
            >
              {option.name}
            </div>
          )}
        </TabOptions>
        <Chat
          roomId={GAME_TYPE_ID}
          className={styles.chatContainer}
          chatMessageType={ChatMessageType.game}
        />
      </div>
    </Grid>
  );

  const renderBets = () => (
    <GameBets
      label="Cashed Out"
      bets={[
        ...inGameBets.map(b => ({
          ...b,
          cashedOut: false,
        })),
        ...cashedOut.map(b => ({
          ...b,
          cashedOut: true,
        })),
      ]}
      gameRunning={hasStarted}
      endGame={isEndgame}
    />
  );

  const renderAnimation = () => {
    if (slug === GAMES['elonGame'].slug && visibility !== 'frozen') {
      return (
        <GameAnimation
          inGameBets={inGameBets}
          onInit={audio => setAudio(audio)}
        />
      );
    }
    if (slug === GAMES['pumpDump'].slug) {
      return (
        <PumpDumpAnimation
          inGameBets={inGameBets}
          onInit={audio => setAudio(audio)}
        />
      );
    }
  };

  const showHowDoesItWork = () => {
    if (slug === GAMES['elonGame'].slug) {
      return (
        <span
          onClick={handleHelpClick}
          className={styles.howtoLink}
          data-tracking-id="elongame-how-does-it-work"
        >
          How does it work?
        </span>
      )
    }
    if (slug === GAMES['pumpDump'].slug) {
      return (
        <span></span>
      );
    }
  }

  const renderWallpaperBanner = () => {
    return (
      <Link data-tracking-id="elon-wallpaper" to={Routes.elonWallpaper}>
        <div className={styles.banner}></div>
      </Link>
    );
  };

  const renderGameContent = () => {
    return (
      <div className={styles.gameContent}>
        <h1 className={styles.title}>Elon Game</h1>
        <div className={styles.content}>
          <div className={styles.topContainer}>
            <p>
              <b>Elon had enough: Covid, inflation, corrupt politicians and that bastard Bezos and the other virgin. If that wasn’t enough, SEC got pissed again about some hilarious tweets he wrote. He was tired so decided to relax. As his Ambien stash was empty, there was the only thing he could do. Inhale…Exhale… After a while, he knew what he had to do. There was only one place where he would finally be happy, the space.</b>
            </p>
            <p>
              Rules are simple: you bet on Elon going to Mars by putting your WFAIR in the fuel tank of his alpaca rocket. The closer Elon gets to Mars, the more valuable your tokens will get. But the space paca rockets also aren’t very reliable and crash at some point. So get your money out before it’s lost in space and before SEC start laughing.
            </p>
            <p>
              Now it’s your turn to become a part of the mission. Help Elon to get to the Mars and he will immediately reward you! But if you fail, SEC and all the other haters will laugh.
            </p>
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.firstWrapper}>
              <img src={ElonAlpaca} alt='elon-alpaca'/>
            </div>
            <div className={styles.secondWrapper}>
              <h2>HOW TO PLAY ELON GAME?</h2>
              <p>
                <b>Step 1:</b> Enter the bet amount you want to play with
              </p>
              <p>
                <b>Step 2:</b> Click "Place Bet" <br/>
              </p>
              <p>
                <b>Step 3:</b> Cash out before the Elons rocket exploded <br/>
              </p>
              <p>
                <b>Step 4:</b> Not ready jet? u can cancel the Bet <br/>              
              </p>
              <p className={styles.importantTip}>
                <b>IMPORTANT!</b> You can only place a bet for rounds that haven’t started yet.
              </p>
              <p className={styles.importantTip}>
                You can see the history of your winnings and losses in the game bar.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.wrapperCards}>{renderWallpaperBanner()}</div>
      </div>
    );
  }

  const renderPumpDumpContent = () => {
    return (
      <>
        <div className={styles.gameContent}>
          <h1 className={styles.title}>Pump and Dump</h1>
          <div className={styles.content}>
            <div className={styles.topContainer}>
              <p>
                <b>Everyone talks about the Wolves of Wallstreet. Everyone thinks those aggressive and ruthless creatures are the soil of the investment market, the gurus of investing. But all those stories are smokes and mirrors to protect the real money makers - the Order of the Happy Alpacas. Established back in the days by the genius Warren who discovered that Alpacas developed an astonishing ability to predict market movements way better and more precise than anyone else. </b>
              </p>
              <p>
                He also knew that the moment the truth was out there, people would try to take advantage of Alpacas, so he had to protect them.He decided to place a decoy on the market back in the 80s, one Jordan Belfort and redirect all the attention to a narcissistic penny maker. It worked back then, but then Elon started this crazy Reddit investigation that got bigger attention than the pizzagate. People started sniffing. 
              </p>
              <p>
                Warren had no choice but to pull off the same stunt again, but this time on a broader scale. He talked to his friend Martin, and they decided to remind people about the Jordan and Wolves of Wallstreet and make them the centre of the attention, the icon. It wasn't that expensive, just 5 Oscars, and it worked like a charm. Now it's your turn to see if your prediction skills are on par with Alpacas'. Make Warren proud!
              </p>
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.firstWrapper}>
                <img src={PumpDumpAlpaca} alt='pumpdump-alpaca'/>
              </div>
              <div className={styles.secondWrapper}>
                <h2>HOW TO PLAY PUMP AND DUMP?</h2>
                <p>
                  <b>Step 1:</b> Enter the bet amount you want to play with
                </p>
                <p>
                  <b>Step 2:</b> Click "Place Bet" <br/>
                </p>
                <p>
                  <b>Step 3:</b> Cash out before the Shitcoin hits the dump <br/>
                </p>
                <p>
                  <b>Step 4:</b> If your sound is muted, turn it on! <br/>              
                </p>
                <p>
                  <b>Step 5:</b> Not ready jet? u can cancel the Bet <br/>              
                </p>
                <p className={styles.importantTip}>
                  <b>IMPORTANT!</b> You can only place a bet for rounds that haven’t started yet.
                </p>
                <p className={styles.importantTip}>
                  You can see the history of your winnings and losses in the game bar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleFairnessPopup = useCallback(event => {
    const target = document.querySelector('#lastCrashes [data-crash-index="1"]');

    //click second last crash factor, starting from the latest one
    if(target) {
      target.click();
    }
  }, []);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div
            className={`${styles.headlineWrapper} ${
              slug === GAMES['pumpDump'].slug && styles.hideElon
            }`}
          >
            <BackLink
              to="/games"
              text={
                slug === GAMES['elonGame'].slug ? 'Elon Game' : 'Pump & Dump'
              }
              showArrow={slug !== GAMES['elonGame'].slug}
            />
            <Share popupPosition="right" className={styles.shareButton} />
            {slug === GAMES['elonGame'].slug && (
              <Icon
                className={styles.questionIcon}
                iconType={IconType.question}
                iconTheme={IconTheme.white}
                height={25}
                width={25}
                onClick={handleHelpClick}
              />
            )}
            {/*{showHowDoesItWork()}*/}
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.leftContainer}>
              <LastCrashes lastCrashes={lastCrashes} game={game} />
              {renderAnimation()}
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.placeContainer}>
                <PlaceBet
                  connected={connected}
                  onBet={handleBet}
                  onCashout={handleCashout}
                  onCancel={handleBetCancel}
                  gameId={path}
                />
                <div className={styles.fairnessContainer}>
                  <Icon
                    className={styles.balanceIcon}
                    iconType={IconType.balanceScaleSolid}
                    iconTheme={IconTheme.black}
                    height={18}
                    width={18}
                  />{' '}
                  <span
                    className={classNames(
                      'global-link-style',
                      styles.fairnessOpenPopup
                    )}
                    onClick={handleFairnessPopup}
                  >
                  Fairness
                </span>
                </div>

                {isMiddleOrLargeDevice ? renderBets() : null}
              </div>
            </div>
          </div>
          {isMiddleOrLargeDevice ? null : renderBets()}
          {isMiddleOrLargeDevice ? (
            <div className={styles.bottomWrapper}>
              {renderChat()}
              {renderActivities()}
            </div>
          ) : null}
        </div>
      </div>

      {slug === GAMES['elonGame'].slug
        ? renderGameContent()
        : renderPumpDumpContent()}
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
    userId: state.authentication.userId,
    path: state.router.location.pathname,
    token: state.authentication.token,
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
    updateUserBalance: (userId) => {
      dispatch(UserActions.fetch({ userId, forceFetch: true }));
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(RosiGame);
export default memo(Connected);
