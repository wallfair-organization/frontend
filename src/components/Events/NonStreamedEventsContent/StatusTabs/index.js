import _ from 'lodash';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

import SuggestEventButton from 'components/Events/SuggestEventButton';

const TABS = {
  current: 'current',
  past: 'past',
};

const StatusTabs = ({ onSelect = () => {}, preselected = TABS.current }) => {
  const [activeTab, setActiveTab] = useState(preselected);

  const setSelection = selection => {
    setActiveTab(selection);
    onSelect(selection);
  };

  const tabLabels = {
    [TABS.current]: 'Current Events',
    [TABS.past]: 'Past Events',
  };

  return (
    <div className={styles.statusPicker}>
      {Object.keys(TABS).map(tabName => (
        <button
          type="button"
          className={classNames(
            styles.tabButton,
            activeTab === tabName && styles.tabButtonActive
          )}
          onClick={() => setSelection(tabName)}
        >
          {tabLabels[tabName]}
        </button>
      ))}
      <SuggestEventButton externalClassNames={[styles.suggestEventButton]} />
    </div>
  );
};

export default StatusTabs;
