import React from 'react';
import styles from './styles.module.scss';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';

import WithdrawTab from './Tabs/WithdrawTab';

const WalletBuyWfairPopup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.activityContainer}>
        <WithdrawTab />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.popupType === PopupTheme.walletBuyWfair &&
      state.popup.visible,
  };
};

export default connect(mapStateToProps, null)(WalletBuyWfairPopup);
