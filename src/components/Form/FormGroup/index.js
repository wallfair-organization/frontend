import classNames from 'classnames';
import styles from './styles.module.scss';

const FormGroup = (props) => {
  const {
    children, className, rootRef = null
  } = props;
  return (
    <div {...props} className={classNames(styles.formGroup, className)} ref={rootRef}>{children}</div>
  );
};

export default FormGroup;
