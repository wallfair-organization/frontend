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
import useDepositsCounter from 'hooks/useDepositsCounter';
import UserWalletTables from 'components/UserWalletTables';
import classNames from 'classnames';
import { useWeb3React } from '@web3-react/core';

import Loader from 'components/Loader/Loader';
import { WallfairActions } from 'store/actions/wallfair';
import { TransactionActions } from 'store/actions/transaction';
import Button from 'components/Button';
import { ReactComponent as WfairIcon } from '../../data/icons/wfair-symbol.svg';
import {ReactComponent as BitcoinIcon} from '../../data/icons/wallet/bitcoin.svg';
import {ReactComponent as EuroIcon} from '../../data/icons/wallet/euro.svg';
import {ReactComponent as WalletIcon} from '../../data/icons/wallet/wallet.svg';
import { ReactComponent as GreenPathIcon } from '../../data/icons/wallet/green-path.svg';
import {ReactComponent as RightArrow} from '../../data/icons/wallet/right-arrow.svg';

import * as ApiUrls from 'constants/Api';
import { resendEmailVerification } from 'api';
import { trackWalletAddWfair, trackWalletBuyWfair, trackWalletBuyWithCryptoButton, trackWalletBuyWithFiatButton, trackWalletWithdraw } from 'config/gtm';

