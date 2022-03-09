import { useWeb3React } from '@web3-react/core';
import { loginWeb3Challenge, loginWeb3 } from 'api';
import ConnectWallet from 'components/ConnectWallet/ConnectWallet';
import Loader from 'components/Loader/Loader';
import { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.scss';

const LoginWeb3Popup = () => {
  const { active, library, account, deactivate } = useWeb3React();

  const [processing, setProcessing] = useState(false);

  const signer = library?.getSigner();

  const login = async () => {
    try {
      setProcessing(true);
      const response = await loginWeb3Challenge(account);
      debugger;
      const signResponse = await signer.signMessage(response.challenge);
      await loginWeb3({
        address: account,
        signResponse,
        challenge: response.challenge,
      });
    } catch (e) {
      console.error(e);
      deactivate();
    } finally {
      setProcessing(false);
    }
  };

  // const loginCallback = useCallback(
  //   async () => {
  //     if (account && active) {
  //       await login();
  //     }
  //   },
  //   [account, active],
  // );
  

  useEffect(() => {
    async function checkActive() {
      if (active) {
        await login();
      }
    }

    checkActive();
  }, [account, active]);

  return (
    <>
      {/* {processing && <Loader />} */}
      <ConnectWallet />
    </>
  );
};

export default LoginWeb3Popup;