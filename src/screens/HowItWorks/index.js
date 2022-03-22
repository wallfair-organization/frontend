import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import styles from './styles.module.scss';
import Image1 from '../../data/images/how-it-works/group-1.png'
import Image2 from '../../data/images/how-it-works/group-2.png';
import Image3 from '../../data/images/how-it-works/group-3.png';
import Medal from '../../data/images/how-it-works/medal.png';
import classNames from "classnames";
import Button from "../../components/Button";
import ButtonTheme from '../../components/Button/ButtonTheme';
import { Link, useHistory } from "react-router-dom";
import { useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { PopupActions } from "store/actions/popup";
import authState from "constants/AuthState";
import Routes from "constants/Routes";
import PopupTheme from "components/Popup/PopupTheme";
import { OnboardingActions } from "store/actions/onboarding";
import { isMobile } from 'react-device-detect';
import { trackWalletAddWfair } from "config/gtm";
import { ReactComponent as PaymentMethodIcon } from '../../data/icons/payment-methods.svg';
import {ReactComponent as MetamaskIcon} from '../../data/icons/deposit/metamask-logo.svg';
import {ReactComponent as CheckedGreen} from '../../data/icons/checked-green.svg';


const HowItWorks = ({loggedIn, showPopup, showWithdrawPopup, showWalletDepositPopup}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleConnectMetaMask = useCallback(() => {
    if (!loggedIn) {
      // history.push(Routes.getRouteWithParameters(Routes.events, {category: 'all'}));

      showPopup(PopupTheme.loginWeb3, {});
    }
  }, [loggedIn]);
  
  const handleCreateEvent = useCallback(() => {
    if (loggedIn) {
      // history.push(Routes.getRouteWithParameters(Routes.events, {category: 'all'}));

      showPopup(PopupTheme.eventForms, {});
    } else {
      dispatch(OnboardingActions.start());
    }
  }, [loggedIn]);

  const handleWithdrawEvent = useCallback(() => {
    if (loggedIn) {
      // history.push(Routes.getRouteWithParameters(Routes.wallet, {}));

      showWithdrawPopup();
    } else {
      dispatch(OnboardingActions.start());
    }
  }, [loggedIn]);

  const handleDepositEvent = useCallback(() => {
    if (loggedIn) {
      // history.push(Routes.getRouteWithParameters(Routes.wallet, {}));

      showWalletDepositPopup();
    } else {
      dispatch(OnboardingActions.start());
    }
  }, [loggedIn]);



  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.howItWorks}>
        
        <h1 className={styles.headline}>
          How it works?
        </h1>

        <div className={styles.container}>

          <div className={styles.summaryContainer}>
            <div className={styles.summaryBox}>
              <a href="#step1">
                01 | Connect your MetaMask
              </a>
              <a href="#step2">
                02 | Make a deposit
              </a>
              <a href="#step3">
                03 | Play our Casino Games
              </a>
              <a href="#step4">
                04 | Trade and create Events
              </a>
              <a href="#step5">
                05 | Instant withdraw your earnings
              </a>
              <a href="#step6">
                06 | Stake your WFAIR tokens
              </a>
            </div>
            <p>
              Do you have questions?<br />Contact us on <a href='https://discord.gg/VjYUYBKhTc' target='_blank' rel='noreferrer'>Discord</a>
            </p>
          </div>
       
          <div id="step1" className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.number}>01</div>
              <div className={styles.content}>
                <h1 className={styles.title}>
                    Connect your MetaMask
                </h1>
                 <div className={styles.description}>
                    With your Metamask, you can connect in a single click, no KYC required. To install MetaMask, <a href={!isMobile
                    ? 'https://metamask.io/download/'
                    : `https://metamask.app.link/dapp/${window.location.origin}`}>click here</a>.
                </div>
                
                
                  <Button
                    className={classNames(styles.button, loggedIn ? styles.loggedIn : null)}
                    theme={ButtonTheme.secondaryButton}
                    onClick={!loggedIn ? handleConnectMetaMask : null}
                  >
                    {loggedIn ?
                      <>
                        <CheckedGreen />
                        Connected to MetaMask
                      </>
                    :
                      <>
                        <MetamaskIcon />
                        Connect to MetaMask
                      </>
                    }
                  </Button>
                
              </div>
            </div>

            <div id="step2" className={styles.step}>
              <div className={styles.number}>02</div>
              <div className={classNames(styles.content)}>
                <h1 className={styles.title}>
                  Make a deposit
                </h1>
                <div className={styles.description}>
                  You can deposit WFAIR and many other cryptocurrencies directly from your MetaMask. If you don't have funds, you can use our services to make deposits with Bitcoin, Visa, Mastercard and even Google Pay and Apple pay.
                </div>
                
                <Button
                  className={styles.button}
                  theme={ButtonTheme.primaryButtonM}
                  onClick={handleDepositEvent}
                >
                  Deposit
                </Button>
                <PaymentMethodIcon />
              </div>
            </div>

            <div id="step3" className={styles.step}>
              <div className={styles.number}>03</div>
              <div className={styles.content}>
                <h1 className={styles.title}>
                  Play our Casino Games
                </h1>
                <div className={styles.description}>
                  We have the best providers in the market (more than 20) with the best games. We have Slots, Roulettes, Blackjack, Poker and many Live Games as well.
                </div>
                <Button
                  className={styles.button}
                  theme={ButtonTheme.secondaryButton}
                  onClick={() => history.push(Routes.games)}
                >
                  Go to Games
                </Button>
              </div>
            </div>

            <div id="step4" className={styles.step}>
              <div className={styles.number}>04</div>
              <div className={styles.content}>
                <h1 className={styles.title}>
                  Trade and create Events
                </h1>
                <div className={styles.description}>
                  Trade on existing events and create events to play with your friends, family and community to start fun competitions. You as an event creator can profit from a % of the volume of trading, while your friends could earn money by betting on the correct outcome.
                </div>
                <Button
                  className={styles.button}
                  theme={ButtonTheme.secondaryButton}
                  onClick={handleCreateEvent}
                >
                  Go to Events
                </Button>
              </div>
            </div>

            <div id="step5" className={styles.step}>
              <div className={styles.number}>05</div>
              <div className={styles.content}>
                <h1 className={styles.title}>
                  Instant withdraw your earnings
                </h1>
                <div className={styles.description}>
                  We believe your gains are yours alone. You can always withdraw your funds, no hidden rules, no KYC, directly to your MetaMask.
                </div>
                <Button
                  className={styles.button}
                  theme={ButtonTheme.secondaryButton}
                  onClick={handleWithdrawEvent}
                >
                  Withdraw
                </Button>
              </div>
            </div>

            <div id="step6" className={styles.step}>
              <div className={styles.number}>06</div>
              <div className={styles.content}>
                <h1 className={styles.title}>
                  Stake your WFAIR tokens
                </h1>
                <div className={styles.description}>
                  You have the possibility of depositing your WFAIR tokens in the Wallfair Staking platform to earn 35% APY as passive income.
                </div>

                <a href="https://staking.wallfair.io" target="_blank" rel="noreferrer">
                  <Button
                    className={styles.button}
                    theme={ButtonTheme.secondaryButton}
                  >
                    Stake now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
    loggedIn: state.authentication.authState === authState.LOGGED_IN,
    userId: state.authentication.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    showWalletDepositPopup: () => {
      trackWalletAddWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    },
    showWithdrawPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletWithdraw }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HowItWorks);