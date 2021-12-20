import { Emitter } from "../extensions/index.js";

/**
 * @class LayoutManager
 * @extends Emitter
 * Layout manager controls the game's current sizes and reacts on
 * changing of window's size
 * */
export default class LayoutManager extends Emitter {
  constructor({ width, height } = {}) {
    super();

    this._baseSize = { width, height };
    this._gameSize = { width, height };

    window.addEventListener("resize", () => this.resizeView());
  }

  resizeView() {
    const { innerWidth, innerHeight } = window;
    let { width, height } = this.baseSize;
    let gameW = 0;
    let gameH = 0;

    if ( innerHeight > innerWidth ) {  //portrait
      gameW = width | 0;
      gameH = height * ( innerHeight / innerWidth ) | 0;
    }
    else {  //landscape
      gameH = height | 0;
      gameW = width * ( innerWidth / innerHeight ) | 0;
    }

    this.gameSize = { width: gameW, height: gameH };

    this.emit("resize", {
        globalSizes: {
          width: innerWidth,
          height: innerHeight
        },
        recalculatedSizes: {
          width: gameW,
          height: gameH
        }
      }
    );
  }

  /** To set base sizes of game
   * @param {Object} sizes */
  set baseSize(sizes) {
    this._baseSize = Object.assign({}, sizes);
  }

  /** To get base sizes of game
   * @return {Object} */
  get baseSize() {
    return this._baseSize;
  }

  /** To set recalculated sizes of canvas for game
   * @param {Object} sizes */
  set gameSize(sizes) {
    this._gameSize = Object.assign({}, sizes);
  }

  /** To get recalculated sizes of canvas for game
   * @return {Object} */
  get gameSize() {
    return this._gameSize;
  }
}
