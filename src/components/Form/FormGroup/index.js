import classNames from 'classnames';
import styles from './styles.module.scss';

const FormGroup = ({ children, className }) => {
  return (
    <div className={classNames(styles.formGroup, className)}>{children}</div>
  );
};

export default FormGroup;
