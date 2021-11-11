import { options } from 'components/EmailNotifications/options';
import { init } from 'store/sagas/websockets';
import * as PIXI from 'pixi.js';
import '@pixi/math-extras';
import '@pixi/sound';
import * as Sound from '@pixi/sound';
import { isMobile } from 'react-device-detect';

let sectionsArray = [[0.5, 1.22, 1.25, 0.3, 2, 1.22, 0.5, 1.25, 1.5, 0.42, 0.5, 1.22],
  [0, 1.22, 1.5, 0.3, 2, 1.22, 0, 1.5, 2, 0.42, 0.5, 1.22],
  [0, 1.22, 1.5, 0.3, 2, 1.22, 0, 1.5, 2, 0.42, 0.5, 1.22],
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
let colors = ['#0bf', '#fb0', '#bf0', '#b0f'];

PIXI.utils.skipHello();
let canvas = null;
let img = new Image();

class AudioController {
  constructor(bgmIndex = 0) {
    let volume = 0;
    try {
      const savedVolume = localStorage.getItem('gameVolume');
      this.volume = savedVolume ? parseFloat(savedVolume) : volume;
    } catch (e) {
      this.volume = 0;
      console.error(e);
    }
    this.errors = [];
    this.bgmIndex = bgmIndex;
    this.elapsed = 0;
    this.ready = true;

    Sound.sound.add(
      {
        bgm: {
          url: '/sounds/roulette/wheel_bg.mp3',
          loop: true,
        },
        flying: {
          url: '/sounds/elon/flying.mp3',
          loop: true,
        },
        gameover: {
          url: '/sounds/elon/sfx_gameover.mp3',
          loop: false,
        },
        lose: {
          url: '/sounds/elon/sfx_lose.mp3',
          loop: false,
        },
        cashout: {
          url: '/sounds/elon/sfx_cashout3.mp3',
          loop: false,
        },
        placebet: {
          url: '/sounds/elon/sfx_placebet.mp3',
          loop: false,
        },
        tick: {
          url: '/sounds/roulette/sfx_tick.mp3',
          loop: false,
        }
      },
      {
        loaded: (err, data) => {
          if (err) {
            this.errors = [...this.errors, err];
          }
        },
        preload: true,
      }
    );
  }

  setVolume(volume = 1.0) {
    try {
      if (volume === 1 || volume === '1') {
        this.volume = 1.0;
      } else if (!volume) {
        this.volume = 0.0;
      } else {
        this.volume = volume;
      }

      localStorage.setItem('gameVolume', `${volume}`);

      Sound.sound.volume('bgm', this.volume);
      //Sound.sound.volume('flying', this.volume);
    } catch (e) {
      console.error('Audio output error');
    }
  }

  mute() {
    localStorage.setItem('gameVolume', 0.0);
    this.setVolume(0.0);
  }

  setElapsed(elapsed) {
    this.elapsed = elapsed;
  }

  setBgmIndex(idx = 0) {
    this.bgmIndex = idx;
  }

  playSound(name, loop = false) {
    try {
      if (this.ready) {
        if(name === 'bgm') this.volume=0.1;
        Sound.sound.volume(name, this.volume);
        Sound.sound.play(name, {
          loop: loop,
        });
      }
    } catch (e) {
      console.error('Audio output error');
    }
  }

  stopSound(name) {
    Sound.sound.stop(name);
  }

  startBgm() {
    const diff = this.elapsed / 1000;
    if (this.bgmIndex === 0) {
      this.playSound('bgm', true);
    }
  }

  stopBgm() {
    this.stopSound('bgm');
    this.stopSound('flying');
  }
  playTick() {
    this.playSound('tick');
  }

  playGameOverSound() {
    this.playSound('gameover');
  }

  playLoseSound() {
    this.playSound('lose');
  }

  playWinSound() {
    this.playSound('cashout');
  }

  playBetSound() {
    this.playSound('placebet');
  }
}

class AnimationController {
  init(canvas, options, typeSel) {
    this.canvas = canvas;
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    this.audio = new AudioController(0);
    this.audio.startBgm();
    this.gameStartTime = 0;

    this.idle = false
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
          ctx.fillStyle = '#000FFF';
          ctx.shadowColor = '#000';
          ctx.shadowBlur = this.r / 100;
        }
        ctx.font = (this.r / sections.length) * 1.6 + 'px PlusJakarta-Regular';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(cx, cy);
        ctx.rotate(a);
        ctx.fillText(Math.floor(sections[i] * options.amount), this.r * (isMobile?0.8:0.62), 0);
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
    ctx.fillStyle = '#444';
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
    ctx.fillStyle = '#F44';
    ctx.fill();
    ctx.clip();


    ctx.fill();
    return {
      audio: this.audio,
    };
  }
  reinit(canvas, options) {
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
          ctx.fillStyle = '#000FFF';
          ctx.shadowColor = '#000';
          ctx.shadowBlur = this.r / 100;
        }
        ctx.font = (this.r / sections.length) * 1.6 + 'px PlusJakarta-Regular';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(cx, cy);
        ctx.rotate(a);
        ctx.fillText(Math.floor(sections[i] * options.amount), this.r * (isMobile?0.8:0.62), 0);
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
    ctx.fillStyle = '#444';
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
    ctx.fillStyle = '#F44';
    ctx.fill();
    ctx.clip();
    ctx.fill();
    return {
      audio: this.audio,
    };
  }
  //when calling repaint pass to the method the new index image from riskImages
  repaint(angle, play, idle) {
    let sections = sectionsArray[this.risk-1]
    this.angle = angle
    let cx = this.canvas.width / 2,
      cy = this.canvas.height / 2;
    let ctx = this.canvas.getContext('2d');
    let selected =
      Math.floor(((-0.2 - this.angle) * sections.length) / (2 * Math.PI)) %
      sections.length;

    if (!idle && selected !== numberSelected) {
      numberSelected = selected;
      if (play) this.audio.playTick();
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
    img.src = '../images/roulette-game/' + (this.risk) + '.svg';

    if(!play) {
      img.onload = function () {
        ctx.drawImage(img, cx - 210 / 2, cy - 210 / 2, 210, 210);
      }
    } else {
      ctx.drawImage(img, cx - 210 / 2, cy - 210 / 2, 210, 210);
    }
  }
 changeValues() {
   var canvas = document.getElementById("canvas");
   var context = canvas.getContext('2d');
   context.clearRect(0, 0, canvas.width, canvas.height);
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
        let angle = idle ? (start_angle - t * (final_angle - start_angle)) : (start_angle + t * (final_angle - start_angle));
        if(this.idle && idle || !this.idle && !idle) {
          this.repaint(angle, true, idle);
        }
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
