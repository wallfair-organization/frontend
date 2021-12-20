import * as Sound from '@pixi/sound';
import { AUDIO_LIST } from '../config';

export class GameAudioManager {
    constructor() {
        let volume = 0;
        try {
            const savedVolume = localStorage.getItem('gameVolume');
            this.volume = savedVolume ? parseFloat(savedVolume) : volume;
        } catch (e) {
            this.volume = 0;
            console.error(e);
        }
        this.errors = [];
        this.ready = false;

        this.isRequestingBGM = false;

        let count = Object.keys(AUDIO_LIST).length;
        Sound.sound.add(
            AUDIO_LIST,
            {
                preload: true,
                loaded: (err, data) => {
                    if (err) {
                        this.errors = [...this.errors, err];
                    }
                    --count;
                    if (count === 0) {
                        console.warn('audio loaded');
                        this.ready = true;
                        this.setVolume(this.volume);
                        this.isRequestingBGM && this.startBgm();
                    }
                },
            }
        );
    }

    setVolume(volume = 1.0) {
        try {
            if (volume === 1 || volume === '1') {
                this.volume = 1.0;
            } else if (!volume) {
                this.volume = 0.0;
            } else {
                this.volume = volume;
            }

            localStorage.setItem('gameVolume', `${this.volume}`);
            if (this.ready) {
                Sound.sound.volume('bgm', this.volume);
            }
        } catch (e) {
            console.error('Audio output error', e);
        }
    }

    mute() {
        this.setVolume(0.0);
    }

    setBgmIndex(idx = 0) {
        this.bgmIndex = idx;
    }

    playSound(name, loop = false) {
        try {
            if (this.ready) {
                Sound.sound.volume(name, this.volume);
                Sound.sound.play(name, {
                    loop: loop,
                });
            } else {
                if (name === 'bgm') {
                    this.isRequestingBGM = true;
                }
            }
        } catch (e) {
            console.error('Audio output error');
        }
    }

    stopSound(name) {
        if (this.ready) {
            Sound.sound.stop(name);
        }
    }

    startBgm() {
        this.playSound('bgm', true);
    }

    stopBgm() {
        this.stopSound('bgm');
        this.isRequestingBGM = false;
    }

    playSfx(name) {
        this.playSound(name);
    }

    playGameOverSound() {
        this.playSound('gameover');
    }

    playLoseSound() {
        this.playSound('lose');
    }

    playWinSound() {
        this.playSound('cashout');
    }

    playBetSound() {
        this.playSound('placebet');
    }
}