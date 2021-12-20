import styles from './styles.module.scss';
import { ReactComponent as ConfettiLeft } from '../../../data/icons/confetti-left.svg';
import { ReactComponent as ConfettiRight } from '../../../data/icons/confetti-right.svg';
// import AddTokens from "../../AddTokens";
import WfairLogo from '../../../data/images/wfair-logo-splash.png';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';
import {NETWORK_TYPES} from 'utils/constants';
import { TOKEN_NAME } from 'constants/Token';
import Button from 'components/Button';

const Success = ({
  setModalOpen,
  canAddToken,
  hash,
  setTokenAreaOpen,
  notActiveNetwork,
  transactionAmmount,
}) => {
  const updateModalAndArea = () => {
    if (setTokenAreaOpen && typeof setTokenAreaOpen === 'function') {
      setTokenAreaOpen(false);
    }
    setModalOpen(false);
  };
  const network  = Object.values(NETWORK_TYPES).find(network => network !== notActiveNetwork);
  return (
    <div className={styles.withdrawalSuccess}>
      <span>
        <img src={WfairLogo} className={styles.logo} alt="Wallfair logo" />
      </span>
      <div className={styles.title}>Transaction completed</div>
      <div className={styles.content}>
        {/* <div className={styles.message}>
          You will receive {Number(calculatedAmount).toFixed(2)} {currency} on your Wallet
        </div> */}

        <div className={styles.info}>
          Your deposit transaction completed successfully and the funds will be
          available in your balance in a couple of minutes.
        </div>

        {/*  */}
          <span className={styles.referralLinkContainer}>
            <p>Transaction Id: {' '}</p>
            <div className={styles.referralWrapper}>
            <ReferralLinkCopyInputBox
              className={styles.referralLink}
              inputTheme={InputBoxTheme.copyToClipboardInputWhite}
              forDeposit={hash}
            />
            </div>
          </span>
      </div>

      <div className={styles.summary}>
        <div className={styles.row}>
          <div className={styles.key}>Network</div>
          <div className={styles.value}>{network}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>Amount</div>
          <div className={styles.value}>{transactionAmmount} {TOKEN_NAME}</div>
        </div>
      </div>

      <Button
        // className={styles.keepGoing}
        onClick={() => {
          updateModalAndArea();
        }}
      >
        Go Back To Wallet!
      </Button>
    </div>
  );
};

// {notActiveNetwork === 'Polygon'? 'Polygonscan' : 'Etherscan'}

export default Success;
