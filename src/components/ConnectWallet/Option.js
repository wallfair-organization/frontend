import styles from './styles.module.scss';
import classNames from 'classnames';
import ChevronRight from '../../data/icons/arrow-right-gray.svg';

export default function Option({
  link = null,
  clickable = true,
  size,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  active = false,
  id,
}) {
  return (
    <div
      className={classNames(styles.optionWrap, styles[header.replace(' ', '')])}
      id={id}
      onClick={onClick}
      clickable={clickable && !active}
      active={active}
    >
      <div className={styles.optionMain}>
        {icon && <img src={icon} alt={header} />}
        <span>{header}</span>
      </div>
      <img src={ChevronRight} alt={header} className={styles.chevronRight} />
    </div>
  );
}
