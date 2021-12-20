import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
// import { TrezorConnector } from '@web3-react/trezor-connector';
// import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { networkInfo } from './config';

const urls = Object.values(networkInfo).reduce(
  (obj, n) => Object.assign(obj, { [n.chainId]: n.url }),
  {}
);
const chainIds = Object.values(networkInfo).map(i => i.chainId);

export const gnosisSafe = new SafeAppConnector(chainIds);

export const injected = new InjectedConnector({
  supportedChainIds: chainIds,
});

export const walletconnect = new WalletConnectConnector({
  rpc: urls,
  qrcode: true,
});
