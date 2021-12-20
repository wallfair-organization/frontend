import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { Text } from "@pixi/text";
import { isMobileRosiGame } from "components/RosiGameAnimation/canvas/utils";
import { Container } from "pixi.js";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";


const AXIS_LABEL_FONT_FAMILY = 'PlusJakarta-Bold';
// const AXIS_LABEL_COLOR = 0x605c8d;
const AXIS_LABEL_COLOR = 0x999999;
const AXIS_LABEL_FONT_SIZE = 10;
const AXIS_LABEL_GAP = 5;

const AXIS_LINE_HEIGHT = 15;

const AXIS_COUNT = 20;
export const AXIS_START_POS_X = isMobileRosiGame ? 0.1 : 0.2;
const AXIS_BOTTOM_GAP = 7.5;

export const INIT_MULTI_FACTOR = isMobileRosiGame ? 20 : 5;
export const AXIS_GAP = isMobileRosiGame ? 50 : 100;

const INIT_STICK_UNITS = isMobileRosiGame ? 4 : 5;

export const INIT_STICK_POINT_TIME = INIT_MULTI_FACTOR * AXIS_GAP * INIT_STICK_UNITS; // 2500ms or 2.



export class HorizontalAxis extends Container {
    
    axisLines = [];  // Graphic Lines Texture Sprites
    timeLabels = []; // Text to indicate seconds

    shouldRunUpdate = false;

    multiFactor = INIT_MULTI_FACTOR;    // 1 Unit = 5ms
    unitThreshold = AXIS_GAP * 0.5;     // If Below half AXIS_GAP Units upgrade to the next set
    initialAxisGap = AXIS_GAP;
    axisGap = 0;
    axisStartPosX = 0;

    stickPointTime = INIT_STICK_POINT_TIME;
    stickPointUnits = INIT_STICK_UNITS;

    // Max Time is 200480 ms

    // attribs = [
    //     { multiFactor: 10, unitThreshold: AXIS_GAP * 0.5, axisGap: AXIS_GAP, stickPointTime: INIT_STICK_POINT_TIME * 2, stickPointUnits: INIT_STICK_UNITS },
    //     { multiFactor: 20, unitThreshold: AXIS_GAP * 0.5, axisGap: AXIS_GAP, stickPointTime: INIT_STICK_POINT_TIME * 4, stickPointUnits: INIT_STICK_UNITS },
    //     { multiFactor: 100, unitThreshold: AXIS_GAP * 1.25, axisGap: AXIS_GAP * 2.5, stickPointTime: INIT_STICK_POINT_TIME * 8, stickPointUnits: INIT_STICK_UNITS / 2.5 },
    //     { multiFactor: 200, unitThreshold: AXIS_GAP * 1.25, axisGap: AXIS_GAP * 2.5, stickPointTime: INIT_STICK_POINT_TIME * 16, stickPointUnits: INIT_STICK_UNITS / 2.5 },
    //     { multiFactor: 400, unitThreshold: AXIS_GAP * 1.25, axisGap: AXIS_GAP * 2.5, stickPointTime: INIT_STICK_POINT_TIME * 32, stickPointUnits: INIT_STICK_UNITS / 2.5 },
    //     { multiFactor: 800, unitThreshold: AXIS_GAP * 1.25, axisGap: AXIS_GAP * 2.5, stickPointTime: INIT_STICK_POINT_TIME * 64, stickPointUnits: INIT_STICK_UNITS / 2.5 },
    // ]
    attribs = [
        { multiFactor: INIT_MULTI_FACTOR * 2, unitThreshold: AXIS_GAP * 0.5, axisGap: AXIS_GAP, stickPointTime: INIT_STICK_POINT_TIME * 2, stickPointUnits: INIT_STICK_UNITS },
        { multiFactor: INIT_MULTI_FACTOR * 4, unitThreshold: AXIS_GAP * 0.5, axisGap: AXIS_GAP, stickPointTime: INIT_STICK_POINT_TIME * 4, stickPointUnits: INIT_STICK_UNITS },
        { multiFactor: INIT_MULTI_FACTOR * 20, unitThreshold: AXIS_GAP * 1.25, axisGap: AXIS_GAP * 2.5, stickPointTime: INIT_STICK_POINT_TIME * 8, stickPointUnits: INIT_STICK_UNITS / 2.5 },
        { multiFactor: INIT_MULTI_FACTOR * 40, unitThreshold: AXIS_GAP * 1.25, axisGap: AXIS_GAP * 2.5, stickPointTime: INIT_STICK_POINT_TIME * 16, stickPointUnits: INIT_STICK_UNITS / 2.5 },
        { multiFactor: INIT_MULTI_FACTOR * 80, unitThreshold: AXIS_GAP * 1.25, axisGap: AXIS_GAP * 2.5, stickPointTime: INIT_STICK_POINT_TIME * 32, stickPointUnits: INIT_STICK_UNITS / 2.5 },
        { multiFactor: INIT_MULTI_FACTOR * 160, unitThreshold: AXIS_GAP * 1.25, axisGap: AXIS_GAP * 2.5, stickPointTime: INIT_STICK_POINT_TIME * 64, stickPointUnits: INIT_STICK_UNITS / 2.5 },
    ]

