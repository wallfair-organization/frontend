import {
  DateTimePicker,
  FormGroup,
  InputLabel,
  Input,
  Tags,
  InputError,
} from 'components/Form';
import {
  isValid,
  useValidatedState,
  Validators,
} from 'components/Form/hooks/useValidatedState';
import Moment from 'moment';

const BetForm = ({ setBetData, styles, fgClasses, setValidity }) => {
  const [marketQuestion, setMarketQuestion, marketQuestionErrors] =
    useValidatedState('', [Validators.required]);
  const [outcomes, setOutcomes, outcomesErrors] = useValidatedState(
    [{ _id: Date.now().toString(), name: '' }],
    [Validators.minLength(2), Validators.requiredTags]
  );
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

  const isFormValid =
    [
      marketQuestionErrors,
      outcomesErrors,
      evidenceDescriptionErrors,
      evidenceSourceErrors,
      descriptionErrors,
      endDateErrors,
    ]
      .map(isValid)
      .filter(valid => !valid).length === 0;

  setValidity(isFormValid);

  const betData = {
    marketQuestion,
    outcomes,
    evidenceDescription,
    evidenceSource,
    description,
    endDate,
    slug: 'bet',
  };

  const setters = {
    marketQuestion: setMarketQuestion,
    outcomes: setOutcomes,
    evidenceDescription: setEvidenceDescription,
    endDate: setEndDate,
    evidenceSource: setEvidenceSource,
    description: setDescription,
  };

  const setFormValue = (key, value) => {
    betData[key] = value;
    setBetData({
      ...betData,
      outcomes: betData.outcomes.map(({ name }, index) => ({ name, index })),
    });
    setters[key](value);
  };

  const handleTagChange = (name, id) => {
    updateValue('outcomes')(
      outcomes.map(tag => (tag._id === id ? { ...tag, name } : tag))
    );
  };

  const addTag = () => {
    updateValue('outcomes')([
      ...outcomes,
      { _id: Date.now().toString(), name: '' },
    ]);
  };

  const removeTag = id => {
    updateValue('outcomes')(outcomes.filter(tag => tag._id !== id));
  };

  /** @param {keyof betData} key */
  const updateValue = key => value => setFormValue(key, value);

  return (
    <div className={styles.betForm}>
      <h3>Bet Data</h3>
      <FormGroup className={fgClasses(marketQuestionErrors)}>
        <InputLabel>Market Question</InputLabel>
        <Input
          type="text"
          value={marketQuestion}
          onChange={updateValue('marketQuestion')}
        />
        <InputError errors={marketQuestionErrors} />
      </FormGroup>

      <FormGroup className={fgClasses(outcomesErrors)}>
        <InputLabel>Options</InputLabel>
        <Tags
          tags={outcomes}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
          max={4}
        />
        <InputError
          errors={outcomesErrors}
          placeholderValues={{
            minLength: ['2', 'outcomes'],
            hasEmptyMembers: ['outcomes'],
          }}
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
    </div>
  );
};

export default BetForm;
