import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { calcCrashFactorFromElapsedTime, isMobileRosiGame } from "components/RosiGameAnimation/canvas/utils";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";
import { AXIS_START_POS_X, INIT_MULTI_FACTOR, INIT_STICK_POINT_TIME } from "./HorizontalAxis";
import { AXIS_START_POS_OFFSET_Y, INITIAL_AXIS_GAP, INIT_STICK_POINT_CRASH_FACTOR, INIT_STICK_UNITS, STICK_POINT_INCREMENTS } from "./VerticalAxis";
import TWEEN from '@tweenjs/tween.js';
import { CrashBar } from "./CrashBar";


// size of the stick visible at the top. Bot size will be same as the top
const STICK_HEIGHT_MIN_OFFSET = isMobileRosiGame ? 5 : 10;
const STICK_HEIGHT_MAX_OFFSET = isMobileRosiGame ? 40 : 80;

const STICK_MIN_WIDTH = isMobileRosiGame ? 1.5 : 3;

const BAR_WIDTH = isMobileRosiGame ? 12.5 : 25;
const BAR_ROUNDNESS = isMobileRosiGame ? 3 : 4;

const BAR_MIN_HEIGHT = isMobileRosiGame ? 5 : 10;
const BAR_HEIGHT_INCREMENTS = isMobileRosiGame ? 5 : 10;

const CONT_START_Y = -AXIS_START_POS_OFFSET_Y;

const SAME_HEIGHT_BAR_COUNT = 5;
const BAR_INCREMENTS_COUNT = 7;

export const INIT_CREATE_THRESHOLD = isMobileRosiGame ? 500 : 300;   // Every 300ms generate a bar

export const MERGE_BAR_COUNT = 2;

// Top edge of the bar from the center of the bar. Note: Not the top edge of the stick
const GetBarTopEdgeDistance = (bar) => {
    return ((bar.height - bar.topBar) - (bar.height * 0.5)) * (bar.scale.y * bar.parent.scale.y);
}

const reducer = (accumlated, current) => {
    const dist = GetBarTopEdgeDistance(current);
    return {
        x: accumlated.x + current.x,
        y: accumlated.y + current.y - dist,
        heightIndex: accumlated.heightIndex + current.heightIndex,
        isNegative: accumlated.isNegative && current.isNegative
    };
}

export class BarChartContainer extends Container {
    greenBarDetails = [];
    redBarDetails = [];

    shouldRunUpdate = false;
    
    previousThreshold = 0;
    
    gapBetweenBars = INIT_CREATE_THRESHOLD / INIT_MULTI_FACTOR;
    generatedBars = [];

    barScale = {x: 1, y: 1};

    createThresholdMult = 1;

    audioManager;

    attribs = []

    constructor(audioManager) {
        super();
        this.audioManager = audioManager;

        const height = PumpDumpGameMananger.height;
        const width = PumpDumpGameMananger.width;
        this.position.set(width * AXIS_START_POS_X, height + CONT_START_Y);

        for (let i = 0; i < BAR_INCREMENTS_COUNT; ++i) {
            for (let j = 0; j < SAME_HEIGHT_BAR_COUNT; ++j) {
                this.greenBarDetails.push(this.generateBarTextureAndDetails(BAR_MIN_HEIGHT + BAR_HEIGHT_INCREMENTS * i, 'green'));
                this.redBarDetails.push(this.generateBarTextureAndDetails(BAR_MIN_HEIGHT + BAR_HEIGHT_INCREMENTS * i, 'red'));
            }
        }
        // First Bar
        // this.generateBar(0, 100);
        this.updateAttribs();
    }

    updateAttribs() {
        // this.attribs = [
        //     { threshold: 0.5, done: false, createThresholdMult: 2 },
        //     { threshold: 0.25, done: false, createThresholdMult: 4 },
        //     { threshold: 0.125, done: false, createThresholdMult: 8 },
        //     { threshold: 0.0625, done: false, createThresholdMult: 16 },
        //     { threshold: 0.03125, done: false, createThresholdMult: 32 },
        //     { threshold: 0.015625, done: false, createThresholdMult: 64 },
        //     { threshold: 0.0078125, done: false, createThresholdMult: 128 },
        // ]

        for (let i = 0; i < 9; ++i) {
            this.attribs.push({ threshold: 1 / (2 ** (i + 1)), done: false, createThresholdMult: 2 ** (i + 1) });
        }
    }

