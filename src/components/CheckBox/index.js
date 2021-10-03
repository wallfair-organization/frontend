import React from 'react';
import styles from './styles.module.scss';
import ErrorHint from '../ErrorHint';
import classNames from 'classnames';

const CheckBox = ({
  className,
  checked,
  setChecked,
  text,
  errorText,
  clickable = true,
}) => {
  const onClick = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div
        className={classNames(
          styles.checkboxContainer,
          clickable ? styles.clickable : null,
          className
        )}
        onClick={clickable ? onClick : null}
      >
        <input
          className={styles.checkbox}
          type={'checkbox'}
          checked={checked}
          onChange={() => onClick()}
        />
        {text}
      </div>
      <ErrorHint errorText={errorText} />
    </>
  );
};

export default CheckBox;
