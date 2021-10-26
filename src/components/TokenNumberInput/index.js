import TokenSlider from '../TokenSlider';
import styles from './styles.module.scss';
import Input from '../Input';
import classNames from 'classnames';
import _ from 'lodash';
import ErrorHint from '../ErrorHint';

const TokenNumberInput = ({
  value,
  setValue,
  maxValue,
  minValue,
  decimalPlaces,
  currency,
  errorText,
  className,
  ...props
}) => {
  const onChange = event => {
    const value = _.get(event, 'target.value', 0);
    // @TODO: this needs refactoring imo, a validation function, a base form component that this could based upon or render and may be even refactor the parent forms to a lib like react-final-form or similar
    // remove leading zero(s) and cast to number
    const regex = new RegExp('^0+(?!$)', 'g');
    let targetValue = _.toNumber(value.replaceAll(regex, ''));

    // make sure value is not above maxValue (if given)
    if (maxValue && targetValue > _.toNumber(maxValue)) {
      targetValue = maxValue;
    }

    // if (decimalPlaces || decimalPlaces === 0) {
    // targetValue = _.floor(targetValue, decimalPlaces);
    // }

    // force no decimal
    targetValue = _.floor(targetValue, 0);

    // TODO: do we want to prevent the unlikely case somebody deliberately or accidentally puts an 'e' for an exponential number?!
    event.target.value = targetValue;

    setValue(targetValue);
  };

  const onBetAmountChanged = multiplier => {
    const changedValue = _.floor(value * multiplier, 0);
    if (changedValue > maxValue) {
      setValue(_.floor(maxValue, 0));
    } else if (changedValue < 1) {
      setValue(1);
    } else {
      setValue(changedValue);
    }
  };

  const onBetAmountMax = () => {
    setValue(_.floor(maxValue, 0));
  };

  return (
    <>
      <div className={classNames(styles.tokenNumberInputContainer, className)}>
        <Input
          className={styles.input}
          type={'number'}
          value={value}
          onChange={onChange}
          step={0.1}
          {...props}
        />
        <span className={styles.eventTokenLabel}>{currency}</span>
        <div className={styles.buttonWrapper}>
          <span
            className={styles.button}
            onClick={() => onBetAmountChanged(0.5)}
            data-tracking-id="nonstreamed-event-input-field-half"
          >
            ½
          </span>
          <span
            className={styles.button}
            onClick={() => onBetAmountChanged(2)}
            data-tracking-id="nonstreamed-event-input-field-double"
          >
            2x
          </span>
          <span
            className={styles.button}
            onClick={() => onBetAmountMax()}
            data-tracking-id="nonstreamed-event-input-field-allin"
          >
            Max
          </span>
        </div>
      </div>
      <ErrorHint
        className={styles.tokenNumberErrorHint}
        errorText={errorText}
      />
      {/* <TokenSlider
        value={Number(value)}
        setValue={setValue}
        maxValue={maxValue}
        minValue={minValue}
        decimalPlaces={decimalPlaces}
      /> */}
    </>
  );
};

export default TokenNumberInput;
