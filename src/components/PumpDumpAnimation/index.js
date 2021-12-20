import useRosiData from '../../hooks/useRosiData';
import { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import GameOffline from '../GameOffline';
import classNames from 'classnames';
import styles from './styles.module.scss';
import GameAudioControls from 'components/GameAudioControls';
import { RosiGameActions } from 'store/actions/rosi-game';
import { GameAudioManager } from './utils/GameAudioManager';
import { PumpDumpGameMananger } from './game/PumpDumpGameManager';
import Counter from 'components/RosiGameAnimation/Counter';
import { PUMPDUMP_GAME_AFTER_CRASH_DELAY } from 'constants/RosiGame';
import Timer from 'components/RosiGameAnimation/Timer';
import { ASSET_LIST } from './config';

const PreparingRound = ({ nextGameAt }) => (
  <div className={styles.preparingRound}>
    <div>
      <h2 className={styles.title}>Launching new ICO</h2>
      <div className={styles.description}>
        <span>
          Starting in <Counter className={styles.counter} from={nextGameAt} />
        </span>
      </div>
    </div>
  </div>
)

const GameMount = (setAudio, isPreparingRound, setGameLoaded, nextGameAtTimeStamp, canvasRef, onInit) => {
  const audioManager = new GameAudioManager();
  if (canvasRef.current) {
    setAudio(audioManager);
    onInit(audioManager);
    PumpDumpGameMananger.initialize(0x12132e, canvasRef.current, audioManager);
    PumpDumpGameMananger.load(ASSET_LIST, () => {
      if (isPreparingRound) {
        PumpDumpGameMananger.launchCoin(new Date(nextGameAtTimeStamp).getTime() - Date.now());
      }
      setGameLoaded(true);
    });
  }
  return () => {
    audioManager.stopBgm();
    PumpDumpGameMananger.destroy();
  };
}

const FreshCashOut = (cashOuts) => {
  if (cashOuts.length > 0) {
    PumpDumpGameMananger.handleFreshCashouts(cashOuts);
  }
}

const PumpDumpAnimation = ({ isLosing ,muteButtonClick, onInit }) => {
  const {
    isConnected,
    isMute,
    isSynced,
    volumeLevel,
    musicIndex,
    animationIndex,
    inGameBets,
    cashedOut,
    hasStarted,
    isEndgame,
    lastCrashValue,
    nextGameAtTimeStamp,
    gameStartedTimeStamp,
  } = useRosiData();
  const [hasGameLoaded, setGameLoaded] = useState(false);
  const [isPreparingRound, setIsPreparingRound] = useState(!hasStarted);
  const gameStartedTime = new Date(gameStartedTimeStamp).getTime();
  const canvasRef = useRef(null);
  const [audio, setAudio] = useState(null);

  const cashOutsRef = useRef([...cashedOut]);

  function updateCashOutRef() {
    // To avoid creating a new array thus losing ref passed to the game
    cashOutsRef.current.length = 0;
    cashOutsRef.current.push(...cashedOut);
  }

  // OnMount / OnDismount
  useEffect(() => {
    return GameMount(setAudio, isPreparingRound, setGameLoaded, nextGameAtTimeStamp, canvasRef, onInit);
  }, []);

  // Once gameHasLoaded or game hasStarted(rosi)
  useEffect(() => {
    if (!hasGameLoaded) {
      return;
    }

    // Start Game
    if (hasStarted) {
      console.warn('hasStarted');
      setIsPreparingRound(false);
      updateCashOutRef();
      PumpDumpGameMananger.startGame(gameStartedTime, cashOutsRef.current);
      return;
    }

    // End Game and Show Preparation Scene
    if (!hasStarted && !isPreparingRound) {
      PumpDumpGameMananger.endGame(isLosing);
      // leave some time for player to see crash value
      setTimeout(() => {
        if (!hasStarted) {
          PumpDumpGameMananger.launchCoin(new Date(nextGameAtTimeStamp).getTime() - Date.now());
          setIsPreparingRound(true);
        }
      }, PUMPDUMP_GAME_AFTER_CRASH_DELAY);
    }
  }, [hasStarted, hasGameLoaded]); // eslint-disable-line

  // When there is fresh cash out
  useEffect(() => {
    if (!hasGameLoaded || !hasStarted) {
      return;
    }

    updateCashOutRef();
    const freshCashOuts = cashedOut.filter(({ isFresh }) => isFresh === true);
    FreshCashOut(freshCashOuts);
  }, [cashedOut]); // eslint-disable-line

  function render() {
    if (!isConnected) return <GameOffline />;

    if (isPreparingRound) {
      return <PreparingRound nextGameAt={nextGameAtTimeStamp} />;
    }

    return (
      <div
        className={classNames(styles.timer, { [styles.flashAnimation]: !hasStarted })}
      >
        {hasStarted && (
          <>
            <Timer pause={!hasStarted} startTimeMs={gameStartedTime} />
            <span>x</span>
          </>
        )}
        {!hasStarted && !!lastCrashValue && (
          <>
            <span>{lastCrashValue?.crashFactor?.toFixed(2)}</span>
            <span>x</span>
          </>
        )}
      </div>
    );
  }
  
  return (
    <div className={styles.animation}>
      <div className={styles.audioControls}>
        {audio && (
          <GameAudioControls audio={audio} muteButtonClick={muteButtonClick} />
        )}
      </div>      
      <canvas
        className={classNames(styles.canvas)}
        id="pump-dump-game-animation"
        ref={canvasRef}
      />
      {hasGameLoaded && isSynced ? render() : <GameOffline />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLosing: state.rosiGame.userBet && !state.rosiGame.isCashedOut,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    muteButtonClick: () => {
      dispatch(RosiGameActions.muteButtonClick());
    },
  };
};

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PumpDumpAnimation);
export default memo(Connected);
