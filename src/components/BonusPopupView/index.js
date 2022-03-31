import styles from './styles.module.scss';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import { connect, useSelector } from 'react-redux';
import ConfirmCongrat from '../../data/images/coins-popup.png';
import ShadowAmount from '../../data/images/cashout-amount-shadow.png';
import { TOKEN_NAME } from 'constants/Token';
import { convertAmount, currencyDisplay } from 'helper/Currency';
import { formatToFixed } from 'helper/FormatNumbers';
import { selectUser } from 'store/selectors/authentication';
import { selectPrices } from 'store/selectors/info-channel';

const BonusPopupView = ({ authentication, visible, hidePopup, options }) => {
  // const { getAnimationInstance, canvasStyles } = useConfettiAnimation({
  //   visible,
  // });

  const { gamesCurrency } = useSelector(selectUser);
  const prices = useSelector(selectPrices);
  
  const { multiplier, amount, bonus } = options;

  return (
    <div className={styles.bonusPopupContainer}>
      <span className={styles.headLine}>
        Congratulations! <br />
        You have won
      </span>

      <div className={styles.cashoutContent}>
        <span className={styles.cashoutAmount}>
          <img src={ShadowAmount} className={styles.shadow} alt="amount" />
          {/* <span className={styles.amount}>{`${amount} ${currencyDisplay(TOKEN_NAME)}`}</span> */}
          <span className={styles.amount}>
            {gamesCurrency !== TOKEN_NAME
            ? `${convertAmount(
                amount,
                prices[gamesCurrency]
              )} ${gamesCurrency}`
            : `${formatToFixed(amount, 0, true)} ${currencyDisplay(
                TOKEN_NAME
            )}`}
          </span>
        </span>
        <span className={styles.multiplier}>
          {multiplier}x
        </span>
        <img className={styles.congratsConfetti} src={ConfirmCongrat} alt='confirm-congrat' />
      </div>
      
      <span className={styles.skipButton} onClick={hidePopup}>Keep playing</span>

      {/* <ReactCanvasConfetti
        refConfetti={getAnimationInstance}
        style={canvasStyles}
      /> */}
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
    authentication: state.authentication,
    visible:
      state.popup.popupType === PopupTheme.eventConfirmation && state.popup.visible,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BonusPopupView);
