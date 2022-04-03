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
import {ReactComponent as WLogo} from '../../data/images/bonus/w-logo-white.svg';
import { calculateTimeLeft } from 'utils/common';
import classNames from 'classnames';
import DateText from 'helper/DateText';

const bonusTypes = {
  FREESPIN: 'FREESPIN',
  BONUS: 'BONUS',
}

const BonusPopupView = ({ authentication, visible, hidePopup, options }) => {
  // const { getAnimationInstance, canvasStyles } = useConfettiAnimation({
  //   visible,
  // });

  const { gamesCurrency } = useSelector(selectUser);
  const prices = useSelector(selectPrices);
  
  const { bonus : data } = options;

  const renderContentByType = () => {
    switch (data?.type) {
      case bonusTypes.FREESPIN:
        return renderFreeSpinBonus();
      
      case bonusTypes.BONUS:
        return renderMoneyBonus();
    
      default:
        return null;
    }
  }

  const convert = (value) => {
    return gamesCurrency !== TOKEN_NAME
      ? `${convertAmount(
          +value,
          prices[gamesCurrency]
        )}`
      : `${formatToFixed(+value, 0, true)}`
  }

  const closerExpirationTime = Math.min(new Date(data?.expires_at).getTime(), new Date(data?.valid_until).getTime());
  const timeLeftObj = calculateTimeLeft(new Date(closerExpirationTime));

  const renderMoneyBonus = () => {
    return (
      <div className={styles.content}>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Amount of the balance credited</span><span className={styles.value}>
            {`${convert(data?.value)} ${gamesCurrency}`}
          </span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Max bet</span><span className={styles.value}>
            {`${convert(500)} ${gamesCurrency}`}
          </span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Wagering conditions</span><span className={styles.value}>{data?.wagering}x</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>% of wagering reached</span><span className={styles.value}>{+data?.wagering > 0 ? (Math.min(100, +formatToFixed(data?.wagering_reached * 100,)) + '%') : '-'}</span>
        </div>

        {data?.status !== 'CANCELLED' && (
        Object.keys(timeLeftObj).length > 0 ?
          <div className={styles.bonusSpec}>
            <span className={styles.label}>Expires in</span>
            <span className={styles.value} title={DateText.formatDate(new Date(closerExpirationTime))}>
              {/* {data?.expires_at && DateText.formatDate(data?.expires_at)} */}
              {' '}{timeLeftObj?.days > 0 && <span className={styles.timerValue}>{timeLeftObj?.days || 0} </span>}
              {timeLeftObj?.days > 0 && <span className={styles.timerUnit}>{timeLeftObj?.days > 1 ? 'days ' : 'day '}</span>}
              {timeLeftObj?.hours > 0 && <span className={styles.timerValue}>{timeLeftObj?.hours || 0} </span>}
              {timeLeftObj?.hours > 0 &&<span className={styles.timerUnit}>hrs </span>}
              {timeLeftObj?.minutes && <span className={styles.timerValue}>{timeLeftObj?.minutes || 0} </span>}
              {timeLeftObj?.minutes &&<span className={styles.timerUnit}>min</span>}
            </span>
          </div>
        :
          <div className={styles.bonusSpec}>
            <span className={classNames(styles.label, styles.expired)}>Expired at</span>
            <span className={classNames(styles.value, styles.expired)}>
              {closerExpirationTime && DateText.formatDate((new Date(closerExpirationTime)))}
            </span>
          </div>
        )}
      </div>
    )
  }

  const renderFreeSpinBonus = () => {
    return (
      <div className={styles.content}>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Number of free spins</span><span className={styles.value}>{data?.count}</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Value of each free spin</span><span className={styles.value}>
            {`${convert(data?.value)} ${gamesCurrency}`}
          </span>
        </div>
       {data?.status !== 'CANCELLED' && (
        Object.keys(timeLeftObj).length > 0 &&
          <div className={styles.bonusSpec}>
            <span className={styles.label}>Expires in</span>
            <span className={styles.value} title={DateText.formatDate(new Date(closerExpirationTime))}>
              {/* {data?.expires_at && DateText.formatDate(data?.expires_at)} */}
              {' '}{timeLeftObj?.days > 0 && <span className={styles.timerValue}>{timeLeftObj?.days || 0} </span>}
              {timeLeftObj?.days > 0 && <span className={styles.timerUnit}>{timeLeftObj?.days > 1 ? 'days ' : 'day '}</span>}
              {timeLeftObj?.hours > 0 && <span className={styles.timerValue}>{timeLeftObj?.hours || 0} </span>}
              {timeLeftObj?.hours > 0 &&<span className={styles.timerUnit}>hrs </span>}
              {timeLeftObj?.minutes && <span className={styles.timerValue}>{timeLeftObj?.minutes || 0} </span>}
              {timeLeftObj?.minutes &&<span className={styles.timerUnit}>min</span>}
            </span>
          </div>
       )}
      </div>
    )
  }

  return (
    <div className={styles.bonusPopupContainer}>
      <WLogo />
      <span className={styles.headLine}>
        {data?.name}
      </span>
      <span className={styles.description}>
        {data?.description || ""}
      </span>

      {renderContentByType()}
      <img className={styles.congratsConfetti} src={ConfirmCongrat} alt='confirm-congrat' />
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
