import React, { useCallback, useEffect, useState } from 'react';
import { getSpinsAlpacaWheel, GameApi } from 'api/casino-games';
import { connect, useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBetCasino from 'components/PlaceBetCasino';
import BackLink from 'components/BackLink';
import Spins from 'components/Spins';
import GameAnimation from 'components/PlinkoGameAnimation';
import Chat from 'components/Chat';
import styles from './styles.module.scss';
import { AlertActions } from '../../store/actions/alert';
import { RosiGameActions } from '../../store/actions/rosi-game';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import { ChatActions } from 'store/actions/chat';
import Share from '../../components/Share';
import PopupTheme from 'components/Popup/PopupTheme';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import { PopupActions } from 'store/actions/popup';
import TabOptions from '../../components/TabOptions';
import { GAMES } from '../../constants/Games';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import {
  trackPlinkoCashout,
  trackPlinkoPlaceBet
} from '../../config/gtm';
import { UserActions } from 'store/actions/user';
import classNames from "classnames";
import { selectUser } from 'store/selectors/authentication';

import PlinkoAlpaca from '../../data/images/plinko-game/alpaca.png';

const PLINKO_GAME_EVENT_ID = GAMES.plinko.id

const PlinkoGame = ({
  showPopup,
  connected,
  userId,
  token,
  refreshHighData,
  refreshLuckyData,
  updateUserBalance
}) => {
  const gameCfg = GAMES.plinko;
  const Api = new GameApi(gameCfg.url, token);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(null);
  const [spins, setSpins] = useState([]);
  const [risk, setRisk] = useState(1);
  const [bet, setBet] = useState({ready: true, ball: 0});
  const [amount, setAmount] = useState(50);
  const [activityTabIndex, setActivityTabIndex] = useState(0);

  const user = useSelector(selectUser);

  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{ name: 'CHAT', index: 0 }];

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);

  const handleFairnessPopup = useCallback(event => {
    showPopup(PopupTheme.fairnessPopup, {
      maxWidth: true, data: {
        game: gameCfg,
        token
      }
    });
  }, []);

  useEffect(() => {
    if(userId) {
      getSpinsAlpacaWheel(gameCfg.id, userId)
        .then(response => {
          const lastSpins = response?.data.lastCrashes;

          setSpins(lastSpins.map((spin) => {
            const output = {};
            if (spin.profit > 0) {
              output.type = 'win';
              output.value = '+' + spin.profit;
            } else if (spin.profit === 0) {
              output.type = 'even';
              output.value = spin.profit;
            } else {
              output.type = 'loss';
              output.value = spin.profit;
            }

            output.gameHash = spin.gameHash;

            return output;
          }))

        })
        .catch(error => {
          dispatch(AlertActions.showError(error.message));
        });
    }
  }, [userId])

  useEffect(() => {
    dispatch(ChatActions.fetchByRoom({ roomId: PLINKO_GAME_EVENT_ID }));
    refreshHighData();
    refreshLuckyData();
  }, [dispatch, connected]);

  useEffect(() => {
    (async () => {
      //this get route is for retrieving client / server seeds for the game, if its very first time,
      //casino_fairness record will be created automatically
      if(userId) {
        await Api.getCurrentFairnessByGame(gameCfg.id);
      }
    })().catch(error => {
      dispatch(AlertActions.showError({
        message: `${gameCfg.name}: ${error.response?.data || error.message}`
      }));

      setBet({
        ...bet,
        ready: false
      })
    });
  }, [])

  const handleChatSwitchTab = option => {
    setChatTabIndex(option.index);
  };

  const hasAcceptedTerms = () => {
    return localStorage.getItem('acceptedTerms') || false;
  };

  const isPopupDisplayed = () => {
    return localStorage.getItem('gameHowDoesItWorkTip') || false;
  };

  useEffect(() => {
    if(userId && bet?.ready && bet.ball===0) {
       updateUserBalance(userId);
    }
  }, [bet])

  async function handleBet(payload) {
    audio.playBetSound();
    if (!payload) return;
    try {
      if(payload.demo) {
        const array = Array.from({length: 12}, ()=> Math.round(Math.random()))
        setBet((bet)=>{return{...payload, ball: bet.ball+1, path: array, ready: false }})
        //trackAlpacaWheelPlaceBetGuest({ amount: payload.amount, multiplier: risk });
      } else {
        const { data } = await Api.createTradePlinko(payload);
        setBet((bet)=>{return{...payload, ball: bet.ball+1, path: data.path, profit: data.profit, winMultiplier: data.winMultiplier, gameHash: data.gameHash, ready: false}});
        //updateUserBalance(userId);
        trackPlinkoPlaceBet({ amount: payload.amount, multiplier: risk });
        trackPlinkoCashout({ amount: data.profit, multiplier: data.winMultiplier });
        return data;
      }
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: 'Plinko: Place Bet failed',
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
          gameId={PLINKO_GAME_EVENT_ID}></EventActivitiesTabs>
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
          roomId={PLINKO_GAME_EVENT_ID}
          className={styles.chatContainer}
          chatMessageType={ChatMessageType.game}
        />
      </div>
    </Grid>
  );

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headlineWrapper}>
            <BackLink to="/games" text="Plinko" />
            <Share popupPosition="right" className={styles.shareButton} />
            <Icon
              className={styles.questionIcon}
              iconType={IconType.question}
              iconTheme={IconTheme.white}
              height={25}
              width={25}
              onClick={handleHelpClick}
            />
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.leftContainer}>
              <GameAnimation
                risk={risk}
                amount={amount}
                bet={bet}
                setSpins={setSpins}
                setBet={setBet}
                onInit={audio => setAudio(audio)}
              />
              <Spins text="My Games" spins={spins} game={gameCfg} />
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.placeContainer}>
                <PlaceBetCasino
                  gameName={'plinko'}
                  connected={connected}
                  setAmount={setAmount}
                  setBet={setBet}
                  amount={amount}
                  setRisk={setRisk}
                  risk={risk}
                  onBet={handleBet}
                  bet={bet}
                />
              </div>

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
            </div>
          </div>
          {isMiddleOrLargeDevice ? (
            <div className={styles.bottomWrapper}>
              {renderChat()}
              {renderActivities()}
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.gameContent}>
        <h1 className={styles.title}>Plinko</h1>

        <div className={styles.content}>
          <div className={styles.topContainer}>
            <p>
              <b>Most people think that Alpaca’s life is not complicated. Hey, many of them would say that Alpaca is the most relaxed animal in the whole universe (after unicorns, obviously…). But this is just an impression of people who simply do not understand how stressful it is to be an Alpaca.</b>
            </p>
            <p>
              First of all, you have to be cute all the time. Then you have that whole candy land around you have to take care of. Finally, and most importantly, while you are taking care of those sweets laying around, you have to look still cute! No wonder that most of Alpacase are burned out at the end of the day, and the only thing that relaxes them is the sound of a coin dropping from top to bottom. Tick, tack, tick – that soothing song of the coin hitting obstacles on the way. Tick, tack, tick – the calming thought of how beautiful and simple the life of the coin is. Tick, tack, tick – over and over again.
            </p>
            <p>
              It’s time for you to join our burned-out Alpacas and enjoy Plinko, the game calming and exciting at the same time. So drop the coins and carry on until your WFAIR chest is full!
            </p>
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.firstWrapper}>
              <img src={PlinkoAlpaca} alt='plinko-alpaca'/>
            </div>
            <div className={styles.secondWrapper}>
              <h2>HOW TO PLAY PLINKO?</h2>
              <p>
                <b>Step 1:</b> Enter the Bet amount into the field
              </p>
              <p>
                <b>Step 2:</b> Select the risk level <br/>
                The higher the risk level, the higher reward you might win. Watch the values of the prize in the bottom containers as you change the risk level
              </p>
              <p>
                <b>Step 3:</b> Click Place Bet <br/>
                Once you click the button, the coin is dropped from the top. Watch as the coin goes down and enjoy your prize!
              </p>
              <p>
                <b>Step 4:</b> Repeat <br/>
                You can see the hsitory of your bets in My Games bar. Your wins are marked green and losses red.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
    userId: state.authentication.userId,
    token: state.authentication.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshHighData: () => dispatch(RosiGameActions.fetchHighData()),
    refreshLuckyData: () => dispatch(RosiGameActions.fetchLuckyData()),
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

export default connect(mapStateToProps, mapDispatchToProps)(PlinkoGame);
