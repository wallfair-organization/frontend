import React from 'react';
import styles from './styles.module.scss';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';

import DepositSelection from './DepositSelection';
import DepositCrypto from './DepositCrypto';
import DepositFiat from './DepositFiat';
import DepositToken from './DepositToken';
import WithdrawTab from 'components/WalletBuyWfairPopup/Tabs/WithdrawTab';

const WalletDepositPopup = ({visible, type, amount, currency}) => {

  const renderContent = () => {
    switch (type) {
      case PopupTheme.walletDepositCrypto:
        return <DepositCrypto />;
      case PopupTheme.walletDepositFiat:
        return <DepositFiat />;
      case PopupTheme.walletConnectWallet:
        return <DepositToken />;
      case PopupTheme.walletWithdraw:
        return <WithdrawTab />
      default:
        return <DepositSelection />;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {renderContent()}
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

export default connect(mapStateToProps, null)(WalletDepositPopup);
