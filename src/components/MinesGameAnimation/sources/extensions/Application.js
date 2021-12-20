import * as PIXI from 'pixi.js-legacy';
/**
 * @class Application
 * @param {Object} [options] - the optional renderer parameters
 * @return {PIXI.Application} - an instance of PIXI Application
 * */
export default class Application extends PIXI.Application {
  constructor(options) {
    super(options);
  }

  /**
   * @static
   * @helper
   * @return {PIXI.Application}
   * */
  static create(options) {
    return new Application(options);
  }
}
