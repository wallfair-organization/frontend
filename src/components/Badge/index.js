import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Badge = ({ isLive = true }) => {
  return (
    <span
      className={classNames(styles.badge, {
        [styles.offline]: !isLive,
      })}
    >
      {isLive && <span></span>}
      {isLive ? 'Live' : 'Offline'}
    </span>
  );
};

export default Badge;
