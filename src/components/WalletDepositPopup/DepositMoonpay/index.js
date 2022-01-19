import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ReactComponent as LeftArrow } from '../../../data/icons/deposit/left-arrow.svg';
import PopupTheme from 'components/Popup/PopupTheme';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import { trackWalletFiatProceedPartner } from 'config/gtm';
import { generateMoonpayUrl } from 'api';
import { TransactionActions } from 'store/actions/transaction';
import Loader from '../../Loader/Loader';
import moonPayLogo from '../../../data/icons/footer/moon-pay-logo.png';

const DepositMoonpay = ({
  showWalletDepositPopup,
  fetchWalletTransactions,
  amount,
  currency,
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
        <span>Back</span>
      </div>
    );
  };

  const getMoonpayUrl = async () => {
    setLoading(true);
    const res = await generateMoonpayUrl({
      amount: amount,
      currency: currency,
    });

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
        <>
          <iframe
            allow="accelerometer; autoplay; camera; gyroscope; payment"
            title="moonpay"
            src={widgetUrl}
            width="100%"
            height="650"
            frameborder="0"
          ></iframe>

          <div className={styles.widgetFooter}>
            <p>Powered by</p>
            <img
              src={moonPayLogo}
              className={styles.moonpayLogo}
              alt={'MoonPay logo'}
            />
          </div>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showWalletDepositPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDepositFiat }));
    },
    fetchWalletTransactions: () => {
      dispatch(TransactionActions.fetchWalletTransactions());
    },
  };
};

export default connect(null, mapDispatchToProps)(DepositMoonpay);
