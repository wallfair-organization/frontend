import styles from './styles.module.scss';
import classNames from "classnames";
import Button from "components/Button";
import ButtonTheme from 'components/Button/ButtonTheme';
import placeholderImg from '../../data/images/bonus/placeholder.png';
import { useCallback, useState } from 'react';
import { Api, cancelPromoCode, withdrawBonus } from 'api';
import { useDispatch, useSelector } from 'react-redux';
import { AlertActions } from 'store/actions/alert';
import { selectUser } from 'store/selectors/authentication';
import { selectPrices } from 'store/selectors/info-channel';
import { TOKEN_NAME } from 'constants/Token';
import { convertAmount } from 'helper/Currency';
import { formatToFixed } from 'helper/FormatNumbers';
import DateText from 'helper/DateText';
import InputBox from 'components/InputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import { useHistory } from 'react-router-dom';
import Routes from 'constants/Routes';
import { calculateTimeLeft } from 'utils/common';

const bonusTypes = {
  FREESPIN: 'FREESPIN',
  BONUS: 'BONUS',
}

const bonusStatus = {
  CLAIMED: 'CLAIMED',
  FINALIZED: 'FINALIZED',
  CANCELLED: 'CANCELLED',
  // EXPIRED: 'EXPIRED',
}

const BonusItem = ({ data, fetchBonus }) => {
  const { gamesCurrency } = useSelector(selectUser);
  const [copied, setCopied] = useState(false);
  const prices = useSelector(selectPrices);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCancelBonus = useCallback(async () => {
    dispatch(PopupActions.show({popupType: PopupTheme.cancelBonus, options: {bonus: {...data, fetchBonus}} }));
  }, [data, fetchBonus, dispatch]);

  const handleWithdrawBonus = useCallback(async () => {
    //dispatch(PopupActions.show({popupType: PopupTheme.withdrawBonus, options: {bonus: {...data, fetchBonus}} }));
    const result = await withdrawBonus(data?.name, data?.ref_id || 'default');
    if (result?.response?.data?.status === 'error') {
      console.log('error withdraw bonus');
      dispatch(AlertActions.showError({ message: result?.response?.data?.message }));
      return;
    }

    dispatch(AlertActions.showSuccess({ message: 'The Bonus amount was successfully added to your balance.' }));
    history.push(Routes.wallet);

    if (fetchBonus) {
      fetchBonus();
    }
  }, [data, fetchBonus, dispatch, history])

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

  const renderMoneyBonus = () => {
    return (
      <div className={styles.content}>
        <h2>{data?.description || 'Bonus'} </h2>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Amount of the balance credited</span><span className={styles.value}>
            {`${convert(data?.value)} ${gamesCurrency}`}
          </span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Wagering conditions</span><span className={styles.value}>{data?.wagering}x</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>% of wagering reached</span><span className={styles.value}>{+data?.wagering > 0 ? (Math.min(100, +formatToFixed(data?.wagering_reached * 100,)) + '%') : '-'}</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Expires in</span>
          <span className={styles.value} title={DateText.formatDate(data?.expires_at)}>
            {/* {data?.expires_at && DateText.formatDate(data?.expires_at)} */}
            {' '}{timeLeftObj?.days > 0 && <span className={styles.timerValue}>{timeLeftObj?.days || 0} </span>}
            {timeLeftObj?.days > 0 && <span className={styles.timerUnit}>{timeLeftObj?.days > 1 ? 'days ' : 'day '}</span>}
            {timeLeftObj?.hours > 0 && <span className={styles.timerValue}>{timeLeftObj?.hours || 0} </span>}
            {timeLeftObj?.hours > 0 &&<span className={styles.timerUnit}>hrs </span>}
            {timeLeftObj?.minutes && <span className={styles.timerValue}>{timeLeftObj?.minutes || 0} </span>}
            {timeLeftObj?.minutes &&<span className={styles.timerUnit}>min</span>}
          </span>
        </div>
        <div className={styles.actions}>
          <div
            className={copied ? styles.inputContainerCopied : styles.inputContainer}
          >
            <InputBox
              containerClassName={styles.container}
              type={'text'}
              value={data?.name}
              onClick={(e, val) => {
                setCopied(true);
                document.getSelection().removeAllRanges();
              }}
              theme={InputBoxTheme.copyToClipboardInput}
            />
          </div>
          {data?.status === bonusStatus.CLAIMED &&
          +data?.wagering_reached < 1 &&
            <button 
              className={styles.cancelLink}
              onClick={handleCancelBonus}
            >
              Cancel
            </button>
          }

          {data?.status === bonusStatus.CLAIMED &&
          +data?.wagering_reached >= 1 &&
            <Button 
              theme={ButtonTheme.primaryButtonS}
              onClick={handleWithdrawBonus}
              className={styles.withdrawButton}
            >
              Withdraw Bonus
            </Button>
          }
        </div>
      </div>
    )
  }

  const timeLeftObj = calculateTimeLeft(new Date(data?.expires_at));
  console.log(timeLeftObj);
  const timeLeft = <>
    
  </>


  const renderFreeSpinBonus = () => {
    return (
      <div className={styles.content}>
        <h2>{data?.description || 'Free Spins'}</h2>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Number of free spins</span><span className={styles.value}>{data?.count}</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Value of each free spin</span><span className={styles.value}>
            {`${convert(data?.value)} ${gamesCurrency}`}
          </span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Expiration Date</span><span className={styles.value}>{data?.expires_at && DateText.formatDate(data?.expires_at)}</span>
          <span className={styles.value}>
            <span className={styles.timerValue}>{timeLeftObj?.days || 0}</span>
            <span className={styles.timerUnit}>days </span>
            <span className={styles.timerValue}>{timeLeftObj?.hours || 0}</span>
            <span className={styles.timerUnit}>hrs </span>
            <span className={styles.timerValue}>{timeLeftObj?.minutes || 0}</span>
            <span className={styles.timerUnit}>min </span>
          </span>
        </div>
        <div className={styles.actions}>
          <span>{data?.name}</span>
          {data?.status !== bonusStatus.CLAIMED ?
            <Button 
              theme={ButtonTheme.primaryButtonS}
              disabled={true}
            >
              Activate
            </Button>
          :
            <Button 
              theme={ButtonTheme.secondaryButton}
              onClick={handleCancelBonus}
            >
              Cancel
            </Button>
          }
        </div>
      </div>
    )
  }



  return (
    <div className={styles.bonusItem}>
      {data?.status === bonusStatus.CLAIMED && <div className={classNames(styles.statusLabel, styles.active)}>ACTIVE</div>}
      {data?.status === bonusStatus.FINALIZED && <div className={classNames(styles.statusLabel, styles.finalized)}>FINALIZED</div>}
      {data?.status === bonusStatus.CANCELLED && <div className={classNames(styles.statusLabel, styles.cancelled)}>CANCELLED</div>}
      <div className={styles.imageContainer}>
        {data?.cover_url && <img src={data?.cover_url} alt="placeholder" />}
      </div>
      
      {renderContentByType()}

    </div>
  )
};

export default BonusItem;