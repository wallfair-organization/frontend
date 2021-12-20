import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import {GAMES} from '../../constants/Games';

const GAME_CFG = GAMES.plinko;
const rows = 12, ball = 20, row = 30, peg = 10, separation = 30;

const formatk = (num) => {
  return Math.abs(num) > 999999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'M' : Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

export const AnimationController = ({risk = 1, ballValue, amount, onEnd, setBall, audio, shadow, setShadow}) => {
  const outcomesByRisk = GAME_CFG.outcomesByRisk;

  const prevOutcomes = outcomesByRisk[0].reduce((outs, out) => {
    return outs.concat({value: out, amount: Math.floor(amount*out), bright: false})
  }, [])
  const [outcomes, setOutcomes] = useState(prevOutcomes);
  const [nball, setNball] = useState(0);
  const [nshadow, setNshadow] = useState(0);
  const boardref = useRef(null);
  const brightBasket = (winMultiplier,) => {
    /*if(shadow){
      setNshadow((nshadow)=>nshadow-1)
      onEnd(null, true)
      return
    }*/

    const right = ballValue.path.filter(n=>n==1).length >= ballValue.path.length/2
    const index = outcomes.findIndex((out, i) => right ? i > 5 && out.value === winMultiplier:out.value === winMultiplier)
    if(index > 0){
      setBox(index)
      onEnd(winMultiplier > 1)
    }else{
      onEnd(winMultiplier > 1, true)
    }
  }
  const setBox = (index) => {
    setOutcomes((outcomes) => outcomes.reduce((outs, out, i) => {return outs.concat(index===i ? {...out, bright: true}:out)}, []))
    setTimeout(() => {
      setOutcomes((outcomes) => outcomes.reduce((outs, out, i) => {return outs.concat(index===i ? {...out, bright: false}:out)}, []))
    }, 2000)
  }

  useEffect(() => {
    if(ballValue) {
      launchBall(ballValue, brightBasket, nball, boardref, audio, false)
      setNball((nball)=>nball+1)
      setBall(null)
    }
  }, [ballValue])

  useEffect(() => {
    if(nshadow < 6 && shadow) {
      launchBall({path: shadow}, brightBasket, nball, boardref, audio, true)
      setNball((nball)=>nball+1)
      setNshadow((nshadow)=>nshadow+1)
      setShadow(null)
    }
  }, [shadow])

  useEffect(() => {
    if(risk){
      const prevOutcomes = GAME_CFG.outcomesByRisk[risk-1].reduce((outs, out, i) => {
        return outs.concat({value: out, amount: Math.floor(amount*out), bright: outcomes[i].bright})
      }, [])
      setOutcomes(prevOutcomes)
    }
  }, [risk, amount])

  return (
    <div className={styles.board} style={{backgroundSize: isMobile ? '115%' : '100%'}} ref={boardref}>
      {false && <div id="ball" className={styles.ball}></div>}
      {Array.from({length: rows}).map((row, index) =>
        <div key={index} className={styles.row}>
          {Array.from({length: index+3}).map((peg, index) => <div key={index} className={styles.peg}></div> )}
        </div>
      )}
      <div className={styles.boxes}>
        {outcomes.map((box, index) => <div key={index} className={classNames(styles.box, box.bright && styles.bright, box.bright && 4 > index > 8 && styles.red)}>{formatk(box.amount)}</div>)}
      </div>
    </div>
  )
}

const launchBall = (ballValue, onBuscket, nball, boardref, audio, shadow) => {
  let ball1 = document.createElement('div')
  ball1.setAttribute("id", `ball-${nball}`);
  ball1.setAttribute("class", shadow ? styles.ballshadow : styles.ball)
  boardref.current.appendChild(ball1)
  ball1.style.transform = `translate(0px, 0px)`;
  setTimeout(()=>{
    ball1.style.transform = `translate(0px, ${ball-2}px)`;
    let index = 0
    for(let direction of ballValue.path){
      setTimeout(() => {
        moveBall(direction, `ball-${nball}`, audio)
      }, (index*350))
      index++
    }
    setTimeout(() => {
      fallToBuscket(onBuscket, `ball-${nball}`, ballValue.winMultiplier, shadow)
    }, (ballValue.path.length*350+1))
  }, 250)
}

const getXBall = (ball) => parseInt( document.getElementById(ball).style.transform.split("(")[1].split(", ")[0].replace("px",""))
const getYBall = (ball) => parseInt(document.getElementById(ball).style.transform.split("(")[1].split(", ")[1].replace("px",""))

function moveBall(direction, ball, audio) {
  setTimeout(() => {
    const x = getXBall(ball), y = getYBall(ball)
    const rotate = direction === 1 ? '0deg' : '0deg'
    const newX = direction === 1 ? x + separation/2 : x - separation/2
    document.getElementById(ball).style.transform = `translate(${newX}px, ${y+row/4}px) rotate(${rotate})`;
  }, 0)
  setTimeout(() => {
    const x = getXBall(ball), y = getYBall(ball)
    const newX = direction === 1 ? x+peg/2 : x-peg/2
    const rotate = direction === 1 ? '180deg' : '-180deg'
    document.getElementById(ball).style.transform = `translate(${newX}px, ${y+row/4}px) rotate(${rotate})`;
    }, 100)
  setTimeout(() => {
    audio.playTick()
    const x = getXBall(ball), y = getYBall(ball)
    const rotate = direction === 1 ? '360deg' : '-360deg'
    document.getElementById(ball).style.transform = `translate(${x}px, ${y+row/2+1}px) rotate(${rotate})`;
   }, 175)
}
function fallToBuscket(onBuscket, ball, winMultiplier, shadow) {
  const x = getXBall(ball), y = getYBall(ball)
  document.getElementById(ball).style.transform = `translate(${x}px, ${y+22}px) rotate(0)`;
  setTimeout(() => onBuscket(winMultiplier), 150)
  setTimeout(() => document.getElementById(ball).style.opacity = 0, 300)
  setTimeout(() => document.getElementById(ball).remove(), 500)
}
/*
export const BackgroundPlinko = ({size, state}) => {
  return(
    <div className={styles.background} style={{background:back }}><div/>
  )
}
*/

export const BackgroundPlinko = ({size, state, width, height}) => {
  const colors = ["#2f64b6", "#66b9e8", "#add1f1"]
  return(
    <svg className={styles.background} height={height} width={width}>
      <circle r={size/2} cx={width/2} cy={height/2} fill={colors[state % 3]} />
      <circle
        r={size/4}
        cx={width/2}
        cy={height/2}
        fill="transparent"
        stroke={colors[(state+1) % 3]}
        strokeWidth={size/2}
        strokeDasharray="50 100"
      />
      <circle
        r={size/4}
        cx={width/2}
        cy={height/2}
        fill="transparent"
        stroke={colors[(state+2) % 3]}
        strokeWidth={size/2}
        strokeDashoffset={50}
        strokeDasharray="50 100"
      />
    </svg>
  )
};
