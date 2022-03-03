import React, { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import {ReactComponent as DiscordIcon} from 'data/icons/discord.svg';
// import {ReactComponent as CloseIcon} from 'data/icons/close.svg';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';

const DiscordWidget = ({authentication}) => {


  
  return (
    <div className={styles.eventShareContainer}>
      <div className={styles.leftContainer}>
        <DiscordIcon />
        <span>Join our community on <span className={styles.yellow}>Discord</span>! Exclusive offers and prizes, event discussions and much more.</span>
      </div>
      <div className={styles.rightContainer}>
      
      <a href="https://discord.gg/VjYUYBKhTc" target="_blank" rel="noreferrer">
        <Button
          theme={ButtonTheme.primaryButtonS}
        >
          Join now!
        </Button>
      </a>
        
      </div>
    </div>
  );
};

export default DiscordWidget;
