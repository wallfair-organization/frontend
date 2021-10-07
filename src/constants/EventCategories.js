import SportsImageIcon from '../data/icons/events-sports-icon.svg';
import CryptoImageIcon from '../data/icons/events-other-icon.svg';
import ControllerImageIcon from '../data/icons/controller.svg';
import PoliticsImageIcon from '../data/icons/news.svg';
import JokerImageIcon from '../data/icons/joker.svg';
import TradingImageIcon from '../data/icons/trading.svg';
import AllImageIcon from '../data/icons/events-all-icon.svg';
import LoLImage from '../data/images/League of Legends-144x192.jpeg';
import MinecraftImage from '../data/images/Minecraft-144x192.jpeg';
import AllImage from '../data/images/wallfair-all-category.png';
import FortniteImage from '../data/images/Fortnite-144x192.jpeg';
import ApexLegendsImage from '../data/images/Apex Legends-144x192.jpeg';
import GTAImage from '../data/images/Grand Theft Auto V-144x192.jpeg';
import CSImage from '../data/images/Counter-Strike_ Global Offensive-144x192.jpeg';

export const EVENT_CATEGORIES = [
  {
    value: 'all',
    label: 'All',
    image: AllImageIcon,
    isActive: true,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Gaming / E-Sports',
    label: 'Gaming',
    image: ControllerImageIcon,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Sports',
    image: SportsImageIcon,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Politics',
    image: PoliticsImageIcon,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Sick Society',
    image: JokerImageIcon,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Trading',
    image: TradingImageIcon,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Wallfair Bets',
    label: 'Wallfair',
    image: CryptoImageIcon,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
];

export const LIVE_EVENTS_CATEGORIES = [
  {
    value: 'all',
    image: AllImage,
    isActive: true,
    type: 'image',
  },
  {
    value: 'Gaming / E-Sports',
    image: LoLImage,
    isActive: false,
    type: 'image',
  },
  {
    value: 'Sports',
    image: CSImage,
    isActive: false,
    type: 'image',
  },
  {
    value: 'Politics',
    image: FortniteImage,
    isActive: false,
    type: 'image',
  },
  {
    value: 'Sick Society',
    image: GTAImage,
    isActive: false,
    type: 'image',
  },
  {
    value: 'Trading',
    image: MinecraftImage,
    isActive: false,
    type: 'image',
  },
  {
    value: 'Wallfair Bets',
    image: ApexLegendsImage,
    isActive: false,
    type: 'image',
  },
];
