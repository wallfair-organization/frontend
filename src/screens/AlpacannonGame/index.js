import React, { useCallback, useEffect, useState, useRef } from 'react';
import { getSpinsAlpacaWheel, GameApi } from 'api/casino-games';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBetCasino from 'components/PlaceBetCasino';
import BackLink from 'components/BackLink';
import Spins from 'components/Spins';
import GameAnimation from 'components/AlpacannonGameAnimation';
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
import CannonAlpaca from '../../data/images/alpacannon/cannon-alpaca.png';

import { UserActions } from 'store/actions/user';
import { selectUser } from 'store/selectors/authentication';
import Button from 'components/Button';
import classNames from "classnames";

const ALPACANNON_GAME_EVENT_ID = GAMES.cannon.id

const PlinkoGame = ({
  showPopup,
  connected,
  userId,
  token,
  refreshHighData,
  refreshLuckyData,
  updateUserBalance
}) => {
  const gameCfg = GAMES.cannon;
  const Api = new GameApi(gameCfg.url, token);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(null);
  const user = useSelector(selectUser);
  const [spins, setSpins] = useState([]);
  const [risk, setRisk] = useState(1);
  const [bet, setBet] = useState({ready: true, rollover: 50});
  const [amount, setAmount] = useState(50);
  const [activityTabIndex, setActivityTabIndex] = useState(0);

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
    if(user.isLoggedIn){
      getSpinsAlpacaWheel(ALPACANNON_GAME_EVENT_ID, userId)
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
  }, [user.isLoggedIn])

  useEffect(() => {
    dispatch(ChatActions.fetchByRoom({ roomId: ALPACANNON_GAME_EVENT_ID }));
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


  async function handleBet(payload) {
    audio.playBetSound();
    if (!payload) return;
    try {
      if(payload.demo) {
        setBet((bet) => { return {...bet, ...payload, profit: 50, ready: false, rollValue: Math.round(Math.random()*100)} })
        // trackAlpacaWheelPlaceBetGuest({ amount: payload.amount, multiplier: risk });
      } else {
        const { data } = await Api.createTradeCannon({rollover: bet.rollover, amount: payload.amount});
        setBet((bet) => { return {...bet, ...payload, profit: data.profit, rollValue: Math.round(data.rollValue), ready: false, gameHash: data.gameHash} })
        updateUserBalance(userId);
        // trackPlinkoPlaceBet({ amount: payload.amount, multiplier: risk });
        // trackPlinkoCashout({ amount: data.profit, multiplier: data.winMultiplier });
        // return data;
      }
    } catch (e) {
      dispatch(AlertActions.showError({
        message: 'Cannon: Place Bet failed',
      }));
    }
  }

  const renderActivities = () => (
    <Grid item xs={12} md={6}>
      <EventActivitiesTabs
          activitiesLimit={50}
          className={styles.activitiesTrackerGamesBlock}
          preselectedCategory={'game'}
          gameId={ALPACANNON_GAME_EVENT_ID}></EventActivitiesTabs>
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
          roomId={ALPACANNON_GAME_EVENT_ID}
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
            <BackLink to="/games" text="AlpaCannon" />
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
              <Spins text="My Games" spins={spins} game={gameCfg}/>
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.placeContainer}>
                <PlaceBetCasino
                  gameName={'cannon'}
                  connected={connected}
                  setAmount={setAmount}
                  amount={amount}
                  setRisk={setRisk}
                  risk={risk}
                  onBet={handleBet}
                  setBet={setBet}
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
        <h1 className={styles.title}>Cannon</h1>
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
              <img src={CannonAlpaca} alt='cannon-alpaca'/>
            </div>
            <div className={styles.secondWrapper}>
              <h2>HOW TO PLAY PUMP AND DUMP?</h2>
              <p>
                <b>Step 1:</b> Enter the bet amount you want to play with
              </p>
              <p>
                <b>Step 2:</b> Click "Place Bet"<br/>
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
