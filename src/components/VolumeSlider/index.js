import styles from './styles.module.scss';

import React from 'react';
import { Slider, useMediaQuery } from '@material-ui/core';

function VolumeSlider({ level = 0.5, handleChange = () => {}, color = '#7166c7' }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Slider
      className={styles.slider}
      aria-label="Volume"
      value={level * 100}
      onChange={handleChange}
      orientation={isMobile ? 'vertical' : 'horizontal'}
      min={0}
      max={100}
      style={{color: color}}
      sx={{
        color,
        width: 100,
      }}
    />
  );
}

export default VolumeSlider;
