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
    title: 'Rosi Games',
    subtitle: '',
    description: '',
    active: true,
    linkTo: Routes.rosiGame,
    infoIcon: {
      iconType: IconType.info,
      content: (
        <p>
          <strong>What is Rosi Game?</strong>
        </p>
      ),
    },
  },
  {
    background: First,
    title: 'Name Games',
    subtitle: 'lorem ipsum',
    description: 'Tempor diam eu malesuada adipiscing velit, sit lorem libero.',
    active: false,
    linkTo: '',
  },
];

export const SLOTS_GAMES = [
  {
    background: Second,
    title: 'Name Games',
    subtitle: 'lorem ipsum',
    description: 'Tempor diam eu malesuada adipiscing velit, sit lorem libero.',
    active: false,
    linkTo: '',
  },
  {
    background: Third,
    title: 'Name Games',
    subtitle: 'lorem ipsum',
    description: 'Tempor diam eu malesuada adipiscing velit, sit lorem libero.',
    active: false,
    linkTo: '',
  },
  {
    background: Fourth,
    title: 'Name Games',
    subtitle: 'lorem ipsum',
    description: 'Tempor diam eu malesuada adipiscing velit, sit lorem libero.',
    active: false,
    linkTo: '',
  },
];

export const SPORTS_BETTING_GAMES = [
  {
    background: Fifth,
    title: 'Name Games',
    subtitle: 'lorem ipsum',
    description: 'Tempor diam eu malesuada adipiscing velit, sit lorem libero.',
    active: false,
    linkTo: '',
  },
  {
    background: Sixth,
    title: 'Name Games',
    subtitle: 'lorem ipsum',
    description: 'Tempor diam eu malesuada adipiscing velit, sit lorem libero.',
    active: false,
    linkTo: '',
  },
  {
    background: Seventh,
    title: 'Name Games',
    subtitle: 'lorem ipsum',
    description: 'Tempor diam eu malesuada adipiscing velit, sit lorem libero.',
    active: false,
    linkTo: '',
  },
  {
    background: Eight,
    title: 'Name Games',
    subtitle: 'lorem ipsum',
    description: 'Tempor diam eu malesuada adipiscing velit, sit lorem libero.',
    active: false,
    linkTo: '',
  },
];
