import ErrorHint from '../ErrorHint';
import React from 'react';
import ReactDropdown from 'react-dropdown';
import classNames from 'classnames';
import styles from './styles.module.scss';
import 'react-dropdown/style.css';

const Dropdown = ({
  options,
  value,
  errorText,
  setValue,
  placeholder,
  style,
  ...rest
}) => {
  const onChange = ({ value }) => {
    if (setValue) {
      setValue(value);
    }
  };

  return (
    <>
      <div className={styles.dropdownContainer}>
        <ReactDropdown
          className={classNames(styles.dropdown, style)}
          menuClassName={styles.dropdownMenu}
          controlClassName={styles.dropdownControl}
          placeholderClassName={styles.dropdownPlaceholder}
          arrowClassName={styles.dropdownArrow}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          options={options}
          {...rest}
        />
        <ErrorHint errorText={errorText} />
      </div>
    </>
  );
};

export default Dropdown;
