import classNames from 'classnames';
import Icon from '../Icon';
import { connect, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import MenuItem from '../MenuItem';
import { useEffect, useState } from 'react';
import WalletBalance from '../WalletBalance';
import useTransactions from 'hooks/useTransactions';
import { selectUser } from 'store/selectors/authentication';
import { BetActions } from 'store/actions/bet';
import { TransactionActions } from 'store/actions/transaction';
import MyTrades from 'components/MyTrades';
import navbarStyle from '../Navbar/styles.module.scss';
import TransactionHistory from '../TransactionHistory';
import PartyIcon from '../../data/icons/party.svg';
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';

const Wallet = ({
  show,
  close,
  fetchOpenBets,
  fetchTradeHistory,
  fetchTransactions,
  showRequestTokenPopup,
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
  const [displayRequestTokens, setDisplayRequestTokens] = useState(false);

  const { currency, balance } = useSelector(selectUser);
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

  useEffect(() => {
    setDisplayRequestTokens(balance < 5000);
  }, [balance]);

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
        <h2 className={styles.walletHeading}>
          {heading}
          {displayRequestTokens && (
            <div
              className={styles.requestTokens}
              onClick={showRequestTokenPopup}
            >
              <span>Request Tokens</span>
              <img className={styles.party} src={PartyIcon} />
            </div>
          )}
        </h2>
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
            <TransactionHistory
              transactions={transactions}
              currency={currency}
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
    showRequestTokenPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.requestTokens }));
    },
  };
};

export default connect(null, mapDispatchToProps)(Wallet);
