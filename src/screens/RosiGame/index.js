import { useEffect } from 'react';
import * as Api from 'api/crash-game';
import { useDispatch, useSelector } from 'react-redux';
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

const RosiGame = () => {
  const dispatch = useDispatch();
  const { lastCrashes, inGameBets, cashedOut } = useRosiData();
  const isSmallDevice = useMediaQuery('(max-width:768px)');
  const isMiddleOrLargeDevice = useMediaQuery('(min-width:769px)');

  useEffect(() => {
    Api.getCurrentGameInfo()
      .then(response => {
        dispatch(RosiGameActions.initializeState(response.data));
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
    dispatch(ChatActions.fetchByRoom({ roomId: ROSI_GAME_EVENT_ID }));
  }, [dispatch]);

  //Bets state update interval
  useEffect(() => {
    const interval = setInterval(() => dispatch(RosiGameActions.tick()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.content}>
          <BackLink to="/games" text="Elon Game">
            <Share />
          </BackLink>
          <Grid container spacing={1}>
            <Grid item xs={12} md={9}>
              <LastCrashes lastCrashes={lastCrashes} />
              <GameAnimation inGameBets={inGameBets} />
            </Grid>
            {isMiddleOrLargeDevice && (
              <>
                <Grid item xs={12} md={3}>
                  <PlaceBet />
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

export default RosiGame;
