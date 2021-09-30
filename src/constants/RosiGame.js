export const ROSI_GAME_EVENT_ID = '614381d74f78686665a5bb76';
export const ROSI_GAME_AFTER_CRASH_DELAY = 2000;
export const ROSI_GAME_MOBILE_BREAKPOINT = 480; // in pixels

// [fromFactor, toFactor, timeMs]
export const ROSI_GAME_INTERVALS = [
  [1.0, 2.49, 4000],
  [2.5, 4.99, 3000],
  [5.0, 7.49, 2000],
  [7.5, 10, 1000],
];

export const ROSI_GAME_MAX_DURATION_SEC =
  ROSI_GAME_INTERVALS.map(([_from, _to, time]) => time).reduce(
    (acc, time) => acc + time,
    0
  ) / 1000;
