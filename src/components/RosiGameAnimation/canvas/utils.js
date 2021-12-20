import { ROSI_GAME_MOBILE_BREAKPOINT } from 'constants/RosiGame';
const GROWTH_FACTOR = 0.00006;

export const isMobileRosiGame =
  window.innerWidth <= ROSI_GAME_MOBILE_BREAKPOINT;

export function calcPercent(totalValue, percentToGet) {
  return (percentToGet / 100) * totalValue;
}

export function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomItems(items, n) {
  const shuffled = items.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export function calcCrashFactorFromElapsedTime(elapsed) {
  return Math.max(1, Math.E ** (GROWTH_FACTOR * elapsed)).toFixed(2);
}

export function calcTotalDelayTime(crash){
  return Math.log(crash) / GROWTH_FACTOR;
}

export function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);

  return { x, y };
}

/* new calc start */

/* new calc end */
