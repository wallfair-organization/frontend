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
  CASH_OUT_GUEST: 'RosiGame/CASH_OUT_GUEST',
  MUTE_BUTTON_CLICK: 'RosiGame/MUTE_BUTTON_CLICK',
  PLAY_WIN_SOUND: 'RosiGame/PLAY_WIN_SOUND',
  PLAY_FLYING_SOUND: 'RosiGame/PLAY_FLYING_SOUND',
  STOP_FLYING_SOUND: 'RosiGame/STOP_FLYING_SOUND',
  START_ENDGAME_PERIOD: 'RosiGame/START_ENDGAME_PERIOD',
  END_ENDGAME_PERIOD: 'RosiGame/END_ENDGAME_PERIOD',
  CLEAR_GUEST_DATA: 'RosiGame/CLEAR_GUEST_DATA',
  CANCEL_BET: 'RosiGame/CANCEL_BET',
  HANDLE_CANCEL_BET: 'RosiGame/HANDLE_CANCEL_BET',
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

const cashOutGuest = () => ({
  type: RosiGameTypes.CASH_OUT_GUEST,
});

const addReward = payload => ({
  type: RosiGameTypes.ADD_REWARD,
  payload,
});

const muteButtonClick = payload => ({
  type: RosiGameTypes.MUTE_BUTTON_CLICK,
  payload,
});

const playWinSound = payload => ({
  type: RosiGameTypes.PLAY_WIN_SOUND,
  payload,
});

const playFlyingSound = payload => ({
  type: RosiGameTypes.PLAY_FLYING_SOUND,
  payload,
});

const stopFlyingSound = payload => ({
  type: RosiGameTypes.STOP_FLYING_SOUND,
  payload,
});

const startEndgamePeriod = payload => ({
  type: RosiGameTypes.START_ENDGAME_PERIOD,
  payload,
});

const endEndgamePeriod = payload => ({
  type: RosiGameTypes.END_ENDGAME_PERIOD,
  payload,
});

const clearGuestData = payload => ({
  type: RosiGameTypes.CLEAR_GUEST_DATA,
  payload,
});

const cancelBet = payload => ({
  type: RosiGameTypes.CANCEL_BET,
  payload,
});

const handleCancelBet = payload => ({
  type: RosiGameTypes.HANDLE_CANCEL_BET,
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
  cashOutGuest,
  muteButtonClick,
  playWinSound,
  playFlyingSound,
  stopFlyingSound,
  startEndgamePeriod,
  endEndgamePeriod,
  clearGuestData,
  cancelBet,
  handleCancelBet,
};
