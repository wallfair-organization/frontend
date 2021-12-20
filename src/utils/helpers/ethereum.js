import { getNetworkInfoByChainId, WFAIRAddress } from "../../config/config";

export const switchMetaMaskNetwork = async (switchTo) => {
  const { ethereum } = window;
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: switchTo }], // chainId must be in hexadecimal numbers
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      const networkInfo = getNetworkInfoByChainId(switchTo);
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            { 
              chainId: switchTo, 
              rpcUrls: [networkInfo.url],
              chainName: networkInfo.label,
              nativeCurrency: networkInfo.nativeCurrency,
              blockExplorerUrls: [networkInfo.apiExplorer],
              iconUrls: [""],
            }],
        });
      } catch (addError) {
        console.error(`Error adding ${networkInfo.label} network`);
      }
    }
  }
};

export const addMetaMaskEthereum = async () => {
  const { ethereum } = window;
  const tokenAddr = await WFAIRAddress();
  try {
    await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddr,
          'symbol': 'WFAIR',
          decimals: 18,
          image: 'https://files.wallfair.io/token-logo/wfair_256.png',
        },
      },
    });
  } catch (error) {
    console.error(`Error adding WFAIR to Metamask`, error);
    window.location.reload();
  }
};
