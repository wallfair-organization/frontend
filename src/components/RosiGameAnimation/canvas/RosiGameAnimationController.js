import * as PIXI from 'pixi.js';
import RosiAnimationBackground from './Background';
import { CoinAnimation } from './CoinAndTrajectory';
import TWEEN from '@tweenjs/tween.js';
import CoinExplosion from './CoinExplosion';
import { calcCrashFactorFromElapsedTime, isMobileRosiGame } from './utils';
import CashedOutAnimation from './CashedOutAnimation';
import PreparingRound from './PreparingRound';

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
    .add('star2', constructPath('star2.png'))
    .add('preparing-round-anim', constructPath('preparing-round-anim.json'))
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
  init(canvas) {
    this.app = new PIXI.Application({
      view: canvas,
      backgroundColor: 0x12132e,
      resizeTo: canvas.parentElement,
      resolution: 1,
      antialias: true,
    });

    this.gameStartTime = 0;
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
    const calcSpeed = (factor, maxFactor) =>
      Math.min(Math.pow(factor, factor / 2) / 10, maxFactor);
    const elapsed = Date.now() - this.gameStartTime;
    const crashFactor = Number(calcCrashFactorFromElapsedTime(elapsed)) || 1.0;

    TWEEN.update(this.app.ticker.lastTime);
    this.cashedOut.update(dt, calcSpeed(crashFactor, 4));
    this.background.update(dt, calcSpeed(crashFactor, 6));
  }

  drawElements() {
    this.background = new RosiAnimationBackground(this.app);
    this.app.stage.addChild(this.background.container);

    this.coinExplosion = new CoinExplosion(this.app);
    this.app.stage.addChild(this.coinExplosion.container);

    this.coinAndTrajectory = new CoinAnimation(this.app);
    this.app.stage.addChild(this.coinAndTrajectory.container);

    this.cashedOut = new CashedOutAnimation(this.app);
    this.app.stage.addChild(this.cashedOut.container);

    this.preparingRound = new PreparingRound(this.app);
    this.app.stage.addChild(this.preparingRound.container);
  }

  start(gameStartTime) {
    this.preparingRound.hide();
    this.coinAndTrajectory.startCoinFlyingAnimation();
    this.cashedOut.reset();
    this.gameStartTime = gameStartTime;
  }

  end() {
    const coinPosition = this.coinAndTrajectory.getCoinExplosionPosition();
    this.coinExplosion.startAnimation(coinPosition.x, coinPosition.y);
    this.coinAndTrajectory.endCoinFlyingAnimation();
    this.coinAndTrajectory.startElonAfterExplosionAnimation();
  }

  doCashedOutAnimation(data) {
    const point = this.coinAndTrajectory.getCoinCrashPosition();
    const elonVelocity = this.coinAndTrajectory.getCurrentVelocty();
    this.cashedOut.animate(
      point.x,
      point.y,
      data.amount,
      data.crashFactor,
      elonVelocity
    );
  }
}

export default new RosiAnimationController();
