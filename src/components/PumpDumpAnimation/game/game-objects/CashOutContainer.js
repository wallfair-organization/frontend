import { Container } from "@pixi/display";
import { CashOut } from "./CashOut";
import { INIT_CREATE_THRESHOLD, MERGE_BAR_COUNT } from "./BarChartContainer";
import { calcCrashFactorFromElapsedTime } from "components/RosiGameAnimation/canvas/utils";

const VERTICAL_GAP = 25;
const GAP_FROM_BAR = 15;

export class CashOutContainer extends Container {
    barContainer = null;

    cashOuts = new Map();

    constructor(barContainer) {
        super();
        this.barContainer = barContainer;
        this.barContainer.on('bars-merging', this.mergeCashouts, this);
    }

    updateCashoutOpacity(cashOuts) {
        cashOuts.forEach((cashOut, index) =>{
            cashOut.alpha = 1 - 0.25 * index;
        })
    }

    purgeMoreThanThreeCashouts(cashOuts) {
        const removedCashouts = cashOuts.splice(3);
        removedCashouts.forEach((removedCashout) => {
            this.removeChild(removedCashout);
        });
        this.updateCashoutOpacity(cashOuts);
    }

    showCashout(amount, crashFactor) {
        let cashOut = new CashOut(amount, crashFactor);
        this.addChild(cashOut);

        if (this.barContainer.generatedBars.length) {
            if (this.cashOuts.has(this.barContainer.generatedBars.length - 1)) {
                const cashOuts = this.cashOuts.get(this.barContainer.generatedBars.length - 1);
                cashOuts.unshift(cashOut);
                if (cashOuts.length > 3) {
                    this.purgeMoreThanThreeCashouts(cashOuts);
                }
                this.updateCashoutOpacity(cashOuts);
            } else {
                this.cashOuts.set(this.barContainer.generatedBars.length - 1, [cashOut]);
            }
        }
    }

    addCashoutsForBarIndex(cashOuts, barIndex) {
        const newCashOuts = [];
        this.cashOuts.set(barIndex, newCashOuts);
        cashOuts.forEach((cashOutData, index) => {
            let cashOut = new CashOut(cashOutData.amount, cashOutData.crashFactor);
            cashOut.alpha = 1 - 0.25 * index;
            this.addChild(cashOut);
            newCashOuts.push(cashOut);
        });
    }

    getCashOutsForCrashFactor(cashOuts, crashFactor) {
        let cashOutsToAdd = [];
        for (let i = cashOuts.length - 1; i >= 0; --i) {
            if (cashOuts[i].crashFactor * 100 < crashFactor) {
                cashOutsToAdd.push(cashOuts[i]);
                cashOuts.splice(i, 1);
            }
        }
        cashOutsToAdd.sort((a, b) => {
            return (b.crashFactor * 100) - (a.crashFactor * 100);
        })
        if (cashOutsToAdd.length > 3) {
            cashOutsToAdd.splice(3);
        }
        return cashOutsToAdd;
    }

    handleCashouts(cashOuts, timeElapsed) {
        this.cashOuts = new Map();
        this.removeChildren();

        let runningTime = INIT_CREATE_THRESHOLD * this.barContainer.createThresholdMult;
        let runningCrashFactor = calcCrashFactorFromElapsedTime(runningTime < 1 ? 1 : runningTime) * 100;
        let barIndex = 0;
        // First Bar
        const cashOutsToAdd = this.getCashOutsForCrashFactor(cashOuts, runningCrashFactor);
        this.addCashoutsForBarIndex(cashOutsToAdd, barIndex);

        while (runningTime < timeElapsed) {
            ++barIndex;
            runningTime += INIT_CREATE_THRESHOLD * this.barContainer.createThresholdMult;
            runningCrashFactor = calcCrashFactorFromElapsedTime(runningTime < 1 ? 1 : runningTime) * 100;
            const cashOutsToAdd = this.getCashOutsForCrashFactor(cashOuts, runningCrashFactor);
            this.addCashoutsForBarIndex(cashOutsToAdd, barIndex);
        }
    }

    mergeCashouts() {
        let cashOutsToMergeList = new Map();
        let list = [];
        for (let index = this.barContainer.generatedBars.length - 1; index >= 0; index -= MERGE_BAR_COUNT) {
            const cashOutsToMerge = [];
            let count = 0;
            do {
                if (this.cashOuts.has(index - count)) {
                    cashOutsToMerge.push(...this.cashOuts.get(index - count));
                }
                ++count;
            } while (count < MERGE_BAR_COUNT && this.barContainer.generatedBars[index - count])
    
            list.unshift(cashOutsToMerge);
        }

        list.forEach((cashOuts, index) => {
            if (cashOuts.length) {
                if (cashOuts.length > 3) {
                    this.purgeMoreThanThreeCashouts(cashOuts);
                }
                this.updateCashoutOpacity(cashOuts);
                cashOutsToMergeList.set(index, cashOuts);
            }
        });
        this.cashOuts = cashOutsToMergeList;
    }


    update() {
        if (this.barContainer.generatedBars && this.barContainer.generatedBars) {
            this.barContainer.generatedBars.forEach((bar, index) => {
                if (this.cashOuts.has(index)) {
                    const rect = bar.getBounds(true);
                    const barBottom = rect.bottom - (bar.botBar * (this.barContainer.scale.y * bar.scale.y));
                    this.cashOuts.get(index).forEach((cashOut, index) => {
                        cashOut.position.set(rect.x + rect.width * 0.5, barBottom + GAP_FROM_BAR + index * VERTICAL_GAP);
                    })
                }
            })
        }
    }
}