const { GAMES, EXTERNAL_GAMES } = require('../constants/Games');
const _ = require('lodash');

export const getGameById = gameTypeId => {
  return _.find(GAMES, { id: gameTypeId });
};

export const getExternalGames = () => {
  return EXTERNAL_GAMES.map((game)=> {
    game.id = ObjectId(game.TechnicalName);
    return game;
  })
}

export const ObjectId = (gamename) => {
  const encoded = new Buffer(gamename).toString('hex').substring(0,23)
  const fill = 24 - encoded.length
  return encoded + ' '.repeat(fill).replace(/./g, (v, i) =>
    ((parseInt(encoded[(i*2)%encoded.length], 16) + parseInt(i*2, 16))%16).toString(16)
  )
}
const enabledSoftswissProviders = {

    onespin4win:{
        feature_group:['basic']
    },
    absoluteLiveGaming:{
      feature_group:['basic','ajz','ait']
    },
    atmosphera:{
      feature_group:['basic','liveslots']
    },
    everymatrix:{
      feature_group:['spearhead_basic']
    },
    evolution:{
      feature_group:['extra','live','live_vip','live_classic','lightning','premium','rng']
    },
    ezugi:{
      feature_group:['jackpot','live','premium']
    },
    gameart:{
      feature_group:['basic','branded','premium']
    },
    groove:{
      feature_group:['basic','felixgaming']
    },
    habanero:{
      feature_group:['basic']
    },
    kagaming:{
      feature_group:['basic']
    },
    kalamba:{
      feature_group:['basic']
    },
    mascot:{
      feature_group:['basic']
    },
    mrslotty:{
      feature_group:['basic','eagaming','fazi']
    },
    eagaming:{
      feature_group:['eagaming']
    },
    fazi:{
      feature_group:['fazi']
    },
    pariplay:{
      feature_group:['basic','branded']
    },
    pushgaming:{
      feature_group:['basic']
    },
    quickspin:{
      feature_group:['basic','rtp']
    },
    slotmill:{
      feature_group:['basic']
    },
    softswiss:{
      feature_group:['basic','new']
    },
    thunderkick:{
      feature_group:['basic']
    },
    yggdrasil:{
      feature_group:['basic']
    },
    wazdan:{
      feature_group:['basic']
    },
    epicmedia:{
      feature_group:['augustgaming','blueprint','merkur','kiron']
    },
    igtech:{
      feature_group:['basic']
    },
    bsg:{
      feature_group:['standard','vip']
    },
    belatra:{
      feature_group:['basic']
    }
}
export const prepareSoftSwissGames = (softswissGames, gamesCategory, provider) => {
  const output = [];
  const thumbUrl = "https://cdn.softswiss.net/i/s3/";

  for (let key in softswissGames) {
    const gameInfo = softswissGames[key];
    //Skips games that are not on the enabled feature groups
    let gameProvider = gameInfo.provider;
    if(gameProvider==='1spin4win'){
      gameProvider='onespin4win';
    }
    if( !enabledSoftswissProviders[gameProvider]?.feature_group.includes(gameInfo.feature_group)){
      //console.log(`Game: ${gameInfo.identifier} of game provider ${gameInfo.provider}, with feature group: ${gameInfo.feature_group} was hidden`);
      continue;
    }

    if (provider !== undefined && provider !== gameInfo.producer) {
      continue;
    }

    const catSubType = gameInfo.category;
    const name = gameInfo.title;
   let translatedCat = null;

    if (catSubType === 'slots') {
      translatedCat = 'Slot Games';
    }
    if (catSubType === 'roulette') {
      translatedCat = 'Roulette Games';
    }
    if (catSubType === 'casual' || catSubType === 'lottery' || catSubType === 'craps' ) {
      translatedCat = 'Casino Games';
    }
    if (catSubType === 'card' || catSubType === 'poker' || catSubType === 'video_poker') {
      translatedCat = 'Card Games';
    }
    if (catSubType === 'Instant' || catSubType === 'socketgames') {
      translatedCat = 'Instant Win Games';
    }
    if (gamesCategory === "Card Games") {
      if (catSubType === 'Blackjack' || catSubType === 'card' || catSubType === 'Poker' || (catSubType === 'Table' && name.indexOf('Poker') > -1)) {
        translatedCat = 'Card Games';
      }
    } else if (gamesCategory === "Poker") {
      if (catSubType === 'Poker' || (catSubType === 'Table' && name.indexOf('Poker') > -1)) {
        translatedCat = 'Poker Games';
      }
    } else if (gamesCategory === "Blackjack") {
      if (catSubType === 'Blackjack') {
        translatedCat = 'Blackjack Games';
      }
    } else if (gamesCategory === "Roulette") {
      if (catSubType === 'roulette') {
        translatedCat = 'Roulette Games';
      }
    } else if (name.indexOf('Keno') > -1) {
      translatedCat = 'Keno Games';
    } else {
      if (catSubType === 'Blackjack' || catSubType === 'Table' || catSubType === 'Baccarat' || catSubType === 'Roulette' || catSubType === 'Poker') {
        translatedCat = 'Casino Games';
      }
    }
    const imageName = gameInfo.identifier.split(':')[1] + '.png';

    const gameEntry = {
      GameProvider: 'softswiss',
      TechnicalName: gameInfo.title,
      GameCategory: translatedCat || catSubType,
      GameThumb: thumbUrl + gameInfo.provider +'/'+ imageName,
      _cfg: gameInfo
    }
    output.push(gameEntry);
  }
  return output;
}

export const prepareEvoplayGames = (evoplayGames,gamesCategory) => {
  const output = [];
  for (let key in evoplayGames) {
    const gameInfo = evoplayGames[key];
    const catSubType = gameInfo.game_sub_type;
    const name = gameInfo.name;
    let translatedCat = null;
    if(catSubType === 'Slot') {
      translatedCat = 'Slot Games';
    }

    if(catSubType === 'Instant' || catSubType === 'socketgames') {
      translatedCat = 'Instant Win Games';
    }
    if (gamesCategory === "Card Games") {
      if (catSubType === 'Blackjack' || catSubType === 'Baccarat' || catSubType === 'Poker' || (catSubType === 'Table' && name.indexOf('Poker') > -1)) {
        translatedCat = 'Card Games';
      }
    } else if (gamesCategory === "Poker") {
      if (catSubType === 'Poker' || (catSubType === 'Table' && name.indexOf('Poker') > -1) ) {
        translatedCat = 'Poker Games';
      }
    } else if (gamesCategory === "Blackjack") {
      if (catSubType === 'Blackjack') {
        translatedCat = 'Blackjack Games';
      }
    } else if (gamesCategory === "Roulette") {
      if (catSubType === 'Roulette') {
        translatedCat = 'Roulette Games';
      }
    } else if (name.indexOf('Keno') > -1) {
        translatedCat = 'Keno Games';
    } else {
      if (catSubType === 'Blackjack' || catSubType === 'Table' || catSubType === 'Baccarat' || catSubType === 'Roulette' || catSubType === 'Poker') {
        translatedCat = 'Casino Games';
      }
    }


    const gameEntry = {
      GameProvider: 'evoplay',
      TechnicalName: gameInfo.name,
      TechnicalCategory: gameInfo.name,
      GameCategory: translatedCat || catSubType,
      absolute_name: gameInfo.absolute_name,
      gameKey: key,
      _cfg: gameInfo
    }
    output.push(gameEntry);
  }

  return output;
}
