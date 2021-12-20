import styles from "./styles.module.scss";
import WfairLogo from 'data/images/wfair-logo-splash.png';


const WithdrawalErrorPopup = ({errorMessage = "Something went wrong.", closeTransactionFailed }) => {

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
          {errorMessage}
        </div>
      </div>
          <p>
            Please try again or contact our support team in case you need help.
          </p>
      <button
        className={styles.keepGoing}
        onClick={() => {closeTransactionFailed(false)}}
      >
        Close
      </button>
    </div>
  );
};

export default WithdrawalErrorPopup;
