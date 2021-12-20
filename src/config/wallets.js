import {
  walletconnect,
  injected,
  gnosisSafe,
  // trezor,
  walletlink,
} from './connectors';
// import TrezorIcon from '../data/icons/wallet/trezor.svg';
import GnosisIcon from '../data/icons/wallet/gnosis.svg';
import MetaMaskIcon from '../data/icons/wallet/metamask.svg';
import CoinbaseIcon from '../data/icons/wallet/coinbase.svg';
import WallectConnectIcon from '../data/icons/wallet/wallet-connect.svg';

export const SUPPORTED_WALLETS = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    descriptor: 'Injected web3 provider',
    href: null,
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    description: 'Easy-to-use browser extension.',
    href: null,
    mobile: true,
    iconURL: MetaMaskIcon,
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    mobile: false,
    iconURL: WallectConnectIcon,
  },
  // WALLET_LINK: {
  //   connector: walletlink,
  //   name: 'Coinbase Link',
  //   description: 'Connect to Coinbase or other Wallet Link wallets...',
  //   href: null,
  //   mobile: false,
  //   iconURL: CoinbaseIcon,
  // },
  GNOSIS_SAFE: {
    connector: gnosisSafe,
    name: 'Gnosis Safe',
    description: 'Connect to Gnosis Safe app',
    href: null,
    iconURL: GnosisIcon,
  },
  // TREZOR: {
  //   connector: trezor,
  //   name: 'Trezor Wallet',
  //   description: 'Trezor Hardware Wallet',
  //   href: null,
  //   iconURL: TrezorIcon,
  // },
};
