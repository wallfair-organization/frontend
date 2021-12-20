export const WallfairTypes = {
  RESET_STATE: 'Wallfair/RESET_STATE',
  SET_ADDRESS: 'Wallfair/SET_ADDRESS',
  SET_CHAINID: 'Wallfair/SET_CHAINID',
  SET_CONNECTION_STATE: 'Wallfair/SET_CONNECTION_STATE',
  SET_BALANCE: 'Wallfair/SET_BALANCE',
  SET_STAKES: 'Wallfair/SET_STAKES',
  SET_HISTORY: 'Wallfair/SET_HISTORY',
};

const Actions = {
  resetState: payload => ({
    type: WallfairTypes.RESET_STATE,
    payload
  }),
  setAddress: payload => ({
      type: WallfairTypes.SET_ADDRESS,
      payload
  }),
  setChainId: payload => ({
      type: WallfairTypes.SET_CHAINID, payload
  }),
  setConnectionState: payload => ({
      type: WallfairTypes.SET_CONNECTION_STATE, payload
  }),
  setBalance: payload =>({
      type: WallfairTypes.SET_BALANCE, payload
  }),
  setStakes: payload => ({
      type: WallfairTypes.SET_STAKES,
      payload
  }),
  setHistory: payload => ({
      type: WallfairTypes.SET_HISTORY,
      payload
  })
};

export const WallfairActions = Actions;

