import { useEffect } from 'react';
import { playWinSound } from '../helper/Audio';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

let animationInstance;

const useAnimation = ({ visible }) => {
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

  const getAnimationInstance = instance => {
    animationInstance = instance;
  };

  useEffect(() => {
    if (visible) {
      startAnimation();
      playWinSound();
    }
  }, [visible]);

  return {
    canvasStyles,
    getAnimationInstance,
  };
};

export default useAnimation;
