import { RosiGameTypes } from '../actions/rosi-game';

const initialState = {
  hasStarted: false,
  lastCrashes: [],
  inGameBets: [],
  betQueue: [],
  cashedOut: [],
  userBet: null,
  timeStarted: null,
  isCashedOut: false,
  placedBetInQueue: false,
  nextGameAt: null,
};

const initializeState = (action, state) => {
  return {
    ...state,
    lastCrashes: action.payload.lastCrashes,
  };
};

const setHasStarted = (action, state) => {
  return {
    ...state,
    hasStarted: true,
    timeStarted: action.payload.timeStarted,
    placedBetInQueue: false,
    betQueue: [],
  };
};

const setUserBet = (action, state) => {
  if (state.hasStarted) {
    return {
      ...state,
      placedBetInQueue: true,
    };
  }
  return {
    ...state,
    userBet: action.payload,
    placedBetInQueue: false,
  };
};

const addLastCrash = (action, state) => {
  return {
    ...state,
    hasStarted: false,
    nextGameAt: action.payload.nextGameAt,
    userBet: state.betQueue.find(bet => bet.userId === action.payload.userId),
    lastCrashes: [action.payload.crashFactor, ...state.lastCrashes],
    // cashedOut: [
    //   ...state.inGameBets.filter(
    //     bet => bet.crashFactor <= action.payload.crashFactor
    //   ),
    // ].map(bet => ({ ...bet, amount: bet.amount * bet.crashFactor })),
    cashedOut: state.cashedOut,
    inGameBets: state.betQueue,
    isCashedOut: false,
    betQueue: [],
    placedBetInQueue: false,
  };
};

const addInGameBet = (action, state) => {
  if (state.hasStarted) {
    return {
      ...state,
      betQueue: [action.payload, ...state.betQueue],
    };
  }
  return {
    ...state,
    inGameBets: [action.payload, ...state.inGameBets],
  };
};

const resetInGameBets = (action, state) => {
  return {
    ...state,
    inGameBets: [],
  };
};

const addCashedOut = (action, state) => {
  return {
    ...state,
    cashedOut: [action.payload, ...state.cashedOut],
  };
};

const resetCashedOut = (action, state) => {
  return {
    ...state,
    cashedOut: [],
  };
};

const cashedOut = (action, state) => {
  return {
    ...state,
    userBet: null,
    isCashedOut: true,
  };
};

const addReward = (action, state) => {
  const correspondingBet = state.inGameBets.find(
    bet => action.payload.userId.toString() === bet.userId
  );
  const bet = {
    ...action.payload,
    amount: action.payload.reward,
    username: correspondingBet?.username,
  };
  return {
    ...state,
    cashedOut: [bet, ...state.cashedOut],
    inGameBets: state.inGameBets.filter(
      bet => bet.userId !== correspondingBet.userId
    ),
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RosiGameTypes.INITIALIZE_STATE:
      return initializeState(action, state);
    case RosiGameTypes.SET_HAS_STARTED:
      return setHasStarted(action, state);
    case RosiGameTypes.SET_USER_BET:
      return setUserBet(action, state);
    case RosiGameTypes.ADD_LAST_CRASH:
      return addLastCrash(action, state);
    case RosiGameTypes.ADD_IN_GAME_BET:
      return addInGameBet(action, state);
    case RosiGameTypes.RESET_IN_GAME_BETS:
      return resetInGameBets(action, state);
    case RosiGameTypes.ADD_CASHED_OUT:
      return state;
    case RosiGameTypes.RESET_CASHED_OUT:
      return resetCashedOut(action, state);
    case RosiGameTypes.CASH_OUT:
      return cashedOut(action, state);
    case RosiGameTypes.ADD_REWARD:
      return addReward(action, state);
    default:
      return state;
  }
}
