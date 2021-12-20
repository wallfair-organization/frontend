import { ethers } from "ethers";
import WFAIRAbi from "../../config/abi/WFAIRToken.json";
import SafeCall from "../SafeContractCall";

const WFAIRTransfer = ({
  provider,
  setter,
  contractAddress,
  tokenAmount,
  to_address: toAddress,
  setBlocked,
  setTXSuccess,
  setModalOpen,
  setformError,
}) => {
  if (!ethers.utils.isAddress(toAddress)) {
    setformError("Invalid Address");
    return;
  } else if (tokenAmount === "0") {
    setformError("Invalid Token Amount");
    return;
  } else {
    setModalOpen(true);
  }

  provider.getGasPrice().then(async (currentGasPrice) => {
    let gas_price = ethers.utils.formatUnits(currentGasPrice, 9);
    console.log("Gas price in Gwei:", gas_price);

    const signer = provider?.getSigner();
    const wfairToken = new ethers.Contract(
      contractAddress,
      WFAIRAbi.abi,
      signer
    );

    // .5 => 0.5 || 6. => 6.0
    tokenAmount =
      String(tokenAmount).split(".")[0] === ""
        ? "0" + tokenAmount
        : String(tokenAmount).split(".")[1] === ""
        ? tokenAmount + "0"
        : tokenAmount;

    wfairToken
      .transfer(toAddress, ethers.utils.parseEther(String(tokenAmount))) // transfer tokens
      .then((tx) => {
        // Waiting for transaction receipt
        SafeCall({
          tx: tx,
          callback: (success) => {
            console.log("SafeCall -> callback()", success);
            setTXSuccess(success);
            setBlocked(false);
            setter(tx.hash);
          },
          setter: setter,
        });
      })
      .catch((err) => {
        // Transaction did fail, unblocking
        setter("Tx Failed");
        setBlocked(false);
      });
  });
};

export default WFAIRTransfer;
