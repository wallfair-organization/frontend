import { ROSI_GAME_MAX_DURATION_SEC } from 'constants/RosiGame';
import * as PIXI from 'pixi.js';
import * as particles from '@pixi/particle-emitter';
import { calcPercent, isMobileRosiGame } from './utils';
export class CoinAnimation {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();

    this.trajectory = new PIXI.Graphics();
    this.container.addChild(this.trajectory);

    this.elonAndCoin = new PIXI.Container();
    this.container.addChild(this.elonAndCoin);

    this.coin = new PIXI.Sprite(this.app.loader.resources.coin.texture);
    this.elonAndCoin.addChild(this.coin);

    const spritesheet =
      this.app.loader.resources['elon-coin-animation'].spritesheet;
    this.elon = new PIXI.AnimatedSprite(Object.values(spritesheet.textures));
    this.elon.x = -92 / (isMobileRosiGame ? 2 : 1);
    this.elon.y = -111 / (isMobileRosiGame ? 2 : 1);
    this.elonAndCoin.addChild(this.elon);

    this.elonAndCoindAnimationHandle = null;
    this.elonAfterExplosionAnimationHandle = null;

    this.setCoinDefaultPosition();

    this.container.visible = false;

    this.boundary = {
      x0: 0,
      x1: calcPercent(this.app.renderer.width, 95),
      y0: calcPercent(this.app.renderer.height, 77),
      y1: calcPercent(this.app.renderer.height, 25),
    };

    this.trajectoryAngle = Math.atan2(
      this.boundary.y0 - this.boundary.y1,
      this.boundary.x1 - this.boundary.x0,
      0
    );

    this.gameStartTime = Date.now();

    /* Particle (flame) */
    this.flameEmitter = new particles.Emitter(this.container, {
      lifetime: {
        min: 0.3,
        max: 0.75,
      },
      frequency: 0.0004,
      spawnChance: 0.05,
      emitterLifetime: 0,
      maxParticles: 1000,
      addAtBack: false,
      pos: {
        x: 0,
        y: 0,
      },
      behaviors: [
        {
          type: 'alpha',
          config: {
            alpha: {
              list: [
                {
                  time: 0,
                  value: 1,
                },
                {
                  time: 1,
                  value: 0,
                },
              ],
            },
          },
        },
        {
          type: 'moveSpeedStatic',
          config: {
            min: 300,
            max: 500,
          },
        },
        {
          type: 'scale',
          config: {
            scale: {
              list: [
                {
                  time: 0,
                  value: 0.25,
                },
                {
                  time: 1,
                  value: 0.55,
                },
              ],
            },
            minMult: 1,
          },
        },
        {
          type: 'color',
          config: {
            color: {
              list: [
                {
                  time: 0,
                  value: 'ffff91',
                },
                {
                  time: 1,
                  value: 'ffffff',
                },
              ],
            },
          },
        },
        {
          type: 'rotation',
          config: {
            accel: 0,
            minSpeed: 50,
            maxSpeed: 50,
            minStart: 265,
            maxStart: 275,
          },
        },
        {
          type: 'textureRandom',
          config: {
            textures: [
              this.app.loader.resources.star1.texture,
              this.app.loader.resources.star2.texture,
              this.app.loader.resources.particle.texture,
            ],
          },
        },
        {
          type: 'spawnShape',
          config: {
            type: 'torus',
            data: {
              x: 0,
              y: 0,
              radius: 30, // TODO: depends on the coin size
              innerRadius: 0,
              affectRotation: false,
            },
          },
        },
      ],
    });

    this.flameElapsed = Date.now();
    this.flameEmitter.rotate(Math.PI * 1.5);

    const flameUpdate = () => {
      requestAnimationFrame(flameUpdate);
      var now = Date.now();
      this.flameEmitter.update((now - this.flameElapsed) * 0.001);
      this.flameElapsed = now;
    };
    this.flameEmitter.emit = true;
    flameUpdate();

    /* TODO: move to  utils */
    this.getGlobalPositionByTime = time => {
      const x = time * 0.8;
      const y = Math.pow(time * 0.01, time * 0.000015) + time * time * 0.001; // TODO: normalize factors (sync with game's multiplier)
      return { x, y };
    };

    this.getTime = (rX, scaleX) => {
      const x = (rX - this.boundary.x0) / scaleX;
      return x;
    };

    this.getRealPosition = gPos => {
      const { x, y } = gPos;
      const dX = this.boundary.x1 - this.boundary.x0;
      const dY = this.boundary.y0 - this.boundary.y1;
      const scaleX = x > dX ? dX / x : 2 - x / dX;

      let scaleY = scaleX * 0.005;
      if (y * scaleY > dY) {
        scaleY = dY / y;
      }

      return this.getRealPositionByScale(gPos, { scaleX, scaleY });
    };

