import { useEffect, useState } from 'react';

// Crash factor = (elapsed time) * TIME_TO_FACTOR_RATIO
const TIME_TO_FACTOR_RATIO = 0.5; // 1s = 0.5x
const START_FACTOR = 1;

const Timer = ({ startTimeMs }) => {
  const startTime = new Date(startTimeMs);
  const [elapsed, setElapsed] = useState(0);
  const factor = (elapsed / 1000) * TIME_TO_FACTOR_RATIO + START_FACTOR;

  useEffect(() => {
    const intervalTime = 10;
    let lastTime = Date.now();
    let lastDelay = intervalTime;
    let timeoutId;

    const tick = () => {
      let now = Date.now();
      let timeDiff = now - lastTime;

      lastTime = now;
      lastDelay = intervalTime + lastDelay - timeDiff;
      timeoutId = setTimeout(tick, lastDelay);

      // console.log(((lastTime - startTime.getTime()) * TIME_TO_FACTOR_RATIO) / 1000 + 1);
      // console.log((now - lastDelay) - startTime.getTime());
      setElapsed(now - startTime.getTime());
    };

    timeoutId = setTimeout(tick, intervalTime);

    return () => clearTimeout(timeoutId);
  }, []);

  return <span>{factor.toFixed(2)}</span>;
};

export default Timer;
