import React, { useEffect, useRef, useState } from 'react'

const NumberCommaInput = ({ value, onChange, min, max, ...rest }) => {
  const [valueInternal, setValueInternal] = useState();
  const oldValue = useRef();

  useEffect(() => {
    setValueInternal(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeInternal = event => {
    const string = event.target.value;
    let stringNumber = string.replace(/,/, '.'); // replace comma with dot

    if (stringNumber[0] === '.') stringNumber = '';
    if (stringNumber[0] === '-' && stringNumber[1] === '.')
      stringNumber = string[0];

    stringNumber = stringNumber.replace(/[^\d.-]/g, ''); // keep only numbers

    const noDots = (stringNumber.match(/\./g) || []).length;
    const noMinus = (stringNumber.match(/-/g) || []).length;

    // check if multiple dots are entered
    if (noDots > 1 || noMinus > 1) stringNumber = oldValue.current;

    if(Number(stringNumber) <= min) stringNumber = min;
    if (Number(stringNumber) >= max) stringNumber = max;
    oldValue.current = stringNumber;

    setValueInternal(stringNumber);
    onChange(Number(stringNumber))
  };

  return (
    <input
      value={valueInternal || ''}
      onChange={onChangeInternal}
      type="text"
      {...rest}
    />
  );
};

NumberCommaInput.propTypes = {

}

export default NumberCommaInput
