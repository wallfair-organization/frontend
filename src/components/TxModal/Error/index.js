import PopupTheme from "components/Popup/PopupTheme";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PopupActions } from "store/actions/popup";
import { currentNetwork } from "../../../config/config";
import styles from "./styles.module.scss";
import WfairLogo from '../../../data/images/wfair-logo-splash.png';


const Error = ({ setModalOpen, hash, showWalletBuyWfairPopup, notActiveNetwork }) => {

  const [mainUrl, setMainUrl] = useState()
  const [mainLabel, setMainLabel] = useState();


  useEffect(() => {
    const updatedNetwork = async () => {
      const networkSelected = await currentNetwork()
      setMainUrl(networkSelected.explorer)
      setMainLabel(networkSelected.label);
    }
    updatedNetwork()
  }, [])

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
          showWalletBuyWfairPopup();
        }}
      >
        Close
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showWalletBuyWfairPopup: () => {
      dispatch(PopupActions.show({ popupType: PopupTheme.walletBuyWfair }));
    },
  };
};


export default connect(null, mapDispatchToProps)(Error);
