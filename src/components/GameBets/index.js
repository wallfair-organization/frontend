import { nanoid } from 'nanoid';
import { TOKEN_NAME } from '../../constants/Token';
import styles from './styles.module.scss';

const formatAmount = amount => amount.toFixed(0);

const calculateTotal = bets => {
  return bets.reduce((total, bet) => total + bet.amount, 0);
};

const GameBets = ({ label, bets, cashedOut }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{label}</div>
      <div className={styles.total}>
        <div className={styles.label}>Total</div>
        <div className={styles.value}>
          {formatAmount(calculateTotal(bets))} {TOKEN_NAME}
        </div>
      </div>
      <div className={styles.bets}>
        {bets.map(bet => (
          <div key={nanoid()} className={styles.bet}>
            <div className={styles.user}>{bet.username}</div>
            <div>
              {cashedOut ? (
                <span className={styles.crashFactor}>{bet.crashFactor}</span>
              ) : null}
              <span className={styles.amount}>
                {formatAmount(bet.amount)} {TOKEN_NAME}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBets;
