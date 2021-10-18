import { ROSI_GAME_MOBILE_BREAKPOINT } from 'constants/RosiGame';

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

export function calcCrashFactorFromElapsedTime(timeDiff = 1) {
  let offsetTime = 0;
  let offsetFactor = 0;
  let speed = 120;

  if (timeDiff > 0 && timeDiff < 18000) {
    offsetTime = 0;
    offsetFactor = 1;
    speed = 120;
    //speed: 18000/150 => 120 per 0.01 increment
  }
  if (timeDiff >= 18000 && timeDiff < 43000) {
    offsetTime = 18000;
    offsetFactor = 2.5;
    speed = 100; //speed: 25000/250 => 100 per 0.01 increment
  }
  if (timeDiff >= 43000 && timeDiff < 58000) {
    offsetTime = 43000;
    offsetFactor = 5;
    speed = 60; //speed: 15000/250 => 60 per 0.01 increment
  }
  if (timeDiff >= 58000 && timeDiff <= 68000) {
    offsetTime = 58000;
    offsetFactor = 7.5;
    speed = 40; //speed: 10000/250 => 40 per 0.01 increment
  }
  if (timeDiff >= 68000 && timeDiff <= 112970) {
    offsetTime = 68000;
    offsetFactor = 10;
    speed = 30; //speed: 10000/250 => 40 per 0.01 increment
  }
  if (timeDiff >= 112970 && timeDiff <= 162990) {
    offsetTime = 112970;
    offsetFactor = 25;
    speed = 20; //speed: 10000/250 => 40 per 0.01 increment
  }
  if (timeDiff >= 162990 && timeDiff <= 187980) {
    offsetTime = 162990;
    offsetFactor = 50;
    speed = 10; //speed: 10000/250 => 40 per 0.01 increment
  }
  if (timeDiff >= 187980 && timeDiff <= 200480) {
    offsetTime = 187980;
    offsetFactor = 75;
    speed = 5; //speed: 10000/250 => 40 per 0.01 increment
  }

  return (((timeDiff - offsetTime) / speed) * 0.01 + offsetFactor).toFixed(2); //currentCrashFactor
}

export function calcTotalDelayTime(crashFactor) {
  let totalDelayTime = 0;
  let delay = 0;

  for (let i = 1; i <= crashFactor; i = i + 0.01) {
    if (i > 1 && i < 2.5) {
      delay = 120; //speed: 18000/150 => 120 per 0.01 increment
    }
    if (i >= 2.5 && i < 5) {
      delay = 100; //speed: 25000/250 => 100 per 0.01 increment
    }
    if (i >= 5.0 && i < 7.5) {
      delay = 60; //speed: 15000/250 => 60 per 0.01 increment
    }
    if (i >= 7.5 && i < 10) {
      delay = 40; //speed: 10000/250 => 40 per 0.01 increment
    }
    if (i >= 10 && i < 25) {
      delay = 30;
    }
    if (i >= 25 && i < 50) {
      delay = 20;
    }
    if (i >= 50 && i < 75) {
      delay = 10;
    }
    if (i >= 75) {
      delay = 5;
    }

    totalDelayTime = totalDelayTime + delay;
  }

  return totalDelayTime; //in seconds
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