    generateBarTextureAndDetails(height, color = 'green') {
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
        
        return { texture: PumpDumpGameMananger.app.renderer.generateTexture(bar), botBar: stickBotHeight, topBar: stickTopHeight };
    }

    start() {
        this.shouldRunUpdate = true;
    }

    handleNonFreshStart(timeElapsed) {
        // Remove existing bars if any (Note: we use the same function during PAGE HIDDEN/VISIBLE STATE)
        for (let i = this.generatedBars.length - 1; i >= 0; --i) {
            this.removeChild(this.generatedBars[i]);
        }
        this.generatedBars = [];

        const crashFactor = calcCrashFactorFromElapsedTime(timeElapsed < 1 ? 1 : timeElapsed) * 100;
        this.handleContainerScale(timeElapsed, crashFactor);

        this.shouldBarsMerge();

        let runningTime = INIT_CREATE_THRESHOLD * this.createThresholdMult;

        // First Bar
        // this.generateBar(0, 100);
        while(runningTime < timeElapsed) {
            const runningCrashFactor = calcCrashFactorFromElapsedTime(runningTime < 1 ? 1 : runningTime) * 100;
            this.previousThreshold = runningTime;
            this.generateBar(this.previousThreshold, runningCrashFactor);
            runningTime += INIT_CREATE_THRESHOLD * this.createThresholdMult;
        }
    }

    stop() {
        this.shouldRunUpdate = false;
    }

    shouldBarsMerge() {
        // The lowest scale that the game can go to on x-scale is = 2500/200000 = 0.0125
        // The lowest scale that the game can go to on y-scale is = 100/10000 = 0.01
        for (let i = this.attribs.length - 1; i >= 0; --i) {
            if (this.scale.x < this.attribs[i].threshold && !this.attribs[i].done) {
                this.attribs[i].done = true;
                this.createThresholdMult = this.attribs[i].createThresholdMult;
                this.attribs.splice(0, i + 1);
                this.barScale = { x: 1 / this.scale.x, y: 1 / this.scale.y };
                return true;
            }
        }
        return false;
    }



    mergeBars() {
        const bigBarConfigs = [];
        const barsToMergeList = [];
        for (let index = this.generatedBars.length - 1; index >= 0; index -= MERGE_BAR_COUNT) {
            const barsToMerge = [];
            let count = 0;
            do {
                barsToMerge.unshift(...this.generatedBars.splice(index - count, 1));
                ++count;
            } while(count < MERGE_BAR_COUNT && this.generatedBars[index - count])

            // Get average position
            const bigBarConfig = barsToMerge.reduce(reducer, { x: 0, y: 0, heightIndex: 0, isNegative: true });
            bigBarConfig.x = barsToMerge[barsToMerge.length - 1].x;
            bigBarConfig.y /= barsToMerge.length;
            bigBarConfig.heightIndex = Math.ceil(bigBarConfig.heightIndex / barsToMerge.length);
            if (bigBarConfig.heightIndex < SAME_HEIGHT_BAR_COUNT * 3) {
                bigBarConfig.heightIndex = SAME_HEIGHT_BAR_COUNT * 3 + Math.floor(Math.random() * SAME_HEIGHT_BAR_COUNT * (BAR_INCREMENTS_COUNT - 3));
            }

            bigBarConfigs.unshift(bigBarConfig);
            barsToMergeList.unshift({ bars: barsToMerge, bigBarConfig: bigBarConfig});
        }

        barsToMergeList.forEach((barsObject) => {
            this.mergeBarsTween(barsObject.bars, barsObject.bigBarConfig);
        })

        // Start tween on all big bars
        bigBarConfigs.forEach((bigBarConfig, index) => {
            if (index < 3) {
                bigBarConfig.heightIndex = Math.floor(Math.random() * SAME_HEIGHT_BAR_COUNT * 1);
            }
            const bigBar = this.createEmergingBiggerBar(bigBarConfig);
            this.generatedBars.push(bigBar);
            this.biggerBarEmergeTween(bigBar);
        });
    }

