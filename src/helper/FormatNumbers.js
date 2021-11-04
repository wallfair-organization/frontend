import _ from 'lodash';

export const formatToFixed = (
  amount,
  minimumFractionDigits = 2,
  isText = false
) => {
  const newAmount = _.toNumber(amount).toFixed(minimumFractionDigits);

  if (isText) {
    return newAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return newAmount;
};

export const toNumericString = number => {
  return number == null || Number.isNaN(number) === true
    ? ''
    : Number(number).toLocaleString('en-US');
};

export const roundToTwo = num => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

export const getReadableAmount = amount => {
  const one = 10000;
  return roundToTwo(+amount / one);
};
