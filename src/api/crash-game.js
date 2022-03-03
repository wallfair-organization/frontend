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
  constructor(host, token, gameId) {
    this.host = host;
    this.api = createInstance(host, '/');
    this.setToken(token);
    this.gameId = gameId
  }
  setToken = token => {
    if (!token) return;
    const authentication = 'Bearer ' + token;

    this.api.defaults.headers.common['Authorization'] = authentication;
  };

  createTrade = payload => {
    return this.api.post(ApiUrls.API_TRADE_CREATE_ELON + `/${this.gameId}`, payload).catch(error => {
      console.log('[API Error] called: createTrade', error);
      throw error;
    });
  };

  cancelBet = () =>
    this.api.delete(ApiUrls.API_TRADE_CREATE_ELON + `/${this.gameId}`).catch(error => {
      throw error;
    });

  getCurrentGameInfo = () => {
    return this.api.get(ApiUrls.API_CURRENT_ELON + `/${this.gameId}`).catch(error => {
      console.log('[API Error] called: getCurrentGameInfo', error);
    });
  };

  cashOut = () => {
    return this.api.post(ApiUrls.API_CASH_OUT_ELON + `/${this.gameId}`, {}).catch(error => {
      console.log('[API Error] called: Cash Out', error);
      throw error;
    });
  };

  getLuckyUsers = gameId => {
    const url = gameId ? ApiUrls.API_TRADES_LUCKY.replace(':gameId', gameId) : ApiUrls.API_TRADES_LUCKY.replace('/:gameId', '');
    return Api.get(url).then(
      response => ({
        data: response.data.map(transformUser),
      })
    );
  };

  getHighUsers = gameId => {
    const url = gameId ? ApiUrls.API_TRADES_HIGH.replace(':gameId', gameId) : ApiUrls.API_TRADES_HIGH.replace('/:gameId', '');
    return Api.get(url).then(
      response => ({
        data: response.data.map(transformUser),
      })
    );
  };
}

const Api = createInstance(ApiUrls.CRASH_GAME_BACKEND_URL, '/');

const setToken = token => {
  const authentication = 'Bearer ' + token;

  Api.defaults.headers.common['Authorization'] = authentication;
};

const createTrade = payload => {
  return Api.post(ApiUrls.API_TRADE_CREATE_ELON, payload).catch(error => {
    console.log('[API Error] called: createTrade', error);
    throw error;
  });
};

const cancelBet = () =>
  Api.delete(ApiUrls.API_TRADE_CREATE_ELON).catch(error => {
    throw error;
  });

const getCurrentGameInfo = () => {
  return Api.get(ApiUrls.API_CURRENT_ELON).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};

const cashOut = () => {
  return Api.post(ApiUrls.API_CASH_OUT_ELON, {}).catch(error => {
    console.log('[API Error] called: Cash Out', error);
    throw error;
  });
};

const getGameDetailById = (gameHash, gameTypeId, type) => {
  const gameUrl = ApiUrls.CRASH_GAME_API_GET_GAME_DETAILS.replace(
    ':gameHash',
    gameHash
  );

  return Api.get(gameUrl + (type ? `/${type}` : '') + `?gameId=${gameTypeId}`).catch(error => {
    console.log('[API Error] called: getGameDetailById', error);
  });
};

const transformUser = user => {

  const selectedStakedAmount = process.env.REACT_APP_PLAYMONEY !== 'true' ? user.stakedamount :  user.stakedamountWfair;
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
    gamesCurrency: selectedCurrency,
  };
}

const getLuckyUsers = data => {
  const { gameId } = data || {};
  const url = gameId ? ApiUrls.API_TRADES_LUCKY.replace(':gameId', gameId) : ApiUrls.API_TRADES_LUCKY.replace('/:gameId', '');
  return Api.get(url).then(
    response => ({
      data: response.data.map(transformUser),
    })
  );
};

const getHighUsers = data => {
  const { gameId } = data || {};
  const url = gameId ? ApiUrls.API_TRADES_HIGH.replace(':gameId', gameId) : ApiUrls.API_TRADES_HIGH.replace('/:gameId', '');
  return Api.get(url).then(
    response => ({
      data: response.data.map(transformUser),
    })
  );
};

const getUserBets = data => {
  const { userId, gameId } = data || {};
  let url = ApiUrls.API_TRADES_PER_USER.replace(':userId', userId);
  if(gameId) url += `/${gameId}`;
  return Api.get(url).then(
    response => ({
      data: response.data.map(transformUser),
    })
  );
};

const getTotalBetsVolumeByRange = (range = '24h') => {
  const url = ApiUrls.CRASH_GAME_GET_VOLUME_BETS.replace(':range', range);
  return Api.get(url);
};

export {
  GameApi,
  Api,
  setToken,
  createTrade,
  getCurrentGameInfo,
  cashOut,
  cancelBet,
  getGameDetailById,
  getLuckyUsers,
  getHighUsers,
  getTotalBetsVolumeByRange,
  getUserBets,
};
