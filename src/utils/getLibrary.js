import { Web3Provider } from '@ethersproject/providers';

const getLibrary = provider => {
  const chainId =
    typeof provider.chainid === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any';
  const library = new Web3Provider(provider, chainId);

  library.pollingInterval = 15_000;
  return library;
};

export default getLibrary;
