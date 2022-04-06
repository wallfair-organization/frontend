import styles from './styles.module.scss';
import {useDispatch} from 'react-redux';
import {PopupActions} from 'store/actions/popup';
import classNames from 'classnames';
import { trackWalletAddWfair } from 'config/gtm';
import PopupTheme from '../Popup/PopupTheme';

const SelectGameModePopup = ({ user, setGameMode, funPlayEnabled = true }) => {
  const dispatch = useDispatch();

  const hasBalance = (parseFloat(user?.balance) || 0) > 1;

  const handleRealPlayClick = ()=> {
    if (hasBalance) {
      setGameMode('real');
    } else {
      trackWalletAddWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    }
  }

  const handleFunPlayClick = ()=> {
    setGameMode('demo');
  }

  return (
    <div className={styles.popupContent}>
      <div className={styles.content}>
        <div
          className={classNames(styles.button, styles.buttonRealPlay)}
          onClick={handleRealPlayClick}
        >
          {funPlayEnabled ? 'REAL PLAY' : 'PLAY'}
        </div>
        {funPlayEnabled && (
          <>
            <div className={styles.separator}></div>
            <div
              className={classNames(styles.button, styles.buttonFunPlay)}
              onClick={handleFunPlayClick}
            >
              FUN PLAY
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectGameModePopup;
