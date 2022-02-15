import Moment from 'moment';
import { DateTimePicker, FormGroup, InputLabel, InputError } from '../../Form';
import styles from '../styles.module.scss';
import { useValidatedState } from 'components/Form/hooks/useValidatedState';
import { Validators, isValid } from '../../Form/utils/validators';
import classNames from 'classnames';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import { useState } from 'react';
import Icon from 'components/Icon';
import IconTheme from 'components/Icon/IconTheme';
import IconType from 'components/Icon/IconType';

const BetScreen = ({ bet = null, proceedBet, isNew }) => {
  const [formValid, setFormValid] = useState(true);
  const [
    evidenceDescription,
    setEvidenceDescription,
    evidenceDescriptionErrors,
  ] = useValidatedState(bet?.evidence_description, [Validators.required]);
  const [evidenceSource, setEvidenceSource, evidenceSourceErrors] =
    useValidatedState(bet?.evidence_source, [Validators.required]);
  const [description, setDescription, descriptionErrors] = useValidatedState(
    bet?.description,
    [Validators.required]
  );
  const [startDate, setStartDate, startDateErrors] = useValidatedState(
    bet?.start_date || new Moment(),
    [Validators.required]
  );
  const [endDate, setEndDate, endDateErrors] = useValidatedState(
    bet?.end_date || new Moment().add(1, 'hour'),
    [Validators.required, Validators.dateAfter(new Moment())]
  );
  const [liquidity, setLiquidity, liquidityErrors] = useValidatedState(
    bet?.liquidity || 10000,
    [
      Validators.required,
      Validators.integer,
      Validators.numberLimit(0, 'floor'),
    ]
  );

  const fgClasses = (err, ...args) =>
    classNames(
      styles.inputContainer,
      !isValid(err) && styles.inputContainerError,
      ...args
    );

  const handleForm = () => {
    const valid =
      [
        evidenceDescriptionErrors,
        evidenceSourceErrors,
        descriptionErrors,
        startDateErrors,
        endDateErrors,
        liquidityErrors,
      ]
        .map(isValid)
        .filter(valid => !valid).length === 0;
    setFormValid(valid);

    if (valid) {
      proceedBet({
        evidence_description: evidenceDescription,
        evidence_source: evidenceSource,
        description,
        start_date: startDate,
        end_date: endDate,
        liquidity,
        slug: 'bet',
      });
    }
  };

  const saveAndBack = () => {
    proceedBet(
      {
        evidence_description: evidenceDescription,
        evidence_source: evidenceSource,
        description,
        start_date: startDate,
        end_date: endDate,
        liquidity,
        slug: 'bet',
      },
      true
    );
  }

  return (
    <>
      <Icon
        className={styles.backIcon}
        iconTheme={IconTheme.primary}
        iconType={IconType.arrowLeft}
        onClick={saveAndBack}
      />
      <h2 className={styles.formHeader}>Bet Settings</h2>

      <FormGroup className={fgClasses(descriptionErrors)}>
        <InputLabel className={styles.inputLabel}>Bet Description</InputLabel>
        <InputBox
          type="text"
          className={styles.inputBox}
          placeholder="This is bet about ..."
          value={description}
          setValue={e => {
            setDescription(e);
          }}
        />
        {!formValid && <InputError errors={descriptionErrors} />}
      </FormGroup>

      <FormGroup className={fgClasses(startDateErrors)}>
        <InputLabel>Start Date & Time</InputLabel>
        <DateTimePicker
          value={startDate}
          className={styles.datePickerInput}
          onChange={startDate => setStartDate(startDate)}
          ampm={false}
        />
        {!formValid && <InputError errors={startDateErrors} />}
      </FormGroup>

      <FormGroup className={fgClasses(endDateErrors)}>
        <InputLabel>End Date & Time</InputLabel>
        <DateTimePicker
          value={endDate}
          className={styles.datePickerInput}
          onChange={date => setEndDate(date)}
          ampm={false}
        />
        {!formValid && <InputError errors={endDateErrors} />}
      </FormGroup>

      <FormGroup className={fgClasses(evidenceSourceErrors)}>
        <InputLabel className={styles.inputLabel}>Evidence Source</InputLabel>
        <InputBox
          type="text"
          className={styles.inputBox}
          placeholder="Source of evidence"
          value={evidenceSource}
          setValue={e => {
            setEvidenceSource(e);
          }}
        />
        {!formValid && <InputError errors={evidenceSourceErrors} />}
      </FormGroup>

      <FormGroup className={fgClasses(evidenceDescriptionErrors)}>
        <InputLabel className={styles.inputLabel}>
          Evidence Description
        </InputLabel>
        <InputBox
          type="text"
          className={styles.inputBox}
          placeholder="Evidence description"
          value={evidenceDescription}
          setValue={e => {
            setEvidenceDescription(e);
          }}
        />
        {!formValid && <InputError errors={evidenceDescriptionErrors} />}
      </FormGroup>

      {isNew && (
        <FormGroup className={fgClasses(liquidityErrors)}>
          <InputLabel className={styles.inputLabel}>Liquidity</InputLabel>
          <InputBox
            type="number"
            className={styles.inputBox}
            placeholder="50000"
            value={liquidity}
            setValue={e => {
              setLiquidity(e.trim());
            }}
          />
          {!formValid && <InputError errors={liquidityErrors} />}
        </FormGroup>
      )}

      <Button
        className={classNames(styles.button, styles.confirmButton)}
        highlightType={HighlightType.highlightModalButton2}
        withoutBackground={true}
        disabledWithOverlay={false}
        onClick={handleForm}
      >
        Next
      </Button>
    </>
  );
};

export default BetScreen;
