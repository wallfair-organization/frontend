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
import Routes from './Routes';

export const CASINO_GAMES = [
  {
    background: RosiImg,
    title: 'Elon Game',
    subtitle: '',
    description: '',
    active: true,
    linkTo: Routes.rosiGame,
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
  {
    background: First,
    title: 'Satoshi the Kid',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
];

export const SLOTS_GAMES = [
  {
    background: Second,
    title: 'Dice',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
  {
    background: Third,
    title: 'Mines',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
  {
    background: Fourth,
    title: 'Hi Lo',
    subtitle: '',
    description: '',
    active: false,
    linkTo: '',
  },
  {
    background: Fourth,
    title: 'Coin Flip',
    subtitle: '',
    description: '',
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
