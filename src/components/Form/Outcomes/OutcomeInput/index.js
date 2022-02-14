import { useEffect } from 'react';
import Input from '../../Input';
import { useValidatedState } from '../../hooks/useValidatedState';
import { Validators, isValid } from '../../utils/validators';
import styles from '../styles.module.scss';
import { InputError } from '../../';

const OutcomeInput = ({ outcome, onChange, setIsValid, betEdit }) => {
  const [name, setName, nameErrors] = useValidatedState(outcome.name, [
    Validators.required,
  ]);

  const probabilityValidators = betEdit
    ? []
    : [
        Validators.required,
        Validators.numberLimit(0, 'floor'),
        Validators.numberLimit(1, 'ceiling'),
      ];

  const [probability, setProbability, probabilityErrors] = useValidatedState(
    outcome.probability,
    probabilityValidators
  );

  useEffect(() => {
    if (outcome.name !== name) {
      setName(outcome.name);
    }
    if (outcome.probability !== probability) {
      setProbability(outcome.probability);
    }
  });

  setIsValid(isValid(nameErrors) && isValid(probabilityErrors));

  const update = key => value => {
    onChange({ id: outcome.id, name, probability, [key]: value });

    const setter = {
      name: setName,
      probability: setProbability,
    }[key];

    setter(value);
  };

  useEffect(() => {
    setName(outcome.name);
    setProbability(outcome.probability);
  }, [outcome]);

  const getId = suffix => `outcome_${outcome.id}_${suffix}`;

  return (
    <div className={styles.outcomeForm}>
      <label htmlFor={getId('name')}>Name</label>
      <Input id={getId('name')} value={name} onChange={update('name')} />
      <InputError errors={nameErrors} />
      {!betEdit && (
        <>
          <label htmlFor={getId('probability')}>Probability</label>
          <Input
            id={getId('probability')}
            value={probability}
            onChange={update('probability')}
            maxlength={4}
          />
          <InputError
            errors={probabilityErrors}
            placeholderValues={{ tooHigh: [1], tooLow: [0] }}
            errorMessages={{
              invalidNumber: 'Must be a valid decimal between 0 and 1.',
            }}
          />
        </>
      )}
    </div>
  );
};

export default OutcomeInput;
