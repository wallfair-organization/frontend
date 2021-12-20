import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  openModal: null,
  chainId: null,
  blockNumber: {},
};

export const appSlice = createSlice({
  name: "application",
  initialState: INITIAL_STATE,
  reducers: {
    resetState: (state) => {
      state = INITIAL_STATE;
    },
    setOpenModal: (state, action) => {
      const m = action.payload;
      state.openModal = m;
    },
  },
});

export const { resetState, setOpenModal } = appSlice.actions;

export const selectOpenModal = (state) => state.application.openModal;

export default appSlice.reducer;
