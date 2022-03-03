import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Grid from '@material-ui/core/Grid';
import BaseContainerWithNavbar from '../../components/BaseContainerWithNavbar';
import { connect, useSelector } from 'react-redux';
import { selectUser } from 'store/selectors/authentication';
import { formatToFixed } from 'helper/FormatNumbers';
import { RosiGameActions } from 'store/actions/rosi-game';
import TabOptions from 'components/TabOptions';
import useRosiData from 'hooks/useRosiData';
import classNames from 'classnames';
import { UserActions } from 'store/actions/user';
import Loader from 'components/Loader/Loader';
import { WallfairActions } from 'store/actions/wallfair';
import Button from 'components/Button';
// import { ReactComponent as WfairIcon } from '../../data/icons/wfair-symbol.svg';

import { getOpenBets, getTradeHistory, resendEmailVerification } from 'api';
import ButtonTheme from 'components/Button/ButtonTheme';
import { TOKEN_NAME } from '../../constants/Token';
import { currencyDisplay } from 'helper/Currency';
import UserWalletTables from 'components/UserWalletTables';
import { claimTokens } from 'api';
import { AlertActions } from 'store/actions/alert';
import GainBanner from 'components/GainBanner';

const PlayMoneyWallet = ({
  user,
  refreshMyBetsData,
  resetState,
  connected,
  isTransactionsFetchLoading,
  isTransactionsFetchError,
  showSuccess,
  showError,
}) => {
  
  const { balance, balances, gamesCurrency } = useSelector(selectUser);
  
  const { myBetsData } = useRosiData();
  
  const [emailSent, setEmailSent] = useState(false);
  const [openTrades, setOpenTrades] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);

  const activityData = {
    BETS: myBetsData ? myBetsData : [],
    OPEN_TRADES: openTrades,
    TRADE_HISTORY: tradeHistory,
  };

  const activityDataMap = {
    BETS: 'BETS',
    'OPEN TRADES': 'OPEN_TRADES',
    'TRADE HISTORY': 'TRADE_HISTORY',
  };

  const fetchTrades = () => {
    getOpenBets().then(res => setOpenTrades(res.data));
    getTradeHistory().then(res => setTradeHistory(res.data));
  }

  const tabOptions = [
    { name: 'OPEN TRADES', index: 0, refresh: fetchTrades },
    { name: 'BETS', index: 1 },
    { name: 'TRADE HISTORY', index: 2, refresh: fetchTrades },
  ];

  const [activityTab, setActivityTab] = useState(tabOptions[0]);

  const [activityTabOptions, setActivityTabOptions] = useState(tabOptions);

  const handleActivitySwitchTab = ({ index }) => {
    setActivityTab(activityTabOptions[index]);
  };

  const handleResendEmailConfirmation = async () => {
    const result = await resendEmailVerification(user.userId);
    const resultOk = result?.data?.status === 'OK';
    console.log('e-mail confirmation sent', result);

    setEmailSent(resultOk);
  };

  const onTokensClaim = () => {
    claimTokens()
      .then((res) => {
        showSuccess('You have successfully claimed 100 PFAIR');
      })
      .catch((e) => {
        showError('You reached the daily limit');
      })
  }

  useEffect(() => {
    resetState();
  }, [resetState]);

  useEffect(() => {
    refreshMyBetsData({ userId: user.userId });
  }, [refreshMyBetsData, user]);

  useEffect(() => {
    fetchTrades();
  }, [balance]);

  // useEffect(() => {
  //   isTransactionsFetchError ? setStakesLoading(false) : setStakesLoading(true);
  // }, [isTransactionsFetchError]);

  const renderStats = () => {
    return (
      <div className={styles.activities}>
        <Grid item xs={12}>
          <div className={styles.activityWrapper}>
            <TabOptions
              options={activityTabOptions}
              className={styles.tabLayout}
            >
              {option => {
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
                  refresh={activityTab.refresh}
                />
              )}
            </div>

          </div>
        </Grid>
      </div>
    );
  };

  const renderCurrentBalanceSection = () => {
    return (
      <div className={styles.currentBalanceSection}>
        <div className={styles.currentBalanceDescription}>
          <div className={styles.currentBalanceCard}>
            <div className={styles.balanceContainer}>
              <div className={styles.leftCard}>
                {/* <WfairIcon
                  className={styles.wfairLogo}
                /> */}
                {balances &&
                  balances.map(b => {
                    return (
                      <div
                        className={styles.balanceTextContainer}
                        key={b.symbol}
                      >
                        <p className={styles.currentbalanceHeading}>
                          {b.symbol === TOKEN_NAME
                            ? 'Current balance:'
                            : 'Bonus balance:'}
                        </p>
                        <div className={styles.balanceBottomContainer}>
                          <p className={styles.currentbalanceWFair}>
                            <span>{formatToFixed(b.balance, 0, true)}</span>
                          </p>
                          <p className={styles.symbolContainer}>
                            {currencyDisplay(b.symbol)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.rightCard}>
                <Button
                  className={classNames(styles.button, styles.buttonDeposit)}
                  onClick={onTokensClaim}
                >
                  Claim PFAIR
                </Button>
                <span className={styles.presentText}>
                  🎁 Claim 100 PFAIR per day!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHowToGainPFAIR = () => {
    return balance < 1 ?
      <div className={styles.currentBalanceSection}>
        <GainBanner showSignup={false} />
      </div>
    :
    null;
  }

  const renderDepositBonusSection = () => {
    return (
      <div className={styles.currentBalanceSection}>
        {!user.emailConfirmed && (
          <Grid
            className={styles.balanceCard}
            item
            lg={12}
            md={12}
            style={{ width: '100%' }}
          >
            <div
              style={{ width: '100%' }}
              className={styles.currentBalanceDescription}
            >
              <div className={styles.currentBalanceCard}>
                <div
                  className={classNames(
                    styles.buttonContainer,
                    styles.rowContainer
                  )}
                >
                  <div>
                    <h2>Verify your e-mail</h2>
                    <p className={styles.label}>
                      In order to activate full functionality of your account,
                      you must verify your email.
                    </p>
                  </div>
                  <Button
                    className={styles.buttonBanner}
                    onClick={handleResendEmailConfirmation}
                    disabled={emailSent}
                    theme={ButtonTheme.alternativeButton}
                  >
                    {!emailSent ? 'Resend Email' : 'Email sent'}
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        )}

        {/* {user.emailConfirmed && showKycBanner() && (
          <Grid
            className={styles.balanceCard}
            item
            lg={12}
            md={12}
            style={{ width: '100%' }}
          >
            <div
              style={{ width: '100%' }}
              className={styles.currentBalanceDescription}
            >
              <div className={styles.currentBalanceCard}>
                <div
                  className={classNames(
                    styles.buttonContainer,
                    styles.rowContainer
                  )}
                >
                  <div>
                    <h2>Verify your identity</h2>
                    <p className={styles.label}>
                      In order to activate full functionality of your account,
                      you must provide a proof-of-identity. To ensure your
                      safety and privacy, we use an external provider for this
                      procedure.
                    </p>
                  </div>
                  <Button
                    className={styles.buttonBanner}
                    onClick={openFractal}
                    theme={ButtonTheme.alternativeButton}
                  >
                    Start
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        )} */}
        
        {/* <Grid
          container
          alignContent="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <Grid className={styles.balanceCard} item lg={4} md={4} xs={12}>
            <div
              className={classNames(
                styles.currentBalanceDescription,
                styles.smallCurrentBalanceDescription
              )}
            >
              <div
                className={classNames(
                  styles.currentBalanceCard,
                  styles.smallCard
                )}
              >
                <div className={styles.buttonContainer}>
                  <h2>Withdraw</h2>
                  <p className={styles.label}>
                    You can withdraw your funds in the casino directly to your
                    wallet. You can then convert your WFAIR to other
                    cryptocurrencies or hold it to have early access to the
                    upcoming utilities.
                  </p>
                  <Button
                    className={styles.button}
                    disabled={!isKycVerified() || !user.emailConfirmed}
                    disabledWithOverlay={false}
                    onClick={showWithdrawPopup}
                    title="Withdraw is only possible after the KYC verification is approved and the e-mail address is confirmed."
                    theme={ButtonTheme.alternativeButton}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid> */}
      </div>
    );
  };

  return (
    <BaseContainerWithNavbar>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.titleSection}>
            <h1>Your Wallet</h1>
          </div>
          {renderCurrentBalanceSection()}
          {renderHowToGainPFAIR()}
          {renderDepositBonusSection()}
          {renderStats()}
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
    tags: state.event.tags,
    events: state.event.events,
    user: state.authentication,
    isTransactionsFetchLoading: state.transaction.walletTransactions.isLoading,
    isTransactionsFetchError: state.transaction.walletTransactions.isError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (userId, preferences) => {
      dispatch(UserActions.updatePreferences({ userId, preferences }));
    },
    resetState: () => dispatch(WallfairActions.resetState()),
    refreshMyBetsData: data => dispatch(RosiGameActions.fetchMyBetsData(data)),
    showSuccess: message => {
      dispatch(AlertActions.showSuccess({ message }));
    },
    showError: message => {
      dispatch(AlertActions.showError({ message }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayMoneyWallet));
