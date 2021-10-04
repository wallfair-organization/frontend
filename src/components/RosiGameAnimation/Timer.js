import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserBet } from '../../store/selectors/rosi-game';
import { calcCrashFactorFromElapsedTime } from './canvas/utils';

// Crash factor = (elapsed time) * TIME_TO_FACTOR_RATIO
const TIME_TO_FACTOR_RATIO = 0.1; // 1s = 0.1x
const START_FACTOR = 1;

const Timer = ({ startTimeMs, showIncome = false }) => {
  const startTime = new Date(startTimeMs);
  const bet = useSelector(selectUserBet);
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

  function renderProfit() {
    if (!bet || !bet.amount) return null;
    const profit = (bet.amount * factor).toFixed(0);
    if (profit > 0) {
      return <span className={'positive'}>+ {profit} WFAIR</span>;
    }
    if (profit === 0) {
      return <span className={'zero'}>{profit} WFAIR</span>;
    }
    if (profit < 0) {
      return <span className={'negative'}>- {profit} WFAIR</span>;
    }
    return null;
  }

  return showIncome ? (
    renderProfit()
  ) : (
    <span>{factor <= 0 ? 1.0 : factor}</span>
  );
};

export default Timer;
