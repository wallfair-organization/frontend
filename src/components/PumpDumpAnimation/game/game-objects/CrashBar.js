import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { isMobileRosiGame } from "components/RosiGameAnimation/canvas/utils";
import TWEEN from '@tweenjs/tween.js';


// size of the stick visible at the top. Bot size will be same as the top
const STICK_HEIGHT_MIN_OFFSET = isMobileRosiGame ? 5 : 10;
const STICK_HEIGHT_MAX_OFFSET = isMobileRosiGame ? 40 : 80;

const STICK_MIN_WIDTH = isMobileRosiGame ? 1.5 : 3;

const BAR_WIDTH = isMobileRosiGame ? 12.5 : 25;
const BAR_ROUNDNESS = isMobileRosiGame ? 3 : 4;

const BAR_MIN_HEIGHT = isMobileRosiGame ? 5 : 10;


export class CrashBar extends Container {
    graphic;

    topStickHeight = 0;
    botStickHeight = 0;

    constructor(x, y) {
        super();
        this.position.set(x, y);
        this.graphic = this.generateCrashBarTexture(BAR_MIN_HEIGHT);
        this.addChild(this.graphic);
    }

    generateCrashBarTexture(height, color = 'red') {
        const bar = new Graphics();
        // Stick visible at the top and the bottom
        bar.beginFill(color === 'green' ? 0x1c5d1a : 0x6a0b3e);
        // Positioning the stick at the center of the bar
        let stickWidth = STICK_MIN_WIDTH;

        let stickTopHeight = STICK_HEIGHT_MIN_OFFSET + Math.floor(Math.random() * (STICK_HEIGHT_MAX_OFFSET - STICK_HEIGHT_MIN_OFFSET));
        bar.drawRect((BAR_WIDTH - stickWidth) * 0.5, -stickTopHeight, stickWidth, (height * 0.5 + stickTopHeight));

        let stickBotHeight = STICK_HEIGHT_MIN_OFFSET + Math.floor(Math.random() * (STICK_HEIGHT_MAX_OFFSET - STICK_HEIGHT_MIN_OFFSET));
        bar.drawRect((BAR_WIDTH - stickWidth) * 0.5, height * 0.5, stickWidth, (height * 0.5) + stickBotHeight);
        bar.endFill();

        // Bar
        bar.beginFill(color === 'green' ? 0x2beb33 : 0xff384b);
        bar.drawRoundedRect(0, 0, BAR_WIDTH, height, BAR_ROUNDNESS);
        bar.endFill();

        this.botStickHeight = stickBotHeight;
        this.topStickHeight = stickTopHeight;

        return bar;
    }

    showTween(finalScaleX, finalScaleY) {
        new TWEEN.Tween(this.scale)
            .to({ x: finalScaleX, y: finalScaleY }, 600)
            .onComplete(() => {
                this.emit('crash-bar-created');
            })
            .easing(TWEEN.Easing.Back.Out)
            .start();
    }

    startStretch(offsetY) {
        const offset = { y: BAR_MIN_HEIGHT };
        new TWEEN.Tween(offset)
            .to({ y: offsetY }, 1500)
            .onUpdate(() => {
                this.stretchGraphic(offset.y);
            })
            .easing(TWEEN.Easing.Quintic.Out)
            .start();
    }

    stretchGraphic(height) {
        this.graphic.clear();

        this.graphic.beginFill(0x6a0b3e);
        // Positioning the stick at the center of the bar
        let stickWidth = STICK_MIN_WIDTH;

        this.graphic.drawRect((BAR_WIDTH - stickWidth) * 0.5, -this.topStickHeight, stickWidth, (height * 0.5 + this.topStickHeight));
        this.graphic.drawRect((BAR_WIDTH - stickWidth) * 0.5, height * 0.5, stickWidth, (height * 0.5) + this.botStickHeight);
        this.graphic.endFill();

        // Bar
        this.graphic.beginFill(0xff384b);
        this.graphic.drawRoundedRect(0, 0, BAR_WIDTH, height, BAR_ROUNDNESS);
        this.graphic.endFill();
    }


}