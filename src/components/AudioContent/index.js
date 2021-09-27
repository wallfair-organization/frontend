import React from 'react';
import winSound from '../../data/audio/win.mp3';

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
