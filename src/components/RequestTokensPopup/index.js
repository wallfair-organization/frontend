import styles from './styles.module.scss';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import ClickEvent from '../../helper/ClickEvent';
import { UserActions } from '../../store/actions/user';

const RequestTokensPopup = ({ hidePopup, requestTokens }) => {
  return (
    <div className={styles.container}>
      <h1>Request Tokens</h1>
      <div className={styles.info}>
        Your balance will be updated to{' '}
        <span className={styles.amount}>5,000 PFAIR</span> and your position on
        the leaderboard will be reset to <span className={styles.red}>0</span>.
      </div>
      <div className={styles.buttons}>
        <div
          onClick={event => {
            ClickEvent.stopPropagation(event);
            requestTokens();
            hidePopup();
          }}
          className={styles.accept}
        >
          Accept
        </div>
        <div onClick={hidePopup} className={styles.reject}>
          Refuse
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    requestTokens: () => {
      dispatch(UserActions.requestTokens());
    },
  };
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.popupType === PopupTheme.requestTokens && state.popup.visible,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestTokensPopup);
