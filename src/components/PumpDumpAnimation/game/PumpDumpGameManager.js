import { Application } from "@pixi/app";
import { GameScene } from "./scenes/GameScene";
import { LaunchScene } from "./scenes/LaunchScene";
import TWEEN from '@tweenjs/tween.js';

/*this class is purely static. Don't new this class*/
export class PumpDumpGameMananger {

    // Safely store variables for our game
    static app;

    // A DisplayObject with its own update method
    static currentScene;
    
    static _width = 0;
    static _height = 0;

    // With getters but not setters, these variables become read-only
    static get width() {
        return this._width;
    }
    static get height() {
        return this._height;
    }

    static _audioManager;

    static _resolution = 2;

    // Use this function ONCE to start the entire game
    static initialize(backgroundColor, viewCanvas, audioManager) {

        this._resolution = window.devicePixelRatio;
        console.warn('dpr', this._resolution);
        // Create our pixi app
        this.app = new Application({
            view: viewCanvas,
            resolution: this._resolution,
            autoDensity: true,
            resizeTo: viewCanvas.parentElement,
            antialias: true,
            backgroundAlpha: 0,
        });

        this._width = this.app.renderer.width / this._resolution;
        this._height = this.app.renderer.height / this._resolution;

        this._audioManager = audioManager;

        this.addTicker();
    }

    static addTicker() {
        this.app.ticker.add(this.update, this);
    }

    static removeTicker() {
        this.app.ticker.remove(this.update, this);
    }

    static load(assetList, onLoad) {
        if (this.app) {
            this.app.loader.add(Object.values(assetList));
            this.app.loader.load();
        }
        if (onLoad) {
            this.app.loader.onComplete.once(onLoad);
        }
    }

    static deleteExistingScene() {
        // Remove and destroy old scene... if we had one..
        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
            this.currentScene.destroy();
        }
    }

    // Call this function when you want to go to a new scene
    static changeScene(newScene) {
        this.deleteExistingScene();
        // Add the new one
        this.currentScene = newScene;
        this.app.stage.addChild(this.currentScene);
    }

    static startGame(gameTime, cashOuts) {
        if (!this.app) {
            return;
        }
        const gameScene = new GameScene(gameTime, this._audioManager, cashOuts);
        this.changeScene(gameScene);
    }

    static endGame(isLosing) {
        isLosing ? this._audioManager.playLoseSound() : this._audioManager.playGameOverSound();
        if (this.currentScene) {
            this.currentScene.stop();
            this.currentScene.handleEndGame();
        }
    }

    static launchCoin(launchTime) {
        // Preparation Scene
        this.deleteExistingScene();
        console.warn('launch scene', launchTime);
        if (!this.app || launchTime <= 0) {
            console.warn('launch scene cancelled', launchTime);
            return;
        }
        const launchScene = new LaunchScene(launchTime, this._audioManager);
        this.changeScene(launchScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    static update(framesPassed) {
        if (this.currentScene) {
            // framesPassed is not desireable in most cases, hence we pass the delta
            this.currentScene.update(this.app.ticker.deltaMS);
        }
        TWEEN.update(this.app.ticker.lastTime);
    }

    static handleFreshCashouts(cashOuts) {
        console.warn('fresh cashouts', cashOuts);
        if (this.currentScene) {
            this.currentScene.handleFreshCashouts(cashOuts);
        }
    }

    static destroy() {
        this.deleteExistingScene();
        this.removeTicker();
        this.app.destroy(true, true);
    }
}