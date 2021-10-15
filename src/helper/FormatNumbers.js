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
