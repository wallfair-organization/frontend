import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import styles from './styles.module.scss';

function DateTimePicker({ value, onChange, ...props }) {
  return (
    <Datetime
      value={value}
      onChange={onChange}
      className={styles.datePicker}
      dateFormat="DD.MM.YYYY"
      timeFormat="HH:mm"
      closeOnSelect
      closeOnClickOutside
      {...props}
    />
  );
}

export default DateTimePicker;
