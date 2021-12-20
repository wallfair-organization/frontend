import IconType from '../components/Icon/IconType';
import RosiImg from '../data/backgrounds/games/elon-game-banner.png';
import First from '../data/backgrounds/games/game1-bg.png';
import Second from '../data/backgrounds/games/game2-bg.png';
import Third from '../data/backgrounds/games/game3-bg.png';
import Fourth from '../data/backgrounds/games/game4-bg.png';
import Fifth from '../data/backgrounds/games/game5-bg.png';
import Sixth from '../data/backgrounds/games/game6-bg.png';
import Seventh from '../data/backgrounds/games/game7-bg.png';
import Eight from '../data/backgrounds/games/game8-bg.png';
import Routes from './Routes';

import gameCardElon from '../data/images/house-games/card-elon.png';
import gameCardWheel from '../data/images/house-games/card-wheel.png';
import gameCard5 from '../data/images/house-games/card-5.png';
import gameCardPumpDump from '../data/images/house-games/card-pumpdump.png';
import gameCardPlinko from '../data/images/house-games/card-plinko.png';
import gameCardMines from '../data/images/house-games/card-mines.png';
import gameCardAlpacannon from '../data/images/house-games/card-alpacannon.png';

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
    background: gameCardPumpDump,
    title: `Pump and Dump`,
    subtitle: '',
    active: true,
    linkTo: '/games/pump-dump',
  },
  {
    background: gameCardElon,
    title: `Elon Game`,
    subtitle: '',
    active: true,
    linkTo: '/games/elon-game',
  },
  {
    background: gameCardMines,
    title: `Mines`,
    subtitle: '',
    active: true,
    linkTo: '/games/mines',
  },
  {
    background: gameCardPlinko,
    title: 'Plinko',
    subtitle: '',
    description: '',
    active: true,
    linkTo: '/games/plinko',
  },
  {
    background: gameCardWheel,
    title: 'Alpaca Wheel',
    subtitle: '',
    description: '',
    active: true,
    linkTo: '/games/alpaca-wheel',
  },
  {
    background: gameCardAlpacannon,
    title: `AlpaCannon`,
    subtitle: '',
    active: true,
    linkTo: '/games/alpacannon',
  },
  {
    background: gameCard5,
    title: `Oil Rush`,
    subtitle: '',
    active: false,
    linkTo: '/games/oilrush',
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
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/7kdomu0n/show'
  },
  elonGame: {
    id: '614381d74f78686665a5bb76',
    slug: 'elon-game',
    name: `Elon Game`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/bf0vgm9e/show'
  },
  alpacaWheel: {
    id: '618a81ded90fd22298859bc4',
    slug: 'alpaca-wheel',
    name: `Alpaca Wheel`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/L04wbsrn/show'
  },
  plinko: {
    id: '618a821bd90fd22298859bc5',
    slug: 'plinko',
    name: `Plinko`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/gre6zwo2/show',
    outcomesByRisk: [
      [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
      [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
      [170, 24, 8.1, 2, 0.7, 0.2, 0.2, 0.2, 0.7, 2, 8.1, 24, 170]
    ]
  },
  mines: {
    id: '619cc432121e61d6f06338c9',
    slug: 'mines',
    name: `Mines`,
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/w32sLogm/show'
  },
  cannon: {
    id: '61a09b35121e61d6f06338ca',
    slug: 'alpacannon',
    name: 'Alpacannon',
    url: process.env.REACT_APP_CASINO_GAMES_BACKEND_URL,
    verificationTool: 'https://jsfiddle.net/alpacasino/tga04Lpr/show'
  }
};


export const EXTERNAL_GAMES = [
  {
  TechnicalName: 'JetX',
  TechnicalCategory: 'JetX',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'Cappadocia',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'Balloon',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'SpinX',
  TechnicalCategory: 'XGames',
  GameCategory: 'Casino Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/SpinX.jpg`
  },{
  TechnicalName: 'JetX3',
  TechnicalCategory: 'XGames',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'Viking',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Aztec',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Birds',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Casino',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Galaxy',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'CitySlot',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/City.jpg`
  },{
  TechnicalName: 'Cowboy',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'BookOfWin',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Christmas',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Sport',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Dota',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'FunFruit',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Pharaoh',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/Pharaon.jpg`
  },{
  TechnicalName: 'DonutCity',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Samurai',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Football',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Argo',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'SweetCubes',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Bank',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/Bankjob.jpg`
  },{
  TechnicalName: 'MoonStone',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Apollo',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
},/*{
  TechnicalName: 'BlazingHot',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/BlazingHot.jpg`
},*/{
  TechnicalName: 'Evolution',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games'
  },{
  TechnicalName: 'Fruit5',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/MagicGarden.jpg`
},/*{
  TechnicalName: 'BlazingHot10',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/BlazingHot10.jpg`
},*/{
  TechnicalName: 'Fruit10',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/MagicGarden10.jpg`
  },{
  TechnicalName: 'BlazingHot40',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/BlazingHot40.jpg`
  },{
  TechnicalName: 'Fruit40',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/MagicGarden40.jpg`
  },{
  TechnicalName: 'Dark',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/Dark.jpg`
},/*{
  TechnicalName: 'WW2',
  TechnicalCategory: 'Slots',
  GameCategory: 'Slot Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/WW2.jpg`
},*/{
  TechnicalName: 'VirtualRoulette',
  TechnicalCategory: 'Roulette',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'VirtualBurningRoulette',
  TechnicalCategory: 'Roulette',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'BonusRoulette',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
},/*{
  TechnicalName: 'AnimationRoulette',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/AnimationRoulette.jpg`
},*/{
  TechnicalName: 'SicBo',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'VirtualClassicRoulette',
  TechnicalCategory: 'Roulette',
  GameCategory: 'Casino Games'
},/*{
  TechnicalName: 'Blackjack',
  TechnicalCategory: 'BoardGames',
  GameCategory: 'Board Games'
},*/{
  TechnicalName: 'ClassicKeno',
  TechnicalCategory: 'Keno',
  GameCategory: 'Keno Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/ClassicKeno.jpg`
  },{
  TechnicalName: 'RussianKeno',
  TechnicalCategory: 'Keno',
  GameCategory: 'Keno Games'
  },{
  TechnicalName: 'VipKeno',
  TechnicalCategory: 'Keno',
  GameCategory: 'Keno Games'
  },{
  TechnicalName: 'LuckySeven',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'TripleSeven',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
},/*{
  TechnicalName: 'WheelOfLightDeluxe',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/WheelOfLight.jpg`

},*/{
  TechnicalName: 'SpaceLotto',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'ZodiacScratch',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
  },{
  TechnicalName: 'GemStones',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
},/*{
  TechnicalName: 'LuckyDoubleDeluxe',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games',
  picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/LuckyDoubleDeluxe.jpg`
},*/{
  TechnicalName: 'SweetCandy',
  TechnicalCategory: 'Games',
  GameCategory: 'Casino Games'
  }
]
