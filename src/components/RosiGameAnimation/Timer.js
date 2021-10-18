import { TOKEN_NAME } from 'constants/Token';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserBet } from '../../store/selectors/rosi-game';
import { calcCrashFactorFromElapsedTime } from './canvas/utils';

const Timer = ({ startTimeMs, showIncome = false }) => {
  const bet = useSelector(selectUserBet);
  const [factor, setFactor] = useState(0);

  useEffect(() => {
    const intervalTime = 10;
    let intervalId;

    const tick = () => {
      let now = Date.now();
      const diff = now - startTimeMs;
      setFactor(calcCrashFactorFromElapsedTime(diff < 1 ? 1 : diff));
    };

    intervalId = setInterval(tick, intervalTime);

    return () => clearTimeout(intervalId);
  }, []);

  function renderProfit() {
    if (!bet || !bet.amount)
      return <span className={'empty'}>+ 0 {TOKEN_NAME}</span>;
    const profit = (bet.amount * factor).toFixed(0);
    if (profit > 0) {
      return (
        <span className={'positive'}>
          + {profit} {TOKEN_NAME}
        </span>
      );
    }
    if (profit === 0) {
      return (
        <span className={'zero'}>
          {profit} {TOKEN_NAME}
        </span>
      );
    }
    if (profit < 0) {
      return (
        <span className={'negative'}>
          - {profit} {TOKEN_NAME}
        </span>
      );
    }
    return <span className={'empty'}>+ 0 {TOKEN_NAME}</span>;
  }

  return showIncome ? (
    renderProfit()
  ) : (
    <span>{factor <= 0 ? 1.0 : factor}</span>
  );
};

export default Timer;
