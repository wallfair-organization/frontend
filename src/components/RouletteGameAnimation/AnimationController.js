import { options } from 'components/EmailNotifications/options';
import { init } from 'store/sagas/websockets';
//import * as PIXI from 'pixi.js-legacy';
//import '@pixi/math-extras';
//import '@pixi/sound';
//import * as Sound from '@pixi/sound';
import { isMobile } from 'react-device-detect';
import { AudioController } from '../AudioController';
import {toFixedNoRound} from "../../helper/Currency";

let sectionsArray = [[0.5, 1.22, 1.25, 0.3, 2, 1.22, 0.5, 1.25, 1.5, 0.42, 0.5, 1.22],
  [0, 1.22, 1.5, 0.3, 2, 1.22, 0, 1.5, 2, 0.42, 0.5, 1.22],
  [0, 1.22, 0.75, 0, 3, 1.22, 0, 2, 1.75, 0.22, 0.5, 1.22],
  [0, 1.22, 0.75, 0, 3, 0.22, 0, 3, 1.75, 0.22, 0.5, 1.22],
  [0, 1.22, 0, 0, 4, 0.22, 0, 3, 2, 0.22, 0, 1.22],
  [0, 0.22, 0, 0, 5, 0, 0, 3, 2, 0.44, 0, 1.22],
  [0, 0.22, 0, 0, 7, 0, 0, 2, 2, 0.44, 0, 0.22]]

let riskImages = [
  '/images/roulette-game/1.svg',
  '/images/roulette-game/2.svg',
  '/images/roulette-game/3.svg',
  '/images/roulette-game/4.svg',
  '/images/roulette-game/5.svg',
  '/images/roulette-game/6.svg',
  '/images/roulette-game/7.svg',
];
let updateValues = [];
let numberSelected = 0;
let colors = ['#734b95', '#db4a8c', '#6ca9da', '#f5e272'];
let idle2 = true
let canvas = null;
let img = new Image();

class AnimationController {
  init(canvas, options, typeSel) {
    this.canvas = canvas;
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    this.audio = new AudioController(0);
    this.audio.startBgm();
    this.gameStartTime = 0;
    this.gameStartTime = new Date();

    this.idle = true
    this.risk = options.risk
    this.amount = options.amount
    let sections = sectionsArray[this.risk-1]
    this.r = (Math.min(this.canvas.width, this.canvas.height) / 2.25) | 0;
    this.wheels = [];
    this.angle = 0;
    for (let selected = 0; selected < sections.length; selected++) {
      let c = document.createElement('canvas');
      c.id = selected;
      c.width = c.height = 2 * this.r + 10;
      let ctx = c.getContext('2d'),
        cx = 5 + this.r,
        cy = 5 + this.r;
      // this.g = ctx.createRadialGradient(cx, cy, 0, cx, cy, this.r);
      // this.g.addColorStop(0, 'rgba(0,0,0,0)');
      // this.g.addColorStop(1, 'rgba(0,0,0,0.5)');
      for (let i = 0; i < sections.length; i++) {
        let a0 = (2 * Math.PI * i) / sections.length;
        let a1 = a0 + (2 * Math.PI) / (i == 0 ? 1 : sections.length);
        let a = (2 * Math.PI * (i + 0.5)) / sections.length;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, this.r, a0, a1, false);
        ctx.fillStyle = colors[i % 4];
        ctx.fill();
        // ctx.fillStyle = this.g;
        // ctx.fill();
        ctx.save();
        if (i == selected) {
          ctx.fillStyle = '#FFF';
          ctx.shadowColor = '#000';
          ctx.shadowBlur = this.r / 20;
        } else {
          ctx.fillStyle = '#FFF';
          ctx.shadowColor = '#000';
          ctx.shadowBlur = this.r / 100;
        }
        ctx.font = (this.r / sections.length) * 1.6 + 'px DM Sans';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(cx, cy);
        ctx.rotate(a);
        ctx.fillText(toFixedNoRound(sections[i] * options.amount, 1), this.r * (isMobile?0.8:0.62), 0);
        ctx.restore();
      }

      this.wheels.push(c);
    }
    this.frame = document.createElement('canvas');
    this.frame.width = this.frame.height = (10 + 2 * this.r * 1.25) | 0;
    let ctx = this.frame.getContext('2d'),
      cx = this.frame.width / 2,
      cy = this.frame.height / 2;
    ctx.shadowOffsetX = this.r / 80;
    ctx.shadowOffsetY = this.r / 80;
    ctx.shadowBlur = this.r / 40;
    ctx.beginPath();
    ctx.arc(cx, cy, this.r * 1.025, 0, 2 * Math.PI, true);
    ctx.arc(cx, cy, this.r * 0.975, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#4b519f';
    ctx.fill();
    ctx.shadowOffsetX = this.r / 40;
    ctx.shadowOffsetY = this.r / 40;

    this.g = ctx.createRadialGradient(
      cx - this.r / 7,
      cy - this.r / 7,
      0,
      cx,
      cy,
      this.r / 3
    );
    this.g.addColorStop(0, '#FFF');
    this.g.addColorStop(0.2, '#F44');
    this.g.addColorStop(1, '#811');
    ctx.fillStyle = this.g;

    ctx.beginPath();
    ctx.arc(cx, cy, this.r / 3.5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI - 0.2);
    ctx.beginPath();
    ctx.moveTo(-this.r * 1.1, -this.r * 0.05);
    ctx.lineTo(-this.r * 0.9, 0);
    ctx.lineTo(-this.r * 1.1, this.r * 0.05);
    ctx.fillStyle = '#b04b4c';
    ctx.fill();
    ctx.clip();


    ctx.fill();
    this.spinTo(0, 200000, true);
    return {
      audio: this.audio,
      handle: this,
    };
  }

