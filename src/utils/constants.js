import { ethers } from 'ethers';

const environment = process.env.REACT_APP_ENVIRONMENT;// 'staging' or 'production';
const netWorkTypes = { ETH: 'Ethereum', POLY: 'Polygon' };
const networkIds = {
  mainPolygon: '0x89',
  mainEthereum: '0x1',
  mumbia: '0x13881',
  kovan: '0x2a',
  rinkeby: '0x4',
};
const netWorkSelectionChoice = {
  "Ethereum": ["0x1", "0x2a"],
  "Polygon": ["0x89", "0x13881"]
}

const environmentNetwork = {
  production: {
    [networkIds.mainPolygon]: 'Polygon',
    [networkIds.mainEthereum]: 'Ethereum',
  },
  staging: {
    [networkIds.mumbia]: 'Polygon',
    [networkIds.kovan]: 'Ethereum',
  },
  development: {
    [networkIds.mumbia]: 'Polygon',
    [networkIds.kovan]: 'Ethereum',
  },
};

const getNetworkOnEnviroment = () => {
  switch (environment) {
    case 'production':
      return environmentNetwork.production;
    case 'staging':
      return environmentNetwork.staging
    case 'development':
      return environmentNetwork.development;
    default:
      return environmentNetwork.staging;
  }
};

export const toBN = ethers.BigNumber.from;
export const ZERO = toBN('0');
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const IS_IN_IFRAME = window.parent !== window;
export const SWITCH_NETWORKS = getNetworkOnEnviroment();
export const NETWORK_TYPES = netWorkTypes;
export const ENV_NETWORK = environmentNetwork[environment];
export const networkSelection = (chainId) => {
  for (const key in netWorkSelectionChoice) {
    const chainIdExist  = netWorkSelectionChoice[key].includes(chainId);
    if(chainIdExist) return key;
  }
  return '';
}

export const EXPLORERS = {
  staging: {
    ETH: 'https://kovan.etherscan.io/tx/',
    MATIC: 'https://mumbai.polygonscan.com/tx/',
  },
  production: {
    ETH: 'https://etherscan.io/tx/',
    MATIC: 'https://polygonscan.com/tx/',
  },
};

export const CRYPTOS_EXPLORERS = {
  staging: {
    ETH: 'https://goerli.etherscan.io/tx/',
    LTC: 'https://blockexplorer.one/litecoin/testnet/tx/',
    BTC: 'https://www.blockchain.com/btc-testnet/tx/',
  },
  production: {
    ETH: 'https://etherscan.io/tx/',
    LTC: 'https://blockexplorer.one/litecoin/mainnet/tx/',
    BTC: 'https://www.blockchain.com/btc/tx/',
  },
};

export const getTransactionURL = (network, txHash) => {
  const environment = process.env.REACT_APP_ENVIRONMENT;
  return `${EXPLORERS[environment][network]}${txHash}`;
};

export const getCryptosTransactionURL = (network, txHash) => {
  const environment = process.env.REACT_APP_ENVIRONMENT;
  return `${CRYPTOS_EXPLORERS[environment][network]}${txHash}`;
};
