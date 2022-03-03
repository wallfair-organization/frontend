import { TOKEN_NAME } from 'constants/Token';
import { currencyDisplay } from 'helper/Currency';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserBet } from '../../store/selectors/rosi-game';
import { calcCrashFactorFromElapsedTime } from './canvas/utils';

const Timer = ({ currency = TOKEN_NAME, startTimeMs, showIncome = false }) => {
  const bet = useSelector(selectUserBet);
  const [factor, setFactor] = useState(0);

  useEffect(() => {
    const intervalTime = 100;
    let intervalId;

    const tick = () => {
      let now = Date.now();
      const diff = now - startTimeMs;
      const newFactor = calcCrashFactorFromElapsedTime(diff < 1 ? 1 : diff);
      setFactor(newFactor);
    };

    intervalId = setInterval(tick, intervalTime);

    return () => clearInterval(intervalId);
  }, []);

  function renderProfit() {
    if (!bet || !bet.amount)
      return <span className={'empty'}>+ 0 {currencyDisplay(currency)}</span>;
    const profit = (bet.amount * factor).toFixed(0);
    if (profit > 0) {
      return (
        <span className={'positive'}>
          + {profit} {currencyDisplay(currency)}
        </span>
      );
    }
    if (profit === 0) {
      return (
        <span className={'zero'}>
          {profit} {currencyDisplay(currency)}
        </span>
      );
    }
    if (profit < 0) {
      return (
        <span className={'negative'}>
          - {profit} {currencyDisplay(currency)}
        </span>
      );
    }
    return <span className={'empty'}>+ 0 {currencyDisplay(currency)}</span>;
  }

  return showIncome ? (
    renderProfit()
  ) : (
    <span>{factor <= 0 ? 1.0 : factor}</span>
  );
};

export default Timer;
