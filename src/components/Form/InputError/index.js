import styles from './styles.module.scss';

const ERROR_MESSAGES = {
  invalidUrl: 'Invalid URL.',
  required: 'Value required.',
  minLength: '{1} {2} at least.',
  hasEmptyMembers: 'All {1} require a value.',
};

const InputError = ({ errors, placeholderValues }) => {
  const getErrorMessage = errorName => {
    const messageValues = placeholderValues?.[errorName] || [];
    return messageValues.reduce(
      (msg, value, i) => msg.split(`{${i + 1}}`).join(value),
      ERROR_MESSAGES[errorName] || 'Input Error'
    );
  };

  return (
    <div className={styles.errors}>
      {Object.keys(errors).map((errorName, index) => (
        <span key={index}>
          &times;&nbsp;
          {getErrorMessage(errorName)}
        </span>
      ))}
    </div>
  );
};

export default InputError;
