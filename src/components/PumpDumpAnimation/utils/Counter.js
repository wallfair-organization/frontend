import { useEffect, useState } from 'react';

const Counter = ({ from, className }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const fromTime = new Date(from).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      setTime((fromTime - now) / 1000);
    }, 10);

    return () => clearInterval(interval);
  }, [from]);

  return (
    <span className={className}>
      {time > 0 ? `${Math.max(time.toFixed(2), 0)}` : '0.00'}
    </span>
  );
};

export default Counter;
