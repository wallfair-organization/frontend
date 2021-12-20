import React from 'react';
import style from './styles.module.scss';
import _ from 'lodash';
import classNames from 'classnames';

const Input = ({
  className,
  disabled = false,
  onSubmit = _.noop,
  reference,
  min,
  max,
  ...props
}) => {
  const checkOnKeyPress = event => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  }
  return (
    <input
      className={classNames(style.input, className)}
      disabled={disabled}
      onKeyPress={checkOnKeyPress}
      ref={reference}
      {...props}
    />
  )
}

export default Input;
