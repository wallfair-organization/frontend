import { useEffect, useState } from 'react';

const Counter = ({ number }) => {
  const [seconds, setSeconds] = useState(number);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(prevSeconds => Math.max(prevSeconds - 0.01, 0).toFixed(2));
      }, 10);
    }
  }, [seconds]);

  useEffect(
    () => () => {
      setSeconds(0);
    },
    []
  );

  return <span>{seconds < 10 ? `${seconds}` : seconds}</span>;
};

export default Counter;
