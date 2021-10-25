import * as PIXI from 'pixi.js';
import '@pixi/math-extras';
import '@pixi/sound';
import * as Sound from '@pixi/sound';
import RosiAnimationBackground from './Background';
import { CoinAnimation } from './CoinAndTrajectory';
import TWEEN from '@tweenjs/tween.js';
import CoinExplosion from './CoinExplosion';
import { calcCrashFactorFromElapsedTime, isMobileRosiGame } from './utils';
import CashedOutAnimation from './CashedOutAnimation';
import PreparingRound from './PreparingRound';
import { ROSI_GAME_INTERVALS } from 'constants/RosiGame';
import { isString } from 'lodash/lang';

// hide PIXI welcome messege in console
PIXI.utils.skipHello();

class AudioController {
  constructor(volume = 1.0, bgmIndex = 0) {
    this.errors = [];
    this.volume = isString(volume) ? parseInt(volume) : volume;
    this.bgmIndex = bgmIndex;
    this.elapsed = 0;
    this.ready = true;

    Sound.sound.add(
      {
        bgm: {
          url: '/sounds/elon/elon_bgm.mp3',
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

      Sound.sound.volume('bgm', this.volume);
      Sound.sound.volume('flying', this.volume);
    } catch (e) {
      console.error('Audio output error');
    }
  }

  mute() {
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
    if (this.bgmIndex === 1) {
      this.playSound('flying', true);
    }
  }

  stopBgm() {
    this.stopSound('bgm');
    this.stopSound('flying');
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

function loadAssets(loader) {
  const deviceType = isMobileRosiGame ? 'mobile' : 'desktop';
  const resolution = deviceType === 'mobile' ? 2 : 1;

  const constructPath = asset =>
    `/images/rosi-game/${deviceType}/@${resolution}x/${asset}`;

  loader
    .add('coin', constructPath('coin.png'))
    .add('elonmusk', constructPath('elonmusk.png'))
    .add('redPlanet', constructPath('redPlanet.png'))
    .add('purplePlanet', constructPath('purplePlanet.png'))
    .add('planet1', constructPath('planet1.png'))
    .add('planet2', constructPath('planet2.png'))
    .add('planet3', constructPath('planet3.png'))
    .add('planet4', constructPath('planet4.png'))
    .add('star1', constructPath('star1.png'))
    .add('star2', constructPath('star2.png'))
    .add('starship', constructPath('starship.png'))
    .add('particle', constructPath('particle.png'))
    .add('preparing-round-anim', constructPath('preparing-round-anim.json'))
    .add('elon-coin-animation', constructPath('elon-coin-animation.json'))
    .add(
      'preparing-round-anim-car',
      constructPath('preparing-round-anim-car.json')
    )
    .add(
      'preparing-round-anim-running',
      constructPath('preparing-round-anim-running.json')
    );

  loader.load();

  return new Promise(resolve => {
    loader.onComplete.add(resolve);
  });
}

class RosiAnimationController {
  init(canvas, options) {
    this.app = new PIXI.Application({
      view: canvas,
      backgroundColor: 0x12132e,
      resizeTo: canvas.parentElement,
      resolution: 1,
      antialias: true,
    });

    this.audioReady = false;
    let volumeLevel = '1.0';
    try {
      volumeLevel = localStorage.getItem('gameVolume');
    } catch (e) {
      console.error(e);
    }
    this.audio = new AudioController(1.0);

    this.audio.setBgmIndex(options.musicIndex);

    this.gameStartTime = 0;
    this.lastCrashFactor = 1.0;
    this.currentIntervalIndex = -1;
    this.animationIndex = options.animationIndex;
    return {
      audio: this.audio,
    };
  }

  load(done) {
    loadAssets(this.app.loader).then(() => {
      if (done) {
        this.drawElements();
        this.app.ticker.add(dt => this.update(dt));
        done();
      }
    });
  }

  update(dt) {
    const coinPos = this.coinAndTrajectory.getCoinCrashPosition();
    const elapsed = Date.now() - this.gameStartTime;
    const crashFactor = Number(calcCrashFactorFromElapsedTime(elapsed)) || 1.0;
    const maxElonFrames = this.coinAndTrajectory.getElonFramesCount();

    const intervals = ROSI_GAME_INTERVALS;
    const currentInterval =
      intervals.find(
        ([fromFactor, toFactor]) =>
          crashFactor >= fromFactor && crashFactor < toFactor
      ) || intervals[intervals.length - 1];

    const [_f, _t, speed, elonFrame] = currentInterval;
    const currentIntervalIndex = intervals.indexOf(currentInterval);

    if (this.audio) {
      this.audio.setElapsed(elapsed);
    }

    if (
      this.coinAndTrajectory.canUpdateElonFrame() &&
      elonFrame < maxElonFrames
    ) {
      this.coinAndTrajectory.setElonFrame(elonFrame);
    }

    if (this.currentIntervalIndex !== currentIntervalIndex) {
      this.background.setStarsSpeed(speed);
      this.currentIntervalIndex = currentIntervalIndex;
    }

    if (this.background.shouldShowStarshipAnimation(crashFactor)) {
      this.background.doStarshipAnimation();
    }

    TWEEN.update(this.app.ticker.lastTime);
    this.cashedOut.update(dt, elapsed, coinPos);
    this.background.update(dt, this.coinAndTrajectory.trajectoryAngle);
  }

  drawElements() {
    this.background = new RosiAnimationBackground(this.app);
    this.app.stage.addChild(this.background.container);

    this.coinExplosion = new CoinExplosion(this.app);
    this.coinAndTrajectory = new CoinAnimation(this.app);
    this.cashedOut = new CashedOutAnimation(this.app, this.coinAndTrajectory);
    this.preparingRound = new PreparingRound(this.app, this.animationIndex);

    this.app.stage.addChild(this.coinAndTrajectory.container);
    this.app.stage.addChild(this.cashedOut.container);
    this.app.stage.addChild(this.coinExplosion.container);
    this.app.stage.addChild(this.preparingRound.container);
  }

  start(gameStartTime, musicIndex) {
    this.preparingRound.hide();
    this.coinAndTrajectory.startCoinFlyingAnimation(gameStartTime);
    this.cashedOut.reset();
    this.gameStartTime = gameStartTime;
    this.currentIntervalIndex = -1;
    this.background.updateStarshipAnimationTrigger();
    this.audio.setBgmIndex(musicIndex);
    this.audio.startBgm();
  }

  end(isLosing) {
    const coinPosition = this.coinAndTrajectory.getCoinExplosionPosition();
    this.coinExplosion.startAnimation(coinPosition.x, coinPosition.y);
    this.cashedOut.crashed = true;
    this.coinAndTrajectory.endCoinFlyingAnimation();
    isLosing ? this.audio.playLoseSound() : this.audio.playGameOverSound();
    this.audio.stopBgm();
  }

  doCashedOutAnimation(data) {
    const point = this.coinAndTrajectory.getCoinCrashPosition();
    const elapsed = Date.now() - this.gameStartTime;
    this.cashedOut.animate(point.x, data.amount, data.crashFactor, elapsed);
  }
}

export default new RosiAnimationController();
