import styles from './styles.module.scss';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import classNames from 'classnames';
import ButtonSmallTheme from './ButtonSmallTheme';

const ButtonSmall = ({
  text,
  butonTheme = ButtonSmallTheme.grey,
  iconLeft = false,
  iconType,
  onClick,
  classNameExtended,
  disabled,
}) => {
  const themeStyles = {
    [ButtonSmallTheme.dark]: {
      style: styles.dark,
      iconTheme: IconTheme.white,
      icon: {
        width: 8,
        height: 4,
      },
    },
    [ButtonSmallTheme.red]: {
      style: styles.red,
    },
    [ButtonSmallTheme.grey]: {
      style: styles.grey,
      iconTheme: IconTheme.black,
      icon: {
        width: 12,
        height: 12,
        style: styles.greyIcon,
      },
    },
  };

  return (
    <button
      className={classNames(
        classNameExtended || null,
        styles.buttonSmall,
        themeStyles[butonTheme]?.style,
        disabled ? styles.disabled : null
      )}
      onClick={disabled ? null : onClick}
      disabled={disabled}
    >
      {!iconLeft && text}
      {iconType && (
        <Icon
          iconType={iconType}
          iconTheme={themeStyles[butonTheme]?.iconTheme}
          width={themeStyles[butonTheme]?.icon.width}
          height={themeStyles[butonTheme]?.icon.height}
          className={themeStyles[butonTheme]?.icon.style}
        />
      )}
      {iconLeft && text}
    </button>
  );
};

export default ButtonSmall;
