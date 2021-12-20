import { TOKEN_NAME } from "constants/Token";
import React, { useState } from "react";
import walletImage from "../../data/icons/wallet.png";
import { numberWithCommas } from "../../utils/common";
import TokenTransfer from "../TokenTransfer";
import styles from "./styles.module.scss";

const TransferButton = ({
  balance,
  provider,
  hash,
  setter,
  setBlocked,
  showCancel = false,
}) => {
  const [tokenAreaOpen, setTokenAreaOpen] = useState(false);

  if (tokenAreaOpen) {
    return (
      <TokenTransfer
        provider={provider}
        hash={hash}
        setter={setter}
        showCancel={showCancel}
        balance={balance}
        setTokenAreaOpen={setTokenAreaOpen}
      />
    );
  }
  if (balance > 0 && !tokenAreaOpen) {
    return (
      <button
        className={styles.transferButton}
        onClick={() => {
          setBlocked(true);
          setTokenAreaOpen(true);
        }}
      >
        <img src={walletImage} alt={`Wallet`} />
        Transfer {numberWithCommas(Math.floor(balance))} {TOKEN_NAME}
      </button>
    );
  }

  return null;
};
export default TransferButton;