    constructor() {
        super();
        this.axisGap = this.initialAxisGap;
        const line = new Graphics();
        line.lineStyle(2, AXIS_LABEL_COLOR, 1);
        line.moveTo(0, 0);
        line.lineTo(0, -AXIS_LINE_HEIGHT);

        const axisPosY = PumpDumpGameMananger.height - AXIS_BOTTOM_GAP;
        this.axisStartPosX = PumpDumpGameMananger.width * AXIS_START_POS_X;
        const lineTexture = PumpDumpGameMananger.app.renderer.generateTexture(line);
        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.axisLines[i] = new Sprite(lineTexture);
            this.axisLines[i].position.set(this.axisStartPosX + i * this.axisGap, axisPosY);
            this.axisLines[i].anchor.set(0.5, 1);
            // this.axisLines[i].roundPixels = true;
        }
        this.addChild(...this.axisLines);
        
        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.timeLabels[i] = new Text(`${i * (this.multiFactor * AXIS_GAP / 1000)}s`, {
                fontFamily: AXIS_LABEL_FONT_FAMILY,
                fontSize: AXIS_LABEL_FONT_SIZE,
                fill: AXIS_LABEL_COLOR,
            });
            this.timeLabels[i].position.set(this.axisLines[i].x + AXIS_LABEL_GAP, this.axisLines[i].y);
            this.timeLabels[i].anchor.set(0, 1);
            // this.timeLabels[i].roundPixels = true;

        }
        this.addChild(...this.timeLabels);

        // this.calculateAttribs();
        // console.warn('attribs', this.attribs);
    }

    start() {
        this.shouldRunUpdate = true;
    }

    handleNonFreshStart(timeElapsed) {
        for (let i = this.attribs.length - 1; i >= 0; --i) {
            if (timeElapsed > this.attribs[i].stickPointTime) {
                this.multiFactor = this.attribs[i].multiFactor;
                this.initialAxisGap = this.attribs[i].axisGap;
                this.stickPointTime = this.attribs[i].stickPointTime;
                this.stickPointUnits = this.attribs[i].stickPointUnits;
                this.unitThreshold = this.attribs[i].unitThreshold;
                this.axisGap = this.initialAxisGap;
                break;
            }
        }
        this.upgradeAxisToNextSet();
        this.repositionLabels();
    }

    stop() {
        this.shouldRunUpdate = false;
    }

    update(timeElapsed) {
        if (!this.shouldRunUpdate) {
            return;
        }
        this.setupAxis(timeElapsed);
    }

    upgradeAxisToNextSet() {
        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.timeLabels[i].text = `${i * (this.multiFactor * AXIS_GAP / 1000)}s`;
        }
    }

    setupAxis(timeElapsed) {
        const diff = timeElapsed - this.stickPointTime;
        if (diff > 0) {
            const diffInUnits = diff / (this.multiFactor * (this.stickPointUnits / INIT_STICK_UNITS));
            const stickPoint = this.stickPointUnits * this.initialAxisGap;
            const reduction = stickPoint / (diffInUnits + stickPoint);
            this.axisGap = this.initialAxisGap * reduction;
            if (this.axisGap <= this.unitThreshold) {
                for (let i = 0; i < this.attribs.length; ++i) {
                    if (this.multiFactor < this.attribs[i].multiFactor) {
                        this.multiFactor = this.attribs[i].multiFactor;
                        this.initialAxisGap = this.attribs[i].axisGap;
                        this.stickPointTime = this.attribs[i].stickPointTime;
                        this.stickPointUnits = this.attribs[i].stickPointUnits;
                        this.unitThreshold = this.attribs[i].unitThreshold;
                        break;
                    }
                }
                this.axisGap = this.initialAxisGap;
                this.upgradeAxisToNextSet();
            }
        }
        this.repositionLabels();
    }

    repositionLabels() {
        for (let i = 1; i < AXIS_COUNT; ++i) {
            this.axisLines[i].position.x = (this.axisLines[i - 1].position.x + this.axisGap);
            this.timeLabels[i].position.x = this.axisLines[i].position.x + AXIS_LABEL_GAP;
        }
    }

}