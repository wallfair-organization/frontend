import classNames from 'classnames';
import Icon from '../Icon';
import { connect, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import MenuItem from '../MenuItem';
import { useEffect, useState } from 'react';
import TwoColumnTable from 'components/TwoColumnTable';
import moment from 'moment';
import WalletBalance from '../WalletBalance';
import useTransactions from 'hooks/useTransactions';
import { selectUser } from 'store/selectors/authentication';
import { formatToFixed } from 'helper/FormatNumbers';
import { BetActions } from 'store/actions/bet';
import { TransactionActions } from 'store/actions/transaction';
import MyTrades from 'components/MyTrades';
import navbarStyle from '../Navbar/styles.module.scss';

const Wallet = ({
  show,
  close,
  fetchOpenBets,
  fetchTradeHistory,
  fetchTransactions,
}) => {
  const menus = {
    wallet: 'wallet',
    transactionHistory: 'transactionHistory',
    referrals: 'referrals',
  };

  const closeDrawer = () => {
    setOpenMenu(menus.wallet);
    close();
  };

  const [openMenu, setOpenMenu] = useState(menus.wallet);

  const { currency } = useSelector(selectUser);
  const { transactions, transactionCount } = useTransactions();

  const isOpen = page => openMenu === page;

  useEffect(() => {
    if (show) {
      fetchOpenBets();
      fetchTradeHistory();
      fetchTransactions();
    } else {
      setOpenMenu(menus.wallet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const backButton = () => (
    <Icon
      className={styles.backButton}
      iconType={'arrowTopRight'}
      onClick={() => setOpenMenu(menus.wallet)}
    />
  );

  const walletContainerWrapper = (
    open,
    heading,
    contents,
    isFirstPanel = false
  ) => {
    return (
      <div
        className={classNames(
          styles.panel,
          !open && styles.panelHidden,
          isFirstPanel && styles.firstPanel
        )}
      >
        <h2 className={styles.walletHeading}>{heading}</h2>
        <div className={styles.walletContents}>{contents}</div>
      </div>
    );
  };

  const onTransactionsClick = () => {
    setOpenMenu(menus.transactionHistory);
  };

  return (
    <div
      className={classNames(
        styles.wallet,
        styles.drawer,
        !show && styles.drawerHidden
      )}
    >
      <div className={classNames(navbarStyle.drawerContent)}>
        <div className={styles.menuContainer}>
          {walletContainerWrapper(
            isOpen(menus.wallet),
            'My Wallet',
            <>
              <WalletBalance />

              <MenuItem
                classes={[styles.transactionHistory]}
                label={`Transaction History (${transactionCount})`}
                icon={
                  <Icon className={styles.optionIcon} iconType={'activities'} />
                }
                onClick={() => onTransactionsClick()}
              />

              <div className={styles.myTradesContainer}>
                <MyTrades close={closeDrawer} />
              </div>
            </>,
            true
          )}

          {walletContainerWrapper(
            isOpen(menus.transactionHistory),
            <>
              {backButton()}
              Transaction History
            </>,
            <TwoColumnTable
              headings={['Latest transactions', currency]}
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
                    direction === 'PAYOUT'
                      ? outcomeTokensBought
                      : investmentAmount;
                  return [
                    type === 'BET' ? (
                      <>
                        <span className={styles.primaryData}>
                          {event?.name}
                        </span>
                        <span className={styles.secondaryData}>
                          {bet?.marketQuestion}
                        </span>
                      </>
                    ) : (
                      <span className={styles.primaryData}>Casino Game</span>
                    ),
                    <>
                      <span className={styles[direction.toLowerCase()]}>
                        {formatToFixed(tokenAmount, 2, true)}
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
          )}
        </div>
        <Icon
          iconType={'cross'}
          onClick={closeDrawer}
          className={styles.closeButton}
        />
      </div>
      <div className={navbarStyle.drawerBackdropBg}></div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOpenBets: () => {
      dispatch(BetActions.fetchOpenBets());
    },
    fetchTransactions: () => {
      dispatch(TransactionActions.fetchAll());
    },
    fetchTradeHistory: () => {
      dispatch(BetActions.fetchTradeHistory());
    },
  };
};

export default connect(null, mapDispatchToProps)(Wallet);