    createEmergingBiggerBar(bigBarConfig) {
        let details;
        if (bigBarConfig.isNegative) {
            details = this.redBarDetails[bigBarConfig.heightIndex];
        } else {
            details = this.greenBarDetails[bigBarConfig.heightIndex];
        }
        const bar = new Sprite(details.texture);
        bar.anchor.set(0.5);
        bar.heightIndex = bigBarConfig.heightIndex;
        bar.topBar = details.topBar;
        bar.botBar = details.botBar;
        bar.isNegative = bigBarConfig.isNegative;
        let positionY = this.getBarTopEdgeDistance(bar);
        console.warn('posiiton', bigBarConfig.y, positionY);
        bar.position.set(bigBarConfig.x, bigBarConfig.y + positionY);
        bar.scale.set(0);
        this.addChild(bar);
        return bar;

    }

    mergeBarsTween(bars, bigBarConfig) {
        for (let i = 0; i < bars.length; ++i) {
            const bar = bars[i];
            let barData = { x: bar.x, y: bar.y, alpha: 1, scaleX: bar.scale.x, scaleY: bar.scale.y  };
            new TWEEN.Tween(barData)
                .to({ x: bigBarConfig.x, y: bigBarConfig.y, alpha: 0, scaleX: 0, scaleY: 0 }, 600)
                .onUpdate(() => {
                    bar.scale.set(barData.scaleX, barData.scaleY);
                    bar.alpha = barData.alpha;
                    bar.position.set(barData.x, barData.y);
                    if (barData.alpha === 0) {
                        this.removeChild(bar);
                    }
                })
                .easing(TWEEN.Easing.Exponential.Out)
                .start();
        }
    }

    biggerBarEmergeTween(bigBar) {
        new TWEEN.Tween(bigBar.scale)
            .to({ x: this.barScale.x, y: this.barScale.y }, 600)
            .easing(TWEEN.Easing.Elastic.Out)
            .start();
    }

    showNewBarTween(newBar) {
        this.audioManager.playSfx('bar');
        new TWEEN.Tween(newBar.scale)
            .to({ x: this.barScale.x, y: this.barScale.y }, 300)
            .easing(TWEEN.Easing.Back.Out)
            .start();
    }

    createCrashBar(timeElapsed) {

        const crashFactor = calcCrashFactorFromElapsedTime(timeElapsed < 1 ? 1 : timeElapsed) * 100;
        let crashBarPosition = { 
            x: ((this.previousThreshold + INIT_CREATE_THRESHOLD * this.createThresholdMult) / INIT_CREATE_THRESHOLD) * this.gapBetweenBars, 
            y: -((crashFactor / 100) - 1) * INITIAL_AXIS_GAP * INIT_STICK_UNITS
        };

        let bar = new CrashBar(crashBarPosition.x, crashBarPosition.y);
        bar.scale.set(0);
        this.addChild(bar);
        
        bar.showTween(this.barScale.x, this.barScale.y);
        bar.once('crash-bar-created', () => {
            const rect = bar.getBounds(true);
            this.emit('crash-bar-position', rect);
            const scaleGap = this.scale.y * bar.scale.y;
            const gap = ((PumpDumpGameMananger.height - AXIS_START_POS_OFFSET_Y) - (rect.top + (bar.topStickHeight + BAR_MIN_HEIGHT) * scaleGap));
            bar.startStretch(gap * (1 / scaleGap));
        });
    }

