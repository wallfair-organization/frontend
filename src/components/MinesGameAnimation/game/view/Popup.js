import { Factory } from "../../sources/libs/index.js";

/**
 * @class Popup extends PIXI.Container
 * */
export default class Popup extends Factory.Container {

  constructor({ popupBackground, popupStyles, text, position }) {
    super();

    const background = Factory.createFromGraphics(popupBackground);
    const popupText = Factory.createTextFromConfig(text, { position, ...popupStyles });
    this.addChild(background, popupText);
  }

  /** Helper function to create popup from config
   * @static
   * @return {Popup} */
  static fromConfig(common, rest, cb) {
    const { popupBackground, popupStyles } = common;
    const { text, position, buttons } = rest;
    const popup = new Popup({ popupBackground, popupStyles, text, position });
    popup.scale.set(0.4);
    buttons.forEach(({ text, styles, event, ...button }) => {
      const btn = Factory.createFromGraphics(button);
      const txt = Factory.createTextFromConfig(text, styles);
      btn.interactive = true;
      btn.once("pointerdown", ()=> cb(event));

      btn.addChild(txt);
      popup.addChild(btn);
    });

    return popup;
  }
}
