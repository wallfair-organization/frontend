import React, { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import authState from 'constants/AuthState';

const TABS = {
  current: 'current',
  past: 'past',
  myEvents: 'myEvents',
};

const StatusTabs = ({ onSelect = () => {}, preselected = TABS.current }) => {
  const [activeTab, setActiveTab] = useState(preselected);

  const isLoggedIn = useSelector(
    state => state.authentication.authState === authState.LOGGED_IN
  );

  const setSelection = selection => {
    setActiveTab(selection);
    onSelect(selection);
  };

  const tabLabels = {
    [TABS.current]: 'Current Events',
    [TABS.past]: 'Past Events',
    [TABS.myEvents]: 'My Events',
  };

  const tabActive = {
    [TABS.current]: true,
    [TABS.past]: true,
    [TABS.myEvents]: isLoggedIn,
  };

  return (
    <div className={styles.statusPicker}>
      {Object.keys(TABS).map((tabName, index) => tabActive[tabName] && (
        <button
          type="button"
          className={classNames(
            styles.tabButton,
            activeTab === tabName && styles.tabButtonActive
          )}
          onClick={() => setSelection(tabName)}
          key={index}
        >
          {tabLabels[tabName]}
        </button>
      ))}
      {/* <SuggestEventButton externalClassNames={[styles.suggestEventButton]} /> */}
    </div>
  );
};

export default StatusTabs;
