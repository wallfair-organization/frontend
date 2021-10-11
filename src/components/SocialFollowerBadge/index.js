import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const SocialFollowerBadge = ({ className, followers }) => {
  return (
    <span className={classNames(className, styles.followerBadge)}>
      {followers.toLocaleString()}
    </span>
  );
};

export default SocialFollowerBadge;
