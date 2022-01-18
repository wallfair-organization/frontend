import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as LeftArrow } from '../../../data/icons/deposit/left-arrow.svg';
import PopupTheme from 'components/Popup/PopupTheme';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import { trackWalletFiatProceedPartner } from 'config/gtm';
import {
  generateMoonpayUrl,
} from 'api';
import { TransactionActions } from 'store/actions/transaction';
import Loader from '../../Loader/Loader';

const DepositMoonpay = ({
  user,
  showWalletDepositPopup,
  fetchWalletTransactions,
}) => {
  const [loading, setLoading] = useState(false);
  const [widgetUrl, setWidgetUrl] = useState(false);

  useEffect(() => {
    fetchWalletTransactions();
    getMoonpayUrl();
    trackWalletFiatProceedPartner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBackButton = () => {
    return (
      <div
        className={styles.chooseOtherMethod}
        onClick={showWalletDepositPopup}
      >
        <LeftArrow />
        <span>Other payment methods</span>
      </div>
    );
  };

  const getMoonpayUrl = async () => {
    setLoading(true);
    const res = await generateMoonpayUrl();

    if (res.response.data.url) {
      setWidgetUrl(res.response.data.url);
    }
    setLoading(false);
  };

  return (
    <div className={styles.depositFiat}>
      {renderBackButton()}

      {loading && !widgetUrl ? (
        <Loader />
      ) : (
        <iframe
          allow="accelerometer; autoplay; camera; gyroscope; payment"
          title="moonpay"
          src={widgetUrl}
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showWalletDepositPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
  };
};

export default connect(null, mapDispatchToProps)(DepositMoonpay);
