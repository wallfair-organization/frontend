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

import IconGameAll from '../data/icons/games/all-icon.svg';
import IconGameCard from '../data/icons/games/card-icon.svg';
import IconGameCasino from '../data/icons/games/casino-icon.svg';
import IconGameInstant from '../data/icons/games/instant-win.svg';
import IconGameKeno from '../data/icons/games/keno-icon.svg';
import IconGameRoulette from '../data/icons/games/roulette-icon.svg';
import IconGameSlot from '../data/icons/games/slot-icon.svg';

import ProviderBgaming from '../data/icons/games/gameproviders/bgaming.svg';
import ProviderEvolution from '../data/icons/games/gameproviders/evolution.svg';
import ProviderEvoplay from '../data/icons/games/gameproviders/evoplay.svg';
import ProviderSmartsoft from '../data/icons/footer/smartsoft.png';
import ProviderYggdrasil from '../data/icons/games/gameproviders/yggdrasil.svg';
import Provider1spin4win from '../data/icons/games/gameproviders/1spin4win.png';
import ProviderWazdan from '../data/icons/games/gameproviders/wazdan.png';
import ProviderThunderkick from '../data/icons/games/gameproviders/thunderkick.svg';
import ProviderSlotmill from '../data/icons/games/gameproviders/slotmill.png';
import ProviderPlayngo from '../data/icons/games/gameproviders/playngo.png';
import ProviderMerkur from '../data/icons/games/gameproviders/merkur.png';
import ProviderAtmosphera from '../data/icons/games/gameproviders/atmosphera.svg';
import ProviderEagaming from '../data/icons/games/gameproviders/eagaming.png';
import ProviderEzugi from '../data/icons/games/gameproviders/ezugi.png';
import ProviderGameart from '../data/icons/games/gameproviders/gameart.png';
import ProviderGroove from '../data/icons/games/gameproviders/groove.png';
import ProviderHabanero from '../data/icons/games/gameproviders/habanero.png';
import ProviderKagaming from '../data/icons/games/gameproviders/kagaming.png';
import ProviderKalamba from '../data/icons/games/gameproviders/kalamba.svg';
import ProviderMascot from '../data/icons/games/gameproviders/mascot.png';
import ProviderMrslotty from '../data/icons/games/gameproviders/mrslotty.png';
import ProviderPushgaming from '../data/icons/games/gameproviders/pushgaming.png';
import ProviderQuickspin from '../data/icons/games/gameproviders/quickspin.svg';
import ProviderSpearhead from '../data/icons/games/gameproviders/spearhead.svg';
import ProviderBlueprint from '../data/icons/games/gameproviders/blueprint.png'
import ProviderKiron from '../data/icons/games/gameproviders/kiron.png'
import ProviderAugustgaming from '../data/icons/games/gameproviders/augustgaming.png'
import ProviderBsg from '../data/icons/games/gameproviders/bsg.png'
import ProviderPragmaticplay from '../data/icons/games/gameproviders/pragmaticplay.png'

import ProviderIgtech from '../data/icons/games/gameproviders/igtech.png'
import ProviderBelatra from '../data/icons/games/gameproviders/belatra.png'


const softswissAcceptanceTests = [
  {
    "title": "Acceptance test 1",
    "identifier": "acceptance:test",
    "identifier2": "acceptance:test",
    "provider": "acceptance",
    "producer": "softswiss",
    "category": "slots",
    "has_freespins": true,
    "feature_group": "basic",
    "devices": [
      "desktop",
      "mobile"
    ],
    "restrictions": {
      "default": {
        "blacklist": []
      }
    }
  },
  {
    "title": "Acceptance test 2",
    "identifier": "acceptance:secondary_test",
    "identifier2": "acceptance:secondary_test",
    "provider": "acceptance",
    "producer": "softswiss",
    "category": "slots",
    "has_freespins": true,
    "feature_group": "basic",
    "devices": [
      "desktop",
      "mobile"
    ],
    "restrictions": {
      "default": {
        "blacklist": []
      }
    }
  }
];

export const SOFTSWISS_GAMES =[

  ...require('../config/games-cfg/bgaming.json'),
  //...require('../config/games-cfg/acceptance_tests.json'),
  ...require('../config/games-cfg/bgaming.json'),
  ...require('../config/games-cfg/evolution.json'),
  ...require('../config/games-cfg/1spin4win.json'),
  ...require('../config/games-cfg/wazdan_top.json'),
  ...require('../config/games-cfg/yggdrasil_top.json'),
  ...require('../config/games-cfg/thunderkick.json'),
  ...require('../config/games-cfg/epicmedia.json'),
  ...require('../config/games-cfg/slotmill_top.json'),
  //...require('../config/games-cfg/playngo_top.json'),
  ...require('../config/games-cfg/spearhead_50.json'),
  ...require('../config/games-cfg/quickspin_50.json'),
  ...require('../config/games-cfg/pushgaming.json'),
  ...require('../config/games-cfg/mrslotty_top.json'),
  ...require('../config/games-cfg/mascot_top.json'),
  ...require('../config/games-cfg/kalamba_50.json'),
  ...require('../config/games-cfg/kagaming_50.json'),
  ...require('../config/games-cfg/habanero_top.json'),
  ...require('../config/games-cfg/groove_top.json'),
  ...require('../config/games-cfg/gameart_top.json'),
  ...require('../config/games-cfg/fazi.json'),
  ...require('../config/games-cfg/ezugi_50'),
  ...require('../config/games-cfg/eagaming.json'),
  ...require('../config/games-cfg/atmosphera.json'),
  ...require('../config/games-cfg/bsg.json'),
  ...require('../config/games-cfg/igtech.json'),
  ...require('../config/games-cfg/belatra.json'),
  ...require('../config/games-cfg/pragmaticexternal.json')
]


