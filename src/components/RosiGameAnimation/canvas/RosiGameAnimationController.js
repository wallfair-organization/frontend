import * as PIXI from 'pixi.js';
import '@pixi/math-extras';
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
  const resolution = deviceType === 'mobile' ? 2 : 1;

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
  init(canvas) {
    this.app = new PIXI.Application({
      view: canvas,
      backgroundColor: 0x12132e,
      resizeTo: canvas.parentElement,
      resolution: 1,
      antialias: true,
    });

    this.gameStartTime = 0;
    this.lastCrashFactor = 1.0;
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
    const elapsed = Date.now() - this.gameStartTime;
    const crashFactor = Number(calcCrashFactorFromElapsedTime(elapsed)) || 1.0;
    const maxElonFrames = this.coinAndTrajectory.getElonFramesCount();
    const intervals = [
      // fromFactor, toFactor, speed, elonFrame
      [1, 1.5, 1, 0],
      [1.5, 2, 2, 1],
      [2, 3, 3, 2],
      [3, 3.5, 4, 3],
      [3.5, 4, 5, 4],
      [4, 4.5, 6, 5],
    ];

    const currentInterval =
      intervals.find(
        ([fromFactor, toFactor]) =>
          crashFactor >= fromFactor && crashFactor < toFactor
      ) || intervals[intervals.length - 1];

    const [_f, _t, speed, elonFrame] = currentInterval;

    if (elonFrame < maxElonFrames) {
      this.coinAndTrajectory.setElonFrame(elonFrame);
    }

    TWEEN.update(this.app.ticker.lastTime);
    this.cashedOut.update(dt);
    this.background.update(dt, speed);
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
