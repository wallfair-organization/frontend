import * as Api from 'api';
import Button from 'components/Button';
import { FormGroup, InputLabel, Select, Input } from 'components/Form';
import {} from 'components/Form';
import PopupTheme from 'components/Popup/PopupTheme';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import styles from './styles.module.scss';

const ResolveBetPopup = ({ bet, hidePopup, visible }) => {
  const betOutcomes = _.get(bet, 'outcomes').map(({ index, name }) => ({
    value: String(index),
    label: name,
  }));

  const [outcome, setOutcome] = useState(null);
  const [evidenceActual, setEvidenceActual] = useState('');
  const [evidenceDescription, setEvidenceDescription] = useState('');

  const [isResolving, setIsResolving] = useState(false);

  const isOutcomeValid = outcome !== null && !isNaN(+outcome) && +outcome >= 0;
  const isValidStringInput = str => str !== null && str.length > 0;

  const isFormValid =
    isOutcomeValid &&
    isValidStringInput(evidenceActual) &&
    isValidStringInput(evidenceDescription);

  useEffect(() => {
    if (!visible) {
      setOutcome(null);
      setEvidenceActual('');
      setEvidenceDescription('');
      setIsResolving(false);
    } else {
      setEvidenceDescription(_.get(bet, 'evidenceDescription', null));
    }
  }, [visible, bet]);

  const resolveBet = () => {
    setIsResolving(true);

    Api.resolveBet(bet.id, {
      evidenceActual: evidenceActual,
      evidenceDescription: evidenceDescription,
      outcome: +outcome,
    }).then(() => {
      setIsResolving(false);
      hidePopup();
    });
  };

  return (
    <form className={styles.layout} onSubmit={resolveBet}>
      <h2>Resolve Bet</h2>
      <FormGroup>
        <InputLabel>Outcome</InputLabel>
        <Select
          value={outcome}
          handleSelect={setOutcome}
          placeholder={'Select'}
          options={betOutcomes}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel>Evidence Description</InputLabel>
        <Input
          value={evidenceDescription}
          onChange={setEvidenceDescription}
          type={'text'}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel>Outcome Evidence</InputLabel>
        <Input
          value={evidenceActual}
          onChange={setEvidenceActual}
          type={'text'}
        />
      </FormGroup>

      <Button onClick={resolveBet} disabled={!isFormValid || isResolving}>
        Resolve!
      </Button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.visible && PopupTheme.resolveBet === state.popup.popupType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResolveBetPopup);
