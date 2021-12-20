import { ASSET_LIST } from "components/PumpDumpAnimation/config";
import { Container, Sprite } from "pixi.js";
import { PumpDumpGameMananger } from "../PumpDumpGameManager";
import TWEEN from '@tweenjs/tween.js';
import _ from 'lodash';
import { isMobile } from "react-device-detect";

export class MemeContainer extends Container {
    memeConfig = [
        { x: 0.1, y: 0.2 },
        { x: 0.4, y: 0.75 },
        { x: 0.7, y: 0.7 },
    ];
    currentMemeIndex = 0;

    memes = [];

    constructor() {
        super();
        this.currentMemeIndex = 0;
        const resources = PumpDumpGameMananger.app.loader.resources;

        for (let i = 0; i <= 21; ++i) {
            this.memes[i] = new Sprite(resources[ASSET_LIST[`MEME_${i + 1}`]].texture);
            this.memes[i].visible = false;
            this.memes[i].alpha = 0;
            this.memes[i].scale.set(0);
            this.memes[i].anchor.set(0.5);
            this.memes[i].roundPixels = true;
        }

        this.memes = _.shuffle(this.memes);
        this.memes = _.slice(this.memes, 0, this.memes.length);

        this.addChild(...this.memes)
    }

    generateNextMeme() {
        if (this.currentMemeIndex >= this.memes.length) {
            this.memes = _.shuffle(this.memes);
            this.memes = _.slice(this.memes, 0, this.memes.length);
            this.currentMemeIndex = 0;
            return;
        }

        const rand = Math.random();
        const initialX = PumpDumpGameMananger.width * (isMobile ? (rand <= 0.5 ? 0.25 : 0.675) : (rand <= 0.5 ? 0.18 : 0.675));
        const finalX = initialX + Math.random() * PumpDumpGameMananger.width * 0.1;
        const initialY = PumpDumpGameMananger.height * (isMobile ? (rand <= 0.5 ? 0.4 : 0.7) : (rand <= 0.5 ? 0.3 : 0.7));
        const finalY = initialY + Math.random() * PumpDumpGameMananger.height * 0.1;
        const meme = this.memes[this.currentMemeIndex];
        meme.position.set(finalX, finalY);
        this.addChild(meme);

        let data = { alpha: 0, scale: 0 };
        
        new TWEEN.Tween(data)
            .to({ alpha: 1, scale: 1 }, 400)
            .onStart(() => {
                meme.visible = true;
            })
            .onUpdate(() => {
                meme.alpha = data.alpha;
                meme.scale.set(data.scale);
            })
            .easing(TWEEN.Easing.Back.Out)
            .start();

        data.alpha = 1;
        data.scale = 1;
        new TWEEN.Tween(data)
            .to({ alpha: 0, scale: 0 }, 400)
            .onStart(() => {
                meme.visible = true;
            })
            .onUpdate(() => {
                meme.alpha = data.alpha;
                meme.scale.set(data.scale);
            })
            .onComplete(() => {
                meme.visible = false;
            })
            .delay(3000)
            .easing(TWEEN.Easing.Back.In)
            .start();

        this.currentMemeIndex++;
    }

}