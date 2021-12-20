import * as PIXI from 'pixi.js-legacy';
import '@pixi/math-extras';
import '@pixi/sound';
import * as Sound from '@pixi/sound';
PIXI.utils.skipHello();

export class AudioController {
  constructor(bgmIndex = 0) {
    let volume = 0.0;
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
        bgm0: {
          url: '/sounds/roulette/wheel_bg.mp3',
          loop: true,
        },
        bgm1: {
          url: '/sounds/plinko/plinko_bgm.mp3',
          loop: true,
        },
        bgm2: {
          url: '/sounds/cannon/bgm.mp3',
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
        crash: {
          url: '/sounds/cannon/crash.mp3',
          loop: false,
        },
        cannon: {
          url: '/sounds/cannon/cannon.mp3',
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
        preload: false,
      }
    );
  }

  setVolume(volume = 1) {
    try {
      if (volume === 1 || volume === '1') {
        this.volume = 1.0;
      } else if (!volume) {
        this.volume = 0.0;
      } else {
        this.volume = volume;
      }
      localStorage.setItem('gameVolume', `${volume}`);
      Sound.sound.volume(`bgm${this.bgmIndex}`, volume);
    } catch (e) {
      console.error('Audio output error');
    }
  }

  mute() {
    localStorage.setItem('gameVolume', 0);
    this.setVolume(0);
  }

  setElapsed(elapsed) {
    this.elapsed = elapsed;
  }

  setBgmIndex(idx = 0) {
    this.bgmIndex = idx;
  }

  playSound(name, loop = false, volume) {
    try {
      if (this.ready) {
        Sound.sound.volume(name, volume && this.volume != 0 ? volume : this.volume === 0 ? '0.0' : this.volume);
        Sound.sound.play(name, {
          loop: loop
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
    this.playSound(`bgm${this.bgmIndex}`, true);
  }

  stopBgm() {
    this.stopSound(`bgm${this.bgmIndex}`);
  }

  playTick() {
    this.playSound('tick', false, 1);
  }

  playGameOverSound() {
    this.playSound('gameover');
  }

  playLoseSound() {
    this.playSound('lose', false, 1);
  }

  playWinSound() {
    this.playSound('cashout', false, 1);
  }

  playCannonSound() {
    this.playSound('cannon', false, 1);
  }

  playCrashSound() {
    this.playSound('crash', false, 1);
  }

  playBetSound() {
    this.playSound('placebet');
  }

}
