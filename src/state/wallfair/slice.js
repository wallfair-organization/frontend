import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  connected: false,
  address: "0x0",
  chainId: 0,
  balances: {
    ETH: "0.0",
    WFAIR: "0.0",
  },
  history: {},
  stakes: {},
};

export const wfSlice = createSlice({
  name: "wallfair",
  initialState: INITIAL_STATE,
  reducers: {
    resetState: (state) => {
      state.balances = INITIAL_STATE.balances;
      state.connected = INITIAL_STATE.connected;
      state.address = INITIAL_STATE.address;
      state.stakes = INITIAL_STATE.stakes;
      state.history = INITIAL_STATE.history;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setChainId: (state, action) => {
      state.chainId = action.payload;
    },
    setConnectionState: (state, action) => {
      state.connected = action.payload;
    },
    setBalance: (state, action) => {
      const { symbol, amount } = action.payload;
      state.balances[symbol] = amount;
    },
    setStakes: (state, action) => {
      const { lock, data } = action.payload;
      state.stakes[lock] = data;
    },
    setHistory: (state, action) => {
      const { lock, data } = action.payload;
      state.history[lock] = [];
      data?.forEach((dataTx) => {
        state.history[lock].push(dataTx);
      });
    },
  },
});

export const {
  resetState,
  setConnectionState,
  setBalance,
  setStakes,
  setHistory,
} = wfSlice.actions;

export const selectConnected = (state) => state.wallfair.connected;
export const selectBalances = (state) => state.wallfair.balances;
export const selectStakes = (state) => state?.wallfair?.stakes ? state.wallfair.stakes : []; 
export const selectHistory = (state) => state?.wallfair?.history ? state.wallfair.history : [];

export default wfSlice.reducer;