import Bonus100kDesktop from '../../data/images/deposit/bonus100k-desktop.png'
import Bonus100kMobile from '../../data/images/deposit/bonus100k-mobile.png'
import ButtonTheme from 'components/Button/ButtonTheme';

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
  showWalletDepositPopup,
  showWalletDepositCrypto,
  showWalletDepositFiat,
  showWalletConnectWallet,
}) => {
  const { active, library, account, chainId } = useWeb3React();

  const { balance, currency } = useSelector(selectUser);
  const signer = library?.getSigner();
  const [stakesLoading, setStakesLoading] = useState(true);

  const { myBetsData } = useRosiData();
  const [userKyc, setUserKyc] = useState({...user?.kyc});

  const [emailSent, setEmailSent] = useState(false);

  const depositCount = useDepositsCounter();

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

  const handleResendEmailConfirmation= async () => {
    const result = await resendEmailVerification(user.userId);
    const resultOk = result?.data?.status === "OK";
    console.log('e-mail confirmation sent', result);

    setEmailSent(resultOk);
  }

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

  const showKycBanner = () => !isKycStarted() || userKyc.status === 'error' || userKyc.status === 'rejected';

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
              options={activityTabOptions}
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

    return (
      <div className={styles.currentBalanceSection}>
        <div className={styles.currentBalanceDescription}>
          <div className={styles.currentBalanceCard}>
            <div className={styles.balanceContainer}>
              <div className={styles.leftCard}>
                <WfairIcon
                  className={styles.wfairLogo}
                />
                <div className={styles.balanceTextContainer}>
                  <p className={styles.currentbalanceHeading}>Current balance:</p>
                  <div className={styles.balanceBottomContainer}>
                    <p className={styles.currentbalanceWFair}>
                      <span>{balanceFixed}</span>
                    </p>
                    <p className={styles.symbolContainer}>
                      {currency}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.rightCard}>
                <Button
                  className={classNames(styles.button, styles.buttonDeposit)}
                  onClick={showWalletDepositPopup}
                >
                  Deposit
                </Button>
                <span className={styles.presentText}>🎁 We double your deposit!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderDepositBonusSection = () => {
    return (
      <div className={styles.currentBalanceSection}>
        { depositCount != null && depositCount === 0 &&
          <Grid
            className={styles.balanceCard}
            item
            justifyContent="flex-start"
            lg={12}
            md={12}
          >
            <div className={styles.currentBalanceDescription}>
                <img src={Bonus100kDesktop} className={styles.bonusDesktop} alt="bonus desktop" />
                <img src={Bonus100kMobile} className={styles.bonusMobile} alt="bonus mobile" />
            </div>
          </Grid>
        }
        
        {!user.emailConfirmed &&
          <Grid
            className={styles.balanceCard}
            item
            justifyContent="flex-start"
            lg={12}
            md={12}
            style={{width: "100%"}}
          >
            <div style={{width: "100%"}} className={styles.currentBalanceDescription}>
              <div className={styles.currentBalanceCard}>
                <div className={classNames(styles.buttonContainer, styles.rowContainer)}>
                  <div>
                    <h2>Verify your e-mail</h2>
                    <p className={styles.label}>
                      In order to activate full functionality of your account, you must verify your email.
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
        }

        {user.emailConfirmed && showKycBanner() &&
          <Grid
            className={styles.balanceCard}
            item
            justifyContent="flex-start"
            lg={12}
            md={12}
            style={{width: "100%"}}
          >
            <div style={{width: "100%"}} className={styles.currentBalanceDescription}>
              <div className={styles.currentBalanceCard}>
                <div className={classNames(styles.buttonContainer, styles.rowContainer)}>
                  <div>
                    <h2>Verify your identity</h2>
                    <p className={styles.label}>
                      In order to activate full functionality of your account, you must provide a proof-of-identity. To ensure your safety and privacy, we use an external provider for this procedure.
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
        }
        <Grid container alignContent="center" spacing={1}>
          <Grid
            className={styles.balanceCard}
            item
            lg={4}
            md={4}
            xs={12}
          >
            <div className={classNames(styles.currentBalanceDescription, styles.smallCurrentBalanceDescription)}>
              <div className={classNames(styles.currentBalanceCard, styles.smallCard)}>
                <div className={styles.depositCardContainer} onClick={showWalletDepositCrypto}>
                  <BitcoinIcon/>
                  <p className={styles.depositTitle}>
                    Deposit with Crypto
                  </p>
                  <div className={styles.depositDescriptionSection}>
                    <p className={styles.depositDescription}>
                      Deposit ETH or BTC and start playing <br/>immediately.
                    </p>
                    <RightArrow />
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid
            className={styles.balanceCard}
            item
            justifyContent="flex-start"
            lg={4}
            md={4}
            xs={12}
          >
            <div className={classNames(styles.currentBalanceDescription, styles.smallCurrentBalanceDescription)}>
              <div className={classNames(styles.currentBalanceCard, styles.smallCard)}>
                <div className={styles.depositCardContainer} onClick={showWalletDepositFiat}>
                  <EuroIcon />
                  <p className={styles.depositTitle}>Deposit with EUR / USD</p>
                  <div className={styles.depositDescriptionSection}>
                    <p className={styles.depositDescription}>
                      Deposit EUR or USD to start playing in a<br/> few hours.
                    </p>
                    <RightArrow />
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid
            className={styles.balanceCard}
            item
            justifyContent="flex-start"
            lg={4}
            md={4}
            xs={12}
          >
            <div className={classNames(styles.currentBalanceDescription, styles.smallCurrentBalanceDescription)}>
              <div className={classNames(styles.currentBalanceCard, styles.smallCard)}>
                <div className={styles.depositCardContainer} onClick={showWalletConnectWallet}>
                  <WalletIcon />
                  <p className={styles.depositTitle}>
                    Connect your Wallet
                  </p>
                  <div className={styles.depositDescriptionSection}>
                    <p className={styles.depositDescription}>
                      Connect your existing wallet with WFAIR<br/> your bought and start immediately
                    </p>
                    <RightArrow />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container alignContent="center" spacing={1}>
          {/* <Grid
            className={styles.balanceCard}
            item
            lg={4}
            md={4}
            xs={12}
          >
            <div className={classNames(styles.currentBalanceDescription, styles.smallCurrentBalanceDescription)}>
              <div className={classNames(styles.currentBalanceCard, styles.smallCard)}>
                <div className={styles.buttonContainer}>
                  <h2>Buy WFAIR</h2>
                  <p className={styles.label}>
                    You can buy WFAIR using cryptocurrencies (BTC, ETH, LTC) and regular currencies (EUR, USD, etc.).
                    Your WFAIR is automatically credited in your account.
                  </p>
                  <Button
                    className={styles.button}
                    onClick={showWalletDepositCrypto}
                  >
                    Buy WFAIR
                  </Button>
                </div>
              </div>
            </div>
          </Grid>

          <Grid
            className={styles.balanceCard}
            item
            justifyContent="flex-start"
            lg={4}
            md={4}
            xs={12}
          >
            <div className={classNames(styles.currentBalanceDescription, styles.smallCurrentBalanceDescription)}>
              <div className={classNames(styles.currentBalanceCard, styles.smallCard)}>
                <div className={styles.buttonContainer}>
                  <h2>Deposit WFAIR</h2>
                  <p className={styles.label}>If you already own WFAIR in your wallet, you can connect your wallet and make a direct deposit on the casino.</p>
                  <Button
                    className={styles.button}
                    onClick={showWalletConnectWallet}
                  >
                    Deposit WFAIR
                  </Button>
                </div>
              </div>
            </div>
          </Grid> */}

          <Grid
            className={styles.balanceCard}
            item
            justifyContent="flex-start"
            lg={4}
            md={4}
            xs={12}
          >
            <div className={classNames(styles.currentBalanceDescription, styles.smallCurrentBalanceDescription)}>
              <div className={classNames(styles.currentBalanceCard, styles.smallCard)}>
                <div className={styles.buttonContainer}>
                  <h2>Withdraw</h2>
                  <p className={styles.label}>
                    You can withdraw your funds in the casino directly to your wallet. You can then convert your WFAIR to other cryptocurrencies or hold it to have early access to the upcoming utilities.
                  </p>
                  {/* <p className={styles.label}>
                    You can withdraw your funds in the casino directly to your wallet. You can then convert your WFAIR to other cryptocurrencies or stake it to increase your gains.
                    Learn more
                  </p> */}
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
                
                  {/* {
                  showStartButton() && (
                    <div className={styles.buttonContainer}>
                    <p className={styles.title}>KYC Verification</p>
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
                } */}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
  const renderStatusTableSection = () => {};

  return (
    <BaseContainerWithNavbar>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.titleSection}>
            <h1>Your Wallet</h1>
            {/* <div className={styles.depositeNumber}>
              <GreenPathIcon />
              <p>1,245,894 WFAIR Deposites today</p>
            </div> */}
          </div>
          {renderCurrentBalanceSection()}
          {renderDepositBonusSection()}
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
      trackWalletWithdraw();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletWithdraw }));
    },
    showWalletBuyWfairPopup: () => {
      // trackWalletAddWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletBuyWfair }));
    },
    showWalletDepositPopup: () => {
      trackWalletAddWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    },
    showRequestTokenPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.requestTokens }));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
    showWalletDepositCrypto: () => {
      trackWalletBuyWithCryptoButton();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDepositCrypto }));
    },
    showWalletDepositFiat: () => {
      trackWalletBuyWithFiatButton();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDepositFiat }));
    },
    showWalletConnectWallet: () => {
      trackWalletBuyWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletConnectWallet }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(UserWallet));
