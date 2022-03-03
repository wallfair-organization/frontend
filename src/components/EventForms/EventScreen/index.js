import { FormGroup, InputLabel, Select, Tags, InputError } from '../../Form';
import { EVENT_CATEGORIES } from '../../../constants/EventCategories';
import styles from '../styles.module.scss';
import { useValidatedState } from 'components/Form/hooks/useValidatedState';
import { Validators, isValid } from '../../Form/utils/validators';
import classNames from 'classnames';
import Compressor from 'compressorjs';
import uuid from 'uuid';
import { connect } from 'react-redux';
import InputBox from 'components/InputBox';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import { useState, useRef } from 'react';
import { setUniqueSlug } from 'helper/Slug';
import ButtonSmall from 'components/ButtonSmall';
import { uploadImage } from 'api';

const categoriesOptions = EVENT_CATEGORIES.map(c => ({
  label: c.value,
  value: c.value,
}));

const EventScreen = ({ event = null, proceedEvent, isNew, eventSlugs }) => {
  const [formValid, setFormValid] = useState(true);

  const [name, setName, nameErrors] = useValidatedState(event?.name, [
    Validators.required,
  ]);
  const [slug, setSlug] = useValidatedState(event?.slug);
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

  const [uploadInProgress, setUploadInProgress] = useState(false);
  const eventImageRefName = useRef(null);

  const clickUploadProfilePicture = () => {
    eventImageRefName.current?.click();
  };

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
      [nameErrors, preview_image_url_errors, categoryErrors, tagsErrors]
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
      });
    }
  };

  const onNameChange = newName => {
    const slugs =
      event === null ? eventSlugs : eventSlugs.filter(s => s !== event?.slug);

    setName(newName);
    setUniqueSlug(newName, slugs, setSlug);
  };

  const handleEventImageUpload = async e => {
    if (!e.target.files.length) return;
    setUploadInProgress(true);

    new Compressor(e.target.files[0], {
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      convertTypes: ['image/png', 'image/webp', 'image/bmp'],
      convertSize: 2000000,
      success: async compressed => {
        const base64 = await convertToBase64(compressed);
        const data = {
          src: base64,
          filename: e.target.files[0].name,
        };

        uploadImage(data)
          .then(res => {
            set_preview_image_url(res.url);
          })
          .finally(() => {
            setUploadInProgress(false);
          });
      },
      error: () => {
        setUploadInProgress(false);
      }
    });
  };

  const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
  };

  return (
    <>
      <h2 className={styles.formHeader}>Event Settings</h2>
      <FormGroup className={fgClasses(nameErrors)}>
        <InputLabel
          className={styles.inputLabel}
          infoboxText={
            'Add the question for your event. e.g. "Who will win the match on DD/MM/YYYY?"'
          }
        >
          Market Question
        </InputLabel>
        <InputBox
          type="text"
          className={styles.inputBox}
          placeholder="Enter the question users will bet on"
          value={name}
          setValue={e => {
            onNameChange(e);
          }}
          maxlength="100"
        />
        {!formValid && <InputError errors={nameErrors} />}
      </FormGroup>

      <FormGroup className={fgClasses(preview_image_url_errors)}>
        <InputLabel
          className={styles.inputLabel}
          infoboxText={
            'Copy and paste the image URL / or Upload your own image, you wish to show as the image for this event. e.g.: https://path.to/image.jpg'
          }
        >
          Bet Image URL
        </InputLabel>

        <div className={styles.uploadBlock}>
          <InputBox
            type="text"
            className={styles.inputBox}
            containerClassName={styles.inputBoxContainer}
            placeholder="https://.../image.jpg"
            value={preview_image_url}
            setValue={e => {
              set_preview_image_url(e.trim());
            }}
            maxlength="300"
            disabled={uploadInProgress}
          />

          <input
            ref={eventImageRefName}
            type={'file'}
            accept={'image/*'}
            style={{ display: 'none' }}
            onChange={handleEventImageUpload}
          />

          <ButtonSmall
            text="Upload"
            classNameExtended={styles.buttonSmall}
            onClick={clickUploadProfilePicture}
            disabled={uploadInProgress}
          ></ButtonSmall>
        </div>

        {!formValid && <InputError errors={preview_image_url_errors} />}
      </FormGroup>

      <FormGroup className={fgClasses(categoryErrors)}>
        <InputLabel
          className={styles.inputLabel}
          infoboxText={
            'Select a category which best relates to the event you are adding'
          }
        >
          Category
        </InputLabel>
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
        <InputLabel
          className={styles.inputLabel}
          infoboxText={
            'Add tags relates to the event you are adding. e.g.: reality show, NFT, ...'
          }
        >
          Tags
        </InputLabel>
        <Tags
          tags={tags}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
          max={10}
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

const mapStateToProps = state => {
  return {
    eventSlugs: state.event.events.map(({ slug }) => slug).filter(Boolean),
  };
};

export default connect(mapStateToProps, null)(EventScreen);
