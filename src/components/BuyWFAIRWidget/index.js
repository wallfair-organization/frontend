import styles from './styles.module.scss';
import classNames from 'classnames';

import {ReactComponent as ApplePay} from 'data/icons/apple-pay.svg';
import SamsungPay from 'data/icons/samsung-pay.png';
import {ReactComponent as Maestro} from 'data/icons/maestro.svg';
import {ReactComponent as GooglePay} from 'data/icons/google-pay.svg';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';

const BuyWFAIRWidget = () => {

  return (
    <div className={styles.widgetContainer}>
      <span className={styles.title}>No Crypto? No problem!</span>
      <div className={styles.icons}>
        <GooglePay />
        <Maestro />
        <ApplePay />
        <img src={SamsungPay} alt="SamsungPay Logo"/>
      </div>
      <a href={'https://staking.wallfair.io/dashboard/buy-wfair'} target="_blank" rel="noreferrer">
        <Button theme={ButtonTheme.primaryButtonL}>Buy WFAIR</Button>
      </a>
    </div>
  );
};

export default BuyWFAIRWidget;
