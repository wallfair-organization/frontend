import * as PIXI from 'pixi.js';
import { isMobileRosiGame } from './utils';
import {
  ROSI_GAME_PLAYGROUND_ROCKET,
  ROSI_GAME_PLAYGROUND_CAR,
  ROSI_GAME_PLAYGROUND_RUNNING,
} from 'constants/RosiGame';
import TWEEN from '@tweenjs/tween.js';

class PreparingRound {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();

    this.backdrop = new PIXI.Graphics();
    this.container.addChild(this.backdrop);

    this.initAnimation();

    this.drawBackdrop();

    this.hide();
  }

  createRocketAnim() {
    this.animationIndex = Math.floor(Math.random() * 3);
    var spritesheet =
      this.app.loader.resources['preparing-round-anim'].spritesheet;
    if (this.animationIndex === ROSI_GAME_PLAYGROUND_CAR) {
      spritesheet =
        this.app.loader.resources['preparing-round-anim-car'].spritesheet;
    } else if (this.animationIndex === ROSI_GAME_PLAYGROUND_RUNNING) {
      spritesheet =
        this.app.loader.resources['preparing-round-anim-running'].spritesheet;
    } else {
    }
    const anim = new PIXI.AnimatedSprite(Object.values(spritesheet.textures));
    if (this.animationIndex === ROSI_GAME_PLAYGROUND_ROCKET) {
      anim.loop = false;
    } else {
      anim.loop = true;
    }
    return anim;
  }

  initAnimation() {
    if (this.rocketAnim !== null) {
      this.container.removeChild(this.rocketAnim);
    }
    this.rocketAnim = this.createRocketAnim();
    if (this.animationIndex === ROSI_GAME_PLAYGROUND_ROCKET) {
      this.rocketAnim.anchor.set(0.5);

      if (isMobileRosiGame) {
        this.rocketAnim.scale.set(1);
        this.rocketAnim.x =
          this.app.renderer.width / 2 - this.rocketAnim.width / 2 + 15;
        this.rocketAnim.y =
          this.app.renderer.height - this.rocketAnim.height / 2;
      } else {
        this.rocketAnim.x =
          this.app.renderer.width / 2 - this.rocketAnim.width / 2;
        this.rocketAnim.y = this.app.renderer.height / 2;
      }
      this.rocketDefaultX = this.rocketAnim.x;
      this.rocketDefaultY = this.rocketAnim.y;
    } else if (this.animationIndex === ROSI_GAME_PLAYGROUND_CAR) {
      this.rocketAnim.anchor.set(0.5);
      this.rocketAnim.scale.set(0.8);
      if (isMobileRosiGame) {
        this.rocketAnim.x =
          this.app.renderer.width / 2 - this.rocketAnim.width + 25;
        this.rocketAnim.y =
          this.app.renderer.height - this.rocketAnim.height / 2;
      } else {
        this.rocketAnim.x =
          this.app.renderer.width / 2 - this.rocketAnim.width - 25;
        this.rocketAnim.y = this.app.renderer.height / 2;
      }
      this.rocketDefaultX = this.rocketAnim.x;
      this.rocketDefaultY = this.rocketAnim.y;
      this.rocketAnim.animationSpeed = 0.2;
    } else if (this.animationIndex === ROSI_GAME_PLAYGROUND_RUNNING) {
      this.rocketAnim.anchor.set(0.5);
      this.rocketAnim.scale.set(0.8);
      if (isMobileRosiGame) {
        this.rocketAnim.x =
          this.app.renderer.width / 2 - this.rocketAnim.width + 25;
        this.rocketAnim.y =
          this.app.renderer.height - this.rocketAnim.height / 2;
      } else {
        this.rocketAnim.x =
          this.app.renderer.width / 2 - this.rocketAnim.width - 25;
        this.rocketAnim.y = this.app.renderer.height / 2;
      }
      this.rocketDefaultX = this.rocketAnim.x;
      this.rocketDefaultY = this.rocketAnim.y;
      this.rocketAnim.animationSpeed = 0.3;
    }
    this.container.addChild(this.rocketAnim);
  }

  drawBackdrop() {
    this.backdrop.beginFill(0x12132e, 0.8);
    this.backdrop.drawRect(
      0,
      0,
      this.app.renderer.width,
      this.app.renderer.height
    );
    this.backdrop.endFill();
  }

  show() {
    this.initAnimation();
    this.container.visible = true;
    this.rocketAnim.x = this.rocketDefaultX;
    this.rocketAnim.y = this.rocketDefaultY;
    this.rocketAnim.rotation = 0;
    this.rocketAnim.gotoAndStop(0);

    setTimeout(() => {
      this.playRocketAnim();
    }, 200);
  }

  playRocketAnim() {
    this.rocketAnim.play();
    this.rocketAnim.onComplete = () => {
      if (this.animationIndex !== ROSI_GAME_PLAYGROUND_ROCKET) return;
      const pointsX = [
        this.rocketAnim.x,
        this.rocketAnim.x,
        this.rocketAnim.x + 250,
      ];
      const pointsY = [this.rocketAnim.y, 0, -this.rocketAnim.height * 2];

      const moveData = { x: this.rocketAnim.x, y: this.rocketAnim.y };
      this.moveTween = new TWEEN.Tween(moveData)
        .to({ x: pointsX, y: pointsY }, 3000)
        .onUpdate(() => {
          this.rocketAnim.x = moveData.x;
          this.rocketAnim.y = moveData.y;
        })
        .interpolation(TWEEN.Interpolation.Bezier)
        .easing(TWEEN.Easing.Linear.None)
        .delay(500)
        .start();

      const rotationData = { rotation: 0 };
      this.rotationTween = new TWEEN.Tween(rotationData)
        .to({ rotation: Math.PI }, 13000)
        .onUpdate(() => {
          this.rocketAnim.rotation = rotationData.rotation;
        })
        .delay(1100)
        .start();

      const scaleData = { scale: 1 };
      this.scaleTween = new TWEEN.Tween(scaleData)
        .to({ scale: 0 }, 7000)
        .onUpdate(() => {
          this.rocketAnim.scale.set(scaleData.scale);
        })
        .delay(1100)
        .start();
    };
  }

  hide() {
    this.container.visible = false;
    this.rocketAnim.gotoAndStop(0);

    if (this.moveTween) {
      this.moveTween.stop();
      this.rotationTween.stop();
      this.scaleTween.stop();

      this.moveTween = null;
      this.rotationTween = null;
      this.scaleTween = null;
    }
  }
}

export default PreparingRound;
