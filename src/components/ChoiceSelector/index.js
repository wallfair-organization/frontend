import styles from './styles.module.scss';
import classNames from 'classnames';
import SelectionHelper from '../../helper/SelectionHelper';
import ChoiceSelectorTheme from './ChoiceSelectorTheme';
import _ from 'lodash';
import { formatToFixed } from '../../helper/FormatNumbers';

const ChoiceSelector = ({
  name,
  winAmount,
  gain,
  currency,
  selected,
  className,
  theme,
  disabled = false,
  hideAmount = false,
  onClick,
}) => {
  const renderWinAmount = () => {
    if (!hideAmount) {
      const roundedWinAmount = _.round(winAmount, 2);
      const winAmountString = roundedWinAmount
        ? formatToFixed(
            roundedWinAmount,
            4 - parseInt(roundedWinAmount, 10).toString().length > 0
              ? Math.min(
                  2,
                  4 - parseInt(roundedWinAmount, 10).toString().length
                )
              : 0
          )
        : '-';

      return (
        <div className={styles.choiceWinAmountContainer}>
          <div className={styles.choiceWinAmount}>{winAmountString}</div>
          <div className={styles.choiceWinAmountUnitContainer}>
            <div className={styles.choiceWinAmountUnit}>{currency}</div>
            <div className={styles.choiceWinAmountCash}>
              <span
                className={classNames(
                  styles.percentage,
                  gain.negative ? styles.negative : null
                )}
              >
                {gain.value}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={classNames(
        styles.choiceButton,
        selected ? styles.choiceButtonSelected : null,
        disabled ? styles.choiceButtonDisabled : null,
        SelectionHelper.get(theme, {
          [ChoiceSelectorTheme.colorOrangeLight]: styles.choiceColorOrangeLight,
          [ChoiceSelectorTheme.colorGreen]: styles.choiceColorGreen,
          [ChoiceSelectorTheme.colorPinkLight]: styles.choiceColorPinkLight,
          [ChoiceSelectorTheme.colorFlamingo]: styles.choiceColorFlamingo,
        }),
        className
      )}
      onClick={onClick}
    >
      <span className={styles.choiceName}>{name}</span>
      {renderWinAmount()}
    </div>
  );
};

export default ChoiceSelector;
