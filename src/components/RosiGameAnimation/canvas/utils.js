import { ROSI_GAME_MOBILE_BREAKPOINT } from 'constants/RosiGame';

export const isMobileRosiGame =
  window.innerWidth <= ROSI_GAME_MOBILE_BREAKPOINT;

export function calcPercent(totalValue, percentToGet) {
  return (percentToGet / 100) * totalValue;
}

export function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function calcCrashFactorFromElapsedTime(timeDiff) {
  var offsetTime = 0;
  var offsetFactor = 0;
  var speed = 1;

  if (timeDiff > 0 && timeDiff < 18000) {
    offsetTime = 0;
    offsetFactor = 1;
    speed = 120;
    //speed: 18000/150 => 120 per 0.01 increment
  }
  if (timeDiff >= 18000 && timeDiff < 18000 + 25000) {
    offsetTime = 18000;
    offsetFactor = 2.5;
    speed = 100; //speed: 25000/250 => 100 per 0.01 increment
  }
  if (timeDiff >= 18000 + 25000 && timeDiff < 18000 + 25000 + 15000) {
    offsetTime = 18000 + 25000;
    offsetFactor = 5;
    speed = 60; //speed: 15000/250 => 60 per 0.01 increment
  }
  if (
    timeDiff >= 18000 + 25000 + 15000 &&
    timeDiff <= 18000 + 25000 + 15000 + 10000
  ) {
    offsetTime = 18000 + 25000 + 15000;
    offsetFactor = 7.5;
    speed = 40; //speed: 10000/250 => 40 per 0.01 increment
  }

  return (((timeDiff - offsetTime) / speed) * 0.01 + offsetFactor).toFixed(2); //currentCrashFactor
}
