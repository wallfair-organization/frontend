import { ASSET_LIST } from "components/PumpDumpAnimation/config";
import { Container, Sprite } from "pixi.js";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";
import TWEEN from '@tweenjs/tween.js';

export class EndGameContainer extends Container {
    showCrash(crashRect) {
        const resources = PumpDumpGameMananger.app.loader.resources;

        let crashImage = new Sprite(resources[ASSET_LIST[`CRASH_${1 + Math.floor(Math.random() * 6)}`]].texture);
        crashImage.scale.set(0);
        crashImage.position.set(crashRect.right + 5, crashRect.top - 5);
        crashImage.anchor.set(0.5);
        crashImage.roundPixels = true;
        this.addChild(crashImage);

        let scaleData = { val: 0 };
        new TWEEN.Tween(scaleData)
            .to({ val: 1 }, 600)
            .onUpdate(() => {
                crashImage.scale.set(scaleData.val);
            })
            .easing(TWEEN.Easing.Back.Out)
            .start();
    }

}