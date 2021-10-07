import moment from 'moment';
import { useState, Dispatch, useEffect } from 'react';

export const Validators = {
  required: val =>
    !!val && val !== null && val !== '' ? null : { required: true },
  minLength: length => val =>
    val?.length >= length ? null : { minLength: true },
  isUrl: val =>
    !!val &&
    (val.startsWith('http://') || val.startsWith('https://')) &&
    val.split('/').at(-1) !== '' &&
    val.includes('.')
      ? null
      : { invalidUrl: true },
  requiredTags: val =>
    val.some(({ name }) => name === '') ? { hasEmptyMembers: true } : null,
  dateAfter: date => value =>
    !!value && moment(value).isBefore(date) ? { dateBeforeLimit: true } : null,
};

export const isValid = errors => Object.keys(errors).length === 0;

export const hasError = (errorKey, errors) => !!errors[errorKey];

const validate = (errorSetter, validators, newValue) => {
  errorSetter(
    validators
      .map(fn => fn(newValue))
      .filter(Boolean)
      .reduce((acc, v) => ({ ...acc, ...v }), {})
  );
};

/**
 * @param {T} initialValue
 * @param {[() => ({[key: string]: boolean} | null)]} validators
 * @returns { [T, Dispatch<T>, {[key: string]: boolean} ]
 */
export const useValidatedState = (initialValue, validators = []) => {
  const [value, setValue] = useState(initialValue || '');
  const [errors, setErrors] = useState({});
  useEffect(() => {
    validate(setErrors, validators, value);
  }, []);
  const setter = newValue => {
    // handle callback for previous state to prevent callbacks leaking into validators
    const validatee =
      typeof newValue === 'function' ? newValue(value) : newValue;
    validate(setErrors, validators, validatee);
    setValue(newValue);
  };
  return [value, setter, errors];
};
