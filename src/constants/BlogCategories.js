import CryptoImageIcon from '../data/icons/events-other-icon.svg';
import ControllerImageIcon from '../data/icons/controller.svg';
import NewsImageIcon from '../data/icons/news.svg';
import VegasImageIcon from '../data/icons/vegas.svg';
import AllImageIcon from '../data/icons/events-all-icon.svg';

export const BLOG_CATEGORIES = [
  {
    value: 'all',
    label: 'All',
    image: AllImageIcon,
    isActive: true,
    type: 'icon',
  },
  {
    value: 'News',
    image: NewsImageIcon,
    isActive: false,
    type: 'icon',
  },
  {
    value: 'Crypto',
    label: 'Crypto',
    image: CryptoImageIcon,
    isActive: false,
    type: 'icon',
  },
  {
    value: 'Gaming / E-Sports',
    label: 'Gaming',
    image: ControllerImageIcon,
    isActive: false,
    type: 'icon',
  },
  {
    value: 'Vegas',
    image: VegasImageIcon,
    isActive: false,
    type: 'icon',
  },
];
