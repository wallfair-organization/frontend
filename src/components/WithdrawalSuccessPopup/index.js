import { TOKEN_NAME } from 'constants/Token';
import styles from './styles.module.scss';
import WfairLogo from '../../data/images/wfair-logo-splash.png';

const WithdrawalSuccessPopup = ({ 
  network,
  calculatedAmount,
  currency,
  wfairAmount,
  fiatEquivalence,
  fee
}) => {

  

  return (
    <div className={styles.withdrawalSuccess}>
      <img src={WfairLogo} className={styles.logo} />
      <div className={styles.title}>Withdrawal Request Received</div>
      {/* <div className={styles.subtitle}>Withdrawal Successfully Processed</div> */}
      <div className={styles.content}>
        <div className={styles.message}>
          You will receive {Number(calculatedAmount).toFixed(2)} {currency} on your Wallet
        </div>
        <div className={styles.info}>
          Be aware that the transaction might take 2-5 minutes
        </div>
      </div>
      <div className={styles.summary}>
        <div className={styles.row}>
          <div className={styles.key}>Network</div>
          <div className={styles.value}>{network}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>Amount</div>
          <div className={styles.value}>{wfairAmount} {TOKEN_NAME}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>Transaction fee</div>
          <div className={styles.value}>{Number(fee).toFixed(2)}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>You receive</div>
          <div className={styles.value}>{Number(calculatedAmount).toFixed(2)}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>Estimated value in USD</div>
          <div className={styles.value}>${fiatEquivalence}</div>
        </div>
      </div>

      {/* <a
        href='https://www.polygonscan.com/'
        target='_blank'
        className={styles.blockchainLink} rel="noreferrer"
      >
        <span className={styles.text}>
          View on polygonscan
        </span>
      </a> */}
    </div>
  )
};

export default WithdrawalSuccessPopup;