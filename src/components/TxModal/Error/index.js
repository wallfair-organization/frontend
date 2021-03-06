import PopupTheme from "components/Popup/PopupTheme";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PopupActions } from "store/actions/popup";
import { currentNetwork } from "../../../config/config";
import styles from "./styles.module.scss";
import WfairLogo from '../../../data/images/wfair-logo-splash.png';


const Error = ({ setModalOpen, hash, showWalletBuyWfairPopup, notActiveNetwork, currency }) => {

  const [mainUrl, setMainUrl] = useState()
  const [mainLabel, setMainLabel] = useState();


  useEffect(() => {
    const networkSelected = currentNetwork();
    setMainUrl(networkSelected.explorer);
    setMainLabel(networkSelected.label);
  }, []);

  return (
    <div className={styles.promoMessage}>
      <span>
        <img src={WfairLogo} className={styles.logo} alt="Wallfair logo" />
      </span>
      <div className={styles.title}>Transaction failed</div>
      <div className={styles.content}>
        <div className={styles.message}>
          Your transaction failed.
        </div>
        <div className={styles.info}>
          Please try again or contact our support team in case you need help.
        </div>
      </div>
      {hash && (
        <>
          <p>
            You can check details on {' '}
            {notActiveNetwork !== 'Polygon'? 'Polygonscan' : 'Etherscan'}
            <br />
            <strong
              onClick={() => {
                window.open(`${mainUrl}tx/${hash}`, "_blank");
              }}
            >
              View on {' '}
            {notActiveNetwork !== 'Polygon'? 'Polygonscan' : 'Etherscan'}
            </strong>
          </p>
          <br />
        </>
      )}
      <button
        className={styles.keepGoing}
        onClick={() => {
          setModalOpen(false);
          showWalletBuyWfairPopup(currency);
        }}
      >
        Close
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showWalletBuyWfairPopup: (currency) => {
      dispatch(PopupActions.show({
        popupType: PopupTheme.walletConnectWallet,
        options: { currency }
      }));
    },
  };
};


export default connect(null, mapDispatchToProps)(Error);
