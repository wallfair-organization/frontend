import { useEffect, useState } from 'react';

// Crash factor = (elapsed time) * TIME_TO_FACTOR_RATIO
const TIME_TO_FACTOR_RATIO = 0.1; // 1s = 0.1x
const START_FACTOR = 1;

function calcCrashFactorFromElapsedTime(timeDiff) {
  var offsetTime = 0;
  var offsetFactor = 0;
  var speed = 0;

  if (timeDiff > 0 && timeDiff < 18000) {
    offsetTime = 0;
    offsetFactor = 1;
    speed = 120;
    //speed: 18000/150 => 120 per 0.01 increment
  }
  if (timeDiff >= 18000 && timeDiff < 18000 + 25000) {
    offsetTime = 18000;
    offsetFactor = 2.5;
    speed = 100; //speed: 25000/250 => 100 per 0.01 increment
  }
  if (timeDiff >= 18000 + 25000 && timeDiff < 18000 + 25000 + 15000) {
    offsetTime = 18000 + 25000;
    offsetFactor = 5;
    speed = 60; //speed: 15000/250 => 60 per 0.01 increment
  }
  if (
    timeDiff >= 18000 + 25000 + 15000 &&
    timeDiff <= 18000 + 25000 + 15000 + 10000
  ) {
    offsetTime = 18000 + 25000 + 15000;
    offsetFactor = 7.5;
    speed = 40; //speed: 10000/250 => 40 per 0.01 increment
  }

  return (((timeDiff - offsetTime) / speed) * 0.01 + offsetFactor).toFixed(2); //currentCrashFactor
}

const Timer = ({ startTimeMs }) => {
  const startTime = new Date(startTimeMs);
  const [factor, setFactor] = useState(0);

  useEffect(() => {
    const intervalTime = 10;
    let intervalId;

    const tick = () => {
      let now = Date.now();

      setFactor(calcCrashFactorFromElapsedTime(now - startTime.getTime()));
    };

    intervalId = setInterval(tick, intervalTime);

    return () => clearTimeout(intervalId);
  }, []);

  return <span>{factor}</span>;
};

export default Timer;
