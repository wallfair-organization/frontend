import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import styles from './styles.module.scss';
import classNames from 'classnames';

function DateTimePicker({ value, onChange, className, ...props }) {
  return (
    <Datetime
      value={value}
      onChange={onChange}
      className={classNames(styles.datePicker, className || null)}
      dateFormat="DD.MM.YYYY"
      timeFormat="HH:mm"
      closeOnSelect
      closeOnClickOutside
      {...props}
    />
  );
}

export default DateTimePicker;
