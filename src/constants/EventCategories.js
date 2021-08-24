import SportsImage from '../data/icons/events-sports-icon.svg';
import OtherImage from '../data/icons/events-other-icon.svg';
import PoliticsImage from '../data/icons/events-politics-icon.svg';
import CelebritiesImage from '../data/icons/events-celebrities-icon.svg';
import AllImage from '../data/icons/events-all-icon.svg';

export const EVENT_CATEGORIES = [
    {
        value: 'all',
        image: AllImage,
        isActive: true,
        type: 'icon',
    },
    {
        value: 'sports',
        image: SportsImage,
        isActive: false,
        type: 'icon',
    },
    {
        value: 'celebrities',
        image: CelebritiesImage,
        isActive: false,
        type: 'icon',
    },
    {
        value: 'politics',
        image: PoliticsImage,
        isActive: false,
        type: 'icon',
    },
    {
        value: 'crypto',
        image: SportsImage,
        isActive: false,
        type: 'icon',
    },
    {
        value: 'other',
        image: OtherImage,
        isActive: false,
        type: 'icon',
    },
];