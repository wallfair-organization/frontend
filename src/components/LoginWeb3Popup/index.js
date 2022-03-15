import { useWeb3React } from '@web3-react/core';
import { loginWeb3Challenge, loginWeb3 } from 'api';
import ConnectWallet from 'components/ConnectWallet/ConnectWallet';
import Loader from 'components/Loader/Loader';
import UsernameInput from 'components/UsernameInput';
import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { AuthenticationActions } from 'store/actions/authentication';
import { PopupActions } from 'store/actions/popup';
import * as crashGameApi from '../../api/crash-game';
import * as Api from '../../api';
import { useLocation } from 'react-router-dom';
import { trackSignup } from 'config/gtm';

const LoginWeb3Popup = ({ loginSuccess, loginFailed, hidePopup }) => {
  const { active, library, account, deactivate } = useWeb3React();

  const [processing, setProcessing] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [username, setUsername] = useState('');
  const [signResponse, setSignResponse] = useState();
  const [challenge, setChallenge] = useState();

  const signer = library?.getSigner();

  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const ref = localStorage.getItem('urlParam_ref') || params.get('ref');
  const sid = localStorage.getItem('urlParam_sid') || params.get('sid');
  const cid = localStorage.getItem('urlParam_cid') || params.get('cid');

  const loginSuccessful = (res) => {
    Api.setToken(res.session);
    crashGameApi.setToken(res.session);
    loginSuccess({
      session: res.session,
      userId: res.userId,
      admin: res.admin,
      shouldAcceptToS: res.shouldAcceptToS,
    });
  }

  const signUp = () => {
    loginWeb3({
      address: account,
      signResponse,
      challenge,
      username,
      ref,
      sid,
      cid,
    }).then(res => {
      localStorage.removeItem('urlParam_ref');
      localStorage.removeItem('urlParam_sid');
      localStorage.removeItem('urlParam_cid');
      loginSuccessful(res);
      trackSignup('web3');
    }).catch(e => {
      console.error(e);
      deactivate();
      setProcessing(false);
      hidePopup();
      loginFailed('Login failed');
    });
  }

  const loginChallenge = async () => {
    try {
      setProcessing(true);
      const response = await loginWeb3Challenge(account);
      const signResponse = await signer.signMessage(response.challenge);
      if (response.existing) {
        const loginResponse = await loginWeb3({
          address: account,
          signResponse,
          challenge: response.challenge,
        });
        setProcessing(false);
        loginSuccessful(loginResponse);
      } else {
        setShowUsername(true);
        setSignResponse(signResponse);
        setChallenge(response.challenge);
      }
    } catch (e) {
      console.error(e);
      deactivate();
      setProcessing(false);
    }
  };  

  useEffect(() => {
    async function checkActive() {
      if (active) {
        await loginChallenge();
      }
    }
    checkActive();
  }, [account, active]);

  return (
    <>
      {processing && <Loader />}
      {showUsername ? 
        <UsernameInput onSubmit={signUp} updateUsername={setUsername} buttonText='Sign up' /> : 
        <ConnectWallet/>}
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: data => {
      dispatch(AuthenticationActions.loginSuccess(data));
    },
    loginFailed: msg => {
      dispatch(AuthenticationActions.loginFail(msg));
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginWeb3Popup);