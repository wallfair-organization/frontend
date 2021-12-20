import cn from 'classnames';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import styles from './styles.module.scss';
import VolumeSlider from '../VolumeSlider';
import { AudioController } from '../AudioController';
import { AnimationController, BackgroundPlinko } from './AnimationController'
import GameAudioControlsLocal from '../GameAudioControlsLocal';
import { isMobile } from 'react-device-detect';

/*const colors = ["#d7393f", "#dd8549", "#e6e76a"]
const backgroundString = (backg) =>`conic-gradient(from 90deg at 50% 50%, ${colors[backg]} 0%,
  ${colors[backg]} 10%, ${colors[backg+1]} 10%,
  ${colors[backg+1]} 15%, ${colors[backg+2]} 15%,
  ${colors[backg+2]} 20%, ${colors[backg]} 20%,
  ${colors[backg]} 25%, ${colors[backg+1]} 25%,
  ${colors[backg+1]} 30%, ${colors[backg+2]} 30%,
  ${colors[backg+2]} 35%, ${colors[backg]} 35%,
  ${colors[backg]} 40%, ${colors[backg+1]} 40%,
  ${colors[backg+1]} 45%, ${colors[backg+2]} 45%,
  ${colors[backg+2]} 50%, ${colors[backg]} 50%,
  ${colors[backg]} 55%, ${colors[backg+1]} 55%,
  ${colors[backg+1]} 60%, ${colors[backg+2]} 60%,
  ${colors[backg+2]} 65%, ${colors[backg]} 65%,
  ${colors[backg]} 70%, ${colors[backg+1]} 70%,
  ${colors[backg+1]} 75%, ${colors[backg+2]} 75%,
  ${colors[backg+2]} 80%, ${colors[backg]} 80%,
  ${colors[backg]} 85%, ${colors[backg+1]} 85%,
  ${colors[backg+1]} 90%, ${colors[backg+2]} 90%,
  ${colors[backg+2]} 95%, ${colors[backg]} 95%,
  ${colors[backg]} 100%, ${colors[backg+1]} 100%)`
*/
const PlinkoGameAnimation = ({
  connected,
  amount,
  activities,
  onInit,
  risk,
  setBet,
  userId,
  setSpins,
  bet
}) => {
  const dispatch = useDispatch();
  const backgroundRef = useRef(null);

  const [audio, setAudio] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [backg, setBackg] = useState(0);
  const [lastgame, setLastgame] = useState(null);
  const [shadow, setShadow] = useState(null);
  //const [backgr, setBackgr] = useState(backgroundString(0));
  const [flag, setFlag] = useState(false);
  const [ball, setBall] = useState(null);

  useEffect(() => {
    const lastnewgame = activities[activities.length-1]?.data
    if(activities?.length > 0 && lastgame != lastnewgame.gameHash && lastnewgame.gameName == "GAME_PLINKO" && lastnewgame.userId != userId){
      lastgame && setShadow(lastnewgame.path)
      setLastgame(lastnewgame.gameHash)
    }
  }, [activities])

  useEffect(() => {
    if(backgroundRef) {
      setWidth(backgroundRef.current.clientWidth)
      setHeight(backgroundRef.current.clientHeight)
    }
    const aud = new AudioController(1)
    setAudio(aud)
    aud.startBgm();
    onInit(aud)
    return () => {
      aud.stopBgm();
    }
  },[])

  /*
  useEffect(() => {
    setBackgr(backgroundString(backg))
  },[backg])
*/

  useEffect(() => {
    if(bet && !bet.ready && bet.path) spin(bet);
  }, [bet]);

  const spin = async () => {
    setBall({ path: bet.path, winMultiplier: bet.winMultiplier })
    !bet.autobet && setBet((bet) => {return{ball: bet.ball, ready: true, amount: bet.amount, profit: bet.profit, reward: bet.reward, gameHash: bet.gameHash}});
  }

  const changeBackground = (count) => {
    if(flag) return
    else setFlag(true)
    setBackg((backg) => backg === 2 ? 0 : backg + 1)
    setTimeout(() => {
      setBackg((backg) => backg === 2 ? 0 : backg + 1)
      count < 30 ? changeBackground(count + 1) : setFlag(false)
    }, 100)
  }

  const handleEnd = (win, demo) => {
    if(demo) {
      setBet((bet) => {return {...bet, ball: bet.ball-1}})
      return
    }
    if(win) {
      audio.playWinSound()
      changeBackground(0)
    } else audio.playLoseSound();

    const newSpin = {};
    if (bet.profit > 0) {
      newSpin.type = 'win';
      newSpin.value = '+' + bet.profit;
    } else if(bet.profit === 0) {
      newSpin.type = 'even';
      newSpin.value = bet.profit;
    } else {
      newSpin.type = 'loss';
      newSpin.value = bet.profit;
    }

    newSpin.gameHash = bet.gameHash;

    setSpins((spins) => [newSpin].concat(spins))

    bet.autobet ?
     setBet((bet) => {return {...bet, ball: bet.ball-1, ready: true}}) :
     setBet((bet) => {return {...bet, ball: bet.ball-1}})
  }

  return (
    <div ref={backgroundRef} className={styles.animation}>
      {audio && <GameAudioControlsLocal game='plinko' audio={audio} />}
      <img className={styles.trape} src="/images/casino-games/Trapezoid.png" alt="" />
      <BackgroundPlinko state={backg} width={width} height={height} size={Math.sqrt(width*width+height*height)*1.1} />
      {width && height && <AnimationController risk={risk} amount={bet.autobet ? bet.amount:amount} ballValue={ball} audio={audio} onEnd={handleEnd} setBall={setBall} shadow={shadow} setShadow={setShadow} />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.authentication.userId,
    activities: state.notification.activities,
    connected: state.websockets.connected
  };
};

export default connect(mapStateToProps)(PlinkoGameAnimation);
