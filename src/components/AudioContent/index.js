import React from 'react';
import winSound from '../../data/audio/sfx_cashout3.mp3';
import explodeSound from '../../data/audio/crash.wav';
import failSound from '../../data/audio/fail.mp3';
import gameover from '../../data/audio/sfx_gameover.mp3';
import flyingSound from '../../data/audio/flying.mp3';
import bgm from '../../data/audio/elon_bgm.mp3';
import lose from '../../data/audio/sfx_lose.mp3';
import bet from '../../data/audio/sfx_placebet.mp3';

function AudioContent() {
  return (
    <>
      <audio id="audio-flying" preload="auto" loop>
        <source src={flyingSound} type="audio/wav" />
      </audio>
      <audio id="audio-bgm" preload="auto" loop>
        <source src={bgm} type="audio/wav" />
      </audio>
      <audio id="audio-win" preload="auto">
        <source src={winSound} type="audio/mpeg" />
      </audio>
      <audio id="audio-explode" preload="auto">
        <source src={explodeSound} type="audio/wav" />
      </audio>
      <audio id="audio-fail" preload="auto">
        <source src={failSound} type="audio/mpeg" />
      </audio>
      <audio id="audio-gameover" preload="auto">
        <source src={gameover} type="audio/mpeg" />
      </audio>
      <audio id="audio-lose" preload="auto">
        <source src={lose} type="audio/mpeg" />
      </audio>
      <audio id="audio-bet" preload="auto">
        <source src={bet} type="audio/mpeg" />
      </audio>
    </>
  );
}

export default AudioContent;
