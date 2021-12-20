import React from 'react';
import styles from './styles.module.scss';
import VolumeSlider from '../VolumeSlider';
import classNames from 'classnames';

function GameAudioControls({ audio, muteButtonClick }) {
  const onChangeVolume = (event, value) => {
    audio.setVolume((value / 100).toFixed(1));
  }
  return (
    <div className={styles.container}>
      <VolumeSlider level={audio.volume} handleChange={onChangeVolume} />
      <div
        className={classNames({
          [styles.muteButton]: true,
          [styles.mute]: !(audio?.volume > 0),
          [styles.low]: audio.volume < 0.5 && audio.volume > 0,
        })}
        onClick={() => {
          muteButtonClick();
          audio.volume === 0 ? audio.setVolume(1) : audio.mute();
        }}
      />
    </div>
  );
}

export default GameAudioControls;
