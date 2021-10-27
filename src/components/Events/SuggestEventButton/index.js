import React from 'react';
import { PopupButton } from '@typeform/embed-react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const SuggestEventButton = React.memo(({ externalClassNames = [] }) => {
  return (
    <div
      className={classNames(
        styles.suggestAnEventTriggerContainer,
        ...externalClassNames
      )}
    >
      <PopupButton
        key={'XbyRBuOp'}
        id="XbyRBuOp"
        className={styles.suggestAnEventTrigger}
      >
        Suggest an event
      </PopupButton>
    </div>
  );
});

export default SuggestEventButton;
