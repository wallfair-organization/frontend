import { Factory } from "../../sources/libs/index.js";

const MAP = {"0": "zero","1": "one","2": "two","3": "three","4": "four","5": "five","6": "six","7": "seven","8": "eight","9": "nine"};

/** @class Header
 * @extends PIXI.Container
 * Game's Header which is counting time and how many flags are left
 * */
export default class Header extends Factory.Container {
  constructor({ header, textures }) {
    super();

    this._resPack = textures;
    this._timeCounter = 0;
    this._timer = 0;

    this.flagsCounter = null;
    this.menuButton = null;
    this.gameTimer = null;

    this.initializeHeader(header);
  }

  /** To create all members of Header instance class
   * @param {Object} header - config which is used to create all members */
  initializeHeader(header) {
    const { flagsCounter, menuButton, timer, ...bgConfig } = header;
    const { styles, text, ...buttonConfig } = menuButton;

    const headerBackground = Factory.createFromGraphics(bgConfig);

    this.flagsCounter = Factory.createFromGraphics(flagsCounter);
    this.gameTimer = Factory.createFromGraphics(timer);

    const buttonText = Factory.createTextFromConfig(text, styles);
    this.menuButton = Factory.createFromGraphics(buttonConfig);
    this.menuButton.addChild(buttonText);

    this.addChild(headerBackground, this.flagsCounter, this.gameTimer, this.menuButton);
  }

  /** To create a counter with 3 digits for a given member
   * @param {Object} who */
  createSetOfDigits(who) {
    const { width, height } = who;
    const digitW = width / 3;
    const digitH = height;

    who.digits = "000".split("").map((number, i) => {
      const digit = new Factory.Sprite(this._resPack.get(MAP[ number ]));
      digit.width = digitW * 0.9;
      digit.height = digitH * 0.9;
      digit.x = -( width - digitW ) / 2 + ( digitW * i );
      return who.addChild(digit);
    });
  }

  /** As number of flags has been changed, update counter
   * @param {Number} [numb = 0] */
  updateFlagsNumber(numb = 0) {
    if ( !this.flagsCounter.digits ) {
      this.createSetOfDigits(this.flagsCounter);
    }
    this.updateNumbers(this.flagsCounter, numb);
  }

  /** Every second update the timer's counter
   * @param {Number} [numb = 0] */
  updateTimeNumber(numb = 0){
    if ( !this.gameTimer.digits ) {
      this.createSetOfDigits(this.gameTimer);
    }
    this.updateNumbers(this.gameTimer, numb);
  }

  /** Update view part of given counter
   * @param {Object} counter
   * @param {Number|String} numb */
  updateNumbers(counter, numb){
    numb = numb >= 100 ? String(numb) : numb >= 10 ? `0${numb}` : `00${numb}`;

    String(numb).split("").forEach((val, i) => {
      counter.digits[i].texture = this._resPack.get(MAP[ val ]);
    });
  }

  menuWasClicked(){
    this.emit("menuClick")
  }

  /**  Add all interactivity as the game is resumed */
  addInteractivity(){
    this.menuButton.interactive = true;
    this.menuButton.on("pointerdown", this.menuWasClicked, this );
  }

  /**  It removes all interactivity as the game is paused */
  removeInteractivity(){
    this.menuButton.interactive = false;
    this.menuButton.off("pointerdown", this.menuWasClicked, this);
  }

  update(delta) {
    this._timer += (delta * 16.777);
    if(this._timer >= 1000){
      this._timer = 0;
      this._timeCounter += 1;
      this.updateTimeNumber(this._timeCounter);
    }
  }
}
