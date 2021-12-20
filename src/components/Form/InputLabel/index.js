import classNames from 'classnames';
import styles from './styles.module.scss';

const InputLabel = ({ className, children }) => {
  return <div className={classNames(className, styles.label)}>{children}</div>;
};

export default InputLabel;
