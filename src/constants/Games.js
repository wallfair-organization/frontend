import IconType from '../components/Icon/IconType';
import RosiImg from '../data/backgrounds/games/rosi-games-banner.png';
import First from '../data/backgrounds/games/game1-bg.png';
import Second from '../data/backgrounds/games/game2-bg.png';
import Third from '../data/backgrounds/games/game3-bg.png';
import Fourth from '../data/backgrounds/games/game4-bg.png';
import Fifth from '../data/backgrounds/games/game5-bg.png';
import Sixth from '../data/backgrounds/games/game6-bg.png';
import Seventh from '../data/backgrounds/games/game7-bg.png';
import Eight from '../data/backgrounds/games/game8-bg.png';
import AlpacaWheel from '../data/backgrounds/games/game-alpacawheel.png';
import Plinko from '../data/backgrounds/games/game-plinko.png';
import PumpDump from '../data/backgrounds/games/game-pump-dump.png';
import Routes from './Routes';

export const CASINO_GAMES = [
  {
    background: RosiImg,
    title: '',
    subtitle: '',
    description: '',
    active: true,
    linkTo: Routes.elonGame,
    infoIcon: {
      iconType: IconType.info,
      content: (
        <div>
          <p>
            <strong>What is Elon Game?</strong>
          </p>
          <p>&nbsp;</p>
          <p>
            The Elon Game is a crash game which promises pure fun and
            excitement, every fall counts!
          </p>
          <p>
            When you start playing it you enter a bet amount. The crash coin
            will go up till it crashes at some random time.
          </p>
          <p>
            In Elon Game, the longer the coin flies, the higher the chance that
            it will crash. If you cash out before the coin explodes, your bet
            will be multiplied by the current number the graph has by the time
            you cash out. If you do not cash out before the graph crashes, you
            will lose your bet.
          </p>
        </div>
      ),
    },
  },
];

export const NEW_SLOTS_GAMES = [
  {
    background: AlpacaWheel,
    title: 'Alpaca Roulette',
    subtitle: '',
    description: 'Market top and flop jackpot tournament',
    active: true,
    linkTo: '/games/alpaca-wheel',
  },
  {
    background: Plinko,
    title: 'Plinko',
    subtitle: '',
    description:
      'Jump and run on each price tick, are you heading north, south or staying put?',
    active: false,
    linkTo: '/games/plinko',
  },
  {
    background: PumpDump,
    title: `Pump and dump`,
    subtitle: '',
    active: false,
    linkTo: '/games/pump-dump',
  },
  /*,
  {
    background: Fourth,
    title: 'Financial Poker',
    subtitle: '',
    description:
      'Bring your poker face and portfolio management skills to live financial poker',
    active: false,
    linkTo: '',
  },
  {
    background: Fifth,
    title: 'Candle Stick',
    subtitle: '',
    description:
      'Game and learn candlestick trading strategy in this jackpot tournament',
    active: false,
    linkTo: '',
  },
  {
    background: First,
    title: 'Midas Trader',
    subtitle: '',
    description: 'Market 1X2 – you know where the prices are going? Prove it!',
    active: false,
    linkTo: '',
  },*/
];

export const SLOTS_GAMES = [
  {
    background: Second,
    title: 'Treasure Island',
    subtitle: '',
    description: 'Market top and flop jackpot tournament',
    active: false,
    linkTo: '',
  },
  {
    background: Third,
    title: 'Market Runner',
    subtitle: '',
    description:
      'Jump and run on each price tick, are you heading north, south or staying put?',
    active: false,
    linkTo: '',
  },
  {
    background: Fourth,
    title: 'Financial Poker',
    subtitle: '',
    description:
      'Bring your poker face and portfolio management skills to live financial poker',
    active: false,
    linkTo: '',
  },
  {
    background: Fifth,
    title: 'Candle Stick',
    subtitle: '',
    description:
      'Game and learn candlestick trading strategy in this jackpot tournament',
    active: false,
    linkTo: '',
  },
  {
    background: First,
    title: 'Midas Trader',
    subtitle: '',
    description: 'Market 1X2 – you know where the prices are going? Prove it!',
    active: false,
    linkTo: '',
  },
];

export const SPORTS_BETTING_GAMES = [
  {
    background: Fifth,
    title: 'Esports',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
  {
    background: Sixth,
    title: 'Baseball',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
  {
    background: Seventh,
    title: 'Football',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
  {
    background: Eight,
    title: 'Tennis',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
];
export const GAMES = {
  pumpDump: {
    id: '61817de6a9695acd029ffef3',
    slug: 'pump-dump',
    name: `Pump and Dump`,
    url: process.env.REACT_APP_PUMP_DUMP_GAME_BACKEND_URL,
  },
  elonGame: {
    id: '614381d74f78686665a5bb76',
    slug: 'elon-game',
    name: `Elon Game`,
    url: process.env.REACT_APP_CRASH_GAME_BACKEND_URL,
  },
  alpacaWheel: {
    id: '618a81ded90fd22298859bc4',
    slug: 'alpaca-wheel',
    name: `Alpaca Wheel`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL
  },
  plinko: {
    id: '618a821bd90fd22298859bc5',
    slug: 'plinko',
    name: `Plinko`,
  }
};
