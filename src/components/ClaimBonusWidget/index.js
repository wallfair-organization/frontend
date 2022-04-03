import styles from './styles.module.scss';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import ClaimBonusInputField from 'components/ClaimBonusInputField';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Routes from 'constants/Routes';
import { claimPromoCode } from 'api';
import classNames from 'classnames';
import { AlertActions } from 'store/actions/alert';
import { useDispatch } from 'react-redux';
import { RECAPTCHA_KEY } from 'constants/Api';

const ClaimBonusWidget = ({ fetchBonus }) => {
  const history = useHistory();
  const [bonusCode, setBonusCode] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const handleReCaptchaVerify = () => {
    return new Promise((resolve, _) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(RECAPTCHA_KEY, { action: 'join' })
          .then(token => {
            resolve(token);
          })
      });
    });
  };

  const handleConfirm = useCallback(async () => {
    const recaptchaToken = await handleReCaptchaVerify();
    if (!recaptchaToken) {
      console.log('recaptcha failed!');
      dispatch(AlertActions.showError('Recaptcha verification failed! Please try again!'));
      return;
    }

    const result = await claimPromoCode({promoCode: bonusCode, recaptchaToken});

    if (result?.response?.data?.status === 'error') {
      setErrorMessage(result.response.data.message);
      console.error(result.response.data.message);

      dispatch(AlertActions.showError({ message: result.response.data.message }));
      return;
    }
    
    dispatch(AlertActions.showSuccess('Bonus claimed successfully!'));
    console.log('bonusCode claimed!');
    history.push(Routes.bonus);
    
    if (fetchBonus) {
      fetchBonus();
    } 
    
  }, [bonusCode, history, dispatch, fetchBonus]); 
  
  return (
    <div className={styles.claimBonusContainer}>
      <div className={styles.leftContainer}>
        <span><span className={styles.icon}>🎁</span> Submit your promo code here</span>
      </div>
      <div className={styles.rightContainer}>

        <ClaimBonusInputField 
          className={classNames(styles.inputField, errorMessage ? styles.errorState : null)}
          handleChange={(code) => {
            setBonusCode(code);
            setErrorMessage(null);
          }}
          handleConfirm={handleConfirm}
          value={bonusCode}
        />
        
        <Button
          theme={ButtonTheme.primaryButtonS}
          onClick={handleConfirm}
        >
          Claim Bonus
        </Button>
        
      </div>
    </div>
  );
};

export default ClaimBonusWidget;
