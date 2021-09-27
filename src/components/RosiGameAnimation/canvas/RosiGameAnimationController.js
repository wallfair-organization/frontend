import * as PIXI from 'pixi.js';
import RosiAnimationBackground from './Background';
import { CoinAnimation } from './CoinAndTrajectory';
import TWEEN from '@tweenjs/tween.js';
import CoinExplosion from './CoinExplosion';
import { isMobileRosiGame } from './utils';
import CashedOutAnimation from './CashedOutAnimation';

// hide PIXI welcome messege in console
PIXI.utils.skipHello();

function loadAssets(loader) {
  const deviceType = isMobileRosiGame ? 'mobile' : 'desktop';
  const resolution =
    deviceType === 'mobile' ? Math.min(window.devicePixelRatio, 2) : 1;

  const constructPath = asset =>
    `/images/rosi-game/${deviceType}/@${resolution}x/${asset}`;

  loader
    .add('coin', constructPath('coin.png'))
    .add('elonmusk', constructPath('elonmusk.png'))
    .add('redPlanet', constructPath('redPlanet.png'))
    .add('purplePlanet', constructPath('purplePlanet.png'))
    .add('star1', constructPath('star1.png'))
    .add('star2', constructPath('star2.png'));

  loader.load();

  return new Promise(resolve => {
    loader.onComplete.add(resolve);
  });
}

class RosiAnimationController {
  init(canvas) {
    this.app = new PIXI.Application({
      view: canvas,
      backgroundColor: 0x12132e,
      resizeTo: canvas.parentElement,
      resolution: 1,
      antialias: true,
    });

    this.app.ticker.add(() => {
      TWEEN.update(this.app.ticker.lastTime);
    });
  }

  load(done) {
    loadAssets(this.app.loader).then(() => {
      if (done) {
        this.drawElements();
        done();
      }
    });
  }

  drawElements() {
    this.background = new RosiAnimationBackground(this.app);
    this.background.startAnimation();
    this.app.stage.addChild(this.background.container);

    this.coinExplosion = new CoinExplosion(this.app);
    this.app.stage.addChild(this.coinExplosion.container);

    this.coinAndTrajectory = new CoinAnimation(this.app);
    this.app.stage.addChild(this.coinAndTrajectory.container);

    this.cashedOut = new CashedOutAnimation(this.app);
    this.app.stage.addChild(this.cashedOut.container);
  }

  start() {
    this.coinAndTrajectory.startCoinFlyingAnimation();
    this.cashedOut.reset();
  }

  end() {
    const coinPosition = this.coinAndTrajectory.getCoinExplosionPosition();
    this.coinExplosion.startAnimation(coinPosition.x, coinPosition.y);
    this.coinAndTrajectory.endCoinFlyingAnimation();
    this.coinAndTrajectory.startElonAfterExplosionAnimation();
  }

  doCashedOutAnimation(data) {
    const point = this.coinAndTrajectory.getCoinCrashPosition();
    this.cashedOut.animate(point.x, point.y, data.amount, data.crashFactor);
  }
}

export default new RosiAnimationController();
