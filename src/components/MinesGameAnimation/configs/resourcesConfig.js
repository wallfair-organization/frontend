/* Config for resources used in this game
* These resources will be loaded and set as ResPackage to game's view class */
import closed from '../assets/closed.png';
import empty from '../assets/empty.png';
import bg from '../assets/bg.png';
import flag from '../assets/flag.png';
import mine from '../assets/mine.png';
import zero from '../assets/zero.png';
import one from '../assets/one.png';
import two from '../assets/two.png';
import three from '../assets/three.png';
import four from '../assets/four.png';
import five from '../assets/five.png';
import six from '../assets/six.png';
import seven from '../assets/seven.png';
import eight from '../assets/eight.png';
import nine from '../assets/nine.png';
import alpaca_win from '../assets/alpaca_win.png';
import animations from '../assets/animations.json';

export default [
  {
    "name": "Minesweeper",
    "resources": [
      {
        "name": "animations",
        "url": "./assets/animations.json"
      },
      {
        "name": "closed",
        "url": closed
      },
      {
        "name": "empty",
        "url": empty
      },
      {
        "name": "flag",
        "url": flag
      },
      {
        "name": "mine",
        "url": mine
      },
      {
        "name": "zero",
        "url": zero
      },
      {
        "name": "one",
        "url": one
      },
      {
        "name": "two",
        "url": two
      },
      {
        "name": "three",
        "url": three
      },
      {
        "name": "four",
        "url": four
      },
      {
        "name": "five",
        "url": five
      },
      {
        "name": "six",
        "url": six
      },
      {
        "name": "seven",
        "url": seven
      },
      {
        "name": "eight",
        "url": eight
      },
      {
        "name": "nine",
        "url": nine
      },
      {
        "name": "background",
        "url": bg
      },
      {
        "name": "coin",
        "url": alpaca_win,
        "json": "./assets/alpaca_win.json"
      }

    ]
  }
];
