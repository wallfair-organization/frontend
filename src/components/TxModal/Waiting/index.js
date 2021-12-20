import { useEffect, useState } from 'react';

import { currentNetwork } from '../../../config/config';
import Loader from '../../Loader/Loader';
import styles from './styles.module.scss';
import WfairLogo from '../../../data/images/wfair-logo-splash.png';
import ReferralLinkCopyInputBox from 'components/ReferralLinkCopyInputBox';
import InputBoxTheme from 'components/InputBox/InputBoxTheme';

const Waiting = ({ setModalOpen, hash, action, notActiveNetwork }) => {
  const [mainUrl, setMainUrl] = useState();
  const [mainLabel, setMainLabel] = useState();

  useEffect(() => {
    const updatedNetwork = async () => {
      const networkSelected = await currentNetwork();
      setMainUrl(networkSelected.explorer);
      setMainLabel(networkSelected.label);
    };
    updatedNetwork();
  }, []);

  return (
    <div className={styles.promoMessage}>
      <span>
        <img src={WfairLogo} className={styles.logo} alt="Wallfair logo" />
      </span>
      <div className={styles.title}>Waiting for confirmation</div>
      <div className={styles.content}>
        {/* <div className={styles.message}>
          You will receive {Number(calculatedAmount).toFixed(2)} {currency} on your Wallet
        </div> */}
        {hash ? (
          <div className={styles.info}>
            The Transaction started processing and the details should be
            available on Polygonscan/Etherscan on the link below. It might take
            a couple of seconds for the details to be available.
          </div>
        ) : (
          <div className={styles.info}>
            Please check and confirm the transaction on your wallet (i.e.
            Metamask) to continue with the process. As soon as the transaction
            proceeds, the transaction hash will be shown.
          </div>
        )}

        {hash && hash !== 'Tx Failed' ? (
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
        ) : null}
      </div>
      {/* <p>{action}</p> */}
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
      <Loader />
    </div>
  );
};

export default Waiting;
