import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import { isMobileRosiGame, calcPercent, calcTotalDelayTime } from './utils';

const AMOUNT_TEXT_FILL_COLOR = 0xefff54;
const AMOUN_FONT_FAMILY = 'PlusJakarta-Bold';
const CRASH_FACTOR_FILL_COLOR = 0xffffff;
const CRASH_FACTOR_FONT_FAMILY = 'PlusJakarta-Regular';
const FONT_SIZE = 12;
const COIN_DEFAULT_SCALE = isMobileRosiGame ? 0.5 : 0.3;

class Animation {
  constructor(app) {
    this.app = app;
    this.speed = 0;
    this.container = new PIXI.Container();
    this.textContainer = new PIXI.Container();
    this.container.addChild(this.textContainer);

    const [coin, coinTween] = this.createCoin();
    this.coin = coin;
    this.coinTween = coinTween;

    const [amountText, amountTextTween] = this.createAmountText();
    this.amountText = amountText;
    this.amountTextTween = amountTextTween;

    this.crashFactorText = this.createCashFactorText();
    this.initialAnimationFrameDone = false;
  }

  createAmountText() {
    const amountText = new PIXI.Text('0', {
      fontFamily: AMOUN_FONT_FAMILY,
      fontSize: FONT_SIZE,
      fill: AMOUNT_TEXT_FILL_COLOR,
    });

    this.textContainer.addChild(amountText);

    const tweenTime = 900;
    const tweenData = { scale: 0 };
    const amountTextTween = new TWEEN.Tween(tweenData)
      .to({ scale: 1 }, tweenTime)
      .easing(TWEEN.Easing.Back.Out)
      .onStart(() => {
        amountText.scale.set(0);
        tweenData.scale = 0;
      })
      .onUpdate(() => {
        amountText.scale.set(tweenData.scale);
      });

    return [amountText, amountTextTween];
  }

  createCashFactorText() {
    const crashFactorText = new PIXI.Text('0.00x', {
      fontFamily: CRASH_FACTOR_FONT_FAMILY,
      fontSize: FONT_SIZE,
      fill: CRASH_FACTOR_FILL_COLOR,
      fontWeight: 400,
    });

    this.textContainer.addChild(crashFactorText);

    return crashFactorText;
  }

  createCoin() {
    const tweenTime = 700;

    const coin = new PIXI.Sprite(this.app.loader.resources.coin.texture);
    coin.x = 0;
    coin.y = 0;
    coin.scale.set(COIN_DEFAULT_SCALE);
    coin.defaultWidth = coin.width;
    coin.defaultHeight = coin.height;
    this.container.addChild(coin);

    const tweenData = { scale: 0 };
    const coinTween = new TWEEN.Tween(tweenData)
      .to({ scale: COIN_DEFAULT_SCALE }, tweenTime)
      .easing(TWEEN.Easing.Back.Out)
      .onStart(() => {
        tweenData.scale = 0;
        coin.scale.set(0);
      })
      .onUpdate(() => {
        coin.scale.set(tweenData.scale);
      });

    return [coin, coinTween];
  }

  positionElements(textOrientation = 'bottom') {
    if (textOrientation === 'bottom') {
      this.textContainer.y = this.coin.defaultHeight * 1.2;
    } else if (textOrientation === 'top') {
      this.textContainer.y = -this.coin.defaultHeight * 1.2;
    }
  }

  setTextValues(amount, crashFactor) {
    this.amountText.text = `${amount}W`;
    this.crashFactorText.text = `${crashFactor}x`;
  }

  scaleInAnimation() {
    this.amountText.scale.set(0);
    this.coin.scale.set(0);
    this.coinTween.start();
    this.amountTextTween.start();
    this.container.visible = true;
    this.textContainer.visible = true;
  }

  reset() {
    this.coin.scale.set(COIN_DEFAULT_SCALE);
    this.container.visible = false;
    this.speed = 0;
    this.initialAnimationFrameDone = false;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  update() {
    const textPos = this.textContainer.getGlobalPosition();

    this.amountText.x = this.coin.defaultWidth / 2 - this.amountText.width / 2;
    this.crashFactorText.x =
      (this.amountText.x + this.amountText.width) / 2 -
      this.crashFactorText.width / 2;
    this.crashFactorText.y = this.amountText.y + this.amountText.height;

    if (textPos.y + this.textContainer.height > this.app.renderer.height) {
      this.positionElements('top');
    }
  }

  getWidth() {
    return this.container.width;
  }

  getX() {
    return this.container.x;
  }

  isTextVisible() {
    return this.textContainer.visible;
  }

  testTextIntersects(anim) {
    const rect1 = this.textContainer.getBounds();
    const rect2 = anim.textContainer.getBounds();
    return rect1.intersects(rect2);
  }

  hideText() {
    this.textContainer.visible = false;
  }
}

class CashedOutAnimation {
  constructor(app, coinAndTrajectory) {
    this.app = app;
    this.container = new PIXI.Container();
    this.currentAnims = [];
    this.cachedAnims = [];
    this.currentTextOrientation = 'bottom';
    this.coinAndTrajectory = coinAndTrajectory;

    // cache some coin animation objects from the start
    for (let i = 0; i < 20; i++) {
      const anim = new Animation(this.app);
      anim.setTextValues('000', '1.00');
      anim.positionElements('bottom');
      this.cachedAnims.push(anim);
    }
  }

  animate(x, amount, crashFactor) {
    const previousAnimX =
      this.currentAnims.length > 0
        ? this.currentAnims[this.currentAnims.length - 1].getX()
        : 0;

    let anim;

    if (this.cachedAnims.length > 0) {
      anim = this.cachedAnims.pop();
    } else {
      anim = new Animation(this.app);
      this.container.addChild(anim.container);
    }

    this.currentAnims.push(anim);

    anim.elapsedTime = calcTotalDelayTime(crashFactor);
    anim.crashFactor = crashFactor;
    anim.setTextValues(amount, crashFactor);

    const isSmallDistanceBetweenCrashes = x - previousAnimX <= anim.getWidth();
    if (isSmallDistanceBetweenCrashes) {
      this.currentTextOrientation =
        this.currentTextOrientation === 'bottom' ? 'top' : 'bottom';
    } else {
      this.currentTextOrientation = 'bottom';
    }

    anim.positionElements(this.currentTextOrientation);
    anim.scaleInAnimation();
  }

  reset() {
    this.cachedAnims = this.currentAnims.slice();
    this.currentAnims = [];
    this.currentTextOrientation = 'bottom';

    for (const anim of this.cachedAnims) {
      anim.reset();
    }
  }

  update(dt, elapsedTime) {
    let prevAnim;
    const currentGPos =
      this.coinAndTrajectory.getGlobalPositionByTime(elapsedTime);
    const currentRPos = this.coinAndTrajectory.getRealPosition(currentGPos);

    for (const anim of this.currentAnims) {
      if (
        prevAnim &&
        prevAnim.isTextVisible() &&
        prevAnim.testTextIntersects(anim)
      ) {
        anim.hideText();
      }

      anim.update(dt);

      if (this.currentAnims[0] === anim) {
        anim.index = 0;
      }

      const gPos = this.coinAndTrajectory.getGlobalPositionByTime(
        anim.elapsedTime
      );
      const rPos = this.coinAndTrajectory.getRealPositionByScale(
        gPos,
        currentRPos
      );

      anim.container.x = rPos.x;
      anim.container.y = rPos.y + (isMobileRosiGame ? 20 : 45);
      prevAnim = anim;
    }
  }
}

export default CashedOutAnimation;
