export const isMetamask =
  (window.ethereum &&
    window.ethereum.isMetaMask &&
    !(window.ethereum.isMathWallet || window.ethereum.isMew)) ||
  false;
