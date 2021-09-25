import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import { useState } from 'react';
import Textarea from '../Textarea';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import InputBox from 'components/InputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import { FormGroup, InputLabel, Select } from 'components/Form';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';

const disputeReasonOptions = [
  { label: 'Outcome', value: 'OUTCOME' },
  { label: 'Evidence', value: 'EVIDENCE' },
  { label: 'Resolved too early', value: 'TOO_EARLY' },
  { label: 'Other', value: 'OTHER' },
];

const ReportEventPopup = ({ hidePopup }) => {
  const [reason, setReason] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    disputeReasonOptions.map(({ value }) => value).includes(reason) &&
    message.length > 1;
  const isButtonDisabled = !isFormValid || isSubmitting;

  const handleMessage = event => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      hidePopup();
    }, 400);
  };

  return (
    <div className={styles.reportEvent}>
      <img src={LogoSplash} className={styles.logo} />
      <div className={styles.title}>Got a problem?</div>
      <div className={styles.subtitle}>Let us know how can we help you</div>

      <div className={styles.content}>
        <FormGroup>
          <InputLabel>What is wrong?</InputLabel>
          <Select
            options={disputeReasonOptions}
            value={reason}
            placeholder={'Select'}
            handleSelect={setReason}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>Explanation</InputLabel>
          <Textarea
            className={styles.textarea}
            value={message}
            onChange={handleMessage}
            placeholder="..."
          />
        </FormGroup>
      </div>

      <Button
        className={styles.sendButton}
        onClick={handleSend}
        highlightType={HighlightType.highlightModalButton}
        disabled={isButtonDisabled}
        disabledWithOverlay={false}
        withoutBackground={true}
      >
        <span className={'buttonText'}>Send</span>
      </Button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(ReportEventPopup);
