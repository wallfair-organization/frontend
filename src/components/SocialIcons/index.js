import React from 'react';
import styles from './styles.module.scss';
import { ReactComponent as TelegramIcon } from '../../data/icons/telegram.svg';
import { ReactComponent as InstagramIcon } from '../../data/icons/instagram.svg';
import { ReactComponent as TwitterIcon } from '../../data/icons/twitter.svg';
import classNames from 'classnames';

const SocialIcons = ({ className }) => {
  return (
    <div className={classNames(className, styles.iconsWrapper)}>
      <a
        href="https://t.me/joinchat/gLi7w6CeHlpiNThi"
        target="_blank"
        rel="noreferrer"
      >
        <TelegramIcon />
      </a>

      <a
        href="https://instagram.com/wallfair.io"
        target="_blank"
        rel="noreferrer"
      >
        <InstagramIcon />
      </a>

      <a
        href="https://twitter.com/joinwallfair"
        target="_blank"
        rel="noreferrer"
      >
        <TwitterIcon />
      </a>
    </div>
  );
};

export default SocialIcons;
