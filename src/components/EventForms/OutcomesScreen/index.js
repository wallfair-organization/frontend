import {
  FormGroup,
} from '../../Form';
import styles from '../styles.module.scss';
import { isValid } from '../../Form/utils/validators';
import classNames from 'classnames';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import Outcomes from 'components/Form/Outcomes';
import { useState } from 'react';
import Icon from 'components/Icon';
import IconTheme from 'components/Icon/IconTheme';
import IconType from 'components/Icon/IconType';

const OutcomesScreen = ({
  outcomesData = null,
  proceedOutcomes,
  isNew,
  goStepBack,
}) => {
  const [outcomes, setOutcomes] = useState(outcomesData || []);
  const [areOutcomesValid, setAreOutcomesValid] = useState(false);

  const fgClasses = (err, ...args) =>
    classNames(
      styles.inputContainer,
      !isValid(err) && styles.inputContainerError,
      ...args
    );

  const handleForm = () => {
    const valid = areOutcomesValid;

    if (valid) {
      proceedOutcomes({
        outcomes: outcomes.map(({ name, probability }, index) => ({
          name,
          index,
          probability
        })),
      });
    }
  };

  return (
    <>
      <Icon
        className={styles.backIcon}
        iconTheme={IconTheme.primary}
        iconType={IconType.arrowLeft}
        onClick={goStepBack}
      />
      <h2 className={styles.formHeader}>Bet Settings</h2>
      <FormGroup className={fgClasses({}, styles.fullWidthContainer)}>
        <Outcomes
          value={outcomes}
          onChange={setOutcomes}
          setIsValid={setAreOutcomesValid}
          betEdit={!isNew}
        />
      </FormGroup>

      <Button
        className={classNames(styles.button, styles.confirmButton)}
        highlightType={HighlightType.highlightModalButton2}
        withoutBackground={true}
        disabledWithOverlay={false}
        onClick={handleForm}
      >
        Save
      </Button>
    </>
  );
};

export default OutcomesScreen;
