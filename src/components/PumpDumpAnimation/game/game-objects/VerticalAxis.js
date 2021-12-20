import { Graphics } from "@pixi/graphics";
import { Text } from "@pixi/text";
import { calcCrashFactorFromElapsedTime, isMobileRosiGame } from "components/RosiGameAnimation/canvas/utils";
import { Container } from "pixi.js";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";


const AXIS_LABEL_FONT_FAMILY = 'PlusJakarta-Bold';
// const AXIS_LABEL_COLOR = 0x605c8d;
const AXIS_LABEL_COLOR = 0x999999;
const AXIS_LABEL_FONT_SIZE = 10;
const AXIS_LABEL_MINI_FONT_SIZE = 8;
const AXIS_LABEL_GAP = 7.5;

const AXIS_BIG_LINE_HEIGHT = 25;
const AXIS_MEDIUM_LINE_HEIGHT = 20;
const AXIS_SMALL_LINE_HEIGHT = 7.5;

const AXIS_COUNT = 20;
export const AXIS_START_POS_OFFSET_Y = 40;
const AXIS_RIGHT_GAP = 50;

const INIT_MULTI_FACTOR = 0.25;
export const INIT_STICK_UNITS = isMobileRosiGame ? 2 : 5;
export const INITIAL_AXIS_GAP = 80;
const HALF_AXIS_THRESHOLD = INITIAL_AXIS_GAP * 0.75;
const AXIS_INCREMENT_THRESHOLD = INITIAL_AXIS_GAP * 0.5;

const STARTING_CRASH_FACTOR = 100;
export const STICK_POINT_INCREMENTS = INIT_STICK_UNITS * INITIAL_AXIS_GAP * INIT_MULTI_FACTOR;
export const INIT_STICK_POINT_CRASH_FACTOR = STARTING_CRASH_FACTOR + STICK_POINT_INCREMENTS;

export class VerticalAxis extends Container {
    axisLines = [];  // Graphic Lines
    multiplierLabels = []; // Text to indicate multipliers
    miniMultiplierLabels = [];  // Text to indicate mini multipliers

    multiFactor = INIT_MULTI_FACTOR;
    unitThreshold = HALF_AXIS_THRESHOLD;     // If Below 50 Units upgrade to the next set
    axisGap = INITIAL_AXIS_GAP;
    axisStartPosY = 0;

    isHalfAxis = false;
    stickPointCrashFactor = INIT_STICK_POINT_CRASH_FACTOR; 
    stickPointUnits = INIT_STICK_UNITS;

    // Max Crash factor 100x
    attribs = [
        { multiFactor: INIT_MULTI_FACTOR * 2, stickPointCrashFactor: 0 }, // 0.20 per piece of axis // stickPointCrashFactor is 200 initially.
        { multiFactor: INIT_MULTI_FACTOR * 4, stickPointCrashFactor: 0 }, // 0.4 per piece of axis  // Prev crashFactor + Increments
        { multiFactor: INIT_MULTI_FACTOR * 8, stickPointCrashFactor: 0 }, // 0.8 per piece of axis
        { multiFactor: INIT_MULTI_FACTOR * 16, stickPointCrashFactor: 0 }, // 1.6 per piece of axis
        { multiFactor: INIT_MULTI_FACTOR * 32, stickPointCrashFactor: 0 }, // 3.2 per piece of axis
        { multiFactor: INIT_MULTI_FACTOR * 64, stickPointCrashFactor: 0}, // 6.4 per piece of axis
        { multiFactor: INIT_MULTI_FACTOR * 128, stickPointCrashFactor: 0 }, // 12.8 per piece of axis
        { multiFactor: INIT_MULTI_FACTOR * 256, stickPointCrashFactor: 0 }, // 25.6 per piece of axis
    ]

    constructor() {
        super();

        const normalAxisPiece = this.generateNormalAxisPiece();
        const axisPosX = PumpDumpGameMananger.width - AXIS_RIGHT_GAP;
        this.axisStartPosY = PumpDumpGameMananger.height - AXIS_START_POS_OFFSET_Y;
        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.axisLines[i] = normalAxisPiece.clone();
            this.axisLines[i].position.set(axisPosX, this.axisStartPosY - i * this.axisGap);
            // this.axisLines[i].roundPixels = true;
        }
        this.addChild(...this.axisLines);

