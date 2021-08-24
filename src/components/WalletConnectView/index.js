import _                   from 'lodash';

import Icon                from '../Icon';

import IconType            from '../Icon/IconType';
import React               from 'react';
import styles              from './styles.module.scss';
import { connect }         from 'react-redux';
import Button              from '../Button';
import HighlightType       from '../Highlight/HighlightType';
import { PopupActions }    from '../../store/actions/popup';

import { bindWalletAddress } from '../../api';

import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";
import Fortmatic from "fortmatic";

import Web3 from "web3";
import Web3Modal from "web3modal";

const providerOptions = {
    portis: {
        package: Portis, // required
        options: {
          id: "e9b2f4a4-b5b9-46f8-b43d-b70274f8caab" // required
        }
      },
      fortmatic: {
        package: Fortmatic, // required
        options: {
          key: "pk_live_18421F7244DE9EA6" // required
        }
      },
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "INFURA_ID" // required
        }
      }
  };

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: false, // optional
    disableInjectedProvider: false,
    providerOptions, // required
    theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
  });

  web3Modal.clearCachedProvider();

const WalletConnectView = ({ user, hidePopup }) => {
    const connectWallet = async () => {
        hidePopup();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);

        if(provider.isWalletConnect)
            setAccount(provider.accounts[0]);
        else if(provider.isFortmatic)
            await web3.eth.getAccounts((r,t) => setAccount(t[0]));
        else if(provider.isPortis)
            setAccount(web3.eth.accounts[0]);
        else if(provider.isMetaMask)
            setAccount(provider.selectedAddress);
    }

    const setAccount = (account) => {
        bindWalletAddress(account);
    }

    const renderHeadline = () => {
        const name = _.get(user, 'name');

        return (
            <span className={styles.welcomeHeadline}>
                Connect Your Wallet
            </span>
        );
    };

    const renderWalletConnectText = () => {
        return (
            <div className={styles.welcomeTextContainer}>
                <span className={styles.welcomeTextText}>
                    today for full Wallfair experience!
                </span>
            </div>
        );
    };

    const renderConnectWalletButton = () => {
        return (
            <Button
                highlightType={HighlightType.highlightHomeCtaBet}
                withoutBackground={true}
                onClick={connectWallet}
            >
                Connect Wallet
            </Button>
        );
    };

    return (
        <div className={styles.welcomeContainer}>
            <span className={styles.welcomeConfettiLeft}>
                <Icon iconType={IconType.confettiLeft} iconTheme={null} />
            </span>
            <span className={styles.welcomeConfettiRight}>
                <Icon iconType={IconType.confettiRight} iconTheme={null} />
            </span>
            {renderHeadline()}
            {renderWalletConnectText()}
            {renderConnectWalletButton()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.authentication,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hidePopup: () => {
            dispatch(PopupActions.hide());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WalletConnectView);
