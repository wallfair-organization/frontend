import { useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import {ReactComponent as BitcoinIcon} from '../../../data/icons/deposit/bitcoin-icon.svg';
import {ReactComponent as EuroIcon} from '../../../data/icons/deposit/banktransfer-icon.svg';
import {ReactComponent as WalletIcon} from '../../../data/icons/deposit/metamask-logo.svg';
import {ReactComponent as Arrow} from '../../../data/icons/deposit/thin-arrow-right.svg';
import {ReactComponent as WFAIRIcon} from '../../../data/icons/deposit/wfair-symbol.svg';
import {ReactComponent as ApplePay} from '../../../data/icons/deposit/applepay-icon.svg';
import {ReactComponent as Ethereum} from '../../../data/icons/deposit/ethereum-icon.svg';
import {ReactComponent as GooglePay} from '../../../data/icons/deposit/googlepay-icon.svg';
import {ReactComponent as Litecoin} from '../../../data/icons/deposit/litecoin-icon.svg';
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

  return (
    <div className={styles.depositSelectionContainer}>
      <h3>Choose your deposit method</h3>

      <div className={styles.selectorButton} onClick={showWalletConnectWallet}>
        <div className={styles.iconWrapper}>
          <WalletIcon />
        </div>
        {/* <WFAIRIcon /> */}
        <div className={styles.buttonText}>
          <p className={styles.title}>
            WFAIR via MetaMask
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>

      <div className={styles.selectorButton} onClick={showWalletDepositCrypto}>
        <div className={styles.iconWrapper}>
          <BitcoinIcon />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Bitcoin
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>

      <div className={styles.selectorButton} onClick={showWalletDepositCrypto}>
        <div className={styles.iconWrapper}>
          <Ethereum />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Ethereum
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>
      
      <div className={styles.selectorButton} onClick={showWalletDepositCrypto}>
        <div className={styles.iconWrapper}>
          <Litecoin />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Litecoin
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div>
      
      <h3 className={styles.nocrypto}>No crypto? No problem!</h3>

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <div className={styles.iconWrapper}>
          <VisaMaster />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Credit Card
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div> 

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <div className={styles.iconWrapper}>
          <VisaMaster />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Bank Transfer
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div> 

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <div className={styles.iconWrapper}>
          <ApplePay />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Apple Pay
          </p>
        </div>
        <Arrow className={styles.arrowRight} />
      </div> 

      <div className={styles.selectorButton} onClick={showWalletDepositFiat}>
        <div className={styles.iconWrapper}>
          <GooglePay />
        </div>
        <div className={styles.buttonText}>
          <p className={styles.title}>
            Google Pay
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