        for (let i = 0; i < AXIS_COUNT; ++i) {
            this.multiplierLabels[i] = new Text('1.00x', {
                fontFamily: AXIS_LABEL_FONT_FAMILY,
                fontSize: AXIS_LABEL_FONT_SIZE,
                fill: AXIS_LABEL_COLOR,
            });
            this.multiplierLabels[i].position.set(this.axisLines[i].x + AXIS_LABEL_GAP, this.axisLines[i].y);
            this.multiplierLabels[i].anchor.set(0, 0.5);
            // this.multiplierLabels[i].roundPixels = true;

            this.miniMultiplierLabels[i] = new Text('1.10x', {
                fontFamily: AXIS_LABEL_FONT_FAMILY,
                fontSize: AXIS_LABEL_MINI_FONT_SIZE,
                fill: AXIS_LABEL_COLOR,
            });
            this.miniMultiplierLabels[i].position.set(this.axisLines[i].x + AXIS_LABEL_GAP, this.axisLines[i].y - this.axisGap * 0.5);
            this.miniMultiplierLabels[i].anchor.set(0, 0.5);
            // this.miniMultiplierLabels[i].roundPixels = true;

        }
        this.addChild(...this.multiplierLabels);
        this.addChild(...this.miniMultiplierLabels);

        this.updateAttribs();
        this.upgradeAxisToNextSet();
    }

    updateAttribs() {
        // attribs = [
        //     { multiFactor: INIT_MULTI_FACTOR * 2, stickPointCrashFactor: 200 + 100 }, // 0.20 per piece of axis // stickPointCrashFactor is 200 initially.
        //     { multiFactor: INIT_MULTI_FACTOR * 4, stickPointCrashFactor: 300 + 200 }, // 0.4 per piece of axis  // Prev crashFactor + Increments
        //     { multiFactor: INIT_MULTI_FACTOR * 8, stickPointCrashFactor: 500 + 400 }, // 0.8 per piece of axis
        //     { multiFactor: INIT_MULTI_FACTOR * 16, stickPointCrashFactor: 900 + 800 }, // 1.6 per piece of axis
        //     { multiFactor: INIT_MULTI_FACTOR * 32, stickPointCrashFactor: 1700 + 1600 }, // 3.2 per piece of axis
        //     { multiFactor: INIT_MULTI_FACTOR * 64, stickPointCrashFactor: 3300 + 3200 }, // 6.4 per piece of axis
        //     { multiFactor: INIT_MULTI_FACTOR * 128, stickPointCrashFactor: 6500 + 6400 }, // 12.8 per piece of axis
        //     { multiFactor: INIT_MULTI_FACTOR * 256, stickPointCrashFactor: 12900 + 12800 }, // 25.6 per piece of axis
        // ]

        this.attribs[0].multiFactor = INIT_MULTI_FACTOR * 2;
        this.attribs[0].stickPointCrashFactor = INIT_STICK_POINT_CRASH_FACTOR + STICK_POINT_INCREMENTS;
        for (let i = 1; i < this.attribs.length; ++i) {
            this.attribs[i].multiFactor = INIT_MULTI_FACTOR * (2 ** (i + 1));
            this.attribs[i].stickPointCrashFactor = this.attribs[i - 1].stickPointCrashFactor + (STICK_POINT_INCREMENTS * (2 ** i));
        }
    }

    // Generate 1 piece of axis which includes 1 Big Line, 3 Small Lines, 1 Medium Line and again 3 Small Lines in order
    //  Looks like this =>  |...!... ('.' indicate small lines, '|' indicate big line, '!' medium line)
    generateNormalAxisPiece(existingAxisLine = undefined) {
        let line;
        if (existingAxisLine) {
            line = existingAxisLine;
            line.clear();
        } else {
            line = new Graphics();
        }
        line.lineStyle(2, AXIS_LABEL_COLOR, 1);
        // Big Line
        line.moveTo(0, 0);
        line.lineTo(-AXIS_BIG_LINE_HEIGHT, 0);

        // 3 Small Lines
        for (let i = 1; i <= 3; ++i) {
            let yPos = i * -this.axisGap / 8;
            line.moveTo(0, yPos);      // Divide by number of lines in 1 piece of axis
            line.lineTo(-AXIS_SMALL_LINE_HEIGHT, yPos);
        }

        // Medium Line
        let yPos = -this.axisGap / 2
        line.moveTo(0, yPos);
        line.lineTo(-AXIS_MEDIUM_LINE_HEIGHT, yPos);

        // Again 3 Small Lines
        for (let i = 5; i <= 8; ++i) {
            let yPos = i * -this.axisGap / 8;
            line.moveTo(0, yPos);      // Divide by number of lines in 1 piece of axis
            line.lineTo(-AXIS_SMALL_LINE_HEIGHT, yPos);
        }
        return line;
    }

    // Generate half piece of axis which includes 1 Big Line, 1 Small Line, 1 Medium Line and again 1 Small Line in order
    //  Looks like this =>  |.!. ('.' indicate small lines, '|' indicate big line, '!' medium line)
    generateHalfAxisPiece(existingAxisLine = undefined) {
        let line;
        if (existingAxisLine) {
            line = existingAxisLine;
            line.clear();
        } else {
            line = new Graphics();
        }
        line.lineStyle(2, AXIS_LABEL_COLOR, 1);
        // Big Line
        line.moveTo(0, 0);
        line.lineTo(-AXIS_BIG_LINE_HEIGHT, 0);

        // 1 Small Line
        let yPos = -this.axisGap / 4;
        line.moveTo(0, yPos);      // Divide by number of lines in 1 piece of axis
        line.lineTo(-AXIS_SMALL_LINE_HEIGHT, yPos);

        // Medium Line
        yPos = -this.axisGap / 2
        line.moveTo(0, yPos);
        line.lineTo(-AXIS_MEDIUM_LINE_HEIGHT, yPos);

        // Again 3 Small Lines
        yPos = 3 * -this.axisGap / 4;
        line.moveTo(0, yPos);      // Divide by number of lines in 1 piece of axis
        line.lineTo(-AXIS_SMALL_LINE_HEIGHT, yPos);
        return line;
    }

    start() {
        this.shouldRunUpdate = true;
    }

    handleNonFreshStart(timeElapsed) {
        const crashFactor = calcCrashFactorFromElapsedTime(timeElapsed < 1 ? 1 : timeElapsed) * 100;
        for (let i = this.attribs.length - 1; i >= 0; --i) {
            if (crashFactor > this.attribs[i].stickPointCrashFactor) {
                this.multiFactor = this.attribs[i].multiFactor;
                this.axisGap = INITIAL_AXIS_GAP;
                this.stickPointCrashFactor = this.attribs[i].stickPointCrashFactor;
                this.unitThreshold = HALF_AXIS_THRESHOLD;
                break;
            }
        }
        const diff = crashFactor - this.stickPointCrashFactor;
        if (diff > 0) {
            const diffInUnits = diff / this.multiFactor;
            const stickPoint = INIT_STICK_UNITS * INITIAL_AXIS_GAP;
            const reduction = stickPoint / (diffInUnits + stickPoint);
            this.axisGap = INITIAL_AXIS_GAP * reduction;
            if (this.axisGap - HALF_AXIS_THRESHOLD <= 0) {
                this.isHalfAxis = true;
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
            let val = (1 + i * (0.2 * this.multiFactor * (INITIAL_AXIS_GAP / 20)));
            this.multiplierLabels[i].text = `${val.toFixed(2)}x`;
            this.miniMultiplierLabels[i].text = `${(val + (0.1 * this.multiFactor * (INITIAL_AXIS_GAP / 20))).toFixed(2)}x`;
        }
    }

    setupAxis(timeElapsed) {
        const crashFactor = calcCrashFactorFromElapsedTime(timeElapsed < 1 ? 1 : timeElapsed) * 100;

        const diff = crashFactor - this.stickPointCrashFactor;
        if (diff > 0) {
            const diffInUnits = diff / this.multiFactor;
            const stickPoint = INIT_STICK_UNITS * INITIAL_AXIS_GAP;
            const reduction = stickPoint / (diffInUnits + stickPoint);
            this.axisGap = INITIAL_AXIS_GAP * reduction;
            // console.log('diff', diff, this.axisGap);
            if (this.axisGap <= this.unitThreshold) {
                if (this.unitThreshold === HALF_AXIS_THRESHOLD) {
                    this.unitThreshold = AXIS_INCREMENT_THRESHOLD;
                    this.isHalfAxis = true;
                } else {
                    for (let i = 0; i < this.attribs.length; ++i) {
                        if (this.multiFactor < this.attribs[i].multiFactor) {
                            this.multiFactor = this.attribs[i].multiFactor;
                            this.axisGap = INITIAL_AXIS_GAP;
                            this.stickPointCrashFactor = this.attribs[i].stickPointCrashFactor;
                            this.unitThreshold = HALF_AXIS_THRESHOLD;
                            break;
                        }
                    }
                    this.isHalfAxis = false;
                }
                this.upgradeAxisToNextSet();
            }
        }

        this.repositionLabels();
    }

    repositionLabels() {
        for (let i = 0; i < AXIS_COUNT; ++i) {
            if (this.isHalfAxis) {
                this.generateHalfAxisPiece(this.axisLines[i]);
            } else {
                this.generateNormalAxisPiece(this.axisLines[i]);
            }
            this.axisLines[i].position.y = this.axisStartPosY - i * this.axisGap;
            this.multiplierLabels[i].position.y = this.axisLines[i].y;
            this.miniMultiplierLabels[i].position.y = this.axisLines[i].y - this.axisGap * 0.5;
        }
    }
}