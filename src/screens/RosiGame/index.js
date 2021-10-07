import { useCallback, useEffect, useState } from 'react';
import * as Api from 'api/crash-game';
import { connect, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PlaceBet from 'components/PlaceBet';
import BackLink from 'components/BackLink';
import LastCrashes from 'components/LastCrashes';
import GameAnimation from 'components/RosiGameAnimation';
import GameBets from 'components/GameBets';
import Chat from 'components/Chat';
import { ROSI_GAME_EVENT_ID } from 'constants/RosiGame';
import { RosiGameActions } from 'store/actions/rosi-game';
import useRosiData from 'hooks/useRosiData';
import MobileBets from './MobileBets';
import styles from './styles.module.scss';
import { AlertActions } from '../../store/actions/alert';
import ContentFooter from 'components/ContentFooter';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import { ChatActions } from 'store/actions/chat';
import Share from '../../components/Share';
import PopupTheme from 'components/Popup/PopupTheme';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import { PopupActions } from 'store/actions/popup';

const RosiGame = ({ showPopup, connected }) => {
  const dispatch = useDispatch();
  const { lastCrashes, inGameBets, cashedOut } = useRosiData();
  const isSmallDevice = useMediaQuery('(max-width:768px)');
  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);

  useEffect(() => {
    Api.getCurrentGameInfo()
      .then(response => {
        dispatch(RosiGameActions.initializeState(response.data));
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
    dispatch(ChatActions.fetchByRoom({ roomId: ROSI_GAME_EVENT_ID }));
  }, [dispatch, connected]);

  //Bets state update interval
  useEffect(() => {
    const interval = setInterval(() => dispatch(RosiGameActions.tick()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headlineWrapper}>
            <BackLink to="/games" text="Elon Game" />
            <Share popupPosition="right" className={styles.shareButton} />
            <Icon
              className={styles.questionIcon}
              iconType={IconType.question}
              iconTheme={IconTheme.white}
              height={25}
              width={25}
              onClick={handleHelpClick}
            />
            <span onClick={handleHelpClick} className={styles.howtoLink}>
              How does it work?
            </span>
          </div>

          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <LastCrashes lastCrashes={lastCrashes} />
              <GameAnimation inGameBets={inGameBets} />
            </Grid>
            {isMiddleOrLargeDevice && (
              <>
                <Grid item xs={12} md={3}>
                  <PlaceBet connected={connected} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={styles.chatWrapper}>
                    <Chat
                      roomId={ROSI_GAME_EVENT_ID}
                      className={styles.chatContainer}
                      chatMessageType={ChatMessageType.game}
                    />
                  </div>
                </Grid>
                <Grid item md={4}>
                  <GameBets label="In Game Bets" bets={inGameBets} />
                </Grid>
                <Grid item md={4}>
                  <GameBets label="Cashed Out" bets={cashedOut} cashedOut />
                </Grid>
              </>
            )}
          </Grid>
          {isSmallDevice && (
            <MobileBets inGameBets={inGameBets} cashedOut={cashedOut} />
          )}
          <ContentFooter className={styles.betFooter} />
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RosiGame);
