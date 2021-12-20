import * as PIXI from 'pixi.js-legacy';
import { getRandomInRange } from './utils';

const NUM_OF_PARTICLES = 100;

class CoinExplosion {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();
    this.container.visible = false;

    this.coins = [];
    this.createCoins();

    this.fadeOutCoinTween = window.startCoinExplosion =
      this.startAnimation.bind(this);
  }

  createCoins() {
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      const texture = this.app.loader.resources.coin.texture;
      const coin = new PIXI.Sprite(texture);
      coin.anchor.set(0.5); // easier to center at explosion point
      this.container.addChild(coin);
      this.coins.push(coin);
    }
  }

  startAnimation(x, y) {
    if (this.coinExplosionAnimationHandle) {
      this.app.ticker.remove(this.coinExplosionAnimationHandle);
      this.coinExplosionAnimationHandle = null;
    }

    for (const coin of this.coins) {
      const directionAngle = Math.random() * Math.PI * 2;
      const vx = Math.cos(directionAngle);
      const vy = Math.sin(directionAngle);
      coin.x = x;
      coin.y = y;
      coin.vx = vx;
      coin.vy = vy;
      coin.tint = Math.random() > 0.5 ? 0xfff200 : 0xffffff; // add yellow tint to some coins for variety
      coin.speed = getRandomInRange(0.5, 1.2);
      coin.acceleration = getRandomInRange(2.5, 4);
      coin.deceleration = getRandomInRange(0.02, 0.06);
      coin.alpha = 1;
      coin.fadeOutDelay = getRandomInRange(1800, 2200);
      coin.fadeOutSpeed = getRandomInRange(0.01, 0.03);

      const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      coin.rotation = Math.random() * Math.PI * plusOrMinus; // random between -180 and 180 degress
      coin.scale.set(getRandomInRange(0.1, 0.25));
    }

    const animationStartTime = this.app.ticker.lastTime;

    const update = dt => {
      for (const coin of this.coins) {
        coin.x += coin.vx * coin.acceleration * coin.speed * dt;
        coin.y += coin.vy * coin.acceleration * coin.speed * dt;
        coin.rotation += 0.01;

        if (coin.acceleration > 1) {
          coin.acceleration -= coin.deceleration * dt;
        }

        if (
          coin.alpha > 0 &&
          this.app.ticker.lastTime - animationStartTime > coin.fadeOutDelay
        ) {
          coin.alpha -= coin.fadeOutSpeed * dt;
        }
      }
    };

    this.container.visible = true;
    this.coinExplosionAnimationHandle = update;
    this.app.ticker.add(update);
  }

  stopAnimation() {
    if (this.coinExplosionAnimationHandle) {
      this.app.ticker.remove(this.coinExplosionAnimationHandle);
      this.coinExplosionAnimationHandle = null;
    }
  }
}

export default CoinExplosion;
