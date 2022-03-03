import styles from './styles.module.scss';
import BetTable from './tables/BetTable';
import DepositTable from './tables/DepositTable';
import WithDrawalsTable from './tables/WithDrawalsTable';
import OnRampTable from './tables/OnRampTable';
import CryptosTable from './tables/CryptosTable';
import TradesTable from './tables/TradesTable';

const UserWalletTables = ({ type = 'DEPOSITS', rowData, isError, refresh }) => {

  if(isError) {
      return (
        <div className={styles.noEntries}>
            <span>Error fetching transactions</span>
        </div>
      );
  }

  const renderDepositTableRows = (depositTableRows) => {
    return <DepositTable depositRows={depositTableRows} />;
  };
  const renderWithDrawalsTableRows = (depositTableRows) => {
    return <WithDrawalsTable renderRow={depositTableRows} />;
  };
  const renderBetsTableRows = (betTabelRows) => {
    return <BetTable renderRow={betTabelRows} />;
  };
  const renderOnRampTableRows = (betTabelRows) => {
    return <OnRampTable renderRow={betTabelRows} />;
  };
  const renderCryptosTableRows = (cryptosRows) => {
    return <CryptosTable renderRow={cryptosRows} />;
  };
  const renderTradeRows = (tradeRows) => {
    return (
      <TradesTable
        tradeRows={tradeRows}
        allowCashout={type !== 'TRADE_HISTORY'}
        refresh={refresh}
      />
    );
  }

  const renderTableRows = (type) => {
    switch (type) {
      case 'DEPOSITS':
        return renderDepositTableRows(rowData[type]);
      case 'WITHDRAWALS':
        return renderWithDrawalsTableRows(rowData[type]);
      case 'BETS':
        return renderBetsTableRows(rowData[type]);
      case 'ONRAMP':
        return renderOnRampTableRows(rowData[type]);
      case 'CRYPTO':
        return renderCryptosTableRows(rowData[type]);
      case 'OPEN_TRADES':
      case 'TRADE_HISTORY':
        return renderTradeRows(rowData[type]);
      default:
        return renderDepositTableRows(rowData[type]);
    }
  };
  return renderTableRows(type);
};

export default UserWalletTables;
