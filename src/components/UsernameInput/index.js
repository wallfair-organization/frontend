import styles from './styles.module.scss';
import InputBox from '../InputBox';
import { useEffect, useState } from "react";
import { checkUsername, updateUser } from '../../api';
import Button from "../Button";
import ButtonTheme from "../Button/ButtonTheme";
import Routes from "../../constants/Routes";
import _ from 'lodash';
import { faker } from '@faker-js/faker';

const UsernameInput = ({ onSubmit, buttonText, updateUsername }) => {
  const [username, setUsername] = useState(faker.internet.userName());
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const len = username.length;
    if (len < 3 || len > 25) {
      setErrorMessage('Username length should be from 3 to 25 characters long');
    } else {
      setErrorMessage('');
    }
    updateUsername(username);
  }, [username, updateUsername]);

  const getSuggestion = () => {
    setUsername(faker.internet.userName());
  };

  const onConfirm = async () => {
    //check unique username
    let response;
    try {
      response = await checkUsername(username);
    } catch (err) {
      console.error('checkUsername err', err);
    }

    const isUnique = _.get(response, 'data.isUnique', false);

    if (isUnique) {
      setErrorMessage('');
      onSubmit();
    } else {
      setErrorMessage(
        <div>
          Username <b>"{username}"</b> already exists. Please use another name.
        </div>
      );
    }
  };

  return (
    <>
      <h2 className={styles.title}>How should we call you?</h2>
      <div className={styles.container}>
        <div className={styles.description}>
          Enter your username or{' '}
          <span onClick={getSuggestion} className={styles.randomizeButton}>
            randomize
          </span>{' '}
          it.
        </div>
        <InputBox
          className={styles.inputBox}
          placeholder="Your Username..."
          value={username}
          setValue={setUsername}
          onConfirm={onConfirm}
        />
        {!_.isEmpty(errorMessage) && (
          <div className={styles.errorHandLing}>{errorMessage}</div>
        )}
        <div className={styles.buttons}>
          <Button
            onClick={onConfirm}
            withoutBackground={true}
            className={styles.button}
            disabledWithOverlay={false}
            disabled={!!errorMessage}
            theme={ButtonTheme.primaryButtonXL}
          >
            {buttonText || 'Submit'}
          </Button>
        </div>
        <span className={styles.terms}>
          By continuing I accept the{' '}
          <a href={Routes.terms} target="_blank" rel="noreferrer">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a href={Routes.privacy} target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
          . Also I confirm that I am over 18 years old.
        </span>
      </div>
    </>
  );
};

export default UsernameInput;
