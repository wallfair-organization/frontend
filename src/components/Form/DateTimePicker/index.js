import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import styles from './styles.module.scss';

function DateTimePicker({ value, onChange, ...props }) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDateTimePicker
        label="DateTimePicker"
        inputVariant="outlined"
        format="DD.MM.YYYY HH:mm"
        value={value}
        onChange={onChange}
        className={styles.datePicker}
        InputLabelProps={{ shrink: true, className: styles.inputLabel }}
        InputProps={{ className: styles.inputBase }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateTimePicker;
