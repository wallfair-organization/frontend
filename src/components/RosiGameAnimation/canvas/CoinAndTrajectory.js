import {
  ROSI_GAME_INTERVALS,
  ROSI_GAME_MAX_DURATION_SEC,
} from 'constants/RosiGame';
import * as PIXI from 'pixi.js';
import { calcPercent } from './utils';
import TWEEN from '@tweenjs/tween.js';

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

    this.elon = new PIXI.Sprite(this.app.loader.resources.elonmusk.texture);
    this.elon.x -= calcPercent(this.elon.width, 20);
    this.elon.y -= calcPercent(this.elon.height, 70);
    this.elonAndCoin.addChild(this.elon);

    this.elonAfterExplosionAnimationHandle = null;

    this.onNextTimerIteration = this.handleTimerIterationUpdate.bind(this);

    this.setCoinDefaultPosition();

    this.container.visible = false;
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

  // startCoinFlyingAnimation() {
  //   this.container.visible = true;
  //   this.resetAllAnimations();
  //   this.setCoinDefaultPosition();
  //   this.iterationIncremented = false;

  //   /* Coin and Elon */
  //   const destX = calcPercent(this.app.renderer.width, 90);
  //   const destY = calcPercent(this.app.renderer.height, 35);
  //   const distanceX = destX - this.elonAndCoin.x;
  //   const distanceY = destY - this.elonAndCoin.y;
  //   const length = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
  //   const vx = distanceX / length;
  //   const vy = distanceY / length;
  //   const initialSpeed = length / (ROSI_GAME_MAX_DURATION_SEC * 100);
  //   const boost = 5;
  //   this.elonAndCoin.speed = initialSpeed * boost;
  //   this.elonAndCoin.vx = vx;
  //   this.elonAndCoin.vy = vy;
  //   this.elonAndCoin.initialSpeed = initialSpeed;
  //   this.destX = destX;
  //   this.destY = destY;

  //   let x = 0;
  //   let y = this.elonAndCoin.y + this.coin.height / 2;

  //   const update = dt => {
  //     let prev_x = x;
  //     let prev_y = y;
  //     x += vx * this.elonAndCoin.speed * dt;
  //     y += vy * this.elonAndCoin.speed * dt;

  //     if (this.elonAndCoin.x < this.destX || this.elonAndCoin.y > this.destY) {
  //       this.elonAndCoin.x += vx * this.elonAndCoin.speed * dt;
  //       this.elonAndCoin.y += vy * this.elonAndCoin.speed * dt;

  //       this.trajectory.lineStyle(2, 0x7300d8, 1);
  //       this.trajectory.moveTo(prev_x, prev_y);
  //       this.trajectory.lineTo(x, y);
  //     }

  //     // prevent speed not increasing when timer interval is incremented
  //     if (this.iterationIncremented) {
  //       return;
  //     }

  //     // this is for initial boost/acceleration effect to faster get elon out of boundaries
  //     if (this.elonAndCoin.speed > this.elonAndCoin.initialSpeed) {
  //       this.elonAndCoin.speed -= (this.elonAndCoin.initialSpeed / boost) * dt;
  //     } else {
  //       this.elonAndCoin.speed = this.elonAndCoin.initialSpeed;
  //     }
  //   };

  //   this.elonAndCoindAnimationHandle = update;
  //   this.app.ticker.add(update, 'elonAndCoinMoving', PIXI.UPDATE_PRIORITY.HIGH);
  // }

  startCoinFlyingAnimation() {
    this.container.visible = true;
    this.resetAllAnimations();
    this.setCoinDefaultPosition();
    this.iterationIncremented = false;

    /* Coin and Elon */
    const destX = calcPercent(this.app.renderer.width, 90);
    const destY = calcPercent(this.app.renderer.height, 35);
    const distanceX = destX - this.elonAndCoin.x;
    const distanceY = destY - this.elonAndCoin.y;
    const length = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    const vx = distanceX / length;
    const vy = distanceY / length;
    const initialSpeed = length / (ROSI_GAME_MAX_DURATION_SEC * 100);
    this.destX = destX;
    this.destY = destY;
    this.boost = 5;
    this.elonAndCoin.speed = initialSpeed * this.boost;
    this.elonAndCoin.vx = vx;
    this.elonAndCoin.vy = vy;
    this.elonAndCoin.initialSpeed = initialSpeed;
    this.elonAndCoin.newSpeed = null;

    this.trajectoryX = 0;
    this.trajectoryY = this.elonAndCoin.y + this.coin.height / 2;

    this.isFlyingAnimationStarted = true;
  }

  update(dt) {
    if (!this.isFlyingAnimationStarted) {
      return;
    }

    let prev_x = this.trajectoryX;
    let prev_y = this.trajectoryY;
    this.trajectoryX += this.elonAndCoin.vx * this.elonAndCoin.speed * dt;
    this.trajectoryY += this.elonAndCoin.vy * this.elonAndCoin.speed * dt;

    if (this.elonAndCoin.x < this.destX || this.elonAndCoin.y > this.destY) {
      this.elonAndCoin.x += this.elonAndCoin.vx * this.elonAndCoin.speed * dt;
      this.elonAndCoin.y += this.elonAndCoin.vy * this.elonAndCoin.speed * dt;

      this.trajectory.lineStyle(2, 0x7300d8, 1);
      this.trajectory.moveTo(prev_x, prev_y);
      this.trajectory.lineTo(this.trajectoryX, this.trajectoryY);
    }

    // When timer iteration is incremented, speed is increased.
    // This ensures smooth acceleration to the new speed value.
    if (
      this.elonAndCoin.newSpeed &&
      this.elonAndCoin.speed < this.elonAndCoin.newSpeed
    ) {
      this.elonAndCoin.speed += 0.02 * dt;
    }

    // Initial boost/acceleration effect to faster get elon out of boundaries
    if (!this.iterationIncremented) {
      if (this.elonAndCoin.speed > this.elonAndCoin.initialSpeed) {
        this.elonAndCoin.speed -=
          (this.elonAndCoin.initialSpeed / this.boost) * dt;
      } else {
        this.elonAndCoin.speed = this.elonAndCoin.initialSpeed;
      }
    }
  }

  handleTimerIterationUpdate(iteration) {
    this.iterationIncremented = true;

    const distanceX = this.destX - this.elonAndCoin.x;
    const distanceY = this.destY - this.elonAndCoin.y;
    const length = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    const maximumRemainingGameDuration =
      ROSI_GAME_INTERVALS.slice(iteration)
        .map(([_from, _to, time]) => time)
        .reduce((acc, time) => acc + time, 0) / 1000;

    const speed = length / (maximumRemainingGameDuration * 100);
    this.elonAndCoin.newSpeed = speed;
  }

  endCoinFlyingAnimation() {
    this.coin.alpha = 0;
    this.isFlyingAnimationStarted = false;
  }

  startElonAfterExplosionAnimation() {
    const rotationSpeed = 0.005;
    this.elonAndCoin.speed = this.elonAndCoin.initialSpeed;

    if (this.elonAfterExplosionAnimationHandle) {
      this.app.ticker.remove(this.elonAfterExplosionAnimationHandle);
    }

    // For the sake of simplicty animate elonAndCoin container instead of just elon.
    // Coin is hidden anyway and positions are already being reset before next animation.
    const update = dt => {
      this.elonAndCoin.rotation += rotationSpeed * dt;
      this.elonAndCoin.x += this.elonAndCoin.vx * this.elonAndCoin.speed * dt;
      this.elonAndCoin.y += this.elonAndCoin.vy * this.elonAndCoin.speed * dt;
    };

    this.elonAfterExplosionAnimationHandle = update;
    this.app.ticker.add(update);
  }

  resetAllAnimations() {
    if (this.elonAfterExplosionAnimationHandle) {
      this.app.ticker.remove(this.elonAfterExplosionAnimationHandle);
      this.elonAfterExplosionAnimationHandle = null;
    }

    this.coin.alpha = 1;
    this.elonAndCoin.rotation = 0;
    this.trajectory.clear();
    this.isFlyingAnimationStarted = false;
  }
}
