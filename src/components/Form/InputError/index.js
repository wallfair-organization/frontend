import styles from './styles.module.scss';

const ERROR_MESSAGES = {
  invalidUrl: 'Invalid URL.',
  required: 'Value required.',
  minLength: 'Must be have at least {0} {1}.',
  hasEmptyMembers: 'All {0} require a value.',
  dateBeforeLimit: 'Datetime should be after "{0}"',
};

const InputError = ({ errors, placeholderValues }) => {
  const getErrorMessage = errorName => {
    const messageValues = placeholderValues?.[errorName] || [];
    return messageValues.reduce(
      (msg, value, i) => msg.split(`{${i}}`).join(value),
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
