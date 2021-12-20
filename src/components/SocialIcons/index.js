import React from 'react';
import SocialFollowerBadge from '../SocialFollowerBadge';
import styles from './styles.module.scss';
import { ReactComponent as TelegramIcon } from '../../data/icons/telegram.svg';
import { ReactComponent as InstagramIcon } from '../../data/icons/instagram.svg';
import { ReactComponent as TwitterIcon } from '../../data/icons/twitter.svg';
import DiscordIcon from '../../data/icons/discord.png';
import classNames from 'classnames';

const SocialIcons = ({ className, dataTrackingIds }) => {
  return (
    <div className={classNames(className, styles.iconsWrapper)}>
      <a
        href="https://t.me/wallfairtesters"
        target="_blank"
        rel="noreferrer"
        data-tracking-id={dataTrackingIds.telegram}
      >
        <div className={styles.iconWrapper}>
          {/* <SocialFollowerBadge className={styles.badge} followers="90K" /> */}
          <TelegramIcon />
        </div>
      </a>

      <a
        href="https://discord.gg/pkvNwhD9"
        target="_blank"
        rel="noreferrer"
        data-tracking-id={dataTrackingIds.instagram}
      >
        <div className={styles.iconWrapper}>
          {/* <SocialFollowerBadge className={styles.badge} followers="1,6K" /> */}
          <img src={DiscordIcon} alt="" />
        </div>
      </a>
    </div>
  );
};

export default SocialIcons;
