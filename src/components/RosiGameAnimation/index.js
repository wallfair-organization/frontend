import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ROSI_GAME_AFTER_CRASH_DELAY } from 'constants/RosiGame';
import {
  selectHasStarted,
  selectTimeStarted,
  selectLastCrash,
  selectCashedOut,
  selectNextGameAt,
} from 'store/selectors/rosi-game';
import Timer from './Timer';
import Counter from './Counter';
import styles from './styles.module.scss';
import RosiGameAnimationController from './canvas/RosiGameAnimationController';
import { CircularProgress } from '@material-ui/core';

const PreparingRound = ({ secondsUntilNextGame }) => (
  <div className={styles.preparingRound}>
    <div>
      <h2 className={styles.title}>Preparing Round</h2>
      <div className={styles.description}>
        Starting in <Counter number={secondsUntilNextGame} />
      </div>
    </div>
  </div>
);

const RosiGameAnimation = () => {
  const canvasRef = useRef(null);
  const lastCrashValue = useSelector(selectLastCrash);
  const gameStarted = useSelector(selectHasStarted);
  const cashedOut = useSelector(selectCashedOut);
  const nextGameAtTimeStamp = useSelector(selectNextGameAt);
  const gameStartedTimeStamp = useSelector(selectTimeStarted);
  const gameStartedTime = new Date(gameStartedTimeStamp).getTime();
  const secondsUntilNextGame = nextGameAtTimeStamp
    ? Math.max(
        Math.round(
          (new Date(nextGameAtTimeStamp).getTime() - Date.now()) / 1000
        ),
        0
      )
    : 1;

  const [cashedOutCount, setCashedOutCount] = useState(0);
  const [isPreparingRound, setIsPreparingRound] = useState(!gameStarted);
  const [isAnimationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      RosiGameAnimationController.init(canvasRef.current);
      RosiGameAnimationController.load(() => {
        setAnimationReady(true);
        if (isPreparingRound) {
          RosiGameAnimationController.preparingRound.show();
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isAnimationReady) {
      return;
    }

    if (gameStarted) {
      setCashedOutCount(0);
      setIsPreparingRound(false);
      RosiGameAnimationController.start(gameStartedTime);
      return;
    }

    if (!gameStarted && !isPreparingRound) {
      RosiGameAnimationController.end();

      // leave some time for player to see crash value
      setTimeout(() => {
        RosiGameAnimationController.preparingRound.show();
        setIsPreparingRound(true);
      }, ROSI_GAME_AFTER_CRASH_DELAY);
    }
  }, [gameStarted, isAnimationReady]); // eslint-disable-line

  useEffect(() => {
    if (!isAnimationReady || !gameStarted) {
      return;
    }

    if (cashedOut && cashedOut.length > cashedOutCount) {
      setCashedOutCount(cashedOutCount + 1);
      RosiGameAnimationController.doCashedOutAnimation(cashedOut[0]);
    }
  }, [isAnimationReady, gameStarted, cashedOut]); // eslint-disable-line

  function render() {
    if (isPreparingRound) {
      return <PreparingRound secondsUntilNextGame={secondsUntilNextGame} />;
    }

    return (
      <div
        className={cn(styles.timer, { [styles.flashAnimation]: !gameStarted })}
      >
        {gameStarted ? (
          <Timer pause={!gameStarted} startTimeMs={gameStartedTime} />
        ) : (
          <span>{lastCrashValue.toFixed(2)}</span>
        )}
        <span>x</span>
      </div>
    );
  }

  return (
    <div className={styles.animation}>
      <canvas
        className={styles.canvas}
        id="rosi-game-animation"
        ref={canvasRef}
      />
      {isAnimationReady ? (
        render()
      ) : (
        <CircularProgress style={{ position: 'absolute', margin: '0 auto' }} />
      )}
    </div>
  );
};

export default RosiGameAnimation;
