import '@pixi/sound';
import * as Sound from '@pixi/sound';
import { some } from 'lodash';
import { Factory } from "../../sources/libs/index.js";
import MovieClip from "../MovieClip";

/**
 * @class Cell
 * @extends PIXI.Sprite
 * To hold cell's data and display different cell's states
 * */
export default class Cell extends Factory.Sprite {

  /**
   * @param {PIXI.Texture} texture
   * @param {CellModel} model*/
  constructor(texture, { col, row, text, isMine, isRevealed, isFlagged, isEmpty }) {
    super(texture);

    this.col = col;
    this.row = row;
    this.text = text;
    this.isMine = isMine;
    this.isRevealed = isRevealed;
    this.isFlagged = isFlagged;
    this.isEmpty = isEmpty;

    // ANIMATIONS
    this.revealAnimation = new MovieClip({
      framesNum: 14,
      imageName: 'unturned_00',
      imageExt: 'png',
      animationSpeed: 0.6,
      autoplay: false,
      loop: false,
      basePath: '../images/mines/unturned/'
    })
    this.revealAnimation.visible = false
    this.revealAnimation.anchor.set(0.5)

    this.winAnimation = new MovieClip({
      framesNum: 14,
      imageName: 'win_00',
      imageExt: 'png',
      animationSpeed: 0.6,
      autoplay: false,
      loop: false,
      basePath: '../images/mines/win/'
    })
    this.winAnimation.visible = false
    this.winAnimation.anchor.set(0.5)

    this.loseAnimation = new MovieClip({
      framesNum: 14,
      imageName: 'loose_00',
      imageExt: 'png',
      animationSpeed: 0.6,
      autoplay: false,
      loop: false,
      basePath: '../images/mines/lose/'
    })
    this.loseAnimation.visible = false
    this.loseAnimation.anchor.set(0.5)

  }

  reveal(textures, styles, handlers) {
    this.visible = false
    window.kor = this
    this.revealAnimation.visible = true

    const audioController = handlers.audio;

    this.revealAnimation.onComplete = () => {
      this.isRevealed = true
      //this.revealAnimation.visible = false
      if (this.isMine) {
        this.loseAnimation.visible = true
        this.loseAnimation.x = this.x
        this.loseAnimation.y = this.y
        this.parent.addChild(this.loseAnimation)
        this.loseAnimation.gotoAndPlay(0)
        audioController.playPoopSfx();
      } else {
        this.winAnimation.visible = true
        this.winAnimation.x = this.x
        this.winAnimation.y = this.y
        this.parent.addChild(this.winAnimation)
        this.winAnimation.gotoAndPlay(0)
        audioController.playCoinSfx();
      }
    }
    this.revealAnimation.x = this.x
    this.revealAnimation.y = this.y
    this.parent.addChild(this.revealAnimation)
    this.revealAnimation.gotoAndPlay(10)
  }

  toggleFlag(textures) {
    if ( this.isRevealed ) return;

    this.isFlagged = !this.isFlagged;
    this.texture = this.isFlagged ? textures.get("flag") : textures.get("closed");
  }
  setupAnim() {}
}
