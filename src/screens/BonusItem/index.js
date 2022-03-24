import styles from './styles.module.scss';
import classNames from "classnames";
import Button from "../../components/Button";
import ButtonTheme from '../../components/Button/ButtonTheme';
import placeholderImg from '../../data/images/bonus/placeholder.png';
import { useCallback, useState } from 'react';
import { cancelPromoCode } from 'api';
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

  const handleCancelBonus = useCallback(async () => {
    const result = await cancelPromoCode(data?.name, data?.ref_id || 'default');

    if (result?.data?.response?.status === 'error') {
      console.log('error cancelling bonus');
      dispatch(AlertActions.showError({ message: result.response.data.message }));
      return;
    }

    if (fetchBonus) {
      fetchBonus();
    }

  }, [])

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
          <span className={styles.label}>Wagering conditions</span><span className={styles.value}>{data?.wagering}</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>% of wagering reached</span><span className={styles.value}>{+data?.wagering > 0 ? (Math.min(100, +data?.wagering_reached * 100 / +data?.wagering) + '%') : '-'}</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Expiration Date</span><span className={styles.value}>{data?.expires_at && DateText.formatDate(data?.expires_at)}</span>
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