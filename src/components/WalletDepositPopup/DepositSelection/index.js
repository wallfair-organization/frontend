import { useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import {ReactComponent as BitcoinIcon} from '../../../data/icons/deposit/bitcoin-icon.svg';
import {ReactComponent as EuroIcon} from '../../../data/icons/deposit/banktransfer-icon.svg';
import {ReactComponent as WalletIcon} from '../../../data/icons/deposit/metamask-logo.svg';
import {ReactComponent as Arrow} from '../../../data/icons/deposit/arrow.svg';
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

  return (
    <div className={styles.depositSelectionContainer}>
      <h3>Choose your deposit method</h3>

      <div className={styles.selectorButton} onClick={showWalletDepositCrypto}>
        <BitcoinIcon />
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Deposit with Crypto
          </p>
          <p>
            Deposit BTC, ETH or LTC and start playing immediately.
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <EuroIcon />
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Buy with EUR / USD
          </p>
          <p>
            Deposit EUR or USD to start playing in a few hours.
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>

      <div className={styles.selectorButton} onClick={showWalletConnectWallet}>
        <WalletIcon />
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Connect your Wallet
          </p>
          <p>
            Connect your existing crypto wallet with WFAIR you bought and start immediately.
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return { 
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
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
  }
}

export default connect(null, mapDispatchToProps)(DepositSelection);
