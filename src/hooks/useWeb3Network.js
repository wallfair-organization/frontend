import { useEffect, useState } from "react";
import { currentNetwork as network, currentChainId as currentChain, networkInfo } from '../config/config';
import { useWeb3React } from '@web3-react/core';

const useWeb3Network = () => {
  const [currentNetwork, setCurrentNetwork] = useState(network);
  const [currentChainId, setCurrentChainId] = useState(currentChain);

  const { chainId } = useWeb3React();

  useEffect(() => {
    setCurrentChainId(chainId);
    const network = Object.keys(networkInfo).find(
      value => parseInt(networkInfo[value].chainId) === parseInt(chainId)
    );
    setCurrentNetwork(networkInfo[network]);

  }, [chainId, currentNetwork, setCurrentNetwork, setCurrentChainId]);

  return {
    currentNetwork,
    currentChainId,
  }
};

export default useWeb3Network;