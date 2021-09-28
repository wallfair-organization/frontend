import { useEffect, useState } from 'react';

// [fromFactor, toFactor, timeMs]
const intervals = [
  [1.0, 2.49, 4000],
  [2.5, 4.99, 3000],
  [5.0, 7.49, 2000],
  [7.5, 10, 1000],
];

const Timer = ({ startTimeMs }) => {
  const [count, setCount] = useState(0);
  const [[iteration, cachedLastTime, cachedLastDelay], setIteration] = useState(
    [0, 0, 0]
  );
  const frameDuration = 1000 / 60;

  // useEffect(() => {
  //   const [countFrom, countTo, duration] = intervals[iteration];
  //   const totalFrames = Math.round(duration / frameDuration);

  //   let frame = 0;
  //   let lastTime = Date.now();
  //   const counter = setInterval(() => {
  //     const now = Date.now();
  //     console.log(now - lastTime);

  //     frame++;
  //     const progress = frame / totalFrames;
  //     setCount(countFrom + (countTo - countFrom) * progress);

  //     if (frame === totalFrames) {
  //       clearInterval(counter);
  //       if (iteration < intervals.length) {
  //         setIteration(i => i + 1);
  //       }
  //     }
  //   }, frameDuration);

  //   return () => clearInterval(counter)
  // }, [iteration]);

  useEffect(() => {
    const [countFrom, countTo, duration] = intervals[iteration];
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    let lastTime;
    let lastDelay = frameDuration;
    let timeoutId;

    const tick = () => {
      let now = Date.now();
      let timeDiff = now - lastTime;

      lastTime = now;
      lastDelay = frameDuration + lastDelay - timeDiff;
      timeoutId = setTimeout(tick, lastDelay);

      frame++;
      const progress = frame / totalFrames;
      setCount(countFrom + (countTo - countFrom) * progress);

      if (frame === totalFrames) {
        clearTimeout(timeoutId);
        if (iteration < intervals.length - 1) {
          setIteration(([i]) => [i + 1, lastTime, lastDelay]);
        }
      }
    };

    // compensate for WS "latency", very approximate, not sure if really needed
    const startDelay =
      ((Date.now() - new Date(startTimeMs).getTime()) / 1000) * 2;

    setTimeout(() => {
      lastTime = cachedLastTime > 0 ? cachedLastTime : Date.now();
      lastDelay = cachedLastDelay > 0 ? cachedLastDelay : frameDuration;
      timeoutId = setTimeout(tick, frameDuration);
    }, startDelay);

    return () => clearTimeout(timeoutId);
  }, [iteration, cachedLastTime, cachedLastDelay]);

  // useEffect(() => {
  //   const intervalTime = 10;
  //   let lastTime = Date.now();
  //   let lastDelay = intervalTime;
  //   let timeoutId;

  //   const tick = () => {
  //     let now = Date.now();
  //     let timeDiff = now - lastTime;

  //     lastTime = now;
  //     lastDelay = intervalTime + lastDelay - timeDiff;
  //     timeoutId = setTimeout(tick, lastDelay);

  //     // console.log(((lastTime - startTime.getTime()) * TIME_TO_FACTOR_RATIO) / 1000 + 1);
  //     // console.log((now - lastDelay) - startTime.getTime());
  //     // setElapsed(now - startTime.getTime());
  //     const elapsed = now - startTime.getTime();
  //     const factor = (elapsed / 1000) * TIME_TO_FACTOR_RATIO + START_FACTOR;
  //     onUpdate(factor);
  //     setFactor(factor);
  //   };

  //   timeoutId = setTimeout(tick, intervalTime);

  //   return () => clearTimeout(timeoutId);
  // }, []);

  return <span>{count.toFixed(2)}</span>;
};

export default Timer;
