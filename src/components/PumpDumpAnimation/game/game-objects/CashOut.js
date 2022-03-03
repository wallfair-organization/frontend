import { Container } from "@pixi/display";
import { Text } from "@pixi/text";
import TWEEN from '@tweenjs/tween.js';


const LABEL_FONT_FAMILY = 'DM Sans';
const LABEL_FONT_SIZE = 8;
const REWARD_LABEL_COLOR = 0xe2ff54;
const FACTOR_LABEL_COLOR = 0x999999;

export class CashOut extends Container {

    rewardLabel;
    factorLabel;

    constructor(rewardValue, factorValue) {
        super();

        this.rewardLabel = new Text(
          rewardValue ? `$ ${rewardValue.toFixed(2)}` : '',
          {
            fontFamily: LABEL_FONT_FAMILY,
            fontSize: LABEL_FONT_SIZE,
            fill: REWARD_LABEL_COLOR,
          }
        );
        this.rewardLabel.position.set(0, -6);
        this.rewardLabel.anchor.set(0.5, 0.5);

        this.factorLabel = new Text(
          factorValue ? `${factorValue.toFixed(2)} x` : '',
          {
            fontFamily: LABEL_FONT_FAMILY,
            fontSize: LABEL_FONT_SIZE,
            fill: FACTOR_LABEL_COLOR,
          }
        );
        this.factorLabel.position.set(0, 6);
        this.factorLabel.anchor.set(0.5, 0.5);

        this.addChild(this.rewardLabel, this.factorLabel);
    }
}