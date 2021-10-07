import { RosiGameTypes } from '../actions/rosi-game';
import { round } from 'lodash';
const TIME_TO_FACTOR_RATIO = 0.1; // 1s = 0.1x
const START_FACTOR = 1;
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
  const hasStarted = action.payload.state === 'STARTED';
  return {
    ...state,
    hasStarted,
    nextGameAt: hasStarted ? null : action.payload.nextGameAt,
    timeStarted: action.payload.timeStarted,
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
    userBet: state.betQueue.find(bet => {
      if (!action.payload.userId) {
        return bet.userId === 'Guest';
      }
      return bet.userId === action.payload.userId;
    }),
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
      betQueue: [
        {
          ...action.payload,
          isFresh: true,
        },
        ...state.betQueue,
      ],
    };
  }
  return {
    ...state,
    inGameBets: [
      {
        ...action.payload,
        isFresh: true,
      },
      ...state.inGameBets,
    ],
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

const cashedOutGuest = (action, state) => {
  const startTime = new Date(state.timeStarted);
  const now = Date.now();
  let factor =
    ((now - startTime.getTime()) / 1000) * TIME_TO_FACTOR_RATIO + START_FACTOR;

  const lastTime = Date.now();
  const bet = {
    ...action.payload,
    amount: round(state.userBet.amount * factor, 0),
    username: 'Guest',
    userId: 'Guest',
    crashFactor: factor.toFixed(2),
    isFresh: true,
  };
  return {
    ...state,
    userBet: null,
    isCashedOut: true,
    cashedOut: [bet, ...state.cashedOut],
    inGameBets: state.inGameBets.filter(bet => bet.userId !== 'Guest'),
  };
};

const addReward = (action, state) => {
  const correspondingBet = state.inGameBets.find(
    bet => action.payload.userId.toString() === bet.userId
  );
  const bet = {
    ...action.payload,
    crashFactor: round(action.payload.crashFactor, 2),
    amount: action.payload.reward,
    username: correspondingBet?.username,
    isFresh: true,
  };
  return {
    ...state,
    cashedOut: [bet, ...state.cashedOut],
    inGameBets: state.inGameBets.filter(
      bet => bet.userId !== correspondingBet.userId
    ),
  };
};

const onTick = (action, state) => {
  return {
    ...state,
    cashedOut: state.cashedOut.map(bet => ({ ...bet, isFresh: false })),
    inGameBets: state.inGameBets.map(bet => ({ ...bet, isFresh: false })),
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
    case RosiGameTypes.CASH_OUT_GUEST:
      return cashedOutGuest(action, state);
    case RosiGameTypes.ADD_REWARD:
      return addReward(action, state);
    case RosiGameTypes.TICK:
      return onTick(action, state);
    default:
      return state;
  }
}
