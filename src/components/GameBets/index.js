import { nanoid } from 'nanoid';
import { TOKEN_NAME } from '../../constants/Token';
import styles from './styles.module.scss';
import classNames from 'classnames';

const formatAmount = amount => amount.toFixed(0);

const calculateTotal = bets => {
  return bets.reduce((total, bet) => total + bet.amount, 0);
};

const renderValue = (bet, gameRunning) => {
  if (gameRunning && !bet.cashedOut) {
    return formatAmount(bet.amount);
  }
  if (bet.cashedOut) {
    return `+ ${formatAmount(bet.amount * bet.crashFactor)}`;
  }
  if (!gameRunning && !bet.cashedOut) {
    return `${formatAmount(bet.amount)}`;
  }
  return formatAmount(bet.amount);
};

const Bet = ({ cashedOut, bet, gameRunning }) => {
  return (
    <div
      className={classNames({
        [styles.bet]: true,
        [styles.flash]: bet.isFresh && !cashedOut,
        [styles.flashGreen]: bet.isFresh && cashedOut,
        [styles.endGame]: !gameRunning,
        [styles.cashed]: !gameRunning,
      })}
    >
      <div className={styles.user}>{bet.username}</div>
      <div className={styles.rightColumn}>
        {cashedOut ? (
          <span className={styles.crashFactor}>{bet.crashFactor}</span>
        ) : null}
        <span
          className={classNames({
            [styles.amount]: true,
            [styles.positive]: cashedOut,
            [styles.negative]: false,
          })}
        >
          {renderValue(bet, gameRunning)} {TOKEN_NAME}
        </span>
        <div className={styles.coin}></div>
      </div>
    </div>
  );
};

const GameBets = ({ label, bets, cashedOut }) => {
  return (
    <div className={styles.container}>
      {/*<div className={styles.title}>{label}</div>*/}
      <div className={styles.total}>
        <div className={styles.label}>Total</div>
        <div className={styles.value}>
          {formatAmount(calculateTotal(bets))} {TOKEN_NAME}
        </div>
      </div>
      <div className={styles.bets}>
        {bets
          .map(b => ({ ...b, updatedAt: b.updatedAt || 0 }))
          .sort((b1, b2) => b2.amount - b1.amount)
          .map(bet => (
            <Bet bet={bet} cashedOut={bet.cashedOut} key={nanoid()} />
          ))}
      </div>
    </div>
  );
};

export default GameBets;