  destroy() {
    this.idle = false;
  }

  changeValues() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  reinit(canvas, options) {
    this.changeValues()
    this.risk = options.risk
    this.amount = options.amount
    let sections = sectionsArray[this.risk-1]
    this.r = (Math.min(this.canvas.width, this.canvas.height) / 2.25) | 0;
    this.wheels = [];
    img.src = '../images/roulette-game/alpaca-' + (this.risk) + '.svg';
    for (let selected = 0; selected < sections.length; selected++) {
      let c = document.createElement('canvas');
      c.id = selected;
      c.width = c.height = 2 * this.r + 10;
      let ctx = c.getContext('2d'),
        cx = 5 + this.r,
        cy = 5 + this.r;
      // this.g = ctx.createRadialGradient(cx, cy, 0, cx, cy, this.r);
      // this.g.addColorStop(0, 'rgba(0,0,0,0)');
      // this.g.addColorStop(1, 'rgba(0,0,0,0.5)');

      for (let i = 0; i < sections.length; i++) {
        let a0 = (2 * Math.PI * i) / sections.length;
        let a1 = a0 + (2 * Math.PI) / (i == 0 ? 1 : sections.length);
        let a = (2 * Math.PI * (i + 0.5)) / sections.length;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, this.r, a0, a1, false);
        ctx.fillStyle = colors[i % 4];
        ctx.fill();
        // ctx.fillStyle = this.g;
        // ctx.fill();
        ctx.save();
        if (i == selected) {
          ctx.fillStyle = '#FFF';
          ctx.shadowColor = '#000';
          ctx.shadowBlur = this.r / 20;
        } else {
          ctx.fillStyle = '#FFF';
          ctx.shadowColor = '#000';
          ctx.shadowBlur = this.r / 100;
        }
        ctx.font = (this.r / sections.length) * 1.6 + 'px DM Sans';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(cx, cy);
        ctx.rotate(a);
        ctx.fillText(toFixedNoRound(sections[i] * options.amount, 1), this.r * (isMobile?0.8:0.62), 0);
        ctx.restore();
      }
      this.wheels.push(c);
    }
    this.frame = document.createElement('canvas');
    this.frame.width = this.frame.height = (10 + 2 * this.r * 1.25) | 0;
    let ctx = this.frame.getContext('2d'),
      cx = this.frame.width / 2,
      cy = this.frame.height / 2;
    ctx.shadowOffsetX = this.r / 80;
    ctx.shadowOffsetY = this.r / 80;
    ctx.shadowBlur = this.r / 40;
    //ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.arc(cx, cy, this.r * 1.025, 0, 2 * Math.PI, true);
    ctx.arc(cx, cy, this.r * 0.975, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#4b519f';
    ctx.fill();
    ctx.shadowOffsetX = this.r / 40;
    ctx.shadowOffsetY = this.r / 40;

    ctx.beginPath();
    ctx.arc(cx, cy, this.r / 3.5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI - 0.2);
    ctx.beginPath();
    ctx.moveTo(-this.r * 1.1, -this.r * 0.05);
    ctx.lineTo(-this.r * 0.9, 0);
    ctx.lineTo(-this.r * 1.1, this.r * 0.05);
    ctx.fillStyle = '#b04b4c';
    ctx.fill();
    ctx.clip();
    ctx.fill();
    return {
      audio: this.audio,
      handle: this,
    };
  }
  //when calling repaint pass to the method the new index image from riskImages
  repaint(angle, play, idle) {
    let sections = sectionsArray[this.risk-1]
    /*const elapsed = Date.now() - this.gameStartTime;
    if (this.audio) {
      this.audio.setElapsed(elapsed);
    }*/
    this.angle = angle ? angle : this.angle

    let cx = this.canvas.width / 2,
      cy = this.canvas.height / 2;
    let ctx = this.canvas.getContext('2d');
    let selected =
      Math.floor(((-0.2 - this.angle) * sections.length) / (2 * Math.PI)) %
      sections.length;

    if (selected !== numberSelected) {
      if (play) this.audio.playTick();
      numberSelected = selected;
    }
    if (selected < 0) selected += sections.length;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.angle);
    ctx.translate(
      -this.wheels[selected].width / 2,
      -this.wheels[selected].height / 2
    );
    ctx.drawImage(this.wheels[selected], 0, 0);

