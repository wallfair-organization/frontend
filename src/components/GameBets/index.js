import { nanoid } from 'nanoid';
import { TOKEN_NAME } from '../../constants/Token';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { difference, xor } from 'lodash/array';

const formatAmount = amount => amount.toFixed(0);

const calculateTotal = bets => {
  return bets.reduce((total, bet) => total + bet.amount, 0);
};

const Bet = ({ cashedOut, bet, isNew }) => {
  return (
    <div className={classNames([styles.bet, isNew ? styles.flash : ''])}>
      <div className={styles.user}>{bet.username}</div>
      <div>
        {cashedOut ? (
          <span className={styles.crashFactor}>{bet.crashFactor}</span>
        ) : null}
        <span
          className={classNames([
            styles.amount,
            cashedOut ? styles.positive : '',
          ])}
        >
          {formatAmount(bet.amount)} {TOKEN_NAME}
        </span>
      </div>
    </div>
  );
};

const GameBets = ({ label, bets, cashedOut }) => {
  const [newBets, setNewBets] = useState([]);
  const [oldBets, setOldBets] = useState([]);
  useEffect(() => {
    setNewBets(difference(bets, oldBets));
    const handler = setTimeout(() => {
      setNewBets([]);
      setOldBets(bets);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [bets]);
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
          <Bet
            bet={bet}
            cashedOut={cashedOut}
            key={nanoid()}
            isNew={newBets.includes(bet)}
          ></Bet>
        ))}
      </div>
    </div>
  );
};

export default GameBets;
