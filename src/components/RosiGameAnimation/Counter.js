import { useEffect, useState } from 'react';

const Counter = ({ number }) => {
  const [seconds, setSeconds] = useState(number);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(prevSeconds => Math.max(prevSeconds - 1, 0));
      }, 1000);
    }
  }, [seconds]);

  useEffect(
    () => () => {
      setSeconds(0);
    },
    []
  );

  return <span>{seconds < 10 ? `${0}${seconds}` : seconds}</span>;
};

export default Counter;
