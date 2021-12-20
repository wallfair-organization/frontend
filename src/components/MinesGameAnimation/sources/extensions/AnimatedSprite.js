import * as PIXI from 'pixi.js-legacy';
/**
 * @class Sprite
 * @param {PIXI.Texture} texture - a texture of picture in texture cache
 * @return {PIXI.Sprite} - an instance of a PIXI object
 * */
export default class AnimatedSprite extends PIXI.AnimatedSprite {
  constructor(texture) {
    super(texture);

    this.anchor.set(0.5);
  }
}
