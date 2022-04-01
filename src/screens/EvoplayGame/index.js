import { useCallback, useEffect, useState } from 'react';
import { GameApi, setInitialEvoplaySession, getUrlgame } from 'api/casino-games';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import BackLink from 'components/BackLink';
import Spins from 'components/Spins';
import GameAnimation from 'components/RouletteGameAnimation';
import Chat from 'components/Chat';
import useRosiData from 'hooks/useRosiData';
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
import { getGameById, ObjectId } from '../../helper/Games';
import { EVOPLAY_GAMES, GAMES } from '../../constants/Games';
import { UserActions } from 'store/actions/user';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import { isMobile } from 'react-device-detect';
import { selectUser } from 'store/selectors/authentication';
import SelectGameModePopup from "../../components/SelectGameModePopup";
import classNames from 'classnames';

const EvoplayGame = ({
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
  const [gameMode, setGameMode] = useState(null);
  
  const gameNumber = match?.params?.number
  const EXTERNAL_GAME_EVENT_ID = ObjectId(gameNumber)//game.id;

  const evoPlayGame = EVOPLAY_GAMES[gameNumber];

  const gameName = evoPlayGame.name;
  const gameCategory = evoPlayGame.game_sub_type;

  const filename = evoPlayGame.absolute_name.substring(evoPlayGame.absolute_name.lastIndexOf("\\") + 1);

  const dispatch = useDispatch();
  const [init, setInit] = useState(null);

  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{ name: 'CHAT', index: 0 }];

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);


  useEffect(() => {
    if(gameMode) {
      const demo = gameMode === 'demo' || !user.isLoggedIn;
      getUrlgame({returnUrl: window.location.origin, demo, UserId: userId, GameType: gameCategory, GameName: gameName, GameNumber: gameNumber, Provider: 'evoplay' })
        .then(({data}) => {
          console.log({data});
          if(data?.url) {
            const gameUrl = data?.url;
            if(isMobile) {
              history.push('/')
              window.location = gameUrl;
            }else{
              setInit(gameUrl);
            }
          }
        })
        .catch(error => {
          dispatch(AlertActions.showError(error.message));
        });
      return () => {
        setInit(null)
      }
    }

  }, [gameMode])

  useEffect(() => {
    console.log("EXTERNAL_GAME_EVENT_ID", EXTERNAL_GAME_EVENT_ID)
    dispatch(ChatActions.fetchByRoom({ roomId: EXTERNAL_GAME_EVENT_ID }));
  }, [dispatch, connected]);


  const handleChatSwitchTab = option => {
    setChatTabIndex(option.index);
  };

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
                backgroundImage: `url(/images/evoplay/${filename}_360x360.jpg)`,
              }}
            />
              <SelectGameModePopup className={styles.gameModePopup} user={user} setGameMode={setGameMode} />
            </div>
          }

          {(gameMode && init) && <iframe allowFullScreen title={gameName} className={styles.mainContainer} src={init}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(EvoplayGame);
