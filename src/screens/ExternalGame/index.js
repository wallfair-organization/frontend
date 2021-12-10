import { useCallback, useEffect, useState } from 'react';
import { GameApi, setInitialSession } from 'api/casino-games';
import { connect, useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import BackLink from 'components/BackLink';
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
import { getGameById, ObjectId } from '../../helper/Games';
import { GAMES } from '../../constants/Games';
import { UserActions } from 'store/actions/user';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import { isMobile } from 'react-device-detect';
import { selectUser } from 'store/selectors/authentication';


const RouletteGame = ({
  showPopup,
  history,
  connected,
  userId,
  token,
  refreshHighData,
  refreshLuckyData,
  updateUserBalance,
  match
}) => {
  const user = useSelector(selectUser);
  const game = GAMES.alpacaWheel
  const gameName = match?.params?.game
  const gameCategory = match?.params?.category

  const EXTERNAL_GAME_EVENT_ID = ObjectId(gameName)//game.id;
  const Api = new GameApi(game.url, token);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(null);
  const [demo, setDemo] = useState(true);
  const [spins, setSpins] = useState([]);
  const [risk, setRisk] = useState(1);
  const [bet, setBet] = useState({ready: true});
  const [amount, setAmount] = useState(50);
  const [init, setInit] = useState(null);

  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{ name: 'CHAT', index: 0 }];

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);


  useEffect(() => {
    if(!user.isLoggedIn){
      if(isMobile) {
        history.push('/games')
        window.location = `https://server.ssg-public.com/GameLauncher/Loader.aspx?Token=DEMO&GameCategory=${gameCategory}&GameName=${gameName}&ReturnUrl=${window.location.origin}&Lang=en&PortalName=DEMO`
      }else{
        setInit('faebb4a9-eca3-4720-b6fd-82540f55486a')
      }
    }else{
      setInitialSession({UserId: userId, GameName: gameName, GameType: gameCategory, Provider: 'smartsoft' })
        .then(({data}) => {
          if(isMobile) {
            history.push('/games')
            window.location = `https://eu-staging.ssgportal.com/GameLauncher/Loader.aspx?GameCategory=${gameCategory}&GameName=${gameName}&Token=${data.TokenID}&PortalName=wallfair&ReturnUrl=${window.location.origin}`
          }else{
            setInit(data.TokenID)
          }
        })
        .catch(error => {
          dispatch(AlertActions.showError(error.message));
        });
    }
    return () => {
      setInit(null)
    }
  }, [])

  useEffect(() => {
    dispatch(ChatActions.fetchByRoom({ roomId: EXTERNAL_GAME_EVENT_ID }));
  }, [dispatch, connected]);


  const handleChatSwitchTab = option => {
    setChatTabIndex(option.index);
  };
  useEffect(() => {
    if(userId && bet?.ready) {
       updateUserBalance(userId);
    }
  }, [bet])

  async function handleBet(payload) {
    audio.playBetSound();
    if (!payload) return;
    try {
      if(payload.demo) {
        setBet({...payload, ready: false })
        //trackAlpacaWheelPlaceBetGuest({ amount: payload.amount, multiplier: risk});
      } else {
        const { data } = await Api.createTrade(payload);
        setBet({...payload, ...data, ready: false});
        //updateUserBalance(userId);
        //trackAlpacaWheelPlaceBet({ amount: payload.amount, multiplier: risk, autobet: payload.autobet != null ? 1 : 0 });
        //trackAlpacaWheelCashout({ amount: data.reward, multiplier: data.winMultiplier, result: data.gameResult, accumulated: payload.accumulated, autobet: payload.autobet != null ? 1 : 0 });
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
        gameId={EXTERNAL_GAME_EVENT_ID}></EventActivitiesTabs>
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
          roomId={EXTERNAL_GAME_EVENT_ID}
          className={styles.chatContainer}
          chatMessageType={ChatMessageType.game}
        />
      </div>
    </Grid>
  );

  const url = `https://eu-staging.ssgportal.com/GameLauncher/Loader.aspx?GameCategory=${gameCategory}&GameName=${gameName}&Token=${init}&PortalName=wallfair&ReturnUrl=${window.location.origin}`

  const urltest = `https://server.ssg-public.com/GameLauncher/Loader.aspx?Token=DEMO&GameCategory=${gameCategory}&GameName=${gameName}&ReturnUrl=${window.location.origin}&Lang=en&PortalName=DEMO`

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headlineWrapper}>
            <BackLink to="/games" text={gameName} />
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
          {init && <iframe className={styles.mainContainer} src={user.isLoggedIn?url:urltest}/>}
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
      dispatch(UserActions.fetch({ userId, forceFetch: true }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouletteGame);
