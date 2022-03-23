import styles from './styles.module.scss';
import Input from '../Input';
import classNames from 'classnames';

const ClaimBonusInputField = ({ value, handleConfirm, handleChange, className }) => {
  return (
    <div className={classNames(styles.inputContainer, className)}>
      <Input
        onSubmit={() => handleConfirm(value)}
        className={styles.input}
        placeholder="Enter Bonus Code"
        onChange={event => handleChange(event.target.value)}
        value={value}
      />
    </div>
  );
}

export default ClaimBonusInputField;
