import React, {useCallback, useEffect, useState} from 'react';
import {getSpinsAlpacaWheel, GameApi} from 'api/casino-games';
import {connect, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBet from 'components/PlaceBet';
import PlaceBetCasino from 'components/PlaceBetCasino';
import BackLink from 'components/BackLink';
import Spins from 'components/Spins';
import GameAnimation from 'components/RouletteGameAnimation';
import GameBets from 'components/GameBets';
import Chat from 'components/Chat';
import useRosiData from 'hooks/useRosiData';
import styles from './styles.module.scss';
import {AlertActions} from '../../store/actions/alert';
import {RosiGameActions} from '../../store/actions/rosi-game';
import ContentFooter from 'components/ContentFooter';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import {ChatActions} from 'store/actions/chat';
import Share from '../../components/Share';
import PopupTheme from 'components/Popup/PopupTheme';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import {PopupActions} from 'store/actions/popup';
import TabOptions from '../../components/TabOptions';
import Routes from 'constants/Routes';
import {getGameById} from '../../helper/Games';
import {GAMES} from '../../constants/Games';
import {
  trackAlpacaWheelPlaceBetGuest,
  trackAlpacaWheelPlaceBet,
  trackAlpacaWheelCashout,
} from '../../config/gtm';
import {UserActions} from 'store/actions/user';
import EventActivitiesTabs from 'components/EventActivitiesTabs'

const RouletteGame = ({
                        showPopup,
                        connected,
                        userId,
                        token,
                        refreshHighData,
                        refreshLuckyData,
                        updateUserBalance
                      }) => {
  const game = GAMES.alpacaWheel;
  const ALPACA_WHEEL_GAME_EVENT_ID = game.id;

  const Api = new GameApi(game.url, token);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(null);
  const [spins, setSpins] = useState([]);
  const [risk, setRisk] = useState(1);
  const [bet, setBet] = useState({ready: true});
  const [amount, setAmount] = useState(50);

  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{name: 'CHAT', index: 0}];

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);

  const handleFairnessPopup = useCallback(event => {
    showPopup(PopupTheme.fairnessPopup, {
      maxWidth: true, data: {
        game,
        token
      }
    });
  }, []);


  useEffect(() => {
    if(userId) {
      getSpinsAlpacaWheel(ALPACA_WHEEL_GAME_EVENT_ID)
        .then(response => {
          const lastSpins = response?.data.lastCrashes;
          setSpins(lastSpins.map((spin) => {
            const output = {};
            if (spin.profit > 0) {
              output.type = 'win';
              output.value = '+' + spin.profit;
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
    (async () => {
      //this get route is for retrieving client / server seeds for the game, if its very first time,
      //casino_fairness record will be created automatically
      if(userId) {
        await Api.getCurrentFairnessByGame(game.id);
      }
    })().catch(error => {
      dispatch(AlertActions.showError({
        message: `${game.name}: ${error.response?.data || error.message}`
      }));

      setBet({
        ...bet,
        ready: false
      })
    });
  }, [])

  useEffect(() => {
    dispatch(ChatActions.fetchByRoom({roomId: ALPACA_WHEEL_GAME_EVENT_ID}));
  }, [dispatch, connected]);


  const handleChatSwitchTab = option => {
    setChatTabIndex(option.index);
  };
  useEffect(() => {
    if (userId && bet?.ready) {
      updateUserBalance(userId);
    }
  }, [bet])

  async function handleBet(payload) {
    audio.playBetSound();
    if (!payload) return;
    try {
      if (payload.demo) {
        setBet({...payload, ready: false})
        trackAlpacaWheelPlaceBetGuest({amount: payload.amount, multiplier: risk});
      } else {
        const {data} = await Api.createTrade(payload);
        setBet({...payload, ...data, ready: false});
        //updateUserBalance(userId);
        trackAlpacaWheelPlaceBet({amount: payload.amount, multiplier: risk, autobet: payload.autobet != null ? 1 : 0});
        trackAlpacaWheelCashout({
          amount: data.reward,
          multiplier: data.winMultiplier,
          result: data.gameResult,
          accumulated: payload.accumulated,
          autobet: payload.autobet != null ? 1 : 0
        });
        return data;
      }
    } catch (e) {
      dispatch(
        AlertActions.showError({
          message: 'Alpaca Wheel: Place Bet failed',
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
        gameId={ALPACA_WHEEL_GAME_EVENT_ID}></EventActivitiesTabs>
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
          roomId={ALPACA_WHEEL_GAME_EVENT_ID}
          className={styles.chatContainer}
          chatMessageType={ChatMessageType.game}
        />
      </div>
    </Grid>
  );

  const handleNewSpin = (newSpin) => {
    if(userId) {
      setSpins([newSpin, ...spins]);
    }
  }

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headlineWrapper}>
            <BackLink to="/games" text="Alpaca Wheel"/>
            <Share popupPosition="right" className={styles.shareButton}/>
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
                setSpins={handleNewSpin}
                risk={risk}
                bet={bet}
                amount={amount}
                setBet={setBet}
                onInit={audio => setAudio(audio)}
              />
              <Spins text="My Spins" spins={spins} game={game}/>
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.placeContainer}>
                <PlaceBetCasino
                  gameName={'wheel'}
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
                /> <span className={classNames('global-link-style', styles.fairnessOpenPopup)}
                         onClick={handleFairnessPopup}>Fairness</span>
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
      dispatch(UserActions.fetch({userId, forceFetch: true}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouletteGame);
