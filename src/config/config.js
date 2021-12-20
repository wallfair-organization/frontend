import actions from './actions.json';

export const networkInfo = {
  mainnet: {
    chainId: 1,
    explorer: 'https://etherscan.io/',
    label: 'Mainnet',
    url: 'https://mainnet.infura.io/v3/f6acacf850c94276afe2351e85f61414',
    apiExplorer: 'https://api.etherscan.io/api',
    contractAddress: actions.default.production.ethereum,
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
  },
  rinkeby: {
    chainId: 4,
    explorer: 'https://rinkeby.etherscan.io/',
    label: 'Rinkeby',
    url: 'https://rinkeby.infura.io/v3/f6acacf850c94276afe2351e85f61414',
    apiExplorer: 'https://api-rinkeby.etherscan.io/api',
    contractAddress: actions.default.development.ethereum,
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
  },
  localhost: {
    chainId: 1337,
    explorer: '',
    label: 'Local Network',
    url: 'http://localhost:8545',
    apiExplorer: 'https://api.etherscan.io/api',
    contractAddress: actions.default.development.ethereum,
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
  },
  goerli: {
    chainId: 5,
    explorer: 'https://goerli.etherscan.io/',
    label: 'Goerli',
    url: 'https://goerli.infura.io/v3/f6acacf850c94276afe2351e85f61414',
    apiExplorer: 'https://api-goerli.etherscan.io/api',
    contractAddress: actions.default.development.ethereum,
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
  },
  polygon: {
    chainId: 137,
    explorer: 'https://polygonscan.com/',
    label: 'Polyscan',
    url: 'https://polygon-rpc.com',
    apiExplorer: 'https://polygon-rpc.com',
    contractAddress: actions.default.production.polygon,
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
  },
  mumbai: {
    chainId: 80001,
    explorer: 'https://mumbai.polygonscan.com/',
    label: 'Mumbai Testnet',
    url: 'https://rpc-mumbai.maticvigil.com/',
    apiExplorer: 'https://api-testnet.polygonscan.com/api',
    contractAddress: actions.default.staging.polygon,
    nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
  },
  kovan: {
    chainId: 42,
    explorer: 'https://kovan.etherscan.io/',
    label: 'Kovan',
    url: 'https://kovan.infura.io/v3/f6acacf850c94276afe2351e85f61414',
    apiExplorer: 'https://api-kovan.etherscan.io/api',
    contractAddress: actions.default.staging.ethereum,
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
  },
};

export const currentChainId = async () => {
  const currentChainSelected = await window?.ethereum?.networkVersion;
  return currentChainSelected;
};

export const currentNetwork = async () => {
  const currentChainSelected = await window?.ethereum?.networkVersion;

  const currentNetworkKey = Object.keys(networkInfo).find(
    value =>
      parseInt(networkInfo[value].chainId) === parseInt(currentChainSelected)
  );
  return networkInfo[currentNetworkKey];
};

export const getNetworkInfoByChainId = (chainId) => {
  const networkKey = Object.keys(networkInfo).find(
    value => parseInt(networkInfo[value].chainId) === parseInt(chainId)
  );

  return networkInfo[networkKey];
}

export const WFAIRAddress = async () => {
  const network = await currentNetwork();
  return network?.contractAddress;
};

