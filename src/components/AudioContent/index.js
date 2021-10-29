import React from 'react';
import winSound from '../../data/audio/sfx_cashout3.mp3';

function AudioContent() {
  return (
    <>
      <audio id="audio-win" preload="auto">
        <source src={winSound} type="audio/mpeg" />
      </audio>
    </>
  );
}

export default AudioContent;
