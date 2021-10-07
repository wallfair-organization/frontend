import { useState } from 'react';
import Moment from 'moment';
import {
  DateTimePicker,
  FormGroup,
  Input,
  InputLabel,
  Select,
  Tags,
  InputError,
} from '../Form';
import * as Api from 'api';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { setUniqueSlug } from '../../helper/Slug';
import { PopupActions } from '../../store/actions/popup';
import eventTypes from 'constants/EventTypes';
import BetForm from './BetForm';
import {
  useValidatedState,
  hasError,
  Validators,
  isValid,
} from '../Form/hooks/useValidatedState';
import classNames from 'classnames';
import Button from 'components/Button';
import HighlightTheme from 'components/Highlight/HighlightTheme';
import HighlightType from 'components/Highlight/HighlightType';

const categoriesOptions = LIVE_EVENTS_CATEGORIES.map(c => ({
  label: c.value,
  value: c.value,
}));

const AdminEventForm = ({ event = null, eventSlugs, hidePopup, eventType }) => {
  const isStreamedEventType = eventType === eventTypes.streamed;

  const [name, setName, nameErrors] = useValidatedState(event?.name, [
    Validators.required,
  ]);
  const [slug, setSlug, slugErrors] = useValidatedState(event?.slug, [
    Validators.required,
  ]);

  const streamUrlInitialValue =
    event?.streamUrl || (!isStreamedEventType ? 'dummy' : '');
  const [streamUrl, setStreamUrl, streamUrlErrors] = useValidatedState(
    streamUrlInitialValue,
    (isStreamedEventType && [Validators.required, Validators.isUrl]) || []
  );
  const [previewImageUrl, setPreviewImageUrl, previewImageUrlErrors] =
    useValidatedState(event?.previewImageUrl, [
      Validators.required,
      Validators.isUrl,
    ]);
  const [category, setCategory, categoryErrors] = useValidatedState(
    event?.category || categoriesOptions[0].value
  );
  const [tags, setTags, tagsErrors] = useValidatedState(
    event?.tags || [{ _id: Date.now().toString(), name: '' }],
    [Validators.minLength(1), Validators.requiredTags]
  );
  const [date, setDate, dateErrors] = useValidatedState(
    event?.date || new Moment()
  );
  const [betData, setBetData] = useState({});
  const [isBetFormValid, setIsBetFormValid] = useState(
    !!event || isStreamedEventType
  );

  const isFormValid =
    [
      nameErrors,
      slugErrors,
      streamUrlErrors,
      previewImageUrlErrors,
      categoryErrors,
      tagsErrors,
      dateErrors,
    ]
      .map(isValid)
      .filter(valid => !valid).length === 0 && isBetFormValid;

  const onNameChange = newName => {
    const slugs =
      event === null ? eventSlugs : eventSlugs.filter(s => s !== event?.slug);

    setName(newName);
    setUniqueSlug(newName, slugs, setSlug);
  };

  const handleSuccess = ({ response: { data } }) => {
    //@todo there is a strange bug when I use history.push(); to navigate, layout becomes white
    window.location.reload();
  };

  const handleSave = () => {
    const payload = {
      name,
      slug,
      previewImageUrl,
      streamUrl: isStreamedEventType ? streamUrl : 'dummy',
      category,
      tags: tags.map(t => ({ name: t.name })).filter(t => t.name !== ''),
      date,
      type: event ? event.type : eventType,
      ...(!isStreamedEventType && { bet: betData }),
    };

    if (event) {
      Api.editEvent(event._id, payload)
        .then(handleSuccess)
        .catch(err => {
          console.error(err);
        });
    } else {
      Api.createEvent(payload)
        .then(handleSuccess)
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleTagChange = (name, id) => {
    setTags(prevTags =>
      prevTags.map(tag => (tag._id === id ? { ...tag, name } : tag))
    );
  };

  const addTag = () => {
    setTags(prevTags => [
      ...prevTags,
      { _id: Date.now().toString(), name: '' },
    ]);
  };

  const removeTag = id => {
    setTags(prevTags => prevTags.filter(tag => tag._id !== id));
  };

  const fgClasses = err =>
    classNames(
      styles.inputContainer,
      !isValid(err) && styles.inputContainerError
    );

  const renderStreamInput = () => (
    <>
      <FormGroup className={fgClasses(streamUrlErrors)}>
        <InputLabel>Stream URL</InputLabel>
        <Input type="text" value={streamUrl} onChange={setStreamUrl} />
        <InputError errors={streamUrlErrors} />
      </FormGroup>
    </>
  );

  return (
    <>
      <FormGroup className={fgClasses(nameErrors)}>
        <InputLabel>Event Name</InputLabel>
        <Input type="text" value={name} onChange={onNameChange} />
        <InputError errors={nameErrors} />
      </FormGroup>

      <FormGroup className={fgClasses(slugErrors)}>
        <InputLabel>SEO-Optimized URL Piece</InputLabel>
        <Input type="text" value={slug} onChange={setSlug} />
        <InputError errors={slugErrors} />
      </FormGroup>

      {isStreamedEventType && renderStreamInput()}

      <FormGroup className={fgClasses(previewImageUrlErrors)}>
        <InputLabel>
          {isStreamedEventType ? 'Offline Picture URL' : 'Event Image URL'}
        </InputLabel>
        <Input
          type="text"
          value={previewImageUrl}
          onChange={setPreviewImageUrl}
        />
        <InputError errors={previewImageUrlErrors} />
      </FormGroup>

      <FormGroup className={fgClasses(categoryErrors)}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          handleSelect={setCategory}
          options={categoriesOptions}
          className={styles.select}
        />
        <InputError errors={categoryErrors} />
      </FormGroup>

      <FormGroup className={fgClasses(tagsErrors)}>
        <InputLabel>Tags</InputLabel>
        <Tags
          tags={tags}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
          max={4}
        />
        <InputError
          errors={tagsErrors}
          placeholderValues={{
            minLength: ['1', 'tag'],
            hasEmptyMembers: ['tags'],
          }}
        />
      </FormGroup>

      <FormGroup className={fgClasses(dateErrors)}>
        <InputLabel>Date</InputLabel>
        <DateTimePicker
          value={date}
          onChange={date => setDate(date)}
          ampm={false}
        />
        <InputError errors={dateErrors} />
      </FormGroup>

      {!isStreamedEventType && !event && (
        <BetForm
          setBetData={setBetData}
          styles={styles}
          fgClasses={fgClasses}
          setValidity={setIsBetFormValid}
        />
      )}

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
    eventSlugs: state.event.events.map(({ slug }) => slug).filter(Boolean),
  };
};

export default connect(mapStateToProps, null)(AdminEventForm);
