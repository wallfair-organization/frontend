import moment from 'moment';
import TwoColumnTable from 'components/TwoColumnTable';
import styles from './styles.module.scss';
import { formatToFixed } from 'helper/FormatNumbers';

const TransactionHistory = ({ currency, transactions, showHeader = true }) => {
  const headings = showHeader ? ['Latest transactions', currency] : [];
  return (
    <TwoColumnTable
      headings={headings}
      rows={transactions.map(
        ({
          event,
          bet,
          direction,
          trx_timestamp,
          outcomeTokensBought,
          investmentAmount,
          type,
        }) => {
          const tokenAmount =
            direction === 'PAYOUT' ? outcomeTokensBought : investmentAmount;
          return [
            type === 'BET' ? (
              <>
                <span className={styles.primaryData}>{event?.name}</span>
                <span className={styles.secondaryData}>
                  {bet?.marketQuestion}
                </span>
              </>
            ) : (
              <span className={styles.primaryData}>Casino Game</span>
            ),
            <>
              <span className={styles[direction.toLowerCase()]}>
                {formatToFixed(tokenAmount)}
              </span>
              <span className={styles.secondaryData}>
                {moment(trx_timestamp).format('DD.MM.YYYY')}
              </span>
            </>,
          ];
        }
      )}
      noResultMessage={'No transactions yet.'}
    />
  );
};

export default TransactionHistory;
