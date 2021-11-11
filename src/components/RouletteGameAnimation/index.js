import cn from 'classnames';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { ROSI_GAME_AFTER_CRASH_DELAY } from 'constants/RosiGame';
import {
  selectHasStarted,
  selectTimeStarted,
  selectLastCrash,
  selectCashedOut,
  selectNextGameAt,
} from 'store/selectors/rosi-game';
import styles from './styles.module.scss';
import { RosiGameActions } from '../../store/actions/rosi-game';
import VolumeSlider from '../VolumeSlider';
import GameAudioControls from '../GameAudioControls';
import AnimationController from './AnimationController';
import { isMobile } from 'react-device-detect';

const RouletteGameAnimation = ({
  connected,
  muteButtonClick,
  setSpins,
  amount,
  onInit,
  risk,
  setBet,
  bet
}) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);
  const cashedOut = useSelector(selectCashedOut);

  const [running, setRunning] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    let audioInstance = null;
    const { audio } = AnimationController.init(canvasRef.current, {
      width: backgroundRef.current.clientWidth,
      height: backgroundRef.current.clientHeight,
      risk,
      amount
    });
    setAudio(audio);
    audioInstance = audio;
    onInit(audio);
    AnimationController.spinTo(0, 200000, true);
    return () => audioInstance.stopBgm();
  }, []);

  useEffect(() => {
    if(bet && !bet.pending && bet.nspin >= 0 && !running) spin(bet);
  }, [bet]);

  useEffect(() => {
    if (risk && amount) {
      AnimationController.changeValues();
      AnimationController.reinit(canvasRef.current, {
        width: backgroundRef.current.clientWidth,
        height: backgroundRef.current.clientHeight,
        risk,
        amount
      });
      AnimationController.repaint(0, risk);
    }
  }, [risk, amount]);

  const spin = async () => {
    if (running) return;
    else setRunning(true);
    const newspin = await AnimationController.spinTo(bet.winIndex);
    //AnimationController.spinTo(null, 500000, true);
    setSpins(newspin);
    setRunning(false);
    setBet({pending: true});
  }

  return (
    <div
      ref={backgroundRef}
      className={classNames(
        styles.animation,
        isMobile && styles.animationMobile
      )}
    >
      <div className={styles.audioControls}>
        {audio && (
          <GameAudioControls audio={audio} muteButtonClick={muteButtonClick} />
        )}
      </div>
      <canvas id="canvas" className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    connected: state.websockets.connected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    muteButtonClick: () => {
      dispatch(RosiGameActions.muteButtonClick());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouletteGameAnimation);
