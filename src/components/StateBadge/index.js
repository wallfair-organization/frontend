import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import styles from './styles.module.scss';

const StateBadge = ({
  state,
  withoutBackground = false,
  withoutText = false,
  className,
}) => {
  const getStateText = () => {
    return _.startCase(state);
  };

  return (
    <span
      className={classNames(
        styles.stateBadge,
        styles[state],
        withoutBackground ? styles.withoutBackground : null,
        className
      )}
    >
      <span></span>
      {!withoutText && getStateText()}
    </span>
  );
};

export default StateBadge;
