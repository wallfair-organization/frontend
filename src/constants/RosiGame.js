import { GAMES } from './Games';

export const ROSI_GAME_EVENT_ID = GAMES.elonGame.id;
export const PLINKO_GAME_EVENT_ID = GAMES.plinko.id;
export const ROSI_GAME_AFTER_CRASH_DELAY = 2000;
export const PUMPDUMP_GAME_AFTER_CRASH_DELAY = 3000;
export const ROSI_GAME_MOBILE_BREAKPOINT = 480; // in pixels

export const ROSI_GAME_PLAYGROUND_ROCKET = 0;
export const ROSI_GAME_PLAYGROUND_CAR = 1;
export const ROSI_GAME_PLAYGROUND_RUNNING = 2;

export const ROSI_GAME_INTERVALS = [
  // fromFactor, toFactor, speed, elonFrame
  [1, 1.2, 1, 0],
  [1.2, 1.5, 2, 0],
  [1.5, 2, 4, 1],
  [2, 3, 7, 2],
  [3, 4, 9, 3],
  [4, 5, 11, 4],
  [5, 7.5, 13, 5],
  [7.5, 10, 15, 5],
  [10, 15, 19, 5],
  [15, 20, 24, 5],
  [20, 25, 28, 5],
  [25, 30, 32, 5],
  [30, 35, 36, 5],
  [35, 40, 40, 5],
  [40, 45, 44, 5],
  [45, 50, 48, 5],
  [50, 100, 60, 5],
];

export const ROSI_GAME_MAX_CRASH_FACTOR =
  ROSI_GAME_INTERVALS[ROSI_GAME_INTERVALS.length - 1][1];
