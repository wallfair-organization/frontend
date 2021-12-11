import { useCallback, useEffect, useState, useRef } from 'react';
import { getSpinsAlpacaWheel, GameApi } from 'api/casino-games';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBet from 'components/PlaceBet';
import PlaceBetCasino from 'components/PlaceBetCasino';
import BackLink from 'components/BackLink';
import Spins from 'components/Spins';
import GameAnimation from 'components/AlpacannonGameAnimation';
import GameBets from 'components/GameBets';
import Chat from 'components/Chat';
import styles from './styles.module.scss';
import { AlertActions } from '../../store/actions/alert';
import { RosiGameActions } from '../../store/actions/rosi-game';
import ContentFooter from 'components/ContentFooter';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import { ChatActions } from 'store/actions/chat';
import Share from '../../components/Share';
import PopupTheme from 'components/Popup/PopupTheme';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import { PopupActions } from 'store/actions/popup';
import TabOptions from '../../components/TabOptions';
import Routes from 'constants/Routes';
import { getGameById } from '../../helper/Games';
import { GAMES } from '../../constants/Games';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import {
  trackPlinkoCashout,
  trackPlinkoPlaceBet
} from '../../config/gtm';
import { UserActions } from 'store/actions/user';
import { selectUser } from 'store/selectors/authentication';

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
  const Api = new GameApi(GAMES.cannon.url, token);
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

  useEffect(() => {
    if(user.isLoggedIn){
      getSpinsAlpacaWheel(ALPACANNON_GAME_EVENT_ID)
        .then(response => {
          const lastSpins = response?.data.lastCrashes;
          setSpins(lastSpins.map((spin) => {
            if(spin.profit > 0) {
              return {
                type: 'win',
                value: '+' + spin.profit
              }
            } else if(spin.profit === 0){
              return {
                type: 'even',
                value: '' + spin.profit
              }
            }else {
              return {
                type: 'loss',
                value: spin.profit
              }
            }
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
        setBet((bet) => { return {...bet, ...payload, profit: data.profit, rollValue: Math.round(data.rollValue), ready: false} })
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
              <Spins text="My Games" spins={spins} />
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
