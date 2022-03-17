import { useEffect } from 'react';
import styles from './styles.module.scss';
import {ReactComponent as BitcoinIcon} from '../../../data/icons/deposit/bitcoin-icon.svg';
import {ReactComponent as WalletIcon} from '../../../data/icons/deposit/metamask-logo.svg';
import {ReactComponent as Arrow} from '../../../data/icons/deposit/thin-arrow-right.svg';
import {ReactComponent as ApplePay} from '../../../data/icons/deposit/applepay-icon.svg';
import {ReactComponent as Ethereum} from '../../../data/icons/deposit/ethereum-icon.svg';
import {ReactComponent as GooglePay} from '../../../data/icons/deposit/googlepay-icon.svg';
import {ReactComponent as Litecoin} from '../../../data/icons/deposit/litecoin-icon.svg';
import { ReactComponent as USDT } from '../../../data/icons/deposit/usdt-logo.svg';
import { ReactComponent as DAI } from '../../../data/icons/deposit/dai-logo.svg';
import { ReactComponent as USDC } from '../../../data/icons/deposit/usdc-logo.svg';
import { ReactComponent as XRP } from '../../../data/icons/deposit/xrp-logo.svg';
import { ReactComponent as MATIC } from '../../../data/icons/deposit/matic-logo.svg';
import {ReactComponent as VisaMaster} from '../../../data/icons/deposit/visamaster-icon.svg';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import { TransactionActions } from 'store/actions/transaction';
import { trackWalletBuyWfair, trackWalletBuyWithCryptoButton, trackWalletBuyWithFiatButton } from 'config/gtm';

const DepositSelection = ({showWalletDepositCrypto, showWalletDepositFiat, showWalletConnectWallet, fetchWalletTransactions}) => {

  useEffect(() => {
    fetchWalletTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CRYPTO_OPTIONS = [
    {
      label: 'Bitcoin',
      icon: <BitcoinIcon />,
    },
    {
      label: 'Ethereum',
      icon: <Ethereum />,
      depositCurrency: 'ETH',
    },
    {
      label: 'Matic',
      icon: <MATIC />,
      depositCurrency: 'MATIC',
    },
    {
      label: 'Litecoin',
      icon: <Litecoin />,
    },
    {
      label: 'USDT',
      icon: <USDT />,
    },
    {
      label: 'DAI',
      icon: <DAI />,
    },
    {
      label: 'USDC',
      icon: <USDC />,
    },
    {
      label: 'XRP',
      icon: <XRP />,
    },
  ];

  return (
    <div className={styles.depositSelectionContainer}>
      <h3>Choose your deposit method</h3>

      <div className={styles.selectorButton} onClick={() => showWalletConnectWallet()}>
        <div className={styles.iconWrapper}>
          <WalletIcon />
        </div>
        {/* <WFAIRIcon /> */}
        <div className={styles.buttonText}>
          <p className={styles.title}>WFAIR via MetaMask</p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>

      {CRYPTO_OPTIONS.map(option => {
        return (
          <div
            className={styles.selectorButton}
            onClick={() =>
              option.depositCurrency
                ? showWalletConnectWallet(option.depositCurrency)
                : showWalletDepositCrypto(option.label.toUpperCase())
            }
            key={option.label}
          >
            <div className={styles.iconWrapper}>{option.icon}</div>
            <div className={styles.buttonText}>
              <p className={styles.title}>{option.label}</p>
            </div>
            <Arrow className={styles.arrowRight} />
          </div>
        );
      })}

      <h3 className={styles.nocrypto}>No crypto? No problem!</h3>

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <div className={styles.iconWrapper}>
          <VisaMaster />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>Credit Card</p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <div className={styles.iconWrapper}>
          <VisaMaster />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>Bank Transfer</p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <div className={styles.iconWrapper}>
          <ApplePay />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>Apple Pay</p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <div className={styles.iconWrapper}>
          <GooglePay />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>Google Pay</p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return { 
    showWalletDepositCrypto: (currency) => {
      trackWalletBuyWithCryptoButton();
      dispatch(PopupActions.show({ 
        popupType: PopupTheme.walletDepositCrypto,
        options: { currency },
      }));
    },
    showWalletDepositFiat: () => {
      trackWalletBuyWithFiatButton();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDepositFiat }));
    },
    showWalletConnectWallet: (currency) => {
      trackWalletBuyWfair();
      dispatch(PopupActions.show({
        popupType: PopupTheme.walletConnectWallet,
        options: { currency }
      }));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
  }
}

export default connect(null, mapDispatchToProps)(DepositSelection);
