import AllIcon from '../data/icons/events-all-icon.svg';
import VegasIcon from '../data/icons/vegas.svg';

export const ACTIVITIES_TO_TRACK = [
  {
    value: 'all',
    category: 'All',
    image: AllIcon,
  },
  {
    value: 'bets',
    category: 'Bets',
    image: VegasIcon,
    eventsCats: [
      'Notification/EVENT_ONLINE',
      'Notification/EVENT_OFFLINE',
      'Notification/EVENT_NEW',
      'Notification/EVENT_NEW_BET',
      'Notification/EVENT_BET_PLACED',
      'Notification/EVENT_BET_CASHED_OUT',
      'Notification/EVENT_BET_RESOLVED',
      'Notification/EVENT_BET_CANCELED',
    ],
  },
  {
    value: 'users',
    category: 'Users',
    image: VegasIcon,
    eventsCats: ['Notification/EVENT_USER_REWARD'],
  },
  {
    value: 'elongame',
    category: 'Elon game',
    image: VegasIcon,
    eventsCats: ['Casino/CASINO_PLACE_BET', 'Casino/CASINO_CASHOUT'],
  },
];
