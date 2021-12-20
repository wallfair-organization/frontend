import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Grid from '@material-ui/core/Grid';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import { connect, useSelector } from 'react-redux';
import { selectUser } from 'store/selectors/authentication';
import { formatToFixed } from 'helper/FormatNumbers';
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../../components//Popup/PopupTheme';
import { RosiGameActions } from 'store/actions/rosi-game';
import TabOptions from 'components/TabOptions';
import useRosiData from 'hooks/useRosiData';
import UserWalletTables from 'components/UserWalletTables';
import classNames from 'classnames';
import { useWeb3React } from '@web3-react/core';

import Loader from 'components/Loader/Loader';
import { WallfairActions } from 'store/actions/wallfair';
import { TransactionActions } from 'store/actions/transaction';
import Button from 'components/Button';
import {ReactComponent as WalletCoins} from 'data/images/wallet-coins.svg'
import * as ApiUrls from 'constants/Api';

const UserWallet = ({
  tags,
  setOpenDrawer,
  fetchTags,
  showPopup,
  events,
  refreshHighData,
  refreshLuckyData,
  connected,
  user,
  refreshMyBetsData,
  showWalletBuyWfairPopup,
  showRequestTokenPopup,
  resetState,
  setStakes,
  setHistory,
  fetchWalletTransactions,
  isTransactionsFetchLoading,
  isTransactionsFetchError,
  transactions,
  showWithdrawPopup,
}) => {
  const { active, library, account, chainId } = useWeb3React();

  const { balance, currency } = useSelector(selectUser);
  const signer = library?.getSigner();
  const [stakesLoading, setStakesLoading] = useState(true);

  const { myBetsData } = useRosiData();
  const [userKyc, setUserKyc] = useState({...user?.kyc});

  const activityData = {
    DEPOSITS: transactions.deposit || [],
    WITHDRAWALS: transactions.withdraw || [],
    ONRAMP: transactions.onramp || [],
    CRYPTO: transactions.crypto || [],
    BETS: myBetsData ? myBetsData : [],
  };

  const activityDataMap = {
    'FIAT DEPOSITS': 'ONRAMP',
    'WFAIR DEPOSITS': 'DEPOSITS',
    WITHDRAWALS: 'WITHDRAWALS',
    BETS: 'BETS',
    'CRYPTO DEPOSITS': 'CRYPTO',
  };

  const [activityTab, setActivityTab] = useState({
    // name: 'FIAT DEPOSITS',
    name: 'WFAIR DEPOSITS',
    index: 1,
  });
  const [activityTabOptions, setActivityTabOptions] = useState([
    { name: 'FIAT DEPOSITS', index: 0 },
    { name: 'WFAIR DEPOSITS', index: 1 },
    { name: 'CRYPTO DEPOSITS', index: 2 },
    { name: 'WITHDRAWALS', index: 3 },
  ]);

  const handleActivitySwitchTab = ({ index }) => {
    setActivityTab(activityTabOptions[index]);
  };

  useEffect(() => {
    resetState();
  }, [account, active, resetState]);

  useEffect(() => {
    refreshMyBetsData({ userId: user.userId });
    if (user.userId) {
      setActivityTabOptions([
        { name: 'FIAT DEPOSITS', index: 0 },
        { name: 'WFAIR DEPOSITS', index: 1 },
        { name: 'CRYPTO DEPOSITS', index: 2 },
        { name: 'WITHDRAWALS', index: 3 },
        { name: 'BETS', index: 4 },
      ]);
    }
    setUserKyc(user?.kyc);
  }, [connected, refreshMyBetsData, user]);

  useEffect(() => {
    fetchWalletTransactions();
  }, [fetchWalletTransactions, balance]);

  useEffect(() => {
    isTransactionsFetchError ? setStakesLoading(false) : setStakesLoading(true);
  }, [isTransactionsFetchError]);

  const isKycStarted = () => userKyc && userKyc.status;

  const isKycVerified = () => userKyc && userKyc.status === 'approved';

  const showStartButton = () => !isKycStarted() || userKyc.status === 'error' || userKyc.status === 'rejected';

  const openFractal = () => {
    const kycUrl = ApiUrls.BACKEND_URL + ApiUrls.KYC_START_FOR_USER.replace(':userId', user.userId);
    window.open(kycUrl, "fractal", "width=480,height=700,top=150,left=150");
  }
  const showNewFeatures = process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true';
  const renderCategoriesAndLeaderboard = () => {
    return (
      <div className={styles.activities}>
        <Grid item xs={12}>
          <div className={styles.activityWrapper}>
            <TabOptions
              options={
                activityTabOptions
                  ? activityTabOptions.filter(
                      ({ name }) => (showNewFeatures || (name !== 'CRYPTO DEPOSITS')) && (name !== 'FIAT DEPOSITS') //when fiat on ramp is activated, remove the second condition part
                    )
                  : []
              }
              className={styles.tabLayout}
            >
              {(option) => {
                const count = activityData[activityDataMap[option.name]].length;

                return (
                  <div
                    className={classNames(
                      styles.headerTables,
                      option.index === activityTab.index
                        ? styles.tabItemSelected
                        : styles.tabItem
                    )}
                    onClick={() => handleActivitySwitchTab(option)}
                    data-item-count={String(count)}
                  >
                    {option.name}
                  </div>
                );
              }}
            </TabOptions>

            <div className={styles.activityContainer}>
              {isTransactionsFetchLoading ? (
                <Loader />
              ) : (
                <UserWalletTables
                  type={activityDataMap[activityTab.name]}
                  rowData={activityData}
                  isError={isTransactionsFetchError}
                />
              )}
            </div>
          </div>
        </Grid>
      </div>
    );
  };

  const renderCurrentBalanceSection = () => {
    const balanceFixed = formatToFixed(balance, 0, true);
    let fontStyling = styles.font50;

    if (balanceFixed.length > 18) {
      fontStyling = styles.font20;
    } else if (balanceFixed.length > 13) {
      fontStyling = styles.font30;
    }
    return (
      <div className={styles.currentBalanceSection}>
        <Grid container alignContent="center" justifyContent="center">
          <Grid className={styles.balanceCard} container justifyContent="flex-end" item lg={6} md={6} xs={12}>
            <div className={styles.currentBlanceCard}>
              <h2>Welcome to your Alpacasino wallet!</h2>
              <p className={styles.welcome}>
                You are in the right place to check your current balance, 
                add WFAIR into your wallet, or withdraw your tokens. If you 
                have any questions about your wallet or its functionality, 
                please get in touch with our <span onClick={() => {window.fcWidget.open()}}>Support</span>!
              </p>
              <p className={styles.currentbalanceHeading}>Current balance:</p>
              <p
                className={classNames(styles.currentbalanceWFair, fontStyling)}
              >
                {balanceFixed} {' '} {currency}
              </p>
              <WalletCoins />
            </div>
          </Grid>

          <Grid
            className={styles.balanceCard}
            container
            justifyContent="flex-start"
            item
            lg={6}
            md={6}
            xs={12}
          >
            <div className={styles.currentBlanceDiscription}>
              <div className={styles.buttonContainer}>
                {/* <p className={styles.label}>To add or withdraw WFAIR select one of the options below</p> */}
                <p className={styles.label}>Need WFAIR to play? No problem.</p>
                <Button
                  className={styles.button}
                  onClick={showWalletBuyWfairPopup}
                >
                  Add WFAIR!
                </Button>
                <p className={styles.label}>Want to withdraw WFAIR? No problem.</p>
                <Button
                  className={styles.button}
                  disabled={!isKycVerified()}
                  disabledWithOverlay={false}
                  onClick={showWithdrawPopup}
                >
                  Withdraw
                </Button>
              </div>
              {
                showStartButton() && (
                  <div className={styles.buttonContainer}>
                  <p className={styles.label}>
                    Enable the full functionality of your account in 30 seconds! Complete our verification process now, and you will be able to withdraw your funds and add an unlimited amount of WFAIR.
                  </p>
                  <Button
                    className={styles.button}
                    onClick={openFractal}
                  >
                    Complete Verification!
                  </Button>
                </div>
                )
              }
              <div className={styles.buttonContainer}>
                <p className={styles.label}>In case of any questions please <span onClick={() => {window.fcWidget.open()}}>click here</span> to contact our Support.</p>
              </div>
              {/* <div className={styles.buttonContainer}>
                <p className={styles.label}>Start the verification</p>
                <Button
                  className={styles.button}
                  // onClick={showRequestTokenPopup}
                >
                  Request test tokens
                </Button>
              </div> */}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  const renderStatusTableSection = () => {};

  return (
    <BaseContainerWithNavbar>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {renderCurrentBalanceSection()}
          {renderStatusTableSection()}
          {renderCategoriesAndLeaderboard()}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.event.tags,
    events: state.event.events,
    connected: state.websockets.connected,
    user: state.authentication,
    isTransactionsFetchLoading: state.transaction.walletTransactions.isLoading,
    isTransactionsFetchError: state.transaction.walletTransactions.isError,
    transactions: state.transaction.walletTransactions.transactions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => dispatch(WallfairActions.resetState()),
    setHistory: (lockAddress, dataArray) =>
      dispatch(
        WallfairActions.setHistory({
          lock: lockAddress,
          data: dataArray,
        })
      ),
    setStakes: (lockAddress, amounts, timestamps) =>
      dispatch(
        WallfairActions.setStakes({
          lock: lockAddress,
          data: [...amounts, ...timestamps],
        })
      ),
    refreshMyBetsData: data => dispatch(RosiGameActions.fetchMyBetsData(data)),
    showWithdrawPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletWithdraw }));
    },
    showWalletBuyWfairPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletBuyWfair }));
    },
    showRequestTokenPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.requestTokens }));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UserWallet));
