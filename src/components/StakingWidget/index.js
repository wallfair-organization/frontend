import styles from './styles.module.scss';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import {ReactComponent as WLogo} from '../../data/images/bonus/w-logo-white.svg';

const StakingWidget = () => {

  return (
    <div className={styles.stakingWidgetContainer}>
      <div className={styles.leftContainer}>
        <WLogo />
        <span>Earn <span className={styles.yellow}>35% APY</span> by Staking the WFAIR tokens you withdraw on the <span className={styles.yellow}>Wallfair Staking</span> platform!</span>
      </div>
      <div className={styles.rightContainer}>
      
      <a href="https://staking.wallfair.io" target="_blank" rel="noreferrer">
        <Button
          theme={ButtonTheme.primaryButtonS}
        >
          Stake now!
        </Button>
      </a>
      </div>
    </div>
  );
};

export default StakingWidget;
