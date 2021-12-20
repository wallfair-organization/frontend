import * as PIXI from 'pixi.js-legacy';

// console.log('PIXI.Graphics', PIXI.Graphics);

/**
 * @class Graphics
 * @return {PIXI.Graphics} - an instance of PIXI.Graphics object
 * A custom Graphics class. This class just a nice wrapper.
 * */
export default class Graphics extends PIXI.Graphics {
  constructor() {
    super();
  }

  /** To generate texture from graphics
   * @helper
   * @return {PIXI.Texture} */
  generateTexture(){
    return this.generateCanvasTexture(PIXI.SCALE_MODES.LINEAR, 1);
  }
}
