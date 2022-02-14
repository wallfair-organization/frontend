import Moment from 'moment';
import {
  DateTimePicker,
  FormGroup,
  InputLabel,
  Select,
  Tags,
  InputError,
} from '../../Form';
import { EVENT_CATEGORIES } from '../../../constants/EventCategories';
import styles from '../styles.module.scss';
import { useValidatedState } from 'components/Form/hooks/useValidatedState';
import { Validators, isValid } from '../../Form/utils/validators';
import classNames from 'classnames';
import uuid from 'uuid';
import { connect } from 'react-redux';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import { useState } from 'react';
import { setUniqueSlug } from 'helper/Slug';

const categoriesOptions = EVENT_CATEGORIES.map(c => ({
  label: c.value,
  value: c.value,
}));

const EventScreen = ({ event = null, proceedEvent, isNew, eventSlugs }) => {
  const [formValid, setFormValid] = useState(true);

  const [name, setName, nameErrors] = useValidatedState(event?.name, [
    Validators.required,
  ]);
  const [slug, setSlug, slugErrors] = useValidatedState(event?.slug, [
    Validators.required,
  ]);
  const [preview_image_url, set_preview_image_url, preview_image_url_errors] =
    useValidatedState(event?.preview_image_url, [
      Validators.required,
      Validators.isUrl,
    ]);
  const [category, setCategory, categoryErrors] = useValidatedState(
    event?.category || categoriesOptions[0].value
  );
  const [tags, setTags, tagsErrors] = useValidatedState(
    event?.tags || [{ id: uuid.v4(), name: '' }],
    [Validators.minLength(1), Validators.requiredTags]
  );
  const [date, setDate, dateErrors] = useValidatedState(
    event?.date || new Moment()
  );

  const handleTagChange = (name, id) => {
    setTags(prevTags =>
      prevTags.map(tag => (tag.id === id ? { ...tag, name } : tag))
    );
  };

  const addTag = () => {
    setTags(prevTags => [...prevTags, { id: uuid.v4(), name: '' }]);
  };

  const removeTag = id => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
  };

  const fgClasses = (err, ...args) =>
    classNames(
      styles.inputContainer,
      !isValid(err) && styles.inputContainerError,
      ...args
    );

  const handleForm = () => {
    const valid =
      [
        nameErrors,
        slugErrors,
        preview_image_url_errors,
        categoryErrors,
        tagsErrors,
        dateErrors,
      ]
        .map(isValid)
        .filter(valid => !valid).length === 0;
    setFormValid(valid);

    if (valid) {
      proceedEvent({
        name,
        slug,
        category,
        preview_image_url,
        tags,
        date,
      });
    }
  };

  const onNameChange = newName => {
    const slugs =
      event === null ? eventSlugs : eventSlugs.filter(s => s !== event?.slug);

    setName(newName);
    setUniqueSlug(newName, slugs, setSlug);
  };

  return (
    <>
      <h2 className={styles.formHeader}>Event Settings</h2>
      <FormGroup className={fgClasses(nameErrors)}>
        <InputLabel className={styles.inputLabel}>Event Name</InputLabel>
        <InputBox
          type="text"
          className={styles.inputBox}
          placeholder="My first Event"
          value={name}
          setValue={e => {
            onNameChange(e);
          }}
        />
        {!formValid && <InputError errors={nameErrors} />}
      </FormGroup>

      <FormGroup className={fgClasses(slugErrors)}>
        <InputLabel className={styles.inputLabel}>
          SEO-Optimized URL Piece
        </InputLabel>
        <InputBox
          type="text"
          className={styles.inputBox}
          placeholder="q2324556"
          value={slug}
          setValue={e => {
            setSlug(e.trim());
          }}
        />
        {!formValid && <InputError errors={slugErrors} />}
      </FormGroup>

      <FormGroup className={fgClasses(preview_image_url_errors)}>
        <InputLabel className={styles.inputLabel}>Event Image URL</InputLabel>
        <InputBox
          type="text"
          className={styles.inputBox}
          placeholder="http://google.de/jennifer/2.jpg"
          value={preview_image_url}
          setValue={e => {
            set_preview_image_url(e.trim());
          }}
        />
        {!formValid && <InputError errors={preview_image_url_errors} />}
      </FormGroup>

      <FormGroup className={fgClasses(categoryErrors)}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          handleSelect={setCategory}
          options={categoriesOptions}
          className={styles.select}
          fieldClass={styles.fieldClass}
        />
        {!formValid && <InputError errors={categoryErrors} />}
      </FormGroup>

      <FormGroup className={fgClasses(tagsErrors)}>
        <InputLabel>Tags</InputLabel>
        <Tags
          tags={tags}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
          max={4}
          customTagInput={styles.customTagInput}
        />
        {!formValid && (
          <InputError
            errors={tagsErrors}
            placeholderValues={{
              minLength: ['1', 'tag'],
              hasEmptyMembers: ['tags'],
            }}
          />
        )}
      </FormGroup>

      <FormGroup className={fgClasses(dateErrors)}>
        <InputLabel>Date</InputLabel>
        <DateTimePicker
          value={date}
          className={styles.datePickerInput}
          onChange={date => setDate(date)}
          ampm={false}
        />
        {!formValid && <InputError errors={dateErrors} />}
      </FormGroup>

      <Button
        className={classNames(styles.button, styles.confirmButton)}
        highlightType={HighlightType.highlightModalButton2}
        withoutBackground={true}
        disabledWithOverlay={false}
        onClick={handleForm}
      >
        {!isNew ? 'Save' : 'Next Step'}
      </Button>
    </>
  );
};

const mapStateToProps = state => {
  return {
    eventSlugs: state.event.events.map(({ slug }) => slug).filter(Boolean),
  };
};


export default connect(mapStateToProps, null)(EventScreen);