export const RosiGameTypes = {
  INITIALIZE_STATE: 'RosiGame/INITIALIZE_STATE',
  FETCH_CURRENT_GAME_INFO_SUCCESS: 'RosiGame/FETCH_CURRENT_GAME_INFO_SUCCESS',
  SET_HAS_STARTED: 'RosiGame/SET_HAS_STARTED',
  SET_USER_BET: 'RosiGame/SET_USER_BET',
  ADD_LAST_CRASH: 'RosiGame/ADD_LAST_CRASH',
  ADD_IN_GAME_BET: 'RosiGame/ADD_IN_GAME_BET',
  RESET_IN_GAME_BETS: 'RosiGame/RESET_IN_GAME_BETS',
  ADD_CASHED_OUT: 'RosiGame/ADD_CASHED_OUT',
  RESET_CASHED_OUT: 'RosiGame/RESET_CASHED_OUT',
  TICK: 'RosiGame/TICK',
  CASH_OUT: 'RosiGame/CASH_OUT',
  ADD_REWARD: 'RosiGame/ADD_REWARD',
};

const initializeState = payload => ({
  type: RosiGameTypes.INITIALIZE_STATE,
  payload,
});

const setHasStarted = payload => ({
  type: RosiGameTypes.SET_HAS_STARTED,
  payload,
});

const setUserBet = payload => ({
  type: RosiGameTypes.SET_USER_BET,
  payload,
});

const addLastCrash = payload => ({
  type: RosiGameTypes.ADD_LAST_CRASH,
  payload,
});

const addInGameBet = payload => ({
  type: RosiGameTypes.ADD_IN_GAME_BET,
  payload,
});

const resetInGameBets = payload => ({
  type: RosiGameTypes.RESET_IN_GAME_BETS,
});

const addCashedOut = payload => ({
  type: RosiGameTypes.ADD_CASHED_OUT,
  payload,
});

const resetCashedOut = payload => ({
  type: RosiGameTypes.RESET_CASHED_OUT,
});

const tick = () => ({
  type: RosiGameTypes.TICK,
});

const cashOut = () => ({
  type: RosiGameTypes.CASH_OUT,
});

const addReward = payload => ({
  type: RosiGameTypes.ADD_REWARD,
  payload,
});

export const RosiGameActions = {
  initializeState,
  setHasStarted,
  setUserBet,
  addLastCrash,
  addInGameBet,
  resetInGameBets,
  addCashedOut,
  resetCashedOut,
  tick,
  cashOut,
  addReward,
};