    ctx.restore();
    ctx.drawImage(
      this.frame,
      cx - this.frame.width / 2,
      cy - this.frame.height / 2
    );

    if(!play) {
      img.onload = function () {
        ctx.drawImage(img, cx - 210 / 2, cy - 210 / 2, 210, 210);
      }
    } else {
      ctx.drawImage(img, cx - 210 / 2, cy - 210 / 2, 210, 210);
    }
  }
  spinTo(winnerIndex, duration = 5000, idle = false) {
    this.idle = idle
    let sections = sectionsArray[this.risk-1]
    return new Promise(resolve => {
      let final_angle = -0.2 - ((0.5 + winnerIndex) * 2 * Math.PI) / sections.length;
      let start_angle =
        this.angle -
        Math.floor(this.angle / (2 * Math.PI)) * 2 * Math.PI -
        5 * 2 * Math.PI;
      let start = performance.now();
      function frame() {
        let now = performance.now();
        let t = Math.min(1, (now - start) / duration);
        t = 3 * t * t - 2 * t * t * t; // ease in out
        let angle = idle ? this.angle - 0.001 : (start_angle + t * (final_angle - start_angle));
        if(!this.idle && idle) {resolve(null);return}
        this.repaint(angle, true, idle);
        if (t < 1) requestAnimationFrame(frame.bind(this));
        else {
          resolve(sections[winnerIndex] * this.amount);
          sections[winnerIndex] > 1 && this.audio.playWinSound();
          sections[winnerIndex] < 1 && this.audio.playLoseSound();
          this.spinTo(0, 200000, true);
        }
      }
      requestAnimationFrame(frame.bind(this));
    });
  }
}

export default new AnimationController();
