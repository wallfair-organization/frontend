import { useCallback, useEffect, useState, useRef } from 'react';
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
import { getExternalGameDataById, ObjectId } from '../../helper/Games';
import { UserActions } from 'store/actions/user';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import { isMobile } from 'react-device-detect';
import { selectUser } from 'store/selectors/authentication';
import SelectGameModePopup from "../../components/SelectGameModePopup";
import classNames from 'classnames';

const portal = process.env.REACT_APP_SMARTSOFT_PORTALNAME
const urlLauncher = process.env.REACT_APP_SMARTSOFT_LAUNCHER_URL

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
  const gameName = match?.params?.game

  const EXTERNAL_GAME_EVENT_ID = ObjectId(gameName)//game.id;

  const gameData = getExternalGameDataById(gameName);
  console.log({gameData});

  const gameCategory = gameData?.TechnicalCategory;
  
  // const Api = new GameApi(game.url, token);
  const dispatch = useDispatch();
  const [bet, setBet] = useState({ready: true});
  const [init, setInit] = useState(null);
  const [gameMode, setGameMode] = useState(null);

  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{ name: 'CHAT', index: 0 }];

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);


  useEffect(() => {
    //do nothing until we select game mode
    if(!gameMode) {
      return;
    }

    if(!user.isLoggedIn || gameMode === 'demo'){
      if(isMobile) {
        history.push('/')
        window.location = `https://server.ssg-public.com/GameLauncher/Loader.aspx?Token=DEMO&GameCategory=${gameCategory}&GameName=${gameName}&ReturnUrl=${window.location.origin}&Lang=en&PortalName=DEMO`
      }else{
        setInit('faebb4a9-eca3-4720-b6fd-82540f55486a')
      }
    }else{
      setInitialSession({UserId: userId, GameName: gameName, GameType: gameCategory, Provider: 'smartsoft' })
        .then(({data}) => {
          if(isMobile) {
            history.push('/')
            window.location = `${urlLauncher}?GameCategory=${gameCategory}&GameName=${gameName}&Token=${data.TokenID}&PortalName=${portal}&ReturnUrl=${window.location.origin}`
          }else{
            console.log("data.TokenID", data.TokenID)
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
  }, [gameMode])

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

  const renderActivities = () => (
    <Grid item xs={12} md={6}>
      <EventActivitiesTabs
        activitiesLimit={50}
        className={styles.activitiesTrackerGamesBlock}
        preselectedCategory={'game'}
        gameId={EXTERNAL_GAME_EVENT_ID}
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
          roomId={EXTERNAL_GAME_EVENT_ID}
          className={styles.chatContainer}
          chatMessageType={ChatMessageType.game}
        />
      </div>
    </Grid>
  );

  const url = `${urlLauncher}?GameCategory=${gameCategory}&GameName=${gameName}&Token=${init}&PortalName=${portal}&ReturnUrl=${window.location.origin}`

  const urltest = `https://server.ssg-public.com/GameLauncher/Loader.aspx?Token=DEMO&GameCategory=${gameCategory}&GameName=${gameName}&ReturnUrl=${window.location.origin}&Lang=en&PortalName=DEMO`
  const contentRef = useRef(null);

/*
  onLoad={() => iframeURLChange(contentRef.current, (newURL) => console.log("URL changed:", newURL))}

  useEffect(() => {
    iframeURLChange(contentRef?.current, function (newURL) {
      console.log("URL changed:", newURL);
    });
  }, [JSON.stringify(contentRef?.current)]);
  */

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

          {!gameMode &&
          <div className={classNames(styles.mainContainer, styles.mainContainerPreview)}>
            <div className={styles.gamePreviewContainer} style={{
              backgroundImage: `url(https://www.smartsoftgaming.com/Content/Images/GameIcons/${gameName}.jpg)`,
            }} />
              <SelectGameModePopup className={styles.gameModePopup} user={user} setGameMode={setGameMode} />
            </div>
          }

          {(gameMode && init) &&
            <iframe allowFullScreen title={gameName} onLoad={() => console.log("URL changed:", contentRef?.contentWindow?.location?.href)} ref={contentRef} className={classNames(styles.mainContainer,gameName === 'JetX' ? styles.jetXContainer : null)} src={(user.isLoggedIn && gameMode !== 'demo') ?url:urltest} />
          }
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
