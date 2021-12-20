import React, { useState } from 'react';
import styles from './styles.module.scss';
import PopupTheme from '../Popup/PopupTheme';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { UserActions } from '../../store/actions/user';
import TabOptions from 'components/TabOptions';
import Grid from '@material-ui/core/Grid';
import DepositTab from './Tabs/DepositTab';
import BuyWithFiatTab from './Tabs/BuyWithFiatTab';
import BuyWithCrypto from './Tabs/BuyWithCrypto';
import BuyWithFiatWallfairWebsiteTab from './Tabs/BuyWithFiatWallfairWebsiteTab';

const showNewFeatures = process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true';

const RenderTabs = ({ type = 0 , hidePopup}) => {
  const selectTabsComponent = type => {
    switch (type) {
      case 0:
      default:
        return <DepositTab />;
      case 1:
        return <BuyWithFiatWallfairWebsiteTab hidePopup={hidePopup} />;
        // return showNewFeatures ? <BuyWithFiatTab hidePopup={hidePopup} /> : <BuyWithFiatWallfairWebsiteTab hidePopup={hidePopup} />;
      case 2:
        return <BuyWithCrypto />;
    }
  };

  return selectTabsComponent(type);
};


const WalletBuyWfairPopup = ({ hidePopup, requestTokens }) => {
  const [activeTab, setActiveTab] = useState({
    name: 'DEPOSIT',
    index: 0,
  });
  const tabOptions = [
    { name: 'DEPOSIT', index: 0 },
    { name: 'Buy WFAIR', index: 1 },
    { name: 'BUY WITH CRYPTO', index: 2 },
  ].filter(({ name }) => showNewFeatures || name !== 'BUY WITH CRYPTO');
  
  const handleSwitchTab = ({ index }) => {
    setActiveTab(tabOptions[index]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.activities}>
        <Grid item xs={12}>
          <div className={styles.activityWrapper}>
            <TabOptions options={tabOptions} className={styles.tabLayout}>
              {option => (
                <div
                  className={
                    option.index === activeTab.index
                      ? styles.tabItemSelected
                      : styles.tabItem
                  }
                  onClick={() => handleSwitchTab(option)}
                >
                  {option.name}
                </div>
              )}
            </TabOptions>
          </div>
        </Grid>
      </div>
      <div className={styles.activityContainer}>
        <RenderTabs type={activeTab.index} hidePopup={hidePopup} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    requestTokens: () => {
      dispatch(UserActions.requestTokens());
    },
  };
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.popupType === PopupTheme.walletBuyWfair &&
      state.popup.visible,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletBuyWfairPopup);
