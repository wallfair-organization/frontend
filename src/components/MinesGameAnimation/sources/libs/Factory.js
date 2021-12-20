import {
  Container,
  Graphics,
  Sprite,
  Text
} from "../extensions/index.js";

/**
 * @static
 * @class Factory
 * Can be used as an abstract Factory or be extended
 * */
export default class Factory {
  static get Container() {
    return Container;
  }

  static get Graphics() {
    return Graphics;
  }

  static get Sprite() {
    return Sprite;
  }


  static get Text() {
    return Text;
  }

  static createTextFromConfig(text, { position: { x, y }, ...styles } = {}) {
    const txt = new this.Text(text, styles);
    txt.position.set(x, y);
    return txt;
  }

  static createFromGraphics(config){
    switch ( config.type ) {
      case "rect":
        return this.fromRectGraphics(config);
      default:
        console.warn(`Something went wrong for type: ${config.type}`);
    }
  }

  static fromRectGraphics({ width, height, radius, color, position: { x, y } = {} } = {}){
    const texture = new this.Graphics()
      .beginFill(color)
      .drawRoundedRect(0, 0, width, height, radius)
      .endFill()
      .generateTexture();

    const sprite = new this.Sprite(texture);
    sprite.position.set(x, y);
    return sprite;
  }

}