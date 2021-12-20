import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import VolumeSlider from '../VolumeSlider';
import { AudioController } from '../AudioController';
import GameAudioControlsLocal from '../GameAudioControlsLocal';
import { isMobile } from 'react-device-detect';
import { StylesProvider } from '@material-ui/styles';
import { selectUser } from 'store/selectors/authentication';

const AlpacannonGameAnimation = ({
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

  const user = useSelector(selectUser);
  const [game, setGame] = useState('ready');
  const [audio, setAudio] = useState(null);
  const [slider, setSlider] = useState(0);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() =>{
    const aud = new AudioController(2)
    setAudio(aud)
    aud.startBgm()
    onInit(aud)
    window.addEventListener('resize', updateSize);
    updateSize()
    return () => {
      aud.stopBgm();
    }
  }, [])

  const updateSize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    if(bet && !bet.ready && bet.amount && !bet.running) spin(bet)
  }, [bet]);

  const spin = () => {
    const crash = bet.rollValue//Math.round(Math.random()*100)
    setBet((bet) => {return{...bet, win: bet.profit > 0, running: true, crash: (100 - crash), crashDegree: (crash - 50)*45/50, crashPosition: (((100 - crash) - 50)*35/50) + 41} })
    setGame('cannon')
    setTimeout(() => {
      audio.playCannonSound();
      setGame('shoot')
    }, 1400)
    setTimeout(() => {
      setGame('crashed')
      audio.playCrashSound()
      if(user.isLoggedIn){
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
      }
      setTimeout(() => {setBet((bet) => {return{...bet, ready: true, running: false}})}, 1000)
    }, 2400)
    setTimeout(() => {
      setGame('ready')
    }, 3400)
  }

  const interpolate = (number) => 100 - Math.floor((Number(number) + 42)*96/80)

  const interpolateMultiplier = (number) => {
    const EDGE = 0.025
    return (100 / interpolate(number)) * (1 - EDGE)
  }

  const onSlider = (e) => {
    setBet((bet) => {return {...bet, rollover: 100 - interpolate(e.target.value)}})
    setSlider(e.target.value)
  }

  return (
    <div
      ref={backgroundRef}
      className={classNames(
        (height < width && (width < 600 || isMobile)) && styles.animationMobilePortrait,
        (width < 600 || isMobile) && styles.animationMobile,
        styles.animation
      )}
    >
      <img className={styles.background} src={(height < width && (width < 600 || isMobile)) ? "/images/cannon-games/alpacannon-background-landscape_new.png" : (width < 600 || isMobile) ? "/images/cannon-games/alpacannon_background_mobile_new.png": "/images/cannon-games/alpacannon_background_desktop_new.png"} alt="background" />
      {audio && <GameAudioControlsLocal game='cannon' audio={audio} />}
      <input
        className={styles.slider}
        value={slider}
        onChange={onSlider}
        style={{zIndex: game==='ready' && 5, background: `linear-gradient(90deg, rgba(240,0,0,1) ${100 - interpolate(slider)}%, rgba(0,255,0,1) ${100 - interpolate(slider)}%)`}}
        type="range"
        step={1}
        min={-40}
        max={40} />
      <div className={styles.chance}>
        <span>{interpolate(slider)}%</span>
      </div>
      <div className={styles.interpolateMultiplier}>
        <span>{interpolateMultiplier(slider).toFixed(2)}</span>
      </div>
      <img className={styles.alpacaFlying} style={{ opacity: game === 'shoot' ? 1 : 0, bottom: game !== 'shoot' ? '-10%':(width < 600?'49%':'55%'), right: game !== 'shoot' ? (bet.crash > 65 ? `45%` : bet.crash < 35?`45%`:'46%') : width < 600?`calc(${bet.crashPosition}%`:`calc(${bet.crashPosition}% + 40px)`}} src={bet.crash < 35 ? "/images/cannon-games/alpaca-right.svg" : bet.crash > 65 ? "/images/cannon-games/alpaca-left.svg" : "/images/cannon-games/alpaca-center.svg" } alt="alpaca flying" />
      <img className={styles.alpacaCrash} style={{ opacity: game === 'crashed' ? 1 : 0, right: width < 600?`calc(${bet.crashPosition}%`:`calc(${bet.crashPosition}% + 40px)`}} src={bet.crash > 65 ? "/images/cannon-games/alpaca-crash-left.png" : bet.crash < 35 ? "/images/cannon-games/alpaca-crash.png" : "/images/cannon-games/alpaca-crash.png"} alt="alpaca crash" />
      <div className={styles.alpaResult} style={{ zIndex: game === 'crashed' ? 5:4, opacity: game === 'crashed' ? 1 : 0, right: width < 600?`calc(${bet.crashPosition}%`:`calc(${bet.crashPosition}% + 40px)`}}>
        <img src="/images/cannon-games/score.svg" alt="alpaca crash" />
        <span style={{color: bet.win ? '#2dcb70':'#ff5858'}}>{100 - bet.crash}</span>
      </div>
      <div className={styles.fullcannon} style={{ zIndex: game === 'shoot' ? 6 : 1, transform: bet.crashDegree && (game === 'cannon' || game === 'shoot') ? `rotate(${bet.crashDegree}deg)` : `rotate(0deg)`}}>
        <img className={styles.cannon} src="/images/cannon-games/cannon.png" alt="cannon" />
        <img className={styles.alpacaInCannon} style={{opacity: (game==='ready' || game==='cannon')?1:0}} src="/images/cannon-games/alpaca-in-cannon.png" alt="alpaca in cannon" />
        <img className={styles.explotion} style={{ opacity: game === 'shoot' ? 1 : 0 }} src="/images/cannon-games/explotion.svg" alt="explotion" />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.authentication.userId,
    activities: state.notification.activities,
    connected: state.websockets.connected
  }
}

export default connect(mapStateToProps)(AlpacannonGameAnimation);
