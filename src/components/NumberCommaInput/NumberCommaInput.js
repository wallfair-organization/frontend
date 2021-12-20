import React, { useEffect, useRef, useState } from 'react';

const NumberCommaInput = ({ value, onChange, min, max, withoutDecimals = false, ...rest }) => {
  const [valueInternal, setValueInternal] = useState(0);
  const oldValue = useRef();

  useEffect(() => {
    setValueInternal(value);
  }, [value]);

  const onChangeInternal = event => {
    const string = event.target.value;

    let stringNumber = string;
    if(withoutDecimals) stringNumber = string.replace(/[,.]/, ''); // do not allow dot or comma when we do not want decimals
    else stringNumber = string.replace(/,/, '.'); // replace comma with dot

    if (stringNumber[0] === '-') stringNumber = ''; // do not start with minus
    if (stringNumber[0] === '.') stringNumber = ''; // do not start with dot
    if (stringNumber[0] === '-' && stringNumber[1] === '.' && stringNumber.length === 2)
      // do not has minus and then dot
      stringNumber = string[0];
    if (
      stringNumber[stringNumber.length - 1] === '-' &&
      stringNumber.length > 1
    )
      stringNumber = stringNumber.substr(0, stringNumber.length - 1); // do not have minus after number

    stringNumber = stringNumber.replace(/[^\d.-]/g, ''); // keep only numbers
    const noDots = (stringNumber.match(/\./g) || []).length;
    const noMinus = (stringNumber.match(/-/g) || []).length;

    // check if multiple dots are entered
    if (noDots > 1 || noMinus > 1) stringNumber = oldValue.current;

    if (min && Number(stringNumber) < min && stringNumber !== '-') stringNumber = min;
    if (max && Number(stringNumber) >= max && stringNumber !== '-') stringNumber = max;
    oldValue.current = stringNumber;

    setValueInternal(stringNumber);
    onChange(stringNumber === '-' ? stringNumber : Number(stringNumber));
  };

  return (
    <input
      value={valueInternal}
      onChange={onChangeInternal}
      {...rest}
      type="text"
    />
  );
};

export default NumberCommaInput;
