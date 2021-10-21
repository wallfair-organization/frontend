import { useState, useEffect } from 'react';

const validate = (errorSetter, validators, newValue) => {
  errorSetter(
    validators
      .map(fn => fn(newValue))
      .filter(Boolean)
      .reduce((acc, v) => ({ ...acc, ...v }), {})
  );
};

/**
 * @param {any} initialValue
 * @param {[(value: any) => ({[key: string]: boolean} | null)]} validators
 * @returns { [any, (newValue: any) => {}, {[key: string]: boolean} ]
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
