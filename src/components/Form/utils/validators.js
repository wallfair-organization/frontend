import moment from 'moment';

export const isValid = errors =>
  Object.keys(errors).filter(key => errors[key]).length === 0;

export const hasError = (errorKey, errors) => !!errors[errorKey];

const utils = {
  isNumber: val => !isNaN(+val) && val !== null && val !== '',
};

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

  /**
   * Configurable validator for limiting number input to a certain point
   *
   * @param { number } limit
   * @param { 'ceiling' | 'floor' } direction
   * @param { boolean } inclusive
   * @returns { (val: string | number) => { ['tooHigh' | 'tooLow' | 'invalidNumber']: boolean } | null}
   */
  numberLimit: (limit, direction = 'ceiling', inclusive = false) => {
    const config = {
      ceiling: {
        isWithinLimit: val => val < limit || (inclusive && val === limit),
        errorKey: 'tooHigh',
      },
      floor: {
        isWithinLimit: val => val > limit || (inclusive && val === limit),
        errorKey: 'tooLow',
      },
    };

    const { isWithinLimit, errorKey } = config[direction];

    return value => {
      if (!utils.isNumber(value)) {
        return { invalidNumber: true };
      }
      return isWithinLimit(+value) ? null : { [errorKey]: true };
    };
  },

  integer: value => {
    if (!utils.isNumber(value)) {
      return { invalidNumber: true };
    }
    if (+value !== Math.round(+value)) {
      return { notInteger: true };
    }
    return null;
  },
};
