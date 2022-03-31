const axios = require('axios').default;
const _ = require('lodash');

// default routes, set meta values for static pages
let meta = {
  '/': {
    title: 'Wallfair',
    description: 'Fair, Social, Decentralized',
    image: 'https://staking.wallfair.io/logo512y.png?v=3',
    keywords: 'Wallfair, betting, esports, crypto',
  },
  '/events/all': {
    title: 'Wallfair Events',
    description: 'Intense, high-paced and hilarious events for everyone',
    image: 'https://staking.wallfair.io/logo512y.png?v=3',
    keywords:
      'wallfair, events, news, sports, esports, gaming, crypto',
  },
  '/events': {
    title: 'Wallfair Events',
    description: 'Intense, high-paced and hilarious events for everyone',
    image: 'https://staking.wallfair.io/logo512y.png?v=3',
    keywords:
      'wallfair, events, news, sports, esports, gaming, crypto',
  },
  '/games/elon-game': {
    title: 'Wallfair Elon Game',
    description: 'To the Moon with Elon, big wins, tiny rocket',
    image: 'https://app.wallfair.io/images/seo/rosi-games-banner.png?v=3',
    keywords:
      'Wallfair, Casino, Games, Elon, Moon, Rocket, Crash, Crypto, Betting',
  },
  '/games/pump-dump': {
    title: 'Wallfair Pump & Dump Game',
    description: 'Earn more with Wallfair games, all day, everyday',
    image: 'https://app.wallfair.io/images/seo/pump-dump-banner.png?v=3',
    keywords:
      'wallfair, pump, dump, crash, Casino, Games, Crypto, Betting',
  },
  '/winners': {
    title: 'Wallfair',
    description: 'Create events, earn free tokens and have a chance to win 5,000 EUR',
    image: 'https://files.wallfair.io/share/winners-page.png',
    keywords:
      'wallfair, social, games, crypto, betting',
  },
  // '/games': {
  //   title: 'Wallfair Games',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/logo_512.png?v=3',
  //   keywords:
  //     'wallfair, casino, games betting, vegas, gambling, odds, roulette, crypto-casino',
  // },
  // '/games/alpaca-wheel': {
  //   title: 'Wallfair Alpaca Wheel',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/images/seo/alpacawheel-banner.png?v=3',
  //   keywords:
  //     'wallfair, Casino, Games, Wheel, Crypto, Betting',
  // },
  // '/games/plinko': {
  //   title: 'Wallfair Plinko Game',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/images/seo/plinko-banner.png?v=3',
  //   keywords:
  //     'wallfair, plinko, Casino, Games, Crypto, Betting',
  // },
  // '/games/mines': {
  //   title: 'Wallfair Mines Game',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/images/seo/alpaca-mines-banner.png?v=3',
  //   keywords:
  //     'wallfair, mines, minesweeper, Games, Crypto, Casino, Betting',
  // },
  // '/games/alpacannon': {
  //   title: 'Wallfair Alpacannon Game',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/images/seo/alpacannon-banner.png?v=3',
  //   keywords:
  //     'wallfair, dice, cannon, alpacannon, Games, Crypto, Casino, Betting',
  // },
  "/softswiss-game/mrslotty:TheRedPhoenix": {
        title: "The Red Phoenix",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TheRedPhoenix.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:50linesofwar": {
        title: "50 Lines Of War",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/50linesofwar.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/gameart:WolfHunt": {
        title: "Wolf Hunt",
        description: "Venture into the uncharted wilds of the old American northwest with Wolf Hunt from GameArt! This5-reel, 25-payline slot is set in a vast mountainous land, home to native tribes and all kinds of wildlifeincluding deer, beavers, eagles, snakes, and of course, wolves вЂ“ packs of snarling grey wolves!Come face-to-face with the Wolf Wild, substituting for all symbols except the Scatter and GoldenFootprint, and meet the beautiful native girl in a feathered headdress bearer of great gifts as theScatter\\; land 3 and you'll be given 6 Free Spins.In such big, wide-open country it's fitting that, during Free Spins, reels 2, 3 and 4 spins together as oneGigantic symbol! And, when you land a Gigantic Scatter, you'll be awarded 3 extra Free Spins with no limit to the number of retriggers.As a tracker on the trail of the wolfpack, youвЂ™ll want to see 6 or more Golden Footprint symbols, becausetheyвЂ™ll trigger the Wolf Respins feature. During these, each Golden Footprint symbol displays either aMINI, MINOR or MAJOR JACKPOT. Starting after all win combos are paid, normal symbols disappear andonly Golden Footprints remain. Wolf Respins use Special reels, featuring only Golden Footprints andempty spaces. You'll start with 3 Respins and each Golden Footprint will remain on the reels and triggermore Respins. Fill all 15 positions and you'll win the MEGA JACKPOT!And, if you're feeling lucky, there's a red or black вЂall or nothing gamble feature, allowing you to doubleyour winnings up to five times. Just don't forget to keep your rifle handy, because these wolves arecunning.",
        image: "https://cdn.softswiss.net/i/s3/gameart/WolfHunt.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/mrslotty:Postman": {
        title: "Postman",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Postman.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:TheThirdLotusPrince": {
        title: "The Third Lotus Prince",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TheThirdLotusPrince.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:40CashBells": {
        title: "40 Cash Bells",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/40CashBells.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:AncientArtifacts": {
        title: "Ancient Artifacts",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/AncientArtifacts.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Bagua2": {
        title: "Bagua 2",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Bagua2.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/kagaming:CandyMania": {
        title: "Candy Mania",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CandyMania.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mrslotty:BookofSpells": {
        title: "Book of Spells",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BookofSpells.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/kagaming:Cinderella": {
        title: "Glass Slipper",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Cinderella.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mrslotty:ReKill": {
        title: "Re Kill",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ReKill.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:CanCanSaloon": {
        title: "CanCan Saloon",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/CanCanSaloon.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:SpaceGuardians": {
        title: "Space Guardians",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/SpaceGuardians.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:TheMagicalLamp": {
        title: "The Magical Lamp",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TheMagicalLamp.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/kagaming:SpaceCat": {
        title: "Space Cat",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SpaceCat.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/mrslotty:cloverfire40": {
        title: "40 Clover Fire",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/cloverfire40.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:CubesandStars": {
        title: "Cubes and Stars",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/CubesandStars.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:EmpressDowagerCixi": {
        title: "Empress Dowager Cixi",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/EmpressDowagerCixi.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/quickspin:TigersGlory": {
        title: "Tiger's Glory",
        description: "Tiger’s Glory is the most epic gladiator battle in the history of slot gaming! So, get your armor on, step into the colosseum of ancient Rome, and get ready to face some seriously fierce tigers!\n\nOur most action-packed showdown yet pits tigers against gladiators in an epic fight worthy of history books. In this extremely volatile 4×6 reel slot with 40 paylines, the action is non-stop and it’s guaranteed to keep you on your toes every step of the way!\n\nMake sure you keep an eye out for the Enraged Tiger – this Free Spins bonus game is triggered when three or more Bonus Scatter symbols lock into place. Free spins are available whenever the tiger wins a battle, and you can get as much as 20 free spins if you’re lucky.\n\nIt’s time to channel your inner gladiator and have a roaring",
        image: "https://cdn.softswiss.net/i/s3/quickspin/TigersGlory.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/quickspin:WildHarlequin": {
        title: "Wild Harlequin",
        description: "Welcome to the smoky back tent of an independent circus, where a talented magician owns the stage. But is she really alone up there? Or does she have a twin…?\n\nIt’s all smoke and mirrors in this show. Nothing is what it seems, and everything turns out to be even more fantastical than the card tricks being performed.\n\nCatch this travelling circus while you can, because once this sneaky lady has moved on with her entourage there’s no trace to be seen. Not even a dent in the field. Makes you wonder if it was all a dream…\n\nWild Harlequin is a 5×3 slot with 10 paylines, featuring Wild Harlequin symbols that always nudge to cover the entire reel, plus a Free Spins Bonus with Multiplier magic – and if you hit the BIG win, you’ll know it rea",
        image: "https://cdn.softswiss.net/i/s3/quickspin/WildHarlequin.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/pushgaming:fatdrac": {
        title: "Fat Drac",
        description: "123456\r\nSink your teeth into Fat Drac! The third game in our ‘Fat Series’, with our unique twist on a Vampire theme, that can be enjoyed not only at Halloween, but all year round.\r\n\r\nTake a journey up the steep and winding mountain roads that go all the way up to Fat Drac’s mysterious castle, that’s full of creepy rumbles and mischievous bats flying around.\r\n\r\nFat Drac may not be as terrifying as the Dracula you already know, but don’t be fooled by his cheeky grin. His ever-growing appetite is not easily suppressed and blood goblets must always be in sight.",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/fatdrac.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/quickspin:SakuraFortune": {
        title: "Sakura Fortune",
        description: "In Sakura Fortune, you step into an enchanted world of cherry blossoms and golden dragons to join the heroine on her journey.\n\nThis extremely volatile 4x5, 40-line slot follows a beautiful Japanese princess as she battles evil emperors on her way to untold riches!\n\nThe game boasts exciting features like Sakura Fortune Respins, Free Spins, and a Mystery Nudge.\n\nWith it's action-packed, feature-rich gameplay, stunning graphics and lucrative wins, it's no wonder this game is one of our biggest hits!",
        image: "https://cdn.softswiss.net/i/s3/quickspin/SakuraFortune.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/quickspin:StickyBandits3MostWanted": {
        title: "Sticky Bandits 3: Most Wanted",
        description: "Dynamite, guns, cacti, and whisky the wicked Wild West is back! The first two Sticky Bandit slots are two extremely popular Quickspin games, so who are we to deny you a third one?This time around, the bad-ass bandits are five fierce women and they've only got one thing on their mind: to get inside that locked safe and run away with bags full of cash. Will you be able to get your hands on some of it? Sticky Bandits 3 Most Wanted is a 3x5 slot loaded with exciting Wilds and Free Spins, plus the Sticky feature that everyone loves. And you don't even have to wait around for the Free Spins bonus  pay 60x bet and get instant entry with the Bonus Buy feature!",
        image: "https://cdn.softswiss.net/i/s3/quickspin/StickyBandits3MostWanted.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/quickspin:VampireSenpai": {
        title: "Vampire Senpai",
        description: "Get whisked away to a colourful and prosperous world filled with hopping vampires. You heard right! Our July release is inspired by Chinese folklore, where undead creatures, known as the Jiangshi, appear with outstretched arms and stiff posture, preying on humans to absorb their life force.\n\nWe've placed a more comedic tone on this traditionally dark theme and packed it with plenty of suspense and anticipation. Included is a base game mystery feature, randomly creating 3-9 additional Talisman Wilds, and it doesn't stop there. The game gets even darker in Free Spins. After landing one or more Vampire Wilds, the Jiangshi will hop around, sinking their teeth into any Medium human symbol that appears next to them, creating more wilds! Appearing on a 5x5 layout, Vampire Sempai boasts invigorating colour combinations, rich graphics, and eye-catching effects that will leave the player thirsty for more!",
        image: "https://cdn.softswiss.net/i/s3/quickspin/VampireSenpai.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/quickspin:WarpWreckersPowerGlyph90": {
        title: "Warp Wreckers Power Glyph",
        description: "On a planet far, far away, the world’s top scientists are fighting against the clock to develop robots for the next ‘astrocalypse’. The biggest and most important project is constructing The Destroyer, but it’s not quite finished.",
        image: "https://cdn.softswiss.net/i/s3/quickspin/WarpWreckersPowerGlyph90.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/pushgaming:BisonBattle": {
        title: "Bison Battle",
        description: "Stand back! A bison clash is about to take place!\r\nHead over to North America and be prepared to encounter some rowdy and raging bison that are ready to charge at any moment.\r\nExplore the canyons and witness some momentous clashes that can take place in a chilly Ice Park or a sunny Green Valley.\r\nWherever you end up, be sure to hold on, as plenty of collisions and commotion are set to take place with numerous rewards to be enjoyed.",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/BisonBattle.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:agentxmission": {
        title: "Agent X Mission",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/agentxmission.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:Bagua": {
        title: "Bagua",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Bagua.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/quickspin:SpinionsXmasParty": {
        title: "Spinions X-mas Party",
        description: "Your favourite orange dudes and dudettes are back and they sure know how to have a good time. Expect an all-you-can-eat buffet, delicious drinks, and dancing on the tables (there might even be karaoke if you stay long enough).\r\n\r\nAnd it wouldn’t be a Quickspin bash without the brilliant features, which include Sticky Wild Respins and Sticky Wilds in the Free Spins Bonus, so grab your ugliest Christmas sweater and get ready for some seriously festive gameplay!",
        image: "https://cdn.softswiss.net/i/s3/quickspin/SpinionsXmasParty.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/quickspin:TitanThunderWrathOfHades2": {
        title: "Titan Thunder: Wrath of Hades",
        description: "Titan Thunder Wrath of Hades boasts gorgeous graphics and tons of exciting features, including 3 fixed jackpots a Bonus Buy Feature and the chance to win up to 15,000x! ",
        image: "https://cdn.softswiss.net/i/s3/quickspin/TitanThunderWrathOfHades2.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/mrslotty:nomorefruits": {
        title: "No More Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/nomorefruits.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/quickspin:WildLuchador": {
        title: "Wild Luchador",
        description: "Cactus plants, hot chillies, and some seriously strong tequila – can you guess where we are? Mexico!\n\nJoin a talented luchador and try your hands at professional wrestling. Enter the ring, soak up the sound of your fans cheering you on, and wrestle your way to the big win.\n\nWild Luchador is a 5 reels wide, 3 symbols high, 243 ways slot with extremely high volatility and a max exposure of 40,000x bet!\n\nThe exciting features include Luchador Wilds and Dead Slam Free Spins. The Death Clocks will send you into the Dead Slam Free Spins bonus, where you’ll enter the Land of the dead and the Luchador Wilds will strike in almost every spin (up to 5 at the same time).\n\nAnd why wait for the Free Spins? Pay 70x bet and get instant entry to the bonus game with the Bonus Buy featu",
        image: "https://cdn.softswiss.net/i/s3/quickspin/WildLuchador.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/pushgaming:fatsanta": {
        title: "Fat Santa",
        description: "Fat Santa is on his way, so keep your eyes peeled for his sleigh! He can’t get enough of the Christmas Pies, even as he soars through the skies. If you can feed him, prepare to cheer; the massive wins are almost here! Bigger and bigger he will grow! How big you ask? We don’t know! It’s time to celebrate and shout! Generous wins are what Christmas is all about!\r\n",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/fatsanta.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:humptydumpty": {
        title: "Humpty Dumpty",
        description: "Fall into a lot of luck! Enter the fairy tale world of Humpty Dumpty and have fun with the magical features. Unique falling wilds give the chance for more and larger wins and the stuck wilds in the feature bulk up the winning potential. Just Smashing!\r\n",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/humptydumpty.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:FortuneLuck": {
        title: "Fortune Luck",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/FortuneLuck.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:FruitVegas": {
        title: "Fruit Vegas",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/FruitVegas.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/pushgaming:razorshark": {
        title: "Razor Shark",
        description: "Grab your swimming gear and get ready to dive into deep sea treasures with Razor Shark! Nudging Mystery Stacks will have streams of wins flowing to those who dare to explore the Big Blue. With a little luck, they may even be able to find the riches hidden within the Razor Reveal Feature! Finding 3 explosive scatter symbols will sink you deeper, where Mystery Stacks and an increasing multiplier can keep you submerged... Forever!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/razorshark.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/quickspin:StickyBanditsWildReturn": {
        title: "Sticky Bandits: Wild Return",
        description: "The old bandits are back in town, meaner and leaner. And they say all good things come in three, so we've added a new bad-ass bandit to the gang. This trio of desperadoes is ready to cause some serious havoc in a dingy saloon that's packed with whiskey, cigars, guns, and skulls just as you'd expect in the wicked Wild West!This gaming experience is every bit as thrilling as the first Sticky Bandits! The three bandits show up as both normal and massive symbols on the reels (up to 3x3!), and there's an extremely exciting shootout in the Free Spins Bonus where all the bandits can turn into Sticky Wilds!",
        image: "https://cdn.softswiss.net/i/s3/quickspin/StickyBanditsWildReturn.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/quickspin:WildChaseTokyoGo": {
        title: "Wild Chase: Tokyo Go",
        description: "Do you enjoy the thrill of The Wild Chase? Then you'll love Wild Chase: Tokyo Go. This high-octane adventure puts you right in the middle of an action-filled heist in the Japanese capital!",
        image: "https://cdn.softswiss.net/i/s3/quickspin/WildChaseTokyoGo.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/quickspin:VolcanoRiches": {
        title: "Volcano Riches",
        description: "Volcano Riches takes you inside an active volcano where Pele, the goddess of volcanoes and fire (and creator of the Hawaiian Islands), might reward you generously with BIG wins!\n\nThis highly volatile 5x4 slot with 40 paylines is a fiery little number that makes you wish for a hot streak, and it's got tons of exciting features too!\n\nIf a Wild symbol lands on the third reel, it will explode and generate two to five additional Wild symbols in adjacent positions. These volcanoes also explode, leaving you to bask in the warm glow of your winnings  if you're lucky!\n\nTime to feel the heat!",
        image: "https://cdn.softswiss.net/i/s3/quickspin/VolcanoRiches.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/quickspin:WinsofFortune": {
        title: "Wins of Fortune",
        description: "Set in a picturesque valley in the heart of Asia, players head into battle with mythical characters of old quest stories to win big in our slot, Wins of Fortune.\n\nThe 3,3,4,4,5 reel slot boasts respins on any win, and features a Super Respin mode where the game re-spins until there are no additional winning symbols on the grid.",
        image: "https://cdn.softswiss.net/i/s3/quickspin/WinsofFortune.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/pushgaming:FireHopper": {
        title: "Fire Hopper",
        description: "Take a stroll down beautiful country lanes and feast your eyes on a spectacular waterfall that leads to a pond that’s full of unexpected surprises.\r\n\r\nThe setting may be tranquil, however there’s lots of activity going on beside the peacefully still lily pads, buzzing fireflies and singing birds. \r\n\r\nHere, a majestic Fire Frog runs the show. Watch it kick start the action as it hops across the pond, ablaze, changing colours, and leaving behind golden treasures for some flaming wins.",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/FireHopper.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:mysterymuseum": {
        title: "Mystery Museum",
        description: "Uncover the secrets of the past, tonight, at Mystery Museum! History shall be revealed to you through the Mystery Stacks Symbols; landing 3 or more of them exposes what hides inside, revealing symbols that pay anywhere along all 10 Win Lines. The Mystery Stacks hold even more secrets during the Free Spins, becoming locked on the reels whenever they land. Each spin, they reveal different symbols: Is it the runic stone or the Pharaoh’s riches waiting to be unearthed? ",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/mysterymuseum.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:AnksunamunthequeenofEgypt": {
        title: "Anksunamun: the queen of Egypt",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/AnksunamunthequeenofEgypt.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:BambooBear": {
        title: "Bamboo Bear",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BambooBear.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/quickspin:TheWildChase": {
        title: "The Wild Chase",
        description: "Jump into the fast-paced action of the Wild Chase, where you and your fellow team of thieves are planning one last heist!\n\nSet in a glamorous resort town on the Riviera, the kind of place where the top 1% hang out, this game boasts stunning scenery, super slick graphics and a really exciting gameplay!\n\nThis slot is not only full of jewelry and expensive watches, it's also full of awesome features. Any win is rewarded with respins, and they continue as long as new wins are added! On top of that, the multiplier Wilds will multiply any win in which they are included.\n\nIf you're a fan of heist films, you're going to love this game!",
        image: "https://cdn.softswiss.net/i/s3/quickspin/TheWildChase.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/pushgaming:dinopolis": {
        title: "Dinopolis",
        description: "\"Ready for a night out on the town? Get down to the coolest casino around with the most roarsome guests you’ll ever meet!\r\n\r\nTake a seat at the table and collect those Dino coins - delightful wins are near in sight! For more excitement throughout the night, select your cards as you enter the Dino Bonus feature. Whatever the outcome, you’re sure to win great prizes, and keep an eye out for that shiny Golden card! Build up your levels, and be in awe at what lies in store for you.\"\r\n",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/dinopolis.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:jamminjarsde95": {
        title: "Jammin' Jars",
        description: "Get into the groove with Jammin’ Jars!  Everyone’s dancing to the rhythm, as Jam Jars jive across the dance floor with every win, creating even more wins as their multiplier continues to grow. The Rainbow Feature brings massive fruit symbols to the dance floor, before bursting into massive wins. When three Jam Jars hit the dance floor, the Funky Free Games begins! Watch as the Jam Jars dance up a storm, and the multipliers go on for those Jammin Wins!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/jamminjarsde95.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:Roulette": {
        title: "Roulette",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Roulette.png",
        keywords: "wallfair, crypto, casino, roulette, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:trollfaces": {
        title: "Troll Faces",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/trollfaces.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/pushgaming:MountMagmas": {
        title: "Mount Magmas",
        description: "Feeling adventurous?\r\n\r\nDiscover the beauty and immense power of mother nature by exploring the almighty Mount Magmas - our fascinating volcano jackpots that keep getting hotter and hotter and can erupt at any moment!\r\n\r\nMount Magmas offers both a daily and a mega jackpot, as well as an exploding base game and a Volcano Bonus with some hot instant prizes and a chance to climb to the top of the mountain even faster. ",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/MountMagmas.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:BlockyBlock2": {
        title: "Blocky Block 2",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BlockyBlock2.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:BushidoBlade": {
        title: "Bushido Blade",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BushidoBlade.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/quickspin:WildHarlequinbasic": {
        title: "Wild Harlequin",
        description: "Welcome to the smoky back tent of an independent circus, where a talented magician owns the stage. But is she really alone up there? Or does she have a twin? It's all smoke and mirrors in this show. Nothing is what it seems, and everything turns out to be even more fantastical than the card tricks being performed.Catch this travelling circus while you can, because once this sneaky lady has moved on with her entourage there' no trace to be seen. Not even a dent in the field. Makes you wonder if it was all a dream",
        image: "https://cdn.softswiss.net/i/s3/quickspin/WildHarlequinbasic.png",
        keywords: "wallfair, crypto, casino, slots, quickspin, quickspin"
    },
    "/softswiss-game/mrslotty:jewelsbeat": {
        title: "Jewels Beat",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/jewelsbeat.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:LionsPride": {
        title: "Lion's Pride",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/LionsPride.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/pushgaming:fatrabbit": {
        title: "Fat Rabbit",
        description: "Fire up the tractor and get ready for some fun on the farm with Fat Rabbit. Plant those crunchy wild carrots for a rich harvest! Be on the lookout for the Wild Rabbit; feed him a carrot to start the Bonus Feature and watch him grow! Keep the carrots coming to fatten him up into a bigger and juicier wild! Snatch those carrots and chase that rabbit for hopping big wins!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/fatrabbit.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:jamminjars2": {
        title: "Jammin' Jars 2",
        description: "\"Everyone’s favourite game is back, and it’s groovier than ever!\r\n\r\nHead on over to the fruity dancefloor once again and rave to the rhythm with the coolest DJ around.\r\n\r\nWild Jam Jars continue to jive across the dancefloor creating even more colourful wins as their Multipliers start to grow. Keep an eye out on the DJ, as he collects golden vinyls and suddenly changes the tune with a Fruity Blast surprise! Dance up a storm as you enter the raving Free Games with even Juicier Wins in store.\"",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/jamminjars2.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:landofzenith": {
        title: "Land of Zenith",
        description: "\"Embark on an adventure to uncover the history of the land in the sky! Throughout your journey, you’ll encounter extraordinary explorers who’ll guide you through some exquisite treasures and reveal untold secrets of the sky.\r\n\r\nVisible through the clouds is an intriguing golden disc mechanism. Legend has it this device can trigger fantastic features for you throughout your journey! Watch out for the Orbs in the Bouncing Mystery feature that reveals wins to you, and hold on tight as there may be some turbulence as things speed up during the gripping Hypermode™ Free Spins feature!\"",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/landofzenith.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:MountMagmas1": {
        title: "Mount Magmas",
        description: "A Base Game that’s got some hot potential with 20 winlines, super stacked symbols and TWO high paying symbols that pay 500x for a single full line win!\r\nWatch out for the scorching magma rocks that can fall during the Base Game. These travel to the volcano and can trigger the Volcano Bonus where things heat up even further! Hot Instant Prizes that can go up all the way to 20,000x can be enjoyed.",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/MountMagmas1.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:40WildClover": {
        title: "40 Wild Clover",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/40WildClover.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:AncientRome": {
        title: "Ancient Rome",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/AncientRome.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:BlockyBlock": {
        title: "Blocky Block",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BlockyBlock.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:China": {
        title: "China",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/China.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:marsdinner": {
        title: "MarsDinner",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/marsdinner.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:monsterbirds": {
        title: "Monster Birds",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/monsterbirds.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/pushgaming:BigBamboo": {
        title: "Big Bamboo",
        description: "Delve into a zen-like experience, with a twist!\r\nAs you embrace the calm of Asian inspired surroundings, you’ll encounter deep secrets and vibrant riches hidden beneath plentiful bamboo that will spark your senses.\r\nSway to the rhythm of enchanting Japanese music as more and more surprises are revealed from magical Mystery Stacks, along with the chance to take unforgettable gambles.",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/BigBamboo.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:razorsharkde95": {
        title: "Razor Shark",
        description: "Grab your swimming gear and get ready to dive into deep sea treasures with Razor Shark! Nudging Mystery Stacks will have streams of wins flowing to those who dare to explore the Big Blue. With a little luck, they may even be able to find the riches hidden within the Razor Reveal Feature! Finding 3 explosive scatter symbols will sink you deeper, where Mystery Stacks and an increasing multiplier can keep you submerged... Forever!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/razorsharkde95.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:3Treasures": {
        title: "3 Treasures",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/3Treasures.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:7Heroines": {
        title: "7 Heroines",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/7Heroines.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Baccarat": {
        title: "Baccarat",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Baccarat.png",
        keywords: "wallfair, crypto, casino, card, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:bookofluxordouble": {
        title: "Book of Luxor Double",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/bookofluxordouble.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:classic7fruits": {
        title: "Classic7Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/classic7fruits.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:CrystalHot80": {
        title: "Crystal Hot 80",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/CrystalHot80.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:electric7fruits": {
        title: "Electric7Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/electric7fruits.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/pushgaming:jamminjars": {
        title: "Jammin' Jars",
        description: "Get into the groove with Jammin’ Jars!  Everyone’s dancing to the rhythm, as Jam Jars jive across the dance floor with every win, creating even more wins as their multiplier continues to grow. The Rainbow Feature brings massive fruit symbols to the dance floor, before bursting into massive wins. When three Jam Jars hit the dance floor, the Funky Free Games begins! Watch as the Jam Jars dance up a storm, and the multipliers go on for those Jammin Wins!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/jamminjars.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:shadoworder": {
        title: "The Shadow Order",
        description: "The Shadow Order is an ancient organization, working covertly in the halls of power. Always adhering to their own system of morality, veiled in the power of hidden symbols, members of the Order have a way of predicting seemingly random coincidences.",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/shadoworder.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:razorsharkde90": {
        title: "Razor Shark",
        description: "Grab your swimming gear and get ready to dive into deep sea treasures with Razor Shark! Nudging Mystery Stacks will have streams of wins flowing to those who dare to explore the Big Blue. With a little luck, they may even be able to find the riches hidden within the Razor Reveal Feature! Finding 3 explosive scatter symbols will sink you deeper, where Mystery Stacks and an increasing multiplier can keep you submerged... Forever!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/razorsharkde90.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:5Blessings": {
        title: "5 Blessings",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/5Blessings.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:ActionHot20": {
        title: "Action Hot 20",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ActionHot20.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:BennystheBiggestgame": {
        title: "Benny's the Biggest game",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BennystheBiggestgame.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:BuffaloFortune": {
        title: "Buffalo Fortune",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BuffaloFortune.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:CasinoHoldem": {
        title: "Casino Hold'em",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/CasinoHoldem.png",
        keywords: "wallfair, crypto, casino, card, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:crazyhalloween": {
        title: "Crazy Halloween",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/crazyhalloween.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:Cursed": {
        title: "Cursed",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Cursed.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:DragonofTheEasternSea": {
        title: "Dragon of The Eastern Sea",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/DragonofTheEasternSea.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:EnterTheKTV": {
        title: "Enter The KTV",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/EnterTheKTV.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/pushgaming:jamminjars2de90": {
        title: "Jammin' Jars 2",
        description: "\"Everyone’s favourite game is back, and it’s groovier than ever!\r\n\r\nHead on over to the fruity dancefloor once again and rave to the rhythm with the coolest DJ around.\r\n\r\nWild Jam Jars continue to jive across the dancefloor creating even more colourful wins as their Multipliers start to grow. Keep an eye out on the DJ, as he collects golden vinyls and suddenly changes the tune with a Fruity Blast surprise! Dance up a storm as you enter the raving Free Games with even Juicier Wins in store.\"",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/jamminjars2de90.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:jamminjars2de95": {
        title: "Jammin' Jars 2",
        description: "\"Everyone’s favourite game is back, and it’s groovier than ever!\r\n\r\nHead on over to the fruity dancefloor once again and rave to the rhythm with the coolest DJ around.\r\n\r\nWild Jam Jars continue to jive across the dancefloor creating even more colourful wins as their Multipliers start to grow. Keep an eye out on the DJ, as he collects golden vinyls and suddenly changes the tune with a Fruity Blast surprise! Dance up a storm as you enter the raving Free Games with even Juicier Wins in store.\"",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/jamminjars2de95.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:tikitumble": {
        title: "Tiki Tumble",
        description: "Join us explorers and thrill seekers; as The Tiki totem Gods will happily lend their powers to those deemed worthy! With the Wild Nudging feature, stacks of wilds will nudge down the reels; shifting and sliding potential wins upon each spin! Those lucky enough to catch glimpse of the cackling scatter symbols, will enter the ruins... Where the 'Tiki Bonus' awaits. Wilds will continuously nudge with free re-spins and increasing infinite multiplier potential!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/tikitumble.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:5CloverFire": {
        title: "5 Clover Fire",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/5CloverFire.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:aztecpyramids": {
        title: "Aztec Pyramids",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/aztecpyramids.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:BookofBruno": {
        title: "Book of Bruno",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BookofBruno.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:ChineseBoss": {
        title: "Chinese Boss",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ChineseBoss.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:CryptomaniaNumbers": {
        title: "Cryptomania Numbers",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/CryptomaniaNumbers.png",
        keywords: "wallfair, crypto, casino, lottery, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:DeepJungle": {
        title: "Deep Jungle",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/DeepJungle.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:EmpressRegnant": {
        title: "Empress Regnant",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/EmpressRegnant.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:firedice5": {
        title: "5 Dice Fire",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/firedice5.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:fruitsanddiamonds": {
        title: "Fruits&Diamonds",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/fruitsanddiamonds.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/pushgaming:jamminjarsde90": {
        title: "Jammin' Jars",
        description: "Get into the groove with Jammin’ Jars!  Everyone’s dancing to the rhythm, as Jam Jars jive across the dance floor with every win, creating even more wins as their multiplier continues to grow. The Rainbow Feature brings massive fruit symbols to the dance floor, before bursting into massive wins. When three Jam Jars hit the dance floor, the Funky Free Games begins! Watch as the Jam Jars dance up a storm, and the multipliers go on for those Jammin Wins!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/jamminjarsde90.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:vikingclash": {
        title: "Viking Clash",
        description: "Sound the war drums and sharpen your axes, it’s a Viking Clash! Watch out for waves on the open waters, bringing Wild Ships sailing across the reels. Cut to the chase, as the combatants collide in the exciting Viking Battle Free Games Feature. Cannons and Catapults launch Locking Wilds onto the reels, with the potential for unlimited free spins! Vikings Clash and Big Wins ensue!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/vikingclash.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:777diamonds": {
        title: "777 Diamonds",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/777diamonds.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:BeachLife": {
        title: "Beach Life",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BeachLife.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:BookofSpellsDeluxe": {
        title: "Book of Spells Deluxe",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BookofSpellsDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:cleopatra18": {
        title: "Cleopatra 18+",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/cleopatra18.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:CrystalsofMagic": {
        title: "Crystals of Magic",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/CrystalsofMagic.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:emojislot": {
        title: "Emoji Slot",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/emojislot.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:ForestFruits": {
        title: "Forest Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ForestFruits.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:FruitsandStars40": {
        title: "Fruits and Stars 40",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/FruitsandStars40.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:GemzGrow": {
        title: "Gemz Grow",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/GemzGrow.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/pushgaming:jokertroupe": {
        title: "Joker Troupe",
        description: "\"Get ready to go crazy!\r\n\r\nPlayers get to enjoy three breath-taking features, Hot Frenzy Freespins, Flipping Cool Tower and Rainbow Booster Wheel. The game offers tons of excitement that's guaranteed to provide players with an awesome game play! Traditional Joker games have faced their modern match in Joker Troupe! This game is highly volatile, maximizing the chance of delivering the most insane action possible. \"",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/jokertroupe.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/pushgaming:wheelofwonders": {
        title: "Wheel of Wonders",
        description: "\"There’s more than meets the eye when venturing through an ancient wonder of the world. As you uncover mysterious relics, keep watch for the mighty gods and wild creatures that will reveal more hidden wonders to you.\r\n\r\nBuild up the reels and be rewarded with instant prizes and awe-inspiring features from the Ancient Wheels. Once you reach the top, revel in the unlimited progressive multipliers that the Wheel of Wonder brings in the Free Spins Feature. \"",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/wheelofwonders.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:actionhot40": {
        title: "Action Hot 40",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/actionhot40.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:BigGameSafari": {
        title: "Big Game Safari",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BigGameSafari.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:BurningPearl": {
        title: "Burning Pearl",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BurningPearl.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:ChilliHunter": {
        title: "Chilli Hunter",
        description: "Chilli Hunter is Mexican-themed slot, which comes with 25 paylines, a bonus round full of free spins, and the potential for completely wild reels if player can hunt down the chillies. This 5x5 slot is a colourful and exciting journey into the world of Mexico. Free spins and bonus features available.",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ChilliHunter.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Cryptomania": {
        title: "Cryptomania",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Cryptomania.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:CrystalJewels": {
        title: "Crystal Jewels",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/CrystalJewels.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:ElGrandeToro": {
        title: "El Grande Toro",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ElGrandeToro.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:firedice40": {
        title: "40 Dice Fire",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/firedice40.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/pushgaming:wildwheel": {
        title: "Wild Wheel",
        description: "Step right up to the Wild Wheel and spin to win Big Money!  With some nudges in the right direction, complete the Wild Wheel and land yourself a top prize! Like the prize?  Take it.  Don’t like the prize?  Leave it… and spin the wheel again!  Round and round it goes.  Spin yourself dizzy, and find yourself jumping for joy when you upgrade the wheel to the highest level and take home that Big Money!",
        image: "https://cdn.softswiss.net/i/s3/pushgaming/wildwheel.png",
        keywords: "wallfair, crypto, casino, slots, pushgaming, pushgaming"
    },
    "/softswiss-game/mrslotty:AlohaCharm": {
        title: "Aloha Charm",
        description: "Aloha to an unforgettable journey of the great winnings and excitement. Let the power of the Hula take you to an amazing adventure. Embrace the magic and feel the mysterious charms of the islands. Enjoy Hawaiian dance and win incredible awards. Welcome to Hawaii.",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/AlohaCharm.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:BlackJack": {
        title: "Black Jack",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BlackJack.png",
        keywords: "wallfair, crypto, casino, card, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:BurningPearlNumbers": {
        title: "Burning Pearl Numbers",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/BurningPearlNumbers.png",
        keywords: "wallfair, crypto, casino, lottery, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:cryptomatrix": {
        title: "Crypto Matrix",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/cryptomatrix.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:DiceofSpells": {
        title: "Dice of Spells",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/DiceofSpells.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:enchanted7s": {
        title: "Enchanted 7s",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/enchanted7s.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:FourDragons": {
        title: "Four Dragons",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/FourDragons.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:golden7fruits": {
        title: "Golden7Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/golden7fruits.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:HotFruits1": {
        title: "Hot Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/HotFruits1.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:JollyPoker": {
        title: "Jolly Poker",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/JollyPoker.png",
        keywords: "wallfair, crypto, casino, poker, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:jungletreasure": {
        title: "JungleTreasure",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/jungletreasure.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:lollasworld": {
        title: "Lolla's World",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/lollasworld.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:trendyskulls": {
        title: "Trendy Skulls",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/trendyskulls.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:TurboHot80": {
        title: "Turbo Hot 80",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TurboHot80.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:VikingGold": {
        title: "Viking Gold",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/VikingGold.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:WinningStars": {
        title: "Winning Stars",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/WinningStars.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mascot:AnksunamunTQoE": {
        title: "Anksunamun: the queen of Egypt",
        description: "Beautiful queen Anksunamun, Nefertiti daughter, will help you unravel the mystery of pharaoh's tomb. Are you ready for a thrilling adventure? Great treasures, severe gods, pharaohs and pyramids - enjoy the breathtaking world of Ancient Egypt!",
        image: "https://cdn.softswiss.net/i/s3/mascot/AnksunamunTQoE.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kagaming:AThirstyCrow": {
        title: "A Thirsty Crow",
        image: "https://cdn.softswiss.net/i/s3/kagaming/AThirstyCrow.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mrslotty:KatanasofTime": {
        title: "Katanas of Time",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/KatanasofTime.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:luckybrilliants": {
        title: "Lucky Brilliants",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/luckybrilliants.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:MermaidsBay": {
        title: "Mermaid's Bay",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/MermaidsBay.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:NeptuneNumbers": {
        title: "Neptune Numbers",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/NeptuneNumbers.png",
        keywords: "wallfair, crypto, casino, lottery, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:PeachBanquet": {
        title: "Peach Banquet",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/PeachBanquet.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:SevenClassicSlot": {
        title: "Seven Classic Slot",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/SevenClassicSlot.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:TaiShangLaoSun": {
        title: "Tai Shang Lao Sun",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TaiShangLaoSun.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:TheRite": {
        title: "The Rite",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TheRite.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:TripleHot": {
        title: "Triple Hot",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TripleHot.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:TwentyFruits": {
        title: "Twenty Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TwentyFruits.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:veryhot5": {
        title: "Very Hot 5",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/veryhot5.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:WildSpirit": {
        title: "Wild Spirit",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/WildSpirit.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mascot:aloha_tiki_bar": {
        title: "Aloha! Tiki Bar",
        description: "The game's mechanic is as simple as it is attractive - the Mascot team has taken one of their\r\nmost popular games, Fruit Vegas, and updated it just the way the players wanted. The new\r\ngame offers six reels instead of the usual 5 and 3600 pay ways for even more winning\r\nopportunities.",
        image: "https://cdn.softswiss.net/i/s3/mascot/aloha_tiki_bar.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mrslotty:LadyHawk": {
        title: "Lady Hawk",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/LadyHawk.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:LuckyPanda": {
        title: "Lucky Panda",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/LuckyPanda.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:MegaFortuneGod": {
        title: "Mega Fortune God",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/MegaFortuneGod.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Monsters": {
        title: "Monsters",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Monsters.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:NorthernHeat": {
        title: "Northern Heat",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/NorthernHeat.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:PrinceofPersia": {
        title: "Prince of Persia",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/PrinceofPersia.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:SamuraiWarrior": {
        title: "Samurai Warrior",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/SamuraiWarrior.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Shaolin": {
        title: "Shaolin",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Shaolin.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Talisman": {
        title: "Talisman",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Talisman.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:ThreeCorsairs": {
        title: "Three Corsairs",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ThreeCorsairs.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:tropical7fruits": {
        title: "Tropical7Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/tropical7fruits.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:TwinklingHot5": {
        title: "Twinkling Hot 5",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TwinklingHot5.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:wild7fruits": {
        title: "Wild7Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/wild7fruits.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:wildvegas": {
        title: "Wild Vegas",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/wildvegas.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:zeusthethunderer2": {
        title: "Zeus the Thunderer II",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/zeusthethunderer2.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/kagaming:Aurora": {
        title: "Aurora",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Aurora.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mrslotty:Legioner": {
        title: "Legioner",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Legioner.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:LuckyRooster": {
        title: "Lucky Rooster",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/LuckyRooster.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Modern7Wonders": {
        title: "Modern 7 Wonders",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Modern7Wonders.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:NuggetHunters": {
        title: "Nugget Hunters",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/NuggetHunters.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:PurplePills": {
        title: "Purple Pills",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/PurplePills.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:SantasWorkshop": {
        title: "Santa's Workshop",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/SantasWorkshop.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:SuperFruit": {
        title: "Super Fruit",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/SuperFruit.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:ThirdPrincesJourney": {
        title: "Third Prince's Journey",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ThirdPrincesJourney.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:TwinklingHot40": {
        title: "Twinkling Hot 40",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TwinklingHot40.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:VIPRoulette": {
        title: "VIP Roulette",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/VIPRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:WitchsBrew": {
        title: "Witch's Brew",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/WitchsBrew.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mascot:baccarat_mg": {
        title: "Baccarat",
        description: "Baccarat historically was the favorite entertainment of aristocratic high society, in the original version secret agent 007 James Bond played exactly this game. Try your luck not wearing a tuxedo – you are invited to our virtual table!",
        image: "https://cdn.softswiss.net/i/s3/mascot/baccarat_mg.png",
        keywords: "wallfair, crypto, casino, card, mascot, mascot"
    },
    "/softswiss-game/mascot:candy_crush": {
        title: "The Candy Crush",
        description: "Doughnuts, biscuits, and marshmallows in the brand new colorful video slot by Mascot Gaming. Please, welcome - The Candy Crush!",
        image: "https://cdn.softswiss.net/i/s3/mascot/candy_crush.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:holdem_mg": {
        title: "Casino Hold'em",
        description: "Feel the Las Vegas vibe and try your luck against the casino! Enjoy our classical interpretation of Texas Casino Hold'em – the most popular sort of poker game.",
        image: "https://cdn.softswiss.net/i/s3/mascot/holdem_mg.png",
        keywords: "wallfair, crypto, casino, video_poker, mascot, mascot"
    },
    "/softswiss-game/mrslotty:LightningGod": {
        title: "Lightning God",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/LightningGod.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:LuxRoulette": {
        title: "Lux Roulette",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/LuxRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:MegaHot": {
        title: "Mega Hot",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/MegaHot.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:MoneyVault": {
        title: "Money Vault",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/MoneyVault.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:NumbersDeluxe": {
        title: "Numbers Deluxe",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/NumbersDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Pyramid": {
        title: "Pyramid",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Pyramid.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:Retro7Hot": {
        title: "Retro 7 Hot",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Retro7Hot.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:StarGems": {
        title: "Star Gems",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/StarGems.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:royal7fruits": {
        title: "Royal7Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/royal7fruits.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:TheMyth": {
        title: "The Myth",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TheMyth.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:TripleDice": {
        title: "Triple Dice",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TripleDice.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:TwentyDice": {
        title: "Twenty Dice",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TwentyDice.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:veryhot40": {
        title: "Very Hot 40",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/veryhot40.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:WildKingdom": {
        title: "Wild Kingdom",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/WildKingdom.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:zeusthethunderer": {
        title: "Zeus the Thunderer",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/zeusthethunderer.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mascot:fairytale_coven": {
        title: "Fairytale Coven",
        description: "FAIRYTALE COVEN is based on a magic forest theme that serves as home to the coven of powerful fairies. It boasts a unique Risk&Buy feature that allows players to make decisions that impact the result of the game and the size of their win.",
        image: "https://cdn.softswiss.net/i/s3/mascot/fairytale_coven.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mrslotty:LionsDance": {
        title: "Lions Dance",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/LionsDance.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:LostBook": {
        title: "Lost Book",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/LostBook.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:mermaidgold": {
        title: "Mermaid Gold",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/mermaidgold.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:MythicalFireQilin": {
        title: "Mythical Fire Qilin",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/MythicalFireQilin.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/kagaming:Nian": {
        title: "Nian",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Nian.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mrslotty:pandameme": {
        title: "PandaMEME",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/pandameme.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:Phoenix888": {
        title: "Phoenix888",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Phoenix888.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:StarRunner": {
        title: "Star Runner",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/StarRunner.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:TheTomb": {
        title: "The Tomb",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TheTomb.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:TropicalHot": {
        title: "Tropical Hot",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TropicalHot.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:unicorngems": {
        title: "Unicorn Gems",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/unicorngems.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:wildcloverdice40": {
        title: "40 Wild Dice",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/wildcloverdice40.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:xmasparty": {
        title: "Xmas Party",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/xmasparty.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:ZhugeLiang": {
        title: "Zhuge Liang",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ZhugeLiang.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mascot:bennys_the_biggest_game": {
        title: "Benny's the Biggest game",
        description: "It's time to try our amusing video slot with juicy cartoon graphics and exciting features. Multiply your winnings with Benny's Shoot Me bonus and catch Elephant's free spins game with up to x125 multiplier Wilds. Thrilling jungle adventure has never been so funny!",
        image: "https://cdn.softswiss.net/i/s3/mascot/bennys_the_biggest_game.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mrslotty:lionthelord": {
        title: "Lion The Lord",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/lionthelord.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:memefaces": {
        title: "Meme Faces",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/memefaces.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:MrTiger": {
        title: "Mr Tiger",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/MrTiger.png",
        keywords: "wallfair, crypto, casino, slots, augustgaming, mrslotty"
    },
    "/softswiss-game/mrslotty:OctagonGem2": {
        title: "Octagon Gem 2",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/OctagonGem2.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Queen2": {
        title: "Queen 2",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Queen2.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:RobinofLoxley": {
        title: "Robin of Loxley",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/RobinofLoxley.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:Starlight": {
        title: "Starlight",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Starlight.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:TropicalCrush": {
        title: "Tropical Crush",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TropicalCrush.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:unicorncasinofruits": {
        title: "Casino Fruits",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/unicorncasinofruits.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:wildclover506": {
        title: "50 Wild Cash",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/wildclover506.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:Wizard": {
        title: "Wizard",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Wizard.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mascot:bamboo_bear": {
        title: "Bamboo Bear",
        description: "The smooth rustle of bamboo stalks, the murmur of a cool mountain stream... Tranquility and peace reign in the Chinese garden. Like Yin and Yang, game excitement and spiritual balance inevitably meet each other. Find your harmony with a bamboo bear!",
        image: "https://cdn.softswiss.net/i/s3/mascot/bamboo_bear.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:cleopatras_gems_rockways": {
        title: "Cleopatra's gems. Rockways",
        image: "https://cdn.softswiss.net/i/s3/mascot/cleopatras_gems_rockways.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mrslotty:LostRealm": {
        title: "Lost Realm",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/LostRealm.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:megacubesdeluxe": {
        title: "MEGA CUBES DELUXE",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/megacubesdeluxe.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:monsterinos": {
        title: "Monsterinos",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/monsterinos.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:OctagonGem": {
        title: "Octagon Gem",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/OctagonGem.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:quarantine": {
        title: "Quarantine",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/quarantine.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:Riot": {
        title: "Riot",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Riot.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:Scheherazade": {
        title: "Scheherazade",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Scheherazade.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:superdragonsfire": {
        title: "Super Dragons Fire",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/superdragonsfire.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:TheWildProtectors": {
        title: "The Wild Protectors",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TheWildProtectors.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:TurboDice40": {
        title: "Turbo Dice 40",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TurboDice40.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:vegasafterparty": {
        title: "Vegas AfterParty",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/vegasafterparty.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:WildFaires": {
        title: "Wild Faires",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/WildFaires.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Yggdrasil": {
        title: "Yggdrasil",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Yggdrasil.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mascot:dragons_nest": {
        title: "Dragon's Nest",
        description: "In a faraway castle a Great Dragon guards his precious eggs like the apple of an eye. Try to grab this treasured trophy from him!",
        image: "https://cdn.softswiss.net/i/s3/mascot/dragons_nest.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:purple_pills": {
        title: "Purple Pills",
        description: "Are you bored? We have a remedy for you! Without a doctor’s prescription.",
        image: "https://cdn.softswiss.net/i/s3/mascot/purple_pills.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mrslotty:MerlinsTower": {
        title: "Merlin's Tower",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/MerlinsTower.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:MysteryJokerHot": {
        title: "Mystery Joker Hot",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/MysteryJokerHot.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:OngBak2": {
        title: "Ong Bak 2",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/OngBak2.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/kagaming:Nvwa": {
        title: "Nvwa",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Nvwa.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mrslotty:QueenofSpades": {
        title: "Queen of Spades",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/QueenofSpades.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:shehebeach": {
        title: "She/He_beach",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/shehebeach.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:TemplarsQuest": {
        title: "Templars Quest",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TemplarsQuest.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:ThreeKingdoms2": {
        title: "Three Kingdoms 2",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/ThreeKingdoms2.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:TurboHOT100": {
        title: "Turbo Hot 100",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TurboHOT100.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:VenetianMagic": {
        title: "Venetian Magic",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/VenetianMagic.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:WildGiantPanda": {
        title: "Wild Giant Panda",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/WildGiantPanda.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mascot:3_corsairs": {
        title: "Three Corsairs",
        description: "Fair winds and following seas! Find the treasure map together with courageous corsairs, ahoy!",
        image: "https://cdn.softswiss.net/i/s3/mascot/3_corsairs.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:blackjack_mg": {
        title: "Black Jack",
        description: "What’s the first thing that comes to your mind when you think about casino? Of course, it’s Blackjack – a classic card game, popular all over the world. We made it as accessible as possible – sit at the virtual table, enjoy good music and play!",
        image: "https://cdn.softswiss.net/i/s3/mascot/blackjack_mg.png",
        keywords: "wallfair, crypto, casino, card, mascot, mascot"
    },
    "/softswiss-game/mascot:fruit_macau": {
        title: "Fruit Macao",
        description: "Nobody loves fruits as much as slot lovers. Our superhit fruits started their opulent voyage in Vegas. Ready, steady... and we are in fabulous Macau! Juicy fruits, immersive music, plenty of new thrilling features – open the second chapter of Mascot Gaming Fruit Trilogy. The next stop is Monaco!",
        image: "https://cdn.softswiss.net/i/s3/mascot/fruit_macau.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kagaming:AliceInWonderland": {
        title: "Alice In Wonderland",
        image: "https://cdn.softswiss.net/i/s3/kagaming/AliceInWonderland.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mrslotty:MerryScaryChristmas": {
        title: "Merry Scary Christmas",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/MerryScaryChristmas.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:NeptuneTreasure": {
        title: "Neptune Treasure",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/NeptuneTreasure.png",
        keywords: "wallfair, crypto, casino, slots, eagaming, mrslotty"
    },
    "/softswiss-game/mrslotty:Pirates": {
        title: "Pirates",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/Pirates.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:RedHorde": {
        title: "Red Horde",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/RedHorde.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mrslotty"
    },
    "/softswiss-game/mrslotty:sheheclub": {
        title: "She/He_club",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/sheheclub.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/kagaming:HappyThanksgiving": {
        title: "Happy Thanksgiving",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HappyThanksgiving.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mrslotty:thecrownfruit": {
        title: "The Crown Fruit",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/thecrownfruit.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:treasuresofegypt": {
        title: "Treasures of Egypt",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/treasuresofegypt.png",
        keywords: "wallfair, crypto, casino, slots, mrslotty, mrslotty"
    },
    "/softswiss-game/mrslotty:TurboHot40": {
        title: "Turbo Hot 40",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/TurboHot40.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:VeryHot20": {
        title: "Very Hot 20",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/VeryHot20.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mrslotty:WildWest": {
        title: "Wild West",
        image: "https://cdn.softswiss.net/i/s3/mrslotty/WildWest.png",
        keywords: "wallfair, crypto, casino, slots, fazi, mrslotty"
    },
    "/softswiss-game/mascot:amaterasu_keno": {
        title: "Amaterasu Keno",
        image: "https://cdn.softswiss.net/i/s3/mascot/amaterasu_keno.png",
        keywords: "wallfair, crypto, casino, lottery, mascot, mascot"
    },
    "/softswiss-game/mascot:for_the_realm": {
        title: "For the Realm!",
        description: "The battle for a magical realm is on the rise in the universe of the new slot game by Mascot Gaming. The fantasy theme, loved by many, looks especially sharp thanks to the 3D character symbols. The developer has already stablished its reputation as the creator of online casino games with stunning graphics, but what else can the\r\nplayers expect from the new game?\r\nThe famous Risk&Buy feature is available after every spin, regardless of whether the player wins or loses. The game can increase the player’s win at any time if they are ready to take the risk - what a smart way to spice up the game, especially when it comes to big wins.",
        image: "https://cdn.softswiss.net/i/s3/mascot/for_the_realm.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:FruitsofLuxor": {
        title: "Fruits of Luxor",
        description: "Juicy splash in the sands of the Ancient World. Enjoy a fresh adventure to marvelous Luxor!",
        image: "https://cdn.softswiss.net/i/s3/mascot/FruitsofLuxor.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kagaming:Baccarat": {
        title: "Baccarat",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Baccarat.png",
        keywords: "wallfair, crypto, casino, card, kagaming, kagaming"
    },
    "/softswiss-game/mascot:BastetAndCats": {
        title: "Bastet and Cats",
        description: "Endless golden sands, pyramids and… cats. It's time to go to Ancient Egypt! Bastet, the goddess of joy, fun and richness will bring you luck. Meow!",
        image: "https://cdn.softswiss.net/i/s3/mascot/BastetAndCats.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:fruit_vegas": {
        title: "Fruit Vegas",
        description: "We all love the atmosphere of the good old Vegas. A bright cocktail made of colourful fruits, funny music and favourite features is waiting for you. Let yourself drain into a fresh, juicy world!",
        image: "https://cdn.softswiss.net/i/s3/mascot/fruit_vegas.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:merlins_tower": {
        title: "Merlin's Tower",
        description: "Far far away in the woods stands the Tower. White-haired wizard Merlin is doing his miracles here. Magic potion brings luck to everyone who comes here. Let’s go for a wonders and treasures!",
        image: "https://cdn.softswiss.net/i/s3/mascot/merlins_tower.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:robin_of_loxley": {
        title: "Robin of Loxley",
        description: "Get your bow and arrows ready! Go on the great adventure with a legendary and heroic outlaw Robin of Loxley!",
        image: "https://cdn.softswiss.net/i/s3/mascot/robin_of_loxley.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:AgeofDragons_k": {
        title: "Age of Dragons",
        description: "Age of Dragons is a 5-reel, 3-4-3-4-3 game with 40 paylines. There is an accumulation feature whereby symbols are accumulated to a counter for each column over multiple spins, and when a sufficient number is collected for a given column then the column becomes wild for a number of spins. Additionally, there is a free spinsbonus.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/AgeofDragons_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:BurningDiamonds_k": {
        title: "Burning Diamonds",
        description: "Burning Diamonds delivers the fiery volatility our players love. Use HyperBet to set the level of wild multipliers in the reels to chase those bigger wins and additional free spins or shortcut directly to the free spins rounds with a HyperBonus special bet. With luck on your side you could land one of four accumulating Bonus Jackpots and win big.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/BurningDiamonds_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:ElVigilante_k": {
        title: "El Vigilante",
        description: "If you have a problem and no one else can help, and you live in 19th Century California, who do you call? El Vigilante of course! Our latest good guy helps other good guys catch bad guys - whilst of course looking for massive potential wins in his own inimitable style. Featuring three game modes; the Base game, Free Spins, and K-Cash spins; El Vigilante is a true swashbuckling adventure!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/ElVigilante_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:HOLMESReelDetective_k": {
        title: "Holmes: Reel Detective",
        description: "Join the world’s greatest detectives, Holmes and Watson on a spectacular clue chase through Victorian London! Featuring K-Boost, K-Cash with a maximum 200x multiplier, 2 types of Free Spins and HyperBonus, the magic is indubitably the mystery in this extraordinarily compelling slots adventure.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/HOLMESReelDetective_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:JokerTimesXmas_k": {
        title: "Joker Times Xmas",
        image: "https://cdn.softswiss.net/i/s3/kalamba/JokerTimesXmas_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:PearlsofAphrodite_k": {
        title: "Pearls of Aphrodite",
        description: "Get immersed in the wonderful underwater world of Aphrodite!  Complete with Ocean Respins, Locking and Expanding Multiplier Wilds, HyperBet and HyperBonus, Pearls of Aphrodite is an engaging, enjoyable blend of captivating visuals and great features.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/PearlsofAphrodite_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/mascot:book_of_amaterasu": {
        title: "Book Of Amaterasu",
        description: "The great goddes of the Sun Amaterasu is shining in the sky. Look, she's opened her book in front of you! Now your fate is in your hands.",
        image: "https://cdn.softswiss.net/i/s3/mascot/book_of_amaterasu.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:gryphons_castle": {
        title: "Gryphon's Castle",
        description: "Noble Gryphon guards a castle full of treasures. Will you dare to take them? Your bravery deserves a great reward!",
        image: "https://cdn.softswiss.net/i/s3/mascot/gryphons_castle.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:primal_bet_rockways": {
        title: "Primal Bet. Rockways",
        description: "Badass dinosaurs await you with the most exciting game mechanics in the new slot game by Mascot Gaming - PRIMAL BET. ROCKWAYS. Hear the roar!",
        image: "https://cdn.softswiss.net/i/s3/mascot/primal_bet_rockways.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:TwinFruitsofOlympus": {
        title: "Twin Fruits of Olympus",
        description: "The Olympus mountain is all covered with divine fruits. What are the gods up to? Take your chance and grab all the godsents in a new slot game!",
        image: "https://cdn.softswiss.net/i/s3/mascot/TwinFruitsofOlympus.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:AtlantisThunderStPatricksDay_k": {
        title: "Atlantis Thunder St. Patrick's Day",
        description: "Showcasing the flexibility of custom game assets to meet promotional, brand and seasonal requirements of our operator partners, celebrate St. Patrick's day with a seasonal twist to a player favourite Atlantis Thunder. Atlantis Thunder is a 6 reels, 3-4-5-5-4-3 rows, 3600 pay ways game with free spins, hyper bonus, progressive jackpots and multiplier wild symbols. A Free Spins Bonus is triggered when 3 or more special symbols appear during the base game. The volatile free spins mechanic comes with high potential for retriggers. Wild symbols act as multipliers, raising excitement for a well-known feature. The Personal Progressive Jackpots is a proven engagement and retention mechanic from previous game releases and targets high-value players. Players rewarded with higher jackpots for extended play or higher bets. Hyper Bonus  monetization mechanic  targeting all player demographics. Used highly successfully in land-based casinos, now available online in Kalamba Games giving a player option to go directly to free spins. Intuitive win feedback with ways pays well suited to retention and engagement. Frequent retrigger in frees pins rounds with multipliers encouraging engagement.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/AtlantisThunderStPatricksDay_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:BeersonReels_k": {
        title: "Beers on Reels",
        image: "https://cdn.softswiss.net/i/s3/kalamba/BeersonReels_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:CrystalCavern_k": {
        title: "Crystal Cavern",
        description: "The Crystal Cavern is a place to seek precious stones, relaxing fun - and big potential wins! Atmospheric sounds and sparkling symbols allow players to get engaged and enjoy chilling out whilst having a huge amount of fun. Proven monetisation and retention features make this game sure to charm players from all backgrounds.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/CrystalCavern_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:GatesofBabylon_k": {
        title: "Gates of Babylon",
        description: "Gates of Babylon is a 40-line 5x4 game with a novel accumulation mechanic to win multiple spins with stacked wilds. During the base game, when gold coin symbols land, they award a ruby for the reel on which they landed. When there are 3 rubies collected for any reel, the full reel becomes wild for 3 spins, with a chance to retrigger for more! The free spins features this same collection mechanic, but once a stacked wild is awarded it remains locked for all remaining spins, giving a chance to win one massive payout after another.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/GatesofBabylon_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:JokerLeprechauns_k": {
        title: "Joker Leprechauns",
        description: "What could be better than the luck of the Irish? The extreme volatility of a Joker game you say? Well, we have great news. We've wrapped both up all in one St Patrick's day extravaganza. Four levels of jackpots and HyperBonus and HyperBet round out this great seasonal, classic Vegas-style slot.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/JokerLeprechauns_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/mascot:cancan_saloon": {
        title: "CanCan Saloon",
        description: "We are going straight to the Wild Wild West: hey cowboy, do not pass by our wild saloon! Keep your wits sharp, your heart open, and your gun loaded. Hot girls and desperado guys wanted!",
        image: "https://cdn.softswiss.net/i/s3/mascot/cancan_saloon.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:hellsing": {
        title: "Hell'Sing",
        image: "https://cdn.softswiss.net/i/s3/mascot/hellsing.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:prince_of_persia_tgop": {
        title: "Prince of Persia: the Gems of Persepolis",
        description: "Oh, the marvelous and mysterious East, the land of fairy–tales, rich in gold and gems… Let's take an adventure together with Prince of Persia and hunt the legendary treasures!",
        image: "https://cdn.softswiss.net/i/s3/mascot/prince_of_persia_tgop.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:twin_fruits_of_santa": {
        title: "Twin Fruits of Santa",
        image: "https://cdn.softswiss.net/i/s3/mascot/twin_fruits_of_santa.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:BigBountyBill_k": {
        title: "Big Bounty Bill",
        description: "\"Join Big Bounty Bill on his journey to the Badlands in dogged pursuit of a gallery of original villains to reel in big prizes in this Retro-futurist slots adventure.  Packed with Kalamba signature features that let you play your own way, Big Bounty Bill lives up to his name with a maximum win of 5000x bet, allowing truly intrepid gunslingers out there to chase really big wins.Persistent Hyperspins add an extra layer of fun - collect expansion symbols to raise column height then collect 3 symbols to trigger HyperSpins.Can't wait to to land some prizes? Use our signature HyperBonus feature to shortcut to the bonus round 16807 ways pays and a maximum win of 5000x bet make Big Bounty Bill an essential addition to your collection. Bounty huntin' has never been more fun!\"",
        image: "https://cdn.softswiss.net/i/s3/kalamba/BigBountyBill_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:DoctorElectro_k": {
        title: "Doctor Electro",
        description: "Doctor Electo introduces a unique layer of player engagement with column expansion collection meters and the all new Hyperspins feature. Upping the bar again with art, animation and audio, Dr. Electro is a 5-column, 4-row base game with expanding reels, increasing to 7 rows and a huge 16807 ways pays. Collect column expansion symbols in the base game, trigger the all new Hyperspins feature to unlock the reels, then continue collection to further expand the reels and up the win potential. Enter free spins with Bonus scatter symbols or even immediately with a HyperBonus special bet. Expansion symbol collection in free spins extends reels directly and awards freespin retriggers. Progressive Platinum and Gold Bonus jackpots are back by popular demand and with expanded reels the opportunity to win big just increases. Packed with engagement, monetisation and retention - the classic Kalamba Games calling card!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/DoctorElectro_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:GoldFire7s_k": {
        title: "Gold Fire 7s",
        description: "Goldfire 7s is a classic style slot with an exciting respins feature and locking wild multipliers, which offers the player attractive and visibly huge potential wins. Coming with Kalamba's awesome missions feature and all the revolutionary promo tools, they provide an extra layer for increasing player engagement and retention. Players can select their own level, helping the early engagement funnel, while offering different rewards for long-term entertainment.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/GoldFire7s_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:JokerSupreme_k": {
        title: "Joker Supreme",
        description: "Joker Supreme captures a classic slot theme beautifully with clean, slick graphics and animations that will resonate with players across multiple markets. Hyper Bonus, player selected multipliers, bonus jackpots and a free spin collection mechanic are just a few in-game features giving an added twist to this masterpiece. Delivering top end volatility and potential returns, Joker Supreme is sure to wow and entertain our ever expanding fan base.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/JokerSupreme_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kagaming:AmericanBurger": {
        title: "American Burger",
        image: "https://cdn.softswiss.net/i/s3/kagaming/AmericanBurger.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mascot:fruit_monaco": {
        title: "Fruit Monaco",
        description: "From Vegas to Macau, from Macau to Monaco: our fruit tour of casino capitals is making a real blast. Feel the royal vibe, play like a king, enjoy your juicy victory in a classic fruit game!",
        image: "https://cdn.softswiss.net/i/s3/mascot/fruit_monaco.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kagaming:BaseballFever": {
        title: "Baseball Fever",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BaseballFever.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mascot:pinup_dolls": {
        title: "PinUp Dolls",
        description: "It's getting hot in here! Meet gorgeous ladies and take your prizes at our pin up cafe!",
        image: "https://cdn.softswiss.net/i/s3/mascot/pinup_dolls.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:merry_scary_christmas": {
        title: "Merry Scary Christmas!",
        description: "Ho Ho Ho Christmas is coming! It's a most wonderful time of the year… but wait, who stole all the gifts? Bad Santa wants to ruin the celebration – don't let him take your winnings! It's gonna be Scary Merry Christmas!",
        image: "https://cdn.softswiss.net/i/s3/mascot/merry_scary_christmas.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:the_myth": {
        title: "The Myth",
        description: "Do you believe in myths of dragon's treasures? Go on an adventure trip with powerful vikings then!",
        image: "https://cdn.softswiss.net/i/s3/mascot/the_myth.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:AgeofIceDragons_k": {
        title: "Age of Ice Dragons",
        description: "Welcome to \"Age of Ice Dragons\"! Another seasonal entry in our always growing library of games. Showcasing the flexibility of custom game assets to meet promotional, brand and seasonal requirements of our operator partners and adding a seasonal twist to our monstrously successful \"Age of Dragons\". This 5-reel, 3-4-3-4-3 game with 40 paylines and a 2000x bet max win gives and extra level of excitement by combining Kalamba's unique Missions mechanic (with bronze, silver, gold and platinum levels), accumulating wild symbols & super-volatile Free Spins Bonus effectively maximizing players engagement over time. Ice Dragon Throne awaits! Set the reels on fire and conquer it!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/AgeofIceDragons_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:CaribbeanAnne_k": {
        title: "Caribbean Anne",
        description: "Shiver me jackpots! Get ready to sail the seven seas with Caribbean Anne. High volatility and persistent player features make this one not to be missed!Hyperbonus, Hyperbet, Locking Multiplier Wilds and 4 level Bonus Jackpots all add to the fun and excitement as you get aboard and sail off on your pirate adventure.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/CaribbeanAnne_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:FinnegansFormula_k": {
        title: "Finnegan's Formula",
        image: "https://cdn.softswiss.net/i/s3/kalamba/FinnegansFormula_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:Joker3600_k": {
        title: "Joker 3600",
        description: "We are delighted to present you with yet another exceptional slot experience with a brand new Kalamba Games title: \"Joker 3600\"! This is a 6-column, 5/4/3/3/4/5 row game with ways pays. It includes the most wanted features like our signature Hyper Bonus (a shortcut to Free Spins which you can activate on demand) or Progressive Jackpots. Collecting bonus symbols in regular gameplay will also give you access to Free Spins. We re-designed the graphics and made this Joker experience more unique and up to date for the players. Let's enjoy this classic slot experience together!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/Joker3600_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:MauiMillions_k": {
        title: "Maui Millions",
        image: "https://cdn.softswiss.net/i/s3/kalamba/MauiMillions_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kagaming:AirCombat1942": {
        title: "Air Combat 1942",
        image: "https://cdn.softswiss.net/i/s3/kagaming/AirCombat1942.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ArcherRobinHood": {
        title: "Archer Robin Hood",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ArcherRobinHood.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BigApple": {
        title: "Big Apple",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BigApple.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mascot:gemz_grow": {
        title: "Gemz Grow",
        description: "The enchanting melody sounds in the mountains. This is a magical place where the sun shines and gems are hidden. Immerse yourself in this atmosphere and take your gems!",
        image: "https://cdn.softswiss.net/i/s3/mascot/gemz_grow.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:the_tomb_det": {
        title: "The Tomb",
        description: "Bewitched by a sorceress, ruthless Chinese Dragon Emperor has no mercy. His countless army turned into terracotta warriors. Who is brave enough to face the immortal army and unravel the riddle of Emperors' tomb? The adventure full of danger awaits you on the road to the treasure!",
        image: "https://cdn.softswiss.net/i/s3/mascot/the_tomb_det.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:AtlantisThunder_k": {
        title: "Atlantis Thunder",
        description: "Atlantis Thunder is a 6 reels, 3-4-5-5-4-3 rows, 3600 pay ways game with free spins, hyper bonus, progressive jackpots and multiplier wild symbols. A Free Spins Bonus is triggered when 3 or more special symbols appear during the base game. The volatile free spins mechanic comes with high potential for retriggers. Wild symbols act as multipliers, raising excitement for a well-known feature. The Personal Progressive Jackpots is a proven engagement and retention mechanic from previous game releases and targets high-value players. Players rewarded with higher jackpots for extended play or higher bets. Hyper Bonus  monetization mechanic  targeting all player demographics. Used highly successfully in land-based casinos, now available online in Kalamba Games giving a player option to go directly to free spins. Intuitive win feedback with ways pays well suited to retention and engagement. Frequent retrigger in frees pins rounds with multipliers encouraging engagement.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/AtlantisThunder_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:CosmicCharms_k": {
        title: "Cosmic Charms",
        image: "https://cdn.softswiss.net/i/s3/kalamba/CosmicCharms_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:FireEagle_k": {
        title: "Fire Eagle",
        description: "Fire Eagle has a unique reel layout with glossy high-res graphics that will instantly impress players. Already proving popular with players, it now comes with Kalamba's Missions. Players will have fun collecting different symbols for loads of different prizes and can choose between bronze and platinum missions for massive payouts of 1000x+ or even higher when promotions are running! The random stacked wilds, super exciting free spins rounds and the popular missions features, will quickly engage players for lasting entertainment. Missions provide an extra layer of player engagement and retention with attractive and variable rewards for completing objectives. Players can select their own level, helping the early engagement funnel while offering different pay-outs that drive long-term entertainment. The free spins offers visible potential for huge wins providing a high level of excitement The random stacked wilds give quick feedback that will further help player engagement.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/FireEagle_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:JokerLanterns_k": {
        title: "Joker Lanterns",
        description: "Joker Lanterns is a classic Vegas style slot theme with a Halloween twist. Jackpots, extra free spins and our signature HyperBonus feature are all there to make sure you have a super fun Halloween with massive potential wins!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/JokerLanterns_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:LadyLava_k": {
        title: "Lady Lava",
        image: "https://cdn.softswiss.net/i/s3/kalamba/LadyLava_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:Pharoah'sReign_k": {
        title: "Pharaoh’s Reign",
        description: "Get ready for a truly wild ride into antiquity with Pharaoh’s Reign! Featuring Multiplied Prizes, Free Spins, Morphing Wilds, Cashpots and our classic feature, HyperBonus, make sure your players have the chance to take a trip of a lifetime in this classic Egyptian-themed slots adventure.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/Pharoah'sReign_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/mascot:legioner": {
        title: "Legioner",
        description: "Once again the Emperor sends his legions to conquer new lands. Will the great Roman Empire be even more powerful? Join the Legioner for the sake of immortal victory!",
        image: "https://cdn.softswiss.net/i/s3/mascot/legioner.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:queen_of_spades": {
        title: "Queen of Spades",
        description: "Cards never lie, are you ready to risk to know your fate? Queen of Spades is waiting for you in her castle!",
        image: "https://cdn.softswiss.net/i/s3/mascot/queen_of_spades.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:re_kill": {
        title: "Re Kill",
        description: "Do you really think it's not possible? Look around, they are here! Zombie apocalypse has come and only the strongest will survive. If you brave enough try to stay alive...or say good bye to some of your body parts. Yummy!",
        image: "https://cdn.softswiss.net/i/s3/mascot/re_kill.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:venetian_magic": {
        title: "Venetian Magic",
        description: "Elegant women and gentlemen in masks, endless canals and songs of gondoliers - join the magnificent Venice carnival! Oh, Bella Italia!",
        image: "https://cdn.softswiss.net/i/s3/mascot/venetian_magic.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:BlazingBull2_k": {
        title: "Blazing Bull 2",
        description: "This bigger and even better sequel to last year's smash hit is sure to be a resounding hit among key target demographics.Featuring K-Boost, where players fill two meters with each base game spin to get a higher number of starting free spins, Two different Free Spins games, K-Split, and HyperBonus, Blazing Bull 2 truly takes the visuals and excitement to the next level!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/BlazingBull2_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:DoubleJoker_k": {
        title: "Double Joker",
        description: "Double Joker is a flashy classic style game with novel features on a 3x3 reel grid. Joker symbols are wild and can have up to a 3x multiplier, so any win can be multiplied up to 27x. The respins feature is triggered whenever 2 or more joker symbols appear, and joker symbols are locked in place wild the reels respin. This exciting feature gives players the volatility they crave, with the chance to lock jokers in all positions on the reels for even greater awards. Double Joker features Kalamba's missions mechanic, where players can choose what symbols to collect over 30, 50, 75, or 100 spins, and get paid out for the final number collected. This compelling retention feature adds a new layer of excitement to the game, and is sure to keep players coming back for more.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/DoubleJoker_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:GriffinsQuest_k": {
        title: "Griffin's Quest",
        description: "Battle mythological creatures in the search for the Mighty Griffin in our latest slot title. Journey up Mount Olympus and encounter Manticores and even the evil Goddess Medusa in an epic quest for big potential wins.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/GriffinsQuest_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:JokerSupremeXmasEdition_k": {
        title: "Joker Supreme Xmas Edition",
        description: "Have Yourself a Merry Little Christmas, with Joker Supreme: Christmas Edition!  Based on the smash hit earlier in the year, Joker Supreme: Christmas edition retains all the great features of the original game, with added Christmas sparkle.  HyperBonus, Selectable Wild Multipliers and Bonus Jackpots are present and special Santa Jokers have been added to make Christmas go with a swing in this highly volatile, classic-themed game.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/JokerSupremeXmasEdition_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:LegendofSenteng": {
        title: "Legend of Senteng",
        image: "https://cdn.softswiss.net/i/s3/kalamba/LegendofSenteng.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kagaming:AngryPiggies": {
        title: "Angry Piggies",
        image: "https://cdn.softswiss.net/i/s3/kagaming/AngryPiggies.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mascot:lions_pride": {
        title: "Lion's Pride",
        description: "Since the beginning of time wild animal world was lead by a strong lion and his pride. What role will you choose - predator or prey? Hear the roar of animal king!",
        image: "https://cdn.softswiss.net/i/s3/mascot/lions_pride.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:riot": {
        title: "Riot",
        description: "Dystopian end of the world theme and unique Risk and Buy feature deliver excitement, anticipation and trills. Are you ready for the Riot?",
        image: "https://cdn.softswiss.net/i/s3/mascot/riot.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:Agent51_k": {
        title: "Agent 51",
        description: "Travel back to the 1960s and meet the intrepid Agent 51 as he investigates all manner of unusual goings on in this mystery adventure. Complete with HyperBonus, and K-Loops (the new name for LuckyLoops), chase aliens and huge wins in this amazing new thriller.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/Agent51_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:BloodMoonExpress_k": {
        title: "Blood Moon Express",
        image: "https://cdn.softswiss.net/i/s3/kalamba/BloodMoonExpress_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:DucksTillDawn_k": {
        title: "Ducks Till Dawn",
        description: "Roll up roll up!  Come to the spooky fairground at twilight where you can try your luck at shooting ducks and scoring massive potential wins!  Get more free spins with our SpinBoost feature or go straight to the bonus feature with HyperBonus in this chilling and exciting adventure, where anything is possible if you can survive...from Ducks till Dawn.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/DucksTillDawn_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:GriffinsQuestXmas_k": {
        title: "Griffin's Quest Xmas",
        image: "https://cdn.softswiss.net/i/s3/kalamba/GriffinsQuestXmas_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:JokerTimes_k": {
        title: "Joker Times",
        image: "https://cdn.softswiss.net/i/s3/kalamba/JokerTimes_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:MonkeyGodBuyFeature_k": {
        title: "Monkey God Buy Feature",
        description: "Monkey God Buy Feature is a fresh take on a classic Kalamba title that allows the player to choose their preferred volatility level by enabling up to 4 Gold Symbols. Featuring an all-new UI, HyperBonus and other key tweaks, Monkey God Buy Feature is a great addition to any lobby.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/MonkeyGodBuyFeature_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kagaming:Aladdin": {
        title: "Aladdin",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Aladdin.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ArtistStudio": {
        title: "Artist Studio",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ArtistStudio.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BlockyBlocks2": {
        title: "Blocky Blocks 2",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BlockyBlocks2.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BonusVending": {
        title: "Bonus Vending",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BonusVending.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mascot:mermaids_bay": {
        title: "Mermaid's Bay",
        description: "The magical underwater world hides incredible treasures, but only the most courageous will get them. Beautiful mermaids will reveal the secret of the deep sea to you!",
        image: "https://cdn.softswiss.net/i/s3/mascot/mermaids_bay.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:the_evil_bet": {
        title: "The Evil Bet",
        description: "Bloody hell! Somewhere in the woods sinister creatures are up to crawl out the ground and make some noise. It's time to treat them with an old good chainsaw!",
        image: "https://cdn.softswiss.net/i/s3/mascot/the_evil_bet.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:AgeOfHuracan_k": {
        title: "Age of Huracan",
        description: "Enter the Age of Huracan! Our 50th game sees players exploring the Mayan temple in search of thrills and big potential wins. Packed with epic features, this trip into history delivers a truly legendary gaming experience.Can your players raid Huracan's treasure? There's only one way to find out - make sure Age of Huracan is in your lobby from from launch day!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/AgeOfHuracan_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:CaribbeanAnne2_k": {
        title: "Caribbean Anne 2",
        image: "https://cdn.softswiss.net/i/s3/kalamba/CaribbeanAnne2_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:FinnegansBanditos": {
        title: "Finnegan's Banditos",
        description: "Finnegan the lucky leprechaun has lost his pot of gold and been tricked into joining a group of 19th century banditos to try and get it back! Can you stop him and go for huge potential wins? Featuring three game modes; the Base game, Free Spins, and K-Cash Spins; Finnegan’s Banditos is an unmissable leprechaun fighting adventure!\t",
        image: "https://cdn.softswiss.net/i/s3/kalamba/FinnegansBanditos.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:HongBao_k": {
        title: "Hong Bao",
        description: "Random Walking Wilds is an all new engagement feature in this 4-row, 5 reel slot. Wild multipliers are set by players using the trusted Hyperbet mechanic, raising the minimum bet levels, driving monetisation and of course upping win potential and volatility. An excellent funneling mechanic for players transitioning from beginner-intermediate-VIP and testing the waters with higher volatility and payouts. 3 bonus symbols award Free spins and the random multiplier theme continues with locking wilds defined by the player selected HyberBet level. Symbol collection progression mechanics that extend session length open the Bonus Game which can be played at bronze, silver, gold and platinum levels. Extended game play rewards the higher Bonus Games levels and greater payout potential. Back by popular demand is HyperBonus to buy-in directly to free spins and raise average bet per round. Another fun and successful monetisation feature.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/HongBao_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:MammothChaseEasterEdition_k": {
        title: "Mammoth Chase Easter Edition",
        description: "Special Easter edition for the player favorite Mammoth Chase. A volatile ride with mammoth payout potential. A 4096-ways game that is designed from beginning to end to give players a volatile experience. It features stacked mammoth symbols that combine to award huge wins, and a free spins bonus with a frequent retrigger and where wild symbols act as multipliers, giving excitement to a well-known feature. As a final layer of volatility, Mammoth Chase has three levels of Bonus Jackpot that are awarded for scattered Mammoth symbols. The highest level jackpot starts from 1000x bet, giving an obvious chance to win big!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/MammothChaseEasterEdition_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kagaming:777Vegas": {
        title: "777 Vegas",
        image: "https://cdn.softswiss.net/i/s3/kagaming/777Vegas.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:AnimalFishing": {
        title: "Animal Fishing",
        image: "https://cdn.softswiss.net/i/s3/kagaming/AnimalFishing.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Bakery": {
        title: "Bakery Sweetness",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Bakery.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mascot:northen_heat": {
        title: "Northern Heat",
        description: "Frosty, freezy, cool! It's time to explore the spectacular Northern Pole. Follow the footsteps of gorgeous arctic animals and find a big winning!",
        image: "https://cdn.softswiss.net/i/s3/mascot/northen_heat.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:the_rite": {
        title: "The Rite",
        description: "Voodoo doll can protect from evil or destroy your enemies - what side do you choose? Mystery rites came here from Africa. Shaman hits the drum, performing his ritual...Spooky!",
        image: "https://cdn.softswiss.net/i/s3/mascot/the_rite.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/mascot:wild_spirit": {
        title: "Wild Spirit",
        description: "Have you ever heard the wolf singing to the moon? Open your mind to the wild spirit of beautiful savage lands.",
        image: "https://cdn.softswiss.net/i/s3/mascot/wild_spirit.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:BlazingBull_k": {
        title: "Blazing Bull",
        description: "Get close to nature and track Blazing Bull across this 6-reel, 4-row video slot where 4096 ways pays. Trekkers can collect silver and gold bonus symbols to trigger free spins with multipliers. Bears, Eagles, Wolves cougars are your spirit guides on the quest to find the Blazing Bull!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/BlazingBull_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:DesertGem_k": {
        title: "Desert Gem",
        description: "Set in a desert landscape, the game offers a treasure trove of exciting in-game features taking players on a quest for hidden gems, additional free spins and wild multipliers. This 4x5 video slot incorporates the popular HyperBet feature enabling players to adjust game volatility and win potential by setting the number of gold symbols in the reels. Selecting more gold symbols increases the probability of hitting bonus jackpots and increases pay line pay-outs. Multi-layered symbol collection mechanics enable players to decide whether to play bonus rounds at bronze, silver gold and platinum levels for ever increasing win potential and match their play style with risk appetite.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/DesertGem_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:GoblinsGemstones_k": {
        title: "Goblins & Gemstones",
        description: "Challenge your players to unlock the Goblin Treasure Vault! This all-new title features THREE new unique mechanics designed for massive volatility and huge win potential. HyperBonus allows players to go straight to their choice of any of these features in this unmissable fantasy crime caper.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/GoblinsGemstones_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:JokerMax_k": {
        title: "Joker Max",
        description: "Building on the smash hit Joker Supreme, Joker Max captures the classic Vegas style slot theme but now with even greater win potential.  Higher multipliers and and all-new graphics and animations make this a game not to be missed.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/JokerMax_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:MiamiBonusWheel_k": {
        title: "Miami Bonus Wheel",
        description: "Welcome to Miami Bonus Wheel where a great 3x3 game with 10 paylines awaits.  The wheel bonus is triggered by a symbol combination, and the wheel can award a cash prize or trigger a free spins bonus!  Another chance for players to chase great potential wins and for operators to engage and retain players.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/MiamiBonusWheel_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:OperationDiamondHunt_k": {
        title: "Diamond Hunt",
        description: "Take the role of a secret agent in the hunt for Diamonds in this brand new slots game that might just send you to Double-O Heaven!The Casino beckons as players search for Diamonds to trigger the Bonus round, sports cars, watches and other secret agents in the quest for big wins.There are 6-reels in a 3-4-5-5-4-3 layout and 3600 ways pays. Go straight for the kill with HyperBonus to access the bonus round instantly. Up the ante with our signature HyperBet feature.Make your choice of up to three symbols gold to increase potential wins. Diamonds are for free spins: collect diamonds in the bonus game to win free spins and chase Wild Multipliers to have a chance for even bigger prizes. Individual Bonus Jackpots on three levels - Silver, Gold and Platinum round out the action. Action packed with a pulsating sound track, this highly volatile espionage game has a license to thrill.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/OperationDiamondHunt_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/mascot:red_horde": {
        title: "Red Horde",
        description: "Red goblin horde attacks! Protect your village from nasty creatures and get a gold reward! Secrets hidden in trunks gonna help you increase the winning.",
        image: "https://cdn.softswiss.net/i/s3/mascot/red_horde.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kagaming:Polaroid": {
        title: "Polaroid",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Polaroid.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/mascot:zeus_the_thunderer": {
        title: "Zeus the Thunderer",
        description: "Do you hear the thunder? Now your destiny is in the hands of the Greatest Olympic Gods! Beautiful Aphrodite, powerful Zeus and mysterious Hades are waiting for you in the new outstanding game.",
        image: "https://cdn.softswiss.net/i/s3/mascot/zeus_the_thunderer.png",
        keywords: "wallfair, crypto, casino, slots, mascot, mascot"
    },
    "/softswiss-game/kalamba:BangkokDreams_k": {
        title: "Bangkok Dreams",
        description: "Bangkok Dreams is a 5 reels, 4 rows, 40 paylines game with free spins, symbol accumulation & wild symbol multipliers. High-rollers can play the game at the most volatile of 4 game play choices, and can even make a special bet to enter the free spins bonus directly! Newer players will be engaged by the easy-to-understand retention mechanic and can be brought on board at one of the lower volatility settings. Operators can offer free rounds with any bet option in order to engage players at the right spot, giving a plethora of retention marketing options around a single game.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/BangkokDreams_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:DinoOdyssey_k": {
        title: "Dino Odyssey",
        description: "Dino Odyssey combines sharp, high production quality graphics, a unique and volatile maths model that will keep players excited and playing for a long time.The missions collection feature also has a reward of locking bonus spins, that will entertain players for a long duration.The free spins feature symbols can be collected to lock wilds in up to 3 of the center columns at the same time. The missions collection feature provides an intuitive and simple engagement funnel that will provide excellent short and long term retention. Players are able to choose to play the bonus respins at any of the 4 levels, or to keep playing for a far higher reward. With the increasing levels of the bonus providing more volatility and higher rewards, Dino Odyssey offers lasting engagement for players. At the same time, the nature of the volatility profile, combined with the missions mechanic, offers excellent opportunities for redeposit promotions.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/DinoOdyssey_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:FiredrakesFortune_k": {
        title: "Firedrake's Fortune",
        description: "Can you defeat the Firedrakes and raid their treasure?  This epic title features 6 reels and 40 lines and sees players join a team of Vikings in hot pursuit of mythical beasts and magical riches.Kalamba's signature features, HyperBonus, HyperBet, LuckyLoops and more are present to help players on their journey.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/FiredrakesFortune_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:JewelsofJupiter_k": {
        title: "Jewels of Jupiter",
        description: "Take a relaxing walk through ancient Rome! Jewels of Jupiter features a unique reel layout, 10c minimum bet, Random Reel Wilds, HyperBonus and four levels of persistent Missions. Make sure your players get the chance to revel in this fantastic, engaging classical world, with truly legendary potential wins!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/JewelsofJupiter_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:MammothChase_k": {
        title: "Mammoth Chase",
        description: "Mammoth Chase is a 4096-ways game that is designed from beginning to end to give players a volatile experience. It features stacked mammoth symbols that combine to award huge wins, and a free spins bonus with a frequent retrigger and where wild symbols act as multipliers, giving excitement to a well-known feature. As a final layer of volatility, Mammoth Chase has three levels of personal progressive jackpots that are awarded for scattered Mammoth symbols. The highest level jackpot starts from 1000x bet, giving an obvious chance to win big!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/MammothChase_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kagaming:AfricaRun": {
        title: "Africa Run",
        image: "https://cdn.softswiss.net/i/s3/kagaming/AfricaRun.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Apes": {
        title: "The Apes",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Apes.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BookOfMummy": {
        title: "Book of Mummy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BookOfMummy.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kalamba:MermaidsGalore_k": {
        title: "Mermaids Galore",
        description: "Welcome to \"Mermaids Galore\"! A beautifully crafted environment and a lighter approach towards the slots experience which combines the best of several Kalamba features, all driven towards giving players a choice of how they want to play the game. Players have a choice to select and play the main with up to 5 gold symbols, with each gold symbol having increased pay to offer much higher volatility for larger bets. Additionally, players can choose to enter the free spins directly with 1-5 gold symbols, via Kalamba's HyperBonus signature feature.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/MermaidsGalore_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kagaming:Al": {
        title: "Artificial Intelligence",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Al.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ArcticStorm": {
        title: "Arctic Storm",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ArcticStorm.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BlackRider": {
        title: "Black Rider",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BlackRider.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BubbleDouble": {
        title: "Bubble Double",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BubbleDouble.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CharlottesWeb": {
        title: "Charlottes Web",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CharlottesWeb.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Cowboys": {
        title: "Cowboys",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Cowboys.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DimSum": {
        title: "Dim Sum",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DimSum.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:EarthGod": {
        title: "Earth God",
        image: "https://cdn.softswiss.net/i/s3/kagaming/EarthGod.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FairyDust": {
        title: "Fairy Dust",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FairyDust.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FlowersFruitMountain": {
        title: "Fruit Mountain",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FlowersFruitMountain.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FourBeauties": {
        title: "Four Beauties",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FourBeauties.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GodofLove": {
        title: "God of Love",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GodofLove.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HappyFarm": {
        title: "Farm Mania",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HappyFarm.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kalamba:MidasTreasure_k": {
        title: "Midas Treasure",
        description: "Welcome to \"Midas Treasure\"! This 5-column, 4-row game with 5 reels and 40 lines slot is bringing back our signature and most wanted features based on popularity within the playerbase. Hyper Bonus allows players to play free spins instantly by choosing one of four bets. Selected Hyper Bet determines the number of initial free spins and wild multiplier. You can trigger the Free Spins by collecting 3 Bonus Symbols during which you can collect Extra Spins Symbols to extend your bonus round time as well as Convert Symbols into gold ones which will open the possibility of even bigger wins! And last but not least our Symbol Collection feature where by collecting silver coins you can trigger Bonus Game and win extra rewards on four different levels (bronze, silver, gold and platinum). We are confident that \"Midas Treasure\" is packed with features and volatility your players will love and it will be a great addition to your slots collection!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/MidasTreasure_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kalamba:PawprintsofPurrsia_k": {
        title: "Pawprints of Purrsia",
        description: "Enter the magical realm of Purrsia, where legendary cats rule and players can chase huge potential wins via the Mythical Wheel of Dreams. Incorporating the Kalamba signature feature\\; HyperBonus, Sticky Wilds and Multiplier Wilds, PawPrints of Purrsia is sure to have players purring with excitement!",
        image: "https://cdn.softswiss.net/i/s3/kalamba/PawprintsofPurrsia_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kagaming:AlterWorld": {
        title: "Alter World",
        image: "https://cdn.softswiss.net/i/s3/kagaming/AlterWorld.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Atlantide": {
        title: "Atlantide",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Atlantide.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BombingFruit": {
        title: "Bombing Fruit",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BombingFruit.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ButterflyLovers": {
        title: "Butterfly Lovers",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ButterflyLovers.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ChineseAncientTomb": {
        title: "Chinese Ancient Tomb",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ChineseAncientTomb.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CuJu": {
        title: "Cu Ju",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CuJu.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DragonBall": {
        title: "Dragon Ball",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DragonBall.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:EightTreasures": {
        title: "Eight Treasures",
        image: "https://cdn.softswiss.net/i/s3/kagaming/EightTreasures.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FastBlast": {
        title: "Fast Blast",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FastBlast.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FortuneBeauty": {
        title: "Fortune Beauty Megaways",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FortuneBeauty.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kalamba:MonkeyGod_k": {
        title: "Monkey God",
        description: "Monkey God combines the pure excitement of choosing volatility from 4 different types of game play, with a collection mechanic that has been proven to drive player engagement. It features an accumulation meter to win bonus spins, 243 ways pays, a personal jackpot, and different betting levels to enable a different number of higher-paying Golden symbols. Retention mechanic features symbol accumulation and bonus spins, which is our best-proven feature so far to drive engagement. An exceptionally engaging high-monetization game for your high-rollers and new players alike. Players can make 4 different bets, going from 38 coins to 88 coins, to enable a different number of Golden symbols that have higher payouts and volatility. The free spins features a super-frequent retrigger, with 3 extra spins awarded for any 2 bonus symbols. Jackpot is more probable with more golden symbols enabled and features a free spins with frequent retriggers and 2x and 3x wild multipliers.",
        image: "https://cdn.softswiss.net/i/s3/kalamba/MonkeyGod_k.png",
        keywords: "wallfair, crypto, casino, slots, kalamba, kalamba"
    },
    "/softswiss-game/kagaming:AlexanderTheGreat": {
        title: "Alexander the Great",
        image: "https://cdn.softswiss.net/i/s3/kagaming/AlexanderTheGreat.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Ares": {
        title: "Ares God of War",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Ares.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BlockyBlocks": {
        title: "Blocky Blocks",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BlockyBlocks.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BullStampede": {
        title: "Bull Stampede",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BullStampede.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CharmingSorceress": {
        title: "Charming Sorceress",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CharmingSorceress.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CrazyCircus": {
        title: "Crazy Circus",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CrazyCircus.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Dracula": {
        title: "Dracula",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Dracula.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:EgyptianMythology": {
        title: "Egyptian Mythology",
        image: "https://cdn.softswiss.net/i/s3/kagaming/EgyptianMythology.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FantasyPark": {
        title: "Fantasy Park",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FantasyPark.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FormosanBirds": {
        title: "Formosan Birds",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FormosanBirds.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Frankenstein": {
        title: "Frankenstein",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Frankenstein.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GoldenBall": {
        title: "Golden Ball",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GoldenBall.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DayOfDead": {
        title: "Dia De Muertos",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DayOfDead.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DragonsLegend": {
        title: "Legend of Dragons",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DragonsLegend.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DrGeek": {
        title: "Dr. Geek",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DrGeek.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FaCaiDestiny": {
        title: "Fa Cai Destiny",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FaCaiDestiny.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FlowerGoddessFestival": {
        title: "Flower Goddess Festival",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FlowerGoddessFestival.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FortunePiggyBank": {
        title: "Fortune Piggy Bank",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FortunePiggyBank.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GlacialEpoch": {
        title: "Glacial Epoch",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GlacialEpoch.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GreatVoyages": {
        title: "The Great Voyages",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GreatVoyages.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HouYi": {
        title: "Hou Yi",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HouYi.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:JokerSlot": {
        title: "Joker Slot",
        image: "https://cdn.softswiss.net/i/s3/kagaming/JokerSlot.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LanternFestival": {
        title: "Lantern Festival",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LanternFestival.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LuckyCasino": {
        title: "Lucky Casino",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LuckyCasino.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BaWangBieJi": {
        title: "Ba Wang Bie Ji",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BaWangBieJi.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BoxingRoo": {
        title: "Boxing Roo",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BoxingRoo.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CandyStorm": {
        title: "Candy Storm",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CandyStorm.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Cocorico": {
        title: "Cocorico",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Cocorico.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DeepSea": {
        title: "Deep Sea Adventure",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DeepSea.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DragonsWay": {
        title: "Dragon's Way",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DragonsWay.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Enchanted": {
        title: "Enchanted",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Enchanted.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FishingExpedition": {
        title: "Fishing Expedition",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FishingExpedition.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FortuneGod": {
        title: "Fortune God",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FortuneGod.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Ghostbuster": {
        title: "Ghostbuster",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Ghostbuster.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GoldMagic": {
        title: "Gold Magic",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GoldMagic.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HongKong60s": {
        title: "Hong Kong 60s",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HongKong60s.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HuYeh": {
        title: "Hu Yeh",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HuYeh.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:KingOctopus": {
        title: "King Octopus",
        image: "https://cdn.softswiss.net/i/s3/kagaming/KingOctopus.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Leprechauns": {
        title: "Leprechauns",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Leprechauns.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MagicalStore": {
        title: "Magical Store",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MagicalStore.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BollywoodRomance": {
        title: "Bollywood Romance",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BollywoodRomance.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BumbleBee": {
        title: "Bumble Bee",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BumbleBee.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CaiYuanGuangJin": {
        title: "Cai Yuan Guang Jin",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CaiYuanGuangJin.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ChineseValentinesDay": {
        title: "Chinese Valentines Day",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ChineseValentinesDay.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DaGuanYuan": {
        title: "Da Guan Yuan",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DaGuanYuan.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DonQuixote": {
        title: "Don Quixote",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DonQuixote.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Egypt": {
        title: "Mysterious Pyramid",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Egypt.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FairyForestTale": {
        title: "Fairy Forest Tale",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FairyForestTale.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FluffyBuddy": {
        title: "Fluffy Buddy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FluffyBuddy.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FuLuShou": {
        title: "Fu Lu Shou",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FuLuShou.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GoldenDragon": {
        title: "Golden Dragon",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GoldenDragon.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HengandHa": {
        title: "Heng and Ha",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HengandHa.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Japanese7Heroes": {
        title: "Japanese 7 Heroes",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Japanese7Heroes.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:KungFu": {
        title: "KungFu Kash",
        image: "https://cdn.softswiss.net/i/s3/kagaming/KungFu.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LeagueOfGods": {
        title: "Daji",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LeagueOfGods.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BonusMania": {
        title: "Bonus Mania",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BonusMania.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CaiShenDao": {
        title: "Cai Shen Dao",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CaiShenDao.png",
        keywords: "wallfair, crypto, casino, fishing, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ChineseOpera": {
        title: "Chinese Opera",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ChineseOpera.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CupidAndPsyche": {
        title: "Cupid And Psyche",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CupidAndPsyche.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DragonBoat": {
        title: "Dragon Boat",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DragonBoat.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Emoji": {
        title: "Emoji",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Emoji.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Fastbreak": {
        title: "Fastbreak",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Fastbreak.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FortuneFu": {
        title: "Fortune Fu",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FortuneFu.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GenghisKhan": {
        title: "Genghis Khan",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GenghisKhan.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GoldenShanghai": {
        title: "Golden Shanghai",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GoldenShanghai.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HoneyMoney": {
        title: "Honey Money",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HoneyMoney.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Jingwei": {
        title: "Jingwei",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Jingwei.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Jungle": {
        title: "Jungle",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Jungle.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LegendOfFoxSpirit": {
        title: "Legend Of Fox Spirit",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LegendOfFoxSpirit.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LuckyPenguins": {
        title: "Lucky Penguins",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LuckyPenguins.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Meowfia": {
        title: "Meowfia",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Meowfia.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:BonusManiaDeluxe": {
        title: "Bonus Mania Deluxe",
        image: "https://cdn.softswiss.net/i/s3/kagaming/BonusManiaDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CalabashBoys": {
        title: "Calabash Boys",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CalabashBoys.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ChiYou": {
        title: "Chi You",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ChiYou.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DarkFortress": {
        title: "Dark Fortress",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DarkFortress.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DragonGate": {
        title: "Dragon Gate",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DragonGate.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:EmperorQin": {
        title: "Emperor Qin",
        image: "https://cdn.softswiss.net/i/s3/kagaming/EmperorQin.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FireDragons": {
        title: "Fire Dragons",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FireDragons.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FireHit": {
        title: "Fire Hit",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FireHit.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FortuneGanesha": {
        title: "Fortune Ganesha",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FortuneGanesha.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Gem": {
        title: "A Girl's Best Friend",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Gem.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GoldenFish": {
        title: "Golden Fish",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GoldenFish.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HolyBeast": {
        title: "Holy Beast",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HolyBeast.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:JellyMania": {
        title: "Jellymania",
        image: "https://cdn.softswiss.net/i/s3/kagaming/JellyMania.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:KungFuKaga": {
        title: "KungFu Kaga",
        image: "https://cdn.softswiss.net/i/s3/kagaming/KungFuKaga.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LiveStreamingStar": {
        title: "Live Streaming Star",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LiveStreamingStar.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Cancan": {
        title: "Can Can",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Cancan.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ChristmasCandy": {
        title: "Christmas Candy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ChristmasCandy.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DaVinci": {
        title: "da Vinci",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DaVinci.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Robots": {
        title: "Robots",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Robots.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DoubleFortune": {
        title: "Double Fortune",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DoubleFortune.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:EgyptianEmpress": {
        title: "Egyptian Empress",
        image: "https://cdn.softswiss.net/i/s3/kagaming/EgyptianEmpress.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Fantasy777": {
        title: "Fantasy 777",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Fantasy777.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ForceOfDragon": {
        title: "Force of Dragon",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ForceOfDragon.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FourScholars": {
        title: "The Four Scholars",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FourScholars.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GoGoMonsters": {
        title: "Go Go Monsters",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GoGoMonsters.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HappyIndianChef": {
        title: "Happy Indian Chef",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HappyIndianChef.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HuHuFighting": {
        title: "Hu Hu Fighting",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HuHuFighting.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ImperialGirls": {
        title: "Imperial Girls",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ImperialGirls.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:KingOfDragon": {
        title: "King Of Dragon",
        image: "https://cdn.softswiss.net/i/s3/kagaming/KingOfDragon.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LionDance": {
        title: "Lion Dance",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LionDance.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MagicApprentice": {
        title: "Magic Apprentice",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MagicApprentice.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:CatchTheThief": {
        title: "Catch The Thief",
        image: "https://cdn.softswiss.net/i/s3/kagaming/CatchTheThief.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ComeOnRhythm": {
        title: "Come On Rhythm",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ComeOnRhythm.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:DiamondPower": {
        title: "Diamond Power",
        image: "https://cdn.softswiss.net/i/s3/kagaming/DiamondPower.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Dreamcatcher": {
        title: "Dreamcatcher",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Dreamcatcher.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ErlangShen": {
        title: "Erlang Shen",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ErlangShen.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Flaming7": {
        title: "Flaming 7's",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Flaming7.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FortuneLions": {
        title: "Fortune Lions",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FortuneLions.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Giants": {
        title: "Giants",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Giants.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GoldRush": {
        title: "California Gold Rush",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GoldRush.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Horoscope": {
        title: "Horoscope",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Horoscope.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:JokerFruit": {
        title: "Joker Fruit",
        image: "https://cdn.softswiss.net/i/s3/kagaming/JokerFruit.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LandOfGold": {
        title: "Lands of Gold",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LandOfGold.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LoungeClub": {
        title: "Lounge Club",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LoungeClub.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Luck88": {
        title: "Luck88",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Luck88.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Mazu": {
        title: "Mazu",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Mazu.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MissTiger": {
        title: "Miss Tiger",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MissTiger.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:FruitParty": {
        title: "Fruit Party",
        image: "https://cdn.softswiss.net/i/s3/kagaming/FruitParty.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:GoldenBull": {
        title: "Golden Bull",
        image: "https://cdn.softswiss.net/i/s3/kagaming/GoldenBull.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:HatSeller": {
        title: "Hat Seller",
        image: "https://cdn.softswiss.net/i/s3/kagaming/HatSeller.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:JadePower": {
        title: "Jade Power",
        image: "https://cdn.softswiss.net/i/s3/kagaming/JadePower.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Knights": {
        title: "Medieval Knights",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Knights.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LastFantasy": {
        title: "Last Fantasy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LastFantasy.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LuckyCat": {
        title: "Lucky Cat",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LuckyCat.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Medusa": {
        title: "Medusa",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Medusa.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MonsterParade": {
        title: "Monster Parade",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MonsterParade.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Mushrooms": {
        title: "Trippy Mushrooms",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Mushrooms.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:OwlInForest": {
        title: "Owl In Forest",
        image: "https://cdn.softswiss.net/i/s3/kagaming/OwlInForest.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Pinocchio": {
        title: "Pinocchio",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Pinocchio.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:QuadrupleDragons": {
        title: "Quadruple Dragons",
        image: "https://cdn.softswiss.net/i/s3/kagaming/QuadrupleDragons.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:RouranKhaganate": {
        title: "Rouran Khaganate",
        image: "https://cdn.softswiss.net/i/s3/kagaming/RouranKhaganate.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ShockTower": {
        title: "Shock Tower",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ShockTower.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ImperialGuards": {
        title: "Ming Imperial Guards",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ImperialGuards.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Kitty": {
        title: "Kitty Living",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Kitty.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LegendOfPaladin": {
        title: "Legend of Paladin",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LegendOfPaladin.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LionKingAndEagleKing": {
        title: "Lion King And Eagle King",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LionKingAndEagleKing.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LoveInMemory": {
        title: "Love In Memory",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LoveInMemory.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Masquerade": {
        title: "Masquerade",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Masquerade.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MillenniumLove": {
        title: "Millennium Love",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MillenniumLove.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Mythic": {
        title: "Mythic",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Mythic.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PartyGirl": {
        title: "Party Girl",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PartyGirl.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PoChiLam": {
        title: "Po Chi Lam",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PoChiLam.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:QuickPlayMahjong": {
        title: "Quick Play Mahjong",
        image: "https://cdn.softswiss.net/i/s3/kagaming/QuickPlayMahjong.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SecretOfOcean": {
        title: "Secret Of Ocean",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SecretOfOcean.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SnowLeopards": {
        title: "Snow Leopards",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SnowLeopards.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SpringBlossom": {
        title: "Spring Blossom",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SpringBlossom.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Sweetopia": {
        title: "Sweetopia",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Sweetopia.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheHappyPrince": {
        title: "The Happy Prince",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheHappyPrince.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:JourneyToWest": {
        title: "Journey to the West",
        image: "https://cdn.softswiss.net/i/s3/kagaming/JourneyToWest.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:KAFishHunter": {
        title: "KA Fish Hunter",
        image: "https://cdn.softswiss.net/i/s3/kagaming/KAFishHunter.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LuxuryGarage": {
        title: "Luxury Garage",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LuxuryGarage.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Mermaid": {
        title: "Mermaid Seas",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Mermaid.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MuscleCars": {
        title: "Muscle Cars",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MuscleCars.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:OriginOfFire": {
        title: "Origin Of Fire",
        image: "https://cdn.softswiss.net/i/s3/kagaming/OriginOfFire.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Pinata": {
        title: "Pinata",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Pinata.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PumpkinWin": {
        title: "Pumpkin Win",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PumpkinWin.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:RedBoy": {
        title: "Red Boy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/RedBoy.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SailorMan": {
        title: "Sailor Man",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SailorMan.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SilkRoad": {
        title: "Silk Road",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SilkRoad.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SpaceStorm": {
        title: "Space Storm",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SpaceStorm.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SuperVideoPoker": {
        title: "Super Video Poker",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SuperVideoPoker.png",
        keywords: "wallfair, crypto, casino, poker, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheGoldenAx": {
        title: "The Golden Ax",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheGoldenAx.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ThreeHeroes": {
        title: "Three Heroes",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ThreeHeroes.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:LuckyLucky": {
        title: "Lucky Lucky",
        image: "https://cdn.softswiss.net/i/s3/kagaming/LuckyLucky.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MeerkatsFamily": {
        title: "Meerkat's Family",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MeerkatsFamily.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MoonGoddess": {
        title: "Moon Goddess",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MoonGoddess.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PhoenixRising": {
        title: "Phoenix Rising",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PhoenixRising.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Polynesian": {
        title: "Polynesian",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Polynesian.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Rarities": {
        title: "Rarities",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Rarities.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Safari": {
        title: "Safari Slots",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Safari.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SiberianWolves": {
        title: "Siberian Wolves",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SiberianWolves.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Soldiers": {
        title: "Soldiers",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Soldiers.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SuperBonusMania": {
        title: "Super Bonus Mania",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SuperBonusMania.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Tao": {
        title: "Tao",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Tao.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheLotusLamp": {
        title: "The Lotus Lamp",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheLotusLamp.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TreasureBowl": {
        title: "Treasure Bowl",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TreasureBowl.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WelcomeFortune": {
        title: "Welcome Fortune",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WelcomeFortune.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MahjongMaster": {
        title: "Mahjong Master",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MahjongMaster.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MayanGold": {
        title: "Mayan Gold",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MayanGold.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Millionaires": {
        title: "Millionaires",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Millionaires.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MythologicalCreatures": {
        title: "Mythological Creatures",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MythologicalCreatures.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PartyGirlWays": {
        title: "Party Girl Ways",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PartyGirlWays.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:RedCliff": {
        title: "Red Cliff",
        image: "https://cdn.softswiss.net/i/s3/kagaming/RedCliff.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SevenHeroines": {
        title: "Seven Heroines",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SevenHeroines.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SnowQueen": {
        title: "Snow Queen",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SnowQueen.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:StockedBar": {
        title: "Stocked Bar",
        image: "https://cdn.softswiss.net/i/s3/kagaming/StockedBar.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TaiChi": {
        title: "Tai Chi",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TaiChi.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheKingofDinosaurs": {
        title: "The King of Dinosaurs",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheKingofDinosaurs.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TowerofBabel": {
        title: "Tower of Babel",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TowerofBabel.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:VolcanoAdventure": {
        title: "Volcano Adventure",
        image: "https://cdn.softswiss.net/i/s3/kagaming/VolcanoAdventure.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WildWildBell": {
        title: "Wild Wild Bell",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WildWildBell.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WuZetian": {
        title: "Wu Zetian",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WuZetian.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MedalWinner": {
        title: "Medal Winner Megaways",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MedalWinner.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MonkeyAndCrab": {
        title: "Monkey And Crab",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MonkeyAndCrab.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Nezha": {
        title: "Nezha",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Nezha.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Ninja": {
        title: "Ninja",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Ninja.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Pets": {
        title: "Pets",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Pets.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PrimevalForest": {
        title: "Primeval Rainforest",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PrimevalForest.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ShadowPlay": {
        title: "Shadow Play",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ShadowPlay.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SNS": {
        title: "SNS Friends",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SNS.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Space": {
        title: "Spinning In Space",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Space.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SuperKeno": {
        title: "Super Keno",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SuperKeno.png",
        keywords: "wallfair, crypto, casino, lottery, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheDeepMonster": {
        title: "The Deep Monster",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheDeepMonster.png",
        keywords: "wallfair, crypto, casino, fishing, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheNutCracker": {
        title: "The Nut Cracker",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheNutCracker.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TreasureBowlMegaways": {
        title: "Treasure Bowl Megaways",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TreasureBowlMegaways.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Wencheng": {
        title: "Princess Wencheng",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Wencheng.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Wizardry": {
        title: "Wizardry",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Wizardry.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Mexicaliente": {
        title: "Mexicaliente",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Mexicaliente.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Musketeers": {
        title: "Musketeers",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Musketeers.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PandaFamily": {
        title: "Panda Family",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PandaFamily.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Pirate": {
        title: "Captain Pirate",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Pirate.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:QuickPlayCandy": {
        title: "Quick Play Candy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/QuickPlayCandy.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Route66": {
        title: "Route 66",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Route66.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ShoppingFiend": {
        title: "Shopping Fiend",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ShoppingFiend.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SantaBumbleBeeHoldandWin": {
        title: "Santa Bumble Bee Hold and Win",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SantaBumbleBeeHoldandWin.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SkyJourney": {
        title: "Sky Journey",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SkyJourney.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Speed": {
        title: "Street Racing",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Speed.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SweetMaid": {
        title: "Sweet Maid",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SweetMaid.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheGuardOfHades": {
        title: "The Guard Of Hades",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheGuardOfHades.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ThreeLittlePigs": {
        title: "Three Little Pigs",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ThreeLittlePigs.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:VeggiesPlot": {
        title: "Veggies Plot",
        image: "https://cdn.softswiss.net/i/s3/kagaming/VeggiesPlot.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WildAlaska": {
        title: "Wild Alaska",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WildAlaska.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WuSong": {
        title: "Wu Song",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WuSong.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MilkGirl": {
        title: "Milk Girl",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MilkGirl.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MysteryAlchemy": {
        title: "Mystery Alahemy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MysteryAlchemy.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Pandora": {
        title: "Pandora's Box",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Pandora.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PirateKing": {
        title: "Pirate King",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PirateKing.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:QuickPlayJewels": {
        title: "Quick Play Jewels",
        image: "https://cdn.softswiss.net/i/s3/kagaming/QuickPlayJewels.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:RoyalDemeanor": {
        title: "Royal Demeanor",
        image: "https://cdn.softswiss.net/i/s3/kagaming/RoyalDemeanor.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SpaceCowboy": {
        title: "Space Cowboy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SpaceCowboy.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SuperShot2": {
        title: "SuperShot 2",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SuperShot2.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheGingerbreadLand": {
        title: "The Gingerbread Land",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheGingerbreadLand.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ThreeGods": {
        title: "Three Gods",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ThreeGods.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TreasureTiger": {
        title: "Treasure Tiger",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TreasureTiger.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WenDing": {
        title: "Wen Ding",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WenDing.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WolfWarrior": {
        title: "Wolf Warrior",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WolfWarrior.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:YuGong": {
        title: "Yu Gong",
        image: "https://cdn.softswiss.net/i/s3/kagaming/YuGong.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:MuayThai": {
        title: "Muay Thai",
        image: "https://cdn.softswiss.net/i/s3/kagaming/MuayThai.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:NineLucks": {
        title: "Nine Lucks",
        image: "https://cdn.softswiss.net/i/s3/kagaming/NineLucks.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PeterPan": {
        title: "Peter Pan",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PeterPan.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PoseidonSecret": {
        title: "Poseidon Secret",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PoseidonSecret.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:RichSquire": {
        title: "Rich Squire",
        image: "https://cdn.softswiss.net/i/s3/kagaming/RichSquire.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Samurai": {
        title: "Samurai Way",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Samurai.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SkyForce": {
        title: "Sky Force",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SkyForce.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Speakeasy": {
        title: "Speakeasy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Speakeasy.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SushiNinja": {
        title: "Sushi Ninja",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SushiNinja.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheGrandmaster": {
        title: "The Grandmaster",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheGrandmaster.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ThreeKingdoms": {
        title: "Romance of the Three Kingdoms",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ThreeKingdoms.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:UFO": {
        title: "UFO",
        image: "https://cdn.softswiss.net/i/s3/kagaming/UFO.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WestChamber": {
        title: "West Chamber",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WestChamber.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WonWonRich": {
        title: "Won Won Rich",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WonWonRich.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ZombieLand": {
        title: "Zombie Land",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ZombieLand.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:YueFei": {
        title: "Yue Fei",
        image: "https://cdn.softswiss.net/i/s3/kagaming/YueFei.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/habanero:AmericanBaccarat": {
        title: "Baccarat",
        description: "Standard Baccarat with commission payable on Banker wins and a win on the Tie bet paying 8:1.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AmericanBaccarat.png",
        keywords: "wallfair, crypto, casino, card, habanero, habanero"
    },
    "/softswiss-game/kagaming:Neanderthals": {
        title: "Neanderthals",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Neanderthals.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:PersiaBonanza": {
        title: "Persia Bonanza Megaways",
        image: "https://cdn.softswiss.net/i/s3/kagaming/PersiaBonanza.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Poseidon": {
        title: "Poseidon's Treasure",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Poseidon.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:RedRidingHood": {
        title: "Red Riding Hood",
        image: "https://cdn.softswiss.net/i/s3/kagaming/RedRidingHood.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SevenWonders": {
        title: "Modern 7 Wonders",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SevenWonders.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SnowWhite": {
        title: "Snow White",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SnowWhite.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Stonehenge": {
        title: "Stonehenge",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Stonehenge.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:SunnyBikini": {
        title: "Sunny Bikini",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SunnyBikini.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TaiwanBlackBear": {
        title: "Taiwan Black Bear",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TaiwanBlackBear.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheLegendofHeroes": {
        title: "The Legend of Heroes",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheLegendofHeroes.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ToyWorld": {
        title: "Toy World",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ToyWorld.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WanFuJinAn": {
        title: "WanFu JinAn",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WanFuJinAn.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WitchAcademy": {
        title: "Witch Academy",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WitchAcademy.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:XBomber": {
        title: "X-Bomber",
        image: "https://cdn.softswiss.net/i/s3/kagaming/XBomber.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/habanero:AcesandEights5Hand": {
        title: "Aces and Eights 5 Hand",
        description: "Aces & Eights 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AcesandEights5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/kagaming:SuperShot": {
        title: "SuperShot",
        image: "https://cdn.softswiss.net/i/s3/kagaming/SuperShot.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TheDoorGods": {
        title: "The Door Gods",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TheDoorGods.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ThreeBandits": {
        title: "Three Bandits",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ThreeBandits.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:TreasureRaider": {
        title: "Treasure Raider",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TreasureRaider.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Vampire": {
        title: "Vampire's Tale",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Vampire.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WhiteDeer": {
        title: "White Deer",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WhiteDeer.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WuGang": {
        title: "Wu Gang",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WuGang.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Yamato": {
        title: "Yamato",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Yamato.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/habanero:AcesandEights1Hand": {
        title: "Aces and Eights 1 Hand",
        description: "Aces & Eights 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AcesandEights1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:BlackJack3H": {
        title: "Blackjack (3 Hand)",
        description: "3 Hand Blackjack played with 5 decks.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BlackJack3H.png",
        keywords: "wallfair, crypto, casino, card, habanero, habanero"
    },
    "/softswiss-game/habanero:BonusPoker50Hand": {
        title: "Bonus Poker 50 Hand",
        description: "Bonus Poker 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusPoker50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleDoubleBonusPoker10Hand": {
        title: "Double Double Bonus Poker 10 Hand",
        description: "Double Double Bonus Poker 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleDoubleBonusPoker10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JacksorBetter10Hand": {
        title: "Jacks or Better 10 Hand",
        description: "Jacks or Better 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JacksorBetter10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SG5Mariachis": {
        title: "5 Mariachis",
        description: "Arriba arriba! With plenty of Tequila and Lime it's sure to be Fiesta Time when the 5 Mariachis come to Town. Find the saucy Senoritas andcrack atas for extra dineros as the party heats up!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SG5Mariachis.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/kagaming:TombHeroes": {
        title: "Tomb Heroes",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TombHeroes.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:Viking": {
        title: "Age of Vikings",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Viking.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WildVick": {
        title: "Wild Vick",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WildVick.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WongTaiSin": {
        title: "Wong Tai Sin",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WongTaiSin.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:YunCaiTongZi": {
        title: "Yun Cai Tong Zi",
        image: "https://cdn.softswiss.net/i/s3/kagaming/YunCaiTongZi.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/habanero:AllAmericanPoker1Hand": {
        title: "All American Poker 1 Hand",
        description: "All American Poker 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AllAmericanPoker1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:BonusDuecesWild50Hand": {
        title: "Bonus Deuces Wild 50 Hand",
        description: "Bonus Deuces Wild 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusDuecesWild50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleBonusPoker10Hand": {
        title: "Double Bonus Poker 10 Hand",
        description: "Double Bonus Poker 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleBonusPoker10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleDoubleBonusPoker1Hand": {
        title: "Double Double Bonus Poker 1 Hand",
        description: "Double Double Bonus Poker 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleDoubleBonusPoker1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JacksorBetter100Hand": {
        title: "Jacks or Better 100 Hand",
        description: "Jacks or Better 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JacksorBetter100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SG5LuckyLions": {
        title: "5 Lucky Lions",
        description: "In 5 Lucky Lions, good fortune awaits only the bravest players. Pick the right lucky lion and discover a wealth of riches and rewards. Choose well, your destiny is in your own hands.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SG5LuckyLions.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGBirdOfThunder": {
        title: "Bird of Thunder",
        description: "In Native American culture, eagles are considered to possess impressive magical powers. Hit three Totems to summon the Bird of Thunder. Watch as it takes flight, multiplies and strikes!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGBirdOfThunder.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGColossalGems": {
        title: "Colossal Gems",
        description: "Spin your way to galactic sized wins in the 100th slot game from Habanero! Colossal Gems come in three sizes: 2x2, 3x3, and a jumbo sized 4x4. Any win awards a re-spin which leads to a bigger gem. Three wins in a row lead to the jumbo 4x4 gem which also awards 6 free games!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGColossalGems.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/kagaming:TripleDragons": {
        title: "Triple Dragons",
        image: "https://cdn.softswiss.net/i/s3/kagaming/TripleDragons.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WerewolfIsComing": {
        title: "Werewolf Is Coming",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WerewolfIsComing.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:WonWonCatching": {
        title: "Won Won Catching",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WonWonCatching.png",
        keywords: "wallfair, crypto, casino, casual, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:ZashikiGod": {
        title: "Zashiki God",
        image: "https://cdn.softswiss.net/i/s3/kagaming/ZashikiGod.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/habanero:AllAmericanPoker50Hand": {
        title: "All American Poker 50 Hand",
        description: "All American Poker 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AllAmericanPoker50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:BonusDuecesWild5Hand": {
        title: "Bonus Deuces Wild 5 Hand",
        description: "Bonus Deuces Wild 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusDuecesWild5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleBonusPoker1Hand": {
        title: "Double Bonus Poker 1 Hand",
        description: "Double Bonus Poker 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleBonusPoker1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DuecesWild1Hand": {
        title: "Deuces Wild 1 Hand",
        description: "Deuces Wild 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DuecesWild1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JokerPoker10Hand": {
        title: "Joker Poker 10 Hand",
        description: "Joker Poker 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JokerPoker10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SGBarnstormerBucks": {
        title: "Barnstormer Bucks",
        description: "Hop on your tractor and round up the cattle at Barnstormer Farm. Strike the plane symbol three times and take to the skies to unblock the big bucks.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGBarnstormerBucks.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGCashosaurus": {
        title: "Cashosaurus",
        description: "The Cashosaurus is a generous fellow who likes to double your prize. Unearth three golden eggs and free spins roar into action.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGCashosaurus.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGFenghuang": {
        title: "Fenghuang",
        description: "Fenghuang are mythological phoenix-like birds that reign over all other birds. Representing yin and yang - the fenghuang and dragon unite to combine into a powerful winning force!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGFenghuang.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGHappyApe": {
        title: "Happy Ape",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGHappyApe.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/kagaming:WizardofOz": {
        title: "The Wizard of Oz",
        image: "https://cdn.softswiss.net/i/s3/kagaming/WizardofOz.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/kagaming:XElements": {
        title: "X-Elements",
        image: "https://cdn.softswiss.net/i/s3/kagaming/XElements.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/habanero:AcesandEights100Hand": {
        title: "Aces and Eights 100 Hand",
        description: "Aces & Eights 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AcesandEights100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:AllAmericanPoker10Hand": {
        title: "All American Poker 10 Hand",
        description: "All American Poker 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AllAmericanPoker10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:BonusDuecesWild10Hand": {
        title: "Bonus Deuces Wild 10 Hand",
        description: "Bonus Deuces Wild 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusDuecesWild10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:CaribbeanStud": {
        title: "Caribbean Stud",
        description: "Card game similar to Stud poker.",
        image: "https://cdn.softswiss.net/i/s3/habanero/CaribbeanStud.png",
        keywords: "wallfair, crypto, casino, card, habanero, habanero"
    },
    "/softswiss-game/habanero:DuecesWild100Hand": {
        title: "Deuces Wild 100 Hand",
        description: "Deuces Wild 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DuecesWild100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JacksorBetter5Hand": {
        title: "Jacks or Better 5 Hand",
        description: "Jacks or Better 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JacksorBetter5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JokerPoker5Hand": {
        title: "Joker Poker 5 Hand",
        description: "Joker Poker 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JokerPoker5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SGCakeValley": {
        title: "Cake Valley",
        description: "Amid the cakes, cookies, and custard, there are three different jelly selector game modes that provide a unique gameplay experience and unlock a variety of free spins.And the dough really rises when the red jelly triggers belly-busting wins that are enough to satisfy even the biggest of appetites.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGCakeValley.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGDragonsRealm": {
        title: "Dragon's Realm",
        description: "The realm of the dragon is one fraught with danger. But those daring to enter and unleash the beast are in line for big wins and untold riches.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGDragonsRealm.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGFaCaiShenDeluxe": {
        title: "Fa Cai Shen Deluxe",
        description: "Fa Cai Shen makes a prosperous return to double the fun and fortune when he appears twice in every free game and pays in any direction!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGFaCaiShenDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGFourDivineBeasts": {
        title: "Four Divine Beasts",
        description: "In the realms of Chinese mythology live the Four Divine Beasts - the Azure Dragon, White Tiger, Vermilion Phoenix and Black Tortoise.With the support of HeavenвЂ™s guards, players will tackle challenges for a chance to win  countless fortunes.Summon the beasts and reveal their divine secrets!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGFourDivineBeasts.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGSantasVillage": {
        title: "Santa's Village",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGSantasVillage.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/kagaming:XmasWishes": {
        title: "Xmas Wishes",
        image: "https://cdn.softswiss.net/i/s3/kagaming/XmasWishes.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/habanero:AcesandEights10Hand": {
        title: "Aces and Eights 10 Hand",
        description: "Aces & Eights 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AcesandEights10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:Baccarat3HZC": {
        title: "Baccarat Zero Commission",
        description: "A variant of standard Baccarat with no commission payable on Banker wins, other rules, and a win on the Tie bet paying 9:1.",
        image: "https://cdn.softswiss.net/i/s3/habanero/Baccarat3HZC.png",
        keywords: "wallfair, crypto, casino, card, habanero, habanero"
    },
    "/softswiss-game/habanero:BonusPoker1Hand": {
        title: "Bonus Poker 1 Hand",
        description: "Bonus Poker 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusPoker1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleDoubleBonusPoker100Hand": {
        title: "Double Double Bonus Poker 100 Hand",
        description: "Double Double Bonus Poker 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleDoubleBonusPoker100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:EURoulette": {
        title: "Roulette",
        description: "A fixed odds table game with a chips layout for various bet options. European Roulette (single zero) with return of half staked on evens bets when ball lands on zero - the \"la partage\" rule.",
        image: "https://cdn.softswiss.net/i/s3/habanero/EURoulette.png",
        keywords: "wallfair, crypto, casino, roulette, habanero, habanero"
    },
    "/softswiss-game/habanero:SG12Zodiacs": {
        title: "12 Zodiacs",
        description: "Let the stars show you your fortune! Explore the heavens with the 12 Zodiacs to find out what riches they might bring. Pays are left to right and right to left. Trigger the feature and get paid for multiple lucky lanterns!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SG12Zodiacs.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGBikiniIsland": {
        title: "Bikini Island",
        description: "Bikini Island is a place where you will find sun, sea, sand, and sensational prizes. So slap on the sun cream and spin those reels.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGBikiniIsland.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGChristmasGiftRush": {
        title: "Christmas Gift Rush",
        description: "Win on the center line to trigger the Nudge Feature.Reels continue to Nudge until no winning combinationson screen.Unlock 3 lines, thereafter the multiplier increases witheach Nudge.Enable Buy Feature to purchase a feature with everyspin!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGChristmasGiftRush.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGGoldenUnicorn": {
        title: "Golden Unicorn",
        description: "Ride the golden unicorn through enchanted lands towards the castle and receive free spins and bonuses along the way.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGGoldenUnicorn.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTabernaDeLosMuertosUltra": {
        title: "Taberna De Los Muertos Ultra",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTabernaDeLosMuertosUltra.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/kagaming:YearOfTheTiger": {
        title: "Year Of The Tiger",
        image: "https://cdn.softswiss.net/i/s3/kagaming/YearOfTheTiger.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/habanero:AcesandEights50Hand": {
        title: "Aces and Eights 50 Hand",
        description: "Aces & Eights 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AcesandEights50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:BlackJack3HDoubleExposure": {
        title: "Double Exposure (3 Hand)",
        description: "3 Hand Double Exposure Blackjack played with 5 decks. ",
        image: "https://cdn.softswiss.net/i/s3/habanero/BlackJack3HDoubleExposure.png",
        keywords: "wallfair, crypto, casino, card, habanero, habanero"
    },
    "/softswiss-game/habanero:BonusPoker5Hand": {
        title: "Bonus Poker 5 Hand",
        description: "Bonus Poker 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusPoker5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleDoubleBonusPoker50Hand": {
        title: "Double Double Bonus Poker 50 Hand",
        description: "Double Double Bonus Poker 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleDoubleBonusPoker50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JacksorBetter1Hand": {
        title: "Jacks or Better 1 Hand",
        description: "Jacks or Better 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JacksorBetter1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SGAllForOne": {
        title: "All For One",
        description: "Mount your steed and twizzle your moustache as you ride strong towards the castle in search of a feasts, fair maidens, and free spins.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGAllForOne.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGCandyTower": {
        title: "Candy Tower",
        description: "Indulge your sugar cravings with “Candy Tower”! The special features and boosts will bring you prizes sweeter than candy. Prepare for a fun round in the land of bonbons!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGCandyTower.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGEgyptianDreamsDeluxe": {
        title: "Egyptian Dreams Deluxe",
        description: "A classic rises again in Egyptian Dreams Deluxe! Summon the Pharaoh to smash the blocks and unlock more ways to win. Unearth riches withup to 60 Free Games when the Pyramids and the Pharaohs align.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGEgyptianDreamsDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGGangsters": {
        title: "Gangsters",
        description: "Go back to the prohibition era in Gangsters - a 1920's Chicago classic! Join la familia on your way to becoming a made man. Make headlines with escapades featuring bootlegging, gunrunning and gambling.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGGangsters.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGJump": {
        title: "Jump!",
        description: "Jump! will transport you back to a time where gaming was fast, fun and furious about collecting coin!Hit 5 Re-Spins with the Jumping Joker in arow and get rewarded with an additional 7Free Games.Ways start at 192 ways, and increase eachRe-Spin until playing 1024 ways in the FreeGames.Collect all 6 symbols in winning combinations and activate the Stacked Spin with 5 guaranteed symbols the next spin.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGJump.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/kagaming:Zorro": {
        title: "The Mask of Zorro",
        image: "https://cdn.softswiss.net/i/s3/kagaming/Zorro.png",
        keywords: "wallfair, crypto, casino, slots, kagaming, kagaming"
    },
    "/softswiss-game/habanero:AllAmericanPoker5Hand": {
        title: "All American Poker 5 Hand",
        description: "All American Poker 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AllAmericanPoker5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:BonusPoker100Hand": {
        title: "Bonus Poker 100 Hand",
        description: "Bonus Poker 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusPoker100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleBonusPoker50Hand": {
        title: "Double Bonus Poker 50 Hand",
        description: "Double Bonus Poker 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleBonusPoker50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DuecesWild50Hand": {
        title: "Deuces Wild 50 Hand",
        description: "Deuces Wild 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DuecesWild50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JokerPoker1Hand": {
        title: "Joker Poker 1 Hand",
        description: "Joker Poker 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JokerPoker1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SGBeforeTimeRunsOut": {
        title: "Before Time Runs Out",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGBeforeTimeRunsOut.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGCashReef": {
        title: "Cash Reef",
        description: "Dive down to the bottom of the ocean to discover the Cash Reef, a trove of trinkets, treasure, and pearls that open into wilds to make pay combinations.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGCashReef.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGFireRooster": {
        title: "Fire Rooster",
        description: "The Chinese legend about the rooster's lament features a centipede, dragon and the Fire Rooster. Receive a big booster if he ignites! He might spread wilds left or right, up or down - whichever way takes his fancy.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGFireRooster.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGGoldRush": {
        title: "Gold Rush",
        description: "Grab your pickaxe and head underground in search of riches and high-paying free spins in this precious metal-inspired period piece, because you might just strike it lucky.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGGoldRush.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGJellyfishFlowUltra": {
        title: "Jellyfish Flow Ultra",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGJellyfishFlowUltra.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGLuckyDurian": {
        title: "Lucky Durian",
        description: "Lucky Durian is vivid in colours and rich in flavours. This 5x3 is destined to awaken all your senses. The expanding Wild Symbol awards 3 re-spins every time it shows up on the reel!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGLuckyDurian.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:AllAmericanPoker100Hand": {
        title: "All American Poker 100 Hand",
        description: "All American Poker 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/AllAmericanPoker100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:BonusDuecesWild1Hand": {
        title: "Bonus Deuces Wild 1 Hand",
        description: "Bonus Deuces Wild 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusDuecesWild1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleBonusPoker100Hand": {
        title: "Double Bonus Poker 100 Hand",
        description: "Double Bonus Poker 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleBonusPoker100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DuecesWild10Hand": {
        title: "Deuces Wild 10 Hand",
        description: "Deuces Wild 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DuecesWild10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JokerPoker100Hand": {
        title: "Joker Poker 100 Hand",
        description: "Joker Poker 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JokerPoker100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SGArcticWonders": {
        title: "Arctic Wonders",
        description: "Explore this winter wonderland in search of the magnificent Northern Lights, which expand into wilds to make pay combinations.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGArcticWonders.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGCarnivalCash": {
        title: "Carnival Cash",
        description: "Throw your hat into the ring and take on bearded ladies, preforming monkeys, and lion tamers in this circus classic.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGCarnivalCash.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGFaCaiShen": {
        title: "Fa Cai Shen",
        description: "Luck will smile upon you in this marvel of mythology. Fa Cai Shen is The God of Fortune, and he's guaranteed to appear twice on every free spin!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGFaCaiShen.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGHappiestChristmasTree": {
        title: "Happiest Christmas Tree",
        description: "Decorate the Happiest Christmas Tree with baubles, bells and all that jingles! Plenty of presents await all who take the spin this festive season!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGHappiestChristmasTree.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGKanesInferno": {
        title: "Kane's Inferno",
        description: "Feel the heat as the reels spin and Kane erupts into wilds. For those that can handle it, free spins and prizes lay ahead.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGKanesInferno.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:TensorBetter5Hand": {
        title: "Tens or Better 5 Hand",
        description: "Tens Or Better 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/TensorBetter5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SGMarvelousFurlongs": {
        title: "Marvelous Furlongs",
        description: "Ride the winning horse to victory in Marvelous Furlongs! Each spin brings you closer to Race Day where, during the free spins, your pick races for a shot at the prize money.Play through the calendar to compete in the Marvelous Race Day where placements pay big! Also featuring Moving Stacked Re-Spins.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGMarvelousFurlongs.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/ezugi:Sicbo": {
        title: "Sic Bo",
        image: "https://cdn.softswiss.net/i/s3/ezugi/Sicbo.png",
        keywords: "wallfair, crypto, casino, craps, ezugi, ezugi"
    },
    "/softswiss-game/habanero:BonusDuecesWild100Hand": {
        title: "Bonus Deuces Wild 100 Hand",
        description: "Bonus Deuces Wild 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusDuecesWild100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:CaribbeanHoldem": {
        title: "Caribbean Holdem",
        description: "Card game similar to Hold 'em poker.",
        image: "https://cdn.softswiss.net/i/s3/habanero/CaribbeanHoldem.png",
        keywords: "wallfair, crypto, casino, card, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleDoubleBonusPoker5Hand": {
        title: "Double Double Bonus Poker 5 Hand",
        description: "Double Double Bonus Poker 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleDoubleBonusPoker5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JacksorBetter50Hand": {
        title: "Jacks or Better 50 Hand",
        description: "Jacks or Better 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JacksorBetter50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SGArcaneElements": {
        title: "Arcane Elements",
        description: "Fire, Water, Earth and Air, combine the elements in a perfect pair! Choose any two elements in the bonus feature and watch how they turn wild and pay!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGArcaneElements.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGBombsAway": {
        title: "Bombs Away",
        description: "Enlist today and open the bays to a sky high pay day! Every spin is a thrill in this WWII adventure. Look out for exploding wilds and bomb drops during the bonus.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGBombsAway.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGCoyoteCrash": {
        title: "Coyote Crash",
        description: "Demolition and mayhem in the desert! This coyote is here for the cash! Blow open the secret vault using TNT and win up to 50 free spins.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGCoyoteCrash.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGFlyingHigh": {
        title: "Flying High",
        description: "Passport and boarding cards ready for inspection. Take a first class ride around the world and collect amazing prizes along the way.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGFlyingHigh.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGHotHotFruit": {
        title: "Hot Hot Fruit",
        description: "Hot Hot Fruit is a vibrant classic fruit inspired slot with 15 lines to play and a chance to win up to 25,000 coins on a single line!Played at a frenzied pace, the heat is on to see the reels light up a flurry of big wins when the Hot Hot feature strikes!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGHotHotFruit.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGKnockoutFootballRush": {
        title: "Knockout Football Rush",
        description: "The Beautiful Game is back in Knockout Football Rush - featuring a simple and fun 3x3 reel config with the chance to win random penalty kicks that pay up to 60x!Habanero is ready to entertain your players this football season.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGKnockoutFootballRush.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGLondonHunter": {
        title: "London Hunter",
        description: "Blockbuster animation awaits players makingthe trip back to a steam-punk version of Victorian London.As our Sherlock Holmes-inspired hero does battle with his nemesis, keep your eye on the fuel cannisters either side of the reels that fillafter every spin.This gameplay mechanic will leave playerson the edge of their seats as expanding wildswith big multipliers turn wins T-Rex-sized!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGLondonHunter.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:BonusPoker10Hand": {
        title: "Bonus Poker 10 Hand",
        description: "Bonus Poker 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/BonusPoker10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DoubleBonusPoker5Hand": {
        title: "Double Bonus Poker 5 Hand",
        description: "Double Bonus Poker 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DoubleBonusPoker5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:DuecesWild5Hand": {
        title: "Deuces Wild 5 Hand",
        description: "Deuces Wild 5 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/DuecesWild5Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:JokerPoker50Hand": {
        title: "Joker Poker 50 Hand",
        description: "Joker Poker 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/JokerPoker50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/habanero:SGBuggyBonus": {
        title: "Buggy Bonus",
        description: "Look through the magnifying glass and discover a world of creatures great and small. Match three bugs to receive a bonus while a beehive buzzes into a wild to make pay combinations.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGBuggyBonus.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGDiscoFunk": {
        title: "Disco Funk",
        description: "Slip on your dancing shoes and bust out some killer moves on the dance floor as you boogie your way to big prizes.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGDiscoFunk.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGFortuneDogs": {
        title: "Fortune Dogs",
        description: "Horizontal Pays are back in Fortune Dogs!This canine caper features free games anda new 4 level personal multiplier prize pot:Collect gold coins to top up the pots.When 3 coins are hit, play a pick gamewhere you win the matched mini, minor,major or grand prize pot which pays yourbet x the number in the pot.Dog symbols also pack an extra punchwhen they split into double or triplesymbols for added delight.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGFortuneDogs.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGHotHotHalloween": {
        title: "Hot Hot Halloween",
        description: "Hot Hot Halloween delivers a spin-chilling experience guaranteed by the spooky atmosphere and the upbeat soundtrack.Win up to 12 Free games when you get Jack-o'-lanterns symbols and familiar Halloween spooks acts as high winning symbols.The Hot Hot feature celebrates this magical festival by randomly multiplying the winning symbols!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGHotHotHalloween.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGLanternLuck": {
        title: "Lantern Luck",
        description: "Lantern Luck is here to spread luck all year round! This easy-to-play Asian fantasy with gorgeous graphics is a must-have in everyone’s collection.\r\n3 Wild symbols trigger re-spins with locked Wilds while each lit Lantern Symbol adds x1 to the multiplier of the payline.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGLanternLuck.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGMountMazuma": {
        title: "Mount Mazuma",
        description: "We're upping the prizes and the vibes with Mount Mazuma - a cheery and upbeat slot with a new EXTRA CHANCE mechanic which guarantees minimum pays according to the triggering game.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGMountMazuma.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGOrbsOfAtlantis": {
        title: "Orbs Of Atlantis",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGOrbsOfAtlantis.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGCalaverasExplosivas": {
        title: "Calaveras Explosivas",
        description: "Let’s get loud with Calaveras Explosivas!Inspired by the Dia de Muertos, this cascading game is burst with brightlycolored palette and joyful mariachi tune.The party starts when the Calaveras tumble down with Wilds, Scatters, and Badge Multipliers!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGCalaverasExplosivas.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGDragonsThrone": {
        title: "Dragon's Throne",
        description: "Get ready for an epic battle! Command one of four dragons in a duel to victory. Overthrow the tyrannous Queen of Dragons by duelling the last remaining dragons in her kingdom.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGDragonsThrone.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGGalacticCash": {
        title: "Galactic Cash",
        description: "Blast off to another universe and defeat the alien occupants in order to win big prizes in this intergalactic thriller.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGGalacticCash.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGJellyfishFlow": {
        title: "Jellyfish Flow",
        description: "Jellyfish Flow is a tranquilic delight that begins with a 3x3 grid and can expand to a 7x7 grid with 823,543 ways to win! When the wild symbol appears the grid morphs and grows! ",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGJellyfishFlow.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGReturnToTheFeature": {
        title: "Return to the Feature",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGReturnToTheFeature.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGLoonyBlox": {
        title: "Loony Blox",
        description: "Join this Loony cast and encounter Linked Reels, Expanding Wilds and Both Ways! The characters will dash around in a colossal-sized map filled with features when they appear in winning combinations.Truly Loony Treasures lie in wait for players when the characters combine and award their respective features together!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGLoonyBlox.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGNaughtySanta": {
        title: "Naughty Santa",
        description: "Santa is back in town with his alter ego Naughty Santa along for the ride! A new multiplier meter, lucky crackers and jolly assitants multiply the fun!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGNaughtySanta.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGProst": {
        title: "Prost",
        description: "Trigger the map feature whenever a Wild lands and win Free Games or Cash Prizes\r\nWin up to 25 Free Games (retriggerable) with prizes multiplied up to x10!\r\nThe Prost! feature fill up the reels with beer to reveal the same random symbol and\r\naward massive prizes!\r\n",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGProst.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGSOS": {
        title: "S.O.S!",
        description: "Strap yourself in as you take to the skies for a rescue mission after a cruise ship capsized in rough seas. Spot the S.O.S signal to unlock free spins and games.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGSOS.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTheKoiGate": {
        title: "The Koi Gate",
        description: "In a time before recorded history, one determined Koi defied the odds. A heroic leap over a waterfall pleased the gods who transformed him into a powerful Dragon. Now good fortune awaits at Koi Gate!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTheKoiGate.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/ezugi:BlackjackGold5": {
        title: "Blackjack Gold 5",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BlackjackGold5.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/habanero:SGFly": {
        title: "Fly!",
        description: "Join the fun-filled balloon party with Fly! Float through the cotton candy clouds when Free Games are triggered with 160 paid spins! Continue the fun when entering Circus Free Games and remember to count your balloons at the end as you can win random multipliers up to 25000X! ",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGFly.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGHeySushi": {
        title: "Hey Sushi",
        description: "The delicious \"Hey Sushi\" is a top choice for the summer season.The 5x3 reel with vibrant sushi symbols cascading down will keep all the foodies asking for more!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGHeySushi.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGKnockoutFootball": {
        title: "Knockout Football",
        description: "Make sure you hit the back of the net in Knockout Football! Celebrate a summer of phenomenal football featuring boots, balls and whistles, as well as a fan-tastic soundtrack.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGKnockoutFootball.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGMonsterMashCash": {
        title: "Monster Mash Cash",
        description: "Strange things have been happening at the Count's house from green hairy monsters to bodies crawling out of the ground. Take a look inside, but be sure to come out alive.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGMonsterMashCash.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGOceansCall": {
        title: "Ocean's Call",
        description: "Embark on a voyage to discover a world of mermaids and treasure. The mermaids' harp brings a bonus - but also stormy weather. Drop anchor to unlock more free spins and ride out the squall. Can you resist the Ocean's Call?",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGOceansCall.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGRuffledUp": {
        title: "Ruffled Up",
        description: "These birds aren't angry - they're just ruffled up! A storm is approaching and best you get ready - birds of a feather get zapped together! Lightning strikes pay extra!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGRuffledUp.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTabernaDeLosMuertos": {
        title: "Taberna De Los Muertos",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTabernaDeLosMuertos.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGVikingsPlunder": {
        title: "Viking's Plunder",
        description: "Row. Row. Row. Set sail on a journey through Norse mythology to discover new lands and untold riches.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGVikingsPlunder.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:TensorBetter10Hand": {
        title: "Tens or Better 10 Hand",
        description: "Tens Or Better 10 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/TensorBetter10Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/groove:AmazingYu": {
        title: "Amazing Yu",
        description: "The Chinese inspired treasure hunting continued with a bamboo-bordered, lily-laiden pond of Amazing Yu fish. The wild Yu washes players with respins with up to 25x multipliers, whether through the Buy Yu feature or appearing naturally, while filling the 3x3 grid with the same symbol triples wins.",
        image: "https://cdn.softswiss.net/i/s3/groove/AmazingYu.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/habanero:SGIndianCashCatcher": {
        title: "Indian Cash Catcher",
        description: "Indian Cash Catcher takes you back to the smoky, nomadic plains of North America with Totem poles that trigger free games and prizes.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGIndianCashCatcher.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGLittleGreenMoney": {
        title: "Little Green Money",
        description: "Aliens have crash-landed on earth. Don your shades and earpiece and help the FBI round them up before the secret gets out.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGLittleGreenMoney.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGMysticFortuneDeluxe": {
        title: "Mystic Fortune Deluxe",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGMysticFortuneDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGPresto": {
        title: "Presto!",
        description: "Shazam! The incredible Presto is set toperform amazingly in this month's release.The unique Illusion Countdown mechanismguarantees one of four treats - with eachspin counting down to trick time.The 12 free game feature and a re-spinfeature complete this fun and feature richslot which keeps the good times coming.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGPresto.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGSparta": {
        title: "Sparta",
        description: "Travel through the mists of time to Sparta, a place of fearsome warriors and military machinery. Dodge the arrows and select your shields wisely to unlock the most free spins. Impress Zeus for big wins in the bonus game!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGSparta.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTowerOfPizza": {
        title: "Tower Of Pizza",
        description: "Sit down to a feast of Italian food, from pizza to pasta, garlic bread to red wine. Find the leaning tower of pizza on your travels to triple your prize.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTowerOfPizza.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SicBo": {
        title: "Sic Bo",
        description: "A fixed odds table game with a chips layout for various bet options. Based on the throw of three dice and those outcomes.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SicBo.png",
        keywords: "wallfair, crypto, casino, craps, habanero, habanero"
    },
    "/softswiss-game/habanero:TGWar": {
        title: "War",
        description: "Card game with a single card dealt to both player and dealer, with a go to 'war' option in the event of a tie.",
        image: "https://cdn.softswiss.net/i/s3/habanero/TGWar.png",
        keywords: "wallfair, crypto, casino, card, habanero, habanero"
    },
    "/softswiss-game/groove:ClashofGods": {
        title: "Clash of Gods",
        description: "Video Slots 'Clash of Gods' from the software provider Fugaso is a 5x3 game with 243 betways. Slot has RTP=96.5% and high level variance.  Main game features are: Wild, FreeSpins, Jackpot, Scatter symbols, Mystery symbol.",
        image: "https://cdn.softswiss.net/i/s3/groove/ClashofGods.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/atmosphera:Bingo38": {
        title: "American Bingo Roulette",
        image: "https://cdn.softswiss.net/i/s3/atmosphera/Bingo38.png",
        keywords: "wallfair, crypto, casino, lottery, atmosfera, atmosphera"
    },
    "/softswiss-game/habanero:SGJugglenaut": {
        title: "Jugglenaut",
        description: "Roll up! Roll up! Come and see the Jugglenaut!The freaky circus is in town along with Jugglenaut - ringmaster and circus act rolled into one. He juggles knives, axes and chainsaws. The longer he juggles, the more you're rewarded!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGJugglenaut.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGLuckyFortuneCat": {
        title: "Lucky Fortune Cat",
        description: "The Lucky Fortune Cat is waving its paw for inviting good fortune and wealth! Step into a world of colourful swirls and catchy tunes to feel the magic brought to you by the Lucky Fortune Cat. With the chance to win up to 21 free games, no one can go wrong with a Lucky Fortune Cat perched by theirside!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGLuckyFortuneCat.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGNewYearsBash": {
        title: "New Year's Bash",
        description: "New Year's Bash is a festive 5 x 3 with music, champagne and fireworks that will get you into the party mood right away! Win up to 90 free games when all the lightbulbs in the cities are activated!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGNewYearsBash.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGPuckerUpPrince": {
        title: "Pucker Up Prince",
        description: "Turn your frog into a prince, and prizes, in this modern take on a classic theme which includes crowns, wishing wells, and jewels.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGPuckerUpPrince.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGRollingRoger": {
        title: "Rolling Roger",
        description: "Hedge your bets with Rolling Roger and his miniature forest friends. Bumble bees, frogs, caterpillars, and snails he chances  over on the forestfloor each count for one new acorn. Then watch our heroic hedgehog spend his whole collection during winter as he swaps acorns for even bigger wins.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGRollingRoger.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGSuperStrike": {
        title: "Super Strike",
        description: "Take on the champ to strike it lucky in this bowling themed-game. Three strikes trigger a bonus feature, including free spins.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGSuperStrike.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTheDragonCastle": {
        title: "Dragon Castle",
        description: "Enter Dragon Castle where endless free spins and bonus games await, so long as you can tame the beast.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTheDragonCastle.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGWildTrucks": {
        title: "Wild Trucks",
        description: "Feel the power of the Wild Trucks barreling down the reels! Each reel collects a specific truck which turns the reel wild once 4 have been collected. Win up to 75 Free games for a truck sized fortune!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGWildTrucks.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:TGDragonTiger": {
        title: "Dragon Tiger",
        description: "Dragon Tiger is an easy table game to play.Play as either the Dragon vs. the Tiger with a Tie bet option.",
        image: "https://cdn.softswiss.net/i/s3/habanero/TGDragonTiger.png",
        keywords: "wallfair, crypto, casino, card, habanero, habanero"
    },
    "/softswiss-game/groove:JokerHeist": {
        title: "Joker Heist",
        image: "https://cdn.softswiss.net/i/s3/groove/JokerHeist.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/habanero:SGJungleRumble": {
        title: "Jungle Rumble",
        description: "Cause a rumble in the jungle as you trek through the bushes past elephants, warthogs, and man eating plants in search of a lost tribe.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGJungleRumble.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGMagicOak": {
        title: "Magic Oak",
        description: "Join the cast of six animals for a forest adventure under the Magic Oak - our first 4x4 reel game. Players collect 2 types of wisps and when these release they turn symbols wild - unlocking thrilling wins!Free spins also feature with the Scatter symbol revealing a varying number of awarded spins to keep you guessing in this high volatility title.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGMagicOak.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGNuwa": {
        title: "Nuwa",
        description: "Step into the Chinese celestial world of Nuwa, the mother goddess who will shower thee with great blessings! Collect three snake gem symbols to win eight free games. Ascend to higher heavens when you collect all five elements within the free game round to activate the bonus feature of guaranteed 2x expanding wild symbols for every spin within this bonus feature.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGNuwa.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGQueenOfQueens1024": {
        title: "Queen of Queens II",
        description: "Inside this Egyptian pyramid you will find gold, jewels, and sacred statues. Meet the Queen of Queens to unlock big wins and even more treasures.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGQueenOfQueens1024.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGSpaceFortune": {
        title: "Space Fortune",
        description: "Navigate through space in search of a fortune. Stop by the Galactic Cat and fill your moon boots with burgers and milkshakes, and free games.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGSpaceFortune.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTotemTowers": {
        title: "Totem Towers",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTotemTowers.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGZeus": {
        title: "Zeus",
        description: "The god of sky and thunder reigns supreme in this Greek mythological adventure. Match up ancient artefacts to win big prizes.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGZeus.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:TGThreeCardPokerDeluxe": {
        title: "Three Card Poker Deluxe",
        description: "Habanero is pleased to release 3 Card Poker Deluxe, a variation of standard 3 Card Poker, which includes great additional payouts for both Ante and Pair Plus bets in anticipation of the mini Royal Flush.",
        image: "https://cdn.softswiss.net/i/s3/habanero/TGThreeCardPokerDeluxe.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/groove:Cazombie": {
        title: "Cazombie",
        description: "New game worthed your Halloween attention",
        image: "https://cdn.softswiss.net/i/s3/groove/Cazombie.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:ShakeShake": {
        title: "Shake! Shake!",
        image: "https://cdn.softswiss.net/i/s3/groove/ShakeShake.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/habanero:SGLuckyLucky": {
        title: "Lucky Lucky",
        description: "Enter the Lucky Lucky portal where Asia's treasures await! Money trees, golden trinkets and more reward on a 1 line tumbler!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGLuckyLucky.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGNineTails": {
        title: "Nine Tails",
        description: "Nine Tails is a dream-come-true for anime fanatics. Featuring a 5 x 5 reels design that plays a modern twist on the ancient Japanese folktale, Nine Tails is ready to cast its spells. Win up to 57 Free Games and get random upgrades on your prizes when 9 tails of luck are collected!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGNineTails.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGPumpkinPatch": {
        title: "Pumpkin Patch",
        description: "Trick or Treat yourself this October with Pumpkin Patch!Squirrels turn Pumpkins Wild, Crows turn Pumpkins into Expanding Wilds and collected Corn counts as Free Games.No win can escape the gourd of the Scarecrow!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGPumpkinPatch.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGRomanEmpire": {
        title: "Roman Empire",
        description: "Don your helmet and strap on your shield in an historical quest that boasts unlimited free spins and the riches of Rome for the bravest of modern-day centurions.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGRomanEmpire.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGSuperTwister": {
        title: "Super Twister",
        description: "Get the farm into the barn - twisters are on the loose! Look out for flying corn, chickens crossing the screen?... and, of course, the Super Twisters, which bring a bumper cash crop in massive expanding wilds.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGSuperTwister.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:TGBlackjackAmerican": {
        title: "American Blackjack",
        image: "https://cdn.softswiss.net/i/s3/habanero/TGBlackjackAmerican.png",
        keywords: "wallfair, crypto, casino, card, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTreasureDiver": {
        title: "Treasure Diver",
        description: "Take a deep breath and submerge yourself in this underwater world. Encounter fish, shipwrecks, and even the occasional mermaid on your way to finding the hidden treasure.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTreasureDiver.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:TensorBetter100Hand": {
        title: "Tens or Better 100 Hand",
        description: "Tens Or Better 100 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/TensorBetter100Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/groove:40Pixels": {
        title: "40 Pixels",
        description: "After adventures in the deep came a step back to our childhoods, resulting in a revival of all things retro, and so 40 Pixels was born. Loaded with blocky fruits, stars and 7s, this chunky slot sports simplicity as its signature and goes 8-bit crazy with blippy music and sounds.",
        image: "https://cdn.softswiss.net/i/s3/groove/40Pixels.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:CleopatrasDiary": {
        title: "Cleopatra's Diary",
        description: "Video Slot 'Cleopatra's Diary' from the game provider Fugaso is a 6x3 game with 20 betways. Slot has RTP=96% and medium level variance. Main game features are: Wild, FreeSpins, Sticky Wilds, Spreading Wilds or Wild Rush, Respins, Scatter symbols, Respin Wild, Bonus symbols",
        image: "https://cdn.softswiss.net/i/s3/groove/CleopatrasDiary.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/habanero:SGMrBling": {
        title: "Mr Bling",
        description: "As the saying goes, you ain't got a thing if ain't got that bling. So roll with Mr Bling as he shows you his dazzling diamonds and beautiful babes.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGMrBling.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGPamperMe": {
        title: "Pamper Me",
        description: "There's plenty of self-indulgence on offer in this game, from perfumes to flowers, lipsticks to diamond rings. And when the pampered pooch appears, expect free spins galore.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGPamperMe.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGScopa": {
        title: "Scopa",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGScopa.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTechnoTumble": {
        title: "Techno Tumble",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTechnoTumble.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGWealthInn": {
        title: "Wealth Inn",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGWealthInn.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:TensorBetter50Hand": {
        title: "Tens or Better 50 Hand",
        description: "Tens Or Better 50 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/TensorBetter50Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/groove:BookofAnunnaki": {
        title: "Book of Anunnaki",
        description: "Passion for play attracted ancient Sumerian gods and the Book of Anunnaki was unearthed. Serving as a key to the fate of humanity, the mysterious book plays wild and unlocks free games with randomly selected expanding symbols adding a touch of destiny.",
        image: "https://cdn.softswiss.net/i/s3/groove/BookofAnunnaki.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:FruityMania": {
        title: "Fruity Mania",
        description: "Dreaming of summer? Don't waste your days away - just play this tropical slot from Felix Gaming to enjoy those warm, relaxing days right now!Across these five reels and 20 paylines, you'll find plenty of wilds buried in mounds of delicious fruit - the perfect combination to take home some truly sweet wins.",
        image: "https://cdn.softswiss.net/i/s3/groove/FruityMania.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:LinesOfMagic": {
        title: "Lines Of Magic",
        description: "Lit only by candles and the sparkle of jewels, Felix Gaming's most dazzling magician is hard at work in this five reel, 20-payline slot. We've never seen a magician's lair made up of such a kaleidoscope of colours, and we can't help wondering what treasures may lie withinEnter the magician's hideaway, making your way carefully around the potions, skulls, books and jewels littering the floor. The electrifying soundtrack and hypnotising sound effectswill put you under just the right kind of spell, getting you in the mood to explore the features of this vibrant slot. Collect three scatters to trigger up to ten free spins, which are accompanied by a x2 multiplier, or use the green potion to fill the tubes either side of the reels - when they're full, you'll unlock the bonus feature, which is an epic party of respins and stacked wilds.",
        image: "https://cdn.softswiss.net/i/s3/groove/LinesOfMagic.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/habanero:SGMummyMoney": {
        title: "Mummy Money",
        description: "Dare to go where others have not ventured before? Enter the cryptic and creepy tomb in search of the Mummy and stake your claim to her treasure.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGMummyMoney.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGPandaPanda": {
        title: "Panda Panda",
        description: "Double the panda means double the fun in Panda Panda! Strike three Yin Yang symbols and be bamboozled in 10 guaranteed-to-win free games! With your stacked panda pal, who doubles up whenever he wants, PANDAMONIUM is sure to follow!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGPandaPanda.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGScruffyScallywags": {
        title: "Scruffy Scallywags",
        description: "Ahoy, matey! All aboard for someaction-packed thrills! A spinningcompass points to fortunes of extrabooty, respins or free games.Keep yer eyes peeled for the Krakentoo! He shows up from the depthsof the deepest seas to swipe in newwilds with his giant tentacles.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGScruffyScallywags.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTheBigDeal": {
        title: "The Big Deal",
        description: "There is a lot riding on this high stakes game. Watches, cash, and cars, as well as the chance to double your winnings.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTheBigDeal.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGWeirdScience": {
        title: "Weird Science",
        description: "Test tubes and microscopes at the ready. Wreak havoc in the laboratory as you search for the next major scientific breakthrough, discovering free spins and bonuses along the way.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGWeirdScience.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/groove:BookOfTattoo": {
        title: "Book Of Tattoo",
        description: "Video Slot 'Book Of Tattoo' from the game provider Fugaso is a 6x3 game with 10 betways. Slot has RTP=96.82% and HIGH level variance. Main game features are: FreeSpins, Jackpot, Scatter symbols, Feature: Substitution Symbols, Gamble.",
        image: "https://cdn.softswiss.net/i/s3/groove/BookOfTattoo.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:FugasoAirlines": {
        title: "Fugaso Airlines",
        description: "Video Slot 'Fugaso Airlines' from the game provider Fugaso is a 1-3-5-3-1 game with 45 betways. Slot has RTP=96.2% and MED level variance. Main game features are: Multiplier, Symbols collection (Energy), Jackpot, Respins, Multiway (+1024), Reelset Changing.",
        image: "https://cdn.softswiss.net/i/s3/groove/FugasoAirlines.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:LuckySpinEuroRoulette": {
        title: "Lucky Spin Euro Roulette",
        description: "It's a classic roulette game from Fugaso",
        image: "https://cdn.softswiss.net/i/s3/groove/LuckySpinEuroRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, fugaso, groove"
    },
    "/softswiss-game/habanero:SGMysticFortune": {
        title: "Mystic Fortune",
        description: "Travel to Asia, a land of geishas, lanterns, and dancing lions. Look out for the colourful bird as it might just help you win a fortune.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGMysticFortune.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGPoolShark": {
        title: "Pool Shark",
        description: "Ever played pool with a shark? No? You're missing out. Put on your waistcoat, chalk your cue and take on the best in the game, Pool Shark!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGPoolShark.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGShaolinFortunes243": {
        title: "Shaolin Fortunes",
        description: "Learn from the monks how to harness the power of your mind, controlling the reels to reach enlightenment and unlock free spins.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGShaolinFortunes243.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:SGTheDeadEscape": {
        title: "The Dead Escape",
        description: "The zombie apocalypse is upon us! Help a family duo in their daring escape from the dead. Whack zombies in the feature to avoid infection and fight for survival.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGTheDeadEscape.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/ezugi:BlackRussianBlackjack": {
        title: "Black Russian Blackjack",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BlackRussianBlackjack.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/habanero:SGWickedWitch": {
        title: "Wicked Witch",
        description: "Don't be spooked by this ol' witch, she just might make you very rich! Get your cauldrons to the boil. Stack up the most wicked ingredients and win free spins.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGWickedWitch.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/groove:BookOfTattooII": {
        title: "Book Of Tattoo II",
        description: "Discover the Book of Tattoo 2' by Fugaso. Compared to the first part the new slot is more colorful and interesting. Detailed symbols of dragons, tigers, sharks and scary skulls come to life on reels and give impressive wins. A sense of pleasant excitement provokes a Mystery symbol with Mystery Respin feature appearing randomly in the base game. And that's not it! Collect 3 Bonus symbols of the Tattoo Book on the reels and get 10 Free Spins with the sticky Mystery symbol on the reel 3.",
        image: "https://cdn.softswiss.net/i/s3/groove/BookOfTattooII.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:GatesofHell": {
        title: "Gates of Hell",
        description: "Video Slot 'Gates Of Hell ' from the game provider Fugaso is a 5x3 gameSlot has RTP=96.1% and MED level variance. Main game features are: Respins, Scatter symbols.",
        image: "https://cdn.softswiss.net/i/s3/groove/GatesofHell.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:MagicSpinners": {
        title: "Magic Spinners",
        description: "A delightful combination between Magic, Fruits and Spinners is what will bring your excitement to the next level and beyond!",
        image: "https://cdn.softswiss.net/i/s3/groove/MagicSpinners.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/habanero:SGWaysOfFortune": {
        title: "Ways of Fortune",
        description: "It's time to forge a path to glory as you go in search of lost treasures in Ways Of Fortune.Get set for a magical journey featuringwarriors and their noble steeds, sweepingblossom trees and dragon statues.Trigger up to 20 free bonus spins and enjoy pays both ways!",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGWaysOfFortune.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:TensorBetter1Hand": {
        title: "Tens or Better 1 Hand",
        description: "Tens Or Better 1 Hand.",
        image: "https://cdn.softswiss.net/i/s3/habanero/TensorBetter1Hand.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/groove:BookOfAnime": {
        title: "Book of Anime",
        description: "Anime-themed is not so popular in the world of slot games, however, Fugaso studio continues to create unusual themed slots, tracking current market trends to make all users happy.",
        image: "https://cdn.softswiss.net/i/s3/groove/BookOfAnime.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/gameart:BookOziris": {
        title: "Book of Oziris",
        description: "Experience an awe-inspiring adventure under the stars, at the foot of the Great Pyramid and Sphinx, as you spin 5-reels adorned with stunning divine relics in this 25-payline slot. These reels will make you feel like a Pharaoh. Its time to game with the gods!",
        image: "https://cdn.softswiss.net/i/s3/gameart/BookOziris.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:AfricanSunset": {
        title: "African Sunset",
        description: "Africa is a continent full of intrigue, with some of the most spellbinding, hypnotizing sunrises and sunsets. Welcome to the heart of Africa with the beautiful and bewitching AFRICAN SUNSET slot game. The African sounds in this 5 reel - 15 pay line game offer constant action together with its King of the Jungle wild Lion and scatter Tree symbols – both being the bonus feature triggers.",
        image: "https://cdn.softswiss.net/i/s3/gameart/AfricanSunset.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/groove:FortuneCircus": {
        title: "Fortune Circus",
        description: "Fоrtunе Сіrсuѕ ѕlоt іѕ а brаnd nеw саѕіnо ѕlоt thаt wіll саtеr fоr уоur nееdѕ оf ultіmаtе еntеrtаіnmеnt. Тhе Сіrсuѕ hаѕ аrrіvеd іn tоwn, ѕо рrераrе уоurѕеlf tо gаthеr уоur Fоrtunе іn thіѕ 5-rееl, 3-rоw, 20-lіnе сlаѕѕіс ѕlоt, fеаturіng Wіld Ѕubѕtіtutіоnѕ, Ѕсаttеr Wіnѕ аnd Dау 2 Dау Јасkроtѕ fеаturе. Fоrtunе Ѕlоt іѕ а саѕіnо ѕlоt thаt hаѕ bееn dеѕіgnеd wіth аttеntіоn tо dеtаіl. Fugаѕо hаѕ іnvеѕtеd mаѕѕіvе еffоrtѕ іntо сrеаtіng thіѕ ѕlоt, ѕо whу nоt асknоwlеdgе thе соmраnу’ѕ еffоrtѕ.",
        image: "https://cdn.softswiss.net/i/s3/groove/FortuneCircus.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:LightDance": {
        title: "Light Dance",
        description: "We're in the mood for dancing... are you? If so, you've come to the right place: Felix Gaming are about to transport you into the party of a lifetime in this five reel, 243 ways to win slot, which has wilds, free spins, multipliers, magic reels and even more to give you a truly lit experience. Get out onto the dance floor!",
        image: "https://cdn.softswiss.net/i/s3/groove/LightDance.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:RomanceV": {
        title: "Romance V",
        description: "Enter into a world of vampires, nighttime, and romance with the Romance V slot. If you’re familiar with slots from Fugaso, you know to expect impressive and lifelike graphics. Romance V doesn’t disappoint, as it offers a wide range of features – with a progressive jackpot as the cherry on top. When it comes to graphics, the Romance V slot is set against a dark, foggy street with buildings flanking both sides. At the bottom of the street, you can see the moving fog. Symbols of gorgeous vampires fill the reels, and when they expand, you can see the couples of vampires and humans bite each other’s necks or embrace. As for the bonus features, you can expect to land wilds and free spins",
        image: "https://cdn.softswiss.net/i/s3/groove/RomanceV.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:TheWildBeastofCrete": {
        title: "The Wild Beast of Crete",
        description: "uiced up and ready to go, things got a bit wild, and the result was a Greek and beast mashup. The wild beast appears on the reels and stomps out respins if he lands on a winning line, while the 3 gold coins trigger an equally fast and fierce free spins game.",
        image: "https://cdn.softswiss.net/i/s3/groove/TheWildBeastofCrete.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/habanero:SGWizardsWantWar": {
        title: "Wizards Want War",
        description: "Embark on the never-ending battle of good versus evil! Choose your Wizard and let this fun-filled game reward your players with legendary wins.Wizards Want War, and it's up to you to fuel their duel with up to 6 Wilds awarded in addition to other Wild symbols, while all wins are guaranteed to be X2 or X3 multiplied.",
        image: "https://cdn.softswiss.net/i/s3/habanero/SGWizardsWantWar.png",
        keywords: "wallfair, crypto, casino, slots, habanero, habanero"
    },
    "/softswiss-game/habanero:TGThreeCardPoker": {
        title: "Three Card Poker",
        description: "Card game similar to Poker using only three cards.",
        image: "https://cdn.softswiss.net/i/s3/habanero/TGThreeCardPoker.png",
        keywords: "wallfair, crypto, casino, video_poker, habanero, habanero"
    },
    "/softswiss-game/ezugi:NamasteRoulette": {
        title: "Namaste Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/NamasteRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/groove:CaiShen689": {
        title: "Cai Shen 689",
        description: "Golden sunshine led to golden treasures courtesy of the Chinese god of wealth himself. The precious yellow metal leads to multiple winning ways with golden bowled Koi triggering free games with x6, x8 or x9 win multipliers, while gold coins unlock the choicest picks.",
        image: "https://cdn.softswiss.net/i/s3/groove/CaiShen689.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:ImhotepManuscript": {
        title: "Imhotep Manuscript",
        description: "In the middle of the desert, surrounded by pharaohs and pyramids, start your adventure in ancient Egypt with our exceptional and unique 7 Reel Video Slot Game, Imhotep Manuscript.",
        image: "https://cdn.softswiss.net/i/s3/groove/ImhotepManuscript.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:MonacoFever": {
        title: "Monaco Fever",
        description: "Fancy living the high life for a while? Then this 20-payline slot from Felix Gaming is exactly the place for you. Monaco's winding roads, beautiful buildings and expensive vehicles are hiding plenty of exciting riches that you can get your hands on - like instant wins, extra spins, pick your prize bonuses - and if you're lucky enough to spot the red car whizzing past after a win, your payout will be multiplied by between x3 and x25.It's time to find out how the other half live... good luck!",
        image: "https://cdn.softswiss.net/i/s3/groove/MonacoFever.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:Spinbox": {
        title: "Spinbox",
        description: "Spinbox is an online slot developed by Felix Gaming and it's built around the classic 3X3 layout. The game theme is completely classic in the slot there are such symbols as diamonds, sevens, stars, BARs, game chips. The number of bet lines is fixed - 9 lines. This slot has only 1 game feature - The chip prize feature. This feature can contain chip prizes of 100, 50, 20, 15, 5, 4, 3, 2, or 1 multiplied by the total bet. Play the Spinbox slot demo for free, read a review, and claim a bonus.",
        image: "https://cdn.softswiss.net/i/s3/groove/Spinbox.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:TrumpItDeluxeEpicways": {
        title: "Trump It Deluxe EPICWAYS",
        description: "Anyone who is interested in a serious topic of politics will also be interested to relax and try the new slot from Fugaso. Trump It Deluxe Epicways is the third slot in the Trump It series by Fugaso. The game is framed in the same comic funny style as the slot predecessor Trump It Deluxe. This slot will definitely make you smile, regardless of your political views.",
        image: "https://cdn.softswiss.net/i/s3/groove/TrumpItDeluxeEpicways.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:BraveMongoose": {
        title: "Brave Mongoose",
        description: "Video Slot 'Brave Mongoose' from the game provider Fugaso is a 5x3 game with 25 betways. Slot has RTP=96% and MED level variance. Main game features are: Wild, FreeSpins, Sticky Wilds, Respins, Scatter symbols, Feature: Substitution Symbols, Random multiplier.",
        image: "https://cdn.softswiss.net/i/s3/groove/BraveMongoose.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/ezugi:GoldenBaccaratSuperSix": {
        title: "Golden Baccarat Super Six",
        image: "https://cdn.softswiss.net/i/s3/ezugi/GoldenBaccaratSuperSix.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/groove:DivineCarnival": {
        title: "Divine Carnival",
        description: "Video Slots 'Divine Carnival' from the software provider Fugaso is a 5x3 game with 25 betways. Slot has RTP=96%. Main game features are: Wild, FreeSpins, Spreading Wilds or Wild Rush, Respins, Scatter symbols",
        image: "https://cdn.softswiss.net/i/s3/groove/DivineCarnival.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:Kukers": {
        title: "Kukers",
        description: "After the fifth sun came the darkness and out crept the Kukers. Bulgarian man-beasts adorned with loud bells designed to chase away evil spirits, these colourful creatures transform into additional wilds if they land on the centre portal for shock wins.",
        image: "https://cdn.softswiss.net/i/s3/groove/Kukers.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:Resident3D": {
        title: "Resident 3D",
        description: "Video Slot 'Resident 3D' from the game provider Fugaso is a 5x3 game with 9 betways. Slot has RTP=96% and MED level variance. Main game features are: Wild, Bonus Game, BonusGame: Pick Objects, Bonus symbols",
        image: "https://cdn.softswiss.net/i/s3/groove/Resident3D.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:TheMummyWinHuntersEPICWAYS": {
        title: "The Mummy Win Hunters EPICWAYS",
        description: "Video slot \"The Mummy Win Hunters Epicways\" is an Egyptian-style game with a 6x5 reelset. You can win up to 50,000X bets. RTP - 95.82%. The game has the following features: Multiway (+1024), wild, Scatter symbols, FreeSpins, Buy Feature, Expanding Symbols.",
        image: "https://cdn.softswiss.net/i/s3/groove/TheMummyWinHuntersEPICWAYS.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/gameart:4Symbols": {
        title: "4 Symbols",
        description: "The great beasts from the Chinese constellations, better known as the '4 symbols' are finally joining the ranks of our beautiful games. Get excited to win alongside these creatures of legend in this brand-new experience from GameArt! Step inside for mighty wins and let loose your wildest dreams.In this 5-reel game with 25 paylines balance is key, as the slot is packed with a fused 'freespin / bonus' game that is guaranteed to bring you countless moments of excitement. As the wins are paid from the leftmost to the right wheel, be sure to keep an eye out for the scatter symbols! When Light and Dark compliment themselves, three Ying Yang symbols appear consecutively awarding freespins and triggering the bonus session. A new batch of four 'reel sets' will appear, representing each of the four mighty beasts! In this amazing feature you will be able to win re-triggered spins and with fortune on your side a 200 (x) multiplier of your win if all the reel sets win simultaneously and balance out the power of the beasts of legend!Is there anything left to say? Let's us not wait anymore, let us test the elements! From the Black Turtle in the North to the Azure Dragon in the East, the Vermillion Bird in the South and White Tiger to the West, be sure you are in good hands, as this game is GameArt and GameArt is the best! Good Luck!",
        image: "https://cdn.softswiss.net/i/s3/gameart/4Symbols.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:DragonTiger": {
        title: "Dragon Tiger",
        image: "https://cdn.softswiss.net/i/s3/ezugi/DragonTiger.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:OracleCasinoRoulette": {
        title: "Oracle Casino Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/OracleCasinoRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/groove:DeepBlue": {
        title: "Deep Blue",
        description: "Swapping sweet for salty, we dived into the Deep Blue in search of hidden treasure. Glinting amidst the glowing sea life are rich remnants of swashbuckling adventures, with mysterious bottled scrolls and gold coin multipliers burning down the fuses to four Jackbomb jackpots.",
        image: "https://cdn.softswiss.net/i/s3/groove/DeepBlue.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:JuicyWilds": {
        title: "Juicy Wilds",
        description: "There’s just never enough juice so we squeezed in some more with Juicy Wilds. The game’s epic Hyper Jump feature fast-forwards through no-win spins and skips straight to the juicy bits: the Pick Me Bonus and Free Games Feat",
        image: "https://cdn.softswiss.net/i/s3/groove/JuicyWilds.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:RedLion": {
        title: "Red Lion",
        description: "Let the rich colours of an Asian village captivate you in this beautiful five reel, 20-payline slot from Felix Gaming, where you can get your hands on expanding wilds, unlimited extra spins, a pick-me bonus and multipliers of up to 20,000x your bet. If you've been waiting for an opportunity to embark on a new adventure, it looks like the time has come... good luck!",
        image: "https://cdn.softswiss.net/i/s3/groove/RedLion.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:TheMummyWinHunters": {
        title: "The Mummy Win Hunters",
        description: "There is something quite mysterious about Ancient Egypt that keeps iGaming developers occupied constantly. Fugaso might have figured out a thing or two about mummification in The Mummy Win Hunters online slot.",
        image: "https://cdn.softswiss.net/i/s3/groove/TheMummyWinHunters.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/gameart:20HotFruitDelights": {
        title: "20 Hot Fruit Delights",
        description: "Appear on reels 2,3 and 4 only. Substitute for all symbols except Scatters. Wilds expand over the entire reel every time they land on the screen. ",
        image: "https://cdn.softswiss.net/i/s3/gameart/20HotFruitDelights.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:BattleforCosmos": {
        title: "Battle for Cosmos",
        description: "After the legendary undersea success of Battle for Atlantis, GameArt takes you to the far reaches of thegalaxy with Battle for Cosmos a thrilling anime-style, neon tinted, 5-reel, 30-payline slot bursting with starry wonders and other-worldly beauty.Harness the power of the mystical Wild Knights as you explore unknown constellations when anyKnight appears on the reels it will turn itself and selected adjacent symbols into special Wilds, with each Knight acting in its own unique way.The gorgeous goddess of the cosmos is a Scatter, and if you land 3 or more you'll be rewarded by one of the four cosmic Wild Knights. Get 12 Free Spins with the Expanding Wild Red Knight, with all winsfeaturing a wild multiplied by 3. Get 15 Free Spins with the Connecting Wild Green Knight, again with allwins containing a wild x3. Get 9 Free Spins with the Walking Wild Pink Knight, and get 7 Free Spins withthe Collecting Wild Blue Knight. Pink Knight and Blue Knight Free Spins continue until all wilds areawarded.And, if you're feeling lucky, you can double any win up to 5 times with an optional extra red or blackgamble feature. So, gear-up, and prepare for the truly epic Battle for Cosmos!",
        image: "https://cdn.softswiss.net/i/s3/gameart/BattleforCosmos.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:GoldenBaccarat": {
        title: "Golden Baccarat",
        image: "https://cdn.softswiss.net/i/s3/ezugi/GoldenBaccarat.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/groove:JewelSea": {
        title: "Jewel Sea",
        description: "Video Slot 'Jewel Sea' from the game provider Fugaso is a 5x3 game with 10 betways. Slot has RTP=90.19% and MED level variance. Main game features are: Expanding wild with re-spin, Jackpot.",
        image: "https://cdn.softswiss.net/i/s3/groove/JewelSea.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:MrLuck": {
        title: "Mr Luck",
        description: "In need of a little luck? Why don't you take a trip to visit the mischievous pixies, elves and leprechauns of Ireland and see if they can help you out?This five reel, ten payline slot from Felix Gaming has an abundance of pots of gold for you to claim, and with wilds that hold the reels and trigger a free respin, plus plenty of beer and that impish Irish spirit, we're pretty sure you'll have fun doing it.",
        image: "https://cdn.softswiss.net/i/s3/groove/MrLuck.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:SpinJoker": {
        title: "Spin Joker, Spin!",
        description: "Video Slot 'Spin Joker, Spin' from the software provider Fugaso is a 5x3 game with 20 betways. Slot has RTP=96% and MED level variance. Main game features are: Wild, Sticky Wilds, Expanding Symbols, Respins, Respin Wild.",
        image: "https://cdn.softswiss.net/i/s3/groove/SpinJoker.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:UndertheFifthSun": {
        title: "Under the Fifth Sun",
        description: "A step back led to a jump back and so dawned the golden Aztec inspiration Under the Fifth Sun. Upbeat yet mystical exploration awaits, with the gold snake’s head descending the pyramid steps and the shimmering wheel both offering grand reward",
        image: "https://cdn.softswiss.net/i/s3/groove/UndertheFifthSun.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/gameart:AtlantisWorld": {
        title: "Atlantis World",
        description: "Atlantis, the fabled city under the sea, swim along with the golden dolphins in the mystical waters of ATLANTIS WORLD and discover all the sea of riches that they can win for you. Underwater ambiance surrounded by the Atlantis magnificent ruins, this 50 pay lines slot game offers frequent wild stacked symbols that can deliver exciting big wins. The bonus feature is triggered with three scattered Sphere symbols in any position on reels 2, 3 and 4 awarding 5 free spins, with additional stacked WILD GOLDEN DOLPHINS on bonus reels. If you’re lucky, you can also boost your bonus with an additional five free spins!",
        image: "https://cdn.softswiss.net/i/s3/gameart/AtlantisWorld.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:BookofCupigs": {
        title: "Book of Cupigs",
        description: "Look who’s going crazy in love this Valentine’s. It’s the Cupigs! They’re busy fluttering around with their bows, harps, violins, and roses, ready to shower you with soft, sweet-scented rose petals and gift you with huge wins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/BookofCupigs.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:Cleopatra": {
        title: "Cleopatra Jewels",
        description: "Cleopatra, the Queen of Egypt during the 1st century B.C and famed for her beauty and being one of the world’s most powerful leaders, let’s play THE QUEEN OF RE-SPIN – in the CLEOPATRA JEWELS slot game. The 5 reel- 25 pay line game is surrounded by the ancient and exotic Egyptian jewellery that comes your way with every win.",
        image: "https://cdn.softswiss.net/i/s3/gameart/Cleopatra.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/groove:Joker": {
        title: "It's a Joker",
        description: "In the mood for all the fun of the fair? Then maybe don't choose this one, as there's a pretty creepy clown lying in wait in this five-payline slot from Felix Gaming, just itching for the chance to ensnare you. Having said that, if you are brave enough to face him, there are wilds, multipliers of up to x25 on every win and the chance to win up to five extra spins on every single spin here... and you could get your hands on all of it. The only question that remains is this: do you really have the courage?",
        image: "https://cdn.softswiss.net/i/s3/groove/Joker.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:Mummy": {
        title: "Mummy",
        description: "Video Slot 'The Mummy 2018' from the game provider Fugaso is a 6x5 gameSlot has RTP=96.42% and MED level variance. Main game features are: FreeSpins, Jackpot, Respins, Scatter symbols, Feature: Substitution Symbols, Stack.",
        image: "https://cdn.softswiss.net/i/s3/groove/Mummy.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:PharaohsTemple": {
        title: "Pharaoh's Temple",
        description: "Looking for a new adventure? Search no more, brave explorer: this five reel slot from Felix Gaming has everything you're looking for! Journey deep into the temples of Ancient Egypt and discover twenty golden paylines and plenty of expanding wilds to give you as many opportunities to win as possible. Sounds like an expedition worth taking to us!",
        image: "https://cdn.softswiss.net/i/s3/groove/PharaohsTemple.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:StonedJoker5": {
        title: "Stoned Joker 5",
        description: "Video Slot 'Stoned Joker 5' from the game provider Fugaso is a 5x3 game with 5 betways. Slot has RTP=95.66% and MED level variance. Main game features are: Jackpot, Scatter symbols, Gamble.",
        image: "https://cdn.softswiss.net/i/s3/groove/StonedJoker5.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:WildRodeo": {
        title: "Wild Rodeo",
        description: "Video Slot 'Wild Rodeo (Fugaso)' from the game provider Fugaso is a 6x3 game with 50 betways. Slot has RTP=96% and MED level variance. Main game features are: Wild, FreeSpins, Sticky Wilds, Respins, Scatter symbols, Random Wilds / Additional Wilds.",
        image: "https://cdn.softswiss.net/i/s3/groove/WildRodeo.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/gameart:Baccarat": {
        title: "Baccarat",
        description: "As you play Baccarat, your objective is to predict whose cards (the Dealer’s/Banker's or the Player's) will score the number of points closest to 9 using 2 or 3 cards.\r\nThe game comes with 3 deal modes: Normal, Fast, and Turbo.\r\nEnjoy the game, and good luck!",
        image: "https://cdn.softswiss.net/i/s3/gameart/Baccarat.png",
        keywords: "wallfair, crypto, casino, roulette, gameart, gameart"
    },
    "/softswiss-game/gameart:CarribeanStudPoker": {
        title: "Carribean Stud Poker",
        description: "The game begins with the player placing a bet (or ANTE) and receiving 5 cards, while the dealer receives an additional 5 cards. All player cards are face-up, one of the dealer’s cards is dealt face-up, but the others are hole cards.",
        image: "https://cdn.softswiss.net/i/s3/gameart/CarribeanStudPoker.png",
        keywords: "wallfair, crypto, casino, poker, gameart, gameart"
    },
    "/softswiss-game/bsg:AmericanRoulette": {
        title: "American Roulette",
        description: "American (Double Zero) Style Roulette Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/AmericanRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, bsg, bsg"
    },
    "/softswiss-game/groove:NeonRoulette": {
        title: "Neon Roulette",
        description: "Neon Roulette is a casino table game by Fugaso that is based on European Roulette. The virtual gaming table helps make you feel like you are in a land based casino as you place chips and watch the ball spinning around the reel. You can make additional Racetrack bets that use the location of the numbers on the Roulette Wheel, see which numbers are hot and cold, or make special bets. So take a seat, place your bets and hope the ball will land in your favour.",
        image: "https://cdn.softswiss.net/i/s3/groove/NeonRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, fugaso, groove"
    },
    "/softswiss-game/groove:StonedJoker": {
        title: "Stoned Joker",
        description: "Video Slot 'Stoned Joker' from the game provider Fugaso is a 5x4 game with 40 betways. Slot has RTP=95.05% and MED  level variance. Main game features are: Wild, Jackpot, Risk (Double) game, Gamble.",
        image: "https://cdn.softswiss.net/i/s3/groove/StonedJoker.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/groove:WarlocksBook": {
        title: "Warlock's Book",
        description: "Video Slot 'Warlocks Book' from the game provider Fugaso is a 5x3 game with 30 betways. Slot has RTP=96% and MED level variance. Main game features are: Wild, FreeSpins, Sticky Wilds, Respins, Scatter symbols.",
        image: "https://cdn.softswiss.net/i/s3/groove/WarlocksBook.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/gameart:AzrabahWishes": {
        title: "Azrabah Wishes",
        description: "Join Nidal as he embarks on a quest for riches and the beautiful Jaslyn, in a high-tech golden desert megalopolis, complete with skateboarding tigers, driving monkeys and a magic lamp containing Jinni!",
        image: "https://cdn.softswiss.net/i/s3/gameart/AzrabahWishes.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:CaptainCandy": {
        title: "Captain Candy",
        description: "Experience a sugar-powered world of candy canes, gummy bears and hard boiled fruits, as your sweet-toothed superhero spins five wafer reels for delicious wins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/CaptainCandy.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:DiamondMagic": {
        title: "Diamond Magic",
        description: "Sparkle your way through Diamond Magic, a luxurious 5x3 reel slot game with 10 paylines where a large array of special gems awaits. Although with a classic feel to it, this slot has a pinch of extravagance due to the EXPANDING MULTIPLE WILDS symbols and its RESPIN functionality. ",
        image: "https://cdn.softswiss.net/i/s3/gameart/DiamondMagic.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:DragonKing": {
        title: "Dragon King",
        description: "Enter the mighty Chinese Kingdom of the powerful and awe-inspiring land of the DRAGON KING. This game is ready to keep you fully immersed and excited during every spin with its brilliant design, 50 pay lines and frequent wild stacked symbols awarding big wins. The DRAGON KING Bonus feature is triggered with three scattered mystical Coin symbols in any position on reels 2, 3 and 4 awarding 5 free spins, with additional stacked Dragons on bonus reels. Bonus feature can be retriggered during free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/DragonKing.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:OracleBlaze": {
        title: "Oracle Blaze",
        image: "https://cdn.softswiss.net/i/s3/ezugi/OracleBlaze.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/groove:PlanetRocks": {
        title: "Planet Rocks",
        description: "Ever been to outer space? No? Then prepare for the journey of a lifetime, as you venture into the heart of this five reel, ten payline slot from Felix Gaming. Who knows what kind of extraterrestrial elements you may find out here? We don't know, but we hear wilds, extra spins and the chance to win up to 218x your bet might come into it somewhere.",
        image: "https://cdn.softswiss.net/i/s3/groove/PlanetRocks.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:SugarLand": {
        title: "Sugar Land",
        description: "All that destiny worked up an appetite for sweetness and so SugarLand was born. Chock full of syrupy fruits, crunchy candy canes and swizzly stars, this fantasyland satisfies every sweet tooth with expanding iced donut wilds and fabulous free games making it sweeter still.",
        image: "https://cdn.softswiss.net/i/s3/groove/SugarLand.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:WitcherCave": {
        title: "Witcher Cave",
        description: "Witcher Cave slot reviewLast Update: 30.06.2021. Author: SlotCatalog.Felix Gaming studio constantly pleases its fans with a variety of slot machines on various topics. This time they created the Witcher Cave slot with a magic theme. The slot has a 3-4-5-4-3 layout and 720 betways. Among the symbols, there are various magic scrolls, potions, candles, and other ingredients for creating witcher magic. The Wild symbol can only appear on reels 2-4. The scatter symbol activates Free Spins. During the Free Spins mode, you can get Additional spins up to 180. The slot machine can be launched from any modern device.",
        image: "https://cdn.softswiss.net/i/s3/groove/WitcherCave.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/gameart:BattleforAtlantis": {
        title: "Battle for Atlantis",
        description: "Immerse yourself in an epic ocean clash as cyberpunk meets ancient myth in Battle for Atlantis from GameArt! Many fathoms beneath the waves, legendary figures fight for control of the submerged city and the hand of the captivating Anomis. Experience intense aquatic action with 5-reels featuring titanic characters and a constant stream of surprises!",
        image: "https://cdn.softswiss.net/i/s3/gameart/BattleforAtlantis.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:CastleBlood": {
        title: "Castle Blood",
        description: "It's dark, it's full of twists and turns, so be ready to fight the vampires and werewolves in the blood-curdling CASTLE BLOOD slot game. The 5 reel – 25 pay line game keeps on entertaining you with its stacked symbols structure. Any 3, 4 or 5 Scatter symbols trigger 8, 12 or 20 Free Spins respectively. Any 2, 3, 4 or 5 Scatter symbols award additional 5, 8, 12 or 20 Free Spins respectively during the bonus feature. During Free Spins multipliers are added to wild symbols. Each multiplier that substitutes in a win it will multiply the win by x2, x3, x4, and x5 respectively. Let the wins begin!",
        image: "https://cdn.softswiss.net/i/s3/gameart/CastleBlood.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:DiegoelPibedeOro": {
        title: "Diego el Pibe de Oro",
        description: "El Pibe de Oro, a slot that pays homage to DiegoMaradona, one of football's greatest ever players and one of the world's biggest personalities. Officiallylicensed through Applovesoft, it's a game that will resonate with millions of fans around the world. ",
        image: "https://cdn.softswiss.net/i/s3/gameart/DiegoelPibedeOro.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:FortuneLions": {
        title: "Fortune Lions",
        description: "Roar if you dare and celebrate wins with FORTUNE LIONS in this state of the art 50 pay line slot game, with stacked Lions as top pay and wild symbols galore. Three lantern symbols on reels 1, 2 and 3 triggers unlock the bonus feature awarding 10 free spins for players.",
        image: "https://cdn.softswiss.net/i/s3/gameart/FortuneLions.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/groove:Spinachos": {
        title: "Spinachos",
        description: "Evil spirits vanquished, the warm Mexican sunshine illuminated a tasty feast of tortillas and tequila with upbeat rhythms from mariachi maracas. Colourful piñatas hide the delightful treat of free games with sombrero and poncho clad Mexican wilds stacked and wins tripled",
        image: "https://cdn.softswiss.net/i/s3/groove/Spinachos.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/groove:TrumpItDeluxe": {
        title: "Trump It Deluxe",
        description: "Video Slot 'Trump It Deluxe' from the game provider Fugaso is a 5x3 game with 15 betways. Main game features are: Wild, FreeSpins, Expanding Symbols, Respins, Scatter symbols, Random Wilds / Additional Wilds, FreeSpins Multiplier.",
        image: "https://cdn.softswiss.net/i/s3/groove/TrumpItDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, fugaso, groove"
    },
    "/softswiss-game/gameart:AfricanSunset2": {
        title: "African Sunset 2",
        description: "Get up close and personal with the world's wildest animals, including zebras, giraffes, rhinos, and of course, the king of the jungle himself, the mighty lion. Watch as herds of magnificent elephants make their way to watering holes, and don't forget to seek shade under the splendid acacia tree.",
        image: "https://cdn.softswiss.net/i/s3/gameart/AfricanSunset2.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:BubbleFruits": {
        title: "Bubble Fruits",
        description: " You'll feel lighter than air as you float away to sweet, sweet wins with this medium volatile, 5-reel, 10-payline funfest! Sure, you've played plenty of fruit machines before, but you've never played one quite like this!Bubble Fruits definitely counts towards! ",
        image: "https://cdn.softswiss.net/i/s3/gameart/BubbleFruits.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:DancingLion": {
        title: "Dancing Lion",
        description: "Ferocious, Powerful, the Lord of the Jungle and Savanah, it’s lion festival time with the DANCING LIONS roaring slot game. This 5 reel – 10 pay line slot game offers some excitement and unique features in the bonus feature game. Win 10 free spins with Red Pocket symbols landing on reels 1, 3 and 5 simultaneously. During free spins the Red Pocket symbol acts like wild and substitutes for all symbols except Lion. Bonus feature can be retriggered during the free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/DancingLion.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:DolphinsDream": {
        title: "Dolphin's Dream",
        description: "Dive deep into a fluorescent dreamworld of oceanic wonders in Dolphin’s Dream, an undersea experience that will captivate and thrill in equal measure. Explore vibrant coral reefs and swim with dolphins and turtles as you spin and win in a mesmerising aquatic adventure. The stunning aquamarine colours will have you slipping into your diving suit in no time.",
        image: "https://cdn.softswiss.net/i/s3/gameart/DolphinsDream.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:FiveStarLuxury": {
        title: "Five Star Luxury",
        description: "Live life in the fast lane and indulge with luxuriant excesses in the life of rich and famous by becoming one yourself! You can live the dream and do so by playing 5 STAR LUXURY, with its 5 reel - 243 win ways there are big winnings waiting for you. Win 10 free spins with 3, 4 or 5 champagne symbols starting from the leftmost reel. During the free spins, luxury items such as jet, yacht, car, watch and diamond symbols wins are multiplied by their respective multipliers shown on the top of the reels.",
        image: "https://cdn.softswiss.net/i/s3/gameart/FiveStarLuxury.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/pragmaticexternal:BlackjackLobby": {
        title: "Blackjack Lobby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackLobby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/groove:ThreeKingdomsRomance": {
        title: "Three Kingdoms Romance",
        description: "Expanded oriental wins were next in our destiny with the super-sized 6-reel layout of Three Kingdoms Romance. 729 ways to find fortune await players in the base game, with rich opportunities multiplied by the 2,025 ways of the free games feature, unveiling up to 50 free spins with additional expanding wild power.",
        image: "https://cdn.softswiss.net/i/s3/groove/ThreeKingdomsRomance.png",
        keywords: "wallfair, crypto, casino, slots, felixgaming, groove"
    },
    "/softswiss-game/gameart:AncientGong": {
        title: "Ancient Gong",
        description: "Enter the mystical entrapments of the Far East, with super cool amazing graphics design and attention to the detail for this Chinese themed slot game. ANCIENT GONG is a 5 reel – 243 win ways slot game and its 3, 4 or 5 scattered Gong symbols trigger the bonus feature in the search for enlightenment. In the 2nd bonus screen, you need to select the number of free spins by picking the gong symbols. ",
        image: "https://cdn.softswiss.net/i/s3/gameart/AncientGong.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:BookofAlchemy": {
        title: "Book of Alchemy",
        description: "Enter a mysteriously mesmerising world of secret knowledge with the mighty magician Remlin, in Bookof Alchemy from GameArt! Discover lost potions and tomes of archaic wisdom amid the purple glow ofthe ancient mages fantastical laboratory.As you immerse yourself in forbidden knowledge, you'll want to look out for the golden cauldron bubbling with a green mixture, because it's the Wild, substituting for all symbols except the Scatter. While the Book of Alchemy itself is the Bonus, with three awarding 10 Free Spins.When the glass spheres to the left and right of the reels match, a magnificent array of magical featurescan be conjured up by Remlin potions\\; during the base game and Free Spins Stacked Wilds or up to 50xmultipliers can be triggered. In the base game only, Locked Wilds and Respins can be set off, and in FreeSpins only, you can initiate Connect Wilds and additional Free Spins.And, if you're curious about what wise old Remlin has brewing in his cauldron, you can help fate along byusing the new Buy Bonus feature just click on the cauldron overflowing with a purple potion!Are you ready to receive the knowledge?",
        image: "https://cdn.softswiss.net/i/s3/gameart/BookofAlchemy.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:CircusofHorror": {
        title: "Circus of Horror",
        description: "Dare to enter the Circus of Horror, brand-new from GameArt? The very first slot to feature our immersive new player interface, take your seat in the blood-soaked big top of terror and bear witness to a macabre spectacle of surprises in this medium volatility, 243-payline, 5-reel freakishly featured-packed extravaganza.",
        image: "https://cdn.softswiss.net/i/s3/gameart/CircusofHorror.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:DynamiteFruits": {
        title: "Dynamite Fruits",
        description: "Get ready for an explosion of fruits in Dynamite Fruits, a classic 5x4-reel slot with 40 paylines in which fruits burst into flames when a win occurs. To win, players must match symbols on the paylines.",
        image: "https://cdn.softswiss.net/i/s3/gameart/DynamiteFruits.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:GoldOfRa": {
        title: "Gold Of Ra",
        description: "Welcome to the mysterious and ancient Egyptian world of GOLD OF RA. RA is a powerful deity and Sun God and this game provides a powerful 5 reel - 25 pay line slot game with astonishing mystical graphics and sounds that are ready to engage you with its frequent bonus, where 3, 4 or 5 scattered Golden Chest symbols lead you to the desired path of enlightenment, the bonus feature. During the engaging bonus screen, the Golden Chest will determine and bestow the number of free spins and symbols that will turn gold and act as wild during the free spins feature. The Bonus feature can be retriggered during further free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/GoldOfRa.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:MaradonaHyperWays": {
        title: "Maradona HyperWays™",
        description: "Join us in celebrating the career and achievements of football god Diego Maradona with GameArt’s Maradona HyperWays™, co-produced with AppLoveSoft™.\r\n",
        image: "https://cdn.softswiss.net/i/s3/gameart/MaradonaHyperWays.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:88Riches": {
        title: "88 Riches",
        description: "Indulge yourself in the all-powerful and mystical land of fire-breathing dragons if you darn, combined with the opulence from 88 RICHES. The 5 reel – 50 pay line slot game offers 10 free spins triggered by the three Jing Jang symbols landing on reels 1, 2 and 3 simultaneously. During the free spins, any GOLDEN DRAGONS appearing on reels stays locked in that position until the end of free spins and substitutes for all symbols except scatters. Bonus feature can be retriggered during the free spins awarding additional 5 free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/88Riches.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:Blackjack": {
        title: "Blackjack",
        description: "Blackjack is a standard table game that is played with six decks of 52 cards.\r\n\r\nYou can choose to play up to three Bet Places. To begin each round, place your bets in the Bet Places with the objective of winning money by creating card totals higher than those of the dealer’s hand but not exceeding 21 or by stopping at a total in the hope that the dealer will bust.",
        image: "https://cdn.softswiss.net/i/s3/gameart/Blackjack.png",
        keywords: "wallfair, crypto, casino, card, gameart, gameart"
    },
    "/softswiss-game/gameart:CrystalMystery": {
        title: "Crystal Mystery",
        description: "Join the beautiful explorer in the mystery adventure chasing the alluring and magical crystal skulls. CRYSTAL MYSTERY is a 10 pay line slot game ready to provide you with big wins in this intriguing game. 3, 4 or 5 scattered CRYSTAL SKULL symbols trigger the bonus feature awarding 10 free spins wherein the bonus screen, the time-gate determines your mystery symbol.",
        image: "https://cdn.softswiss.net/i/s3/gameart/CrystalMystery.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:EmperorsWealth": {
        title: "Emperors Wealth",
        description: "Greetings fellow nobleman of the court, you have been formally invited to the emperors’ court! Join him in the Central Kingdom to complete the everlasting quest for infinite wealth. In this 5 REEL, 9 PAYLINEs game, you are will be given the chance to play like a legend of the celestial empire, while having fun and most importantly winning an infinite amount of credits. Keep an eye out for WILD and WILD EXPANDING symbols that will take you to infinity, as on your search for wealth you will be welcomed by fortune bringers, the legendary dragons! The dragons being the symbols of strength and auspicious powers will be granting you the in-game feature awarding 10, 20 or 50 FREESPINS!!!.",
        image: "https://cdn.softswiss.net/i/s3/gameart/EmperorsWealth.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:HawaiianFruits": {
        title: "Hawaiian Fruits",
        description: "Grab your boardshorts or bikini and hit the beach with Hawaiian Fruits, GameArt’s debut cluster-style game.",
        image: "https://cdn.softswiss.net/i/s3/gameart/HawaiianFruits.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:LadyLuck": {
        title: "Lady Luck",
        description: "Have you ever met a fortune teller, reading your palms or looking into a Crystal Ball? Then look no further, this beautiful game is full of rich predictions from LADY LUCK! A 5 reel - 20 pay line games, enriched with original gypsy sounds and enchanting music which offers the bonus feature that is triggered by 3, 4 or 5 scattered Crystal Ball symbols awarding 15 free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/LadyLuck.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:MoneyFarmTwo": {
        title: "Money Farm 2",
        description: "The wild and crazy chicken is back in more animal winning fun with MONEY FARM 2 slot game. The 5 reel – 25 pay line game it’s bringing lots of wild farm filled action during its unique bonus feature where you can play on up to four reel sets simultaneously. Win the bonus feature with three or more Egg symbols or just randomly after every spin. You are awarded 12 free spins that start playing on two reel sets simultaneously.",
        image: "https://cdn.softswiss.net/i/s3/gameart/MoneyFarmTwo.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:ElToreo": {
        title: "El Toreo",
        description: "The gentle sound of the Spanish guitar is heard by the audience and a fragrant smell of roses is present in the air. The tension is building, as the raging bull looks at you in the eye. The crowd goes crazy as you almost get hit, but here you are “El Toreo”!",
        image: "https://cdn.softswiss.net/i/s3/gameart/ElToreo.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:AliBabasRiches": {
        title: "Ali Baba's Riches",
        description: "Immerse yourself in a thrilling world of thieves, treachery and treasure, in Ali Baba's Riches from GameArt!This unique retelling of the most famous of all the Arabian Nights tales gives everyone the chance to followin Ali Baba's to riches footsteps.Bursting with jewelled splendour and neon hues, this highly volatile slot is rich with special features. Mediumand high-paying symbols can land as either 2x2 or 3x3 BLOCKS on any of the reels, with empty spacescreated by CASCADE WINS crushed by blocks to fill the voids. Each consecutive cascade in the base gameawards 1 lantern, and when at least 5 have been collected the BABA BONUS is triggered. In this specialfeature up to 12 lanterns can be selected, with purple lanterns awarding CASH PRIZES, blue lanternsincreasing the win MULTIPLIER - which multiplies any cash prizes won in the Baba Bonus, and is carried overto Free Spins - and red lanterns awarding FREE SPINS. During free spins, blocks will participate in multiplewins before being destroyed. WILDS take the form of a beautiful princess, with STACKED WILDS appearingas 1x3 symbols, and any sections that participate in wins being destroyed, while the remaining sectionbreaking into smaller Wilds.Are you ready for the ultimate Arabian adventure?",
        image: "https://cdn.softswiss.net/i/s3/gameart/AliBabasRiches.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:BurningFlame": {
        title: "Burning Flame",
        description: "Feel the heat, with lots of HOT action in store with the BURNING FLAME slots game. This 5 reel – 5 pay line game is rich with classic slot game symbols like various fruit and 7’s and provides constant fast spin & win action.",
        image: "https://cdn.softswiss.net/i/s3/gameart/BurningFlame.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:DaVinciCodex": {
        title: "DaVinci Codex",
        description: "Enter the dark and sometimes mysterious world of Leonardo DaVinci’s greatest inventions and unlock the cryptex to reveal the elusive secret code that will help you win big and conquer in the DAVINCI CODEX slot game. The 5 reel – 100 pay line game offers plenty of wins with the alluring Mona Lisa stacked symbols on a true renaissance cryptex. Enter the bonus feature by spelling VINCI across all 5 reels – you unlock the cryptex and you will be awarded 6 free spins where all the symbols involved in spelling VINCI will morph into Wax Seal symbol and turn WILD for the duration of the free spins bonus feature.",
        image: "https://cdn.softswiss.net/i/s3/gameart/DaVinciCodex.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:ExplosiveReels": {
        title: "Explosive Reels",
        description: "Gold Rush Fever has struck as you become the gold prospector ready find the mother-lode to blow up entire reels to dig out and strike massive wins. EXPLOSIVE REELS is a 10 pay line slot game with funny characters ready to provide you with gold bonanza big wins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/ExplosiveReels.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:HotFruitDelights": {
        title: "Hot Fruit Delights",
        description: "Hot Fruit Delights is a classic 5x3 reel slot with 5 paylines in which fruits burst into flames when a win occurs. To win, players must match symbols on the paylines",
        image: "https://cdn.softswiss.net/i/s3/gameart/HotFruitDelights.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:LuckyBabies": {
        title: "Lucky Babies",
        description: "Get in the festival of winning celebrations with fireworks in this amazing mystic Asian themed LUCKY BABIES 5 reel – 20 pay line slot game. You can win 8 free spins when 3, 4 or 5 Fireworks symbols land beginning on the first leftmost reel, from left to right on adjacent reels. During the free spins the four LUCKY BABIES symbol turn WILD and substitute for Temple symbol in winning combinations. Bonus feature can be retriggered during the free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/LuckyBabies.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:NornsFate": {
        title: "Norn's Fate",
        description: "Dare you seek the wisdom of the most powerful beings in the Viking world? Norns' Fate from GameArt is a 6-reel, 30-payline slot that will transport you to a mythical world of Nordic legends and runes, where your fate will be decided by the beautiful, all-knowing Norns. Are you ready to discover your fate?",
        image: "https://cdn.softswiss.net/i/s3/gameart/NornsFate.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:NefertitiHyperways": {
        title: "Nefertiti Hyperways",
        description: "HyperWays™ is GameArt’s revolutionary game mechanic that permits each symbol to land with up to a 9x Symbol Multiplier, giving a maximum potential of 60,466,176\r\nHyperWays™ to win. This insane number of ways to win\r\nis achieved on a standard 5x4 reel. Since every symbol\r\nhas a ‘unique’ symbol multiplier of up to 9x, HyperWays™ can simulate up to the equivalent of 36 symbols\r\non a single 4-tall-reel! With this method, we can achieve\r\nthe workings of 60,466,176 ways in a small game area,\r\nmaking this slot one of the highest ways-to-win slots\r\never.",
        image: "https://cdn.softswiss.net/i/s3/gameart/NefertitiHyperways.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:ApocalypseQuest": {
        title: "Apocalypse Quest",
        description: "A unique blend of steampunk and post-apocalyptic dystopian road warrior adventure, this fully-loaded game features heavily-armed battle buggies, badass bikes, and beastly big rigs! Run into six or more Hero symbols and you'll trigger Apocalypse Respins. You're not alone on the dusty highways though, because there's a beautiful female road warrior. She can award you Free Spins, with all the minor symbols removed.",
        image: "https://cdn.softswiss.net/i/s3/gameart/ApocalypseQuest.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:Caligula": {
        title: "Caligula",
        description: "CALIGULA was one of Rome’s most iconic and notorious Emperors and you are invited to a Roman-themed party with the CALIGULA slot game. This 5 reel – 10 pay line slot game will keep you in suspense during the free spins. Three scattered Roman Red Centurions will award you the bonus feature. Free spins start with the Blue Centurion appearing on the reel number 5 and revealing the Roman number that pushes you to advance on the multiplier scale where all the wins are multiplied up to the maximum of 12 times the win. The bonus feature ends when you reach the end mark at the end of the scale.",
        image: "https://cdn.softswiss.net/i/s3/gameart/Caligula.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:DawnofOlympus": {
        title: "Dawn of Olympus",
        description: "Venture onto the sacred mountain and walk among legendary gods from the world of ancient Greece in Dawn of Olympus, new from GameArt! Featuring legendary characters like Zeus, Athena, Gaia and Chronos, beautiful animated graphics, and packed with Free Spins and a Jackpot bonus game, this is an adventure you'll never forget.",
        image: "https://cdn.softswiss.net/i/s3/gameart/DawnofOlympus.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:FlamingReels": {
        title: "Flaming Reels",
        description: "Welcome to the fire station! Today you are faced with a 25 Payline Inferno that needs to be put out! This brand-new slot from GameArt is packed with features such as FREESPINS,triggered by the BONUS symbol and awarding9, 12 or 15 FREESPIN!!! If two reels from reel 1, 2 or 3 have stacked symbols, you will trigger the SECOND CHANCE feature and the reels will become engulfed in flames!Worry not! As the reels are burning a chopper will extinguish them and grant you more possibilities to win amazing payouts as the reel is transformed into a random stack of symbols available in the game. With lady fortune onyour side you will be able to stack all 5 reels with the same symbol for they will all burn and trigger the payout across all reels for the given stacked symbol! The Slot is subject to Wild symbols as well of course, so keep aneye out for those HOT combinations.",
        image: "https://cdn.softswiss.net/i/s3/gameart/FlamingReels.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:JadeTreasure": {
        title: "Jade Treasure",
        description: "Unlock the vibrant imperial jade and its mystic power with JADE TREASURE and peruse the spiritual greatness of this Oriental mineral. A 5 reel - 25 pay line slot game with astonishing graphics and sounds is ready to engage you with its frequent bonus feature, where 3, 4 or 5 scattered Bat symbols lead you to the bonus feature. During the bonus screen, the jade chamber will determine the number of free spins and symbols that will turn into jade and act as wild during the free spins feature. Bonus feature can be retriggered during free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/JadeTreasure.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:SantasFactory": {
        title: "Santa's Factory",
        description: "SANTA'S FACTORY is a 7x7 cascading reel slot game with lots of visual effects and exciting festive features, including four SANTA’S BOX FEATURES, SANTA’S BONUS, TOTAL WIN MULTIPLIERS, SUPER SIZED SYMBOLS, RANDOM GIFTS, and a GIFT RETURN.",
        image: "https://cdn.softswiss.net/i/s3/gameart/SantasFactory.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:LuckyCoins": {
        title: "Lucky Coins",
        description: "You'll be captivated by this exotic 5-reel, 25-payline slot, adorned with glorious oriental treasures and exciting surprises! Expect the fearsome serpent water dragon to appear as a Wild, Lucky Coins and Scatter - which is koi fish in the shape of yin and yang.During Free Spins, reels 2, 3 and 4 spin together as Gigantic symbols! Hit a Gigantic Scatter and you'll get an additional 3 Free Spins, with no limits to retriggers!YouвЂ™ll also meet mystically exotic symbols like Fu dogs, lucky cats, turtles and three-legged frogs.Prepare for an eastern adventure you'll never forget!",
        image: "https://cdn.softswiss.net/i/s3/gameart/LuckyCoins.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:AutomaticRoulette": {
        title: "Automatic Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/AutomaticRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/gameart:ChiliQuest": {
        title: "Chili Quest",
        description: "Grab a tequila because it's time for Chili Quest, from GameArt! If you like things spicy this is the game for you, packed with bright colours and Mexican charm. From a beautiful flamenco dancer and bright pinata to the local donkey, this 5-reel slot is a real fiesta! Meet a sombrero-wearing sugar skull Wild that substitutes for any symbol except the Spicy Pepper and Scatter which is a guitar-playing cactus, 3 of which will reward you with 6 Free Spins. In Free Spins reels 3, 4 and 5 can merge to spin together as one Gigantic Symbol, rewarding an additional 3 Free Spins, with no trigger limit!But all that's just for starters, because 6 or more Spicy Pepper symbols trigger the Spicy Peppers Respins feature. After paying winning lines, other symbols fade away leaving empty spaces, with only the Spicy Peppers staying for the Respin. Each new Spicy Pepper resets the Respins at 3, and each symbol displays a value, Mini or Major Jackpot. If all the reels fill before Respins run out, a Mega Jackpot is awarded!And, of course there's an all or nothing red or black card gamble feature, allowing you to double your winnings up to five times.Now that's what we call a spicy slot!",
        image: "https://cdn.softswiss.net/i/s3/gameart/ChiliQuest.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:OracleCasinoRoulette360": {
        title: "Oracle Casino Roulette 360",
        image: "https://cdn.softswiss.net/i/s3/ezugi/OracleCasinoRoulette360.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/gameart:DragonLady": {
        title: "Dragon Lady",
        description: "Everyone wants to own and tame the dragons and with the help of DRAGON LADY, you can feel the power and excitement. The 5 reel – 10 pay line game takes you in the dragon’s era and provides a lot of excitement with the Dragon Lady stacked wild symbols awarding big winnings. RESPIN feature: When a stack of WILD symbols appears covering entire reel 2, 3 or 4 the RESPIN feature is triggered.",
        image: "https://cdn.softswiss.net/i/s3/gameart/DragonLady.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:FortuneTigerHyperWays": {
        title: "Fortune Tiger HyperWays",
        description: "Fortune Tiger HyperWays™ is a high-volatility, cascading 5x4-reel slot game that offers players the chance to\r\nwin up to 15,000x their bet, and up to 60,466,176 ways to win via the HyperWays™ mechanic. Each spin\r\nawards a different-ways-to-win combination depending on the total symbol multipliers (up to x9) that land\r\non each symbol. Wins are attained by landing identical symbols on three or more consecutive reels, counted\r\nfrom left to right, and landing multiple symbols on that reel multiplies that win. Simultaneous wins on\r\ndifferent win-ways are summed up. ",
        image: "https://cdn.softswiss.net/i/s3/gameart/FortuneTigerHyperWays.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:KingOfMonkeys": {
        title: "King Of Monkeys",
        description: "From the mountain of flowers and fruit to the distant lands of Gandara we invite you to join the mighty king of monkeys Sun Wukong and his companions Tang Sanzang, ZhuWuneng and Shā Wùjìng on their quest for the sacred scrolls!",
        image: "https://cdn.softswiss.net/i/s3/gameart/KingOfMonkeys.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/bsg:European_Blackjack_Sp": {
        title: "European Blackjack Sp",
        image: "https://cdn.softswiss.net/i/s3/bsg/European_Blackjack_Sp.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/gameart:ChineseZodiac": {
        title: "Chinese Zodiac",
        description: "Are you following us! What is your fortune symbol, what is your element of luck? Take a spin in an amazing 5-reel 25 pay lines, feature filled game of destiny! This is unlike any other game that you will ever play. We wanted your gameplay to be something special, so the features in this game are insanely fun. As the 12 creatures of the Chinese Zodiac are mixed in the pool of pay lines be sure to check out the SECOND CHANCE STACKS FEATURE and open the doors for the animal symbols wheel and let it spin! The dragon roams WILD on the pay lines, completing your combinations with insane wins. The tiger though is always watching, waiting to award your 9, 12 or 15 insane FREESPINS!Follow your fortune!",
        image: "https://cdn.softswiss.net/i/s3/gameart/ChineseZodiac.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:DragonWhisperer": {
        title: "Dragon Whisperer",
        description: "Enter a world of fearsome flying beasts in Dragon Whisperer from GameArt! This 5-reel, 25-payline slot is sure to captivate! Meet the brave Dragon Whisperer as she spins as a Scatter, with 3, 4, or 5 triggering 10 Free Spins in which you can win up to 5,000 times your bet! There are 3 types of Free Spin, with the one used decided with the special Free Spins Wheel. Earth Dragon flies over the reels, collecting Wilds вЂ“ which are the dragon eggs symbol. If he gets 3 or more, he'll randomly drop them back on the reels during the next spin! Fire Dragon flies over the reels, burning Wilds so they move one symbol higher for the next spin. Ice Dragon flies over the reels freezing Wilds in place for the remaining spins. Every spin also features a Bonus Reel. Wins from each spin are subject to the multiplier on the Bonus Reel from 1 to 10 in the base game, from 1 to 10 with 20x in the Free Spins. The Wild symbol is also on the Bonus Reel during the base game - dragons awarding 1 to 3 random Wilds, and a 3x multiplier to the total win. Of course, thereвЂ™s also a red or black card gamble feature, allowing winnings to be gambled up to 5 times.",
        image: "https://cdn.softswiss.net/i/s3/gameart/DragonWhisperer.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:GoldenDragon": {
        title: "Golden Dragon",
        description: "The supreme, majestic, benevolent GOLDEN DRAGON is ready to offer lots of ripping fire breathing fun with every spin with on its 50 pay lines and frequent wild stacked symbols awarding fiery big wins. The bonus feature is triggered with three scattered Ingot symbols in any position on reels 2, 3 and 4 awarding 5 free spins, with additional stacked dragons on bonus reels. The Dragon Bonus feature can be retriggered during free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/GoldenDragon.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:KingofMonkeys2": {
        title: "King of Monkeys 2",
        description: "The adventure of the King of Monkeys Sun Wukong and his companions Tang Sanzang, Zhu Wuneng and Shā Wùjìng continues in the slot game King of Monkeys 2.",
        image: "https://cdn.softswiss.net/i/s3/gameart/KingofMonkeys2.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:MariachiFiesta": {
        title: "Mariachi Fiesta",
        description: "It's time to party Mexican-style in Mariachi Fiesta, from GameArt! So, grab your maracas, don your sombrero and get ready to win!",
        image: "https://cdn.softswiss.net/i/s3/gameart/MariachiFiesta.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:PhoenixPrincess": {
        title: "Phoenix Princess",
        description: "The beautiful princess and the mighty power of the phoenix’s flame will regenerate and boost your wins in this amazing oriental PHOENIX PRINCESS 5 reel – 20 pay line slot game. You can win 8 free spins when 3, 4 or 5 Phoenix symbols land beginning on the first leftmost reel, from left to right on adjacent reels. During the free spins Princess, Palace, Vase and Flower symbol turn WILD and substitute for Jing-Jang symbol in winning combinations. Land the required scatter bonus symbols while your free spins lay out and you’ll score yourself another batch of free spins to play with!",
        image: "https://cdn.softswiss.net/i/s3/gameart/PhoenixPrincess.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:SlotofMoney": {
        title: "Slot of Money",
        description: "Some people try to lead an easy life in the comfort of their home and in the conformity of the mundane! But if you are not one of these people and want to lead a life of excitementand glamour, filled with adventure, shocking beauty and blissful glasses of the finest wine, follow the man himself to get rich in the SLOT OF MONEY!",
        image: "https://cdn.softswiss.net/i/s3/gameart/SlotofMoney.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:RouletteGold2": {
        title: "Roulette Gold 2",
        image: "https://cdn.softswiss.net/i/s3/ezugi/RouletteGold2.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/gameart:HawaiianChristmas": {
        title: "Hawaiian Christmas",
        description: "Dreaming of a white Christmas? Well, you've never seen one quite like this! Join Tiki on the beach for aHawaiian Christmas, any time of the year, with GameArt.The coconuts, dragon fruits, guavas, pineapples and lychees might be frozen, but they're still delicious, andwhen you match at least 5 adjacent symbols, horizontally or vertically, the winning CLUSTERS will explodeallowing the remaining symbols to cascade into the spaces, creating plenty of chances to win. Look out forthe Christmas wreath WILDS, because they substitute for all symbols, and contribute to winning clusters.When a WILD has contributed to a win, it will move to a random adjacent vacant position before thefollowing collapse, and its multiplier is increased by 1x. Tiki will also add to the fun by randomly poppingpineapples, coconuts and lychees in the base game, leading to even more cascades and wins",
        image: "https://cdn.softswiss.net/i/s3/gameart/HawaiianChristmas.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:KittyTwins": {
        title: "Kitty Twins",
        description: "They’re cute, loveable, fluffy and purring with big wins, so let’s play some cute kitty love in the form of big wins in the KITTY TWINS slot game. The 5 reels – 20 pay line game offers a lot of fun with its kitty characters combined with the Magic Paw symbol that appears on 2nd reel and reveals randomly a symbol. Win 50, 20, 10 or 5 free spins with 5, 4, 3, 2 Kitty symbols appear, beginning from the leftmost reel, from left to right on adjacent reels.",
        image: "https://cdn.softswiss.net/i/s3/gameart/KittyTwins.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:MoneyFarm": {
        title: "Money Farm",
        description: "Who says money doesn’t grow on trees? Own your private MONEY FARM by playing this exciting HIGH ROLLER game! HUGE WINS are being cultivated in this money fest for you when you play this 5 reel – 5 pay line slot game with the CHICKEN nesting GOLDEN EGGS all over the reels.",
        image: "https://cdn.softswiss.net/i/s3/gameart/MoneyFarm.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:PiggyHolmes": {
        title: "Piggy Holmes",
        description: "Discover who’s been lying with Piggy Holmes, the debut game in the Piggy Who! series from GameArt.",
        image: "https://cdn.softswiss.net/i/s3/gameart/PiggyHolmes.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:SpookyGraves": {
        title: "Spooky Graves",
        description: "The mist is rising, the smell of blood thickening. Vampires are emerging from their graves, ready to feast on human blood.\r\n\r\nWe’re celebrating this Halloween with a spooky party in this 5x3-reel slot game with 25 paylines where landing 3+ SCATTERS (Bonus symbols) in the base game triggers the GRAVE DIGGER BONUS round. Many Halloween treats await you here.\r\n\r\nYou can expect rewards such as +1 FREE SPINS up to a maximum of 10 and up to three symbols that act as WILDS in Free Spins. The Wilds display at the top right of the game shows which symbols are acting as Wilds so there’s no mystery surrounding that. Wilds substitute all symbols except Bonus Game symbols (Scatters).\r\n\r\nOnce you’re in Free Spins, landing 3+ Bonus Game symbols awards a retrigger of the Grave Digger Bonus game. Each Grave Digger Bonus retrigger is played after the current Free Spin has been completed.\r\n\r\nSpooky Graves also comes with a GAMBLE FEATURE in which winnings can be gambled up to five times.\r\n\r\nA spooky party is unfolding in the graveyard, with all kinds of zombies in attendance. Will you dare to join?",
        image: "https://cdn.softswiss.net/i/s3/gameart/SpookyGraves.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:VideoPoker": {
        title: "Video Poker",
        description: "Video Poker (Jacks or Better) is played with the aim of forming a winning combination with a five-card poker hand. The higher the player hand, the more winnings paid. The player can replace the cards once per round to try to get a better hand.",
        image: "https://cdn.softswiss.net/i/s3/gameart/VideoPoker.png",
        keywords: "wallfair, crypto, casino, poker, gameart, gameart"
    },
    "/softswiss-game/ezugi:BaccaratLobby": {
        title: "Baccarat Lobby",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BaccaratLobby.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/gameart:FortunePanda": {
        title: "Fortune Panda",
        description: "Who doesn’t love the Panda, one of the cutest and cuddliest bears of Mother Nature and in the case of FORTUNE PANDA slot game also the luckiest animals around. The 5 reel – 50 pay line slot game offers 10 free spins triggered by the three Jing Jang symbols landing on reels 1, 2 and 3 simultaneously. During the free spins any gorgeous Panda appearing on reels stays locked in that position until the end of free spins and substitutes for all symbols except scatters. And just for added measure, an additional five free spins can be won during the free spins bonus round, simply by landing another set of scatter symbols!",
        image: "https://cdn.softswiss.net/i/s3/gameart/FortunePanda.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:JumpinPot": {
        title: "Jumpin Pot",
        description: "Trip the light fantastic with the Luck of the Irish and catch your personal and sometimes naughty Irish Leprechaun that helps you find a JUMPIN’ POT that’s rich beyond your wildest dreams and full of gold. This 5 reel – 25 pay line slot game offers plenty of excitement during its bonus feature. 10 free spins are won with any 5, 4 or 3 scattered Clover symbols.",
        image: "https://cdn.softswiss.net/i/s3/gameart/JumpinPot.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:MagicUnicorn": {
        title: "Magic Unicorn",
        description: "Enter the enchanted world of the MAGIC UNICORN with the power of its wild multipliers during free spins. A 5 reels – 243 win ways slot game offers the player the bonus feature where 20, 15 or 10 free spins are awarded with 5, 4 or 3 Moon symbols on adjacent reels from the leftmost reel. During free spins if a Unicorn substitutes in a win on reel 2, the win is multiplied x3 or on reel 4 the win is multiplied x5. If a Unicorn substitutes in a win on both reels 2 and 4, the win is multiplied x15. And as always, landing a series of bonus symbols during the free spins round will land you another set of free spins to play with!",
        image: "https://cdn.softswiss.net/i/s3/gameart/MagicUnicorn.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:NightatKTV": {
        title: "Night at KTV",
        description: "GameArt is thrilled to introduce Night at KTV - a sexy new karaoke-themed slot. A richly atmospheric slot complete with glamorous hostesses, bright lights and top-line drinks, it sees players leaving their inhibitions at the door as they take centre stage for a night of singing and dancing. Featuring stunning visuals, engaging gameplay and a great soundtrack, Night at KTV is sure to be a hit with players! With 5 reels, 15 paylines, and extra features like exploding winnings symbols, cascading combos, and a bonus \"One & Six\" dice game, this slot is something special. DonвЂ™t miss this opportunity tap into one of AsiaвЂ™s most popular forms of entertainment and offer your players one of the most glamorous games on the market.",
        image: "https://cdn.softswiss.net/i/s3/gameart/NightatKTV.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:RoyalGems": {
        title: "Royal Gems",
        description: "Kings, Queens and Princes and Princess themselves would covet ROYAL GEMS to be their favourite Royalty game of the nobility. The 5 reel – 10 pay line games is full of stacked precious gold and gems symbols making the stage for the royal crown. The symbols pay on played line in the adjacent pays form - left to right, right to left or in the middle of the reel set. Any combination of a kind (3, 4 or 5) awards big wins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/RoyalGems.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:SushiYatta": {
        title: "Sushi Yatta",
        description: "Sushi lovers, get ready to indulge! Take your seats at the sushi bar and marvel at the tempting choice of nigiri and sashimi.",
        image: "https://cdn.softswiss.net/i/s3/gameart/SushiYatta.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:TexasRangersReward": {
        title: "Texas Rangers Reward",
        description: "Get your daily dose of rootin-tootin Cowboy Wild West action and adventure by playing TEXAS RANGER’S REWARD slot game. The 5 reel – 20 pay line game is all about wild experience chasing stacked wild symbols that can award big prizes. 10 Free Spins are triggered by any 3 or more scatter symbols. During the Free Spins when Gols Star wild symbol substitutes in a line win on reel 2, the win is multiplied by X2 or X4 as displayed on the reel.",
        image: "https://cdn.softswiss.net/i/s3/gameart/TexasRangersReward.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:KingOfWealth": {
        title: "King Of Wealth",
        description: "The amazing and luxuriant graphical design and the finest attention to detail for this Chinese themed slot game will ensure the highest player engagement and experience. KING OF WEALTH is a 5 reel – 243 win ways slot game and its 3, 4 or 5 scattered Coin symbols trigger the bonus feature. In the 2nd bonus screen, you need to select the number of free spins by picking the Coin symbols. During the free spins KING OF WEALTH wild symbol awards additional bonus prizes when substituting. It’s also possible to trigger additional free spins during the bonus round, simply by landing the required scatter symbols in any positions on the reels!",
        image: "https://cdn.softswiss.net/i/s3/gameart/KingOfWealth.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:Hollywoof": {
        title: "Hollywoof",
        description: "Revel in the glamourous world of Hollywoof’s famous dog personalities. Figure out who’s who while taking\r\nadvantage of Hollywoof’s prized dog bone wild multiplier treats and diamond collar scatters.\r\nHollywoof is a 5x3 reel slot with 10 paylines. In the base game, WILDS carry multipliers of up to 5x and\r\nadd when part of the same win line. They substitute all symbols except Scatters. Your aim is to land three\r\nSCATTERS and over to trigger up to 15 FREE SPINS.\r\nBut that’s not all! Additional Scatters in Free Spins award even more re-spins up to a woofing 100 Free\r\nSpins. And for that extra something special, we’ve added a RANDOM SYMBOL SUPER STACKS feature in\r\nFree Spins to propel you on your road to stardom.\r\nPick your best pup and hold on tight to those diamond collar scatters. You’ll see that these pups aren’t\r\nyour regular sidekick. They’re the iconic stars of Hollywoof, here to pimp up your ride to fame. So, rev up\r\nyour Cadillacs and Bentleys and get set for a fun ride. ",
        image: "https://cdn.softswiss.net/i/s3/gameart/Hollywoof.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:LillyPalmerLondon": {
        title: "Lilly Palmer London",
        description: "Party alert! Lilly Palmer is now live in London, behind the decks for multiple evenings in a row. This tour promises insanely spectacular evenings with some of her biggest hits, so gear up for some powerful, impulsive tech sounds with electrifying basslines",
        image: "https://cdn.softswiss.net/i/s3/gameart/LillyPalmerLondon.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:MonkeyPirates": {
        title: "Monkey Pirates",
        description: "It’s time to take to the high seas with a motley crew of primates in Monkey Pirates from GameArt! Enjoy swashbuckling spinning as you find your sea legs among messages in bottles, compasses, treasure maps and pistols, as the orangutan captain and crew of mandrills and squirrel monkeys keep the boat shipshape.",
        image: "https://cdn.softswiss.net/i/s3/gameart/MonkeyPirates.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:QueenofTheSeas": {
        title: "Queen Of The Seas",
        description: "Do you have what it takes to join the heroine of heroines on an epic seafaring adventure? The QUEEN OF THE SEAS bids you welcome to this 5 reel – 20 payline treasure hunt. Ahoy me hearties! Plunder the seven seas in this swashbuckler action packed game! Remember to look for the treasure as all pirates do! You may get 3, 4 or 5 Treasure chests on your adventures!",
        image: "https://cdn.softswiss.net/i/s3/gameart/QueenofTheSeas.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:StormingFlame": {
        title: "Storming Flame",
        description: "Storm the light fantastic, with one of Mother Nature’s most powerful elementary forces, awaits players looking for lots of LIGHTING action in the STORMING FLAME game. This 5 reel – 5 pay line game is rich with classic slot game symbols like various fruit and 7’s and provides constant and lighting fast spin & storming win action. To fire up the action, four feature symbols (CHERRY, GRAPES, LEMONS and PLUM) pay extra: 15 of a kind on reels 1,2,3,4 and 5 multiplies total game win by 5, 12 of a kind on reels 1,2,3 and 4 multiplies total game win by 4, 9 of a kind on reels 1,2 and 3 multiplies total game win by 3!",
        image: "https://cdn.softswiss.net/i/s3/gameart/StormingFlame.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:WildWildQuest": {
        title: "Wild Wild Quest",
        description: "Get ready for gunslinging action in Wild Wild Quest from GameArt! The Bandit has swaggered into town, and he’s got a bounty on his head – can you help the Sheriff put him behind bars?",
        image: "https://cdn.softswiss.net/i/s3/gameart/WildWildQuest.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:BlackjackLobby": {
        title: "Blackjack Lobby",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BlackjackLobby.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/gameart:JoanofArc": {
        title: "Joan of Arc",
        description: "We have a helpless romantic attitude towards our past. As history unfolded across the globe, heroes rose and fell. Some to be remembered and some to be forgotten by the violent waves of passing ages and citizens of the cultures in the world. We do remember her! She was martyr and a fierce warrior and most certainly, one of the most awe inspiring characters to have ever walked the earth. We humbly present to you Joan of Arc.Be sure to fight your way in the ranks of The Maid of Orleans in this 243 way historical game of honour and luck! We present to you our newest system of Expand & split. This feature will randomly replace and split symbols on the wheels as the symbols with arrow borders will expand when triggered by scatter symbols. Note that the Scatters are triggered by 3 or more scattering arrows of fire on any position, awarding 10 freespins that can of course be retriggered with holy fury! If you feel like fighting for a higher win with our heroine, be sure to enabled the gamble feature to have the possibility to double your wins!Aim high with those flaming arrows!This is a game of historical magnitude that is going to give you countless hours of lucky wins and charging free spins. Join the ranks of the Maid of Orleans and lay a siege of success and glory in the game of Joan of Arc, never to be forgotten!",
        image: "https://cdn.softswiss.net/i/s3/gameart/JoanofArc.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:MagicDragon": {
        title: "Magic Dragon",
        description: "Chase fame and fortune in form of the wildest of wild dragons which is the key symbol for the exhilarating MAGIC DRAGON slot game. With its 5 reel – 243 win ways and a player selectable bonus feature it is a player satisfaction guarantee of magical dragon proportions. Win the bonus feature with any three of more Coin symbols from the leftmost reel to right.",
        image: "https://cdn.softswiss.net/i/s3/gameart/MagicDragon.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:NefertitisNile": {
        title: "Nefertiti's Nile",
        description: "Journey through the sands of time to ancient Egypt's 18th Dynasty in Nefertiti's Nile, from GameArt! Join the beautiful queen on the banks of the mighty river as she battles to rid the land of the deceitful gods of old, and unite the people under the one true Sun god.",
        image: "https://cdn.softswiss.net/i/s3/gameart/NefertitisNile.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:Roulette": {
        title: "Roulette",
        description: "European Roulette is a classic Roulette game with 37 slots numbered 0-36. Players can bet directly on the Classic Table Layout or else opt for the Track Layout.",
        image: "https://cdn.softswiss.net/i/s3/gameart/Roulette.png",
        keywords: "wallfair, crypto, casino, roulette, gameart, gameart"
    },
    "/softswiss-game/gameart:SuperHeatedSevens": {
        title: "Super Heated Sevens",
        description: "Super Heated Sevens is a classic 5x3 reel slot\r\nwith 20 paylines that burst into flames when a\r\nwin occurs. To win, players must match symbols\r\non the paylines",
        image: "https://cdn.softswiss.net/i/s3/gameart/SuperHeatedSevens.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:BlackjackGold4": {
        title: "Blackjack Gold 4",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BlackjackGold4.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:DiamondRoulette": {
        title: "Diamond Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/DiamondRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:MerengueBlackjack2": {
        title: "Merengue Blackjack 2",
        image: "https://cdn.softswiss.net/i/s3/ezugi/MerengueBlackjack2.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:RouletteGold3": {
        title: "Roulette Gold 3",
        image: "https://cdn.softswiss.net/i/s3/ezugi/RouletteGold3.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/gameart:MegaBunnyHyperways": {
        title: "Mega Bunny Hyperways",
        description: "It’s time to swing down to the quaint old farmyard and meet Mega Bunny, the star of the new HyperWays™ slot by GameArt. So get your country boots tapping and grab your egg baskets to collect some eggs made from silver, gold, and diamonds!",
        image: "https://cdn.softswiss.net/i/s3/gameart/MegaBunnyHyperways.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:PiggyBjornMuspelheimsTreasure": {
        title: "Piggy Bjorn - Muspelheim's Treasure",
        description: "Grab your arms ‘n’ armour and enter the era of Vikings with Piggy Bjorn. Then help him battle it out with the Fire Giant Surtr in the fiery realm of Muspelheim where you can claim huge multipliers and be the richest of all in the land!",
        image: "https://cdn.softswiss.net/i/s3/gameart/PiggyBjornMuspelheimsTreasure.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:SpartansLegacy": {
        title: "Spartans Legacy",
        description: "There was once a band of fierce warriors known from the Aegan to the Ionian sea. Their skill unmatched by any foe, their tactics flawless and their spirit unscathed. Now their legacy is known worldwide, now you can join them!",
        image: "https://cdn.softswiss.net/i/s3/gameart/SpartansLegacy.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:Venetia": {
        title: "Venetia",
        description: "This beautiful, unique city of Northern Italian with its unique history and fashion takes you into the romantic and nostalgic world of VENETIA. The game provides a 5 reel - 20 pay line games offers the bonus feature that is triggered by 3, 4 or 5 scattered Venetian Mask symbols awarding 15 free spins. All wins during the free spins are multiplied THREE times. Bonus feature can be retriggered during the free spins with big probability of bonus feature retrigger.",
        image: "https://cdn.softswiss.net/i/s3/gameart/Venetia.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:AndarBaharLobby": {
        title: "Andar Bahar Lobby",
        image: "https://cdn.softswiss.net/i/s3/ezugi/AndarBaharLobby.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:Blackjack7": {
        title: "Blackjack 7",
        image: "https://cdn.softswiss.net/i/s3/ezugi/Blackjack7.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:CumbiaRuleta1": {
        title: "Cumbia Ruleta 1",
        image: "https://cdn.softswiss.net/i/s3/ezugi/CumbiaRuleta1.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:MerengueBlackjack1": {
        title: "Merengue Blackjack 1",
        image: "https://cdn.softswiss.net/i/s3/ezugi/MerengueBlackjack1.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:SalsaBaccarat4": {
        title: "Salsa Baccarat 4",
        image: "https://cdn.softswiss.net/i/s3/ezugi/SalsaBaccarat4.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/gameart:MoreCash": {
        title: "More Cash",
        description: "Welcome to a true HIGH ROLLER GAME! Cash is King in this adrenalin pumping game and More Cash provides BIG WINS like no other game on its 15 pay lines! WILD WIN MULTIPLIER RULE: If a wild symbol participates in a winning combination (WILD WIN) anywhere on reels 2, 3 or 4, the WILD WIN is multiplied by its respective wild win reel multiplier. If more than one wild symbol on reels 2, 3 or 4 participates in a win, the respective wild win multipliers are summed and all wins with at least one wild symbol substituting are multiplied by the total multiplier shown in the top right corner. The WILD WIN multiplier is reset to zero after every spin. During the free spins the WILD WIN Multiplier is NOT reset to zero but it keeps incrementing with every spin if the WILD WIN Multiplier rule apply. The free spins can be retriggered during the feature with two adjacent WILD symbols on reels 2, 3 and 4 awarding additionally 5 free spins or with three WILD symbols on reels 2, 3 and 4 awarding additionally 10 free spins!",
        image: "https://cdn.softswiss.net/i/s3/gameart/MoreCash.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:RamsesTreasure": {
        title: "Ramses Treasure",
        description: "Welcome to the mysterious Egyptian world of RAMSES TREASURE. A 5 reel - 10 pay line slot game with astonishing graphics and sounds is ready to engage you with its frequent bonus, where 3, 4 or 5 scattered Golden Chest symbols lead you to the bonus feature. During the bonus screen, the Golden Chest will determine the number of free spins and symbols that will turn gold and act as wild during the free spins feature. Bonus feature can be retriggered during free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/RamsesTreasure.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:SummerJam": {
        title: "Summer Jam",
        description: "Put on your best party wear, grab some drinks, and dance the night away to blood-pumping, summer beats in GameArt’s SUMMER JAM.",
        image: "https://cdn.softswiss.net/i/s3/gameart/SummerJam.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:Tesla": {
        title: "Tesla",
        description: "Use the advantage of Nikola Tesla’s genius to help you score accelerating wins in the TESLA - SPARK OF GENIUS slot game. Test your genius and skill with this 5 reel – 243 win ways and a player selectable feature it is a player satisfaction guarantee. Win the bonus feature with any three of more AC Motor symbols from the leftmost reel to right. In the bonus, screen select the number of free spins and its three different multipliers.",
        image: "https://cdn.softswiss.net/i/s3/gameart/Tesla.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:XtremeHot": {
        title: "Xtreme Hot",
        description: "There’s no chance of cooling down in Xtreme Hot, a classic 5x3 reel slot with 5 paylines in which fruits burst into flames when a win occurs. All wins are for combinations of adjacent symbols of a kind on played lines",
        image: "https://cdn.softswiss.net/i/s3/gameart/XtremeHot.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:BetOnNumbersLobby": {
        title: "Bet On Numbers Lobby",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BetOnNumbersLobby.png",
        keywords: "wallfair, crypto, casino, lottery, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:BlackjackSalonPrive": {
        title: "Blackjack Salon Prive",
        description: "Experience the luxury and exclusivity that  provides – enjoy a  higher-limit game of Blackjack at a сompletely private table, surrounded by  an elite environment!",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BlackjackSalonPrive.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:GoldenBaccaratKnockOut": {
        title: "Golden Baccarat Knock Out",
        image: "https://cdn.softswiss.net/i/s3/ezugi/GoldenBaccaratKnockOut.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/gameart:PowerDragon": {
        title: "Power Dragon",
        description: "Dragons bestow good fortune and combined with the lucky number 8 in form of the wild dragon is the key mystical power symbol for the POWER DRAGON slot game. With its 5 reel – 243 win ways and a player selectable feature it is a player satisfaction guarantee. Win the bonus feature with any three of more Coin symbols from the leftmost reel to right. In the bonus, screen select the number of free spins and its three different multipliers. During free spins, Red Pockets symbols appearing simultaneously anywhere on reel 1 and 5 pay an extra bonus prize of 2, 5, 10, 15 or 20 times total bet. It’s also possible to add more free spins to your tally, simply by landing the required number of scatter symbols while the bonus round plays out.",
        image: "https://cdn.softswiss.net/i/s3/gameart/PowerDragon.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:32Cards": {
        title: "32Cards OTT AB",
        image: "https://cdn.softswiss.net/i/s3/ezugi/32Cards.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/gameart:StarCash": {
        title: "Star Cash",
        description: "Reach for the celestial bodies with the universes starry of stars. Play STAR CASH, a 5 reel – 10 pay line game where new universal riches are waiting to be discovered! The pursuit of the unknown will reward you with lots of stacked money symbols and the excitement of the revealing the WILD STAR symbol. The WILD STAR symbol is WILD and substitutes for all symbols. If the STAR lands on the reels 2, 3 or 4 it expands on the entire reel and triggers the RE-SPIN. All reels containing STAR are held and all other reels are re-spinned once, up to a maximum of 3 re-spins. The game plays both ways; left to right and right to left.",
        image: "https://cdn.softswiss.net/i/s3/gameart/StarCash.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:WildDolphin": {
        title: "Wild Dolphin",
        description: "One of nature’s most intelligent mammals’, the Dolphin, take a deep dive into this beautifully designed waterscape environment with encaptivating graphics and immersive sounds takes you into the submarine world of WILD DOLPHIN. A 5 reel - 10 pay line game offers the bonus feature that is triggered by 3, 4 or 5 scattered Pearl symbols awarding 15 free spins. All wins during the free spins are multiplied THREE times. Bonus feature can be retriggered during the free spins – big probability of bonus feature retrigger.",
        image: "https://cdn.softswiss.net/i/s3/gameart/WildDolphin.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:AutomaticRoulette1": {
        title: "Prestige Auto Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/AutomaticRoulette1.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:BlackjackGold6": {
        title: "Blackjack Gold 6",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BlackjackGold6.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:FiestaRoulette": {
        title: "Fiesta Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/FiestaRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:OneDayTeenPattiClassic": {
        title: "One Day Teen Patti Classic",
        description: "Let your players experience the highs and lows of one day teen patti in this three card poker card game. \r\nBack the favourite or choose to go for the outsider, this sensationally tense and exciting game provides \r\nthe full exhilaration and emotion of surprise wins and bad beats! \r\nLike our original teen patti version, players get to choose between Player A and Player B but this game \r\npacks a punch. \r\nEzugi have introduced the back and lay functionality made famous in betting exchanges. Before each \r\ncard is drawn, odds change based on the current favourite hand allowing players time to observe, bet \r\nagain, change their mind by backing or laying the other side! It is possible for players to trade their way \r\nto a winning position no matter what the outcome!",
        image: "https://cdn.softswiss.net/i/s3/ezugi/OneDayTeenPattiClassic.png",
        keywords: "wallfair, crypto, casino, poker, ezugi, ezugi"
    },
    "/softswiss-game/gameart:RoshImmortality": {
        title: "Rosh Immortality Cube Megaways",
        description: "Get ready for brutal combat and insane wins in Rosh Immortality Cube Megaway - a dark journey toanother world, from GameArt.With an incredible 117,649 potential Megaways  to win, cascading symbols, and fully-loaded with extrasthis is our most explosive game yet. So, sharpen your blade and enter a world of forbidden magic, beautifulprincesses, fearsome dwarfs, vicious orcs, and unholy abominations.",
        image: "https://cdn.softswiss.net/i/s3/gameart/RoshImmortality.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:BetonTeenPatti": {
        title: "Bet on Teen Patti",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BetonTeenPatti.png",
        keywords: "wallfair, crypto, casino, poker, ezugi, ezugi"
    },
    "/softswiss-game/gameart:SantasFarm": {
        title: "Santa's Farm",
        description: "Win 5 free spins for each line where the CHICKEN substitutes a winning combination, and each GOLDEN EGG that appears during the free spins repeats the wild win that triggered the bonus features. The repeat wild win amount is displayed in the banner above the reels during the free spins and can be multiplied by up to 5 times for every free spin. Bonus feature can be retriggered during free spins.SANTAвЂ™S FARM is positively bursting with Christmas decorations and lights, the brightest colours and a feel-good cosy spirit thatвЂ™s sure to brighten even the darkest of winter evenings, making it an irresistible choice this festive season.",
        image: "https://cdn.softswiss.net/i/s3/gameart/SantasFarm.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/gameart:ThunderBird": {
        title: "Thunder Bird",
        description: "Face your fears with the mystic Native American spirits with THUNDER BIRD slot game. The 5 reel – 20 pay line game will keep you on thrills with is frequent flying and soaring WILD Eagle stack wins. Get three or more Thunder Bird feature scatter symbols in any position and you will be awarded 10 free spins where all the WILD Eagle symbols on reels 3, 4 and 5 become sticky and remain like that for the whole duration of free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/ThunderBird.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:AllStarsBlackjacktest": {
        title: "All Stars Blackjack 1",
        image: "https://cdn.softswiss.net/i/s3/ezugi/AllStarsBlackjacktest.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:Blackjack1": {
        title: "Blackjack 1",
        image: "https://cdn.softswiss.net/i/s3/ezugi/Blackjack1.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:CasinoHold": {
        title: "Casino Hold'em",
        image: "https://cdn.softswiss.net/i/s3/ezugi/CasinoHold.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:Lucky7": {
        title: "Lucky 7",
        image: "https://cdn.softswiss.net/i/s3/ezugi/Lucky7.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:OTTAndarBahar": {
        title: "OTT Andar Bahar",
        image: "https://cdn.softswiss.net/i/s3/ezugi/OTTAndarBahar.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:SpeedBaccaratCricket": {
        title: "Speed Baccarat - Cricket",
        image: "https://cdn.softswiss.net/i/s3/ezugi/SpeedBaccaratCricket.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:TurkceRulet": {
        title: "Turkce Rulet",
        image: "https://cdn.softswiss.net/i/s3/ezugi/TurkceRulet.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/gameart:ThreeKings": {
        title: "Three Kings",
        description: "Traditional Chinese empire welcomes you with the 3 KINGS slot game. The 5 reel - 15 pay line game offers constant and exhilarating action together with its wild Dragon and scatter rich Pearl symbols – both being the bonus feature triggers to heighten player engagement. The bonus feature is triggered if the Dragon symbol and/or a Pearl symbol appear on reels 1 and 5 simultaneously, awarding 15 free spins. During free spins a random multiplier (x2, x3, x5 or x10) is selected for each win. Bonus feature can be retriggered during the free spins.",
        image: "https://cdn.softswiss.net/i/s3/gameart/ThreeKings.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:SpeedRouletteJackpot": {
        title: "Speed Roulette Jackpot",
        image: "https://cdn.softswiss.net/i/s3/ezugi/SpeedRouletteJackpot.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/atmosphera:BetonPoker": {
        title: "Bet on Poker",
        image: "https://cdn.softswiss.net/i/s3/atmosphera/BetonPoker.png",
        keywords: "wallfair, crypto, casino, poker, atmosfera, atmosphera"
    },
    "/softswiss-game/belatra:20Bitstarz": {
        title: "20 Bitstarz",
        image: "https://cdn.softswiss.net/i/s3/belatra/20Bitstarz.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:Anotherland": {
        title: "Anotherland",
        description: "Somewhere in the Parallel Universe...\n\nWe know the theory in which we are not along in this world. There is an incredible multitude of other worlds in which everything is completely different from what we are used to. Perhaps in one of the parallel universe still live dinosaurs, in another - the immortal Gods live, and in the third - the fish fly in the sky... But we invite you today the most mysterious universe...",
        image: "https://cdn.softswiss.net/i/s3/belatra/Anotherland.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/gameart:TigerHeart": {
        title: "Tiger Heart",
        description: "The tiger is of nature’s most powerful cats. Hear and feel the beat of TIGER HEART to pump up your daily dose of adrenaline is this heart-stopping slot. The 5 reel – 10 pay line game delivers lots of big heart pumping wins with its stacked symbols feature. Win 8, 10 or 15 free spins with 3, 4 or 5 Tiger Heart symbols on any pay line with a maximum of 150 free spins. All wins during free spins are doubled. Bonus feature can be re-triggered during free spins. Welcome to one of the most powerful slots in the jungle!",
        image: "https://cdn.softswiss.net/i/s3/gameart/TigerHeart.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:AndarBahar": {
        title: "Andar Bahar",
        image: "https://cdn.softswiss.net/i/s3/ezugi/AndarBahar.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:Blackjack3": {
        title: "Blackjack 3",
        image: "https://cdn.softswiss.net/i/s3/ezugi/Blackjack3.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:CricketWar": {
        title: "Cricket War",
        image: "https://cdn.softswiss.net/i/s3/ezugi/CricketWar.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:BlackjackPlatinum1": {
        title: "Blackjack Platinum 1",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BlackjackPlatinum1.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:MamboUnlimitedBlackjack": {
        title: "Mambo Unlimited Blackjack",
        image: "https://cdn.softswiss.net/i/s3/ezugi/MamboUnlimitedBlackjack.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:PokerLobby": {
        title: "Poker Lobby",
        image: "https://cdn.softswiss.net/i/s3/ezugi/PokerLobby.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:SpeedRoulette": {
        title: "Speed Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/SpeedRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/bsg:AmericanBlackjack": {
        title: "American Blackjack",
        description: "Multideck Blackjack without sidebet",
        image: "https://cdn.softswiss.net/i/s3/bsg/AmericanBlackjack.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/ezugi:WhiteRussianBlackjack": {
        title: "White Russian Blackjack",
        image: "https://cdn.softswiss.net/i/s3/ezugi/WhiteRussianBlackjack.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/belatra:7DaysAnotherland": {
        title: "7 Days Anotherland",
        description: "Parallel worlds, thousands of universes that exist simultaneously with our reality - it may seem fascinating to one person and frightening to another one ... But one thing is clear: there are practically no indifferent people to these topics. You are also captured by stories that begin with the words: \"Somewhere in a parallel universe ...\", aren’t you? In this case, “Anotherland” video slot is specially for you! And the attraction “7 days” makes the game even more int",
        image: "https://cdn.softswiss.net/i/s3/belatra/7DaysAnotherland.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:BingoSoccer": {
        title: "Bingo Soccer",
        description: "Soccer is one of the most popular sports in the world. People play it in small yards and in huge stadiums, millions of fans watch soccer games in the stands, in sports bars or at home on TV. Plenty of bets are made every day – fans are trying to guess the score, the difference between the goals scored and missed and the time when a certain player may receive a red card ...\n\nYou also love soccer, but you don’t know which team to bet on? Don’t hesitate and choose “Bingo Soccer” from Belatra Games. There is no need to painfully choose what team to cheer for – just place your bet and try to catch the balls with the right numbers! Multilanguage of this online bingo will allow all the people in the world to enjoy this game - among 14 languages of the world everyone will find a suitable one. Besides, this slot also features a super jackpot “The Wheel of Fortune”, and if you decide to play the bingo game online, for free and without registration, you will get a great chance to w",
        image: "https://cdn.softswiss.net/i/s3/belatra/BingoSoccer.png",
        keywords: "wallfair, crypto, casino, lottery, belatra, belatra"
    },
    "/softswiss-game/gameart:WolfQuest": {
        title: "Wolf Quest",
        description: "Explore one of nature’s top predators and start your WOLF QUEST journey with twists and turns in this state of the art 50 pay line slot game, with stacked Wolves and wild Moon symbols to heighten your Quest as it unfolds in front of you. Three Shamanic symbols on reels 1, 2 and 3 triggers the bonus feature awarding 10 free spins. During the free spins an extra wild Moon symbol is added to reels 2, 3, 4 and 5 after every completed spin increasing the number of wild symbols for an enhanced chance of big wins. The Bonus feature can be retriggered during the free spins throughout the Quest. WOLF QUEST brings to life the most captivating and mysterious Native American rituals, transporting players to a world of ancient tradition and folklore. The full moon with the howling wolf is the wild symbol, taking the place of any other symbol in the game with the exception of the wolf’s paw. Hit three wolf paws at the same time and you’ll be transported to the free spins bonus round, with 10 free spins to play with and a bunch of additional wilds! Land another three wolf paw scatters during the bonus round and you’ll be handed another five free spins! A symbol of power and luck for many cultures worldwide, the wolf could be your ticket to an impressive payout! In WOLF QUEST, it’s a case of pitting your wits against the great outdoors and seeing what the spirits have in store! Sign up and get started today!",
        image: "https://cdn.softswiss.net/i/s3/gameart/WolfQuest.png",
        keywords: "wallfair, crypto, casino, slots, gameart, gameart"
    },
    "/softswiss-game/ezugi:BetonNumbers": {
        title: "Bet on Numbers",
        image: "https://cdn.softswiss.net/i/s3/ezugi/BetonNumbers.png",
        keywords: "wallfair, crypto, casino, lottery, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:FiestaBlackjack": {
        title: "Fiesta Blackjack",
        image: "https://cdn.softswiss.net/i/s3/ezugi/FiestaBlackjack.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:NoCommissionBaccarat": {
        title: "No Commission Baccarat",
        image: "https://cdn.softswiss.net/i/s3/ezugi/NoCommissionBaccarat.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:SalsaBaccarat3": {
        title: "Salsa Baccarat 3",
        image: "https://cdn.softswiss.net/i/s3/ezugi/SalsaBaccarat3.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:UnlimitedTurkishBlackjack": {
        title: "Unlimited Turkish Blackjack",
        image: "https://cdn.softswiss.net/i/s3/ezugi/UnlimitedTurkishBlackjack.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/atmosphera:RouletteEng": {
        title: "Live Roulette",
        image: "https://cdn.softswiss.net/i/s3/atmosphera/RouletteEng.png",
        keywords: "wallfair, crypto, casino, roulette, atmosfera, atmosphera"
    },
    "/softswiss-game/belatra:AfricaGold": {
        title: "Africa Gold",
        description: "We continue to introduce you new online slots from BELATRA, which you can play for free on our website.\n\nToday we will talk about really hot game - Africa Gold. Online slot Africa Gold is an excellent combination of bright design, thematic soundtrack, accurate mathematics and an intuitive interface design. In addition this game offers free spins and risk-games. All players can play online for free and without registration.",
        image: "https://cdn.softswiss.net/i/s3/belatra/AfricaGold.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:LuckyBankRobbers": {
        title: "Bank Robbers",
        description: "Bonnie and Clyde. Anyone who loves crime stories knows these names. This world-famous couple of robbers was quite successfully raiding banks, robbing large stores, and was completely wrapped up in the romance of the underworld. Bonnie and her beloved Clyde run their criminal business beautifully and professionally, and their love story was so romantic and unordinary, that later many books and films were based on it. Belatra Games offers you its own version of this romantic and crime plot – a slot machine “Lucky Bank Robber",
        image: "https://cdn.softswiss.net/i/s3/belatra/LuckyBankRobbers.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/ezugi:PortomasoCasinoRoulette": {
        title: "Portomaso Casino Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/PortomasoCasinoRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:TurkishBlackjack": {
        title: "Turkish Blackjack",
        image: "https://cdn.softswiss.net/i/s3/ezugi/TurkishBlackjack.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/atmosphera:Keno": {
        title: "Keno",
        image: "https://cdn.softswiss.net/i/s3/atmosphera/Keno.png",
        keywords: "wallfair, crypto, casino, lottery, atmosfera, atmosphera"
    },
    "/softswiss-game/atmosphera:musicwheel": {
        title: "Music Wheel",
        image: "https://cdn.softswiss.net/i/s3/atmosphera/musicwheel.png",
        keywords: "wallfair, crypto, casino, lottery, atmosfera, atmosphera"
    },
    "/softswiss-game/belatra:20SuperStars": {
        title: "20 Super Stars",
        description: "\u001cFruit\u001d slots are the most popular slot machines among players all over the world. And that\u0019s a fact! Games in the style of \"fruit cocktail\" can be found in the TOP slot machines in any online casino. But even classics cannot stand still. It is changing, improving and modernizing, trying to meet the desires and needs of the modern player. The graphics quality is growing, the parameters and characteristics of the game are changing, the mathematics is improving, and the gameplay is becoming more and more intuitive and simple. The main thing that has not changed for more than 100 years is the bright fruit symbols that playfully appear on the reels. And new symbols are added to them - not less vivid and interesting symbols with their own features. That is how the spectacular original slot from Belatra Games “20 SUPER STARS” was born! Welco",
        image: "https://cdn.softswiss.net/i/s3/belatra/20SuperStars.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:BeautyBeast": {
        title: "Beauty and the Beast",
        description: "A fairy tale about beautiful Belle and terrible Beast, the master of an incredible castle, is one of those stories that are beloved by more than one generation. This lovely and romantic fairy tale has different versions, it was adapted to many cartoons and movies, and theatrical performances on this theme run all over the world - from France to Broadway. BELATRA Company decided to make a new step in development of this magical story – we created an online video slot based on the fairy tal\"Beauty and the Beast\"!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/BeautyBeast.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:Arrival": {
        title: "Arrival",
        description: "Alien Invader themed 30 Line 5 Reel Slots3 Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/Arrival.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:CrazyNuts": {
        title: "Crazy Nuts",
        description: "Classics is always actual! But no matter how strange it may sound, the classics can also change. Reinvention of the classics can be found in everything: in clothes, movies and even in slot machines! The game “Crazy Nuts” is a traditional slot game, which design reminds us of the fi\"one-armed bandits\" with a slight difference - the famous symbols \"cherries\", \"sevens\" and \"bells\" are replaced here with all kinds of nuts!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/CrazyNuts.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:FortuneCraft": {
        title: "Fortune Craft",
        description: "Fortune, luck... How much in life depends on them. Sometimes they accompany us, sometimes they turn away. And it is impossible to find out at what moment luck will smile... Although... Why not ask a powerful sorceress? She is ready to answer any question. To do this, she has a variety of magical artifacts, but the main one is a magic ball, inside which you can read a huge number of prophecies. For example, if you ask: \"Will I be lucky in the new online slot Fortune Craft from BELATRA?\", she will immediately answer! Want to check it out? Welcome!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/FortuneCraft.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:HalloweenJackpot": {
        title: "Halloween Jackpot",
        description: "Halloween is one of the most atmospheric holidays in the world! On October 31, on the eve of All Saints Day, houses and apartments are decorated with cobwebs and ghosts, bright pumpkins with ominously burning candles in them and small spiders, which are scattered throughout the house ... And little Frankensteins, witches and werewolves wander the streets, collecting candy in buckets ... And of course, now is the time to start preparing for this holiday. Draw a scary ghost on the sheet, cut pumpkins and decorate your home with skulls and skeletons! But if you absolutely do not have time for all these complex preparations, and you want to feel the incredible atmosphere of Halloween, Belatra Games has a great solution! Welcome to the new online slot Halloween Jackpot!",
        image: "https://cdn.softswiss.net/i/s3/belatra/HalloweenJackpot.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/ezugi:RouletteLobby": {
        title: "Roulette Lobby",
        image: "https://cdn.softswiss.net/i/s3/ezugi/RouletteLobby.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/ezugi:UnlimitedBlackjack": {
        title: "Unlimited Blackjack",
        image: "https://cdn.softswiss.net/i/s3/ezugi/UnlimitedBlackjack.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/belatra:Action!": {
        title: "Action!",
        description: "Everyone at least once in his/her life has dreamed of being on a movie set. After all, it’s always interesting to have a look on the place where your favorite movies are created. Find out what a fragile make-up girl carries in a huge suitcase, what a track is needed for right in the middle of the filming pavilion and why the largest wall in the room i\"decorated\" with green cloth! The process of filming a real movie is interesting, bewitching and intriguing. And if the main female character is played by a chic, spectacular blonde, then who can resist? Where to find such an ideal movie set? Of course, in BELATRA video slots! Lights! Camera! Action!",
        image: "https://cdn.softswiss.net/i/s3/belatra/Action!.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:BookofDoom": {
        title: "Book of Doom",
        description: "Hundreds and even thousands of years separate the modern world from one of the most important and largest civilizations in world history - Ancient Egypt. This civilization gave the world fantastic architecture and a lot of scientific knowledge, works of literature and art and, of course, writing. We have survived not only scrolls describing the life of that time, but whole books with predictions and prophecies. We suggest you to find one of these books in the new online slot from Belatra Games - BOOK OF DOOM! And only a select few will have a unique chance to open this book. And read the prophecy left to us by the divine priests!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/BookofDoom.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:AtTheCopa": {
        title: "At The Copa",
        description: "Salsa Dancing Themed 30 Line 5 Reel Slots3 Game with 3 Progressive Jackpots",
        image: "https://cdn.softswiss.net/i/s3/bsg/AtTheCopa.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:FruitMix": {
        title: "Mix Fruits",
        description: "A fresh-squeezed fruit cocktail - what could be tastier on a hot summer day? What are you saying? You don’t have any fruits or berries, do you? And you don't want to go after them? Don’t worry! Belatra Games will take care of you! We have a bar serving fresh fruit cocktails, mixing the ripest and juiciest fruits. And an automatic bonus to such a cocktail will becom\"tasty\" win! Well, are you intrigued? Then be sure to check out our bar! Where is it? Wherever it suits you - anywhere you can use your smartphone, tablet or computer! After all, this is an online bar – a slot “Mix Fruits” from Belatra G",
        image: "https://cdn.softswiss.net/i/s3/belatra/FruitMix.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:HotWildPepper": {
        title: "Hot Wild Pepper",
        description: "Hot Wild Pepper is a classic slot game with the most famous symbols in the history of slot machines. The game supports desktop and mobile versions.",
        image: "https://cdn.softswiss.net/i/s3/belatra/HotWildPepper.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:LegacyofDoom": {
        title: "Legacy of Doom",
        image: "https://cdn.softswiss.net/i/s3/belatra/LegacyofDoom.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:MasterofXmas": {
        title: "Master of Xmas",
        description: "Main Features:\r\n- Large symbol in Free Games;\r\n- Bonus Game with the ability to win credits and \r\njackpots;\r\n- the minimum amount on the jackpots that remains \r\neven after the jackpot is drawn;\r\n- Purchase of Bonus or Free Games.",
        image: "https://cdn.softswiss.net/i/s3/belatra/MasterofXmas.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:ThreeCardRummy": {
        title: "Three Card Rummy",
        description: "Welcome to THREE CARD RUMMY!\n\nAn exciting single deck poker variant table game based on hands consisting of three cards.\n\nAll cards are ranked according to their poker value, except aces are always low.\n\nThe object is to have fewer points than the dealer.",
        image: "https://cdn.softswiss.net/i/s3/bsg/ThreeCardRummy.png",
        keywords: "wallfair, crypto, casino, poker, bsg, bsg"
    },
    "/softswiss-game/ezugi:SpeedAutoRoulette": {
        title: "Speed Auto Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/SpeedAutoRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/atmosphera:Bingo37": {
        title: "European Bingo Roulette",
        image: "https://cdn.softswiss.net/i/s3/atmosphera/Bingo37.png",
        keywords: "wallfair, crypto, casino, lottery, atmosfera, atmosphera"
    },
    "/softswiss-game/ezugi:VIPBlackjackwithSurrender": {
        title: "VIP Blackjack with Surrender",
        image: "https://cdn.softswiss.net/i/s3/ezugi/VIPBlackjackwithSurrender.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/belatra:500JuicyFruits": {
        title: "500 Juicy Fruits",
        description: "If there are slots in the gaming world that all players know about, then these are definitely \"fruit\" slots. Once they used to be mechanical \"one-armed bandits\" that operated not only in casinos, but also in many other places throughout the USA. Precious \"cherries\" and \"lemons\" gathered in a line and brought a chewing gum as a win to a player. Oh yes, it was a chewing gum that was given to the winner as a prize during the ban on gambling activities in the US.\n\nOver the time, not only the prize in the form of a simple chewing gum was replaced with real money, but also slot machines switched from mechanical to electronic format, they received colorful graphics and a lot of various bonuses. But the \"fruit\" theme is eternal, it is still popular and beloved among players. BELATRA’s slot machine “500 Juicy Fruits” is modern classics. Favorite symbols in a new stylistic solution - the original bright design will not let players get bored in this gamin",
        image: "https://cdn.softswiss.net/i/s3/belatra/500JuicyFruits.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:AfricaGoldII": {
        title: "Africa Gold II",
        description: "Africa is one of the most amazing and truly mysterious continents. At first glance, it may seem that there is nothing but endless sandy deserts. But if dig deeper, then you can find huge deposits of gold and diamonds that are waiting for them to be finally mined! This is exactly what we suggest you do in the new online game from Belatra Games AFRICA GOLD 2. And don't be afraid of the locals! They are very friendly and always ready to help with your search activities! Are you ready for the search?",
        image: "https://cdn.softswiss.net/i/s3/belatra/AfricaGoldII.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:buybonusNewYork": {
        title: "New York",
        description: "People say, New York is a city of contrasts. This is absolute truth. New York is also a city of temptations, a city of crazy rhythm and pacifying jazz, a city of seething passions and leisurely walks along the bright streets... New York is diverse, but it’s invariably bewitching and attractive! Would you like to find yourself in this amazing city? Then welcome to the new BELATRA online slot “New Yor",
        image: "https://cdn.softswiss.net/i/s3/belatra/buybonusNewYork.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:GhostWalks": {
        title: "The Ghost Walks",
        description: "Halloween is coming, the eve of All Saints Day. On this night life is boiling in the streets of many cities around the world: all dress up in eerie suits, collect sweets and have fun in bars. But if you don´t want to leave the house at all, we have something interesting for you in the online casino of BELATRA...\n\nThe Ghost Walks! - a bright, cheerful and incredibly positive slot in the best traditions of Halloween. The action takes place in an old abandoned castle, where not a single dozen ghosts and spirits live. In the endless dark and gloomy rooms and corridors of the old castle is inhabited by the shadows of its former masters and servants who once worked in this house",
        image: "https://cdn.softswiss.net/i/s3/belatra/GhostWalks.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:HungryCaterpillars": {
        title: "Caterpillars",
        description: "Hungry Caterpillars - the good old game of Belatra games now is available online.A green meadow is inhabited by some not really friendly creatures: a hungry caterpillar which is craving to eat its apple, a hungry frog which wants to eat caterpillar, and patient crow which wants the frog for a meal.The good news is that caterpillar is not the most pathetic inhabitant of the meadow. Point on the best side of an apple and the caterpillar will not stay indebted!",
        image: "https://cdn.softswiss.net/i/s3/belatra/HungryCaterpillars.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:PiggyBank": {
        title: "Piggy Bank",
        description: "The bank robbery is one of the most interesting detective stories. A lot of books and films have been made about this. But you can be not only an outside observer, but also participate in the robbery process! And it’s absolutely legal... Meet the most famous and most loved detective slot by the players! \n\nNow BELATRA’s online game Piggy Bank in our online casino! Does the robbery of the century together with the crafty robber Jimmy, hide from the police and get a tidy sum in our classic slot Piggy B",
        image: "https://cdn.softswiss.net/i/s3/belatra/PiggyBank.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/ezugi:TeenPati": {
        title: "Teen Patti",
        image: "https://cdn.softswiss.net/i/s3/ezugi/TeenPati.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/belatra:7DaysTheSpanishArmada": {
        title: "7 Days The Spanish Armada",
        description: "The Spanish Armada occupies a very special place not only in the history of Spain, but also in the world history. People gave it many names - Invincible, Great and Glorious. This is a truly important and significant part of the world history. BELATRA Company has created its own unique game that vividly and colorfully tells us about a challenging battle between the English and the Spanish fleets. This video slot quickly gained popularity among players from all over the world. And now we would like to bring to your attention the updated version of this game - with an attraction 7 days!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/7DaysTheSpanishArmada.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:BlueBeard": {
        title: "Blue Beard",
        description: "The history about of the Blue Beard is a real classic of fairytale tales. Numerous collections of fairy tales, translated into all languages of the world, can not do without a plot about Blue Beard. By this story, a dozen films have been shot, and theatrical productions of various genres invariably gather complete halls. And now the fairy tale about Blue beard appeared in a new format - an online video slot!",
        image: "https://cdn.softswiss.net/i/s3/belatra/BlueBeard.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:Boomanji": {
        title: "Boomanji",
        description: "Fast Paced Fireworks themed 10 line 5 reel Slots3 GameNote: Has a cloned version called Gemscapades that's 7RED exclusive, it's the same exact game.",
        image: "https://cdn.softswiss.net/i/s3/bsg/Boomanji.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:DoubleCrazyNuts": {
        title: "Double Crazy Nuts",
        description: "Classics are always relevant! But the classics can also change. And at this moment there is a new classic! A new classics can be in everything: in clothes, movies and even slot machines! In the collection of games BELATRA, available online, now there is slot-game like Double Crazy Nuts - novelty in online games BELATRA. You can play this slot machine online free of charge and without registration on our site! \n",
        image: "https://cdn.softswiss.net/i/s3/belatra/DoubleCrazyNuts.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:FrogCreek": {
        title: "Frog Creek",
        description: "No matter what the weather is outside - the scorching sun in the heart of summer, pouring autumn rain or cold snow in the middle of winter - at any of these moments we would like to find ourselves at a quiet and calm summer creek with its lovely inhabitants - butterflies, dragonflies, snails. And, of course, with its main local dwellers - huge frogs. You also wouldn’t mind, would you? Then welcome to the new online slot from BELATRA",
        image: "https://cdn.softswiss.net/i/s3/belatra/FrogCreek.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:HighwayStars": {
        title: "Highway Stars",
        description: "The roar of the engine, the smoke from under the wheels, the adrenaline in the blood, the wind in your face and the smooth road for your favorite motorcycle - this is how we always draw the image of a biker. Beard, sunglasses, hard hats, skulls and Harley - if you imagine bikers like that, the new online slot of BELATRA is specially for you!",
        image: "https://cdn.softswiss.net/i/s3/belatra/HighwayStars.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:LazyMonkey": {
        title: "Lazy Monkey",
        description: "At first glance, it may seem that all monkeys are very active and mobile animals. But it is not so. Especially lazy monkeys, who are too lazy to get a banana and protect themselves from a snake, live in hot tropical jungles... We will tell you about one of such incredibly lazy monkeys in the new Belatra Games online slot - LAZY MONKEY. Welcome to the virtual tropics - here you can not only help the monkey, but also get a great win by chasing snakes and collecting bright and tasty bananas! And if you are lucky enough to collect a whole bag of them, your winnings will be incredible!",
        image: "https://cdn.softswiss.net/i/s3/belatra/LazyMonkey.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:PrehistoricStory": {
        title: "Prehistoric Story",
        description: "Prehistoric Story is modern video slot based on the most ancient theme of the prehistoric era. It combines successfully themed sound effects, colorful characters, classic number of lines and lots of free games and card risk games! An interactive bonus will attract anyone who wants to visit the primitive hunting or just check his intuition in risk games.\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/PrehistoricStory.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/ezugi:TurkishRoulette": {
        title: "Turkish Roulette",
        image: "https://cdn.softswiss.net/i/s3/ezugi/TurkishRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, ezugi, ezugi"
    },
    "/softswiss-game/atmosphera:LiveSlots": {
        title: "LiveSlots",
        image: "https://cdn.softswiss.net/i/s3/atmosphera/LiveSlots.png",
        keywords: "wallfair, crypto, casino, slots, liveslots, atmosphera"
    },
    "/softswiss-game/belatra:88DragonsTreasure": {
        title: "88 Dragons Bounty",
        description: "Indescribable flavor of the mysterious East, incredible treasures and a fierce firedrake ... Do you think this happens only in movies? Have another guess coming! To make sure that such amazing adventures are closer than it seems, we invite all gaming fans to the new Belatra Games online slot - 88 DRAGONS BOUNTY. On the way to the dragon's cave, you will be collecting beautiful symbols of the East - and the more gold artifacts you manage to collect, the more treasures you will see! Are you ready to win? Well, then let's go! And may good fortune always keep your company!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/88DragonsTreasure.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:AmericanRoulette": {
        title: "American Roulette",
        description: "We cannot imagine a modern casino or gaming club without a roulette. During its 200-year history, the roulette has become the most popular gambling game in the world, the most interesting and dynamic game that leaves all card games behind.\n\nVideo roulettes developed by BELATRA have gained popularity among players long ago and are confidently competing with many slot games! On our website you can play roulette online absolutely free and without registration or SMS! You can play not just a roulette, but American Roulette!",
        image: "https://cdn.softswiss.net/i/s3/belatra/AmericanRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, belatra, belatra"
    },
    "/softswiss-game/belatra:Chicagobangbang": {
        title: "Chicago, bang, bang!",
        description: "Cabarets and casinos, prohibition and control, mafia and tough gangster wars...Romantic of Chicago of 1930-s is breathtaking and mesmerizes imagination to present day. With the game Chicago Bang, Bang! you will feel yourself real gangstars, feel the pulse of that times and get a really gangster win! ",
        image: "https://cdn.softswiss.net/i/s3/belatra/Chicagobangbang.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:GoldenLemon": {
        title: "Golden Lemon",
        description: "Do you know what online slot machines most often get to the TOP popular slots among players? No, not slots with a variety of complex bonuses, and not even games with the most spectacular graphics. For many years online casino’s gambling guests have called the classical “fruit” slots to be the most favorite ones. Their history began more than a hundred years ago, when a ban on slot machines was declared in the USA, and they were disguised as gum machines. “Golden Lemon” is the symbol of those American traditions of the beginning of the past century. But instead of a chewing gum - big wins, ",
        image: "https://cdn.softswiss.net/i/s3/belatra/GoldenLemon.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:Jewels": {
        title: "Jewels",
        description: "As you know the best girls friends are diamonds. And the best friends of all gambling fans are pearls. And rubies. And emeralds. Precious stones are always beautiful. And if they are getting together and bring great wins, it's just perfect!\n\nThe most precious slot is Jewels (Stones) - the online slot from Belatra. It's incredibly easy to play for free and without registration in our online casino. Like all online slots BELATRA GAMES this game supports 11 languages ​​of the world, including English, Spanish, German, Russian and many others, and also has high quality HD graphics, original soundtrack and a whole set of interesting additional game",
        image: "https://cdn.softswiss.net/i/s3/belatra/Jewels.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:Luciesats": {
        title: "Lucie's Cats",
        description: "Do you like cats? Meet Lucie - the main character of the new slot machine from BELATRA. Lucie loves cats! Lucie has 4 cats of different breeds and colors at home. However, sorry, of course, we were mistaken. Lucie lives in the cat's house. Because they are the rightful owners of this big house. Here they are allowed everything: eat the most elite food and frolic with mice, drag fish from the table and innocently play with a ball, hide in boxes and even break aquariums! Do you want to see the most real cat paradise? Then welcome to this amazing home - Lucie's Cats Online Slot.",
        image: "https://cdn.softswiss.net/i/s3/belatra/Luciesats.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/ezugi:VIPBlackjack": {
        title: "VIP Blackjack",
        image: "https://cdn.softswiss.net/i/s3/ezugi/VIPBlackjack.png",
        keywords: "wallfair, crypto, casino, card, ezugi, ezugi"
    },
    "/softswiss-game/belatra:100PinUpFruits": {
        title: "100 Pin-Up Fruits",
        image: "https://cdn.softswiss.net/i/s3/belatra/100PinUpFruits.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:AnEscapeFromAlcatraz": {
        title: "Escape from Alcatraz",
        description: "\"Chase! Do you know detective story without this action?\"\n\nDo you want to feel like someone who is running - welcome to the online slot An Escape From Alcatraz. Now you can easily play this slot machine for free and without registration. Many players love BELATRA’s slot Alcatra",
        image: "https://cdn.softswiss.net/i/s3/belatra/AnEscapeFromAlcatraz.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:ChristmasJackpot": {
        title: "Christmas Jackpot",
        description: "Christmas is the most magical holiday of the year. And the pre-Christmas bustle is undoubtedly the most pleasant of all. Shopping for gifts, decorating the Christmas tree, walking around the festive city gazing at beautifully decorated shop windows. And, of course, at such a fabulous time, everyone is waiting for a miracle. And it will definitely happen! The main thing is to believe in him! For Christmas miracles, we invite you to the new themed online slot Christmas Jackpot, look for the most beautiful showcase and come visit us! You can be sure there will be enough Christmas miracles for everyone!\n\nEven if it is not very snowy outside the window and you cannot recharge with a festive mood, the online slot machine Christmas Jackpot will help you. Beautiful, bright, magical and intuitive, this slot is exactly what you need to create a Christmas mood. Here everyone can choose a convenient language (and the game has been translated into as many as 14 world languages!) And play online for free and without registration - this is the version of the game available on our website. It is as easy as possible to play online without SMS and downloading on the site free-slot.belatragames.com! And if you want to play online for real money, then look for the online slot Christmas Jackpot on the sites of our partners!",
        image: "https://cdn.softswiss.net/i/s3/belatra/ChristmasJackpot.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:GoldenLemonDeluxe": {
        title: "Golden Lemon Deluxe",
        description: "Do you know what online slot machines most often get to the TOP popular slots among players? No, not slots with a variety of complex bonuses, and not even games with the most spectacular graphics. For many years online casino’s gambling guests have called the classical “fruit” slots to be the most favorite ones. Their history began more than a hundred years ago, when a ban on slot machines was declared in the USA, and they were disguised as gum machines. Golden Lemon DeLuxe is the symbol of those American traditions of the beginning of the past century. But instead of a chewing gum - big wins, of co",
        image: "https://cdn.softswiss.net/i/s3/belatra/GoldenLemonDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:JingleBells": {
        title: "Jingle Bells",
        description: "Probably there is no one among us who has never heard one of the most popular Christmas songs “Jingle Bells” thatwas written in 1822-1823 by an American songwriter and composer James Lord Pierpont. No matter when you hear this melody - in the middle of a cold winter or at the height of a hot summer, it always evokes an association with Christmas and New Year’s holidays. Since it was written, this song has been translated into many languages, repeatedly covered by various performers and it always creates a joyful, positive and festively romantic mood for the liste",
        image: "https://cdn.softswiss.net/i/s3/belatra/JingleBells.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:LuckyDrinkOld": {
        title: "Lucky Drink",
        description: "We continue introdusing you with the most popular BELATRA´s games, which are available online now. Already there were reviews on the slot machine Piggy Bank (play online), Alcatraz online (play for free and without registration) and many others. And today we will speak about the game which is the main symbol of BELATRA GAMES. Meet the online version of the super popular slot - Lucky Drink! Cheerful, bright and incredibly charismatic Davil invites all lovers of excitement to look to him after a couple of beer glasses and check his fortune! To do this, the crafty devil prepared a lot of original games and bonuses for you",
        image: "https://cdn.softswiss.net/i/s3/belatra/LuckyDrinkOld.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:PrincessOfSwamp": {
        title: "Princess Of Swamp",
        description: "What could be more wonderful than being in a fairy tale? You have a chance to find yourself in the real fairy tale with the online game Princess of Swamp, at the end of the story the frog turns into a beautiful princess, and you into a rich man! Now you can play online slot Princess of Swamp for free and without registration. Try your luck!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/PrincessOfSwamp.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:88Bingo88": {
        title: "88 Bingo 88",
        description: "Online Bingo game is actively gaining popularity among online casino players. Intuitive interface, simple rules, a game idea different from classic online slots - what else does the game need to become the favorite one among many online casino users? Well, maybe an unexpected design!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/88Bingo88.png",
        keywords: "wallfair, crypto, casino, lottery, belatra, belatra"
    },
    "/softswiss-game/belatra:BondedWarehouse": {
        title: "Customs Storage",
        description: "What is hidden in simple cardboard boxes stored in a large customs warehouse? Gold or diamonds? Smuggled watches or perfume? Yes, yes, all that plus huge wins! New BELATRA’s online slot “Customs Storage” is a story about a customs warehouse, where every box can hide excellent sums of money. And a wild cat found in the box will make the win even cooler - the cat is a wild-symbol here! To play the online slot for real money or for free and without registration – it’s up to you! A pleasant crisp bill “cargo” that we’ve got here in our customs warehouse will be enoug",
        image: "https://cdn.softswiss.net/i/s3/belatra/BondedWarehouse.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:DraculaRiches": {
        title: "Dracula Riches",
        description: "The lands of Transylvania, mysterious and mesmerizing, have always been shrouded in mystery. There are a lot of legends about vampires and about the great Count Dracula: frightening and attractive, bloody and dramatic. If you are interest in the story of Vlad Dracula, we invite you to visit amazing places and plunge into the incredible atmosphere of Medieval Transylvania in our new online game! DRACULA RICHES - ENIGMATIC ONLINE SLOT!\n\nDracula Riches - a bewitching video slot with an original sound design and stylish graphics. Combinations with a win can fall out on 5 reels with 20 fixed lines. The game has a joker Bat - he allows you to make the most successful combination. With him, the winnings even more. \n",
        image: "https://cdn.softswiss.net/i/s3/belatra/DraculaRiches.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:GypsyRose": {
        title: "Gypsy Rose",
        description: "A fortune teller themed slot, featuring 5-reels and 30-paylines.",
        image: "https://cdn.softswiss.net/i/s3/bsg/GypsyRose.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:Halloween": {
        title: "Halloween",
        description: "Halloween is a holiday that becomes more and more popular every year in many countries around the world. On October 31, on All Saints' Eve, houses and apartments are decorated with cobwebs and ghosts, pumpkins with ominously burning candles and small spiders that are scattered around the house ... And little Frankensteins, witches and werewolves go trick-or-treating...\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/Halloween.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:JustABingo": {
        title: "Just A Bingo",
        description: "Slots, poker, roulette - these kinds of gambling have become a real classic in online casinos long ago. Every day millions of bets are made in online slots, thousands of card deals give gains to poker fans, tens of thousands virtual balls fall on red in online casinos video-roulettes... But sometimes you want something new, original, unusual...\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/JustABingo.png",
        keywords: "wallfair, crypto, casino, lottery, belatra, belatra"
    },
    "/softswiss-game/belatra:MarswoodParty": {
        title: "Marswood Party 2",
        description: "Is there life on Mars? Not only one generation of astrophysicists asked this question. And while scientists refuting the hypotheses, BELATRA is already ready to answer this question: Mars has its own life! Bright, positive and stormy! Video slot Marswood Party has become a classic slot machine. This colorful original game, populated by merry characters, has become popular with many players. And now we are pleased to present the improved game Marswood Party in an online format!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/MarswoodParty.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:NorthernBoom": {
        title: "Northern Boom",
        description: "3 scatter symbols on the reels award Free Games. In the Free Games, 1 large symbol on the 3 central reels replaces 9 small ones. If you get 6 or more special credit-symbols, a Bonus game is awarded, in which you can win credits and jackpots.",
        image: "https://cdn.softswiss.net/i/s3/belatra/NorthernBoom.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:GoldDiggers": {
        title: "Gold Diggers",
        description: "Gold Miner themed 30 Line 5 Reel Slots3 Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/GoldDiggers.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:ShogunsFortune": {
        title: "Shogun's Fortune",
        description: "The history of Japan is full of secrets and mysteries. Its culture is surprising and fascinating. And the traditions of this country are sometimes so incomprehensible, but so attractive. Today, the land of the rising sun is one of the most technologically advanced countries. But if you close your eyes for a second, and you can fly back into the past... There, where it all began... Where samurai bravely fought on their Japanese swords ... Where geisha with snow-white faces and scarlet bows-lips entertained their guests with dances and singing ... Where the cherry blossoms bloomed ... Where the history of modern Japan was created ... The time machine has not yet been invented, so we invite you to fly back in time with our new online slot Shogun's Fortune! Yokoso!",
        image: "https://cdn.softswiss.net/i/s3/belatra/ShogunsFortune.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:buyBonusofMaya": {
        title: "#buyBonus of Maya",
        description: "Many years have passed since the end of the world was predicted by the Mayan Calendar. But something went wrong, and the end of the world was postponed. Well, all the better for us! Thus, we can afford to live joyously, merrily and the way we want, traveling around the world, discovering new beautiful countries and cities... But if you don’t feel like exploring the modern world, and would better prefer to have a look at the life of one of the oldest civilizations, then this spectacular and colorful online BELATRA slot #BuyBonus of Maya is exactly what you need! The Mayans are waiting for you in their amazing world",
        image: "https://cdn.softswiss.net/i/s3/belatra/buyBonusofMaya.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:GoldenBucks": {
        title: "Golden Bucks",
        description: "Game ... Money ... Excitement ... These concepts are inseparable. A new video slot “Golden Bucks” confirms that. This classic slot game has been enhanced with new symbols, as well as fast, but very cash bonuses. All this goes in a package with the new graphics and nice jangling of coins as sound effe",
        image: "https://cdn.softswiss.net/i/s3/belatra/GoldenBucks.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:EuropeanRoulette": {
        title: "European Roulette",
        description: "A modern casino or a game club can not be imagined without a roulette. For its 200-year history, roulette has become the most popular gambling in the world, the most interesting and dynamic.\n\nThe game Roulette, developed by BELATRA, has long won popularity among players, and the slot machines with this game compete with many slot machines. Today we are happy to present your beloved Roulette in a new format - now online!",
        image: "https://cdn.softswiss.net/i/s3/belatra/EuropeanRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, belatra, belatra"
    },
    "/softswiss-game/belatra:IcyFruits": {
        title: "Icy Fruits",
        description: "Far-far away, in the Ice Mountains...fruits live! Unexpected, right? And these heat-loving lemons and cherries, and oranges with watermelons live, frozen in ice. And only the warmth of your winnings can remove this icy \"curse\" from them. Are you ready to help tasty fruits, and at the same time earn a couple of \"lemons\" for yourself? Belatra Games invites you to an exciting journey to the Ice Mountains - to the new winter online slot Icy Fruits! Try our new \"Iced Fruit Cocktail\" and be convinced that it is simply impossible to tear yourself away from it!\r\n\r\nColorful and bright, saturated with frosty freshness, this online slot machine will not leave indifferent any player! 20 pay lines, intuitive rules and a user-friendly interface - what else is needed in order for the slot to take a confident place in your personal TOP of games? Each player can easily choose the optimal pace of the game, favorite take and even the language in which it is more convenient to play. And there really is plenty to choose from: the Icy Fruits online slot has been translated into 14 languages of the world, so it will be available to players of all continents. Traditionally, the new winter online slot BELATRA can be played in two ways: for free, directly on our website, or online for real money in an online casino. Look for the Icy Fruits slot on the sites of our casino partners!",
        image: "https://cdn.softswiss.net/i/s3/belatra/IcyFruits.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:LoveMagic": {
        title: "Love Magic",
        description: "We added a new online slot!\n\nLove Magic is a bright, interesting game. Love, romance, magic - these words enchant and fascinate in all the languages ​​of the world. In this game so easy to feel this emotions again and magically become rich!\n\n10 lines, 5 reels with an unexpected for the slots theme of the magic of love - an excellent set for the game to become popular among the most diverse admirers of excitement - from conservatives to fans of something original. In addition, in our online slot machines you can play for free in 5 languages: Russian, English, Spanish, Lithuanian and Belarusi",
        image: "https://cdn.softswiss.net/i/s3/belatra/LoveMagic.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/igtech:FairyWings": {
        title: "Fairy Wings",
        description: "The magical world of Fairy Wings, the 4x5, 50 lines videoslot, has opened its gates for you. Meet the royal family, stacked on all reels and choose your side in the struggle for the throne of the Pixie kingdom in the free spins round.",
        image: "https://cdn.softswiss.net/i/s3/igtech/FairyWings.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/belatra:MayanBookMultiChoice": {
        title: "Mayan Book Multi Choice",
        description: "Do you know how many years have passed since the sensational Mayan Calendar predicted the end of the world? 10 years! The end of the world did not take place, but interest in the history of the most ancient civilization does not stop to this day. The books have been written, the films have been made, and the games are in progress. The collection of Belatra Games games already has a game in this style - #BuyBonus Of Maya - a bright online slot with the ability to buy bonus games at any time during the game. And now we offer you a new slot - MAYAN BOOK - original, colorful, modern, with unexpected bonuses and a new special #CraftBonus option. Intrigued? Then welcome - Maya are waiting!",
        image: "https://cdn.softswiss.net/i/s3/belatra/MayanBookMultiChoice.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:MWA": {
        title: "MWA",
        description: "Boxing is one of the most popular sports in the world. And among combat sports, it is definitely in the TOP list of contact sports. Besides, the passion for boxing can be very different - from participation in competitions and championships at different levels (both amateur and professional) or attending such events to the interest in sports betting. But what about trying to combine all the above in one even without leaving your home? Seems impossible? Don’t be so skeptical! Play BELATRA online slot “MWA”, and you will understand that everything is possible in the world of online ",
        image: "https://cdn.softswiss.net/i/s3/belatra/MWA.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:CaribbeanPoker": {
        title: "Caribbean Poker",
        description: "Poker game",
        image: "https://cdn.softswiss.net/i/s3/bsg/CaribbeanPoker.png",
        keywords: "wallfair, crypto, casino, poker, bsg, bsg"
    },
    "/softswiss-game/belatra:Carousel": {
        title: "Carousel",
        description: "Spring is coming! And with it the opening of a new season in bright amusement parks. Delicious ice cream in waffle cone, funny clowns with balls, crisp popcorn and dizzy rides are waiting for everyone who wants to relax and have fun. And, of course, the main attraction in any park has always been and will be the Carousel...\n\nBELATRA invites you to its own amusement park - a positive and colorful video slot Carousel. 100 lines, drums of different heights (4 or 5 symbols), bonus games - you will be very interesting! international game \"Carousel\" translated into 11 languages of the world. You have a great opportunity to play online for free and without registering in the slot machine BELATRA on our website. If you want to play BELATRA slot machines for real money, then you will easily find this game in various online casinos.",
        image: "https://cdn.softswiss.net/i/s3/belatra/Carousel.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:HouseOfFun": {
        title: "House of Fun",
        description: "Haunted House themed 30 Line 5 Reel Slots3 Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/HouseOfFun.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:HalloweenCrystals": {
        title: "Halloween Crystals",
        description: "Remember our new friend - a funny and very hardworking digger? He works day and night underground, without days off and holidays, mining more and more crystals. And even on the eve of All Saints' Day, he goes down to find the most beautiful crystals, the brilliance of which cannot be hidden even by a huge black web. Nothing can stop our digger from doing what he loves! Will you keep him company? Spend Halloween bright, fun and unforgettable - in the new online slot from Belatra Games Halloween Crystals! Go down to the dungeon and fear nothing!",
        image: "https://cdn.softswiss.net/i/s3/belatra/HalloweenCrystals.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:KingOfJumpingScratch": {
        title: "King of Jumping Scratch",
        description: "One of the most famous fairy tales in the world is the story of the Frog Princess. More than 20 years ago, it was this fairy tale that inspired the developers of the BELATRA company to create the Princess Of Swamp slot game, which instantly became incredibly popular among players and has not lost its position ever since. And now it was decided to create a sequel - a scratch game in a lottery format with simple rules, a favorite bonus and an intuitive interface. Welcome to King Of Jumping Scratch game!",
        image: "https://cdn.softswiss.net/i/s3/belatra/KingOfJumpingScratch.png",
        keywords: "wallfair, crypto, casino, lottery, belatra, belatra"
    },
    "/softswiss-game/belatra:LuckyRoulette": {
        title: "Lucky Roulette",
        description: "A modern casino or a game club can not be imagined without a roulette. For its 200-year history, roulette has become the most popular gambling in the world, the most interesting and dynamic.\n\nThe game Roulette, developed by BELATRA, has long won popularity among players, and the slot machines with this game compete with many slot machines. Today we are happy to present your beloved Roulette in a new format - now online!",
        image: "https://cdn.softswiss.net/i/s3/belatra/LuckyRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, belatra, belatra"
    },
    "/softswiss-game/belatra:MasterOfGold": {
        title: "Master Of Gold",
        description: "Admit it, which of you doesn't dream of getting rich? You can work long and hard, become the president of a large company, make a lot of money - and finally lead the Forbes hundred! You can get a huge inheritance from your aunt from Brazil... You can win a big sum in the lottery... But it is much more fun and interesting to get tons of gold coins from the mysterious Master of Gold, a gray-haired old man who lives on the forest edge. If you are intoxicated by the bewitching shine of gold and the mysterious play of light in the facets of diamonds and emeralds, then you have a direct road to the new BELATRA online slot - Master of Gold. A bit strange, but infinitely charming owner of gold gladly invites everyone to an exciting game, in which absolutely everyone can win!",
        image: "https://cdn.softswiss.net/i/s3/belatra/MasterOfGold.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:OceanBed": {
        title: "Ocean Bed",
        description: "More than 250 countries get along quite peacefully on land. But have you ever wondered what happens in the depths of the ocean in the meantime? They also have their kingdoms and rulers. Some kingdoms are ruled by powerful representatives of the animal world, and some - by mysterious characters. A story about one of such kingdoms will be told in a 5-reel slot “Ocean Bed”. Despite the stern look and unshakable reputation, the sea master Neptune is a very cheerful character who will not let you get bored and will surely pack a couple of bags with sea gold for your tr",
        image: "https://cdn.softswiss.net/i/s3/belatra/OceanBed.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:SmackMe": {
        title: "Catch & Snatch",
        image: "https://cdn.softswiss.net/i/s3/belatra/SmackMe.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:TripleEdgePoker": {
        title: "Triple Edge Poker",
        description: "Welcome to Triple Edge Poker, an exciting single deck poker table game based on hands consisting of three cards.\n\nIn fact, Triple Edge Poker is two games in one!\n\nPair Plus, Triple Edge Poker’s side bet, allows you to win even more money per han",
        image: "https://cdn.softswiss.net/i/s3/bsg/TripleEdgePoker.png",
        keywords: "wallfair, crypto, casino, poker, bsg, bsg"
    },
    "/softswiss-game/belatra:CrystalsDigger": {
        title: "Crystals Digger",
        description: "Do you know who the diggers are? To answer this question, you need to dig deeper. In every sense of the word. Diggers are people who explore everything that is underground: natural dungeons formed over the years and abandoned underground objects of artificial origin. But just wandering through the dungeons is boring. It is much more interesting to look for treasures! And believe me, in order to get into the dungeons, you don't even have to leave the house. BELATRA and personally our charismatic digger invite you on an exciting journey to the new Crystals Digger cascade online slot!\n\nOutwardly, this game is similar to the very popular games now, where you need to collect crystals of the same type. Due to the cascading principle, Crystals Digger online slot machine has a similar gameplay. Falling on the reels, the same symbols disappear, the remaining ones fall down, and the empty spaces are occupied by new symbols. And this happens as long as there are winning combinations. The features of this online slot are bonus games, winnings multiplier, CraftBonus and \"Wheel of Fortune\". In addition, the game is traditionally translated into 14 languages of the world and allows you to search for crystals in almost any part of the planet!\n\nIntrigued? Do you want to play Crystals Digger Belatra slot machine online for free without registration, SMS and download? You can launch the game on our website and test your luck right now. Or you can find this game on our partners' websites and play for real money in Crystals Digger online in many online casinos around the world!",
        image: "https://cdn.softswiss.net/i/s3/belatra/CrystalsDigger.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/pragmaticexternal:7Piggies": {
        title: "7 Piggies",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/7Piggies.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/belatra:GreenGrocery": {
        title: "Green Grocery",
        description: "The company \"BELATRA\" - for a healthy lifestyle! And when is to start it, if not in the summer, when everywhere we are surrounded by ripe fruit, fresh vegetables and beautiful greens! But if you do not want to go far to the market for behind it this useful harvest, we have a simple solution! We suggest you go to the best greengrocer in his wonderful vegetable shop in the game Green Grocery. Here It is full of juicy fruits, vegetables for every taste and a sea of greenery (and not only edible)! Here you will get not only a charge of positive emotions, but also chic winnings in bonuses.\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/GreenGrocery.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:JMonsters": {
        title: "J. Monsters",
        description: "Monsters are unique creatures: everyone is afraid of them, but is there anyone who hasn't ever dreamed of meeting such a creature? If the terrifying Yetis living in the most impassable places of snow-covered mountains do not attract you, if you are not going to Scotland to see the Loch Ness monster, if you are not eager to wait for the full moon to meet the Werewolf, then we've got a great, bright and absolutely not scary way for you to meet monsters! Welcome to the new BELATRA online slot J. Monsters",
        image: "https://cdn.softswiss.net/i/s3/belatra/JMonsters.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:MonkeyJackpot": {
        title: "Monkey Jackpot",
        description: "3 and more Scatters award Free Games.In Free Games 3x3 reels and 5 lines are used.The five biggest symbols on line in Free Games award one of the jackpots. For a series of Free Games it is possible to win all 5 jackpots . After the jackpot drawing there is a minimal sum remains.You can increase your winnings in risk game which you can choose in setup or switch it off.",
        image: "https://cdn.softswiss.net/i/s3/belatra/MonkeyJackpot.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:PirateJackpots": {
        title: "Pirate Jackpots",
        image: "https://cdn.softswiss.net/i/s3/belatra/PirateJackpots.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:SpanishArmada": {
        title: "The Spanish Armada",
        description: "Meet a new online-slot from BELATRA - The Spanish Armada!\n\nThe Spanish Armada is a bright and dynamic game that tells us the story of the great battle of the Armada Invincible with the ships of the English fleet. Due to an incredible number of lines (there are 100 the game!), winnings will fall out very often!\n\nIn this game you will find the original free-games and risk-games will increase the chances of win! If you want to play online slot games for free and without registration, The Spanish Armada is your perfect choice!",
        image: "https://cdn.softswiss.net/i/s3/belatra/SpanishArmada.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:FaFaTwins": {
        title: "FaFaTwins",
        description: "Double your money, double the fun! This delightful game offers 243 paylines that pay any way to dramatically increase your chances to win. And that's not all! Guided by an adorable pair of identical twin sisters, FA FA TWINS features reels that can lock and sync with matching symbols on those reels, providing even more chances for huge wins!",
        image: "https://cdn.softswiss.net/i/s3/bsg/FaFaTwins.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:LocalPub": {
        title: "Local Pub",
        description: "Sometimes when you are tired of work and daily routine, all you need is just to relax. And that evening you go to your favorite pub and suddenly realize that you don’t need much for ordinary human happiness - a glass of foamy golden beer, a portion of incredibly tasty red crawfish, a couple of delicious sausages and several rounds of “21” or “Fool” with friends. If you are also tired of problems and worries, we are happy to invite you to our wonderful “Local Pub” - the best place not only for relaxation, but also for great wins!\n\nIn the “Local Pub” we are happy to offer you everything you need for a wonderful mood: you will find snacks of all kinds and beer never stops flowing here. All that – it is bright and original symbols of the online slot. It is very easy and a great fun to play online slot machines for free! Besides, you can do it right here and right now on our website. If you want to play online slot machines for real money, you can always find BELATRA’s slots on the websites o",
        image: "https://cdn.softswiss.net/i/s3/belatra/LocalPub.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:LavishJoker": {
        title: "Lavish Joker",
        description: "Creating a new slot, the developers of the company \"BELATRA\" always study the interests of the players. Love crime stories - please! More adventurous? We have such slots! Adherents of classic \"fruits\"? A whole bar of our \"fruit cocktails\" is waiting for you! Do you like fairy tales? And we have enough of these games! And how can you surprise a player whose main passion is ... gambling? This is exactly the task our developers and game designers faced, and they successfully coped with it, creating a new bright slot - Lavish Joker!\n\nLavish Joker is a colorful and vibrant online slot, the main character of which, of course, is the Joker. He is surrounded by many symbols of gambling. There are card suits, slot machine drums, and even poker chips! A simple, intuitive game available to players all over the world - it is translated into 14 languages of the world and is ready to captivate and enrich players from all countries and continents. Traditionally, you can try this slot in free mode - play without registration, download and SMS right on our website. And when you are convinced that the new BELATRA Lavish Joker slot is worthy to play for real money in this slot online, look for it on the sites of our casino partners.",
        image: "https://cdn.softswiss.net/i/s3/belatra/LavishJoker.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:MasterofStarz": {
        title: "Master of Starz",
        image: "https://cdn.softswiss.net/i/s3/belatra/MasterofStarz.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:TheGolden88": {
        title: "88 Golden 88",
        description: "Everything should be according to Feng Shui: furniture in the apartment, books on the shelves and even games in slot machines. If you belong to the adherents of this Eastern practice and love classic slots, then you are in the right place and you will surely enjoy BELATRA’s online slot machine “88 The Golden 8",
        image: "https://cdn.softswiss.net/i/s3/belatra/TheGolden88.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:PersianNights": {
        title: "Persian Nights 2",
        description: "We all grew up with fairy tales. And if the stories about Red Ridden Hood, Pinokio and Cinderella are familiar and known almost by the heart, Eastern fairy tales always arouse interest, admiration and anticipation of magic. Especially when the night falls on a small town in the story...\n\nWe invite you to the atmosphere of \"1000 and 1 night\" by playing the new Belatra slot machine Persian Nights online. The king lives in a cozy eastern city, sparkling in the night with golden domes of magnificent palaces and temples. Next to him are always his loyal servants and tame lions. His treasuries are strewn with pearls, stones and other riches. But the main treasure of the king is a magic lamp...",
        image: "https://cdn.softswiss.net/i/s3/belatra/PersianNights.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:SicBo": {
        title: "Sic Bo",
        description: "SIC BO\nThe history of the game Sic Bo dates back to ancient China. In translation, the name of the game literally means \"a pair of cubes\". It would seem that there is nothing easier than guessing that a pair of dice with numbers will decide the outcome of the game. But no! There are not two cubes in the game, but three. Otherwise, this game resembles the principles of roulette.\n\nThe essence of the game is to guess the amount of points that fall on 6-sided dice with numbers. In each game, three dice are thrown, and the player preliminarily makes bets on the numbers that will appear in this game. In this case, the player places his chips on numerous sectors of the playing field. The sectors correspond to the different types of rates that we will now get to know.",
        image: "https://cdn.softswiss.net/i/s3/belatra/SicBo.png",
        keywords: "wallfair, crypto, casino, craps, belatra, belatra"
    },
    "/softswiss-game/belatra:TheWildlife": {
        title: "The Wildlife",
        description: "Photographer's profession is one of the most interesting in the world. Don’t you believe? Well, judge for yourself. Only a photographer is always in the center of various events. Through the lens of his camera he watches a sports match from the best grandstand, at a rock concert he always comfortably settles down in a special sector for the press and when going to take a series of photos of wild animals, he gets to the most mysterious places of our planet. Intrigued? Would you like to be in his shoes? Then “The Wildlife” video slot is for",
        image: "https://cdn.softswiss.net/i/s3/belatra/TheWildlife.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:88FrenzyFortune": {
        title: "88 Frenzy Fortune",
        description: "Get ready for big and plentiful wins in 88 FRENZY FORTUNE! This three standard reel, single payline slotfeatures a bonus reel with the potential for game-changing effects, making sure that each spin will haveyour players on the edge of their seats.With the majesty of space in the background, your players will enjoy the cool retro electronica theme asthey rack up wins. The game boasts a broad bouquet of bonuses, and any bonus is possible with eachwinning spin a 2x, 5x, or 8x multiplier on wins, an 8x or 18x boost to the player's wager, or a free respinthat features its own multiplier on wins!88 FRENZY FORTUNE is the fast-paced, beautifully rendered slot your players have been looking for!",
        image: "https://cdn.softswiss.net/i/s3/bsg/88FrenzyFortune.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Baccarat": {
        title: "Baccarat",
        description: "Baccarat is a thrilling game played at major casinos all over the world. It’s up to you to wager that the player’s hand will win, the banker’s hand will win, or that the game will result in ",
        image: "https://cdn.softswiss.net/i/s3/bsg/Baccarat.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/belatra:MayaMystery": {
        title: "Maya Mystery",
        description: "Do you know how many years have passed since the sensational Mayan Calendar predicted the end of the world? 10 years! The end of the world did not take place, but interest in the history of the most ancient civilization does not stop to this day. The books have been written, the films have been made, and the games are in progress. The collection of Belatra Games games already has a game in this style - #BuyBonus Of Maya - a bright online slot with the ability to buy bonus games at any time during the game. And now we offer you a new slot - MAYAN BOOK - original, colorful, modern, with unexpected bonuses and a new special #CraftBonus option. Intrigued? Then welcome - Maya are waiting!\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/MayaMystery.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:PiggyBankScratch": {
        title: "Piggy Bank Scratch",
        description: "Scratch games that resemble instant lotteries are not as widely known among online casino players as, for example, slots, poker, roulette or bingo games. Although scratch games are very fun and always intuitive. And if you choose the right style and design, then the game will be simply doomed to success. This is how the new game from Belatra Games was created - PIGGY BANK SCRATCH. Combining all the best from the most popular Piggy Bank slot and an interesting idea of the lottery format, this game is ready to become a favorite of many players around the world!",
        image: "https://cdn.softswiss.net/i/s3/belatra/PiggyBankScratch.png",
        keywords: "wallfair, crypto, casino, lottery, belatra, belatra"
    },
    "/softswiss-game/belatra:SuperSevens": {
        title: "Super Sevens",
        description: "Classic style is always in trend – whether it’s films, clothes and even slot machines! In the online collection of BELATRA games the most traditional slot ga\"Seven\" appeared. You can play online for free and without registration on our site!\n\nSuper Sevens is classic slot game, which resemblethe first slot machines because of their design. There are only 5 lines and the most famous symbols in the history of slot machines - \"seven\", \"cherries\", \"oranges\", \"bar\" and others. Have you wanted to play for 777 for free? The time has come! SuperSevens has simple and intuitive interface, it’s suitable for players with any experience in slot games. Just click o\"START\" - and the drums will spin, stopping at some point and making up the winning combinations.",
        image: "https://cdn.softswiss.net/i/s3/belatra/SuperSevens.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:TheSmartRabbit": {
        title: "The Smart Rabbit",
        description: "Very soon there will come a long-awaited summer - the time of leave, sun and heat. Someone heading off seaward to warm countries, but someone prefers a quiet cottage, surrounded by beautiful flowers and trees. And, of course, garden beds!\n\nIf instead of the scorching sun and crowds of tourists you prefer the second option of rest, then you can start right now by playing a new slot machine BELATRA online The Smart Rabbit. You can play for free without registration on our website. Also we invite you to play this BELATRA slot machine for real money in the online casino of our partners.\n\nAnd so that you do not get bored in our virtual dacha, we offer you a fascinating adventure - to expel a smart Rabbit, who encroaches not only on the garden beds, but also on stocks in the warehouse...",
        image: "https://cdn.softswiss.net/i/s3/belatra/TheSmartRabbit.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:AlkemorsTower": {
        title: "Alkemor's Tower",
        description: "Delve into the mysteries of the arcane with the wizard himself in Alkemor's Tower. Seek the Astrology and Nature rooms. Cast magical spells featuring the four classic elements of Earth, Wind, Fire and Water. This brilliant and artfully crafted slot machine is another crowning achievement in the ever-expanding Slots game lineup.",
        image: "https://cdn.softswiss.net/i/s3/bsg/AlkemorsTower.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:AmazingKong": {
        title: "Amazing Kong",
        description: "Attack the giant gorilla in his own lair in Amazing Kong, the 4x5, 50 lines videoslot. If WILD is on the middle reel it expands to fill the whole reel and when you get the chance to meet Amazing Kong himself, he will take you on journey around the world in the Free Spins round, where you can select up to 40 Free Spins and up to 8x multiplier.",
        image: "https://cdn.softswiss.net/i/s3/igtech/AmazingKong.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/belatra:LuckyDrink": {
        title: "Lucky Drink in Egypt",
        description: "All people love the continuation of something good! When we finish reading an interesting book, we really hope that there is a second volume. And after watching the exciting film, we look forward to the release of the second part. Continuation is always a pleasant meeting with your favorite heroes in a new environment. BELATRA Company has a great game, which is so fond of the players that it was decided to create a new unique modern slot for well-known characters.\n\nLucky Drink in Egypt - a funny story about the adventures of the cunning Devil and another no less brilliant hero. This time the story takes place not in the usual pub, but in hot Egypt. Charming Cleopatra is walking here at every step, the Sphinx cats sweetly lying on the sand, and behind each sand dune a sarcophagus with the treasures of the ancient Egyptian rulers is hidden. In general, what's not going to happen after a couple of glasses of cold beer drunk under the scorching African sun",
        image: "https://cdn.softswiss.net/i/s3/belatra/LuckyDrink.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:NeptunesKingdom": {
        title: "Neptune's Kingdom",
        description: "The sea is fascinates. It’s mesmerize people with depth, vast expanses, unique beauty and, of course, its bright inhabitants. But few people know that in addition to colorful fish, friendly dolphins, giant octopuses and leisurely turtles, there are other inhabitants in the sea. And even their rulers...\n\nSomewhere in the inaccessible to man depths the sea king Neptune lives. He rules unchallenged in the water area of ​​our planet and beautiful Mermaid joyfully help him manage the Kingdom. You can easily get acquainted with these and many other characters if you decide toplay online Neptune's Kingdom BELATRA slot machine for free and without registration on our site or playing online for real money on many Internet sites.\n\nThe structure of this video slot is simple and understandable to any player: classic 20 lines and 5 reels with a height of 3 characters. A lot of colorful heroes, original animation and thematic sound design of the game will not leave indifferent any fan of gambling. And the opportunityoose one of 11 languages ​​makes this slot truly internatio",
        image: "https://cdn.softswiss.net/i/s3/belatra/NeptunesKingdom.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:21BurnBlackjack": {
        title: "21 Burn Blackjack",
        description: "Multi Deck Blackjack game with \"Burn\" card functionality",
        image: "https://cdn.softswiss.net/i/s3/bsg/21BurnBlackjack.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/belatra:SevenFruits": {
        title: "Seven Fruits",
        description: "There is eternal classics everywhere – in music, movies and clothes. And even slot machines have their own timeless classics. What immediately comes to your mind when you imagine a slot machine? Of course, “fruits” and “sevens”. What started the history of the slot machine 100 years ago, exists to this day and has millions of fans around the world. But even the most “classical classics” can’t remain unchanged. It improves, changes and modernizes. That is how the new BELATRA “7 Fruits” online slot appeared. Meet the traditional fruit cocktail machine w",
        image: "https://cdn.softswiss.net/i/s3/belatra/SevenFruits.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:TheMoneymania": {
        title: "The Moneymania",
        description: "\"In God We Trust\" is written on every 1 dollar banknote of the United States of America. \"In Money We Trust\" – is a slogan of the new online slot from Belatra Games. This is a game with money, for money and about money. To be precise, it’s about the currency in which 80% of the world trade is calculated - the US Dollar. If coin ringing from the treasure hunting adventure games no longer attracts you, welcome to our online slot game “The Moneyma",
        image: "https://cdn.softswiss.net/i/s3/belatra/TheMoneymania.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:XmasGifts": {
        title: "X-mas Gifts",
        description: "Main Features:\r\n- Cascade Reels\r\n- Counting winnings by the number of \r\nsymbols\r\n- Purchase of Free Games\r\n- Multipliers in Free Games\r\n- Maximum number of Free Games is \r\n300\r\n",
        image: "https://cdn.softswiss.net/i/s3/belatra/XmasGifts.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:7thHeaven": {
        title: "7th Heaven",
        description: "Classic slot with great features! ",
        image: "https://cdn.softswiss.net/i/s3/bsg/7thHeaven.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:AtTheMovies": {
        title: "At The Movies",
        description: "Movie Theater themed 25 Line 5 Reel Slots3 GamePart of the informal \"Slots 2.5\" product line",
        image: "https://cdn.softswiss.net/i/s3/bsg/AtTheMovies.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:MegaGlamLife": {
        title: "Mega Glam Life",
        description: "MEGA GLAM LIFE is a gorgeous five reel, twenty line true 3D video slot highlighting the finer things in the world: fast cars, sleek yachts and unimaginable wealth. Boasting three tiered Progressive Jackpots, MEGA GLAM LIFE is rich with features including Scatter Pays and Sticky Wilds. The Jackpots can be won via the exciting Money Wheel Bonus Round, and the Free Spins mode whisks the player away to a tranquil tropical island, with warm sunset hues",
        image: "https://cdn.softswiss.net/i/s3/bsg/MegaGlamLife.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:NeonBar": {
        title: "Neon Bar",
        description: "If there are slots in the gaming world that all players know about, then these are definitely \"fruit\" slots. Once they used to be mechanical \"one-armed bandits\" that operated not only in casinos, but also in many other places throughout the USA. Precious \"cherries\" and \"lemons\" gathered in a line and brought a chewing gum as a win to a player. Oh yes, it was a chewing gum that was given to the winner as a prize during the ban on gambling activities in the US.\n\nOver the time, not only the prize in the form of a simple chewing gum was replaced with real money, but also slot machines switched from mechanical to electronic format, they received colorful graphics and a lot of various bonuses. But the \"fruit\" theme is eternal, it is still popular and beloved among players. BELATRA’s slot machine “Neon Bar” is modern classics. Favorite symbols in a new stylistic solution - the original bright neon will not let players get bored in this gamin",
        image: "https://cdn.softswiss.net/i/s3/belatra/NeonBar.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:SeadogsStory": {
        title: "Seadogs Story",
        description: "Pirate stories are always breathtaking and amazing. If you at once dreamed about a stormy sea, about a gusty wind with a salty taste of the sea, about treasure chests, then we know how to realize your dream in reality!\n\nSeadogs Story - online slot game from BELATRA. You can play for free and without registration on our website. Bright, atmospheric, fascinating - it's a video slot that tells you the story of one pirate ship...\n\n5 reels of 3 symbols each, 20 game lines - the game Seadogs Story is made in the best traditions of slots. In addition to the main game, there are several different bonuses and risk-games that will not let the player get bored and will increase the winnings. Like all BELATRA´s games, this online gaming machine is available in 11 languages: English, Spanish, French, Russian, German and many others",
        image: "https://cdn.softswiss.net/i/s3/belatra/SeadogsStory.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:BlackGold": {
        title: "Black Gold",
        description: "It's time to put on your cowboy hat and spurs when you play Black Gold! Join Ol' Bill the Oil Tycoon and his faithful steed as they wander the Texas range in search of Oil. Help Bill find the right spot to place his oil pumps and find the gushers hidden deep beneath the earth. You'll find yourself becoming filthy rich when you strike it big and fill your barrels with that Black Gold!",
        image: "https://cdn.softswiss.net/i/s3/bsg/BlackGold.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:ChristmasCarol": {
        title: "A Christmas Carol",
        description: "Relive an iconic piece of literature in this true 3D slot adaptation of Charles Dickens' A CHRISTMAS CAROL! Cower under the covers with callous old Ebenezer Scrooge as he is visited by the howling Ghosts of Christmas Past, Present and Future. Each of the Ghosts bring their own special power to the reels, including the Reverse Reels of Christmas Past! With WILD symbols and Free Spins, A CHRISTMAS CAROL will enrich your players and bring them a warm sense of the holiday season.",
        image: "https://cdn.softswiss.net/i/s3/bsg/ChristmasCarol.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:EuropeanBlackjack": {
        title: "European Blackjack",
        description: "Welcome to multi-hand European Blackjack. Six (6) decks of cards are used to play this variant. Each player plays only against the dealer (i.e. the bank), independently of other players. Your goal as the player is to draw cards (i.e. hit) until your hand adds up to 21, or comes as close as possible without exceeding 21. If your first two cards total 21, you have Blackjack!",
        image: "https://cdn.softswiss.net/i/s3/bsg/EuropeanBlackjack.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/pragmaticexternal:Baccarat": {
        title: "Baccarat",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Baccarat.png",
        keywords: "wallfair, crypto, casino, casual, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/belatra:NewYearMonkeyJackpot": {
        title: "New Year Monkey Jackpot",
        description: "Have you ever celebrated the New Year in the hot tropics? No? But in vain! It is very unusual! Hot yellow sand mixed with cold snow, not only vines but also icicles hang from the trees, and fluffy Christmas trees, decorated with all kinds of balls and garlands, live next to the palms. Isn't it unusual? And you can arrange such a New Year for yourself anytime and anywhere! Launch the new BELATRA online slot New Year Monkey Jackpot, where toucans wrapped in tinsel and all kinds of monkeys in funny Santa hats are waiting for you. Happy and warm New Year in every sense!\n\nOnly pleasant surprises should happen in the New Year, so the monkeys are happy to invite you to spin the reels of this slot and try your luck. It has 5 classic reels with 25 classic lines - the golden mean for slot games. A funny joker - an orangutan with a Hollywood smile - will replace any symbols to make the most successful ",
        image: "https://cdn.softswiss.net/i/s3/belatra/NewYearMonkeyJackpot.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:Sevens": {
        title: "Sevens",
        description: "There is a variety of games in BELATRA’s collection of online slot games - from classical to the most modern slots. The most traditional slot game i\"Sevens\". You can play this online slot machine for free and without registration on our website! “Sevens” is a classical slot game and its design reminds of the fi\"one-armed bandits.\" It has 5 lines and the most famous symbols in the history of slot machines - \"sevens\", \"cherries\", \"oranges\", \"bar\" and others. How long have you wanted to play “777” for free? The time has come",
        image: "https://cdn.softswiss.net/i/s3/belatra/Sevens.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/belatra:TheNightRacing": {
        title: "The Night Racing",
        description: "The city falls asleep, wake up ... street racers! Night racing is its own special, absolutely amazing world, full of adrenaline, drive and romance. The roar of engines and the screeching of brakes, maximum speed on the speedometer and the smell of burned rubber, neon signs of the city and blinding headlights, fearless and charismatic racers, beautiful and charming queens of the race ... Admit it, for sure at least once in your life you wanted to experience these vivid emotions and plunge headlong into the incredible atmosphere of night racing? Then welcome to the BELATRA online slot The Night Racing! Perfect detailing and maximum realism - this game is captivating and mesmerizing from the first seconds! Ready for the most amazing adventure of your life? 3… 2… 1… GO!",
        image: "https://cdn.softswiss.net/i/s3/belatra/TheNightRacing.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:AfterNightFalls": {
        title: "After Night Falls",
        description: "Cops and Robbers themed 30 Line 5 Reel Slots3 Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/AfterNightFalls.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:BambooRush": {
        title: "Bamboo Rush",
        description: "Brush aside the bamboo stems, take the mountain path, and discover a secret garden filled with endless opportunities in BAMBOO RUSH - the new 5X4 slot game from Betsoft Gaming.BAMBOO RUSH boasts 40 paylines that pay from left to right. As well as standing in forany other symbol in the base game, wilds also award multipliers of 2X or 3X during free spins,with a combined maximum of 27X the winning value per payline. Wilds can only appear in reels2 to 4.Seek out the treasured Golden Panda scatter to trigger BAMBOO RUSH's free spins feature,where you can win up to 20 free spins straight from the start, and the potential to uncover even more of them! All symbols are stacked during the base game and free spins except for the scatter, which can lead to wins of up to 53000x in a single spin!",
        image: "https://cdn.softswiss.net/i/s3/bsg/BambooRush.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:CharmsAndClovers": {
        title: "Charms And Clovers",
        description: "Somewhere, at the end of the rainbow, legendary treasure awaits you in a sylvan paradise. May the luck of the leprechaun be with you as you play CHARMS AND CLOVERS!\n\nFeaturing exciting features such as an added BONUS REEL for more fun & POTS OF GOLD filled to the brim with wealth, there’s never a dull moment in this clover-filled wonderland.\n\nTake your chances and find your fortune in CHARMS AND CLOVER",
        image: "https://cdn.softswiss.net/i/s3/bsg/CharmsAndClovers.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Dragon&Phoenix": {
        title: "Dragon & Phoenix",
        description: "Welcome to the court of DRAGON & PHOENIX, a lucrative realm filled to the brim with riches. Seek out the ROYAL COUPLE and MONEY TREE SCATTERS to win big in this rich 5X3 video slot game.Wealth and prosperity is just around the corner. The ROYAL COUPLE can appear on reels 2 to 5 and can expand to cover up the entire reel, potentially delivering huge wins of up to 8000x.If you're looking for a royal delight, search out the prized MONEY TREE SCATTERS. Collect up to 15 of them to receive prizes up to 500x INSTANTLY!Are you ready to discover the mysteries of the royal court in DRAGON & PHOENIX?",
        image: "https://cdn.softswiss.net/i/s3/bsg/Dragon&Phoenix.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:SuperSevensHappyWheel": {
        title: "Super Sevens Happy Wheel",
        description: "Gambling has always been common to a human - from ancient times to present days. Over millions of years games of chance have changed a great deal and transformed, they have become more complex, diverse and interesting. But each era had such gambling games that became real classics and never lost their popularity. A mix of the most popular games of chance during their entire history is presented in a new game – “Super Sevens Happy Whee",
        image: "https://cdn.softswiss.net/i/s3/belatra/SuperSevensHappyWheel.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:1": {
        title: "Launcher",
        description: "Technical entity, not a real game",
        image: "https://cdn.softswiss.net/i/s3/bsg/1.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:ZombieTown": {
        title: "Zombie Town",
        description: "\"It was the most ordinary evening, nothing foreshadowed trouble... I left the house and noticed a strange movement nearby. A man passed by. I called out to him. He turned and I froze with horror. A deathly pale face, empty eye sockets ... Before me stood zombies... \"- this is how many stories about the zombie apocalypse begin. Having appeared more than 50 years ago, they do not give up their positions today. Books are published in hundreds of languages and printed in millions of copies. Movies one after another become blockbusters... It's time to create a game where you can feel like a participant in the post-apocalypse events and fight with the real living dead! Welcome to Zombie Town!\nZombie Town is an incredibly atmospheric BELATRA online slot. It has its own storyline and vivid characters, excellent graphics and chilling sound effects. Having started playing the Zombie Town BELATRA slot machine online, it is impossible to stop. After all, this is a double passion - to escape from zombies and earn a good amount at the same time. Do you want to try Zombie slot for free without registration, SMS or download? Play directly on our official website free-slot.belatragames.com. Are you ready to take the risk and start playing big right now - play online for real money in Zombie Town? Nothing could be easier! Our partners - online casinos around the world - will easily provide you with this opportunity. The game has been translated into 14 languages of the world, so everyone can fight zombies!",
        image: "https://cdn.softswiss.net/i/s3/belatra/ZombieTown.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:Amazon": {
        title: "Max Quest: Amazon",
        description: "Max Quest: Mission: Amazon is an innovative, expansive role play and actionadventure experience offering rich gameplay, capped with popular social elements\nto keep players engaged and excited. This next provocative chapter in the Max Quest\nlegend will provide a mesmerizing level of engagement, including exciting prizes,\npriceless collectable treasures for quests, and several detailed avatars from which\nyour players can choose. These features will enrich both the players’ connection\nwith the characters and the gameplay to an unprecedented leve",
        image: "https://cdn.softswiss.net/i/s3/bsg/Amazon.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:BackToVenus": {
        title: "Back To Venus",
        description: "The Plant has returned and is prepared to take you BACK TO VENUS in this charming 5 reel, 20 payline video slot!Presenting two revolutionary Second Chance features, this delightful sequel will reach out andgrasp your players with its appealing alien plant theme. The Prickly Sticky and Respin feature willchoose a symbol at random, and continue respinning until there is a win with that symbol!The Plant can also exercise its alien power in the Flowering Wild Burst feature, awarding a FreeRespin and an increased chance for Asteroid WILDS to hit the reels!Frequent storms of Sticky Asteroid WILDS are possible with the Plant's presence. A secondscreen Free Spins mode that takes you to Venus, with a chance for multiplier WILDS, awaits youin the Rocketship. Climb in and take off for flowering fun in space!",
        image: "https://cdn.softswiss.net/i/s3/bsg/BackToVenus.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:CarnavalForever": {
        title: "Carnaval Forever",
        description: "Let the sound of the samba transport you to the streets of Rio de Janeiro with Carnaval Forever, the glittering new slot game that pulses to the open-air beat of the biggest show on earth. With millions of visitors every year, the Rio carnival (carnaval in the country's native Portuguese) is the largest of its kind in the world.Carnaval Forever captures all that celebratory atmosphere in its audio-visual presentation, with beautiful people and ornate floats making up the symbols, backgrounds festooned with brightly coloured feathers, and a soundtrack that pounds to the rhythms of the procession.Float symbols are wild, and can stand in for any other non-special symbol. But the centre of attention is the stunning Carnaval Queen, who weaves her way through the crowds, with free spins and multipliers following in her wake. Three or more Queens appearing at once will multiply the total stake by between 5X and 9X, and the Queen also leads the troupe towards Carnaval Forever's free spins feature, with anallocation of between 3 and 9 free spins.Like the festival itself, Carnaval Forever is an inclusive, triumphant game. Built around 10 straightforward paylines, the reels also feature a unique symbol that can reduce the cost of Betsoft's signature featurebuy-in mechanic to zero if enough are visible at once.",
        image: "https://cdn.softswiss.net/i/s3/bsg/CarnavalForever.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:PacoAndThePoppingPeppers": {
        title: "Paco and the Popping Peppers",
        description: "In an old town south of the border, overrun with despair and depression… Only one man can set things right again. TIME FOR FIESTA!\n\nJoin Paco and his charming salsa friends in this fun and exciting cascading reels slot machin",
        image: "https://cdn.softswiss.net/i/s3/bsg/PacoAndThePoppingPeppers.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:TheElusiveGonzales": {
        title: "Elusive Gonzales",
        description: "The Elusive Gonzales is a bright, colorful, dynamic online slot with colorful characters!\n\nThe actions take place in the country of tequila, sombrero and cacti in a human growth. A Mexican temperament slot game combines a classic slot with a lot of gangster bonuses and risk-games! You can play online on The Elusive Gonzales in many online casinos!",
        image: "https://cdn.softswiss.net/i/s3/belatra/TheElusiveGonzales.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:Birds": {
        title: "Birds",
        description: "Get twitterpaited with BIRDS! This adorable new Slots title will have you soaring up to the heights with excitement! The revolutionary reels and lovable avian characters each with their own cute personalities!  is set to capture your heart as you play. BIRDS! offers you a chance for unlimited free spins as you while away the day in the company of these fine feathered friends!",
        image: "https://cdn.softswiss.net/i/s3/bsg/Birds.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:ChilliPoptest": {
        title: "Max Quest Tournament",
        description: "MAX QUEST transplants the excitement of RNG-based slot gaming into an interactive shooting experience.Every bullet fired towards the shambling hordes has a chance to pay out or trigger a feature, and while Ra’s gauntlet will test players’ nerve, it never tests their aim.A missed shot will either ricochet until it finds a target, or return to the chamber along with its wager.As you progress through the rooms, sinking deeper beneath the sands in search of loot, your party will come toe-to-toe with different tiers of terrifying enemies and accrue an arsenal fit for a Pharaoh.Gem-crusted Scarab beetles scuttle, risen warriors sharpen their weapons, and the god’s own Shadowguard shuffle forward in their funeral sh",
        image: "https://cdn.softswiss.net/i/s3/bsg/ChilliPoptest.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:DrJekyllAndMrHyde": {
        title: "Dr. Jekyll & Mr. Hyde",
        description: "The delightful and sweet Dr. Jekyll hides a secret: a monstrous side of himself he keeps hidden away. Being a scientist, his only solution seems obvious: concoct a special potion he hopes will quell the monster within. But quiet the monster it does not, instead it had the opposite effect: THE MONSTER IS FREE!",
        image: "https://cdn.softswiss.net/i/s3/bsg/DrJekyllAndMrHyde.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Frankenslots": {
        title: "Frankenslot's Monster",
        description: "IT'S ALIVE! Mad Dr. Frankenslot has finally done it - he has built a random collection of bits and organs into a terrifying creature  - Frankenslot's Monster! In this hilarious retelling of the famous story, you will have the opportunity to control the monster yourself! What will you make it do? Win big with Scatter Pays and Wilds when you play FRANKENSLOT'S MONSTER!",
        image: "https://cdn.softswiss.net/i/s3/bsg/Frankenslots.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:GoldenHorns": {
        title: "Golden Horns",
        description: "Celebrate the Year of the Ox and follow his enchanted path to unimaginable luck and copious treasure inGOLDEN HORNS! Rejoice in the newest addition to the Red Dragon line in the latest video slot by Betsoft Gaming.3 reels, a single payline, yet a max win of over 25000x your bet awaits.Seek out the magnificent money tree, the glorious fishes and the lavish frogs, all waiting on the reels. Collect 3symbols in a line for even greater wins! Prepare for glory in a pile of gold with the generous CHARGE OF THEWILD OX!Guardian lions and gleaming lanterns line the halls on your path to boundless wealth, but it is the WILD OXthat is sure to make you smile. Each OX can bring with it a hefty multiplier, amplifying your wins. Get ready fora festival of fun in GOLDEN HORNS!",
        image: "https://cdn.softswiss.net/i/s3/bsg/GoldenHorns.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:KawaiiKitty": {
        title: "Kawaii Kitty",
        description: "Leap into the purr-fect pastel world of KAWAII KITTY! This innovative 3D video slot pays both ways for maximum chances to win, and features Wild Yarn balls that can expand to fill an entire reel! Join adorable Kitty as she plays with cute toys and wins your heart while you win credits!",
        image: "https://cdn.softswiss.net/i/s3/bsg/KawaiiKitty.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:TheWildlife2": {
        title: "The Wildlife 2",
        description: "Wildlife always fascinates and charms. With its boundless open spaces, unique beauty and incredibly vivid inhabitants. And it’s no surprise that everyone wants to see wild animals in their natural habitat - brown bears from the Siberian forests, exotic snakes from the African savanna and noble tigers from tropical places. Ideally, not just to see, but also to take a photo",
        image: "https://cdn.softswiss.net/i/s3/belatra/TheWildlife2.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:2MillionBC": {
        title: "2 Million B.C.",
        description: "Caveman themed 30 Line 5 Reel Slots3 Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/2MillionBC.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Angler": {
        title: "The Angler",
        description: "Cast your rod and reel in the wins with THE ANGLER! This five reel, twenty payline video slot features burly fisherman Otis and his endless quest for the perfect catch!\n\nJoin Otis as he fishes the tranquil lake on a pleasant afternoon. With Oyster Free Spins and Clingy Wilds, a frequently occurring Wild symbol and an innovative “Time To Fish!” bonus game, this fishing trip will be no ordinary day at the l",
        image: "https://cdn.softswiss.net/i/s3/bsg/Angler.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:BloodEternal": {
        title: "Blood Eternal",
        description: "Sink your teeth into BLOOD ETERNAL, the latest video slot to join Betsoft’s expanding Classics collection. With an expanded six-reel arrangement and dramatic bonus features, you’ll fall in love at first bite!\n\nVampire stories originate from the European areas, and we expect this to aid in the popularity of this title in those markets. Origins aside, we feel that the strong playability of the game will allow BLOOD ETERNAL to thrive in other, growing mark",
        image: "https://cdn.softswiss.net/i/s3/bsg/BloodEternal.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:ClashoftheGods": {
        title: "Max Quest: Clash of the Gods",
        description: "MAX QUEST transplants the excitement of RNG-based slot gaming into an interactive shooting experience.Every bullet fired towards the shambling hordes has a chance to pay out or trigger a feature, and while Ra’s gauntlet will test players’ nerve, it never tests their aim.A missed shot will either ricochet until it finds a target, or return to the chamber along with its wager.As you progress through the rooms, sinking deeper beneath the sands in search of loot, your party will come toe-to-toe with different tiers of terrifying enemies and accrue an arsenal fit for a Pharaoh.Gem-crusted Scarab beetles scuttle, risen warriors sharpen their weapons, and the god’s own Shadowguard shuffle forward in their funeral sh",
        image: "https://cdn.softswiss.net/i/s3/bsg/ClashoftheGods.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:FruitZen": {
        title: "Fruit Zen",
        description: "Relax and enjoy the peaceful views of FRUIT ZEN, the newest release in Betsoft Gaming's SLOTS3 ARCADE series. This fantastic slot machine features unparalleled 3D graphics, with lush moving water and incredible win effects. The gentle is sure to melt your stress away.Come, unwind and win with FRUIT ZEN.",
        image: "https://cdn.softswiss.net/i/s3/bsg/FruitZen.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:GoodGirlBadGirl": {
        title: "Good Girl, Bad Girl",
        description: "Innovative Multi-Model 3D Slot game. Players can choose between low volatility, high volatility, or both at the same time. 15 Line, 5 Reel Slot.",
        image: "https://cdn.softswiss.net/i/s3/bsg/GoodGirlBadGirl.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:LegendOfTheNile": {
        title: "Legend of the Nile",
        description: "Explore the timeless myths of Egypt in LEGEND OF THE NILE, the latest Classic Slots release from Betsoft Gaming! This6x6 cascading slot features cluster pays and exploding wins to build anticipation for the new symbols that cascadein from above.LEGEND OF THE NILE invites players to walk the Trails of the Gods: Isis, Queen of Heaven, Ra of the Sun and Anubis ofthe Underworld. Each of these Gods is represented by a high-value symbol and each winning combination of symbolscontributes to the respective Gods' trail, with each trail leading to thrilling payouts and features, such as free spins,massive 400x stake payouts, and even a progressive jackpot!",
        image: "https://cdn.softswiss.net/i/s3/bsg/LegendOfTheNile.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:VenetianRain": {
        title: "Venetian Rain",
        description: "Venice is always associated with water - the city is located on the islands of the Venetian lagoon separated by multiple canals, and it often rains here... But if the water element does not inspire you at all, and Venice does not seem to you to be the best place to travel, then we’ll be glad to over-persuade you",
        image: "https://cdn.softswiss.net/i/s3/belatra/VenetianRain.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:4Seasons": {
        title: "4 Seasons",
        description: "As time moves on and the seasons change, so too do we change and grow. Enter the gorgeous world of 4 SEASONS, based upon the ancient Chinese zodiac that has guided the steps of billions for years untold. From Horse to Snake, all the way around the wheel, each sign is present and ready to capture your heart. This game will leave you asking your friends: what's your sign?",
        image: "https://cdn.softswiss.net/i/s3/bsg/4Seasons.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:BookofDarkness": {
        title: "Book of Darkness",
        description: "Uncover the secrets of dark magic in BOOK OF DARKNESS, the latest 10 fixed payline video slot by Betsoft.Look for the mystical books and choose the hero to fight for in the CLASH FOR POWER bonus rounds!When the HUNTRESS and DARK WIZARD symbols align next to a BOOK symbol, the CLASH FOR POWERbegins. Choose your fighter and fill up the HERO METER by receiving wins with your chosen hero. If yourfighter wins, you'll be rewarded handsomely and start another bonus round.With the unique SHADOWFORM feature, get caught up in the action as the HUNTRESS and DARK WIZARDbattle to magnify your wins. If the DARK WIZARD won the CLASH FOR POWER, he will cause 5 symbols toexpand. If the HUNTRESS won the CLASH FOR POWER, she will award a 5x MULTIPLIER to any and all wins.Prepare yourself for a unique arcane fantasy, only to be found in the BOOK OF DARKNESS. ",
        image: "https://cdn.softswiss.net/i/s3/bsg/BookofDarkness.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:CuriousMachinePlus": {
        title: "The Curious Machine Plus",
        description: "Miles Bellhouse has invented the most Curious of Machines, one which can travel through space and time! Along with Gizmo, his trusty steam-powered robot, they will scour the past and protect their invention from the dastardly devious General Traytor, a stocky sort of man who suspects the machine has great military potential. So hop aboard for a trip through time and entertainment in MILES BELLHOUSE AND HIS CUROUS MACHINE!",
        image: "https://cdn.softswiss.net/i/s3/bsg/CuriousMachinePlus.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:QuesttotheWest": {
        title: "Quest to the West",
        description: "Get ready for an adventure of a lifetime. Follow the path of the Monkey King as you journey to lands unknown to discover riches of the West. Enjoy a classic Eastern Asian themed video slot with 5-reels,\n\n25 paylines, plenty of WILDS, free respins and a chance to instantly win x1000!",
        image: "https://cdn.softswiss.net/i/s3/bsg/QuesttotheWest.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:EuropeanRoulette": {
        title: "European Roulette",
        description: "Roulette is a simple game that gives players the chance to win big.\n\nOur Roulette is based on standard European Standard Single Zero Roulette, according to the standard rules of the Nevada Gaming Commission. An ivory ball circles in the rotating roulette wheel that consists of 36 numbers plus 0. Eventually, the ball stops randomly on one of the 37 random numbers. The player is to predict the outcome of each spin by placing bets in the fields of the Roulette table. Each player wagers against the bank, independently from other game participants.\n\nYour winnings will be based on how well you have predicted the ball’s final resting-place by placing your chips accordingl",
        image: "https://cdn.softswiss.net/i/s3/bsg/EuropeanRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, bsg, bsg"
    },
    "/softswiss-game/bsg:FruitZenSP": {
        title: "Fruit Zen",
        image: "https://cdn.softswiss.net/i/s3/bsg/FruitZenSP.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Great88": {
        title: "Great88",
        description: "The world of GREAT 88 presents opportunities to win like never before! This gorgeous game captures the essence of a peaceful evening, brimming with exquisite Asian-inspired detail and a novel bonus system that will keep your players searching for luck and good fortune with every spin!",
        image: "https://cdn.softswiss.net/i/s3/bsg/Great88.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Lost": {
        title: "Lost",
        description: "Indiana Jones/Egypt themed 30 Line 5 Reel Slot Machine Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/Lost.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/belatra:WinShot": {
        title: "Win Shot",
        description: "The history of a gaming machine began a long while, more than 100 years ago, in the United States of America. The first, most simple, slot machines appeared in the bars of San Francisco and very quickly became popular with the city-folks. A few days later, these machines were called \"one-armed bandits.\" \"One-armed\" - because to start the reels you had to pull down a special lever that looked like a hand, and \"bandits\" - because they would rather pump out money from people than let them win. In the future this name only got stronger, since the gambling activity in the US of the 1930s was going side by side with real bandits — gangsters. It happened so that the sound of spinning reels was easily combined with the sound of gun shots ... That prompted BELATRA Company to create a new online slot machine – “Win S",
        image: "https://cdn.softswiss.net/i/s3/belatra/WinShot.png",
        keywords: "wallfair, crypto, casino, slots, belatra, belatra"
    },
    "/softswiss-game/bsg:7FortuneFrenzy": {
        title: "7 Fortune Frenzy",
        description: "Get ready for big and plentiful wins in 7 FORTUNE FRENZY! This three standard reel, single payline slot\nfeatures a bonus reel with the potential for game-changing effects, making sure that each spin will have\nyour players on the edge of their seats.\nWith the majesty of space in the background, your players will enjoy the cool retro electronica theme as\nthey rack up wins. The game boasts a broad bouquet of bonuses, and any bonus is possible with each\nwinning spin — a 2x, 5x, or 8x multiplier on wins, an 8x or 18x boost to the player’s wager, or a free respin\nthat features its own multiplier on wins!\n7 FORTUNE FRENZY is the fast-paced, beautifully rendered slot your players have been looking ",
        image: "https://cdn.softswiss.net/i/s3/bsg/7FortuneFrenzy.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:DeadMansCove": {
        title: "Max Quest: Dead Man's Cove",
        description: "Max Quest: Dead Man’s Cove is an expansive role play and action-adventure\nexperience offering rich gameplay, capped with deep social elements. This\nsecond chapter in the Max Quest tale will provide a broad range of engagement,\nincluding exciting prizes, collectible treasures, Quests and customizable\nappearances. These features will enrich both the players’ connection with the\ncharacters and the gameplay to an unprecedented le",
        image: "https://cdn.softswiss.net/i/s3/bsg/DeadMansCove.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:EuropeanRouletteSP": {
        title: "European Roulette SP",
        image: "https://cdn.softswiss.net/i/s3/bsg/EuropeanRouletteSP.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:SingleDeckBlackjack": {
        title: "Single Deck Blackjack",
        description: "Welcome to multi-hand Single Deck Blackjack.\n\nThis variant is played with a single deck of cards, unlike standard Blackjack, which is played with 6 decks. Each player plays only against the dealer (i.e. the bank), independently of other players. Your goal as the player is to draw cards (i.e. hit) until your hand adds up to 21, or comes as close as possible without exceeding 21.\n\nIf your first two cards total 21, you have Blackjack!",
        image: "https://cdn.softswiss.net/i/s3/bsg/SingleDeckBlackjack.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/bsg:Gemmed": {
        title: "Gemmed!",
        description: "Win with gems of ALL shapes and sizes in GEMMED, the latest slots game by Betsoft. Featuring 40503 ways to win and an innovative reel system, hunting for wins has never been this fun.The game uses a 9x9 grid with special reels that allow for symbols of different sizes. Payouts areawarded via contiguous symbols, which are symbols that touch each other, either adjacent or diagonally. Bigger symbols are worth more as they will pay out ALL payline combinations that pass through them and form a winning combination.There's always action around the corner. With reels packed with symbols of all values and amazing wilds, you never know when the next win will come around! Look out for the GEM CLUSTERS to trigger the free spins round!Hunt for gems, make it shine and win big in GEMMED!",
        image: "https://cdn.softswiss.net/i/s3/bsg/Gemmed.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:GreedyGoblins": {
        title: "Greedy Goblins",
        description: "Fantasy Themed 30 Line 5 Reel Slots 3 Game.Unofficial Sequel to \"Once Upon A Time\"",
        image: "https://cdn.softswiss.net/i/s3/bsg/GreedyGoblins.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:DragonWilds": {
        title: "Dragon Wilds",
        description: "Fly high in Dragon Wilds, the 3x5, 20 lines videoslot. The dragons are always stacked in groups of 2 and when they hit, the multiply the win by 2x. Make your own fortune in the Free Spins where the stacked dragons have a random multiplier up to 15x' based on your choice!",
        image: "https://cdn.softswiss.net/i/s3/igtech/DragonWilds.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:BarbaryCoast": {
        title: "Barbary Coast",
        description: "This is the REAL Captain Blackbeard and me ruthless band of Pirates, seadog! Climb up the aft and join me hearties as we pillage and plunder along the BARBARY COAST. Hijack ships, search for buried booty, pillage land lubbers gold, and of course kidnap the fair Maiden. Ahhh yes, Captain Blackbeard and me crew have NO mercy in our quest for riches, larceny, and debauchery. Yarrrrrrrr!\n\nFeatures:\nDestroy reel with cannon to turn it BARBARY WILD REEL! Win Free Spins with your trusty Parrot!\nDashing Pick Me Instant Wins and more instant bonus features!\nExperience the excitement of the high seas with the Find the Treasure and Sea Battle Bonus Rounds!",
        image: "https://cdn.softswiss.net/i/s3/bsg/BarbaryCoast.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:ChilliPop": {
        title: "ChilliPop",
        description: "Spice things up with Chillipop, the cluster-based, cascading slot game with a secret ingredient: an expanding grid offering explosive new ways to win.From the Mariachi soundtrack to the potent chilli symbols, Chillipop is suffused with the spirit and sizzle of Mexican cuisine. Players try to assemble the perfect salsa, matching symbols like tomatoes, onions, garlic, and red, yellow, and green peppers to create the tastiest (and top-paying) combinations.Like the sauce itself, things can heat up quickly in Chillipop any configuration of 3 or more adjacent symbols pays out, and as items are added to the pot, new symbols cascade down to replace them. Couple this with the wild symbol - which can substitute for any ingredient, as well as creating stackedmultipliers when several appear on-screen and players can create maximum flavour from a single spin.The fiesta gets into full swing with the Free Spins feature, triggered by 3 or more pack mule scatter symbols appearing at once. Over an allocation of between 5 and 26 free spins, Chillipop then uses Betsoft's proprietary trail system to track the number of sombrero-sporting mules that players collect, with set milestones expanding the size of the cooking pot even further. From an initial 5x3 grid, the Free Spins feature can grow the playing area to a massive 8x8, with the new dimensions dramatically increasing the number of paylines.",
        image: "https://cdn.softswiss.net/i/s3/bsg/ChilliPop.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:DrawHiLo": {
        title: "Draw Hi-Lo",
        description: "Welcome to Draw Hi-Lo, an exciting, fast-paced card game.\n\nThe goal of the game is to guess whether the next card will be higher or lower than the previous card. If you guess correctly, you can keep playing to win even more or you can cashout at any time and collect your winnings",
        image: "https://cdn.softswiss.net/i/s3/bsg/DrawHiLo.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/bsg:FireandSteel": {
        title: "Fire & Steel",
        description: "Grim-dark Fantasy (Think: Game of Thrones) themed slot with a 3-4-5-4-3 reel arrangement and a unique spreading wild feature that also ties into a free spins feature with clingy wilds. Backstory is:One nation, split by a war that has burned for centuries. Two noble Houses, mired deeply in that war. And an unexpected threat that no one could have anticipated the Coming of the Dragons. Watch as the Houses of the Shieldmaiden and the Swordsman unite to fight back against the aggressive draconic invaders using their combined War Cry that can flip icons to Wilds and greatly increase chances for winning!",
        image: "https://cdn.softswiss.net/i/s3/bsg/FireandSteel.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:JungleStripes": {
        title: "Jungle Stripes",
        description: "Get lost wandering through the lavish jungles in the latest video slot by Betsoft Gaming Jungle Stripes!Make the exotic flowers and leaves tango with exciting features including wilds, scatters and free spins! Theexcitement awaits as you go in search of the majestic Jungle King, who will expand and lock your reels intoplace for free respin action!This 5 reel, 10 fixed payline slot takes you deep inside the wilderness, where the claws of the tiger will bringforward amazing win potential! The thrilling jungle hides all sorts of mysteries, but the Jungle King is the oneyou are looking for. The rumbling growl of the wild animal will easily shake up the calming atmosphere of JungleStripes!While the vibrant nature of the tropical forest sets the mood, wait for the special Moonglow symbols, whichserve as scatters! With glowing lotus flowers and fluorescent mushrooms growing from crystal rocks the junglehas become the magical destination for amazing action and big wins!",
        image: "https://cdn.softswiss.net/i/s3/bsg/JungleStripes.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:MegaGems": {
        title: "Mega Gems",
        description: "What do you get when you mix a video slot machine theme, features everyone loves and the high-end 3D touch only found in Betsoft Gaming products? MEGA GEMS!\nMega Gems is five reels and ten lines of lusciously coloured gemstones against a smoothly futuristic backdrop where the lines pay both ways.",
        image: "https://cdn.softswiss.net/i/s3/bsg/MegaGems.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:CaishensArrival": {
        title: "Caishen's Arrival",
        description: "Discover boundless wealth in the newest slots game by Betsoft Gaming  CAISHEN'S ARRIVAL!With the amazing blessings of Caishen, prepare to delve into a world of riches!CAISHEN's ARRIVAL features fast-paced slots gameplay with amazing possibility. Featuringa multiplier of over 35000x, the wins can reach the skies. Look out for the CAISHEN symbolwhich serves as a wild for huge wins!Stack 3 portraits of Caishen on a reel to trigger a FULL REEL WILD and receive a FREERE-SPIN! Earn additional riches by seeking out the COIN PURSE SCATTER, with 3 or moresymbols anywhere on the reel triggering a reward.Venture into a world of fortune in CAISHEN's ARRIVAL!",
        image: "https://cdn.softswiss.net/i/s3/bsg/CaishensArrival.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:DeucesWild": {
        title: "Deuces Wild",
        description: "Single Hand Machine",
        image: "https://cdn.softswiss.net/i/s3/bsg/DeucesWild.png",
        keywords: "wallfair, crypto, casino, video_poker, bsg, bsg"
    },
    "/softswiss-game/bsg:EventHorizon": {
        title: "Event Horizon",
        description: "It's said that nothing can escape from an Event Horizon  not even light. Combine this dazzling Any Way Pays video slot with duplicating reels and you have a game with wins so massive, your players will never want to leave. Every spin gives a chance for two, three, four or all five reels to sync up, spinning at the same time with the same matching symbols. These synced reels greatly increase each spin's chance of winning. With classic slot machine symbols (Cherries, Bells, Bars and 7s and gorgeous deep space graphics, this game unifies the new and the old in true Betsoft style.",
        image: "https://cdn.softswiss.net/i/s3/bsg/EventHorizon.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:GiovannisGems": {
        title: "Giovanni's Gems",
        description: "Visit a land of magical enchantment, where kingdoms are the home to Kings and Queens, Jokers and an Ogre?!\nIn Betsoft's newest smash hit OGRE EMPIRE, join the townspeople of a fantasy kingdom with a rather inconvenient Ogre problem! An innovative Day/Nigh",
        image: "https://cdn.softswiss.net/i/s3/bsg/GiovannisGems.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:LostMysteryChests": {
        title: "Lost Mystery Chests",
        description: "Return to the mysterious pyramids of Egypt with world-renowned archaeologist Dr. Dakota Bones in LOST: MYSTERY CHESTS! In this fascinating sequel to the hit game LOST, your players will go deep beneath sand and stone to discover untold treasures hidden in MYSTERY CHESTS on the reels.\r\n\r\nThis 3-reel, 3-row video slot offers unique mechanics to allow for those MYSTERY CHESTS to open when they land on the reels, revealing what lies within, anything from an instant cash win, high value symbols, WILDS, or SCATTERS symbols that lead to generous FREE SPINS!\r\n\r\nAnd during those FREE SPINS bonus rounds, the MYSTERY CHESTS are guaranteed to appear, offering huge chances to win! Between 3 and 9 MYSTERY CHESTS are possible with each FREE SPIN.",
        image: "https://cdn.softswiss.net/i/s3/bsg/LostMysteryChests.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:IncaJewels": {
        title: "Inca Jewels",
        image: "https://cdn.softswiss.net/i/s3/igtech/IncaJewels.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:MrMacau": {
        title: "Mr. Macau",
        description: "Join the inimitable Mr. Macau for a night on the town in the Las Vegas of the East – Macau! The latest 5 reel, 20 payline video slot by Betsoft Gaming highlights the glitzy and glamorous elements of the entertainment capital of Asia, and encompasses the very essence of gaming.\n\nMr. Macau is rich with features. The ensemble includes STICKY WILDS, MR. MACAU’S WILD BOOST and TRIPLE 7 FREE SPINS! With every spin without a win, there is a possibility that a random symbol will become STICKY on the reels and award a respin!\n\nWith the murmur of the crowds under a smooth jazz soundtrack, Mr. Macau whisks the player away to a playground of neon and strobing lights. It’s time to win big and relive those memorable simmering nights spent at luxurious ca",
        image: "https://cdn.softswiss.net/i/s3/bsg/MrMacau.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:PrimalHunt": {
        title: "Primal Hunt",
        description: "With multiplying multipliers, Free Spins, and\nmore, Primal Hunt takes you back to the lands of\nthe ice age, when the Cave Lion ruled the earth.",
        image: "https://cdn.softswiss.net/i/s3/bsg/PrimalHunt.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:DimSumPrize": {
        title: "Dim Sum Prize",
        description: "Feeling hungry? Come to the hottest food stand in town. The new Betsoft game DIM SUM PRIZE will keep you craving for more and more. Sit back, enjoy the teatime and get ready for hot buns, dumplings and exciting big wins!\n\nWith 5 reels and 10 lines of delicious prawns, steamed goodies and rice noodle rolls, your appetite will be more than satisfied. 3 Crimson Coupons award FREE SPINS! The Crimson Coupons transform into TEATIME WILDS that stay in place for the duration of the FREE SPINS round. The more TEATIME WILDS appear, the more respins will be triggered.\n\nA Bamboo Basket can appear anytime on the reels 2, 3 and 4. The Bamboo Basket surprises you with either a CRIMSON COUPON or a TEATIME WILD. Take it while it’s hot, get ready to spin and enjoy the spoils in DIM SUM PRI",
        image: "https://cdn.softswiss.net/i/s3/bsg/DimSumPrize.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Exterminator": {
        title: "The Exterminator",
        description: "Alvin Goodman is a simple man with a simple job: Catching mischievous critters and getting rid of them. Whether it’s aggressive bears, or unruly squirrels, Alvin takes on all comers big and small. However, he’s about to meet his match! A wily raccoon has taken up residence in the neighborhood and is causing all sorts of havoc! No trash can is safe from his plundering, and now Alvin needs your help to catch the dastardly raccoon! Come along and see all the wacky hijinx for yourself when you play The Extermina",
        image: "https://cdn.softswiss.net/i/s3/bsg/Exterminator.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Gladiator": {
        title: "Gladiator",
        description: "Gladiator themed 30 Line 5 Reel Slots3 Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/Gladiator.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Heist": {
        title: "Heist",
        description: "Bank Robber themed 30 Line 5 Reel Slots3 Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/Heist.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:MadderScientist": {
        title: "Madder Scientist",
        description: "Mad Scientist themed 30 Line 5 Reel Slots3 GameSequel to one of the original Slots3 Titles: Mad Scientist",
        image: "https://cdn.softswiss.net/i/s3/bsg/MadderScientist.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:NightInParis": {
        title: "A Night in Paris",
        description: "Take a breathtaking journey to the fabled City of Lights, straight into the Museum of Paris – where many priceless works of art are just waiting to be nabbed by the entertaining, yet hapless art thief Jacques.\n\nWorking to protect the museum from the thefts is the faithful security guard Jerome LaBaste. Accompanied by his trusty canine friend Pierre, they are bound and determined to stymie this villainous larceny and keep the art where it belongs – the mus",
        image: "https://cdn.softswiss.net/i/s3/bsg/NightInParis.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:BlueReef": {
        title: "Blue Reef",
        description: "The stirring crowd of the deep ocean is watching out for the great shark. Meet the inhabitants in Blue Reef the 5 Reels, 25 Lines videoslot. Dive deep into the blue to hunt for pearl oysters to get up to 33 freespins and 6x multiplier in the Pearl Hunter Free Spins round.",
        image: "https://cdn.softswiss.net/i/s3/igtech/BlueReef.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:SugarPop2DoubleDipped": {
        title: "Sugar Pop 2: Double Dipped",
        description: "Indulge in the reinvention of Sugar Pop, one of Betsoft's most popular games. In this incredible sequel, embrace all that was beloved about the original, with cluster wins and candies that explode in a cascade, allowing for additional wins. Revisit the enticing bright colors and welcoming, fluffy, cloud-like dreamland that is the setting of Sugar Pop. But don't get too comfortable, because things are about to change. In Sugar Pop 2: Double Dipped, everything has been reinvented, from leveling to the candies themselves.",
        image: "https://cdn.softswiss.net/i/s3/bsg/SugarPop2DoubleDipped.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:DragonKings": {
        title: "Dragon Kings",
        description: "Chinese myths come roaring to life in Dragon Kings, a modern take on a traditional tale, and a 3x5 slot game where the symbols are the real stars. Alongside Asian cornerstones like lucky coins and jade figurines, Dragon Kings reimagines the guardians of ancient China's seas as four standout, scaly symbols- all of them wild, and each with their own powers and identities.The centre reel is reserved for the eye-catching and even more powerful Dragon King, who builds on the individual dragon's blessings with his own 2x multiplier. The Dragon King also holds the keys to four tiered jackpots - from bronze to diamond.A special sixth reel contains a magical flaming pearl, which doubles the number of free spins awarded from scatter symbols (up to a possible 30). This symbol is essential for unlocking jackpots, in combination with the Dragon King and one or more of the other dragons.Line up all five dragons and receive a prize fit for a king: 2,000 coins!",
        image: "https://cdn.softswiss.net/i/s3/bsg/DragonKings.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:FaerieSpells": {
        title: "Faerie Spells",
        description: "Uncover the secrets of the undergrowth in Faerie Spells, the 3x5 videoslot where woodland spirits brew potions in the shadows, and any toadstool can hide a hoard of treasure.A traditional alternative to modern fairytales, the symbols in Faerie Spells paint the natural world as a place of uncharted wealth and wonder. Faeries and pixie princesses are joined by wild, green-bearded tree guardians, will the wisps, and glowing, magical trees. The ruler of the realm, the Faerie Queen, can conjure two different features: her aura causes toadstools to reveal their riches, in the form of multiples ofthe player's bet and three or more of her royal symbols triggers the unique jackpot game.Taking place on a special playfield in the Faerie Queen's hidden workshop, Betsoft's signature shared jackpot feature challenges players to collect special potion phials over the course of 10, 15, or 25 free spins. Every drop of potion collected contributes to one of four tiered jackpot recipes being concocted by the queen: the Spells of Plenty, Luxury, Wealth, and Riches. When a symbol is collected, it's removed fromthe reels and other special symbols cascade down in a magical shower. With Betsoft's innovative \"Buy-In\" feature, players can pay to trigger the max number of free spins on demand as many times as they like.",
        image: "https://cdn.softswiss.net/i/s3/bsg/FaerieSpells.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:GlamLife": {
        title: "Glam Life",
        description: "Luxury/Glam themed 30 Line 5 Reel Slots3 Game with Progressive Jackpot",
        image: "https://cdn.softswiss.net/i/s3/bsg/GlamLife.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:MagicShoppe": {
        title: "Magic Shoppe",
        description: "As you walk down the dark and narrow alley, you are inexplicably drawn to the mysterious shop on the left. The door creaks and a curtain of old spider-webs parts as you enter THE MAGIC SHOPPE, well known for its occult offerings from places near and far. This new 5 reel, 25 payline true 3D video slot from Betsoft boasts a special feature that allows any free spin to win a prize!",
        image: "https://cdn.softswiss.net/i/s3/bsg/MagicShoppe.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:OasisPoker": {
        title: "Oasis Poker",
        description: "Oasis Poker is a variant of the classic Caribbean Stud Poker. It holds similarities both to Blackjack and to Video Poker.\n\nThe player plays against the dealer, independently of other players. Your goal as the player is to beat the dealer’s han",
        image: "https://cdn.softswiss.net/i/s3/bsg/OasisPoker.png",
        keywords: "wallfair, crypto, casino, poker, bsg, bsg"
    },
    "/softswiss-game/bsg:RedDog": {
        title: "Red Dog",
        description: "Welcome to Red Dog, a simple but exciting, fast-paced card game. The dealer will deal 2 cards. If the 2 cards are of the same value, a 3rd cart is dealt. If the result is a tie, it results in a push. If the result is a 3 of a kind, you will win 11 to 1. Otherwise, you will be prompted to ride or stand, based on whether or not you believe the 3rd card will fall in between the values of the previous 2 cards.",
        image: "https://cdn.softswiss.net/i/s3/bsg/RedDog.png",
        keywords: "wallfair, crypto, casino, poker, bsg, bsg"
    },
    "/softswiss-game/bsg:Slotfather": {
        title: "Slotfather",
        description: "I’ll offer them a jackpot they can’t refuse… The Infamous words spoken by The Slotfather, the secret underworld Boss of all slots, big and small. The one man that holds all the strings, controlling an organized syndicate of slots stretching across the city and beyond… that man is The Sl",
        image: "https://cdn.softswiss.net/i/s3/bsg/Slotfather.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:FruitbatCrazy": {
        title: "Fruitbat Crazy",
        description: "A new slant on traditional slots, Fruitbat Crazy stars a cheeky bat who's always on the prowl for food - looking to sink his fangs into clusters of melons, berries, citrus fruits and cherries.In Fruitbat Crazy, clusters of low-value symbols always pop first, allowing higher-paying stacks to mount up before splattering them in one big explosion. Unlike other cascading slots, Fruitbat Crazy's roster of symbols also collapse on a combo-by-combo basis, with smaller wins resolving before triggering their own collapses creating the chance for some seriously succulent payouts.Beyond the 3X5, 243 ways to win base game, Fruitbat Crazy earns its name in the free spins feature: find 3 or more Fruitbat symbols and a whole flock will descend from the trees and gorge themselves over the course of 10 or more free spins.",
        image: "https://cdn.softswiss.net/i/s3/bsg/FruitbatCrazy.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:GoldTigerAscent": {
        title: "Gold Tiger Ascent",
        description: "Take a journey into the high mountains in GOLD TIGER ASCENT, the latest video slot from Betsoft Gaming! This 3-reel, 3 row video slot, featuring an iconic golden tiger character, pays on 3 of a kind on any payline.\r\n\r\nInnovative functionality allows for MAGIC RED ENVELOPES to appear on the reels, and these ENVELOPES can reveal WILDS, instant cash wins, high value symbols, and even SCATTERS that pay and offer generous FREE SPINS!\r\n\r\nDuring FREE SPINS mode, the MAGIC RED ENVELOPES have even more power: there can be up to 5 ENVELOPES with SCATTERS, and up to 9 ENVELOPES with other symbols! This offers unprecedented chances to win!",
        image: "https://cdn.softswiss.net/i/s3/bsg/GoldTigerAscent.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:LavaGold": {
        title: "Lava Gold",
        description: "Things are about to get hot in LAVA GOLD – the latest 5×5 grid cluster-based game by Betsoft Gaming! With multiple features, including VOLCANO WILDS, FREE SPINS and CLUSTER WINS, the newest slot provides your players with a rich and vivid experience, both graphically and functionally.\n\nLAVA GOLD brings you to a volcanic island, a world of enormous and spine-chilling dinosaurs. Go on a dinosaur egg hunt across the steaming grounds of the archipelago and try not to get caught in the claws of the flying Pterodactyl or the frightening T-Rex! Let the tangles of twigs and leaves guide you to the VOLCANO, which is a WILD symbol!\n\nThe ground shakes as the LAVA METER fills up and FREE SPINS are awarded. During FREE SPINS mode, the central column of the grid will be made up of an identical symbol, guaranteeing a win! Each FREE SPIN during FREE SPINS mode has a growing multiplier. The first FREE SPIN awards a 1x multiplier on wins, and it progresses from there up to a 10x multipli",
        image: "https://cdn.softswiss.net/i/s3/bsg/LavaGold.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/pragmaticexternal:HotSafari50000": {
        title: "Hot Safari 50 000",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/HotSafari50000.png",
        keywords: "wallfair, crypto, casino, lottery, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/bsg:MilesBellhouseAndtheGearsOftime": {
        title: "Miles Bellhouse and the Gears of time",
        description: "Miles Bellhouse has been experimenting with Time again! Take a trip of a lifetime and seek out timeless riches with him in this new uniquely crafted 5×5 grid slot by Betsoft where the Past, the Present and the Future provide a new and exciting gameplay experience!\n\nWith every spin, the game will randomly select 5 positions which may be covered by a winning Cluster at the end of each cascade. The more winning Clusters that cover selected positions, the greater chance to trigger one of the special Time Traveling features!\n\nJoin the suspense as Miles Bellhouse finds his way through Past, Present and Future, and magnify your wins with time charged wilds",
        image: "https://cdn.softswiss.net/i/s3/bsg/MilesBellhouseAndtheGearsOftime.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:PaiGow": {
        title: "Pai Gow",
        description: "Table Poker",
        image: "https://cdn.softswiss.net/i/s3/bsg/PaiGow.png",
        keywords: "wallfair, crypto, casino, poker, bsg, bsg"
    },
    "/softswiss-game/igtech:OutbackHeat": {
        title: "Outback Heat",
        image: "https://cdn.softswiss.net/i/s3/igtech/OutbackHeat.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:RiseOfTheMummy": {
        title: "Max Quest: Rise of the Mummy",
        description: "MAX QUEST transplants the excitement of RNG-based slot gaming into an interactive shooting experience.Every bullet fired towards the shambling hordes has a chance to pay out or trigger a feature, and while Ra’s gauntlet will test players’ nerve, it never tests their aim.A missed shot will either ricochet until it finds a target, or return to the chamber along with its wager.As you progress through the rooms, sinking deeper beneath the sands in search of loot, your party will come toe-to-toe with different tiers of terrifying enemies and accrue an arsenal fit for a Pharaoh.Gem-crusted Scarab beetles scuttle, risen warriors sharpen their weapons, and the god’s own Shadowguard shuffle forward in their funeral sh",
        image: "https://cdn.softswiss.net/i/s3/bsg/RiseOfTheMummy.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:StayFrosty": {
        title: "Stay Frosty!",
        description: "Celebrate the holiday season with a warm mug of cocoa and STAY FROSTY! This 5-reel, 100 payline video slot is bursting with holiday cheer and innovative Sticky WILDS that stay Stickyw for 2 spins when part of a winning combination! The Snowman symbol is WILD and varies in size from small to tall!",
        image: "https://cdn.softswiss.net/i/s3/bsg/StayFrosty.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:GoldCanyon": {
        title: "Gold Canyon",
        description: "Polish your spurs, saddle up and get ready for a pistol-shooting, treasure-hunting & reel-spinning action in Gold Canyon. A dynamite new take on traditional 5X3 video slots.The treasures of Gold Canyon are sure to provide super wins, but even better is theappearance of the MYSTERIOUS DRIFTER, when he spins into the arena, things will get a little more WILD!Watch out for the explosives in the canyon of riches, three or more pieces of DYNAMITE will trigger free spins.Will you be the one to find the treasures of the GOLD CANYON?",
        image: "https://cdn.softswiss.net/i/s3/bsg/GoldCanyon.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:JumboJoker": {
        title: "Jumbo Joker",
        description: "Start hauling in the credits with Betsoft's fresh, fun take on the classic fruit machine format - JUMBOJOKER!This fast paced, brightly-coloured traditional fruit machine will capture and keep your players' attention as they go for big MYSTERY WINS in the JUMBO METER mode, which offers higher payouts. The JUMBO METER mode becomes active whenever a win of at least 20 coins occurs on the bottom reels. The winnings from the bottom reels are transferred to the JUMBO METER, where they can either be collected immediately, or used to play on the upper reels, which offer higher wagers and higher payouts.In the best fruit machine tradition, JUMBO JOKER offers a taste of classic fruit iconography and retro-styled audios that will be familiar and comfortable, while the exciting gameplay and high definition graphics brings this classic genre into the modern age.JUMBO JOKER offers players a level of control and strategy that sets it apart from other traditional slot games. By choosing when and how to use the JUMBO METER mode, and the higher payouts it offers, JUMBO JOKER rewards players with a compelling gaming experience and tantalizing wins.",
        image: "https://cdn.softswiss.net/i/s3/bsg/JumboJoker.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:MammaMia": {
        title: "Mamma Mia",
        description: "Renowned chef Salvatore welcomes you to his kitchen in Mamma Mia! Take on the role of Salvatore's Sous-Chef and help him to create wonderful works of culinary art, such as gourmet pizza and panna cotta. But watch out! The cold-hearted food critic, Alberto Ranbomzi, is rumored to visit the restaurant any day now! Will you be able to help Salvatore save the day by helping him to create his perfect dish? Buona Fortuna!",
        image: "https://cdn.softswiss.net/i/s3/bsg/MammaMia.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:OgreEmpire": {
        title: "Ogre Empire",
        description: "Visit a land of magical enchantment, where kingdoms are the home to Kings and Queens, Jokers and an Ogre?!\nIn Betsoft's newest smash hit OGRE EMPIRE, join the townspeople of a fantasy kingdom with a rather inconvenient Ogre problem! An innovative Day/Night cycle switches up gameplay and allow players to experience what life is like for the people who live in the town.\nDuring the day, the Ogre is awake and active while the townsfolk sleep. And it' no wonder, as the Ogre will occasionally smash stone symbols, offering extra rewards! Once night falls, the Ogre will drift to sleep and the townsfolk emerge from their stone homes. Only appearing on the reels during night mode, they bring with them royal rewards! Higher payouts aren't the only benefit of night mode: the Joker emerges as well and brings with him merriment and 2x WILD WINS!\nThe Joker certainly isn't the only wild find in this kingdom! Both Day and Night offer a special WILD flower blossom. Watch the magic grow and expand, as each flower blossoms and grows or shoots spores, turning other symbols on the reels WILD!\nIn OGRE EMPIRE the struggle is reel and the rewards are nothing short of mythical!",
        image: "https://cdn.softswiss.net/i/s3/bsg/OgreEmpire.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/pragmaticexternal:bingo": {
        title: "Bingo",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/bingo.png",
        keywords: "wallfair, crypto, casino, lottery, bingo, pragmaticexternal"
    },
    "/softswiss-game/bsg:Pinocchio": {
        title: "Pinocchio",
        description: "PINOCCHIO features multiple game levels offering unique features including: Fairy Re-Spins, Pinocchio Wandering Wilds and much more! Travel to School and find the Scatter Wild Books or to the Stage and discover the Dancing Wild reel. When in secondary worlds, all wins are doubled!",
        image: "https://cdn.softswiss.net/i/s3/bsg/Pinocchio.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:RockStar": {
        title: "RockStar",
        description: "I was born to rock\nEverybody knows that it’s true\nI hear people talk\nThey say that I rock, and I do!\n‘Cause I’m a rock star, baby\nI rule the world with my guitar\nAnd people love me\nOh, because I’m a r",
        image: "https://cdn.softswiss.net/i/s3/bsg/RockStar.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Super7Blackjack": {
        title: "Super 7 Blackjack",
        description: "Super 7 Blackjack is an exciting multi-hand Blackjack that allows you to play up to 3 simultaneous hands of Blackjack. Each hand plays only against the dealer (i.e. the bank), independently of other hands. Six (6) decks of cards are used to play. Your goal as the player is to draw cards (i.e. hit) until your hand adds up to 21, or comes as close as possible without exceeding 21. If your first two cards total 21, you have Blackjack.\n\nSidebets: The Super 7 bonus side game gives you the chance to win up to an additional 5000.00 depending on what cards you receive.",
        image: "https://cdn.softswiss.net/i/s3/bsg/Super7Blackjack.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/bsg:HatTrickHero": {
        title: "Hat Trick Hero",
        description: "Game on! Football season is here. Go for the POWER SHOT and score the winning goal for big prizes in HAT TRICK HERO! With 5 reels, 25 paylines and exciting features, the latest video slot from Betsoft Gaming will put you right in the spotlight of the football field.\n\nWatch out for the special POWER SHOT WILDS, which substitute for all other symbols. Find 3 or more of them on the reels to trigger the HAT TRICK HERO event! During these rounds, any POWER SHOT WILD symbols will move one reel to the left until they have left the reels, potentially stacking up for immense wins.\n\nGet ready for your moment of glory! Each time a POWER SHOT symbol exits the reels, it will raise the SCORE METER by one level. Collect more POWER SHOT symbols to trigger more respins. Collect 15 POWER SHOT symbols to fill the SCORE METER, awarding you with an instant 1000x win.",
        image: "https://cdn.softswiss.net/i/s3/bsg/HatTrickHero.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:LuckySeven": {
        title: "Lucky Seven",
        description: "Traditional 3 Reel 1 Line Slot Game",
        image: "https://cdn.softswiss.net/i/s3/bsg/LuckySeven.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:MrVegas": {
        title: "Mr. Vegas",
        description: "Join the inimitable Mr. Vegas and his beautiful starlet companions for a night on the town in the City of Second Chances! By incorporating the glitzy glamorous elements of the Entertainment Capital of the World into one very spectacular 3D slot game, the ground-breaking Mr. Vegas transcends all player genres and encompasses the very essence of gaming.\n\nMr. Vegas encompasses the same style that is the hallmark of Slots3 – visually stunning 3D graphics comparable to that of a studio feature film and a dynamic soundtrack all of which combine to provide the most immersive slots gaming experience to players.\n\nBonus rounds include classic Las Vegas casino games, such as Roulette, the thrilling Money Wheel and a Mini-Slot within a Slo",
        image: "https://cdn.softswiss.net/i/s3/bsg/MrVegas.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:PuppyLovePlus": {
        title: "Puppy Love Plus",
        description: "Come on down to the Puppy Store and see what breed of dog will be the perfect pooch to make a part of your lucky family!\n\nThis video slot machine offers Free Spins, Wilds and Scatters! You can also browse and buy your perfect puppy in the Puppy Store Bonus Round.",
        image: "https://cdn.softswiss.net/i/s3/bsg/PuppyLovePlus.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:SinCityNights": {
        title: "Sin City Nights",
        description: "Relive those memorable simmering nights spent in the City of Sin with SIN CITY NIGHTS!\n\nThe big bright lights of Las Vegas are brought to you under a pure funk soundtrack in this explosive cascading reels 3D video slot. All sinners welcome.\n\nIt’s time to win big and enjoy your time in SIN CITY NIGHT",
        image: "https://cdn.softswiss.net/i/s3/bsg/SinCityNights.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Stacked": {
        title: "Stacked",
        description: "Slip into the magic of the reels with Stacked, the latest 4 reel, 20 fixed payline video slot by Betsoft Gaming.The Magician has many tricks and secrets up his sleeve, so keep your eye on him! Featuring a variety offeatures and a dynamic free spins mode, there is plenty of fun to be had!Enjoy the show as the Magician fixes the reels in your favor and lets you look into the Mystery Boxes,which will reward you with FREE SPINS! The deck flips and all reel spots get turned upside down. Before theFREE SPINS mode begins, you will be able to choose your spots on the reels that award unique effects.Powerful magical effects are lurking beneath these spots, if you dare to explore them. Look out for the specialattributes that can enhance your FREE SPINS mode! These attributes can stack and occur together during FREESPINS. Don't tell anyone. It's a secret!",
        image: "https://cdn.softswiss.net/i/s3/bsg/Stacked.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:ThaiBlossoms": {
        title: "Thai Blossoms",
        description: "Discover a lush jungle paradise where the scent of fruit is heavy in the misty air. THAI BLOSSOMS, the latest Betsoft video slot, offers a gorgeous thematic backdrop of Southeast Asia. Luxuriate in a tropical wonderland as you play this exciting new game.\r\nThis 5-reel, 100 payline video slot features stacking WILDS that stay Sticky for 2 spins when occurring on a winning payline. The grand elephant, lord of the fragrant jungle, trumpets triumph in groups of 3 or more, granting access to a generous FREE SPINS mode where the stacking WILDS remain Sticky and persist until the end of the bonus round.",
        image: "https://cdn.softswiss.net/i/s3/bsg/ThaiBlossoms.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:MonsterPop": {
        title: "Monster Pop",
        description: "Immerse yourself in the frantic world of MONSTER POP, the latest cluster pays slot by Betsoft Gaming.Collect stacks of monsters, enjoy a variety of features and expand your playing grid to burst your waythrough to AMAZING wins.Featuring eye-popping visuals, MONSTER POP brings fast-paced gameplay with exciting action. Start out your monster adventure with a 5x5 grid that expands with the MONSTER CLONER SYMBOL by duplicating a row, column, or both - and adds WILDS in the mix for extra chances to win!Watch out for special FLAMING SPHERE SYMBOLS, which grant you free spins to keep the action going,with a potential for even more respins. Don't fret if you don't get a winning spin, as MONSTER FURY cantrigger at the end of a cascade to create reactions that will spark off big wins!Don't you dare stop, get ready to MONSTER POP!",
        image: "https://cdn.softswiss.net/i/s3/bsg/MonsterPop.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Pirate21": {
        title: "Pirate 21",
        description: "Pirate 21 is an exciting multi-hand Blackjack that allows you to play up to 3 simultaneous hands of Blackjack.\n\nEach hand plays only against the dealer (i.e. the bank), independently of other hands. Six (6) Spanish decks of cards are used to play. A Spanish deck contains no 10s. Your goal as the player is to draw cards (i.e. hit) until your hand adds up to 21, or comes as close as possible without exceeding 21. If your first two cards total 21, you have Blackjack.",
        image: "https://cdn.softswiss.net/i/s3/bsg/Pirate21.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/bsg:RooksRevenge": {
        title: "Rook's Revenge",
        description: "Everyone’s favorite Aztec Chief, Rook, is at it again in this amazing 5 reel, 25 line Cascading Reels slot machine. Journey into the heart of the rainforest and the hidden treasure vault in the Rook’s Revenge Free Spins Mode! Riches beyond imagination are waiting for you, with cascading wins that award up to a 15x multiplier during Free Sp",
        image: "https://cdn.softswiss.net/i/s3/bsg/RooksRevenge.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:SlotsAngels": {
        title: "Slots Angels",
        description: "Ridin’ down the highway, Feelin’ like a king, On my way to winnin’… Winnin’ everything. I can feel it inside me, I can feel it a lot, Very soon I’ll be playin’, Playin’ some slots!\nWere you Born to Spin? Then come join the notorious biker gang, the “Slots Angels” as they cruise the desert in search of the big Progressive Jackpot! As an honorary member, you’llÂ have the honor of hanging out with the rest of the gang at their favorite dive bar, and cheer them on as they race across",
        image: "https://cdn.softswiss.net/i/s3/bsg/SlotsAngels.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TowerofFortuna": {
        title: "Tower of Fortuna",
        description: "Welcome to the TOWER OF FORTUNA, where the Goddess of Luck, Fortuna, rules with a fair hand.\nThis 3-reel, 5 payline game features revolutionary tower-climbing mechanics, taking your player on\na journey up endless levels of the tower every time they lose a spin.\nBut because Fortuna is fair, she increases a multiplier with every losing spin that is then applied to\nthe player’s eventual winning spin, returning them to the first level of the tower again.\nFortuna gives and takes in a cycle that is beautifully represented in this unique slot, quite unlike any\ngame availabl",
        image: "https://cdn.softswiss.net/i/s3/bsg/TowerofFortuna.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TakeTheBank": {
        title: "Take The Bank",
        description: "Are you ready for the heist of a lifetime? Welcome to TAKE THE BANK, a fast-paced slot with big, big payouts. Rob the bank and run away with the goods in an exciting adventure with sticky wilds bonus rounds and superb potential!5 reels, 75 paylines, but unlimited is to be had. Watch out for the HEIST SPINS every spin brings you closer to a bomb explosion. Collect robbers on the reels and every 10 spins they will turn into a WILD symbol, busting the vaults wide open.Keep your eyes peeled for the police, as 3 bonus symbols will trigger the FREE SPINS. Catch the handful of wilds running around during the robbery and participate in the heist of a lifetime.TAKE THE BANK is fast, explosive, and ready to bring out the big wins.Break the vaults and win big in TAKE THE BANK!",
        image: "https://cdn.softswiss.net/i/s3/bsg/TakeTheBank.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TipsyTourist": {
        title: "The Tipsy Tourist",
        description: "THE TIPSY TOURIST brings you into the world of Gary, a hardworking fellow who sets off on a fabulous late summer holiday to beautiful Miami, Florida. Gary guides you on the reels through many exciting bonus features, such as the Double Up Mini Game, where you can increase any standard win when you choose the right card! The Free Spins mode and Scatter Pays offer many chances to win, and you can join Gary himself in a drinking contest in the interactive Bonus Round",
        image: "https://cdn.softswiss.net/i/s3/bsg/TipsyTourist.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:VikingAge": {
        title: "Viking Age",
        description: "Join Amma as she explores the secrets held within the reels including instant free creates and cinematic camera movement IN GAME! Be part of the action with this exciting 5-Reel video slot.. Only from Betsoft Gaming.",
        image: "https://cdn.softswiss.net/i/s3/bsg/VikingAge.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:GenieGoneWild": {
        title: "Genie Gone Wild",
        description: "Genie Gone Wild is a 50 lines, 4x5 videoslot.  The Genie is stacked on all reels and substitutes for all symbols. When you find the magic lamp, he grants three wishes Raining Wilds Free Spins, Sticky Wilds Free Spins or a direct cash award.",
        image: "https://cdn.softswiss.net/i/s3/igtech/GenieGoneWild.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:MoreGoldDiggin": {
        title: "More Gold Diggin",
        description: "Those crazy miners are at it again in MORE GOLD DIGGIN’ Join Jeb and Cletus as they mine and blast their way to incredible riches! And it’s not just gold they’re after this time, now there’s Diamonds, Silver, Oil and much more to dig for! This 5 reel 25 line Cascading Reels slot game features gorgeous HD True 3D graphics and a pulse-pounding free spins mode that features up to a 15x mul",
        image: "https://cdn.softswiss.net/i/s3/bsg/MoreGoldDiggin.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Pontoon": {
        title: "Pontoon",
        description: "Pontoon is an exciting multi-hand Blackjack that allows you to play up to 3 simultaneous hands of Blackjack.\n\nEach hand plays only against the dealer (i.e. the bank), independently of other hands. Eight (8) decks of cards are used to play. Your goal as the player is to draw cards (i.e. hit) until your hand adds up to 21, or comes as close as possible without exceeding 21. If your first two cards total 21, you have Blackjack.\n\nAdditionally, if you get a “pontoon” which is a 5 card hand that has not busted, it will also count as a ",
        image: "https://cdn.softswiss.net/i/s3/bsg/Pontoon.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/bsg:SafariSam": {
        title: "Safari Sam",
        description: "SAFARI SAM is a breathtaking five reel, thirty line video slot, bursting with exciting elements such as frequent free spins and a zany bonus round that will leave you thirsting for more adventure!",
        image: "https://cdn.softswiss.net/i/s3/bsg/SafariSam.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TheGoldenOwlofAthena": {
        title: "The Golden Owl of Athena",
        description: "Journey to ancient Greece and unlock the secret of great reward with the Golden Owl of Athena. In this visually stunning 3x5 classic slot, The Golden Owl is the key. Harnessing the wisdom of the ages, Athena's Owl offers up to 20 Free Spins. However, as a wellspring of knowledge, the Golden Owl offers more thanjust Free Spins. This majestic creature also awards Scatter wins and acts as Wild for all other symbols on the reels.The will of Athena takes over during Free Spins and anoints a single symbol at random. Should that symbol be scattered along the reels during Free Spins, the symbols will expand to fill the reel, awarding bonus wins. Follow the Golden Owl and she will lead to eternal reward in The Golden Owl of Athena.",
        image: "https://cdn.softswiss.net/i/s3/bsg/TheGoldenOwlofAthena.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:SpinfinityMan": {
        title: "Spinfinity Man",
        description: "When crime plagues the streets of Metropolis, SPINFINITY MAN will answer the call! With the help of amazing wild symbols, an arsenal of superpowers and the evil Mr. X to fight against, SPINFINITY MAN is here to become the saviour of the city!\n\nA fun and frivolous take on the golden age of superhero comics, SPINFINITY MAN is a cluster-based, cascading game where groups of more than 4 of the same symbols explode to form winning combinations. SPINFINITY MAN’s randomly-chosen powers are drawn as animated 2×2 symbols – triggering new cascades and launching an avalanche of big wins. Laser eye beams burn away either a full column or a full row of symbols, or both if you find a double beam. Icy breath can freeze and shatter a small or large cluster of symbols. Telepathy will remove all symbols of a single type or colour.\n\nWith his face on every newspaper in town, SPINFINITY MAN has more than his share of admirers. Everywhere he goes – from base game to free spins feature – his dedicated fangirl follows, hopipicture with her idol. When she snaps a photo, a cluster of symbols will pop and trigger an immediate cascade. The fangirl cluster count resets with every new spin – giving SPINFINITY MAN the chance to prove himself (and pose for more selfies) all over again.\n\nWhile solving street-level crime is all in a day’s work for SPINFINITY MAN, a more insidious evil is encroaching on the city! Super villain Mr. X is developing his next dastardly master plan. It’s up to our hero to follow the clues, fill a dedicated Mr. X meter, and catch him red-handed in a city-shaking bonus round! Here the two super humans go head-to-head, but Mr. X has an advantage: he’s replaced all SPINFINITY MAN’s power symbols with his own and increased the odds of them appearing. Get ready for the blockbuster of the summer in SPINF",
        image: "https://cdn.softswiss.net/i/s3/bsg/SpinfinityMan.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TakeTheKingdom": {
        title: "Take The Kingdom",
        description: "TAKE THE KINGDOM is played in 7-spin increments and features a massive red dragon who breathes on the reels, leaving fireball bombs that count down over the 7 spins until they explode! All fireball positions are then converted into WILDS!",
        image: "https://cdn.softswiss.net/i/s3/bsg/TakeTheKingdom.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TopCardTrumps": {
        title: "Top Card Trumps",
        description: "Welcome to Top Card Trumps, an exciting fast paced card game much like the game you played as a child, only now you play against the dealer.\n\nThe game is very simple: Whoever has the highest card wins. All hands are played separately versus the Dealer.",
        image: "https://cdn.softswiss.net/i/s3/bsg/TopCardTrumps.png",
        keywords: "wallfair, crypto, casino, card, bsg, bsg"
    },
    "/softswiss-game/bsg:TrueIllusions": {
        title: "True Illusions",
        description: "In the world of magic, nothing is what it seems. You keep telling yourself it’s only a trick, but is it? There can only one explaination… it’s MAGIC!\nThe higher the risk, the more entertaining the show. Join our fearless magician and his beautiful assistant in TRUE ILLUSIONS.\n\n– Experience TRUE cinematic 3D with full screen camera animation!\n– Watch the credits fly during the cascading free spins feature\n– Enjoy the show with an interactive card trick ",
        image: "https://cdn.softswiss.net/i/s3/bsg/TrueIllusions.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:GangsterCats": {
        title: "Gangster Cats",
        description: "Meet the cat gang in Gangster Cats, the 3x5, 9 lines videoslot. The band of mischievous kitties pay everywhere you look, from left to right and right to left. During the Wild Night random expanded wild feature, wilds appear fully expanded horizontally on any combination of reels 1,2 and 3. Share the loot with the gang in the Free Spins round where all wins are multiplied by 4x.",
        image: "https://cdn.softswiss.net/i/s3/igtech/GangsterCats.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:OnceUponATime": {
        title: "Once Upon A Time",
        description: "Once upon a time, in a land far away… There was a 3D Slot Game like never before seen. Where sneaky goblins ran amok, stealing every valuable in sight. Where a brave knight sets off to rescue a beautiful maiden, and where a dangerous, menacing dragon stood in his way! You’re invited to a magical world of fantastic entertainment, when you play Once Upon A Time!\n\nFeatures\nTwo exciting full animation bonus rounds offer amusement and entertainment for the player\nWild reels and free spins modes feature exciting, full-screen animation\nSave the Princess and be a hero\n30 lines results in many ways for your player to",
        image: "https://cdn.softswiss.net/i/s3/bsg/OnceUponATime.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:ReturntoParis": {
        title: "Return to Paris",
        description: "In Paris, there is a museum that holds the world's treasures. When night falls, these treasures becomevulnerable to the sticky fingers of a notorious Thief, who is crafty and makes off with a treasure each time he visits the museum. But the chase is on - the museum's Cop is hot on the Thief's trail!When the Thief and the Cop land adjacently on the reels, a Wild Explosion is triggered, turning all surroundingsymbols to WILDS!The clever game of cat and mouse is played out on the reels, in a constant cycle of steal and return betweenthe Thief and the Cop. When 3 MONA LISA SCATTERS occur on the reels, the open-ended FREE SPINS modebegins, and your players can experience up to 1000 FREE SPINS as the Cop chases the Thief all around thereels! The Cop is always one step closer to his clever quarry.This sequel to our smash hit A NIGHT IN PARIS will have your players glued to their devices, watching theantics of the wily Thief and dedicated Cop ",
        image: "https://cdn.softswiss.net/i/s3/bsg/ReturntoParis.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:ReelsofWealth": {
        title: "Reels of Wealth",
        description: "Cash in on one of the most exciting new BIG WIN games of 2018 with Reels of Wealth. In this jewel toned, multi-feature new gem from Betsoft Gaming, players try their luck to earn the payday of a lifetime with the innovative new Megastar Jackpot mini game.\n\nThe game itself is built on a “Rolling Wins” platform, awarding players a re-spin every time they win. Compounding the excitement of those free re-spins is the Rolling Wins multiplier, which can award up to three times the payout of a standard win, depending on the number of respins the player has already triggered. In addition to that, instead of a standard wild, Reels of Wealth uses an opulent multiplier wild, which will stack with other wilds for even BIGGER wins. Players also enjoy the luxury of not one but TWO scatter icons. One, the Vault of Wealth, pays immediately. The other – the MEGASTAR JACKPOT symbol -pays players in a much richer fashion.\n\nWhen 3 or more MEGASTAR JACKPOT symbols appear anywhere on the reels the Megastar Jackpot mini-game . The reels change to the special Megastar Jackpot symbols surrounding players with gold and jewels worthy of such a momentous event. Utilizing the proprietary new “Trail System”, the Megastar Jackpot Feature allows players to collect special Jackpot symbols during Free Spins in an attempt to earn one of FOUR incredible jackpots. As the special jackpot symbols fall into place they EXPLODE, allowing other symbols to cascade onto the reels, and advancing their specific Jackpot trail. The Jackpots vary in size, from HERO to STAR to LEGEND to MEGASTAR, each requiring a different number of symbols to reach the GRAND PRIZE. Reels of Wealth gives players so many ways to win, they can bet on a rewarding experience, one way or anot",
        image: "https://cdn.softswiss.net/i/s3/bsg/ReelsofWealth.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:Slotfather2": {
        title: "Slotfather2",
        description: "The Slotfather is back with all his henchmen – including Snake Eyes Sammy, Frankie “Knuckles” and Fat Tony – in this exciting, any-way-pays sequel to THE SLOTFATHER PART II! The dark and seedy crime underworld comes to life in gorgeous high definition animations and graphics. This is the Slotfather’s world, and you’re a part of his family now!\n\nWith Tall symbols, Gangster Respins for a second chance at the bonus round, Free Spins and the Big Boss Feature Bonus Round, this game will have you doing the rolling in the dough badda-bing,",
        image: "https://cdn.softswiss.net/i/s3/bsg/Slotfather2.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TakeSantasShop": {
        title: "Take Santa's shop",
        description: "Get ready for holiday fun with Betsoft's latest video slot Take Santa's Shop! Are you ready to be the villain andhelp the Holiday Robber? With snowflakes falling across the reels, bells jingling and Ornament Bombs turninginto Wilds, the festive season has never been more exciting!This special progression game is played in rounds of 10 - with every spin, an Ornament Bomb Counter countsdown from 10 to 0, making all the bombs detonate for even larger possible wins! Buckle up for the biggest heistof the Christmas season and look out for Santa's Sleigh symbols landing on the reels - that will award you 15Free Spins to escape with!",
        image: "https://cdn.softswiss.net/i/s3/bsg/TakeSantasShop.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TigersClawSP": {
        title: "Tigers Claw",
        image: "https://cdn.softswiss.net/i/s3/bsg/TigersClawSP.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TripleJuicyDrops": {
        title: "Triple Juicy Drops",
        description: "Will your players take home the Large, Grand, or Massive Prize from TRIPLE JUICY DROPS? This 5×5 gridbased cascading reels video slot will have them collecting colorful symbols for a chance at one of the three PRIZE WHEELS in the game. With generous WILDS in standard play, TRIPLE JUICY DROPS is a fast paced game with the potential for huge rewards!",
        image: "https://cdn.softswiss.net/i/s3/bsg/TripleJuicyDrops.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:VipAmericanRoulette": {
        title: "Vip American Roulette",
        description: "VIP version of American Roulette. Same as base game, just fancier graphics and higher limits.",
        image: "https://cdn.softswiss.net/i/s3/bsg/VipAmericanRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, bsg, bsg"
    },
    "/softswiss-game/igtech:CaishensFortune": {
        title: "Caishen's Fortune",
        description: "The God of Wealth is smiling upon you in Caishen's Fortune, the 3x5, 243 ways to win videoslot. Caishen is wild and every time it`s on the screen, it can randomly award the Jackpot Bonus Games where you have to pick and reveal items to win one of the awards. In Free Spins, all small value symbols are removed from the reel strips for extra big wins!",
        image: "https://cdn.softswiss.net/i/s3/igtech/CaishensFortune.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:Stampede": {
        title: "Stampede",
        description: "Take a trip to the sun-drenched African savannah with STAMPEDE, the newest Classic Slot brought to youby Betsoft Gaming.This all-ways-pay slot machine offers 1024 ways to win and a beautiful art style, that evoking the highgrasses and spreading acacia trees of the African plain. The warm palette suggests the heat of thesavannah in summer, where the majestic elephant herds rule supreme, accompanied by other icon Africanwildlife such as giraffes, gazelles and zebras.The top value Elephant symbols dominate the reels, and when they Stampede the players win big! With theaddition of x3 Wilds in Free Spins, there are some truly mammoth wins to excite your players.",
        image: "https://cdn.softswiss.net/i/s3/bsg/Stampede.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TrueSheriff": {
        title: "The True Sheriff",
        description: "Villainy has come to the quiet Old West town of High Noon. The people are afraid and the riches of the saloon are in the robber’s sights. Only one man can stand between them. Only one man can set the wrongs to rights and bring justice to the dangerous criminal – THE TRUE SHERIFF from BETSOFT GAM",
        image: "https://cdn.softswiss.net/i/s3/bsg/TrueSheriff.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:ZoomRoulette": {
        title: "Zoom Roulette",
        description: "Zoom Roulette is a simple game that gives players the chance to win big.\n\nOur roulette is based on standard European standard single zero roulette, according to the standard rules of the Nevada gaming commission.\n\nZoom Roulette features a stunningly rendered presentation of this classic game in a modern, easy to play format with pre-configured popular betting templates such as Orphelins and Zero bets.",
        image: "https://cdn.softswiss.net/i/s3/bsg/ZoomRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, bsg, bsg"
    },
    "/softswiss-game/igtech:ChineseDragons": {
        title: "Chinese Dragons",
        description: "As the Chinese Dragons soar the sky, the reels turn for amazing wins in the 4x5, 50 lines videoslot. The stacked dragons pay from two and up and you can win up to 40,000 when you hit them all. In the FREE SPINS feature, one WILD symbol is added on reels 2,3 and 4 before every spin and each SCATTER that hits during the round will award one more free spin!",
        image: "https://cdn.softswiss.net/i/s3/igtech/ChineseDragons.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:SafariSam2": {
        title: "Safari Sam 2",
        description: "Safari Sam is back! Get ready to go on a safari journey with Sam & Pam for stacked wins, wilds & more! SAFARI\nSAM 2 is the latest 5 reel, 50 payline video slot by Betsoft Gaming, bursting with exciting features that will leave\nyou craving more adventure!\nIt's time to pack your bags and take a trip to the untamed lands of the savannah for a breathtaking expedition,\nwhere things can get a little WILD! Follow the compass to the CALL OF THE WILDS while sightseeing the majestic\nanimals in their natural habitat!\nAs Sam & Pam guide you through the sun-drenched African Savannah, watch out for ACACIA TREE symbols -\n3 or more acacia scatters will trigger FREE SPINS feature, where you can win up to 20 FREE SPINS straight from\nthe start! With the addition of SAFARI STACKS, there are some truly flaming wins to score",
        image: "https://cdn.softswiss.net/i/s3/bsg/SafariSam2.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:SpringTails": {
        title: "Spring Tails",
        description: "Celebrate the Year of the Rat in style and experience bountiful fun in SPRING TAILS, the new video slot from Betsoft Gaming. An adorable rat character will guide you through an experience that includes stacking multipliers & an exciting FREE SPINS MODE!A new year brings prosperity and luck, and there's plenty to be found in SPRING TAILS. Enjoy theLUCKY RAT MULTIPLIER WILDS, which can appear on reels 2, 3, and 4. Put some spring in your step, as multipliers can stack, which can add up to a total multiplier of 60x, bringing you super wins.If that wasn't enough, the GOLDEN KEY symbol can appear anywhere on the reels, which will triggera free spins mode. 12 free spins, MEGA potential, as all low-value symbols will be removed for theduration of the mode.Start off your new year right with the blessing of the rat in SPRING TAILS!",
        image: "https://cdn.softswiss.net/i/s3/bsg/SpringTails.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:SuperSweets": {
        title: "Super Sweets",
        description: "Get your sweet tooth on and get ready for some big wins in SUPER SWEETS, the delicious video slot from Betsoft Gaming. Enjoy a scrumptious 5x3 experience with delightful visuals, sticky wild re-spins and an action-packed free spins mode.Sink your teeth in a variety of candies and chocolates as you spin your way to the top. Scoop up a serving of SUPER STICKY WILDS that appear on the reels and trigger a single free re-spin, chain them up, collect golden tickets & power your way to the GOLDEN TICKET FREE SPINS.A SUPER SWEETS CANDY SURPRISE can appear at any time on reels 2, 3 and 4, which can give youeither a re-spin or a ticket to the bonus rounds. Who knows what surprises await?Satisfy your sweet tooth and enjoy sweet, sweet wins on SUPER SWEETS!",
        image: "https://cdn.softswiss.net/i/s3/bsg/SuperSweets.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:ThreeWishes": {
        title: "Genie's Fortune",
        description: "Who doesn’t like a good Genie, especially one that grants you THREE WISHES? But what will you choose… and endless amount of Wealth and Fortune? Fame beyond your wildest dreams? Or is it true, undying and passionate Love you seek? Don’t fret; the good Genie will grant them all once you find him!\n\nFeatures:\n– Choose between Fame, Wealth and Love in the 3 Wishes bonus round!\n– Monkey Click Me features interactive monkey who helps win instant credits\n– Free Spins Chest and special Magic Carpet features add excitement to the main game\n– Amazing animation brings the Genie and his",
        image: "https://cdn.softswiss.net/i/s3/bsg/ThreeWishes.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:UnderTheBed": {
        title: "Under The Bed",
        description: "Jessie and Jane have been left home alone, in the dark. What monsters lurk there, in the deep shadows of the night? A rustle, a thump, a clank… there could be anything at all lurking UNDER THE BED. With an exciting new STICKING WILD feature, free spins mode and cinematic second screen bonus round, UNDER THE BED is another top-of-the-line slot machine from Betsoft Gami",
        image: "https://cdn.softswiss.net/i/s3/bsg/UnderTheBed.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:WeekendInVegas": {
        title: "Weekend In Vegas",
        description: "Join three unlucky companions as they travel the Nevada desert to Las Vegas, City of Second Chances!\n\nWith free spins, money wheels, reel re-spins for additional chances at the bonus round and a hot stop on the Vegas Strip for some good ol’ gambling, this true 3D cinematic video slot brings the bright lights of Vegas right to the comfort of your hom",
        image: "https://cdn.softswiss.net/i/s3/bsg/WeekendInVegas.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:CandyRushSummerTime": {
        title: "Candy Rush Summer Time",
        description: "Cozy afternoons, fun in the sun and relaxing cocktails await in Candy Rush  Summer Time. The Summer Fair on Candy Street is now open for business and you are invited to take part in the festivities. The candy stores have set out their goods on 20 lines. Line up the Scatter Beach Balls to win up to 20 Free Spins. The Gingerbread Man is WILD and helps you pile up more sugar. If you encounter the Cocktail, you are in for a treat in the Candyland Bonus Game, where you can fill up on sweets and win up to 9,000 Bonus Points.",
        image: "https://cdn.softswiss.net/i/s3/igtech/CandyRushSummerTime.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:SugarPop": {
        title: "Sugar Pop",
        description: "Indulge in the reinvention of Sugar Pop, one of Betsoft’s most popular games. In this incredible sequel, embrace all that was beloved about the original, with cluster wins and candies that explode in a cascade, allowing for additional wins. Revisit the enticing bright colors and welcoming, fluffy, cloud-like dreamland that is the setting of Sugar Pop. But don’t get too comfortable, because things are about to change. In Sugar Pop 2: Double Dipped, everything has been reinvented, from leveling to the candies themselves.\n\nThe difference is noticeable right away, as the special candies no longer just appear on the board, but instead come onto the board in a giant chocolate surprise egg! Some of the old favorites get a slight functional makeover, like the caramel chew that now removes all candies of a specific color from the board. But the real highlights to the special candies are the new additions. A Morphing Golden Wild candy will shift and change shape to match any candy near it. The Jelly Bean Cannon firelly Beans into the air, taking out any candies they land on, and the Sweet Hammer slams the board taking out all candies in its way.\n\nBeyond the special candies are new mechanics behind the cluster wins. Clusters of the special Free Spin candy now trigger Free Spins, while large clusters resolve leaving a WILD on the board to allow for further wins. When more than five clusters resolve in a turn, a Candy BOMB will be left behind to clear a large portion of the board, and result in massive wins.\n\nSugar Pop 2 isn’t just about the individual spin, but, like the original, allows players to level up from spin to spin. Every few levels, a new candy is unlocked and adds to the player’s special candy list, while increasing player enjoyment. Unlike the original, each new level comes with rewards befitting the prestige of leveling up! Also, unlike the original, Sugar Pop 2 has no level cap! With this sweet sequel the fun never has to ",
        image: "https://cdn.softswiss.net/i/s3/bsg/SugarPop.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TheHive": {
        title: "The Hive!",
        description: "Welcome to the sweet world of The Hive, a unique hexagonal grid video slot by Betsoft. Kick off your summer with a fun cast of bee characters, each with their unique twist on the gameplay that will create fun and memorable playing sessions. Discover all the features and enjoy a buzzingly awesome free spins mode while you fly to the riches.",
        image: "https://cdn.softswiss.net/i/s3/bsg/TheHive.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TreasureRoom": {
        title: "Treasure Room",
        description: "Buried deep inside a cavern hundreds of years ago was gold, riches and wealth incomprehensible unless actually seen.Â It seems like miles and miles of treasure chests, gold bars, priceless coins, statues, rubies and emeralds are finally discovered, and now rightfully yours.\n\nFeatures:\n– 5 jackpot symbols on max bet wins the JACKPOT!\n– Sword and Shield instant bonus can award up to 550 credits!\n– 3 scattered bonus feature symbols awards second screen bonus round\n– Players can earn bonus prizes in the Rare Treasure bo",
        image: "https://cdn.softswiss.net/i/s3/bsg/TreasureRoom.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:Aladdin": {
        title: "Aladdin",
        description: "Help the mischievous Aladdin stack the symbols on reels and find the Djinn's Lamp in Aladdin, the 4x5, 50 lines video slot. Once you discover the lamp, you can summon the Djinn and win up to 10,500 bonus points or enter the Free Spins round to pile up your wins in up to 50 free spins with 2x multipliers.",
        image: "https://cdn.softswiss.net/i/s3/igtech/Aladdin.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:WildDrops": {
        title: "Wild Drops",
        description: "Far below the surface of the Earth, there is a prismatic fortune waiting to be found by an explorer bothbrave and bold. Welcome to Wild Drops, the latest video slot by Betsoft. An endless treasure trove ofsparkling gemstones in the mystical mines await you!This 5-reel, 16 fixed payline (8 rows which pay both ways) slot is a visual feast in the popular gemmatching genre. Appealing colours framed by the sweeping deep blues of the mine make every win pop.Winning gems match and disappear from the reels. Clear the entire board to multiply your wins!Drill deep, and match 3 or more identical gems in a horizontal line for a win. Five of a kind on any rowpays both ways! And as wins clear the board, players have a chance to uncover 5 hidden coins to earn5 FREE SPINS. The FREE SPINS mode will take players even deeper into the mines, where the central reel is guaranteed to be fully WILD!",
        image: "https://cdn.softswiss.net/i/s3/bsg/WildDrops.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:AztecEclipse": {
        title: "Aztec Eclipse",
        image: "https://cdn.softswiss.net/i/s3/igtech/AztecEclipse.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:EnchantedStory": {
        title: "Enchanted Story",
        image: "https://cdn.softswiss.net/i/s3/igtech/EnchantedStory.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:Hot88": {
        title: "Hot 88",
        image: "https://cdn.softswiss.net/i/s3/igtech/Hot88.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:MagicGems": {
        title: "Magic Gems",
        description: "Prepare yourself for a trip into the world of shiny gems in Magic Gems, the 243 ways to win, 5-reel videoslot. All wild wins are multiplied by 2x and during the Free Spins round you can win up to 25 free spins with 3x multiplier!",
        image: "https://cdn.softswiss.net/i/s3/igtech/MagicGems.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:7Piggies5000": {
        title: "7 Piggies 5 000",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/7Piggies5000.png",
        keywords: "wallfair, crypto, casino, lottery, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/bsg:TakeOlympus": {
        title: "Take Olympus",
        description: "Prepare to face the ancient deities of Greece in TAKE OLYMPUS, the newest 5 reel, 50 payline video slot byBetsoft Gaming! This visually stunning game cycles through four Olympian Gods - Apollo, Aphrodite, Poseidon,and Hades. Each God has their own special powers, which will lead you to eternal rewards!Take on the powers of the other Gods alongside the Mighty King of the Gods - Zeus! The ruler of Mount Olympus,Zeus, in any configuration, is WILD. When he appears in a 4-symbol tall configuration, he will award the player10 FREE SPINS, if all 4 other Gods are also present on the reels!Join the Master of all Tides :Poseidon, the God of Light - Apollo, Lord of the Underworld - Hades and theGoddess of Love - Aphrodite, and get a taste of the cherished immortality. Every 10 spins, the endless cycle ofthe Gods turns, bringing new powers with each new God! Multipliers, wilds, and more await you on Olympus!",
        image: "https://cdn.softswiss.net/i/s3/bsg/TakeOlympus.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TigersClaw": {
        title: "Tiger's Claw",
        description: "Get swept away in the mystical world of Tiger's Claw. In this fantasy excursion players spin the reels of the popular 3, 4, 5, 4, 3 slot that pays both left to right and right to left. Spiritual Shaman guides appear across the reels leading\nplayers to scatter wins.\nIf the glorious Tiger's Claw grasping a glowing orb can be found on every reel, Free Spins are triggered. For each combination of 5 Claws, more Free Spins are added, up to 98 in a single spin! Free Spins don't only earn players big\nprizes, but more Free Spins as well. Retrigger with the golden Tiger's Claw for up to 240 total Free Spins!\nWith 720 ways to win, the opportunity for numerous Free Spins, and a mystical appeal, Tiger's Claw will reach out and grab players, while they grab fantastic rewards! ",
        image: "https://cdn.softswiss.net/i/s3/bsg/TigersClaw.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:UnderTheSea": {
        title: "Under The Sea",
        description: "Far beneath the clear, shining sea is a coral reef wonderland, teeming with life. Framed by delicately undulating fronds of kelp, brilliantly coloured tropical fish dart about in attendance to the lovely mermaid who guards the treasures here. Will you discover that rarest of oysters, bearing a flawless pearl? The sea’s mysterious bounties are there for the taking when you dive down deep Under the Se",
        image: "https://cdn.softswiss.net/i/s3/bsg/UnderTheSea.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:SafariDeluxe": {
        title: "Safari Deluxe",
        description: "THE HOT 6TH REEL THAT WILL MAKE YOU GO WILD !!! The 3x5, 25 lines videoslot. When the lion hits on the middle row, it calls on the pack and expands vertically to fill the whole reel. The 6th reel is there to multiply your win or award you the super wild, which triggers a respin full of wilds. Hunt the Scatter to get 10 free spins in which Super Wild can be triggered!",
        image: "https://cdn.softswiss.net/i/s3/igtech/SafariDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/bsg:TheMysticHive": {
        title: "The Mystic Hive",
        description: "Get enchanted with the luminous wonders of the MYSTIC HIVE, the latest hexagonal grid video slot by Betsoft. Collect the magical nectar while fireflies dazzle around and help you by summoning storms and awarding multipliers!\n\nWith every spin, the fireflies move clockwise around the grid, increasing the chances of filling the NECTAR METER. When the NECTAR METER is full, 5 FREE SPINS are awarded! Mystic fireflies of any type can spawn randomly with every spin.\n\nDuring FREE SPINS, 1, 2 or 3 Nectar Burst spreading WILDS will appear on the Mystic Hive Grid! WILDS will spread from their initial place on the grid to adjacent honeycomb cells after every spin, and will continue to spread to other cells until the end of the FREE SPINS!\n\nDelve into a world glimmering with tiny sparks of wondrous light and enjoy the MYSTIC HIVE!",
        image: "https://cdn.softswiss.net/i/s3/bsg/TheMysticHive.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:TycoonsPlus": {
        title: "Tycoons Plus",
        description: "In a world reserved for the wealthiest of the wealthy, a world invisible to everyone but the highest echelon, they play a game where the stakes are infinitely high..Only members of the elite Billionaire’s Club are welcom",
        image: "https://cdn.softswiss.net/i/s3/bsg/TycoonsPlus.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:VipEuropeanRoulette": {
        title: "Vip European Roulette",
        description: "VIP variant of the standard European Roulette game. Features slightly different graphics, and higher limits. Base game is exactly the same.",
        image: "https://cdn.softswiss.net/i/s3/bsg/VipEuropeanRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, bsg, bsg"
    },
    "/softswiss-game/igtech:AncientGiants": {
        title: "Ancient Giants",
        description: "Explore the prehistoric jungles in Ancient Giants, the 4x6, 4096 ways to win videoslot. The fight is on between the fearless T-Rex and the mighty Mammoth. Hit the stacked Scatter symbols on all reels to win up to 250 free spins. And when the beasts meet in the free spins round, they multiply the total win of the spins by up to 5x.",
        image: "https://cdn.softswiss.net/i/s3/igtech/AncientGiants.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:EgyptianTales": {
        title: "Egyptian Tales",
        description: "Egypt achieved amazing accomplishments throughout antiquity. Be part of their story in Egyptian Tales, a 20-line video slot. Keep an eye out for the two Wild symbols and decipher the hieroglyphs to uncover the treasure of the pharaohs in the Raiding the Pyramid Free Spins Round.",
        image: "https://cdn.softswiss.net/i/s3/igtech/EgyptianTales.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:HockeyWildMatch": {
        title: "Hockey Wild Match",
        description: "The Wild Match is on in Hockey League, the 3x5, 9 lines videoslot. The teams are clashing from left to right and right to left and when The Gloves Are Off, wilds can fill the whole reels. Win the match in the Free Spins feature where all your wins are multiplied by 3x!",
        image: "https://cdn.softswiss.net/i/s3/igtech/HockeyWildMatch.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:NorthernGods": {
        title: "Northern Gods",
        image: "https://cdn.softswiss.net/i/s3/igtech/NorthernGods.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:WolfTreasure": {
        title: "Wolf Treasure",
        description: "Wild wolves are out to hunt in Wolf Treasure, the 3x5, 25 lines videoslot. The wolf pack is stacked on all reels and when you hit the Blazin Reels Free Spins feature, reels 2,3 and 5 spin together as a GIANT symbol. Moon symbols trigger the respin feature where all the values get added together and can win one of the three available jackpots for super big wins!",
        image: "https://cdn.softswiss.net/i/s3/igtech/WolfTreasure.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:AutoRoulette": {
        title: "Auto-Roulette 1",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/AutoRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BaccaratLobby": {
        title: "Baccarat Lobby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BaccaratLobby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/bsg:TotalOverdrive": {
        title: "Total Overdrive",
        description: "Ride a cool rush into a world of neon electronica with this 3 reel, 5 payline video slot. With fresh designs of cherries, bells, diamonds, bars, and 7s, this update of the classic fruit machine with awesome laser effects and a driving soundtrack is sure to inspire nostalgia.The heart of TOTAL OVERDRIVE is the Overdrive Multiplier. Every winning spin will increase themultiplier, and the multiplier will continue to increase with consecutive winning spins. Watch the electric filaments build in intensity with each multiplied win!But it doesn't end there. The Overdrive Multiplier can also become Sticky. This means it will hold in place for a duration of spins, even if there are no more consecutive wins. The Overdrive Multiplier holdcan even re-trigger while active, pushing the multiplier level and win potential into real overdrive!",
        image: "https://cdn.softswiss.net/i/s3/bsg/TotalOverdrive.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/bsg:VikingVoyage": {
        title: "Viking Voyage",
        description: "The soothsayers spoke of great riches across the sea, so the Golden King has gathered his most loyal warriors on their greatest expedition to date. Polish your axe, push out the longboats, and prepare to go looting when VIKING VOYAGE sets sail this spring! Steeped in Scandinavian lore, the reels of VIKING VOYAGE are loaded with royals, runes, and other symbols that spell good fortune for your band of intrepid adventurers: horned helmets, battle-worn axes, golden goblets plundered on past voyages, and god-sent guardians in the form of Odin's watchful ravens. Joining the Golden King on his fateful voyage are a grizzled village elder, two hardened fighters, and a feisty\nshieldmaiden  all high-paying symbols, and all ready to follow their king to explore new shores in search of untold treasures.\nThe Golden King himself has descended from his throne to lead his people, and he stands proud on reels 1-4 in stacks of up to 3, using his warrior's instincts to stand in for any other symbol  including the raven scatter. When the King appears in a full-height stack, he bellows a battle cry, freezing that reel in place and shaking the earth so that all other reels spin again. And if another full stack appears during that spin, the King will command that reel to lock, too, before a further respin.\nA special longboat symbol appears only on reels 1 and 5, with shields mounted along its sides, ready to take to the water. When one longboat appears, the drums begin to sound, and if another appears in the same spin, the Vikings being their raid over fifteen free spins!",
        image: "https://cdn.softswiss.net/i/s3/bsg/VikingVoyage.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:CandyRush": {
        title: "Candy Rush",
        description: "Get your sweet tooth ready it's a Candy Rush! Candy Street is now open for business and you are invited to take part in the festivities. The candy stores have set out their goodies on 20 lines. Line up the Gummy Bears to win up to 20 free spins. The Gingerbread Man is WILD and helps you pile up more sugar. If you encounter the special Cupcakes, you are in for a treat in the Candy Shop bonus game, where you can fill up on sweets and win up to 9,000 Bonus Points.",
        image: "https://cdn.softswiss.net/i/s3/igtech/CandyRush.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:GangsterCatsII": {
        title: "Gangster Cats 2",
        description: "The gang is back in Gangster Cats 2, the 3x5, 30 lines videoslot. The Catfather and its acolytes pay both ways and on every spin, the WILD kittens can hit on random reels, expanding vertically to fill the whole reel. Catch the Bonus round where you can get 10 Free Spins with Random Wilds guaranteed to hit on every spin!",
        image: "https://cdn.softswiss.net/i/s3/igtech/GangsterCatsII.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:Karaoke": {
        title: "Karaoke",
        image: "https://cdn.softswiss.net/i/s3/igtech/Karaoke.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:ThreeKings": {
        title: "3 Kings",
        description: "Experience the rich history of China in 3 Kingdoms' Battle of Red Cliffs, the 3x5, 25 lines videoslot. The generals Cao Cao, Liu Bei and Sun Quan bring their entire army on stacked reels, When all three of them clash, gain points towards gaining the Spoils of War single player jackpot! Choose how the battle unfolds in the Free Spins round, where the generals become wild!",
        image: "https://cdn.softswiss.net/i/s3/igtech/ThreeKings.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:5Lions": {
        title: "5 Lions",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/5Lions.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:AztecBonanza": {
        title: "Aztec Bonanza",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/AztecBonanza.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Beowulf": {
        title: "Beowulf",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Beowulf.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack35TheClub": {
        title: "Blackjack 35 – The Club",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack35TheClub.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/bsg:WolfMoonRising": {
        title: "Wolf Moon Rising",
        description: "Dream big, win big. Enter the mystical lands of Wolf Moon Rising and explore a slot filled to the brim with exciting action & a potential of up to 20000x, as well as a lucrative bonus game that pays both ways and DOUBLES your wins.Featuring classic Betsoft slots gameplay mixed up with the big win capability that players desire, Wolf Moon Rising has several exciting features. Collect the FEATHER TALISMANS to trigger 12 free spins them up for a chance at amazing wins.Watch for special symbols that will guide you to fortune. The WOLF MOON symbol can appear on any reel and will award an INSTANT WIN. More symbols equal more wins. The game also features a wild mechanic to make for some intense wins. Exciting ways to win in the newest release by Betsoft!Unleash your feral spirit in WOLF MOON RISING!",
        image: "https://cdn.softswiss.net/i/s3/bsg/WolfMoonRising.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:CandyRushValentinesDay": {
        title: "Candy Rush Valentine's Day",
        description: "Love is the air! It's Candy Rush Valentine's Day. Candy Street is now open for business and you are invited to take part in the festivities. The candy stores have set out their goods on 20 lines. Line up the Scatter Hearts to win up to 20 Free Spins. The Gingerbread Man is WILD and helps you pile up more sugar. If you encounter the Heart Cupcakes, you are in for a treat in the Candyland Bonus Game, where you can fill up on sweets and win up to 9,000 Bonus Points.",
        image: "https://cdn.softswiss.net/i/s3/igtech/CandyRushValentinesDay.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:CrazyMonkeys": {
        title: "Crazy Monkeys",
        description: "Get ready to stack primates in Crazy Monkeys, the 5 reel, 7 lines videoslot. Big line wins and up to 150 free spins with 3x mutiplier are ready for the taking. Monkey business? More like monkey riches.",
        image: "https://cdn.softswiss.net/i/s3/igtech/CrazyMonkeys.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:Hercules": {
        title: "Hercules",
        description: "Hercules, the great hero of the ancient world is stacked on all reels and pays from 2 and up in Hercules, the 4x5. 50 lines videoslot. Summon 3 Zeus symbols to be awarded the Free Spins round in which  WILDS are added on reels 2,3 and 4 before every spin and each Scatter hit during the round adds one more free spin!",
        image: "https://cdn.softswiss.net/i/s3/igtech/Hercules.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:LeprachaunGoldDeluxe": {
        title: "Leprachaun Gold Deluxe",
        description: "The lucky leprachauns are WILD in Leprachaun Gold Deluxe, the 3x5, 25 lines videoslot. Big wins await if you find the leprachaun treasure, and in the free spins round, before each spin, two more WILDS are added to the reels to stack them up for senzational wins!",
        image: "https://cdn.softswiss.net/i/s3/igtech/LeprachaunGoldDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:QueenAndTheDragons": {
        title: "Queen and the Dragons",
        description: "Fight along the Queen and her dragons for glory and riches in Queen and the Dragons, the 3x5, 25 lines videoslot. All symbols are stacked and pay from 2 and up. When 3 Scatter portals open, choose you lucky symbol and multiplier for 5 free spins with the symbol SUPER STACKED.",
        image: "https://cdn.softswiss.net/i/s3/igtech/QueenAndTheDragons.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:5LionsGold": {
        title: "5 Lions Gold",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/5LionsGold.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:AncientEgyptClassic": {
        title: "Ancient Egypt Classic",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/AncientEgyptClassic.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Baccarat8": {
        title: "Baccarat 8",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Baccarat8.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/bsg:YakYetiRoll": {
        title: "Yak, Yeti & Roll",
        description: "Built around Betsoft's proprietary trail system, Yak, Yeti & Roll sees an eccentric Inuit inventor and his faithful yeti sidekick forging a steady path across the icy plains of the Arctic. But while the reels are packed with standard seasonal symbols like igloos and yetis, Yak the Eskimo has redesigned the traditional reindeer-driven sled to traverse the snow in style. From his perch he points the way, while his Yeti pal uses pedal power to propel them forwards.Every time a cascade triggers, the spiked wheels of the snowmobile gain traction, and the unlikely pair advance even further along the trail, unearthing frozen treasures as they go. These range from instant payouts to cumulative multipliers that apply to the next cascade win.Free spins is where the payouts really start to snowball\\\\; players can pile up huge reserves of free spins, add free-spin-specific multipliers to these, and then also apply cascade multipliers to quickly turn a small win into an earth-shaking avalanche!",
        image: "https://cdn.softswiss.net/i/s3/bsg/YakYetiRoll.png",
        keywords: "wallfair, crypto, casino, slots, bsg, bsg"
    },
    "/softswiss-game/igtech:CandyRushWinter": {
        title: "Candy Rush Winter",
        description: "The snow is falling and the ski lanes are open once again. The Holiday Spirit on running high on Candy Street. The candy stores have set out their goods on 20 lines. Line up the Scatter to win up to 20 Free Spins. The Gingerbread Man is WILD and helps you pile up more sugar. If you encounter the Bonus, you are in for a treat in the Candyland Bonus Game, where you can fill up on sweets and win up to 9,000 Bonus Points.",
        image: "https://cdn.softswiss.net/i/s3/igtech/CandyRushWinter.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:Godiva": {
        title: "Godiva",
        description: "Relive the story of Godiva in the 3x5, 20 lines videoslot. The classic characters provide plenty wins on the stacked reels and during the Free Spins round you can pick one of the four options and try your luck in one of the highly exciting combinations.",
        image: "https://cdn.softswiss.net/i/s3/igtech/Godiva.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:MoneyTrain": {
        title: "Money Train",
        description: "Ride the Money Train, the 3x3, 5 lines videoslot. Earn the chance to board the train and win the progressive bonus where each wagon awards a random prize. Start with 5 wagons and collect UPGRADE golden tickets to add 5 more for each collected.",
        image: "https://cdn.softswiss.net/i/s3/igtech/MoneyTrain.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:QueenOfTheSea": {
        title: "Queen of the Sea",
        description: "The riches of the sunken kingdom of Atlantis are yours for the taking in Queen of the Sea, the 4x5, 1024 ways to win videoslot. The queen is stacked on all reels. Hunt for three or more pearl oysters to trigger the Free Spins. If you can find the black pearl, you are awarded Super Free Spins, in which Queen symbols are added to the reels. Pearl oysters are valuable and even two of them grant you the Second Chance bonus in which you get to pick to find Free Spins or Super Free Spins!",
        image: "https://cdn.softswiss.net/i/s3/igtech/QueenOfTheSea.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:5LionsMegaways1": {
        title: "5 Lions Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/5LionsMegaways1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:AztecGemsDeluxe1": {
        title: "Aztec Gems Deluxe",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/AztecGemsDeluxe1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BigBassBonanza": {
        title: "Big Bass Bonanza",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BigBassBonanza.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack31Azure2": {
        title: "Blackjack 31 - Azure 2",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack31Azure2.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/igtech:GoldenQueen": {
        title: "Golden Queen",
        description: "Follow the path to the treasure in Golden Queen, the 3x4 with WIN MULTIPLIER reel, 25 lines videoslot. To search the pyramid, select your lucky cell and hit the Queen symbol to gain points and continue your journey. As you progress the WIN MULTIPLIERS increase up to 100X  when you reach the Queen`s Chamber, in the Super Level! Riches are scattered all over the place, so hunt for the bonus symbols to win 10 FREE SPINS with the WIN MULTIPLIERS of the current level!",
        image: "https://cdn.softswiss.net/i/s3/igtech/GoldenQueen.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:MoonGoddess": {
        title: "Moon Goddess",
        description: "Explore the charm of ancient Chinese folktales in Moon Goddess, the 5 reel, 13 lines videoslot. Find Tschang O in the bonus game to win up to 3,300 bonus points or venture in the free spins round where you can win up to 13 free spins.",
        image: "https://cdn.softswiss.net/i/s3/igtech/MoonGoddess.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:RomanEmpire": {
        title: "Roman Empire",
        description: "Take part in building the great society of the Roman Empire in Roman Empire, this 5-reel videoslot. Meet the Emperor, the Vestal Virgin, the Centurion and the Gladiator on 20 paylines. Let the games begin in the Jupiter Gift bonus round where you can win up to 10 free spins.",
        image: "https://cdn.softswiss.net/i/s3/igtech/RomanEmpire.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:AndarBahar": {
        title: "Andar Bahar",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/AndarBahar.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Baccarat9": {
        title: "Baccarat 9",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Baccarat9.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BigJuan": {
        title: "Big Juan",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BigJuan.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack34TheClub": {
        title: "Blackjack 34 – The Club",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack34TheClub.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack44Ruby": {
        title: "Blackjack 44 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack44Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureB": {
        title: "Blackjack 6 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureB.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/igtech:Hockey": {
        title: "Hockey",
        description: "Fire in your hearth and ice in your veins! Join the Hockey League, the 5-reel, 20 lines videoslot, and become the MVP in the Free Spins round where you can win up to 10 free spins with a mystery scatter symbol!",
        image: "https://cdn.softswiss.net/i/s3/igtech/Hockey.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:LeprechaunGold": {
        title: "Leprechaun Gold",
        description: "Nibbles, Gibbles, Fillydook and Fenthwick have hidden their treasure on 25 lines while they are out partying. Let loose the WILD Cat to track the gold and capture the SCATTER Butterflies for clues' they know the way to the vault where you can win up to 33 free spins and a 6x multiplier.",
        image: "https://cdn.softswiss.net/i/s3/igtech/LeprechaunGold.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:ThreeWitches": {
        title: "3 Witches",
        image: "https://cdn.softswiss.net/i/s3/igtech/ThreeWitches.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:888Dragons": {
        title: "888 Dragons",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/888Dragons.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Baccarat10": {
        title: "Baccarat 10",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Baccarat10.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackJack22Azure": {
        title: "BlackJack 22 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackJack22Azure.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack36TheClub": {
        title: "Blackjack 36 – The Club",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack36TheClub.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack46Ruby": {
        title: "Blackjack 46 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack46Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureC": {
        title: "Blackjack 7 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureC.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BookofFallen": {
        title: "Book of the Fallen",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BookofFallen.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:EmeraldKing": {
        title: "Emerald King",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/EmeraldKing.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ChickenDrop": {
        title: "Chicken Drop",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ChickenDrop.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/igtech:JungleQueen": {
        title: "Jungle Queen",
        description: "Discover the treasure of the Amazons in Jungle Queen, the 3x5 + WIN MULTIPLIER reel videoslot. The jungle and it`s ancient temples are full of riches but also dangers! The WIN MULTIPLIER hit on the 6th reel applies to the total win of every spin. When you meet the Jungle Queen she will fill all the positions on the reel for extra big wins. And in the BLAZING REELS feature, reels 2, 3 and 4 spin together as a GIANT SYMBOL for GlANT WINS!",
        image: "https://cdn.softswiss.net/i/s3/igtech/JungleQueen.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:MagicShow": {
        title: "Magic Show",
        image: "https://cdn.softswiss.net/i/s3/igtech/MagicShow.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:VikingHero": {
        title: "Viking Hero",
        description: "Embark on a classic Viking adventure in Viking Hero, the 4x5, 40 lines videoslot. When fully stacked Beowulf symbols hit on the first reel, it triggers the Super Respin feature in which only title characters symbols spin. Get wins up to 100,000. When three or more Scatter symbols hit, they trigger the Free Spins round in which you can get up to 20 free spins. Super Respin feature can hit during the Free Spins Round!",
        image: "https://cdn.softswiss.net/i/s3/igtech/VikingHero.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:5LionsDance": {
        title: "5 Lions Dance",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/5LionsDance.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:AztecGems": {
        title: "Aztec Gems",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/AztecGems.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Baccarat12": {
        title: "Baccarat 12",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Baccarat12.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackJack23Azure": {
        title: "BlackJack 23 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackJack23Azure.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack37Ruby": {
        title: "Blackjack 37 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack37Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack47Ruby": {
        title: "Blackjack 47 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack47Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureF": {
        title: "Blackjack 9 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureF.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/igtech:MonkeyKing": {
        title: "Monkey King",
        description: "Embark on the sacred Journey to the West alongside the classic heroes. Wukong, Xuanzang, Zhu and Sha are stacked in the 3x5, 25 Lines videoslot. Experience each character's adventures in the Free Spins round, where you can choose more of a symbol to be stacked on the reel strips and up to 5x multiplier!",
        image: "https://cdn.softswiss.net/i/s3/igtech/MonkeyKing.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/igtech:WildDiamond": {
        title: "Wild Diamond",
        description: "Hit the jackpot in Wild Diamond, the 3x5, 15 lines videoslot. The diamonds are wild and stacked on all reels. More diamonds are added in the high reward FREE SPINS FEATURE. And when you hit 3 golden 7 symbols, you have the chance to win up to 1000 times your bet in the JACKPOT BONUS GAME.",
        image: "https://cdn.softswiss.net/i/s3/igtech/WildDiamond.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:AncientEgypt": {
        title: "Ancient Egypt",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/AncientEgypt.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Baccarat7": {
        title: "Baccarat 7",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Baccarat7.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackJack25Azure": {
        title: "BlackJack 25 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackJack25Azure.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack38Ruby": {
        title: "Blackjack 38 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack38Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack48Ruby": {
        title: "Blackjack 48 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack48Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureG": {
        title: "Blackjack 10 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureG.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BroncoSpirit": {
        title: "Bronco Spirit",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BroncoSpirit.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ChristmasBassBananza": {
        title: "Christmas Big Bass Bonanza",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ChristmasBassBananza.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/igtech:VegasRiches": {
        title: "Vegas Riches",
        description: "Enjoy the thrill of Vegas Riches, the 3x5, 25 lines videoslot. Play the tables and hunt the golden chip to get the EXTRA WILDS FEATURE where for three respins, all royals are turned to Wild. And when the heat is on in the FREE SPINS FEATURE, all wilds multiply the win by 2x or 3x, for a maximum multiplier of 81x. A night of a lifetime!",
        image: "https://cdn.softswiss.net/i/s3/igtech/VegasRiches.png",
        keywords: "wallfair, crypto, casino, slots, igtech, igtech"
    },
    "/softswiss-game/pragmaticexternal:AladdinandtheSorcerer": {
        title: "Aladdin and the Sorcerer",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/AladdinandtheSorcerer.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Asgard": {
        title: "Asgard",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Asgard.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Baccarat11": {
        title: "Baccarat 11",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Baccarat11.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BigBassBonanzaMegaways": {
        title: "Big Bass Bonanza Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BigBassBonanzaMegaways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack32Azure2": {
        title: "Blackjack 32 - Azure 2",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack32Azure2.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack42Ruby": {
        title: "Blackjack 42 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack42Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackA": {
        title: "Blackjack 11",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackA.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureE": {
        title: "Blackjack 1 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureE.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BookofVikings": {
        title: "Book of Vikings",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BookofVikings.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Baccarat13": {
        title: "Baccarat 13",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Baccarat13.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackJack24Azure": {
        title: "BlackJack 24 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackJack24Azure.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack30Azure2": {
        title: "Blackjack 30 - Azure 2",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack30Azure2.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack40Ruby": {
        title: "Blackjack 40 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack40Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack50Ruby": {
        title: "Blackjack 50 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack50Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureI": {
        title: "Blackjack 2 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureI.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BuffaloKingMegaways1": {
        title: "Buffalo King Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BuffaloKingMegaways1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:CongoCash1": {
        title: "Congo Cash",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/CongoCash1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DragonHotHoldandSpin1": {
        title: "Dragon Hot Hold and Spin",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DragonHotHoldandSpin1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BiggerBassBonanza": {
        title: "Bigger Bass Bonanza",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BiggerBassBonanza.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack33TheClub": {
        title: "Blackjack 33 – The Club",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack33TheClub.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack43Ruby": {
        title: "Blackjack 43 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack43Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureA": {
        title: "Blackjack 3 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureA.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackE": {
        title: "Blackjack 16",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackE.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:CaishensGold": {
        title: "Caishen's Gold",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/CaishensGold.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Cowboysgold1": {
        title: "Cowboys Gold",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Cowboysgold1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DragonKingdom": {
        title: "Dragon Kingdom",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DragonKingdom.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:EmeraldKingRainbowRoad": {
        title: "Emerald King Rainbow Road",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/EmeraldKingRainbowRoad.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:FruitParty1": {
        title: "Fruit Party",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/FruitParty1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GoldRush250000": {
        title: "Gold Rush 250 000",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GoldRush250000.png",
        keywords: "wallfair, crypto, casino, lottery, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackJack26Azure": {
        title: "BlackJack 26 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackJack26Azure.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack39Ruby": {
        title: "Blackjack 39 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack39Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack49Ruby": {
        title: "Blackjack 49 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack49Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureH": {
        title: "Blackjack 5 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureH.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BuffaloKing": {
        title: "Buffalo King",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BuffaloKing.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ColossalCashZone": {
        title: "Colossal Cash Zone",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ColossalCashZone.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DragoJewelsofFortune": {
        title: "Drago - Jewels of Fortune",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DragoJewelsofFortune.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ElementalGemsMegaways": {
        title: "Elemental Gems Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ElementalGemsMegaways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:FishinReels": {
        title: "Fishin' Reels",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/FishinReels.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GoldRush": {
        title: "Gold Rush",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GoldRush.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:HotChilli": {
        title: "Hot Chilli",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/HotChilli.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack41Ruby": {
        title: "Blackjack 41 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack41Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack51Ruby": {
        title: "Blackjack 51 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack51Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureJ": {
        title: "Blackjack 8 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureJ.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:CaishensCash": {
        title: "Caishen's Cash",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/CaishensCash.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:CashElevator1": {
        title: "Cash Elevator",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/CashElevator1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:CurseoftheWerewolfMegaways": {
        title: "Curse of the Werewolf Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/CurseoftheWerewolfMegaways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DragonTiger1": {
        title: "Dragon Tiger",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DragonTiger1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ExtraJuicy": {
        title: "Extra Juicy",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ExtraJuicy.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:FruitRainbow": {
        title: "Fruit Rainbow",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/FruitRainbow.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GreatRhino": {
        title: "Great Rhino",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GreatRhino.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:HeartofRio1": {
        title: "Heart Of Rio",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/HeartofRio1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Blackjack45Ruby": {
        title: "Blackjack 45 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Blackjack45Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BlackjackAzureD": {
        title: "Blackjack 4 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BlackjackAzureD.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BookofKingdoms1": {
        title: "Book of Kingdoms",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BookofKingdoms1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ChilliHeat": {
        title: "Chilli Heat",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ChilliHeat.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DaVincisTreasure": {
        title: "Da Vinci's Treasure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DaVincisTreasure.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DropsandWinsLobby": {
        title: "Drops and Wins Lobby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DropsandWinsLobby.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:EyeOfTheStorm1": {
        title: "Eye of the Storm",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/EyeOfTheStorm1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GatesOfOlympus1": {
        title: "Gates of Olympus",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GatesOfOlympus1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GreatRhinoMegaways": {
        title: "Great Rhino Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GreatRhinoMegaways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Hottoburn1": {
        title: "Hot to burn",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Hottoburn1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JuicyFruits": {
        title: "Juicy Fruits",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JuicyFruits.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:BountyGold": {
        title: "Bounty Gold",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/BountyGold.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ChristmasCarolMegaways1": {
        title: "Christmas Carol Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ChristmasCarolMegaways1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DiamondStrike100000": {
        title: "Diamond Strike 100 000",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DiamondStrike100000.png",
        keywords: "wallfair, crypto, casino, lottery, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:EightDragons": {
        title: "8 Dragons",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/EightDragons.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:FireStrike": {
        title: "Fire Strike",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/FireStrike.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GoldParty": {
        title: "Gold Party",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GoldParty.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:HoneyHoneyHoney": {
        title: "Honey Honey Honey",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/HoneyHoneyHoney.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JohnHunterandtheBookofTut": {
        title: "John Hunter and the Book of Tut",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JohnHunterandtheBookofTut.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JourneytotheWest": {
        title: "Journey to the West",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JourneytotheWest.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LiveBaccaratE": {
        title: "Baccarat 6",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LiveBaccaratE.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LuckyNewYear": {
        title: "Lucky New Year",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LuckyNewYear.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MultihandBlackjack": {
        title: "Multihand Blackjack",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MultihandBlackjack.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:CashBonanza": {
        title: "Cash Bonanza",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/CashBonanza.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:CrystalCavernsMegaways": {
        title: "Crystal Caverns Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/CrystalCavernsMegaways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DragonKingdomEyesOfFire1": {
        title: "Dragon Kingdom - Eyes of Fire",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DragonKingdomEyesOfFire1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:EmptytheBank1": {
        title: "Empty the Bank",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/EmptytheBank1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:FruitParty2": {
        title: "Fruit Party 2",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/FruitParty2.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GoldTrain": {
        title: "Gold Train",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GoldTrain.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:HotSafari": {
        title: "Hot Safari",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/HotSafari.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JohnHunterandtheTomboftheScarabQueen": {
        title: "John Hunter and the Tomb of the Scarab Queen",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JohnHunterandtheTomboftheScarabQueen.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LiveBaccaratA": {
        title: "Baccarat 1",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LiveBaccaratA.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LobbyRoulette": {
        title: "Lobby Roulette",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LobbyRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MasterChensFortune": {
        title: "Master Chen's Fortune",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MasterChensFortune.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ChilliHeatMegaways": {
        title: "Chilli Heat Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ChilliHeatMegaways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DayofDead": {
        title: "Day of Dead",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DayofDead.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DwarvenGoldDeluxe": {
        title: "Dwarven Gold Deluxe",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DwarvenGoldDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:FairytaleFortune": {
        title: "Fairytale Fortune",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/FairytaleFortune.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GreatRhinoDeluxe": {
        title: "Great Rhino Deluxe",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GreatRhinoDeluxe.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GatesofValhalla": {
        title: "Gates of Valhalla",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GatesofValhalla.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GreekGods": {
        title: "Greek Gods",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GreekGods.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:IndianRoulette": {
        title: "Indian Roulette",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/IndianRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JokersJewels": {
        title: "Joker's Jewels",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JokersJewels.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LiveBaccaratD": {
        title: "Baccarat 5",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LiveBaccaratD.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LuckyLightning1": {
        title: "Lucky Lightning",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LuckyLightning1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MegaSicBo": {
        title: "Mega Sic Bo",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MegaSicBo.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DanceParty": {
        title: "Dance Party",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DanceParty.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DragonTigerLive": {
        title: "Dragon Tiger",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DragonTigerLive.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ExtraJuicyMegaways": {
        title: "Extra Juicy Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ExtraJuicyMegaways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GameShowLobby": {
        title: "Game Show Lobby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GameShowLobby.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JokerKing1": {
        title: "Joker King",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JokerKing1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LiveBaccaratC": {
        title: "Baccarat 3",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LiveBaccaratC.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LuckyGraceandCharm": {
        title: "Lucky Grace and Charm",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LuckyGraceandCharm.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MegaRoulette": {
        title: "Mega Roulette",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MegaRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Mysterious": {
        title: "Mysterious",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Mysterious.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:DiamondStrike": {
        title: "Diamond Strike",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/DiamondStrike.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:EgyptianFortunes": {
        title: "Egyptian Fortunes",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/EgyptianFortunes.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Fire88": {
        title: "Fire 88",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Fire88.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GemsBonanza1": {
        title: "Gems Bonanza",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GemsBonanza1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:HerculesandPegasus": {
        title: "Hercules and Pegasus",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/HerculesandPegasus.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JohnHunterandtheAztecTreasure": {
        title: "John Hunter and the Aztec Treasure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JohnHunterandtheAztecTreasure.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JurassicGiants": {
        title: "Jurassic Giants",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JurassicGiants.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LiveBlackjackD": {
        title: "Blackjack 15",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LiveBlackjackD.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MagicCrystals": {
        title: "Magic Crystals",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MagicCrystals.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MoneyMouse": {
        title: "Money Mouse",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MoneyMouse.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PandaFortune": {
        title: "Panda's Fortune",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PandaFortune.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PixieWings": {
        title: "Pixie Wings",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PixieWings.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:FloatingDragon1": {
        title: "Floating Dragon",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/FloatingDragon1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:GoldenBeauty": {
        title: "Golden Beauty",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/GoldenBeauty.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:HerculesSonZeus": {
        title: "Hercules Son of Zeus",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/HerculesSonZeus.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:HottoBurnHoldandSpin1": {
        title: "Hot to Burn Hold and Spin",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/HottoBurnHoldandSpin1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JungleGorilla1": {
        title: "Jungle Gorilla",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JungleGorilla1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MustangGold": {
        title: "Mustang Gold",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MustangGold.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LiveBlackjackC": {
        title: "Blackjack 14",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LiveBlackjackC.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MadameDestinyMegaways1": {
        title: "Madame Destiny Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MadameDestinyMegaways1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MightyKong": {
        title: "Mighty Kong",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MightyKong.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ONEBlackjack": {
        title: "ONE Blackjack",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ONEBlackjack.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PirateGold": {
        title: "Pirate Gold",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PirateGold.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ReleasetheKraken": {
        title: "Release the Kraken",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ReleasetheKraken.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:HotFiesta1": {
        title: "Hot Fiesta",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/HotFiesta1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JohnHunterandtheQuestforBermudaRiches": {
        title: "John Hunter and the Quest for Bermuda Riches",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JohnHunterandtheQuestforBermudaRiches.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LeprechaunSong": {
        title: "Leprechaun Song",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LeprechaunSong.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:lobby": {
        title: "Live Casino Lobby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/lobby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MagicJourney": {
        title: "Magic Journey",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MagicJourney.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MonkeyWarrior": {
        title: "Monkey Warrior",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MonkeyWarrior.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PandaGold10000": {
        title: "Panda Gold 10 000",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PandaGold10000.png",
        keywords: "wallfair, crypto, casino, lottery, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PyramidKing1": {
        title: "Pyramid King",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PyramidKing1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Roulette10Ruby": {
        title: "Roulette 10 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Roulette10Ruby.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SmugglersCove": {
        title: "Smugglers Cove",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SmugglersCove.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccaratD": {
        title: "Speed Baccarat 5",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccaratD.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JadeButterfly": {
        title: "Jade Butterfly",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JadeButterfly.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LadyGodiva": {
        title: "Lady Godiva",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LadyGodiva.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LiveBaccaratB": {
        title: "Baccarat 2",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LiveBaccaratB.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LuckyDragons": {
        title: "Lucky Dragons",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LuckyDragons.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MasterJoker": {
        title: "Master Joker",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MasterJoker.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PeakyBlinders": {
        title: "Peaky Blinders",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PeakyBlinders.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:QueenOfAtlantis": {
        title: "Queen of Atlantis",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/QueenOfAtlantis.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:RouletteAzure": {
        title: "Roulette 1 - Azure",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/RouletteAzure.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpartanKing": {
        title: "Spartan King",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpartanKing.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccarat13": {
        title: "Speed Baccarat 13",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccarat13.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:JohnHunterAndtheMayanGods": {
        title: "John Hunter and the Mayan Gods",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/JohnHunterAndtheMayanGods.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LeprechaunCarol": {
        title: "Leprechaun Carol",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LeprechaunCarol.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LiveRouletteA": {
        title: "Roulette 2",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LiveRouletteA.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MagiciansSecrets": {
        title: "Magician's Secrets",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MagiciansSecrets.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MonkeyMadness": {
        title: "Monkey Madness",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MonkeyMadness.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PandaFortune21": {
        title: "Panda Fortune 2",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PandaFortune21.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PowerofThorMegaways": {
        title: "Power of Thor Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PowerofThorMegaways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:RockVegas": {
        title: "Rock Vegas",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/RockVegas.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SevenMonkeys": {
        title: "7 Monkeys",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SevenMonkeys.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccarat11": {
        title: "Speed Baccarat 11",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccarat11.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccaratE": {
        title: "Speed Baccarat 6",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccaratE.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:LiveBlackjackB": {
        title: "Blackjack 12",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/LiveBlackjackB.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MadameDestiny": {
        title: "Madame Destiny",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MadameDestiny.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MightofRa": {
        title: "Might of Ra",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MightofRa.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MysticChief": {
        title: "Mystic Chief",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MysticChief.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PiggyBankBills": {
        title: "Piggy Bank Bills",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PiggyBankBills.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Santa": {
        title: "Santa",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Santa.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:RainbowGold": {
        title: "Rainbow Gold",
        description: "Match the high paying lucky symbols to win big. The 3×5 game grid gives players the chance to win x5,000, leaving you feeling full of the old Irish luck. Sit back and let the wishing well and lucky horseshoes seal your fate in this enticing game.",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/RainbowGold.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:RouletteMacao": {
        title: "Roulette 3 - Macao",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/RouletteMacao.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccarat8": {
        title: "Speed Baccarat 8",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccarat8.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:StarPiratesCode": {
        title: "Star Pirates Code",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/StarPiratesCode.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TemujinTreasures": {
        title: "Temujin Treasures",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TemujinTreasures.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ThreeGenieWishes": {
        title: "3 Genie Wishes",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ThreeGenieWishes.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MegaWheel": {
        title: "Mega Wheel",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MegaWheel.png",
        keywords: "wallfair, crypto, casino, lottery, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ONEBlackjack2Indigo": {
        title: "ONE Blackjack 2 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ONEBlackjack2Indigo.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PirateGoldDeluxe1": {
        title: "Pirate Gold Deluxe",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PirateGoldDeluxe1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ReturnOftheDead1": {
        title: "Return of the Dead",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ReturnOftheDead1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccaratB": {
        title: "Speed Baccarat 2",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccaratB.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SugarRush": {
        title: "Sugar Rush",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SugarRush.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TheDogHouse": {
        title: "The Dog House",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheDogHouse.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TreasureWild": {
        title: "Treasure Wild",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TreasureWild.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WildBeachParty": {
        title: "Wild Beach Party",
        description: "It’s time for that much needed vacation! Wild Beach Party™ is a 7×7 cluster paying slot filled with fruity symbols and wild multipliers, all played out in front of a changing beach scene that’s tranquil by day but wild at night!",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WildBeachParty.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WildSpells": {
        title: "Wild Spells",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WildSpells.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:MysteriousEgypt": {
        title: "Mysterious Egypt",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/MysteriousEgypt.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PhoenixForge1": {
        title: "Phoenix Forge",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PhoenixForge1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:QueenofGold100000": {
        title: "Queen of Gold 100 000",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/QueenofGold100000.png",
        keywords: "wallfair, crypto, casino, lottery, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:RouletteGermany": {
        title: "Roulette 5 - German",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/RouletteGermany.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:RouletteRussia": {
        title: "Roulette 4 - Russian",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/RouletteRussia.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccarat9": {
        title: "Speed Baccarat 9",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccarat9.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:StarzMegaways": {
        title: "Starz Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/StarzMegaways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TheAmazingMoneyMachine1": {
        title: "The Amazing Money Machine",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheAmazingMoneyMachine1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ThreeKindoms": {
        title: "3 Kingdoms - Battle of Red Cliffs",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ThreeKindoms.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:UltraHoldandSpin": {
        title: "Ultra Hold and Spin",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/UltraHoldandSpin.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WildWildRiches": {
        title: "Wild Wild Riches",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WildWildRiches.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PantherQueen": {
        title: "Panther Queen",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PantherQueen.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Queenie": {
        title: "Queenie",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Queenie.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Roulette9TheClub": {
        title: "Roulette 9 – The Club",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Roulette9TheClub.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SnakesandLaddersMegadice": {
        title: "Snakes and Ladders Megadice",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SnakesandLaddersMegadice.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccarat12": {
        title: "Speed Baccarat 12",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccarat12.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedRoulette": {
        title: "Live Speed Roulette",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedRoulette.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SweetBonanza": {
        title: "Sweet Bonanza",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SweetBonanza.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TheDogHouseMegaways1": {
        title: "The Dog House Megaways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheDogHouseMegaways1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TreeofRiches": {
        title: "Tree of Riches",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TreeofRiches.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:VampiresvsWolves": {
        title: "Vampires vs Wolves",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/VampiresvsWolves.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WolfGold": {
        title: "Wolf Gold",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WolfGold.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:PekingLuck": {
        title: "Peking Luck",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/PekingLuck.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:QueenOfGold": {
        title: "Queen of Gold",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/QueenOfGold.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:RouletteCrystal": {
        title: "Roulette Crystal",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/RouletteCrystal.png",
        keywords: "wallfair, crypto, casino, roulette, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccarat100": {
        title: "Speed Baccarat 10",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccarat100.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccarat7": {
        title: "Speed Baccarat 7",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccarat7.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:StarlightPrincess": {
        title: "Starlight Princess",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/StarlightPrincess.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SweetBonanzaXmas": {
        title: "Sweet Bonanza Xmas",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SweetBonanzaXmas.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TheWildMachine": {
        title: "The Wild Machine",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheWildMachine.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TripleTigers": {
        title: "Triple Tigers",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TripleTigers.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WildDepth": {
        title: "Wild Depth",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WildDepth.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:RiseofGizaPowerNudge": {
        title: "Rise of Giza PowerNudge",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/RiseofGizaPowerNudge.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SantasWonderland": {
        title: "Santa's Wonderland",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SantasWonderland.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccaratC": {
        title: "Speed Baccarat 3",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccaratC.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:Super7s": {
        title: "Super 7s",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/Super7s.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TheGreatChickenEscape": {
        title: "The Great Chicken Escape",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheGreatChickenEscape.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TripleDragons": {
        title: "Triple Dragons",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TripleDragons.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:VegasMagic": {
        title: "Vegas Magic",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/VegasMagic.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WolfGold1000000": {
        title: "Wolf Gold 1 000 000",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WolfGold1000000.png",
        keywords: "wallfair, crypto, casino, lottery, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SafariKing": {
        title: "Safari King",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SafariKing.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SpeedBaccaratA": {
        title: "Speed Baccarat 1",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SpeedBaccaratA.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:StreetRace": {
        title: "Street Racer",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/StreetRace.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TheChampions": {
        title: "The Champions",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheChampions.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:ThreeStarFortune": {
        title: "Three Star Fortune",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/ThreeStarFortune.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:VegasNights": {
        title: "Vegas Nights",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/VegasNights.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:YumYumPowerways": {
        title: "Yum Yum Powerways",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/YumYumPowerways.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:StarBounty": {
        title: "Star Bounty",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/StarBounty.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SweetBonanzaCandyland": {
        title: "Sweet Bonanza Candyland",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SweetBonanzaCandyland.png",
        keywords: "wallfair, crypto, casino, lottery, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TheUltimate5": {
        title: "The Ultimate 5",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheUltimate5.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TreasureHorse": {
        title: "Treasure Horse",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TreasureHorse.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:VoodooMagic": {
        title: "Voodoo Magic",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/VoodooMagic.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SuperJoker": {
        title: "Super Joker",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SuperJoker.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TheHandOfMidas": {
        title: "The Hand of Midas",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheHandOfMidas.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TripleJokers": {
        title: "Triple Jokers",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TripleJokers.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WildBooster1": {
        title: "Wild Booster",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WildBooster1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WildWalker": {
        title: "Wild Walker",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WildWalker.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:SuperX": {
        title: "Super X",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/SuperX.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TheMagicCauldronEnchantedBrew1": {
        title: "The Magic Cauldron - Enchanted Brew",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheMagicCauldronEnchantedBrew1.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:TicTacTake": {
        title: "Tic Tac Take",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/TicTacTake.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:VIPBlackjack1Ruby": {
        title: "VIP Blackjack 1 - Ruby",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/VIPBlackjack1Ruby.png",
        keywords: "wallfair, crypto, casino, card, pragmaticplaylive, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WildPixies": {
        title: "Wild Pixies",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WildPixies.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:UltraBurn": {
        title: "Ultra Burn",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/UltraBurn.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WildGladiators": {
        title: "Wild Gladiators",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WildGladiators.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    },
    "/softswiss-game/pragmaticexternal:WildWestGold": {
        title: "Wild West Gold",
        image: "https://cdn.softswiss.net/i/s3/pragmaticexternal/WildWestGold.png",
        keywords: "wallfair, crypto, casino, slots, pragmaticplay, pragmaticexternal"
    }
};

module.exports = {
  // Append routes
  appendRoutes: async (apiPath, listPaths = []) => {
    for (let listCounter = 0; listCounter < listPaths.length; listCounter++) {
      // quering api to get data

      console.log(`${apiPath}${listPaths[listCounter]}`);
      const response = await axios.get(`${apiPath}${listPaths[listCounter]}`);


      if (response && response.data && response.data.events) {
        const dataKeys = Object.keys(response.data.events);
        dataKeys.forEach(key => {
          const singleEvent = response.data.events[key];
          const { slug, name, description, preview_image_url : previewImageUrl, bet, tags } = singleEvent;

          const eventTags = _.map(tags, 'name') || [];
          const keywordsToUse = eventTags.length
            ? eventTags.join(', ')
            : meta['/'].keywords;

          const eventSlug = '/trade/' + slug;
          meta[eventSlug] = {
            title: name.split("\"").join(""),
            description: description ? description.split("\"").join("") : name.split("\"").join(""),
            image: previewImageUrl || meta['/'].image,
            keywords: keywordsToUse,
          };
          // Getting data from bets
          if (bet) {
              const {
                market_question : marketQuestion,
                description,
                evidenceDescription,
                slug: betSlug,
              } = bet;
              meta[`${eventSlug}/${betSlug}`] = {
                title: marketQuestion.split("\"").join(""),
                description: description ? description.split("\"").join("") : evidenceDescription.split("\"").join(""),
                image: previewImageUrl || meta['/'].image,
                keywords: `bet, ${keywordsToUse}`,
              };
          }
        });
      }
    }
    return meta;
  },
  // Append routes
  appendRoutesForUser: async (apiPath, userId) => {
    console.log(apiPath);
    const response = await axios.get(apiPath);
    if (response && response.data) {
      let data = response.data;
      const userName = data['username'] || 'alpaca';
      const aboutMe =
        data['aboutMe'] ||
        'This user has not provided an about info yet. How boring!';
      const photoUrl =
        data['profilePicture'] || 'https://staking.wallfair.io/logo512y.png?v=3';
      const userTag = '/user/' + userId;
      meta[userTag] = {
        title: userName,
        description: aboutMe,
        image: photoUrl,
        keywords: 'wallfair, casino, users, profile, social, gaming, crypto',
      };
    }
    return meta;
  },
};
