import { handleVisibilityChange } from "components/PumpDumpAnimation/utils/VisibilityCheck";
import { Container } from "pixi.js";
import { Graphics } from "@pixi/graphics";
import { isMobile } from "react-device-detect";
import { BarChartContainer } from "../game-objects/BarChartContainer";
import { CashOutContainer } from "../game-objects/CashOutContainer";
import { EndGameContainer } from "../game-objects/EndGameContainer";
import { HorizontalAxis } from "../game-objects/HorizontalAxis";
import { MemeContainer } from "../game-objects/MemeContainer";
import { AXIS_START_POS_OFFSET_Y, VerticalAxis } from "../game-objects/VerticalAxis";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";


export class GameScene extends Container {

    barChartContainer = null;
    horizontalAxis = null;
    verticalAxis = null;
    memeContainer = null;
    endGameContainer = null;

    gameStartTime = 0;
    memeThreshold = 2500;

    cashedOutUserIds = [];

    paused = false;

    audioManager;

    visibilityChangeRemoveHandle = null;

    constructor(gameStartTime, audioManager, cashOuts) {
        super();

        this.audioManager = audioManager;

        this.barChartContainer = new BarChartContainer(this.audioManager);
        this.addChild(this.barChartContainer);

        // Masking for the bar chart
        const maskRect = new Graphics();
        maskRect.x = 0;
        maskRect.y = 0;
        maskRect.drawRect(0, 0, PumpDumpGameMananger.width, PumpDumpGameMananger.height - AXIS_START_POS_OFFSET_Y);
        maskRect.beginFill(0xffffff, 1);
        maskRect.lineStyle(0);
        this.addChild(maskRect);
        this.barChartContainer.mask = maskRect;

        this.cashOutContainer = new CashOutContainer(this.barChartContainer);
        this.addChild(this.cashOutContainer);

        this.horizontalAxis = new HorizontalAxis();
        this.addChild(this.horizontalAxis);

        this.verticalAxis = new VerticalAxis();
        this.addChild(this.verticalAxis);

        this.memeContainer = new MemeContainer();
        this.addChild(this.memeContainer);

        this.endGameContainer = new EndGameContainer();
        this.addChild(this.endGameContainer);

        this.start(gameStartTime, cashOuts);

        this.audioManager.startBgm();
    }

    start(gameStartTime, cashOuts) {
        this.gameStartTime = gameStartTime;

        this.paused = false;

        // If game has already been running
        this.removeVisibilityChangeHandle();
        this.visibilityChangeRemoveHandle = handleVisibilityChange(undefined, () => {
            const timeElapsed = Date.now() - gameStartTime;
            console.warn('visibility change cashouts', cashOuts, timeElapsed);
            if (this) {
                this.handleVisibiltyChange(timeElapsed, cashOuts);
            }
        });

        const timeElapsed = Date.now() - this.gameStartTime;
        console.warn('timeElapsed', timeElapsed, cashOuts, cashOuts.length);
        if (timeElapsed > 250) {
            this.handleNonFreshStart(timeElapsed);
        }
        this.handleCashouts(cashOuts, timeElapsed);

        this.horizontalAxis.start();
        this.verticalAxis.start();
        this.barChartContainer.start();
        console.warn('isMobile', isMobile);
    }

    removeVisibilityChangeHandle() {
        if (this.visibilityChangeRemoveHandle) {
            this.visibilityChangeRemoveHandle();
            this.visibilityChangeRemoveHandle = null;
        }
    }

    handleCashouts(cashOuts, timeElapsed) {
        this.cashedOutUserIds = [];
        cashOuts.forEach((cashOut) => {
            this.cashedOutUserIds.push(cashOut.userId);
        });
        this.cashOutContainer.handleCashouts(cashOuts, timeElapsed);
    }

    handleFreshCashouts(cashOuts) {
        const freshCashouts = cashOuts.filter((cashOut) => {
            return this.cashedOutUserIds.findIndex(id => id === cashOut.userId) === -1;
        });
        freshCashouts.forEach((cashOut) => {
            this.cashedOutUserIds.push(cashOut.userId);
            this.cashOutContainer.showCashout(cashOut.amount, cashOut.crashFactor);
        });
    }

    handleNonFreshStart(timeElapsed) {
        this.horizontalAxis.handleNonFreshStart(timeElapsed);
        this.verticalAxis.handleNonFreshStart(timeElapsed);
        this.barChartContainer.handleNonFreshStart(timeElapsed);
    }

    handleVisibiltyChange(timeElapsed, cashOuts) {
        this.handleNonFreshStart(timeElapsed);
        this.handleCashouts(cashOuts, timeElapsed);
    }

    stop() {
        this.removeVisibilityChangeHandle();
        this.horizontalAxis.stop();
        this.verticalAxis.stop();
        this.barChartContainer.stop();
        this.audioManager.stopBgm();
    }

    update() {
        let timeElapsed = Date.now() - this.gameStartTime;
        this.horizontalAxis.update(timeElapsed);
        this.verticalAxis.update(timeElapsed);
        this.barChartContainer.update(timeElapsed);
        if (timeElapsed > this.memeThreshold) {
            this.memeThreshold = timeElapsed + 3200;
            if (!this.paused) {
                this.memeContainer.generateNextMeme();
            }
        }
        this.cashOutContainer.update();
    }

    handleEndGame() {
        let timeElapsed = Date.now() - this.gameStartTime;
        this.barChartContainer.createCrashBar(timeElapsed);
        this.paused = true;
        this.barChartContainer.once('crash-bar-position', (rect) => {
            this.endGameContainer.showCrash(rect);
        });
    }
}