import ErrorHint from '../ErrorHint';
import React, { useEffect } from 'react';
import Select from 'react-select';
import styles from './styles.module.scss';
import 'react-dropdown/style.css';
import { COUNTRIES } from 'constants/Countries';
import { isMobile } from 'react-device-detect';

const DropdownComplex = ({
  options,
  value,
  errorText,
  setValue,
  placeholder,
  ...rest
}) => {
  const onChange = value => {
    if (setValue) setValue(value);
  };

  useEffect(() => {
    const defaultValue = COUNTRIES.filter(
      c => navigator.language.slice(-2) === c.value
    )[0];
    if (setValue) setValue(defaultValue);
  }, []);
  //  <select>{props.options.map(...)}</select>
  if (isMobile) {
    return (
      <select className={styles.mobileselect}>
        {options.map(option => (
          <option
            selected={option.value === value.value ? true : false}
            onClick={onChange}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  return (
    <>
      <div className={styles.dropdownContainer}>
        <Select
          menuPlacement="top"
          styles={customStyles}
          isSearchable
          isClearable
          classNamePrefix="react-select"
          onChange={onChange}
          defaultValue={
            COUNTRIES.filter(c => navigator.language.slice(-2) === c.value)[0]
          }
          placeholder={placeholder}
          options={options}
          {...rest}
        />
        <ErrorHint errorText={errorText} />
      </div>
    </>
  );
};

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#f1f2f6',
  }),
  control: base => ({
    ...base,
    border: '1px solid #ccc',
    borderRadius: 2,
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #ccc',
      borderRadius: 2,
      boxShadow: 'none',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: '#f1f2f6',
    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'black',
    '&:hover': {
      fontWeight: 'bold',
      backgroundColor: '#f1f2f6',
    },
  }),
};

export default DropdownComplex;
