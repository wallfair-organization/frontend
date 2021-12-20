import styles from './styles.module.scss';

export default function Option ({
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
      className={styles.optionWrap}
      id={id}
      onClick={onClick}
      clickable={clickable && !active}
      active={active}
    >
      {icon && <img src={icon} alt={header} />}
      <span>{header}</span>
    </div>
  );
}