export const EVOPLAY_GAMES = {
    "556": {
        "name": "Egypt Gods",
        "absolute_name": "fullstate\\html5\\evoplay\\egyptgods",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2016-10-24"
    },
    "559": {
        "name": "Lucky Mahjong Box",
        "absolute_name": "fullstate\\html5\\evoplay\\luckymahjongbox",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 1,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2016-10-24"
    },
    "583": {
        "name": "Basketball",
        "absolute_name": "fullstate\\html5\\evoplay\\basketball",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2016-11-10"
    },
    "586": {
        "name": "Talismans of Fortune",
        "absolute_name": "fullstate\\html5\\evoplay\\talismansoffortune",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2016-11-14"
    },
    "589": {
        "name": "The Great Wall Treasure",
        "absolute_name": "fullstate\\html5\\evoplay\\greatwall",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2016-11-15"
    },
    "592": {
        "name": "Robin Hood",
        "absolute_name": "fullstate\\html5\\evoplay\\robinhood",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2016-11-15"
    },
    "595": {
        "name": "Chinese New Year",
        "absolute_name": "fullstate\\html5\\evoplay\\chinesenewyear",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2016-11-15"
    },
    "610": {
        "name": "Clash of Pirates",
        "absolute_name": "fullstate\\html5\\evoplay\\clashofpirates",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2016-11-17"
    },
    "631": {
        "name": "Journey to the West",
        "absolute_name": "fullstate\\html5\\evoplay\\journeytothewest",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2016-12-01"
    },
    "637": {
        "name": "The Legend of Shaolin",
        "absolute_name": "fullstate\\html5\\evoplay\\thelegendofshaolin",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 1,
        "extra_bonuses_types": [],
        "release_date": "2016-12-02"
    },
    "640": {
        "name": "Vegas Nights",
        "absolute_name": "fullstate\\html5\\evoplay\\vegasnights",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2016-12-02"
    },
    "655": {
        "name": "Jewellery Store",
        "absolute_name": "fullstate\\html5\\evoplay\\jewellerystore",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2016-12-08"
    },
    "882": {
        "name": "Red Cliff",
        "absolute_name": "fullstate\\html5\\evoplay\\redcliff",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-03-28"
    },
    "957": {
        "name": "Indiana's Quest",
        "absolute_name": "fullstate\\html5\\evoplay\\indianasquest",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-05-17"
    },
    "1287": {
        "name": "Ace Round",
        "absolute_name": "fullstate\\html5\\evoplay\\aceround",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-07-11"
    },
    "1290": {
        "name": "Elven Princesses",
        "absolute_name": "fullstate\\html5\\evoplay\\elvenprincesses",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-07-11"
    },
    "1614": {
        "name": "Fruit Burst",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitburst",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2017-09-08"
    },
    "1635": {
        "name": "Football",
        "absolute_name": "fullstate\\html5\\evoplay\\football",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-09-27"
    },
    "1704": {
        "name": "Legend of Ra",
        "absolute_name": "fullstate\\html5\\evoplay\\legendofra",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-10-13"
    },
    "1707": {
        "name": "The Emperor's Tomb",
        "absolute_name": "fullstate\\html5\\evoplay\\emperorstomb",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-10-13"
    },
    "1956": {
        "name": "Necromancer",
        "absolute_name": "fullstate\\html5\\evoplay\\necromancer",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-10-30"
    },
    "2241": {
        "name": "Naughty Girls Cabaret",
        "absolute_name": "fullstate\\html5\\evoplay\\cabaret",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-12-12"
    },
    "2244": {
        "name": "Atlantis",
        "absolute_name": "fullstate\\html5\\evoplay\\atlantis",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-12-12"
    },
    "2247": {
        "name": "Epic Gladiators",
        "absolute_name": "fullstate\\html5\\evoplay\\epicgladiators",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-12-12"
    },
    "2259": {
        "name": "Sindbad",
        "absolute_name": "fullstate\\html5\\evoplay\\sindbad",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 1,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-12-29"
    },
    "2262": {
        "name": "Totem Island",
        "absolute_name": "fullstate\\html5\\evoplay\\islandtotems",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 1,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2017-12-29"
    },
    "2292": {
        "name": "Robinson",
        "absolute_name": "fullstate\\html5\\evoplay\\robinzon",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-01-24"
    },
    "2295": {
        "name": "Candy Dreams",
        "absolute_name": "fullstate\\html5\\evoplay\\candydreams",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2018-01-24"
    },
    "2310": {
        "name": "Roll The Dice",
        "absolute_name": "instant\\html5\\evoplay\\rolldice",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-02-15"
    },
    "2313": {
        "name": "Heads & Tails",
        "absolute_name": "instant\\html5\\evoplay\\headsortails",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 0,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-02-15"
    },
    "2316": {
        "name": "More or Less",
        "absolute_name": "instant\\html5\\evoplay\\moreorless",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-02-15"
    },
    "2319": {
        "name": "BlackJack Lucky Sevens",
        "absolute_name": "table\\html5\\evoplay\\blackjack",
        "developer_id": 13,
        "type_id": 7,
        "game_sub_type": "Blackjack",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-02-15"
    },
    "2322": {
        "name": "Oasis Poker Classic",
        "absolute_name": "table\\html5\\evoplay\\oasispokerclassic",
        "developer_id": 13,
        "type_id": 7,
        "game_sub_type": "Table",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-02-15"
    },
    "2328": {
        "name": "USSR Seventies",
        "absolute_name": "fullstate\\html5\\evoplay\\seventies",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-02-27"
    },
    "2331": {
        "name": "The Slavs",
        "absolute_name": "fullstate\\html5\\evoplay\\slavs",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-02-27"
    },
    "2337": {
        "name": "Four Aces",
        "absolute_name": "instant\\html5\\evoplay\\fouraces",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-03-05"
    },
    "2340": {
        "name": "Red Queen",
        "absolute_name": "instant\\html5\\evoplay\\threecards",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-03-05"
    },
    "2343": {
        "name": "Thimbles",
        "absolute_name": "instant\\html5\\evoplay\\thimbles",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-03-05"
    },
    "2344": {
        "name": "Aeronauts",
        "absolute_name": "fullstate\\html5\\evoplay\\aeronauts",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-03-20"
    },
    "2347": {
        "name": "Prohibition",
        "absolute_name": "fullstate\\html5\\evoplay\\prohibition",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-03-20"
    },
    "2365": {
        "name": "European Roulette",
        "absolute_name": "table\\html5\\evoplay\\europeanroulette",
        "developer_id": 13,
        "type_id": 7,
        "game_sub_type": "Table",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-04-06"
    },
    "2368": {
        "name": "Monster Lab",
        "absolute_name": "fullstate\\html5\\evoplay\\monsterlab",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-04-11"
    },
    "2371": {
        "name": "The Great Conflict",
        "absolute_name": "fullstate\\html5\\evoplay\\thegreatconflict",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-04-11"
    },
    "2374": {
        "name": "Battle Tanks",
        "absolute_name": "fullstate\\html5\\evoplay\\battletanks",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-04-11"
    },
    "2379": {
        "name": "Dolphins Treasure",
        "absolute_name": "fullstate\\html5\\evoplay\\dolphinstreasure",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-04-18"
    },
    "2385": {
        "name": "USSR Grocery",
        "absolute_name": "fullstate\\html5\\evoplay\\grocery",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 1,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-04-18"
    },
    "2916": {
        "name": "Baccarat 777",
        "absolute_name": "table\\html5\\evoplay\\baccarat",
        "developer_id": 13,
        "type_id": 7,
        "game_sub_type": "Baccarat",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-07-09"
    },
    "2919": {
        "name": "Mystery Planet",
        "absolute_name": "fullstate\\html5\\evoplay\\mysteryplanet",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-07-13"
    },
    "2922": {
        "name": "Fruits Land",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitsland",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2018-07-13"
    },
    "2931": {
        "name": "Charming Queens",
        "absolute_name": "fullstate\\html5\\evoplay\\charmingqueens",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-07-13"
    },
    "4384": {
        "name": "Lucky Girls",
        "absolute_name": "fullstate\\html5\\evoplay\\luckygirls",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-09-21"
    },
    "4393": {
        "name": "Rock Paper Scissors",
        "absolute_name": "instant\\html5\\evoplay\\rockpaperscissors",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2018-10-02"
    },
    "4399": {
        "name": "Robots: Energy Conflict",
        "absolute_name": "fullstate\\html5\\evoplay\\robots",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-10-03"
    },
    "4402": {
        "name": "Syndicate",
        "absolute_name": "fullstate\\html5\\evoplay\\mafia",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-10-05"
    },
    "4408": {
        "name": "Trip to the Future",
        "absolute_name": "fullstate\\html5\\evoplay\\triptothefuture",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-10-05"
    },
    "5089": {
        "name": "E.T. Lost Socks",
        "absolute_name": "fullstate\\html5\\evoplay\\et",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2018-11-27"
    },
    "5170": {
        "name": "American Roulette 3D Classic",
        "absolute_name": "table\\html5\\evoplay\\americanroulette",
        "developer_id": 13,
        "type_id": 7,
        "game_sub_type": "Roulette",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2019-05-14"
    },
    "5173": {
        "name": "E.T. Races",
        "absolute_name": "instant\\html5\\evoplay\\etraces",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2019-01-24"
    },
    "5344": {
        "name": "High Striker",
        "absolute_name": "socketgames\\evoplay\\highstriker",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "socketgames",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 0,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2019-08-15"
    },
    "5356": {
        "name": "Poker Teen Patti",
        "absolute_name": "table\\html5\\evoplay\\indianpoker",
        "developer_id": 13,
        "type_id": 7,
        "game_sub_type": "Poker",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2019-05-15"
    },
    "5398": {
        "name": "Nuke World",
        "absolute_name": "fullstate\\html5\\evoplay\\nukeworld",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2019-10-23"
    },
    "5401": {
        "name": "Reign of Dragons",
        "absolute_name": "fullstate\\html5\\evoplay\\reignofdragons",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2019-09-10"
    },
    "5452": {
        "name": "Dungeon: Immortal Evil",
        "absolute_name": "fullstate\\html5\\evoplay\\dungeon",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-02-24"
    },
    "5455": {
        "name": "Sprinkle",
        "absolute_name": "fullstate\\html5\\evoplay\\sprinkle",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2019-10-01"
    },
    "5479": {
        "name": "Brutal Santa",
        "absolute_name": "fullstate\\html5\\evoplay\\brutalsanta",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2019-11-18"
    },
    "5483": {
        "name": "Maze",
        "absolute_name": "fullstate\\html5\\evoplay\\maze",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2019-12-03"
    },
    "5485": {
        "name": "Legend of Kaan",
        "absolute_name": "fullstate\\html5\\evoplay\\legendofkaan",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-01-29"
    },
    "5487": {
        "name": "Hungry Night",
        "absolute_name": "fullstate\\html5\\evoplay\\hungrynight",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2019-12-24"
    },
    "5489": {
        "name": "Courier Sweeper",
        "absolute_name": "instant\\html5\\evoplay\\couriersweeper",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2019-12-12"
    },
    "5491": {
        "name": "Scratch Match",
        "absolute_name": "instant\\html5\\evoplay\\scratchmatch",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2019-12-27"
    },
    "5493": {
        "name": "Book of Rest",
        "absolute_name": "fullstate\\html5\\evoplay\\bookofrest",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2019-12-12"
    },
    "5517": {
        "name": "Hot Triple Sevens",
        "absolute_name": "fullstate\\html5\\evoplay\\hottriplesevens",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2019-12-27"
    },
    "5523": {
        "name": "Magic Wheel",
        "absolute_name": "instant\\html5\\evoplay\\magicwheel",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-01-03"
    },
    "5525": {
        "name": "Bomb Squad",
        "absolute_name": "instant\\html5\\evoplay\\bombsquad",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 0,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-01-22"
    },
    "5527": {
        "name": "Season sisters",
        "absolute_name": "fullstate\\html5\\evoplay\\seasonsisters",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-01-20"
    },
    "5545": {
        "name": "Mafia Syndicate",
        "absolute_name": "instant\\html5\\evoplay\\mafiasyndicate",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-02-11"
    },
    "5547": {
        "name": "Animal Quest",
        "absolute_name": "fullstate\\html5\\evoplay\\animalquest",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-04-23"
    },
    "5549": {
        "name": "Rich Reels",
        "absolute_name": "fullstate\\html5\\evoplay\\richreels",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-02-18"
    },
    "5551": {
        "name": "Irish Reels",
        "absolute_name": "fullstate\\html5\\evoplay\\irishreels",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-02-18"
    },
    "5553": {
        "name": "Texas Holdem Poker",
        "absolute_name": "table\\html5\\evoplay\\texasholdempoker3d",
        "developer_id": 13,
        "type_id": 7,
        "game_sub_type": "Table",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-03-19"
    },
    "5569": {
        "name": "Rise Of Horus",
        "absolute_name": "fullstate\\html5\\evoplay\\riseofhorus",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-03-12"
    },
    "5573": {
        "name": "Mine Field",
        "absolute_name": "instant\\html5\\evoplay\\minefield",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-03-24"
    },
    "5585": {
        "name": "Crown and Anchor",
        "absolute_name": "instant\\html5\\evoplay\\crownandanchor",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-04-02"
    },
    "5587": {
        "name": "Western Reels",
        "absolute_name": "fullstate\\html5\\evoplay\\westernreels",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-04-06"
    },
    "5593": {
        "name": "Rocket Stars",
        "absolute_name": "fullstate\\html5\\evoplay\\rocketstars",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-04-29"
    },
    "5641": {
        "name": "Fluffy Rangers",
        "absolute_name": "fullstate\\html5\\evoplay\\fluffyrangers",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-06-11"
    },
    "5643": {
        "name": "Penalty Shoot Out",
        "absolute_name": "instant\\html5\\evoplay\\penaltyshootout",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-05-26"
    },
    "5653": {
        "name": "Midnight Show",
        "absolute_name": "fullstate\\html5\\evoplay\\midnightshow",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-06-04"
    },
    "5659": {
        "name": "Exploding Fruits",
        "absolute_name": "fullstate\\html5\\evoplay\\explodingfruits",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-06-25"
    },
    "5669": {
        "name": "French Roulette Classic",
        "absolute_name": "table\\html5\\evoplay\\frenchrouletteclassic",
        "developer_id": 13,
        "type_id": 7,
        "game_sub_type": "Table",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-06-19"
    },
    "5673": {
        "name": "Sea of Spins",
        "absolute_name": "fullstate\\html5\\evoplay\\seaofspins",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-07-02"
    },
    "5677": {
        "name": "Surf Zone",
        "absolute_name": "fullstate\\html5\\evoplay\\surfzone",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-07-09"
    },
    "5679": {
        "name": "Texas Holdem Bonus",
        "absolute_name": "table\\html5\\evoplay\\texasholdembonus",
        "developer_id": 13,
        "type_id": 7,
        "game_sub_type": "Table",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-07-08"
    },
    "5687": {
        "name": "Football Manager",
        "absolute_name": "socketgames\\evoplay\\manager",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "socketgames",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 0,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-07-16"
    },
    "5695": {
        "name": "Jelly Boom",
        "absolute_name": "fullstate\\html5\\evoplay\\jellyboom",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-07-30"
    },
    "5717": {
        "name": "Raccoon Tales",
        "absolute_name": "fullstate\\html5\\evoplay\\raccoontales",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-09-01"
    },
    "5721": {
        "name": "Forest Dreams",
        "absolute_name": "fullstate\\html5\\evoplay\\forestdreams",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-08-20"
    },
    "5727": {
        "name": "Forgotten Fable",
        "absolute_name": "fullstate\\html5\\evoplay\\forgottenfable",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-09-10"
    },
    "5735": {
        "name": "Jolly Treasures",
        "absolute_name": "fullstate\\html5\\evoplay\\jollytreasures",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-09-17"
    },
    "5736": {
        "name": "Wheel Of Time",
        "absolute_name": "instant\\html5\\evoplay\\wheeloftime",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-09-08"
    },
    "5737": {
        "name": "Night Of The Living Tales",
        "absolute_name": "fullstate\\html5\\evoplay\\livingtales",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-09-18"
    },
    "5738": {
        "name": "Valley Of Dreams",
        "absolute_name": "fullstate\\html5\\evoplay\\valleyofdreams",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-10-29"
    },
    "5739": {
        "name": "Book Of Keno",
        "absolute_name": "instant\\html5\\evoplay\\bookofkeno",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-10-15"
    },
    "5740": {
        "name": "Ice Mania",
        "absolute_name": "fullstate\\html5\\evoplay\\icemania",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2020-10-22"
    },
    "5741": {
        "name": "Fruit Nova",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitnova",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2020-11-12"
    },
    "5742": {
        "name": "Tree Of Light",
        "absolute_name": "fullstate\\html5\\evoplay\\treeoflight",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-12-03"
    },
    "5743": {
        "name": "Pachin Girl",
        "absolute_name": "instant\\html5\\evoplay\\pachingirl",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-11-26"
    },
    "5746": {
        "name": "Temple Of Dead",
        "absolute_name": "fullstate\\html5\\evoplay\\templeofdead",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-01-14"
    },
    "5748": {
        "name": "Christmas Party",
        "absolute_name": "instant\\html5\\evoplay\\christmasparty",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-01-12"
    },
    "5749": {
        "name": "Treasure Mania",
        "absolute_name": "fullstate\\html5\\evoplay\\treasuremania",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2020-12-22"
    },
    "5750": {
        "name": "Xmas Keno Cat",
        "absolute_name": "instant\\html5\\evoplay\\xmaskenocat",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-12-10"
    },
    "5751": {
        "name": "Wild Bullets",
        "absolute_name": "fullstate\\html5\\evoplay\\wildbullets",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-12-17"
    },
    "5752": {
        "name": "Fruit Super Nova",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitsupernova",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-01-28"
    },
    "5753": {
        "name": "Mehen",
        "absolute_name": "instant\\html5\\evoplay\\mehen",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2021-02-10"
    },
    "5755": {
        "name": "Runes Of Destiny",
        "absolute_name": "fullstate\\html5\\evoplay\\runesofdestiny",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2020-02-24"
    },
    "5757": {
        "name": "Neon Shapes",
        "absolute_name": "instant\\html5\\evoplay\\neonshapes",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-09-10"
    },
    "5758": {
        "name": "Ellen's Fortune",
        "absolute_name": "fullstate\\html5\\evoplay\\ellensfortune",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-03-01"
    },
    "5759": {
        "name": "Unlimited Wishes",
        "absolute_name": "fullstate\\html5\\evoplay\\unlimitedwishes",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-03-18"
    },
    "5760": {
        "name": "Food Feast",
        "absolute_name": "fullstate\\html5\\evoplay\\foodfeast",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-12-04"
    },
    "5761": {
        "name": "Mysteries of the East",
        "absolute_name": "instant\\html5\\evoplay\\mysteriesoftheeast",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2021-06-04"
    },
    "5762": {
        "name": "Epic Legends",
        "absolute_name": "fullstate\\html5\\evoplay\\epiclegends",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-03-25"
    },
    "5763": {
        "name": "Sweet Sugar",
        "absolute_name": "fullstate\\html5\\evoplay\\sweetsugar",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-04-01"
    },
    "5766": {
        "name": "Cycle of Luck",
        "absolute_name": "fullstate\\html5\\evoplay\\cycleofluck",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2019-12-10"
    },
    "5767": {
        "name": "Roll To Luck",
        "absolute_name": "instant\\html5\\evoplay\\rolltoluck",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2019-12-10"
    },
    /*
    "5768": {
        "name": "Lucky Sector",
        "absolute_name": "socketgames\\evoplay\\luckysector",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "socketgames",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 0,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2021-04-28"
    },
    */
    "5770": {
        "name": "PlingoBall",
        "absolute_name": "instant\\html5\\evoplay\\plingoball",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2021-05-21"
    },
    "5771": {
        "name": "Gangster Night",
        "absolute_name": "fullstate\\html5\\evoplay\\gangsternight",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-05-24"
    },
    "5773": {
        "name": "Gold Of Sirens",
        "absolute_name": "fullstate\\html5\\evoplay\\goldofsirens",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-05-21"
    },
    "5774": {
        "name": "Bloody Brilliant",
        "absolute_name": "fullstate\\html5\\evoplay\\bloodybrilliant",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-05-21"
    },
    "5775": {
        "name": "Fruit Super Nova 40",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitsupernova40",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-05-21"
    },
    "5776": {
        "name": "Bonanza Wheel",
        "absolute_name": "instant\\html5\\evoplay\\bonanzawheel",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2021-07-22"
    },
    /*
    "5777": {
        "name": "Temple Of Dead Bonus Buy",
        "absolute_name": "fullstate\\html5\\evoplay\\templeofdeadbonusbuy",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-05-21"
    },*/
    "5778": {
        "name": "Shadow Of Luxor",
        "absolute_name": "fullstate\\html5\\evoplay\\shadowofluxor",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-08-05"
    },
    "5781": {
        "name": "Save The Hamster",
        "absolute_name": "socketgames\\evoplay\\savethehamster",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "socketgames",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 0,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2020-05-27"
    },
    "5783": {
        "name": "Cycle of Luck Bonus Buy",
        "absolute_name": "fullstate\\html5\\evoplay\\cycleofluckbonusbuy",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-08-16"
    },
    "5787": {
        "name": "Gold of Sirens Bonus Buy",
        "absolute_name": "fullstate\\html5\\evoplay\\goldofsirensbonusbuy",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-08-17"
    },
    "5789": {
        "name": "Anubis Moon",
        "absolute_name": "fullstate\\html5\\evoplay\\anubismoon",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-08-19"
    },
    "5791": {
        "name": "Fruit Disco",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitdisco",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-08-19"
    },
    "5793": {
        "name": "Fruit Super Nova 30",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitsupernova30",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-08-19"
    },
    "5795": {
        "name": "Fruit Super Nova 60",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitsupernova60",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-08-19"
    },
    "5797": {
        "name": "Fruit Super Nova 100",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitsupernova100",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-08-19"
    },
    "5799": {
        "name": "Curse of the Pharaoh",
        "absolute_name": "fullstate\\html5\\evoplay\\curseofthepharaoh",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-08-19"
    },
    "5801": {
        "name": "Triple Chili",
        "absolute_name": "fullstate\\html5\\evoplay\\triplechili",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-08-27"
    },
    "5805": {
        "name": "Curse of the Pharaoh Bonus Buy",
        "absolute_name": "fullstate\\html5\\evoplay\\curseofthepharaohbonusbuy",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-09-16"
    },
    "5811": {
        "name": "Lucky Crumbling",
        "absolute_name": "socketgames\\evoplay\\luckycrumbling",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "socketgames",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 0,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2021-10-08"
    },
    "5813": {
        "name": "Hot Triple Sevens Special",
        "absolute_name": "fullstate\\html5\\evoplay\\hottriplesevensspecial",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-10-18"
    },
    "5815": {
        "name": "Christmas Reach",
        "absolute_name": "fullstate\\html5\\evoplay\\christmasreach",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-10-23"
    },
    "5823": {
        "name": "Fruit Super Nova 80",
        "absolute_name": "fullstate\\html5\\evoplay\\fruitsupernova80",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "bonus_spins"
        ],
        "release_date": "2021-11-03"
    },
    "5847": {
      "name": "Budai Reels",
      "absolute_name": "fullstate\\html5\\evoplay\\budaireels",
      "developer_id": 13,
      "type_id": 1,
      "game_sub_type": "Slot",
      "mobile": 1,
      "desktop": 1,
      "fullstate": 1,
      "denominations_override_allowed": 0,
      "extra_bonuses_types": [
        "bonus_spins"
      ],
      "release_date": "2021-12-23"
    },
    /*
    "5829": {
        "name": "Dragon's Tavern",
        "absolute_name": "fullstate\\html5\\evoplay\\dragonstavern",
        "developer_id": 13,
        "type_id": 1,
        "game_sub_type": "Slot",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [
            "freespins_on_start",
            "bonus_spins"
        ],
        "release_date": "2021-11-12"
    },
    "5831": {
        "name": "Penalty Series",
        "absolute_name": "instant\\html5\\evoplay\\penaltyseries",
        "developer_id": 13,
        "type_id": 6,
        "game_sub_type": "Instant",
        "mobile": 1,
        "desktop": 1,
        "fullstate": 1,
        "denominations_override_allowed": 0,
        "extra_bonuses_types": [],
        "release_date": "2021-11-22"
    }
    */
}

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
//   {
//     background: gameCardMines,
//     title: `Mines`,
//     subtitle: '',
//     active: true,
//     linkTo: '/games/mines',
//   },
//   {
//     background: gameCardPlinko,
//     title: 'Plinko',
//     subtitle: '',
//     description: '',
//     active: true,
//     linkTo: '/games/plinko',
//   },
//   {
//     background: gameCardWheel,
//     title: 'Alpaca Wheel',
//     subtitle: '',
//     description: '',
//     active: true,
//     linkTo: '/games/alpaca-wheel',
//   },
//   {
//     background: gameCardAlpacannon,
//     title: `AlpaCannon`,
//     subtitle: '',
//     active: true,
//     linkTo: '/games/alpacannon',
//   }
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

