import {
  DateTimePicker,
  FormGroup,
  InputLabel,
  Input,
  Tags,
} from 'components/Form';
import { useState } from 'react';

const BetForm = ({ setBetData, styles }) => {
  const [marketQuestion, setMarketQuestion] = useState('');
  const [outcomes, setOutcomes] = useState([
    { _id: Date.now().toString(), name: '' },
  ]);
  const [evidenceDescription, setEvidenceDescription] = useState('');
  const [endDate, setEndDate] = useState(null);

  const betData = {
    marketQuestion,
    outcomes,
    evidenceDescription,
    endDate,
    slug: 'bet',
  };

  const setters = {
    marketQuestion: setMarketQuestion,
    outcomes: setOutcomes,
    evidenceDescription: setEvidenceDescription,
    endDate: setEndDate,
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
      <FormGroup className={styles.inputContainer}>
        <InputLabel>Name</InputLabel>
        <Input
          type="text"
          value={marketQuestion}
          onChange={updateValue('marketQuestion')}
        />
      </FormGroup>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>Options</InputLabel>
        <Tags
          tags={outcomes}
          onTagChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
        />
      </FormGroup>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>Evidence Description</InputLabel>
        <Input
          type="text"
          value={evidenceDescription}
          onChange={updateValue('evidenceDescription')}
        />
      </FormGroup>
      <FormGroup className={styles.inputContainer}>
        <InputLabel>End Date</InputLabel>
        <DateTimePicker
          value={endDate}
          onChange={updateValue('endDate')}
          ampm={false}
        />
      </FormGroup>
    </div>
  );
};

export default BetForm;
