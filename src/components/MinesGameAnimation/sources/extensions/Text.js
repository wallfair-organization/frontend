import * as PIXI from 'pixi.js-legacy';
/**
 * @class Text
 * @param {Object|PIXI.TextStyle} [styles] - styles for text
 * @return {PIXI.Text} - an instance of PIXI.Text object
 * */
export default class Text extends PIXI.Text {
  constructor(text, styles) {
    super(text, styles);

    this.anchor.set(0.5);
  }

  /** We do not heed to change it directly
   * @param {String} text */
  changeText(text) {
    this.text = text;
  }
}
