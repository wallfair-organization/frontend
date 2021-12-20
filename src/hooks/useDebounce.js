import { useRef, useEffect } from 'react';

const useDebounce = ({ callback = () => {}, delay = 0 }) => {
  const latestCallback = useRef();
  const latestTimeout = useRef();

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  return (val) => {
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current);
    }

    latestTimeout.current = setTimeout(() => {
      latestCallback.current(val);
    }, delay);
  };
};

export default useDebounce;