    handleContainerScale(timeElapsed, crashFactor) {
        let contScale = { x: 1, y: 1 };
        if (timeElapsed > INIT_STICK_POINT_TIME) {
            contScale.x = INIT_STICK_POINT_TIME / timeElapsed;
        }
        if (crashFactor >= INIT_STICK_POINT_CRASH_FACTOR) {
            // The scale start at 100 or 1.00. Hence we subtract crash factor by 100 to get the correct scale
            contScale.y = 100 / (crashFactor - STICK_POINT_INCREMENTS);
        }
        this.scale.set(contScale.x, contScale.y);
    }

    update(timeElapsed) {
        if (!this.shouldRunUpdate) {
            return;
        }

        const crashFactor = calcCrashFactorFromElapsedTime(timeElapsed < 1 ? 1 : timeElapsed) * 100;
        this.handleContainerScale(timeElapsed, crashFactor);
        if (this.shouldBarsMerge()) {
            this.emit('bars-merging');
            this.mergeBars();
        }
        this.setupBarChart(timeElapsed, crashFactor);

    }

    setupBarChart(timeElapsed, crashFactor) {
        if (timeElapsed - this.previousThreshold >= INIT_CREATE_THRESHOLD * this.createThresholdMult) {
            this.previousThreshold += INIT_CREATE_THRESHOLD * this.createThresholdMult;
            this.generateBar(this.previousThreshold, crashFactor, true);
        }
    }

    // Top edge of the bar from the center of the bar. Note: Not the top edge of the stick
    getBarTopEdgeDistance(bar) {
        return ((bar.height - bar.topBar) - (bar.height * 0.5)) * this.barScale.y;
    }

    createBar(crashFactor, timeElapsed, randMin, randMax) {
        // Divide by 100 to get the origCrashFactor 
        // Subtract by -1 since the scale starts with 1.
        // Initially Verticle scale measures (INITIAL_AXIS_GAP) * 5 from 1.00x to 2.00x and are 5 Pieces of axis apart
        let positionY = -((crashFactor / 100) - 1) * INITIAL_AXIS_GAP * INIT_STICK_UNITS;
        let positionX = (timeElapsed / INIT_CREATE_THRESHOLD) * this.gapBetweenBars;

        let bar;
        let barDetails;;
        let barHeightIndex = randMin + Math.floor(Math.random() * (randMax - randMin));
        if (Math.random() < 0.1) {
            barDetails = this.redBarDetails[barHeightIndex];
            barDetails.isNegative = true;
            // Generate random red bars at relatively low positions
            positionY += Math.random() * 10 * this.barScale.y;
        } else {
            barDetails = this.greenBarDetails[barHeightIndex];
            barDetails.isNegative = false;
        }

        bar = new Sprite(barDetails.texture);
        bar.heightIndex = Math.floor(barHeightIndex / SAME_HEIGHT_BAR_COUNT);
        bar.topBar = barDetails.topBar;
        bar.botBar = barDetails.botBar;
        bar.isNegative = barDetails.isNegative;
        // Not first bar
        positionY += this.getBarTopEdgeDistance(bar);
        if (this.generatedBars.length === 0) {
            // To avoid first bar sitting on the 1x line
            positionY -= (BAR_MIN_HEIGHT * 0.5) * this.barScale.y;
        }

        bar.scale.set(0, 0);
        bar.anchor.set(0.5);
        bar.position.set(positionX, positionY);
        this.addChild(bar);

        return bar;
    }

    generateBar(timeElapsed, crashFactor, showTween = false) {
        let randMax = this.greenBarDetails.length;
        let randMin = 0;
        // If less that 1.25x don't show tall bars
        if (this.generatedBars.length <= 3) {
            randMax = SAME_HEIGHT_BAR_COUNT * 1;
        } else if (crashFactor <= 200) {
            randMin = SAME_HEIGHT_BAR_COUNT * 1;
            randMax = SAME_HEIGHT_BAR_COUNT * 4;
        } else {
            randMin = SAME_HEIGHT_BAR_COUNT * 4;
        }

        let bar = this.createBar(crashFactor, timeElapsed, randMin, randMax);

        if (showTween) {
            this.showNewBarTween(bar);
        } else {
            bar.scale.set(this.barScale.x, this.barScale.y);
        }

        this.generatedBars[this.generatedBars.length] = bar;
    }
}