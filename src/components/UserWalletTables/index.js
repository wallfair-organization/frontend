import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import BetTable from './tables/BetTable';
import DepositTable from './tables/DepositTable';
import WithDrawalsTable from './tables/WithDrawalsTable';
import OnRampTable from './tables/OnRampTable';
import CryptosTable from './tables/CryptosTable';

const UserWalletTables = ({ className, type = 'DEPOSITS', rowData, isError }) => {

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
      default:
        return renderDepositTableRows(rowData[type]);
    }
  };
  return renderTableRows(type);
};

export default UserWalletTables;
