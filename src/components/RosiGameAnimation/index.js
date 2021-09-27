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

const RosiGameAnimation = () => {
  const canvasRef = useRef(null);
  const lastCrashValue = useSelector(selectLastCrash);
  const gameStarted = useSelector(selectHasStarted);
  const cashedOut = useSelector(selectCashedOut);
  const nextGameAtTimeStamp = useSelector(selectNextGameAt);
  const gameStartedTimeStamp = useSelector(selectTimeStarted);
  const gameStartedTime = new Date(gameStartedTimeStamp).getTime();
  const secondsUntilNextGame = nextGameAtTimeStamp
    ? Math.round((new Date(nextGameAtTimeStamp).getTime() - Date.now()) / 1000)
    : 1;

  const [cashedOutCount, setCashedOutCount] = useState(0);
  const [isPreparingRound, setIsPreparingRound] = useState(!gameStarted);
  const [animationReady, setAnimationReady] = useState(false);

  // If user lands on the page while game is in progress, then should start counting from current crash
  // factor, which is time elapsed since game started. This value is reset once first game ends and is not
  // used after that.
  const [timerStartTime, setTimerStartTime] = useState(
    gameStarted ? Date.now() - gameStartedTime : 0
  );

  useEffect(() => {
    if (canvasRef.current) {
      RosiGameAnimationController.init(canvasRef.current);
      RosiGameAnimationController.load(() => {
        setAnimationReady(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!animationReady) {
      return;
    }

    if (gameStarted) {
      setCashedOutCount(0);
      setIsPreparingRound(false);
      RosiGameAnimationController.start();
      return;
    }

    if (!gameStarted) {
      RosiGameAnimationController.end();

      // leave some time for player to see crash value
      setTimeout(() => {
        setIsPreparingRound(true);
        setTimerStartTime(0);
      }, ROSI_GAME_AFTER_CRASH_DELAY);
    }
  }, [gameStarted, animationReady]); // eslint-disable-line

  useEffect(() => {
    if (!animationReady || !gameStarted) {
      return;
    }

    if (cashedOut && cashedOut.length > cashedOutCount) {
      setCashedOutCount(cashedOutCount + 1);
      RosiGameAnimationController.doCashedOutAnimation(
        cashedOut[cashedOut.length - 1]
      );
    }
  }, [animationReady, gameStarted, cashedOut]);

  return (
    <div className={styles.animation}>
      <canvas
        className={styles.canvas}
        id="rosi-game-animation"
        ref={canvasRef}
      />
      {isPreparingRound ? (
        <div className={styles.preparingRound}>
          <div>
            <h2 className={styles.title}>Preparing Round</h2>
            <div className={styles.description}>
              Starting in <Counter number={secondsUntilNextGame} />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(styles.timer, {
            [styles.flashAnimation]: !gameStarted,
          })}
        >
          {gameStarted ? (
            <Timer pause={!gameStarted} startTimeMs={timerStartTime} />
          ) : (
            <span>{lastCrashValue.toFixed(2)}</span>
          )}
          x
        </div>
      )}
    </div>
  );
};

export default RosiGameAnimation;
