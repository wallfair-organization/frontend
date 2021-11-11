import useRosiData from '../../hooks/useRosiData';
import { useRef, useState } from 'react';
import GameOffline from '../GameOffline';
import classNames from 'classnames';
import styles from './styles.module.scss';

const PumpDumpAnimation = () => {
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
  const [isPreparingRound, setIsPreparingRound] = useState(!hasStarted);
  const [isAnimationReady, setAnimationReady] = useState(false);
  const canvasRef = useRef(null);

  return (
    <div className={styles.animation}>
      <div>Pump Dump Animation Placeholder</div>
      <canvas
        className={classNames(styles.canvas)}
        id="pump-dump-game-animation"
        ref={canvasRef}
      />
      {isConnected || <GameOffline />}
    </div>
  );
};

export default PumpDumpAnimation;
