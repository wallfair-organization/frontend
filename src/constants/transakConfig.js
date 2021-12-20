
const transakConfig = {
  apiKey: process.env.REACT_APP_TRANSAK_API_KEY, // Your API Key
  environment: process.env.REACT_APP_TRANSAK_ENVIROMENT, // STAGING/PRODUCTION
  defaultCryptoCurrency: process.env.REACT_APP_TRANSAK_DEFAULT_CRYPTO_CURRENCY, //MATIC
  cryptoCurrencyCode: process.env.REACT_APP_TRANSAK_CRYPTO_CURRENCY_CODE, //MATIC
  walletAddress: process.env.REACT_APP_TRANSAK_WALLET_ADDRESS, // Our backend wallet (should not be changeable)
  networks: process.env.REACT_APP_TRANSAK_NETWORK, //ethereum,mainnet,polygon,kovan
  disableWalletAddressForm: true,
  themeColor: '7879f1', // App theme color
  // hideMenu: true,
  // redirectURL: window.location.origin,
  // hostURL: window.location.origin,
  redirectURL: '',
  hostURL: window.location.origin,
//   partnerCustomerId: '615bf607f04fbb15aa5dd367', // Internal user id (mongo db)
  widgetHeight: window.innerHeight - 50 + 'px',
  // widgetWidth: '500px',
};

export default transakConfig ;