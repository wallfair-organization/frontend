import { nanoid } from 'nanoid';
import { TOKEN_NAME } from '../../constants/Token';
import styles from './styles.module.scss';
import classNames from 'classnames';

const formatAmount = amount => (amount ? amount.toFixed(0) : '-'); // TODO: temp solution (sometimes amount is undefined)
const isCashedOut = bets => bets.findIndex(b => b.cashedOut) > -1;

const calculateTotal = (bets, gameRunning, endGame) => {
  if (isCashedOut(bets) && gameRunning) {
    return `+ ${formatAmount(
      bets
        .filter(b => b.cashedOut)
        .reduce((total, bet) => total + bet.amount, 0)
    )}`;
  }
  if (endGame && isCashedOut(bets)) {
    return `+ ${formatAmount(
      bets
        .filter(b => b.cashedOut)
        .reduce((total, bet) => total + bet.amount, 0)
    )}`;
  }
  if (endGame && !isCashedOut(bets)) {
    return 0;
  }
  return formatAmount(bets.reduce((total, bet) => total + bet.amount, 0));
};

const renderValue = (bet, gameRunning, endGame) => {
  if (gameRunning && !bet.cashedOut) {
    return formatAmount(bet.amount);
  }
  if (bet.cashedOut) {
    return `+ ${formatAmount(bet.amount)}`;
  }
  if (endGame && !bet.cashedOut) {
    return `- ${formatAmount(bet.amount)}`;
  }
  return formatAmount(bet.amount);
};

const Bet = ({ cashedOut, bet, gameRunning, endGame }) => {
  return (
    <div
      className={classNames({
        [styles.bet]: true,
        [styles.flash]: bet.isFresh && !cashedOut,
        [styles.flashGreen]: bet.isFresh && cashedOut,
        [styles.endGame]: endGame,
        [styles.cashed]: cashedOut && endGame,
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
            [styles.negative]: endGame && !cashedOut,
          })}
        >
          {renderValue(bet, gameRunning, endGame)} {TOKEN_NAME}
        </span>
        <div className={styles.coin}></div>
      </div>
    </div>
  );
};

const GameBets = ({ bets, endGame, gameRunning }) => {
  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <div className={styles.label}>Total</div>
        <div
          className={classNames({
            [styles.value]: true,
            [styles.positive]: isCashedOut(bets) && (gameRunning || endGame),
          })}
        >
          {calculateTotal(bets, gameRunning, endGame)} {TOKEN_NAME}
        </div>
      </div>
      <div className={styles.bets}>
        {bets
          .map(b => ({ ...b, updatedAt: b.updatedAt || 0 }))
          .sort((b1, b2) => b2.amount - b1.amount)
          .map(bet => (
            <Bet
              bet={bet}
              endGame={endGame}
              cashedOut={bet.cashedOut}
              key={nanoid()}
            />
          ))}
      </div>
    </div>
  );
};

export default GameBets;
