import * as Api from 'api';
import { LIVE_EVENTS_CATEGORIES } from 'constants/EventCategories';
import { useState } from 'react';
import { FormGroup, Input, InputLabel, Select } from '../Form';
import styles from './styles.module.scss';

const ImportFromTwitch = () => {
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(null);

  const categoriesOptions = LIVE_EVENTS_CATEGORIES.map(c => ({
    label: c.value,
    value: c.value,
  }));

  const handleSave = () => {
    Api.createEventFromTwitchUrl({ streamUrl: url, category }).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>Twitch Stream URL</InputLabel>
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
      <span
        role="button"
        tabIndex="0"
        className={styles.button}
        onClick={handleSave}
      >
        Save
      </span>
    </>
  );
};

export default ImportFromTwitch;
