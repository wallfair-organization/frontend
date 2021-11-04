import styles from './styles.module.scss';
import Input from '../Input';
import classNames from 'classnames';
import _ from 'lodash';
import ErrorHint from '../ErrorHint';

const BirthdayField = ({
  value,
  setValue,
  maxValue,
  minValue,
  decimalPlaces,
  errorText,
  className,
  validate,
  ...props
}) => {
  const onChange = event => {
    const value = _.get(event, 'target.value', 0);
    const regex = new RegExp('^0+(?!$)', 'g');
    let targetValue = _.toNumber(value.replaceAll(regex, ''));

    // make sure value is not above maxValue (if given)
    if (maxValue && targetValue > maxValue) {
      targetValue = maxValue;
    }

    event.target.value = targetValue;

    setValue(targetValue);
  };

  return (
    <>
      <div className={classNames(styles.inputContainer, className)}>
        <Input
          className={styles.input}
          type={'number'}
          value={value}
          onChange={onChange}
          step={0.1}
          {...props}
        />
      </div>
      <ErrorHint
        className={styles.tokenNumberErrorHint}
        errorText={errorText}
      />
    </>
  );
};

export default BirthdayField;
