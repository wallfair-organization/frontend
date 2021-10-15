import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';

import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import { useEffect } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { connect } from 'react-redux';
import PopupTheme from 'components/Popup/PopupTheme';
import { TOKEN_NAME } from 'constants/Token';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

let animationInstance;

const LotteryGamePopup = ({ hidePopup, rewardId, visible }) => {
  const makeShot = (particleRatio, opts) => {
    animationInstance &&
      animationInstance({
        ...opts,
        origin: { y: 0.6 },
        particleCount: Math.floor(1000 * particleRatio),
      });
  };

  const startAnimation = () => {
    makeShot(0.35, {
      spread: 60,
      startVelocity: 55,
      decay: 0.9,
    });

    makeShot(0.2, {
      spread: 90,
      decay: 0.9,
    });

    makeShot(0.35, {
      spread: 120,
      decay: 0.95,
      scalar: 0.8,
    });

    makeShot(0.3, {
      spread: 150,
      startVelocity: 25,
      decay: 0.99,
      scalar: 1.2,
    });

    makeShot(0.3, {
      spread: 120,
      decay: 1,
      startVelocity: 45,
    });
  };

  const getInstance = instance => {
    animationInstance = instance;
  };

  useEffect(() => {
    if (visible) {
      startAnimation();
    }
  }, [visible]);

  return (
    <div className={styles.reportEvent}>
      <img src={LogoSplash} className={styles.logo} alt="logo" />
      <p>Congratulations!</p>
      <div className={styles.title}>Your Number: {rewardId}</div>
      <div className={styles.subtitle}>
        You Have A Chance To Win Up To 5,000 {TOKEN_NAME}
      </div>

      <div className={styles.content}>
        We Will Notify You About The Lottery Results!
      </div>

      <Button
        className={styles.sendButton}
        onClick={hidePopup}
        highlightType={HighlightType.highlightModalButton}
        disabled={false}
        disabledWithOverlay={false}
        withoutBackground={true}
      >
        <span className={'buttonText'}>Keep Going!</span>
      </Button>

      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.popupType === PopupTheme.lotteryGameAnswered &&
      state.popup.visible,
  };
};

export default connect(mapStateToProps, null)(LotteryGamePopup);
