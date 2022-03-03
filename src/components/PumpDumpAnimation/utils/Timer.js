import { TOKEN_NAME } from 'constants/Token';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserBet } from '../../store/selectors/rosi-game';
import { calcCrashFactorFromElapsedTime } from  "components/RosiGameAnimation/canvas/utils";
import { currencyDisplay } from 'helper/Currency';

const Timer = ({ startTimeMs, showIncome = false }) => {
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
      return <span className={'empty'}>+ 0 {currencyDisplay(TOKEN_NAME)}</span>;
    const profit = (bet.amount * factor).toFixed(0);
    if (profit > 0) {
      return (
        <span className={'positive'}>
          + {profit} {currencyDisplay(TOKEN_NAME)}
        </span>
      );
    }
    if (profit === 0) {
      return (
        <span className={'zero'}>
          {profit} {currencyDisplay(TOKEN_NAME)}
        </span>
      );
    }
    if (profit < 0) {
      return (
        <span className={'negative'}>
          - {profit} {currencyDisplay(TOKEN_NAME)}
        </span>
      );
    }
    return <span className={'empty'}>+ 0 {currencyDisplay(TOKEN_NAME)}</span>;
  }

  return showIncome ? (
    renderProfit()
  ) : (
    <span>{factor <= 0 ? 1.0 : factor}</span>
  );
};

export default Timer;
