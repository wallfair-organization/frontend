import classNames from 'classnames';
import styles from './styles.module.scss';

const Textarea = ({ value, onChange, placeholder, className }) => {
  return (
    <textarea
      className={classNames(styles.textarea, className)}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Textarea;
