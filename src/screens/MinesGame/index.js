import * as PIXI from 'pixi.js-legacy';
import React, { useCallback, useEffect, useState } from 'react';
import { getSpinsAlpacaWheel, GameApi } from 'api/casino-games';
//import * as ApiUser from 'api/crash-game';
import {connect, useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBetMines from 'components/PlaceBetMines';
import { selectUser } from 'store/selectors/authentication';
import BackLink from 'components/BackLink';
import LastCashouts from 'components/LastCashouts';
import GameAnimation from 'components/MinesGameAnimation';
import Chat from 'components/Chat';
import useRosiData from 'hooks/useRosiData';
import styles from './styles.module.scss';
import { AlertActions } from '../../store/actions/alert';
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
import { UserActions } from 'store/actions/user';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import {getLastCashoutsMines} from "../../api/casino-games";
import MinesAlpaca from '../../data/images/mines/mines-alpaca.png';

import {GAMES_CURRENCY_DEFAULT_BET} from '../../constants/Currency';

import {trackMinesCashout} from "../../config/gtm";
import classNames from "classnames";
const outcomeMultipliers = [
  [1.03, 1.09, 1.15, 1.21, 1.28, 1.35, 1.42, 1.5, 1.58, 1.67, 1.76, 1.86, 1.96, 2.07, 2.18, 2.3, 2.43, 2.56, 2.7, 2.85, 3.01, 3.18, 3.35, 3.53],
  [1.08, 1.14, 1.2, 1.27, 1.34, 1.41, 1.49, 1.57, 1.66, 1.75, 1.85, 1.95, 2.06, 2.17, 2.29, 2.42, 2.55, 2.69, 2.84, 3, 3.17, 3.34, 3.52],
  [1.14, 1.2, 1.27, 1.34, 1.41, 1.49, 1.57, 1.66, 1.75, 1.85, 1.95, 2.06, 2.17, 2.29, 2.42, 2.55, 2.69, 2.84, 3, 3.17, 3.34, 3.52],
  [1.18, 1.24, 1.31, 1.38, 1.46, 1.54, 1.62, 1.71, 1.8, 1.9, 2, 2.11, 2.23, 2.35, 2.48, 2.62, 2.76, 2.91, 3.07, 3.24, 3.42],
  [1.24, 1.31, 1.38, 1.46, 1.54, 1.62, 1.71, 1.8, 1.9, 2, 2.11, 2.23, 2.35, 2.48, 2.62, 2.76, 2.91, 3.07, 3.24, 3.42],
  [1.3, 1.37, 1.45, 1.53, 1.61, 1.7, 1.79, 1.89, 1.99, 2.1, 2.22, 2.34, 2.47, 2.61, 2.75, 2.9, 3.06, 3.23, 3.41],
  [1.37, 1.45, 1.53, 1.61, 1.7, 1.79, 1.89, 1.99, 2.1, 2.22, 2.34, 2.47, 2.61, 2.75, 2.9, 3.06, 3.23, 3.41],
  [1.46, 1.54, 1.62, 1.71, 1.8, 1.9, 2, 2.11, 2.23, 2.35, 2.48, 2.62, 2.76, 2.91, 3.07, 3.24, 3.42],
  [1.55, 1.64, 1.73, 1.83, 1.93, 2.04, 2.15, 2.27, 2.39, 2.52, 2.66, 2.81, 2.96, 3.12, 3.29, 3.47],
  [1.65, 1.74, 1.84, 1.94, 2.05, 2.16, 2.28, 2.41, 2.54, 2.68, 2.83, 2.99, 3.15, 3.32, 3.5],
  [1.77, 1.87, 1.97, 2.08, 2.19, 2.31, 2.44, 2.57, 2.71, 2.86, 3.02, 3.19, 3.37, 3.56],
  [1.9, 2, 2.11, 2.23, 2.35, 2.48, 2.62, 2.76, 2.91, 3.07, 3.24, 3.42, 3.61],
  [2.06, 2.17, 2.29, 2.42, 2.55, 2.69, 2.84, 3, 3.17, 3.34, 3.52, 3.71],
  [2.25, 2.44, 2.65, 2.88, 3.12, 3.39, 3.68, 3.99, 4.33, 4.7, 5.1],
  [2.47, 2.68, 2.91, 3.16, 3.43, 3.72, 4.04, 4.38, 4.75, 5.15],
  [2.75, 2.98, 3.23, 3.5, 3.8, 4.12, 4.47, 4.85, 5.26],
  [3, 3.26, 3.54, 3.84, 4.17, 4.52, 4.9, 5.32],
  [3.54, 3.98, 4.48, 5.04, 5.67, 6.38, 7.18],
  [4.13, 4.73, 5.42, 6.21, 7.11, 8.14],
  [4.95, 5.77, 6.72, 7.83, 9.12],
  [6.19, 7.43, 8.92, 10.7],
  [8.25, 10.31, 12.89],
  [12.38, 16.47],
  [24.75]
];
window.PIXI = PIXI;

const Game = ({
  showPopup,
  connected,
  userId,
  token,
  updateUserBalance
}) => {
  const gameCfg = GAMES.mines;
  const GAME_TYPE_ID = gameCfg.id;
  const GAME_NAME = gameCfg.name;
  const gameApi = new GameApi(gameCfg.url, token);
  const dispatch = useDispatch();
  const {
    lastCrashes,
    inGameBets,
    cashedOut,
    hasStarted,
    isEndgame,
  } = useRosiData();
  const user = useSelector(selectUser);
  const [audio, setAudio] = useState(null);
  const [cashouts, setCashouts] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [mines, setMines] = useState(5);
  const [currentStep, setCurrentStep] = useState(0);
  const [bet, setBet] = useState({
    autobet: false,
    pending: false,
    done: false
  });
  const [outcomes, setOutcomes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [amount, setAmount] = useState(GAMES_CURRENCY_DEFAULT_BET);
  const [multiplier, setMultiplier] = useState('0.00');
  const [profit, setProfit] = useState();
  const [gameInstance, setGameInstance] = useState();
  const [confetti, setConfetti] = useState();

  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{ name: 'CHAT', index: 0 }];
  const [demoCount, setDemoCount] = useState(0);

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

  const getLastCashout = (data) => {
    const {profit, gameHash} = data;
    let prepareObj = {};
    if(profit > 0) {
      prepareObj.type = 'win';
      prepareObj.value = '+' + profit;
    } else {
      prepareObj.type = 'loss';
      prepareObj.value = profit;
    }
    prepareObj.gameHash = gameHash;

    setCashouts([prepareObj, ...cashouts])
  }

  useEffect(() => {
    if(userId) {
      getLastCashoutsMines(GAME_TYPE_ID, userId)
        .then(response => {
          const lastCashouts = response?.data.lastCrashes;
          setCashouts(lastCashouts.map((entry) => {
            const output = {};
            if (entry.profit > 0) {
              output.type = 'win';
              output.value = '+' + entry.profit;
            } else {
              output.type = 'loss';
              output.value = entry.profit;
            }

            output.gameHash = entry.gameHash;

            return output;
          }))

        })
        .catch(error => {
          dispatch(AlertActions.showError(error.message));
        });
    }
  }, [user.isLoggedIn])

  useEffect(() => {
    (async () => {
      //this get route is for retrieving client / server seeds for the game, if its very first time,
      //casino_fairness record will be created automatically
      if(userId) {
        await gameApi.getCurrentFairnessByGame(gameCfg.id);
      }
    })().catch(error => {
      dispatch(AlertActions.showError({
        message: `${GAME_NAME}: ${error.response?.data || error.message}`
      }));

      setBet({
        ...bet,
        pending: true
      })
    });
  }, [])

  useEffect(() => {
    dispatch(ChatActions.fetchByRoom({ roomId: GAME_TYPE_ID }));
  }, [dispatch, connected]);


  useEffect(() => {
    if(currentStep === 0) {
      setMultiplier();
      setProfit();
    } else {
      setMultiplier((multi) => {
        const currentMulti = outcomes[currentStep-1];
        const calculateProfit = (amount * currentMulti) - amount;
        setProfit(calculateProfit);
        return currentMulti;
      });
    }
  }, [currentStep]);

  const handleChatSwitchTab = option => {
    setChatTabIndex(option.index);
  }

  async function handleBet(payload) {
    audio.playBetSound();
    setConfetti(false)
    if (!payload) return;
    try {
      if(payload.demo) {
        setDemoCount((count) => {
          return count+1;
        })
        setGameInProgress(true);
        setCurrentStep(0);
        setOutcomes(outcomeMultipliers[payload.minesCount-1])
      } else {
        setBet((bet) => {
          return {
            ...bet,
            pending: true
          }});
        const { data } = await gameApi.createTradeMines(payload);
        setOutcomes(data?.outcomes)
        updateUserBalance(userId);
        gameInstance.game.controller.view.gameOver("lose");
        setGameInProgress(true);
        setCurrentStep(0);
        setBet((bet) => {return{
          ...bet,
          pending: false,
          done: true
        }})

        return data;
      }
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: `${GAME_NAME}: ${e.response.data || 'Place Bet failed'}`
        })
      );
    }
  }

  async function handleCashout() {
    setGameInProgress(false);
    setCurrentStep(0);

    try {
      if(user.isLoggedIn){
        const { data } = await gameApi.cashoutMines();
        getLastCashout(data);
        setGameOver(true);
        updateUserBalance(userId);
        setConfetti(true);
        if(!bet.autobet){
          setBet((bet)=> {return{
            ...bet,
            profit: data.profit,
            pending: false,
            done: false
          }});
        }

        setProfit(data.profit);

        trackMinesCashout({
          amount: data.reward,
          multiplier: data.crashFactor,
          profit: data.profit,
        });
      }else{
        getLastCashout({profit: profit});
        setGameOver(true);
        setConfetti(true);
        setBet({autobet: false, pending: false, done: false})
      }
      audio.playWinSound();
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: `${GAME_NAME}: Cashout failed`,
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
        gameId={GAME_TYPE_ID}
        gameScreen={true}
      />
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

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headlineWrapper}>
            <BackLink to="/" text={GAME_NAME} />
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
                cashouts={cashouts}
                setCashouts={setCashouts}
                inGameBets={inGameBets}
                bet={bet}
                amount={amount}
                setBet={setBet}
                mines={mines}
                setMines={setMines}
                getLastCashout={getLastCashout}
                onInit={audio => setAudio(audio)}
                gameInProgress={gameInProgress}
                setGameInProgress={setGameInProgress}
                gameApi={gameApi}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                gameOver={gameOver}
                setGameOver={setGameOver}
                setOutcomes={setOutcomes}
                setDemoCount={setDemoCount}
                demoCount={demoCount}
                gameInstance={gameInstance}
                setGameInstance={setGameInstance}
                onCashout={handleCashout}
              />
              <LastCashouts text="My Cashouts" spins={cashouts} game={gameCfg}/>
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.placeContainer}>
                <PlaceBetMines
                  connected={connected}
                  setAmount={setAmount}
                  amount={amount}
                  onBet={handleBet}
                  onCashout={handleCashout}
                  bet={bet}
                  setBet={setBet}
                  setMines={setMines}
                  mines={mines}
                  gameInProgress={gameInProgress}
                  setGameInProgress={setGameInProgress}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  multiplier={multiplier}
                  profit={profit}
                  outcomes={outcomes}
                  demoCount={demoCount}
                  setDemoCount={setDemoCount}
                  confetti={confetti}
                  setConfetti={setConfetti}
                />

                <div className={styles.fairnessContainer}>
                  <Icon
                      className={styles.balanceIcon}
                      iconType={IconType.balanceScaleSolid}
                      iconTheme={IconTheme.black}
                      height={18}
                      width={18}
                  /> <span className={classNames('global-link-style', styles.fairnessOpenPopup)}
                           onClick={handleFairnessPopup}>Fairness</span>
                </div>
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
        <h1 className={styles.title}>Mines</h1>

        <div className={styles.content}>
          <div className={styles.topContainer}>
            <p>
              <b>One of the most active and hard-working animals out there is an alpaca. Besides sloths and unicorns, of course. Having said that you need to know they work very efficiently and their motto is “Do as little as possible but earn as much money as possible”. </b>
            </p>
            <p>
              Sounds logic, right? As we all know from the geology lessons, there is a lot of WFAIRs under the Candyland of Alpacaworld and every Alpaca wants to find as much as possible. The problem they encounter on daily basis though is small, furry and blind - namely mole. They take away the gold from the bottom and then they leave an unpleasant surprise for the Alpacas.
            </p>
            <p>
              Black, smelly unpleasant surprise. If an alpaca dugs out the smelly surprise all the money is gone and he has to start from the beginning. Help Candyland to stay safe and beautiful and avoid as many mines as possible!
            </p>
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.firstWrapper}>
              <img src={MinesAlpaca} alt='mines-alpaca'/>
            </div>
            <div className={styles.secondWrapper}>
              <h2>HOW TO PLAY MINES?</h2>
              <p>
                <b>Step 1:</b> Enter the amount you want to bet
              </p>
              <p>
                <b>Step 2:</b> Select how many mines you want to have in the game/ The more mines, the higher the winnings<br/>
              </p>
              <p>
                <b>Step 3:</b> Select "Place Bet" <br/>
              </p>
              <p>
                <b>Step 4:</b> Select unturned fields <br/>
                Try to avoid the hidden mines and click on as many coins as possible <br/>
                The more coins you find the more money you make. If you find a poo try your luck in the next round
              </p>
              <p>
                <b>Step 5:</b> Repeat and turn your volume up! <br/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
