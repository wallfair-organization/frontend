import { ROSI_GAME_MAX_DURATION_SEC } from 'constants/RosiGame';
import * as PIXI from 'pixi.js';
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
  }

  getCurrentElonFrame() {
    return this.elon.currentFrame;
  }

  getElonFramesCount() {
    return this.elon.totalFrames;
  }

  advanceElonAnim() {
    if (this.elon.currentFrame + 1 < this.elon.totalFrames) {
      this.elon.gotoAndStop(this.elon.currentFrame + 1);
    }
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

  startCoinFlyingAnimation() {
    this.container.visible = true;
    this.resetAllAnimations();
    this.setCoinDefaultPosition();

    /* Coin and Elon */
    const destX = calcPercent(this.app.renderer.width, 90);
    const destY = calcPercent(this.app.renderer.height, 35);
    const distanceX = destX - this.elonAndCoin.x;
    const distanceY = destY - this.elonAndCoin.y;
    const length = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    const vx = distanceX / length;
    const vy = distanceY / length;
    const defaultSpeed = length / (ROSI_GAME_MAX_DURATION_SEC * 100);
    // start with higher speed for the boost effect
    let speed = defaultSpeed * 150;

    let x = 0;
    let y = this.elonAndCoin.y + this.coin.height / 2;

    // save for later elon flying animation after coin explosion
    this.elonAndCoin.vx = vx;
    this.elonAndCoin.vy = vy;
    this.elonAndCoin.speed = defaultSpeed;

    const update = dt => {
      if (this.elonAndCoin.x < destX || this.elonAndCoin.y > destY) {
        this.elonAndCoin.x += vx * speed * dt;
        this.elonAndCoin.y += vy * speed * dt;
      }

      let prev_x = x;
      let prev_y = y;
      x += vx * speed * dt;
      y += vy * speed * dt;

      this.trajectory.lineStyle(2, 0x7300d8, 1);
      this.trajectory.moveTo(prev_x, prev_y);
      this.trajectory.lineTo(x, y);

      if (speed > defaultSpeed) {
        speed -= defaultSpeed * 2.5 * dt; // 8 is a magic number...
      } else {
        speed = defaultSpeed;
      }
    };

    this.elonAndCoindAnimationHandle = update;
    this.app.ticker.add(update);
  }

  endCoinFlyingAnimation() {
    if (this.elonAndCoindAnimationHandle) {
      this.app.ticker.remove(this.elonAndCoindAnimationHandle);
      this.elonAndCoindAnimationHandle = null;
    }

    this.coin.alpha = 0;
    this.elon.alpha = 0;
  }

  startElonAfterExplosionAnimation() {
    // const rotationSpeed = 0.005;
    // For the sake of simplicty animate elonAndCoin container instead of just elon.
    // Coin is hidden anyway and positions are already being reset before next animation.
    // const update = dt => {
    //   this.elonAndCoin.rotation += rotationSpeed * dt;
    //   this.elonAndCoin.x += this.elonAndCoin.vx * this.elonAndCoin.speed * dt;
    //   this.elonAndCoin.y += this.elonAndCoin.vy * this.elonAndCoin.speed * dt;
    // };
    // this.elonAfterExplosionAnimationHandle = update;
    // this.app.ticker.add(update);
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
    this.trajectory.clear();
  }

  getCurrentVelocty() {
    return {
      x: this.elonAndCoin.vx,
      y: this.elonAndCoin.vy,
    };
  }
}
