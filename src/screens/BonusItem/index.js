import styles from './styles.module.scss';
import classNames from "classnames";
import Button from "../../components/Button";
import ButtonTheme from '../../components/Button/ButtonTheme';
import placeholderImg from '../../data/images/bonus/placeholder.png';
import { useCallback, useState } from 'react';
import { cancelPromoCode } from 'api';
import { useDispatch } from 'react-redux';
import { AlertActions } from 'store/actions/alert';

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

const BonusItem = ({ data }) => {

  const dispatch = useDispatch();

  const handleCancelBonus = useCallback(async () => {
    const result = await cancelPromoCode(data?.name);

    if (result?.data?.response?.status === 'error') {
      console.log('error cancelling bonus');
      dispatch(AlertActions.showError({ message: result.response.data.message }));
      return;
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

  const renderMoneyBonus = () => {
    return (
      <div className={styles.content}>
        <h2>{data?.name}</h2>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Amount of the balance credited</span><span className={styles.value}>${data?.value}</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Wagering conditions</span><span className={styles.value}>${data?.wagering}</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>% of wagering met</span><span className={styles.value}>???</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Expiration Date</span><span className={styles.value}>{data?.expires_at}</span>
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


  const renderFreeSpinBonus = () => {
    return (
      <div className={styles.content}>
        <h2>{data?.name}</h2>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Value of each free spin</span><span className={styles.value}>${data?.value}</span>
        </div>
        <div className={styles.bonusSpec}>
          <span className={styles.label}>Expiration Date</span><span className={styles.value}>{data?.expires_at}</span>
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
      <div className={styles.imageContainer}>
        {data?.cover_url && <img src={data?.cover_url} alt="placeholder" />}
      </div>
      
      {renderContentByType()}

    </div>
  )
};

export default BonusItem;