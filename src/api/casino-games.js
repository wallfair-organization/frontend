import * as ApiUrls from '../constants/Api';
import axios from 'axios';
import ContentTypes from '../constants/ContentTypes';
import {TOKEN_NAME} from "../constants/Token";
import { currencyDisplay } from 'helper/Currency';

const createInstance = (host, apiPath) => {
  return axios.create({
    baseURL: `${host}${apiPath}`,
    timeout: 30000,
    headers: {
      'content-type': ContentTypes.applicationJSON,
      accept: ContentTypes.applicationJSON,
    },
  });
};

class GameApi {
  constructor(host, token) {
    this.host = host;
    this.api = createInstance(host, '/');
    this.setToken(token);
  }

  setToken = token => {
    if (!token) return;
    const authentication = 'Bearer ' + token;

    this.api.defaults.headers.common['Authorization'] = authentication;
  };

  createTrade = payload => {
    return this.api.post(ApiUrls.API_WHEEL_BET, payload).catch(error => {
      console.log('[API Error] called: createTrade', error);
      throw error;
    });
  }

  createTradePlinko = payload => {
    return this.api.post(ApiUrls.API_PLINKO_BET, payload).catch(error => {
      console.log('[API Error] called: createTrade', error);
      throw error;
    });
  }

  createTradeCannon = payload => {
    return this.api.post(ApiUrls.API_CANNON_BET, payload).catch(error => {
      console.log('[API Error] called: createTrade', error);
      throw error;
    });
  }

  createTradeMines = payload => {
    return this.api.post(ApiUrls.API_MINES_BET, payload).catch(error => {
      console.log('[API Error] called: createMinesTrade', error);
      throw error;
    });
  }

  getCurrentMines = () => {
    return this.api.get(ApiUrls.API_MINES_CURRENT).catch(error => {
      console.log('[API Error] called: getCurrentMines', error);
      throw error;
    });
  }

  checkCellMines = payload => {
    return this.api.post(ApiUrls.API_MINES_CHECK, payload).catch(error => {
      console.log('[API Error] called: checkCellMines', error);
      throw error;
    });
  }

  cashoutMines = payload => {
    return this.api.post(ApiUrls.API_MINES_CASHOUT).catch(error => {
      console.log('[API Error] called: cashoutMines', error);
      throw error;
    });
  }

  getCurrentFairnessByGame = (gameTypeId) => {
    const callThis = ApiUrls.API_GET_CURRENT_FAIRNESS_SIMPLE_GAMES.replace(':gameTypeId', gameTypeId);

    return this.api.get(callThis).catch(error => {
      console.log('[API Error] called: getCurrentFairnessByGame', error);
      throw error;
    });
  }

  updateCurrentFairnessByGame = (gameTypeId, data) => {
    const callThis = ApiUrls.API_UPDATE_CURRENT_FAIRNESS_SIMPLE_GAMES.replace(':gameTypeId', gameTypeId);

    return  this.api.post(callThis, data).catch(error => {
      console.log('[API Error] called: updateCurrentFairnessByGame', error);
      throw error;
    });
  }
}

const Api = createInstance(ApiUrls.CRASH_GAMES_BACKEND_URL, '/');

const getSpinsAlpacaWheel = (gameTypeId, userId) => {
  let callThis = ApiUrls.API_CURRENT_BY_GAME_TYPE_SIMPLE_GAMES.replace(':gameTypeId', gameTypeId);

  if(userId) {
    callThis = callThis + `?userId=${userId}`
  }

  return Api.get(callThis).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};

const setInitialEvoplaySession = (payload) => {
  const callThis = ApiUrls.API_SET_EVOPLAY_SESSION;

  return Api.post(callThis, payload).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};

const getEvoplaygames = (payload) => {
  const callThis = ApiUrls.API_GET_EVOPLAY_GAMES;

  return Api.get(callThis, payload).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};
const getSoftswissgames = (payload) => {
  const callThis = ApiUrls.API_GET_SOFTSWISS_URLGAME;
  return Api.post(callThis, payload).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};
const getUrlgame = (payload) => {
  const callThis = ApiUrls.API_GET_EVOPLAY_URLGAME;
  return Api.post(callThis, payload).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};

const setInitialSession = (payload) => {
  const callThis = ApiUrls.API_SET_SESSION;

  return Api.post(callThis, payload).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};

const setToken = token => {
  const authentication = 'Bearer ' + token;
  Api.defaults.headers.common['Authorization'] = authentication;
};

const createTrade = payload => {
  return Api.post(ApiUrls.API_WHEEL_BET, payload).catch(error => {
    console.log('[API Error] called: createTrade', error);
    throw error;
  });
};

const transformUser = user => {

  const selectedStakedAmount = process.env.REACT_APP_PLAYMONEY === 'true' ? user.stakedamount :  user.stakedamountWfair;
  const selectedCurrency = currencyDisplay(user.gamescurrency);

  return {
    crashFactor: user.crashfactor,
    createdAt: user.created_at,
    gameMatch: user.game_match,
    gameHash: user.gamehash,
    gameId: user.gameid,
    stakedAmount: selectedStakedAmount,
    state: 2,
    userId: user.userid,
    username: user.username,
    rewardAmount: user.profit ? user.profit + parseFloat(selectedStakedAmount) : user.crashfactor * parseFloat(selectedStakedAmount),
    gamesCurrency: selectedCurrency
  };
}

const getLuckyUsers = () => {
  return Api.get(ApiUrls.API_TRADES_LUCKY).then(response => ({
    data: response.data.map(transformUser),
  }));
};

const getHighUsers = () => {
  return Api.get(ApiUrls.API_TRADES_HIGH).then(response => ({
    data: response.data.map(transformUser),
  }));
};

const getTotalBetsVolumeByRange = (range = '24h') => {
  const url = ApiUrls.CRASH_GAME_GET_VOLUME_BETS.replace(':range', range);
  return Api.get(url);
};

const getLastCashoutsMines = (gameTypeId, userId) => {
  let callThis = ApiUrls.API_CURRENT_BY_GAME_TYPE_SIMPLE_GAMES.replace(':gameTypeId', gameTypeId);

  if(userId) {
    callThis = callThis + `?userId=${userId}`
  }

  return Api.get(callThis).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};
//getEvoplaygames
const getSingleGameDetailById = (gameHash, gameTypeId, type) => {
  const callThis = ApiUrls.SINGLE_GAME_API_GET_GAME_DETAILS
      .replace(':gameHash', gameHash);

  return Api.get(callThis + (type ? `/${type}` : '') + `?gameId=${gameTypeId}`).catch(error => {
    console.log('[API Error] called: getSingleGameDetailById', error);
  });
}

export {
  GameApi,
  Api,
  setToken,
  setInitialEvoplaySession,
  getEvoplaygames,
  getUrlgame,
  getSoftswissgames,
  setInitialSession,
  createTrade,
  getSpinsAlpacaWheel,
  getLuckyUsers,
  getHighUsers,
  getTotalBetsVolumeByRange,
  getLastCashoutsMines,
  getSingleGameDetailById
};
