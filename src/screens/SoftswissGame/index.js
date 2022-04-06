import { useCallback, useEffect, useState } from 'react';
import { getSoftswissgames } from 'api/casino-games';
import { connect, useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import BackLink from 'components/BackLink';
import Chat from 'components/Chat';
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
import { SOFTSWISS_GAMES } from '../../constants/Games';
import EventActivitiesTabs from 'components/EventActivitiesTabs'
import { isMobile } from 'react-device-detect';
import { selectUser } from 'store/selectors/authentication';
import SelectGameModePopup from "../../components/SelectGameModePopup";
import classNames from 'classnames';
import _ from 'lodash';

const SoftswissGame = ({
  history,
  connected,
  userId,
  match
}) => {
  const user = useSelector(selectUser);

  const [gameMode, setGameMode] = useState(null);

  const gameIdentifier = match?.params?.game;
  const softswissGame = _.find(SOFTSWISS_GAMES, {identifier: gameIdentifier});
  const gameName = softswissGame?.identifier ? softswissGame?.title : gameIdentifier;
  const EXTERNAL_GAME_EVENT_ID = gameIdentifier;
  const filename = 'image';

  const dispatch = useDispatch();
  const [init, setInit] = useState(null);

  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');
  const [chatTabIndex, setChatTabIndex] = useState(0);
  const chatTabOptions = [{ name: 'CHAT', index: 0 }];

  const handleHelpClick = useCallback(event => {
    dispatch(
      PopupActions.show({
        popupType: PopupTheme.explanation,
      })
    );
  }, []);

  useEffect(() => {
    //here we need to send query based on demo / real play
    if (gameMode) {
      const demo = gameMode === 'demo' || !user.isLoggedIn;
      console.log(demo);
      const device = isMobile ? "mobile" : "desktop";
      getSoftswissgames({ ReturnUrl: window.location.origin, "demo": demo, UserId: userId, GameName: gameIdentifier, Language: 'en', ClientType: device })
        .then(({data}) => {
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

          {!gameMode && (
            <div
              className={classNames(
                styles.mainContainer,
                styles.mainContainerPreview
              )}
            >
              <div
                className={styles.gamePreviewContainer}
                style={{
                  backgroundImage: `url(/images/evoplay/${filename}_360x360.jpg)`,
                }}
              />
              <SelectGameModePopup
                className={styles.gameModePopup}
                user={user}
                setGameMode={setGameMode}
                funPlayEnabled={softswissGame?.producer === 'bgaming'}
              />
            </div>
          )}

          {gameMode && init && (
            <iframe
              allowFullScreen
              title={gameName}
              className={styles.mainContainer}
              src={init}
            />
          )}
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
  };
};

export default connect(mapStateToProps, null)(SoftswissGame);
