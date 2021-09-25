import { useEffect, useState } from 'react';
import { DateTimePicker, FormGroup, Input, InputLabel, Tags } from '../Form';
import * as Api from 'api';
import styles from './styles.module.scss';
import { setUniqueSlug } from 'helper/Slug';
import PopupTheme from 'components/Popup/PopupTheme';
import { connect } from 'react-redux';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';

const AdminBetForm = ({ event, bet = null, visible }) => {
  const [marketQuestion, setMarketQuestion] = useState(
    bet?.marketQuestion || ''
  );
  const [slug, setSlug] = useState(bet?.slug || '');
  const [betTemplates, setBetTemplates] = useState([]);
  const [outcomes, setOutcomes] = useState(
    bet?.outcomes || [{ id: Date.now(), name: '' }]
  );
  const [evidenceDescription, setEvidenceDescription] = useState(
    bet?.evidenceDescription || ''
  );
  const [endDate, setEndDate] = useState(bet?.endDate || null);
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
      slug,
      evidenceDescription,
      outcomes: outcomes
        .map(t => ({ name: t.name }))
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
      <FormGroup className={styles.inputContainer}>
        <InputLabel>Name</InputLabel>
        <Input type="text" value={marketQuestion} onChange={onNameChange} />
      </FormGroup>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>SEO-Optimized URL Piece</InputLabel>
        <Input type="text" value={slug} onChange={setSlug} />
      </FormGroup>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>Options</InputLabel>
        <Tags
          tags={outcomes}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
          max={4}
        />
      </FormGroup>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>Evidence Description</InputLabel>
        <Input
          type="text"
          value={evidenceDescription}
          onChange={setEvidenceDescription}
        />
      </FormGroup>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>End Date</InputLabel>
        <DateTimePicker
          value={endDate}
          onChange={date => setEndDate(date)}
          ampm={false}
        />
      </FormGroup>
      <div className={styles.buttonContainer}>
        <span
          role="button"
          tabIndex="0"
          className={styles.button}
          onClick={handleSave}
        >
          Save
        </span>
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
