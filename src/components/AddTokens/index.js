import styles from "./styles.module.scss";
import MetaMaskIcon from "../../data/icons/wallet/metamask.svg";
import classNames from "classnames";
import { addMetaMaskEthereum } from "../../utils/helpers/ethereum";
import { useCallback } from "react";

const AddTokens = ({ onFurtherClick, className }) => {

  const handleClick = useCallback(async (event) => {
    await addMetaMaskEthereum();
  }, []);

  return (
    <div className={classNames(styles.buttonWrapper, className)}>
      <button
        className={styles.addToken}
        onClick={handleClick}
      >
        <img src={MetaMaskIcon} alt={`MetaMask`} />
        <img src="https://files.wallfair.io/token-logo/wfair_256.png" alt={`WFAIR Logo`} />
        <span>Add WFAIR to Metamask</span>
      </button>
    </div>
  );
};
export default AddTokens;