export const TOP_GAMES = [
    {
        TechnicalName: 'JetX',
        TechnicalCategory: 'JetX',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'JetX3',
        TechnicalCategory: 'XGames',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'Cappadocia',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'Balloon',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'SpinX',
        TechnicalCategory: 'XGames',
        GameCategory: 'Casino Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/SpinX.jpg`
    },
    {
        TechnicalName: 'SweetCandy',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'FunFruit',
        TechnicalCategory: 'Slots',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'Cowboy',
        TechnicalCategory: 'Slots',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'BookOfWin',
        TechnicalCategory: 'Slots',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'Christmas',
        TechnicalCategory: 'Slots',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'DonutCity',
        TechnicalCategory: 'Slots',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'Fruit10',
        TechnicalCategory: 'Slots',
        GameCategory: 'Casino Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/MagicGarden10.jpg`
    },
    {
        TechnicalName: 'BlazingHot40',
        TechnicalCategory: 'Slots',
        GameCategory: 'Casino Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/BlazingHot40.jpg`
    },
    {
        TechnicalName: 'Dota',
        TechnicalCategory: 'Slots',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'ClassicKeno',
        TechnicalCategory: 'Keno',
        GameCategory: 'Casino Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/ClassicKeno.jpg`
    },
    {
        TechnicalName: 'VirtualRoulette',
        TechnicalCategory: 'Roulette',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'VirtualClassicRoulette',
        TechnicalCategory: 'Roulette',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'LuckySeven',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    }
];


