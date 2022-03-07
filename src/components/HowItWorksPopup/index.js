import ButtonTheme from '../Button/ButtonTheme';
import Button from '../Button';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import styles from './styles.module.scss';
import HighlightType from '../Highlight/HighlightType';
import Highlight from 'components/Highlight';
import { useDispatch } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import Coins from '../../data/images/carousel/coins-2.png';
import { useMediaQuery } from '@material-ui/core';

const HowItWorksPopup = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const handleClick = () => {
    dispatch(PopupActions.show({ popupType: PopupTheme.auth }))
  }

  return (
    <div className={styles.howItWorks}>
      <h1 className={styles.title}>
        Sign up & get{' '}
        <span className={styles.highlighted}>
          100 PFAIR for free{' '}
          <Highlight
            className={styles.highlight}
            highlightType={HighlightType.highlightTitle}
          />
        </span>
      </h1>
      <div className={styles.description}>
        Create your account and you get <b>100 PFAIR for free</b> and have the
        chance to win <br /> <b>150 USD every day</b>! Create your own events
        and earn money!
        <br /> And this is how it works:
      </div>
      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.number}>1</div>
          Create your Account
        </div>
        <Icon
          iconType={isMobile ? IconType.arrowDown : IconType.arrowRight}
          className={styles.chevron}
        />
        <div className={styles.step}>
          <div className={styles.number}>2</div>
          Verify your Email
        </div>
        <Icon
          iconType={isMobile ? IconType.arrowDown : IconType.arrowRight}
          className={styles.chevron}
        />
        <div className={styles.step}>
          <div className={styles.number}>3</div>
          Create Event & Share
        </div>
        <Icon
          iconType={isMobile ? IconType.arrowDown : IconType.arrowRight}
          className={styles.chevron}
        />
        <div className={styles.step}>
          <div className={styles.number}>4</div>
          Earn Money
        </div>
      </div>

      <Button
        highlightType={HighlightType.highlightHomeCtaBet}
        theme={ButtonTheme.primaryButtonXL}
        className={styles.button}
        onClick={handleClick}
      >
        <span>Sign up and create Event</span>
      </Button>

      <img src={Coins} className={styles.coins} alt="coins" />
    </div>
  );
};

export default HowItWorksPopup;
