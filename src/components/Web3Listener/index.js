import { useWeb3React } from "@web3-react/core";
import authState from "constants/AuthState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticationActions } from "store/actions/authentication";

const Web3Listener = () => {
  const authenticationState = useSelector(state => state.authentication.authState);
  const dispatch = useDispatch();

  const handleWeb3AccountChange = (accounts = []) => {
    console.log('Web3 account changed: ', accounts);
    dispatch(AuthenticationActions.logout());
  };

  useEffect(() => {
    window.ethereum?.removeListener('accountsChanged', handleWeb3AccountChange);

    if (authenticationState === authState.LOGGED_IN) {
      console.log('Listening for accounts change');
      window.ethereum?.on('accountsChanged', handleWeb3AccountChange);
    }
  
    return () => {
      window.ethereum?.removeListener(
        'accountsChanged',
        handleWeb3AccountChange
      );
    }
  }, [authenticationState]);

  return null;
};

export default Web3Listener;