export const EXTERNAL_GAMES = [
    {
        TechnicalName: 'JetX',
        TechnicalCategory: 'JetX',
        GameCategory: 'Casino Games'
    }, {
        TechnicalName: 'Cappadocia',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    }, {
        TechnicalName: 'Balloon',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    }, {
        TechnicalName: 'SpinX',
        TechnicalCategory: 'XGames',
        GameCategory: 'Casino Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/SpinX.jpg`
    }, {
        TechnicalName: 'JetX3',
        TechnicalCategory: 'XGames',
        GameCategory: 'Casino Games'
    }, {
        TechnicalName: 'Viking',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Aztec',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Birds',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Casino',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Galaxy',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'CitySlot',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/City.jpg`
    }, {
        TechnicalName: 'Cowboy',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'BookOfWin',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Christmas',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Sport',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Dota',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'FunFruit',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Pharaoh',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/Pharaon.jpg`
    }, {
        TechnicalName: 'DonutCity',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Samurai',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Football',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Argo',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'SweetCubes',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
        TechnicalName: 'Bank',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/Bankjob.jpg`
    }, {
        TechnicalName: 'MoonStone',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games'
    }, {
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
    }, {
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
    }, {
        TechnicalName: 'BlazingHot40',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/BlazingHot40.jpg`
    }, {
        TechnicalName: 'Fruit40',
        TechnicalCategory: 'Slots',
        GameCategory: 'Slot Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/MagicGarden40.jpg`
    }, {
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
    }, {
        TechnicalName: 'VirtualRoulette',
        TechnicalCategory: 'Roulette',
        GameCategory: 'Roulette Games'
    }, {
        TechnicalName: 'VirtualBurningRoulette',
        TechnicalCategory: 'Roulette',
        GameCategory: 'Casino Games'
    }, {
        TechnicalName: 'VirtualBurningRoulette',
        TechnicalCategory: 'Roulette',
        GameCategory: 'Roulette Games'
    }, {
        TechnicalName: 'BonusRoulette',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    }, {
        TechnicalName: 'BonusRoulette',
        TechnicalCategory: 'Games',
        GameCategory: 'Roulette Games'
    }, {
        TechnicalName: 'SicBo',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    }, {
        TechnicalName: 'VirtualClassicRoulette',
        TechnicalCategory: 'Roulette',
        GameCategory: 'Casino Games'
    },
    {
        TechnicalName: 'VirtualClassicRoulette',
        TechnicalCategory: 'Roulette',
        GameCategory: 'Roulette Games'
    },
    {
        TechnicalName: 'ClassicKeno',
        TechnicalCategory: 'Keno',
        GameCategory: 'Keno Games',
        picture: `https://www.smartsoftgaming.com/Content/Images/GameIcons/ClassicKeno.jpg`
    }, {
        TechnicalName: 'RussianKeno',
        TechnicalCategory: 'Keno',
        GameCategory: 'Keno Games'
    }, {
        TechnicalName: 'VipKeno',
        TechnicalCategory: 'Keno',
        GameCategory: 'Keno Games'
    }, {
        TechnicalName: 'LuckySeven',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    }, {
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
    }, {
        TechnicalName: 'ZodiacScratch',
        TechnicalCategory: 'Games',
        GameCategory: 'Casino Games'
    }, {
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

export const TOP_PICKS_GAMES = {
  header: 'Top picks',
  names: ['Crazy Time', 'Plinko', 'Monopoly', 'Unlimited Wishes', 'Tree Of Light', 'JetX']
}

export const HOMEPAGE_SLOT_GAMES = {
  header: 'Slot Games',
  names: ['Unlimited Wishes', 'Big Bamboo', 'Bison Battle', 'Bonanza Billion', 'Razor Shark', 'Beat the Beast: Mighty Sphinx']
}

export const HOMEPAGE_GAME_SHOWS = {
  header: 'Game Shows',
  names: ['Crazy Time', 'Monopoly', 'Lightning Roulette', 'Cash or Crash', 'Deal or No Deal', 'Lightning Dice']
}

export const HOMEPAGE_INSTANT_WIN_GAMES = {
  header: 'Instant Win Games',
  names: ['Plinko', 'Balloon', 'Cappadocia', 'PlingoBall', 'JetX', 'Minesweeper']
}

export const GAME_CATEGORIES = [
  {
    value: 'all',
    label: 'All',
    image: IconGameAll,
    isActive: true,
    type: 'icon',
    disabled: false,
  },
//   {
//     value: 'House Games',
//     label: 'House Games',
//     image: IconGameAll,
//     isActive: false,
//     type: 'icon',
//     disabled: false,
//   },
  {
    value: 'Casino',
    label: 'Casino',
    image: IconGameCasino,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Slot',
    label: 'Slot',
    image: IconGameSlot,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Roulette',
    label: 'Roulette',
    image: IconGameRoulette,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Card Games',
    label: 'Card Games',
    image: IconGameCard,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Instant Win',
    label: 'Instant Win',
    image: IconGameInstant,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
  {
    value: 'Keno',
    label: 'Keno',
    image: IconGameKeno,
    isActive: false,
    type: 'icon',
    disabled: false,
  },
];

export const GAME_PROVIDERS = [
    {
        value: 'all',
        label: 'All Providers',
        image: IconGameAll,
    },
    {
        value: 'bgaming',
        label: 'BGAMING',
        image: ProviderBgaming,
    },
    {
        value: 'evolution',
        label: 'EVOLUTION',
        image: ProviderEvolution,
    },
    {
        value: 'evoplay',
        label: 'EVOPLAY',
        image: ProviderEvoplay,
    },
    {
        value: 'smartsoft',
        label: 'SMARTSOFT',
        image: ProviderSmartsoft,
    },
    {
      value: '1spin4win',
      label: '1Spin4Win',
      image: Provider1spin4win,
    },
    {
      value: 'wazdan',
      label: 'Wazdan',
      image: ProviderWazdan,
    },
    {
      value: 'yggdrasil',
      label: 'Yggdrasil',
      image: ProviderYggdrasil,
    },
    {
      value: 'merkur',
      label: 'Merkur',
      image: ProviderMerkur,
    },
    {
      value: 'thunderkick',
      label: 'ThunderKick',
      image: ProviderThunderkick,
    },
    {
      value: 'slotmill',
      label: 'Slotmill',
      image: ProviderSlotmill,
    },
    // {
    //   value: 'playngo',
    //   label: 'Playngo',
    //   image: ProviderPlayngo,
    // },
    {
      value: 'atmosfera',
      label: 'Atmosfera',
      image: ProviderAtmosphera,
    },
    {
      value: 'eagaming',
      label: 'EA Gaming',
      image: ProviderEagaming,
    },
    {
      value: 'ezugi',
      label: 'Ezugi',
      image: ProviderEzugi,
    },
    {
      value: 'gameart',
      label: 'Game Art',
      image: ProviderGameart,
    },
    {
      value: 'habanero',
      label: 'Habanero',
      image: ProviderHabanero,
    },
    {
      value: 'kagaming',
      label: 'KA Gaming',
      image: ProviderKagaming,
    },
    {
      value: 'kalamba',
      label: 'Kalamba',
      image: ProviderKalamba,
    },
    {
      value: 'mascot',
      label: 'Mascot',
      image: ProviderMascot,
    },
    {
      value: 'mrslotty',
      label: 'MrSlotty',
      image: ProviderMrslotty,
    },
    {
      value: 'pushgaming',
      label: 'Push Gaming',
      image: ProviderPushgaming,
    },
    {
      value: 'quickspin',
      label: 'QuickSpin',
      image: ProviderQuickspin,
    },
    {
      value: 'spearhead',
      label: 'SpearHead',
      image: ProviderSpearhead,
    },
    {
      value: 'groove',
      label: 'Groove',
      image: ProviderGroove,
    },
    {
      value: 'augustgaming',
      label: 'August Gaming',
      image: ProviderAugustgaming,
    },
    {
      value: 'blueprint',
      label: 'Blueprint',
      image: ProviderBlueprint,
    },
    {
      value: 'kiron',
      label: 'Kiron',
      image: ProviderKiron,
    },
    {
      value: 'bsg',
      label: 'BetSoft',
      image: ProviderBsg,
    },
    {
      value: 'belatra',
      label: 'Belatra',
      image: ProviderBelatra,
    },
    {
      value: 'pragmaticexternal',
      label: 'Pragmatic Play',
      image: ProviderPragmaticplay,
    },

    //Ig Tech only works in Australia
    /*
    {
      value: 'igtech',
      label: 'Ig Tech',
      image: ProviderIgtech,
    }*/
]
