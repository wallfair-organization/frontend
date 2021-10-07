import Bet from '../data/images/elongame/bet.png';
import Explosion from '../data/images/elongame/explosion.png';
import ElonOnRocket from '../data/images/elongame/eleon-on-rocket.png';

export const ELON_GAME_STEPS = [
  {
    number: '01',
    title: 'Place a bet',
    description: 'Set the amount of your bet',
    marginLeftText: -27,
    image: Bet,
  },
  {
    number: '02',
    title: 'Wait until next round starts',
    description: `You'll see a countdown on the game screen`,
    image: ElonOnRocket,
    imageText: 'Starting in 24.30',
  },
  {
    number: '03',
    title: 'Take profit before Elon explodes',
    description: 'If Elon explodes before you take profit, you lose your bet',
    image: Explosion,
  },
];
