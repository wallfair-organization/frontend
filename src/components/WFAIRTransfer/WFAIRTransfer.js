import { confirmDeposit } from "api";
import { ethers } from "ethers";
import WFAIRAbi from "../../config/abi/WFAIRToken.json";
import SafeCall from "../SafeContractCall";

const WFAIRTransfer = ({
  provider,
  setter,
  contractAddress,
  tokenAmount,
  currency,
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

    // .5 => 0.5 || 6. => 6.0
    tokenAmount =
      String(tokenAmount).split(".")[0] === ""
        ? "0" + tokenAmount
        : String(tokenAmount).split(".")[1] === ""
        ? tokenAmount + "0"
        : tokenAmount;

    const transfer = contractAddress
      ? new ethers.Contract(contractAddress, WFAIRAbi.abi, signer).transfer(
          toAddress,
          ethers.utils.parseEther(String(tokenAmount))
        )
      : signer.sendTransaction({
          to: toAddress,
          value: ethers.utils.parseEther(String(tokenAmount)),
        }); // transfer tokens
    transfer
      .then(tx => {
        // Waiting for transaction receipt
        SafeCall({
          tx,
          callback: success => {
            console.log('SafeCall -> callback()', success);
            
            if (contractAddress) {
              setTXSuccess(success);
              setter(tx.hash);
            } else {
              confirmDeposit({
                hash: tx.hash,
                networkCode: currency,
              }).then(() => {
                setTXSuccess(success);
                setter(tx.hash);
              }).catch(() => {
                setter('Deposit confirmation failed');
              });
            }

            setBlocked(false);
          },
          setter: setter,
        });
      })
      .catch(err => {
        // Transaction did fail, unblocking
        setter('Tx Failed');
        setBlocked(false);
      });
  });
};

export default WFAIRTransfer;
