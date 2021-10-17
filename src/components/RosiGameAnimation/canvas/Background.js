import * as PIXI from 'pixi.js';
import {
  isMobileRosiGame,
  calcPercent,
  getRandomInRange,
  intersect,
  getRandomItems,
} from './utils';
import TWEEN from '@tweenjs/tween.js';
import { ROSI_GAME_MAX_CRASH_FACTOR } from 'constants/RosiGame';

const planetNames = ['planet1', 'planet2', 'planet3', 'planet4'];

class RosiAnimationBackground {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.Container();

    // dark circle shade on the background
    this.circle = new PIXI.Graphics();
    this.drawCircle();
    this.container.addChild(this.circle);

    this.planets = [];
    this.visiblePlanets = [];
    this.createPlanets();

    this.stars = [];
    this.createStars();

    this.createStarship();

    this.currentIntervalIndex = 0;
    this.starsSpeed = 0;
    this.starshipAnimationTriggered = false;
    this.starshipAnimationCrashFactor = 100;
  }

  setIntervalIndex(index) {
    this.currentIntervalIndex = index;
  }

  createStarship() {
    this.starship = new PIXI.Sprite(this.app.loader.resources.starship.texture);
    this.starship.x = 0;
    this.starship.y = this.app.renderer.height;
    this.starship.visible = false;
    this.container.addChild(this.starship);
  }

  doStarshipAnimation() {
    this.starshipAnimationTriggered = true;
    this.starship.visible = true;
    this.starship.x = calcPercent(this.app.renderer.width, 10);
    this.starship.y = this.app.renderer.height;
    const tweenData = this.starship.position;
    // TODO: reset tween if it hasn't finished and new animation is requested
    new TWEEN.Tween(tweenData)
      .to({ y: -this.starship.height * 2 }, 4000)
      .interpolation(TWEEN.Interpolation.Linear)
      .onComplete(() => {
        this.starship.visible = false;
      })
      .start();
  }

  shouldShowStarshipAnimation(crashFactor) {
    return (
      this.starshipAnimationTriggered === false &&
      this.starshipAnimationCrashFactor === Math.trunc(crashFactor)
    );
  }

  updateStarshipAnimationTrigger() {
    const rnd = getRandomInRange(1, ROSI_GAME_MAX_CRASH_FACTOR);
    this.starshipAnimationTriggered = false;
    this.starshipAnimationCrashFactor = Math.trunc(rnd);
  }

  createStars() {
    const h = this.app.renderer.height;
    const segmentWidth = isMobileRosiGame ? 120 : 240;
    const segmentsCount =
      Math.trunc(this.app.renderer.width / segmentWidth) + 1;
    const yStepPercent = 35;

    for (let i = 0; i < segmentsCount + 1; i++) {
      const randomYOffset = getRandomInRange(
        calcPercent(h, 15),
        calcPercent(h, 25)
      );

      let currYPercent = 100 - yStepPercent;
      for (let j = 0; j < 3 + Math.max(i - 3, 0); j++) {
        let textureName = 'star2';

        if ((i === 1 || i === 3 || i === 6) && (j === 1 || j >= 3)) {
          textureName = 'star1';
        }

        const texture = this.app.loader.resources[textureName].texture;
        const starWidth = new PIXI.Sprite(texture).width;
        const randomXOffset = getRandomInRange(
          calcPercent(starWidth, 50),
          calcPercent(starWidth, 100)
        );

        const star = new PIXI.Sprite(texture);
        // ofset star to the left or right
        let plusOrMinus = j % 2 === 0 ? -1 : 1;
        plusOrMinus *= i % 2 === 0 ? 1 : -1;

        star.x =
          i * segmentWidth +
          segmentWidth / 2 -
          star.width +
          randomXOffset * plusOrMinus;

        star.y = calcPercent(h, currYPercent) + randomYOffset;
        if (star.y < 0) {
          star.defaultX = star.x;
          star.defaultY = star.y;
        }

        star.speed = getRandomInRange(0.08, 0.3);
        this.stars.push(star);
        this.container.addChild(star);
        currYPercent -= yStepPercent;

        if (star.speed <= 0.15) {
          star.alpha = 0.4;
        }
      }
    }
  }

  createPlanets() {
    for (const name of planetNames) {
      const texture = this.app.loader.resources[name].texture;
      const planet = new PIXI.Sprite(texture);
      planet.speed = isMobileRosiGame ? 0.03 : 0.08;
      planet.visible = false;
      planet.name = name;
      this.planets.push(planet);
      this.container.addChild(planet);
    }

    // randomly select 2 planets for the start of the game
    const planets = getRandomItems(this.planets, 2);
    const sw = this.app.renderer.width;

    for (let i = 0; i < planets.length; i++) {
      const planet = planets[i];
      planet.moving = true;
      planet.visible = true;
      // one planet in the beginning of the screen, another in the end
      if (i === 0) {
        planet.x = calcPercent(sw, 50);
        planet.y = this.getRandomPlanetY('top', planet);
        planet.orientation = 'top';
      } else if (i === 1) {
        planet.x = getRandomInRange(calcPercent(sw, 5), calcPercent(sw, 15));
        planet.y = this.getRandomPlanetY('bottom', planet);
        planet.orientation = 'bottom';
      }

      planet.scale.set(0);
      this.visiblePlanets.push(planet);

      this.doPlanetPopInAnimation(planet);
    }
  }

  getRandomPlanetY(orientation) {
    const sh = this.app.renderer.height;

    if (orientation === 'top') {
      return getRandomInRange(calcPercent(sh, -15), calcPercent(sh, 2));
    } else if (orientation === 'bottom') {
      return getRandomInRange(calcPercent(sh, 55), calcPercent(sh, 85));
    }
  }

  getRandomPlanetX() {
    const sw = this.app.renderer.width;
    return getRandomInRange(calcPercent(sw, -5), calcPercent(sw, 25));
  }

  doPlanetPopInAnimation(planet) {
    const tweenData = { scale: 0 };
    new TWEEN.Tween(tweenData)
      .to({ scale: 1 }, 1000)
      .onStart(() => {
        planet.scale.set(0);
        planet.visible = true;
      })
      .onUpdate(() => {
        planet.scale.set(tweenData.scale);
      })
      .easing(TWEEN.Easing.Back.Out)
      .start();
  }

  drawCircle() {
    let x, y, radius;

    if (isMobileRosiGame) {
      x = calcPercent(this.app.renderer.width, 85);
      y = 0;
      radius = calcPercent(this.app.renderer.width, 65);
    } else {
      x = this.app.renderer.width / 2;
      y = this.app.renderer.height / 2;
      radius = calcPercent(this.app.renderer.width, 30);
    }

    this.circle.clear();
    this.circle.beginFill(0x00193d);
    this.circle.drawCircle(x, y, radius);
    this.circle.endFill();
  }

  setStarsSpeed(speed) {
    const tweenData = { speed: this.starsSpeed };

    new TWEEN.Tween(tweenData)
      .to({ speed }, 500)
      .onUpdate(() => {
        this.starsSpeed = tweenData.speed;
      })
      .interpolation(TWEEN.Interpolation.Linear)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }

  update(dt, angle) {
    const vx = this.starsSpeed * Math.cos(angle);
    const vy = this.starsSpeed * Math.sin(angle);

    for (const planet of this.planets) {
      if (planet.moving) {
        planet.x += planet.speed * dt;
      }

      if (planet.x > this.app.renderer.width && planet.moving) {
        setTimeout(() => {
          const otherPlanetTexture = this.planets.find(
            p => p !== planet
          ).texture;
          const possibleTextures = [
            this.app.loader.resources.planet1.texture,
            this.app.loader.resources.planet2.texture,
            this.app.loader.resources.planet3.texture,
            this.app.loader.resources.planet4.texture,
          ];

          planet.texture = getRandomItems(
            possibleTextures.filter(t => t !== otherPlanetTexture),
            1
          )[0];
          planet.x = this.getRandomPlanetX();
          planet.y = this.getRandomPlanetY(planet.orientation, planet);
          planet.moving = true;
          this.doPlanetPopInAnimation(planet);
        }, getRandomInRange(5000, 20000));

        planet.moving = false;
        planet.visible = false;
      }
    }

    for (const star of this.stars) {
      star.x -= vx * star.speed * dt;
      star.y += vy * star.speed * dt;

      const w = this.app.renderer.width;
      const h = this.app.renderer.height;

      /*
        |
        * star is above half the screen
        |
        |
        |________
      */
      if (star.x < -star.width && star.y < h / 2) {
        const x1 = 0;
        const y1 = 0;
        const x2 = w;
        const y2 = 0;
        const x3 = star.x;
        const y3 = star.y;
        const length = w;
        const x4 = x3 + length * Math.cos(angle);
        const y4 = y3 - length * Math.sin(angle);

        // if (this.stars[0] === star) {
        //   console.log(`
        //     x1: ${x1}
        //     y1: ${y1}
        //     x2: ${x2}
        //     y2: ${y2}
        //     x3: ${x3}
        //     y3: ${y3}
        //     x4: ${x4}
        //     y4: ${y4}
        //     width: ${this.app.renderer.width}
        //     height: ${this.app.renderer.height}
        //   `)
        // }

        const intersection = intersect(x1, y1, x2, y2, x3, y3, x4, y4);

        star.x = intersection.x;
        star.y = intersection.y;

        if (star.defaultX || star.defaultY) {
          star.x = star.defaultX;
          star.y = star.defaultY;
        }
      }

      /*
        |
        |
        |
        * star is below half the height
        |________
      */
      if (star.x < -star.width && star.y >= h / 2) {
        const x1 = w;
        const y1 = 0;
        const x2 = w;
        const y2 = h;
        const x3 = star.x;
        const y3 = star.y;
        const length = w * 2;
        const x4 = x3 + length * Math.cos(angle);
        const y4 = y3 - length * Math.sin(angle);

        const intersection = intersect(x1, y1, x2, y2, x3, y3, x4, y4);

        star.x = intersection.x;
        star.y = intersection.y;

        if (star.defaultX || star.defaultY) {
          star.x = star.defaultX;
          star.y = star.defaultY;
        }
      }

      /*
            |
            |
       _____|
      */
      if (star.y >= h) {
        const x1 = w;
        const y1 = 0;
        const x2 = w;
        const y2 = h;
        const x3 = star.x;
        const y3 = star.y;
        const length = w;
        const x4 = x3 + length * Math.cos(angle);
        const y4 = y3 - length * Math.sin(angle);

        const intersection = intersect(x1, y1, x2, y2, x3, y3, x4, y4);

        star.x = intersection.x;
        star.y = intersection.y;

        if (star.defaultX || star.defaultY) {
          star.x = star.defaultX;
          star.y = star.defaultY;
        }
      }
    }
  }
}

export default RosiAnimationBackground;
