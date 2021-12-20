import { isMobileRosiGame } from "components/RosiGameAnimation/canvas/utils";

// const deviceType = isMobileRosiGame ? 'mobile' : 'desktop';
// const resolution = deviceType === 'mobile' ? 2 : 1;

const assetVersion = "3";

const constructPath = asset =>
    `/images/pump-dump-game/${isMobileRosiGame ? '@2x':'@1x'}/${asset}?v=${assetVersion}`;

// const constructPath = asset =>
//     `/images/pump-dump-game/source/${asset}`;

export const ASSET_LIST = {
    TWEET_1: constructPath('small-tweets-1.png'),
    TWEET_2: constructPath('small-tweets-2.png'),
    TWEET_3: constructPath('small-tweets-3.png'),
    TWEET_4: constructPath('small-tweets-4.png'),
    TWEET_5: constructPath('small-tweets-5.png'),
    TWEET_6: constructPath('small-tweets-6.png'),
    TWEET_7: constructPath('small-tweets-7.png'),
    TWEET_8: constructPath('small-tweets-8.png'),
    CRASH_1: constructPath('crash-1.png'),
    CRASH_2: constructPath('crash-2.png'),
    CRASH_3: constructPath('crash-3.png'),
    CRASH_4: constructPath('crash-4.png'),
    CRASH_5: constructPath('crash-5.png'),
    CRASH_6: constructPath('crash-6.png'),
    MEME_1: constructPath('meme-1.png'),
    MEME_2: constructPath('meme-2.png'),
    MEME_3: constructPath('meme-3.png'),
    MEME_4: constructPath('meme-4.png'),
    MEME_5: constructPath('meme-5.png'),
    MEME_6: constructPath('meme-6.png'),
    MEME_7: constructPath('meme-7.png'),
    MEME_8: constructPath('meme-8.png'),
    MEME_9: constructPath('meme-9.png'),
    MEME_10: constructPath('meme-10.png'),
    MEME_11: constructPath('meme-11.png'),
    MEME_12: constructPath('meme-12.png'),
    MEME_13: constructPath('meme-13.png'),
    MEME_14: constructPath('meme-14.png'),
    MEME_15: constructPath('meme-15.png'),
    MEME_16: constructPath('meme-16.png'),
    MEME_17: constructPath('meme-17.png'),
    MEME_18: constructPath('meme-18.png'),
    MEME_19: constructPath('meme-19.png'),
    MEME_20: constructPath('meme-20.png'),
    MEME_21: constructPath('meme-21.png'),
    MEME_22: constructPath('meme-22.png'),
}

export const AUDIO_LIST = {
    bgm: {
        url: '/sounds/pump-dump/bg_music_1.mp3',
        loop: true,
    },
    bar: {
        url: '/sounds/pump-dump/bar_sfx.mp3',
        loop: false,
    },
    gameover: {
        url: '/sounds/elon/sfx_gameover.mp3',
        loop: false,
    },
    lose: {
        url: '/sounds/elon/sfx_lose.mp3',
        loop: false,
    },
    cashout: {
        url: '/sounds/elon/sfx_cashout3.mp3',
        loop: false,
    },
    placebet: {
        url: '/sounds/elon/sfx_placebet.mp3',
        loop: false,
    },
}