import TokenSlider from '../TokenSlider';
import styles from './styles.module.scss';
import classNames from 'classnames';
import _ from 'lodash';
import ErrorHint from '../ErrorHint';
import NumberCommaInput from 'components/NumberCommaInput/NumberCommaInput';

const TokenNumberInput = ({
  value,
  setValue,
  maxValue,
  minValue,
  decimalPlaces,
  currency,
  errorText,
  className,
  dataTrackingIds,
  halfIcon = true,
  doubleIcon = true,
  maxIcon = true,
  ...props
}) => {
  const onChange = value => {
    // @TODO: this needs refactoring imo, a validation function, a base form component that this could based upon or render and may be even refactor the parent forms to a lib like react-final-form or similar
    let targetValue = value;

    // make sure value is not above maxValue (if given)
    if (maxValue && targetValue > _.toNumber(maxValue)) {
      targetValue = maxValue;
    }

    setValue(targetValue);
  };

  const onBetAmountChanged = multiplier => {
    const changedValue = _.floor(value * multiplier, 0);
    if (changedValue > maxValue) {
      setValue(_.floor(maxValue, 0));
    } else if (changedValue < 0) {
      setValue(0);
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
        <NumberCommaInput
          min={minValue}
          max={_.floor(maxValue, 0)}
          className={styles.input}
          value={value}
          onChange={onChange}
          withoutDecimals
          {...props}
        />
        <span className={styles.eventTokenLabel}>{currency}</span>
        <div className={styles.buttonWrapper}>
          {halfIcon && (
            <span
              className={styles.button}
              onClick={() => onBetAmountChanged(0.5)}
              data-tracking-id={dataTrackingIds?.inputFieldHalf}
            >
              ½
            </span>
          )}
          {doubleIcon && (
            <span
              className={styles.button}
              onClick={() => onBetAmountChanged(2)}
              data-tracking-id={dataTrackingIds?.inputFieldDouble}
            >
              2x
            </span>
          )}
          {maxIcon && (
            <span
              className={styles.button}
              onClick={() => onBetAmountMax()}
              data-tracking-id={dataTrackingIds?.inputFieldAllIn}
            >
              Max
            </span>
          )}
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
