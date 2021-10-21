import { RosiGameTypes } from '../actions/rosi-game';
import { round } from 'lodash';
import { calcCrashFactorFromElapsedTime } from '../../components/RosiGameAnimation/canvas/utils';

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
  volumeLevel: 0.5,
  isEndgame: false,
  animationIndex: 0,
  musicIndex: 0,
  bgIndex: 0,
};

const initializeState = (action, state) => {
  const hasStarted = action.payload.state === 'STARTED';
  let volumeLevel = '1.0';
  try {
    volumeLevel = localStorage.getItem('gameVolume');
  } catch (e) {
    console.error(e);
  }
  let {
    currentBets,
    upcomingBets,
    cashedOutBets,
    userId,
    animationIndex,
    musicIndex,
    bgIndex,
  } = action.payload;

  currentBets = currentBets.filter(ib => {
    return !cashedOutBets.find(cb => cb.userId === ib.userId);
  });

  const userBet = currentBets.find(b => {
    return b.userId === userId;
  });

  return {
    ...state,
    hasStarted,
    nextGameAt: hasStarted ? null : action.payload.nextGameAt,
    timeStarted: action.payload.timeStarted,
    lastCrashes: action.payload.lastCrashes,
    inGameBets: currentBets,
    betQueue: upcomingBets,
    cashedOut: cashedOutBets,
    userBet,
    animationIndex,
    musicIndex,
    bgIndex,
    placedBetInQueue: !!upcomingBets.find(b => b?.userId === userId),
    isCashedOut: !!cashedOutBets.find(b => b?.userId === userId),
    volumeLevel: parseInt(volumeLevel),
  };
};

const setHasStarted = (action, state) => {
  return {
    ...state,
    hasStarted: true,
    timeStarted: action.payload.timeStarted,
    placedBetInQueue: false,
    betQueue: [],
    animationIndex: action.payload.animationIndex,
    musicIndex: action.payload.musicIndex,
    bgIndex: action.payload.bgIndex,
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
    isCashedOut: false,
  };
};

const addInGameBet = (action, state) => {
  if (state.hasStarted || state.isEndgame) {
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
    inGameBets: state.betQueue,
    betQueue: [],
    placedBetInQueue: false,
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
  let factor = calcCrashFactorFromElapsedTime(now - startTime.getTime());

  const bet = {
    ...action.payload,
    amount: round(state.userBet.amount * factor, 0),
    username: 'Guest',
    userId: 'Guest',
    crashFactor: factor,
    isFresh: true,
  };
  return {
    ...state,
    userBet: null,
    isCashedOut: true,
    cashedOut: [bet, ...state.cashedOut],
    inGameBets: state.inGameBets.filter(bet => bet?.userId !== 'Guest'),
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
    inGameBets: correspondingBet
      ? state.inGameBets.filter(bet => bet.userId !== correspondingBet.userId)
      : state.inGameBets,
  };
};

const onTick = (action, state) => {
  return {
    ...state,
    cashedOut: state.cashedOut.map(bet => ({ ...bet, isFresh: false })),
    inGameBets: state.inGameBets.map(bet => ({ ...bet, isFresh: false })),
  };
};

const onMuteButtonClick = (action, state) => {
  try {
    localStorage.setItem(
      'gameVolume',
      `${state.volumeLevel === 0.0 ? 1.0 : 0.0}`
    );
  } catch (e) {
    console.error(e);
  }
  return {
    ...state,
    volumeLevel: state.volumeLevel === 0.0 ? 1.0 : 0.0,
  };
};

const onEndEndgamePeriod = (action, state) => {
  return {
    ...state,
    isEndgame: false,
  };
};

function clearGuestData(action, state) {
  return {
    ...state,
    placedBetInQueue: false,
    isCashedOut: false,
    userBet: null,
  };
}

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
    case RosiGameTypes.MUTE_BUTTON_CLICK:
      return onMuteButtonClick(action, state);
    case RosiGameTypes.END_ENDGAME_PERIOD:
      return onEndEndgamePeriod(action, state);
    case RosiGameTypes.CLEAR_GUEST_DATA:
      return clearGuestData(action, state);
    default:
      return state;
  }
}
