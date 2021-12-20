import { WallfairTypes } from '../actions/wallfair';

const INITIAL_STATE = {
  connected: false,
  address: '0x0',
  chainId: 0,
  balances: {
    ETH: '0.0',
    WFAIR: '0.0',
  },
  history: {},
  stakes: {},
};
const deepCloning = (payload) => JSON.parse(JSON.stringify(payload));
const resetState = state => {
    const newState = {...state};
  newState.balances = INITIAL_STATE.balances;
  newState.connected = INITIAL_STATE.connected;
  newState.address = INITIAL_STATE.address;
  newState.stakes = INITIAL_STATE.stakes;
  newState.history = INITIAL_STATE.history;
  return newState;
};
const setAddress = (state, action) => {
    const newState = {...state};
  newState.address = action.payload;
  return newState;
};
const setChainId = (state, action) => {
  return {...state,chainId:  action.payload}
};
const setConnectionState = (state, action) => {
  return { ...state, connected: action.payload };

};
const setBalance = (state, action) => {
    const newState = deepCloning(state);
  const { symbol, amount } = action.payload;
  newState.balances[symbol] = amount;
  return newState;
};
const setStakes = (state, action) => {
    const newState = deepCloning(state);
  const { lock, data } = action.payload;
  newState.stakes[lock] = data;
  return newState;
};
const setHistory = (state, action) => {
    const newState = deepCloning(state);
  const { lock, data } = action.payload;
  newState.history[lock] = [];
  data?.forEach(dataTx => {
    newState.history[lock].push(dataTx);
  });

  return newState;
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case WallfairTypes.RESET_STATE:
      return resetState(state);
    case WallfairTypes.SET_ADDRESS:
      return setAddress(state, action);
    case WallfairTypes.SET_BALANCE:
      return setBalance(state, action);
    case WallfairTypes.SET_CHAINID:
      return setChainId(state, action);
    case WallfairTypes.SET_CONNECTION_STATE:
      return setConnectionState(state, action);
    case WallfairTypes.SET_HISTORY:
      return setHistory(state, action);
    case WallfairTypes.SET_STAKES:
      return setStakes(state, action);
    default:
      return state;
  }
}
