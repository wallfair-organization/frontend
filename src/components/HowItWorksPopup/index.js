import ButtonTheme from '../Button/ButtonTheme';
import Button from '../Button';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import styles from './styles.module.scss';
import HighlightType from '../Highlight/HighlightType';
import Highlight from 'components/Highlight';
import { useDispatch } from 'react-redux';
import Coins from '../../data/images/carousel/coins-2.png';
import { useMediaQuery } from '@material-ui/core';
import { OnboardingActions } from 'store/actions/onboarding';
import Routes from 'constants/Routes';
import { Link } from 'react-router-dom';
import PlayMoneyOnly from 'components/PlayMoneyOnly';
import RealMoneyOnly from 'components/RealMoneyOnly';

const HowItWorksPopup = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const handleClick = () => {
    dispatch(OnboardingActions.start());
  }

  return (
    <div className={styles.howItWorks}>
      <PlayMoneyOnly>
        <h1 className={styles.title}>
          Sign up &amp; get{' '}
          <span className={styles.highlighted}>
            <Highlight
              className={styles.highlight}
              highlightType={HighlightType.highlightTitle}
            />
            <span>100 PFAIR for free{' '}</span>
            
          </span>
        </h1>
      </PlayMoneyOnly>
      <RealMoneyOnly>
        <h1 className={styles.title}>
          Sign up &amp;{' '}
          <span className={styles.highlighted}>
            <Highlight
              className={styles.highlight}
              highlightType={HighlightType.highlightTitle}
            />
            <span>start betting!{' '}</span>
            
          </span>
        </h1>
      </RealMoneyOnly>
      <div className={styles.description}>
        <PlayMoneyOnly>
          Create your account and you get <b>100 PFAIR for free</b> and have the{' '}
          chance to win <br /> <b>150 USD every day</b>! Create your own events{' '}
          and earn money!
        </PlayMoneyOnly>
        <RealMoneyOnly>
          Create your account by connecting your MetaMask wallet.{' '}
          Create and share your own events and earn money!
        </RealMoneyOnly>

        <br />And this is how it works:
      </div>

      <PlayMoneyOnly>
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
            Create Event &amp; Share
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
      </PlayMoneyOnly>

      <RealMoneyOnly>
         <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.number}>1</div>
            Connect your MetaMask
          </div>
          <Icon
            iconType={isMobile ? IconType.arrowDown : IconType.arrowRight}
            className={styles.chevron}
          />
          <div className={styles.step}>
            <div className={styles.number}>2</div>
            Create Event &amp; Share
          </div>
          <Icon
            iconType={isMobile ? IconType.arrowDown : IconType.arrowRight}
            className={styles.chevron}
          />
          <div className={styles.step}>
            <div className={styles.number}>3</div>
            Earn Money
          </div>
        </div>
      </RealMoneyOnly>


      <Button
        highlightType={HighlightType.highlightHomeCtaBet}
        theme={ButtonTheme.primaryButtonXL}
        className={styles.button}
        onClick={handleClick}
      >
        <span>Sign up and create Event</span>
      </Button>

      <Link to={Routes.howItWorks} className={styles.link}>How it works</Link>

      <img src={Coins} className={styles.coins} alt="coins" />
    </div>
  );
};

export default HowItWorksPopup;
