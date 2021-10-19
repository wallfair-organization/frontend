import * as PIXI from 'pixi.js';
import '@pixi/math-extras';
import RosiAnimationBackground from './Background';
import { CoinAnimation } from './CoinAndTrajectory';
import TWEEN from '@tweenjs/tween.js';
import CoinExplosion from './CoinExplosion';
import { calcCrashFactorFromElapsedTime, isMobileRosiGame } from './utils';
import CashedOutAnimation from './CashedOutAnimation';
import PreparingRound from './PreparingRound';
import { ROSI_GAME_INTERVALS } from 'constants/RosiGame';

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
  init(canvas, animationIndex) {
    this.app = new PIXI.Application({
      view: canvas,
      backgroundColor: 0x12132e,
      resizeTo: canvas.parentElement,
      resolution: 1,
      antialias: true,
    });

    this.gameStartTime = 0;
    this.lastCrashFactor = 1.0;
    this.currentIntervalIndex = -1;
    this.animationIndex = animationIndex;
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

  start(gameStartTime) {
    this.preparingRound.hide();
    this.coinAndTrajectory.startCoinFlyingAnimation(gameStartTime);
    this.cashedOut.reset();
    this.gameStartTime = gameStartTime;
    this.currentIntervalIndex = -1;
    this.background.updateStarshipAnimationTrigger();
  }

  end() {
    const coinPosition = this.coinAndTrajectory.getCoinExplosionPosition();
    this.coinExplosion.startAnimation(coinPosition.x, coinPosition.y);
    this.coinAndTrajectory.endCoinFlyingAnimation();
  }

  doCashedOutAnimation(data) {
    const point = this.coinAndTrajectory.getCoinCrashPosition();
    const elapsed = Date.now() - this.gameStartTime;
    this.cashedOut.animate(point.x, data.amount, data.crashFactor, elapsed);
  }
}

export default new RosiAnimationController();
