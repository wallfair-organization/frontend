import React from 'react';
import winSound from '../../data/audio/win.mp3';
import explodeSound from '../../data/audio/crash.wav';
import failSound from '../../data/audio/fail.mp3';

function AudioContent() {
  return (
    <>
      <audio id="audio-win" preload="auto">
        <source src={winSound} type="audio/mpeg" />
      </audio>
      <audio id="audio-explode" preload="auto">
        <source src={explodeSound} type="audio/wav" />
      </audio>
      <audio id="audio-fail" preload="auto">
        <source src={failSound} type="audio/mpeg" />
      </audio>
    </>
  );
}

export default AudioContent;
