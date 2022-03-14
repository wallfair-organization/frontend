import styles from './styles.module.scss';
import classNames from 'classnames';
import ButtonTheme from 'components/Button/ButtonTheme';
import Button from 'components/Button';
import { isMetamask } from 'utils/detection';
import { isMobile } from 'react-device-detect';

const HowToStartCard = ({
  onClick,
  title = 'Install MetaMask',
  image,
  step = 1,
  eventCardClass,
  installMetamask = false,
  action
}) => {
  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + image + '")',
    };
  };

  return (
    <div
      className={classNames(styles.howtoCardContainer, eventCardClass)}
      onClick={onClick}
    >
      <div className={styles.picture} style={getEventCardStyle()} />
      <div className={classNames(styles.picture, styles.overlay)} />
      <div className={classNames(styles.howtoCard)}>
        <div className={styles.titleContainer}>
          {installMetamask ?
            
              <a href={(isMetamask || !isMobile) ? "https://metamask.io/download/" : "https://metamask.app.link/dapp/staking.wallfair.io/dashboard"} target="_blank" rel="noreferrer">
              <Button theme={ButtonTheme.primaryButtonS}>{title}</Button>
              </a>
            
          :
            <Button theme={ButtonTheme.primaryButtonS} onClick={action}>{title}</Button>
          }
        </div>
      </div>
        <div className={styles.timerContainer}>
          <div
            className={classNames(
              styles.contentWrapper
            )}
          >
              <span className={styles.timerLabel}>Step {step}</span>
          </div>
        </div> 
    </div>
  );
};

export default HowToStartCard;
