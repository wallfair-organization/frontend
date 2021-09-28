import * as Api from 'api';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
import { useState } from 'react';
import { FormGroup, Input, InputLabel, Select } from '../Form';
import styles from './styles.module.scss';

const categoriesOptions = LIVE_EVENTS_CATEGORIES.map(c => ({
  label: c.value,
  value: c.value,
}));

const ImportFromYoutube = () => {
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(null);

  const handleSave = () => {
    Api.createEventFromYoutubeUrl({
      youtubeVideoId: url,
      type: 'streamed',
      category,
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>YouTube Video ID</InputLabel>
        <Input type="text" value={url} onChange={setUrl} />
      </FormGroup>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          handleSelect={setCategory}
          options={categoriesOptions}
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

export default ImportFromYoutube;
