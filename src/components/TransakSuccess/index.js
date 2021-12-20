import _ from 'lodash';
import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import classNames from 'classnames';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';
import { TOKEN_NAME } from 'constants/Token';

const TransakSuccess = ({ visible, hidePopup, options }) => {
  console.log({options});
  return (
    <div className={styles.successTransakContainer}>
      <span className={styles.successTransakHeadline}>
        <img src={LogoSplash} className={styles.logo} alt="logo" />
        Transaction Complete!
      </span>
      <span className={styles.successText}>
        In a few seconds, you will receive an email from Transak to track your order.
        Once the order has been succesfully processed, your funds will be credited in your balance.
      </span>
      
      {options.cryptoCurrency && options.cryptoAmount && options.equivalenceWFAIR &&
        <div className={styles.summary}>
          <div className={styles.row}>
            <div className={styles.key}>Amount of {_.get(options, 'cryptoCurrency')}</div>
            <div className={styles.value}>{_.get(options, 'cryptoAmount')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.key}>Amount of {_.get(options, 'fiatCurrency')}</div>
            <div className={styles.value}>{_.get(options, 'fiatAmount')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.key}>Estimated amount in {TOKEN_NAME}</div>
            <div className={styles.value}>{_.get(options, 'equivalenceWFAIR')}</div>
          </div>
          {/* <div className={styles.row}>
            <div className={styles.key}>Transaction fee</div>
            <div className={styles.value}>{_.get(options, 'fee')}</div>
          </div> */}
        </div>
      }

      <div className={styles.betButtonContainer}>
        <Button
          className={classNames(styles.betButton)}
          highlightType={HighlightType.highlightHomeCtaBet}
          disabledWithOverlay={false}
          onClick={hidePopup}
        >
          Keep Going
        </Button>
      </div>

    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.popupType === PopupTheme.transakSuccess && state.popup.visible,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransakSuccess);
