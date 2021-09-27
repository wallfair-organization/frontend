import { useEffect, useState } from 'react';

// Crash factor = (elapsed time) * TIME_TO_FACTOR_RATIO
const TIME_TO_FACTOR_RATIO = 0.5; // 1s = 0.5x
const START_FACTOR = 1;

const Timer = ({ pause, startTimeMs }) => {
  const startTime = new Date(startTimeMs);
  const [elapsed, setElapsed] = useState(startTime.getTime());
  const elapsedSeconds = (elapsed * TIME_TO_FACTOR_RATIO) / 1000 + START_FACTOR;
  const wholePart = Math.trunc(elapsedSeconds);
  // round up decimal part to the previous multiple of 5. So it would count 40, 45, 50, 55 ...
  const decimalPart = Math.floor(
    (elapsedSeconds - Math.floor(elapsedSeconds)) * 100
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (pause) {
        return;
      }

      setElapsed(e => e + 10);
    }, 10);

    return () => clearInterval(interval);
  }, [pause]);

  return (
    <span>
      {wholePart}.{decimalPart < 10 ? `0${decimalPart}` : decimalPart}
    </span>
  );
};

export default Timer;
