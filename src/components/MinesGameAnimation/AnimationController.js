import {options} from 'components/EmailNotifications/options';
import {init} from 'store/sagas/websockets';

import * as PIXI from 'pixi.js-legacy';
import '@pixi/math-extras';
import '@pixi/sound';
import * as Sound from '@pixi/sound';

//game deps
import Game from "./game/index.js";
import {Application} from "./sources/extensions/index.js";
import {LayoutManager, ResourceLoader} from "./sources/libs/index.js";
import {applicationConfig} from "./configs";

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
        bgm: {
          url: '/sounds/mines/bgm.mp3',
          loop: true,
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
        coin: {
          url: '/sounds/mines/sfx-coin.mp3',
          loop: false,
        },
        poop: {
          url: '/sounds/mines/sfx-poop.mp3',
          loop: false,
        }
      },
      {
        loaded: (err, data) => {
          if (err) {
            this.errors = [...this.errors, err];
          }
        },
        preload: false
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
      Sound.sound.volume('bgm', volume);
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
    const diff = this.elapsed / 1000;
    if (this.bgmIndex === 0) {
      this.playSound('bgm', true);
    }
  }

  stopBgm() {
    this.stopSound('bgm');
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

  playBetSound() {
    this.playSound('placebet');
  }

  playCoinSfx() {
    this.playSound('coin');
  }

  playPoopSfx() {
    this.playSound('poop');
  }
}

class AnimationController {
  init(canvas, options) {
    const {gameConfig, layoutManagerConfig, applicationConfig, resourcesConfig, gameViewConfig} = options;
    this.game = new Game();
    this.canvas = canvas;
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    this.audio = new AudioController(0);
    this.audio.startBgm();

    this.idle = true
    this.risk = options.risk
    this.amount = options.amount
    // let sections = sectionsArray[this.risk-1];
    /* Create an instance of game, initialize it and set game config */

    this.game.initialize({
      cellClickHandler: options.cellClickHandler,
      checkSelectedCell: options.checkSelectedCell,
      audio: this.audio
    });
    this.game.useConfig({gameConfig, gameViewConfig});

    /* Create an instance of PIXI.Application. Use the game application config for it */
    const app = new Application(applicationConfig);

    let texture = PIXI.Texture.from(require('./assets/bg.png').default);
    let sprite1 = new PIXI.Sprite(texture);
    sprite1.scale.x = 0.3;
    sprite1.scale.y = 0.24;
    app.stage.addChild(sprite1);
    app.stage.addChild(this.game.controller.view);

    app.ticker.add(this.game.update, this.game);

    const updateCanvasSizes = ({width, height}) => {
      app.view.style.width = `${width}px`;
      app.view.style.height = `${height}px`;
    };

    const updateRenderSizes = ({width, height}) => {
      app.renderer.resize(width, height);
    };

    /* Use the layout manager config to set base sizes for the game and PIXI.Renderer canvas
       Subscribe on resize event */
    const layoutManager = new LayoutManager(layoutManagerConfig);
    layoutManager.on("resize", ({globalSizes, recalculatedSizes}) => {
      // updateCanvasSizes(globalSizes);
      // updateRenderSizes(recalculatedSizes);
      // game.resize(recalculatedSizes);
    });

    /* just for development mode */
    // if (gameConfig.debuggerMode) {
    //   window.game = {
    //     controller: this.game.controller,
    //     pixiStage: app.stage,
    //     layoutManager
    //   };
    // }

    /* Use the resources config to add all assets data to a loader. */
    const loader = new ResourceLoader();
    loader.resPackages = resourcesConfig;

    /* Run loader and after it has loaded all assets, run the game */
    loader.runLoader(
      () => {
        this.game.run();
        const sizes = {
          width: this.canvas.width,
          height: this.canvas.height
        };

        updateRenderSizes(sizes);
        updateCanvasSizes(sizes);
        this.game.resize(sizes);

        if(gameConfig.initialReveal && gameConfig.initialReveal.length) {
          this.game.controller.view.revealCells(gameConfig.initialReveal);
          this.game.controller.model.updateCellsData(gameConfig.initialReveal);
        }
      },
      (resPack) => {
        this.game.setResources(resPack);
      }
    );


    return {
      audio: this.audio,
      that: this
    };
  }

  destroy() {
    this.idle = false;
  }

  async clickCell(props) {
    return this.game.clickCell(props)
  }

  restart() {
    this.game.restartGame();
  }
}

export default new AnimationController();
