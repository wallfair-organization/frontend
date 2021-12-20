import { configureStore } from "@reduxjs/toolkit";
import wfReducer from "../state/wallfair/slice";
import appReducer from "../state/application/slice";

export const store = configureStore({
  reducer: {
    wallfair: wfReducer,
    application: appReducer,
  },
});