    this.getRealPositionByScale = (gPos, scale) => {
      const { x, y } = gPos;
      const { scaleX, scaleY } = scale;

      const rX = x * scaleX + this.boundary.x0;
      const rY = -y * scaleY + this.boundary.y0;

      return {
        x: rX,
        y: rY,
        scaleX,
        scaleY,
      };
    };
  }

  getCurrentElonFrame() {
    return this.elon.currentFrame;
  }

  getElonFramesCount() {
    return this.elon.totalFrames;
  }

  setElonFrame(frame) {
    if (frame <= this.elon.totalFrames) {
      this.elon.gotoAndStop(frame);
    }
  }

  setCoinDefaultPosition() {
    this.elonAndCoin.scale.set(1);
    this.elonAndCoin.x = 0;
    this.elonAndCoin.y = this.app.renderer.height - this.coin.height / 2;
  }

  getCoinExplosionPosition() {
    const coinGlobalPos = this.coin.toGlobal(this.coin.position);
    return {
      x: coinGlobalPos.x + this.coin.width / 2,
      y: coinGlobalPos.y + this.coin.height / 2,
    };
  }

  getCoinCrashPosition() {
    const coinGlobalPos = this.coin.toGlobal(this.coin.position);
    return {
      x: coinGlobalPos.x,
      y: coinGlobalPos.y + this.coin.height / 2,
    };
  }

  canUpdateElonFrame() {
    return true; // TODO: consider further
  }

  startCoinFlyingAnimation(gameStartTime) {
    this.gameStartTime = gameStartTime;
    this.container.visible = true;
    this.resetAllAnimations();
    this.setCoinDefaultPosition();

    /* Star Particle (flame) */
    this.flameEmitter.emit = true;

    /* Coin and Elon */
    let time = 0;
    /* Trajectory */
    const tSegs = 1000;
    let randYArray = Array(tSegs + 1)
      .fill()
      .map(() => null); // trajectory path: traPath[rX] = rY

    const firstPos = this.getRealPosition({ x: 0, y: 0 });
    let prevTime = Date.now() - this.gameStartTime;

    const update = dt => {
      time = Date.now() - this.gameStartTime;
      const gPos = this.getGlobalPositionByTime(time);
      const rPos = this.getRealPosition(gPos);

      this.elonAndCoin.x =
        rPos.x + Math.cos(time / 100) / 3 - (isMobileRosiGame ? 25 : 50);
      this.elonAndCoin.y = rPos.y + Math.sin(time / 200) * 1.5 + Math.random();
      this.elonAndCoin.rotation = -Math.sin(time / 100) / 100;
      this.flameEmitter.updateOwnerPos(
        this.elonAndCoin.x,
        this.elonAndCoin.y + (isMobileRosiGame ? 25 : 50)
      ); // set flame

      this.flameEmitter.rotate(-this.trajectoryAngle + (Math.PI * 3) / 2); // TODO: particle direction

      // Draw trajectory path
      const offsetY = isMobileRosiGame ? 30 : 60;
      this.trajectory.clear();
      this.trajectory.moveTo(firstPos.x, firstPos.y + offsetY);
      const randEtries = [...randYArray];
      randYArray = [];

      randEtries.forEach((e, i) => {
        const t = (i / tSegs) * prevTime;
        const tP = Math.floor((t / time) * tSegs);

        const gP = this.getGlobalPositionByTime(t);
        this.trajectory.lineStyle(2, 0x7300d8, 1);
        const rP = this.getRealPositionByScale(
          { x: gP.x, y: gP.y + rPos.scaleY * (e ? e * 1 : 0) },
          rPos
        );
        this.trajectory.lineTo(rP.x, rP.y + offsetY);
        const gP1 = this.getGlobalPositionByTime(t + 1000);
        randYArray[tP] = e
          ? e
          : Math.sin((t / 1000) * Math.PI) * (gP1.y - gP.y) * t * 0.02;
      });
      const gPos1 = this.getGlobalPositionByTime(time + 1000);

      randYArray[tSegs] =
        Math.sin((time / 1000) * Math.PI) * (gPos1.y - gPos.y) * time * 0.02;

      prevTime = time;
    };

    this.elonAndCoindAnimationHandle = update;
    this.app.ticker.add(update);
  }

  endCoinFlyingAnimation() {
    this.flameEmitter.emit = false;

    if (this.elonAndCoindAnimationHandle) {
      this.app.ticker.remove(this.elonAndCoindAnimationHandle);
      this.elonAndCoindAnimationHandle = null;
    }

    this.coin.alpha = 0;
    this.elon.alpha = 0;
  }

  resetAllAnimations() {
    if (this.elonAndCoindAnimationHandle) {
      this.app.ticker.remove(this.elonAndCoindAnimationHandle);
      this.elonAndCoindAnimationHandle = null;
    }

    if (this.elonAfterExplosionAnimationHandle) {
      this.app.ticker.remove(this.elonAfterExplosionAnimationHandle);
      this.elonAfterExplosionAnimationHandle = null;
    }

    this.coin.alpha = 1;
    this.elon.alpha = 1;
    this.elonAndCoin.rotation = 0;
    this.elon.gotoAndStop(0);

    this.flameEmitter.emit = false;

    this.trajectory.clear();
  }

  isBoostAnimComplete() {
    return this.initialBoostAnimationComplete === true;
  }
}
