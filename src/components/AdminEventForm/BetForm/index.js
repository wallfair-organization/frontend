import {
  DateTimePicker,
  FormGroup,
  InputLabel,
  Input,
  InputError,
} from 'components/Form';
import { useValidatedState } from 'components/Form/hooks/useValidatedState';
import { Validators, isValid } from 'components/Form/utils/validators';
import Outcomes from 'components/Form/Outcomes';
import Moment from 'moment';
import { useState } from 'react';

const BetForm = ({ setBetData, styles, fgClasses, setValidity }) => {
  const [marketQuestion, setMarketQuestion, marketQuestionErrors] =
    useValidatedState('', [Validators.required]);
  const [outcomes, setOutcomes] = useState([]);
  const [areOutcomesValid, setAreOutcomesValid] = useState(false);
  const [
    evidenceDescription,
    setEvidenceDescription,
    evidenceDescriptionErrors,
  ] = useValidatedState('', [Validators.required]);
  const [evidenceSource, setEvidenceSource, evidenceSourceErrors] =
    useValidatedState('', [Validators.required]);
  const [description, setDescription, descriptionErrors] = useValidatedState(
    '',
    [Validators.required]
  );
  const [endDate, setEndDate, endDateErrors] = useValidatedState(
    new Moment().add(1, 'hour'),
    [Validators.required, Validators.dateAfter(new Moment())]
  );
  const [liquidity, setLiquidity, liquidityErrors] = useValidatedState(50000, [
    Validators.required,
    Validators.integer,
    Validators.numberLimit(0, 'floor'),
  ]);

  const isFormValid =
    [
      marketQuestionErrors,
      evidenceDescriptionErrors,
      evidenceSourceErrors,
      descriptionErrors,
      endDateErrors,
    ]
      .map(isValid)
      .filter(valid => !valid).length === 0 && areOutcomesValid;

  setValidity(isFormValid);

  const betData = {
    marketQuestion,
    outcomes,
    evidenceDescription,
    evidenceSource,
    description,
    endDate,
    slug: 'bet',
    liquidity,
  };

  const setters = {
    marketQuestion: setMarketQuestion,
    outcomes: setOutcomes,
    evidenceDescription: setEvidenceDescription,
    endDate: setEndDate,
    evidenceSource: setEvidenceSource,
    description: setDescription,
    liquidity: setLiquidity,
  };

  const setFormValue = (key, value) => {
    betData[key] = value;
    setBetData({
      ...betData,
      outcomes: betData.outcomes.map(({ name, probability }, index) => ({
        name,
        index,
        probability,
      })),
    });
    setters[key](value);
  };

  /** @param {keyof betData} key */
  const updateValue = key => value => setFormValue(key, value);

  return (
    <div className={styles.betForm}>
      <h3>Bet Data</h3>
      <FormGroup
        className={fgClasses(marketQuestionErrors, styles.fullWidthContainer)}
      >
        <InputLabel>Market Question</InputLabel>
        <Input
          type="text"
          value={marketQuestion}
          onChange={updateValue('marketQuestion')}
        />
        <InputError errors={marketQuestionErrors} />
      </FormGroup>

      <FormGroup className={fgClasses({}, styles.fullWidthContainer)}>
        <InputLabel>Options</InputLabel>
        <Outcomes
          onChange={updateValue('outcomes')}
          setIsValid={setAreOutcomesValid}
        />
      </FormGroup>
      <FormGroup className={fgClasses(descriptionErrors)}>
        <InputLabel>Description</InputLabel>
        <Input
          type="text"
          value={description}
          onChange={updateValue('description')}
        />
        <InputError errors={descriptionErrors} />
      </FormGroup>

      <FormGroup className={fgClasses(endDateErrors)}>
        <InputLabel>End Date</InputLabel>
        <DateTimePicker
          value={endDate}
          onChange={updateValue('endDate')}
          ampm={false}
        />
        <InputError
          errors={endDateErrors}
          placeholderValues={{
            dateBeforeLimit: [new Moment().format('DD.MM.YYYY HH:mm')],
          }}
        />
      </FormGroup>

      <FormGroup className={fgClasses(evidenceDescriptionErrors)}>
        <InputLabel>Evidence Description</InputLabel>
        <Input
          type="text"
          value={evidenceDescription}
          onChange={updateValue('evidenceDescription')}
        />
        <InputError errors={evidenceDescriptionErrors} />
      </FormGroup>

      <FormGroup className={fgClasses(evidenceSourceErrors)}>
        <InputLabel>Evidence Source</InputLabel>
        <Input
          type="text"
          value={evidenceSource}
          onChange={updateValue('evidenceSource')}
        />
        <InputError errors={evidenceSourceErrors} />
      </FormGroup>

      <FormGroup className={fgClasses(liquidityErrors)}>
        <InputLabel>Liquidity</InputLabel>
        <Input
          type="text"
          value={liquidity}
          onChange={updateValue('liquidity')}
        />
        <InputError
          errors={liquidityErrors}
          placeholderValues={{ tooLow: [0] }}
        />
      </FormGroup>
    </div>
  );
};

export default BetForm;
