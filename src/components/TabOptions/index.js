import PropTypes from 'prop-types';
import classNames from 'classnames';
import { matchPath } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import React from 'react';

const TabOptions = ({ options, children, className = '' }) => {
  return (
    <div className={classNames(styles.tabOptionsContainer, className)}>
      {options.map(option => (
        <div
          key={option.name}
          className={classNames(
            styles.tab,
            { [styles.tabBackgroundActive]: option.isActive },
            {
              [styles.tabActive]: option.isActive,
            }
          )}
        >
          {children(option)}
        </div>
      ))}
    </div>
  );
};

TabOptions.propTypes = {
  children: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default TabOptions;
