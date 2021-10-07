import React from 'react';

import styles from './styles.module.scss';
import classNames from 'classnames';

const YellowButton = props => {
  const { children, style, className } = props;

  return (
    <button className={classNames(styles.button, className)} style={style}>
      {children}
    </button>
  );
};

export default YellowButton;
