import { useEffect, useState } from 'react';
import {
  DateTimePicker,
  FormGroup,
  Input,
  InputLabel,
  Tags,
  InputError,
} from '../Form';
import * as Api from 'api';
import styles from './styles.module.scss';
import { setUniqueSlug } from 'helper/Slug';
import PopupTheme from 'components/Popup/PopupTheme';
import { connect } from 'react-redux';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';
import {
  useValidatedState,
  Validators,
  isValid,
} from 'components/Form/hooks/useValidatedState';
import Moment from 'moment';
import classNames from 'classnames';
import HighlightType from 'components/Highlight/HighlightType';

const AdminBetForm = ({ event, bet = null, visible }) => {
  const [marketQuestion, setMarketQuestion, marketQuestionErrors] =
    useValidatedState(bet?.marketQuestion, [Validators.required]);
  const [description, setDescription, descriptionErrors] = useValidatedState(
    bet?.description,
    [Validators.required]
  );
  const [slug, setSlug, slugErrors] = useValidatedState(bet?.slug, [
    Validators.required,
  ]);
  const [outcomes, setOutcomes, outcomesErrors] = useValidatedState(
    bet?.outcomes || [{ id: Date.now(), name: '' }],
    [Validators.minLength(2), Validators.requiredTags]
  );
  const [
    evidenceDescription,
    setEvidenceDescription,
    evidenceDescriptionErrors,
  ] = useValidatedState(bet?.evidenceDescription, [Validators.required]);

  const [evidenceSource, setEvidenceSource, evidenceSourceErrors] =
    useValidatedState(bet?.evidenceSource, [Validators.required]);

  const [endDate, setEndDate, endDateErrors] = useValidatedState(
    bet?.endDate || new Moment().add(1, 'hour'),
    [Validators.required, ...(!bet ? [Validators.dateAfter(new Moment())] : [])]
  );
  const [betTemplates, setBetTemplates] = useValidatedState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  const betSlugs = (
    !!bet ? event.bets.filter(({ _id }) => bet._id !== _id) : event.bets
  ).map(({ slug }) => slug);

  const onNameChange = newName => {
    setMarketQuestion(newName);
    setUniqueSlug(newName, betSlugs, setSlug);
  };

  const handleSuccess = async () => {
    // there is a strange bug when I use history.push(); to navigate, layout becomes white
    window.location.reload();
  };

  useEffect(() => {
    if (visible) {
      Api.getBetTemplates().then(({ response }) => {
        setBetTemplates(response.data);
        setSelectedTemplateId(
          betTemplates.find(({ category }) => category === event?.category)
            ?._id || null
        );
      });
    }
  }, [visible, event]);

  const handleSave = () => {
    const payload = {
      event: event._id,
      marketQuestion,
      description,
      slug,
      evidenceDescription,
      evidenceSource,
      outcomes: outcomes
        .map((t, index) => ({ name: t.name, index }))
        .filter(t => t.name !== ''),
      endDate,
      date: bet?.date || new Date(),
    };

    if (bet) {
      Api.editEventBet(bet._id, payload).then(handleSuccess);
    } else {
      Api.createEventBet(payload).then(handleSuccess);
    }
  };

  const handleTagChange = (name, id) => {
    setOutcomes(prevOutcomes =>
      prevOutcomes.map(tag => (tag._id === id ? { ...tag, name } : tag))
    );
  };

  const addTag = () => {
    setOutcomes(prevOutcomes => [
      ...prevOutcomes,
      { _id: Date.now().toString(), name: '' },
    ]);
  };

  const removeTag = id => {
    setOutcomes(prevOutcomes => prevOutcomes.filter(tag => tag._id !== id));
  };

  const applyTemplate = () => {
    const template = betTemplates.find(({ _id }) => _id === selectedTemplateId);
    if (!template) return;

    const { marketQuestion: templateQuestion, outcomes: templateOutcomes } =
      template;

    onNameChange(templateQuestion);
    setOutcomes(templateOutcomes);
  };

  const betTemplateOptions = betTemplates.map(
    ({ category, marketQuestion, _id }) => ({
      label: `${category} / ${marketQuestion}`,
      value: _id,
    })
  );

  const isFormValid =
    [
      marketQuestionErrors,
      descriptionErrors,
      slugErrors,
      outcomesErrors,
      evidenceDescriptionErrors,
      evidenceSourceErrors,
      endDateErrors,
    ]
      .map(isValid)
      .filter(valid => !valid).length === 0;

  const fgClasses = err =>
    classNames(
      styles.inputContainer,
      !isValid(err) && styles.inputContainerError
    );

  return (
    <>
      {!bet?._id && (
        <FormGroup className={styles.betTemplate}>
          <span className={styles.betTemplateHint}>
            Use a template to populate bet details quicker.
          </span>
          <div className={styles.templatePicker}>
            <Dropdown
              options={betTemplateOptions}
              placeholder={'Bet templates'}
              setValue={setSelectedTemplateId}
              value={selectedTemplateId}
              className={styles.select}
            />
            <Button
              className={styles.applyButton}
              onClick={applyTemplate}
              disabled={selectedTemplateId === null}
              withoutBackground={true}
            >
              Apply
            </Button>
          </div>
        </FormGroup>
      )}
      <FormGroup className={fgClasses(marketQuestionErrors)}>
        <InputLabel>Name</InputLabel>
        <Input type="text" value={marketQuestion} onChange={onNameChange} />
        <InputError errors={marketQuestionErrors} />
      </FormGroup>
      <FormGroup className={fgClasses(slugErrors)}>
        <InputLabel>SEO-Optimized URL Piece</InputLabel>
        <Input type="text" value={slug} onChange={setSlug} />
        <InputError errors={slugErrors} />
      </FormGroup>
      <FormGroup className={fgClasses(descriptionErrors)}>
        <InputLabel>Description</InputLabel>
        <Input type="text" value={description} onChange={setDescription} />
        <InputError errors={descriptionErrors} />
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
      <FormGroup className={fgClasses(evidenceDescriptionErrors)}>
        <InputLabel>Evidence Description</InputLabel>
        <Input
          type="text"
          value={evidenceDescription}
          onChange={setEvidenceDescription}
        />
        <InputError errors={evidenceDescriptionErrors} />
      </FormGroup>
      <FormGroup className={fgClasses(evidenceSourceErrors)}>
        <InputLabel>Evidence Source</InputLabel>
        <Input
          type="text"
          value={evidenceSource}
          onChange={setEvidenceSource}
        />
        <InputError errors={evidenceSourceErrors} />
      </FormGroup>
      <FormGroup className={fgClasses(endDateErrors)}>
        <InputLabel>End Date</InputLabel>
        <DateTimePicker
          value={endDate}
          onChange={date => setEndDate(date)}
          ampm={false}
        />
        <InputError
          errors={endDateErrors}
          placeholderValues={{
            dateBeforeLimit: [new Moment().format('DD.MM.YYYY HH:mm')],
          }}
        />
      </FormGroup>
      <div className={styles.buttonContainer}>
        <Button
          className={classNames(styles.button, !isFormValid && styles.disabled)}
          highlightType={HighlightType.highlightModalButton2}
          withoutBackground={true}
          disabledWithOverlay={false}
          onClick={handleSave}
          disabled={!isFormValid}
        >
          Save
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.visible &&
      [PopupTheme.newBet, PopupTheme.editBet].includes(state.popup.popupType),
  };
};

export default connect(mapStateToProps, null)(AdminBetForm);
