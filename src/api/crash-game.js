import * as ApiUrls from '../constants/Api';
import axios from 'axios';
import ContentTypes from '../constants/ContentTypes';

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

const Api = createInstance(ApiUrls.CRASH_GAME_BACKEND_URL, '/');

const setToken = token => {
  const authentication = 'Bearer ' + token;

  Api.defaults.headers.common['Authorization'] = authentication;
};

const createTrade = payload => {
  return Api.post(ApiUrls.API_TRADE_CREATE, payload).catch(error => {
    console.log('[API Error] called: createTrade', error);
    throw error;
  });
};

const cancelBet = () =>
  Api.delete(ApiUrls.API_TRADE_CREATE).catch(error => {
    throw error;
  });

const getCurrentGameInfo = () => {
  return Api.get(ApiUrls.API_CURRENT).catch(error => {
    console.log('[API Error] called: getCurrentGameInfo', error);
  });
};

const cashOut = () => {
  return Api.post(ApiUrls.API_CASH_OUT, {}).catch(error => {
    console.log('[API Error] called: Cash Out', error);
    throw error;
  });
};

const getGameDetailById = (gameId, type) => {
  const gameUrl = ApiUrls.CRASH_GAME_API_GET_GAME_DETAILS.replace(
    ':gameId',
    gameId
  );

  return Api.get(gameUrl + (type ? `/${type}` : '')).catch(error => {
    console.log('[API Error] called: getGameDetailById', error);
  });
};

const transformUser = user => ({
  crashFactor: user.crashfactor,
  createdAt: user.created_at,
  gameMatch: user.game_match,
  gameHash: user.gamehash,
  stakedAmount: user.stakedamount,
  state: 2,
  userId: user.userid,
  username: user.username,
  rewardAmount: user.crashfactor * user.stakedamount,
});

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

export {
  Api,
  setToken,
  createTrade,
  getCurrentGameInfo,
  cashOut,
  cancelBet,
  getGameDetailById,
  getLuckyUsers,
  getHighUsers,
};
