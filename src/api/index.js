import * as ApiUrls from '../constants/Api';
import _ from 'lodash';
import axios from 'axios';
import ContentTypes from '../constants/ContentTypes';
import Store from '../store';
import { AuthenticationActions } from 'store/actions/authentication';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import {
  KYC_REFRESH_STATUS,
  SEND_BUY_WITH_CRYPTO,
  SEND_BUY_WITH_FIAT,
} from '../constants/Api';

const {
  store: { dispatch },
} = Store();

const createInstance = (host, apiPath) => {
  const axiosClient = axios.create({
    baseURL: `${host}${apiPath}`,
    timeout: 30000,
    headers: {
      'content-type': ContentTypes.applicationJSON,
      accept: ContentTypes.applicationJSON,
    },
  });
  axiosClient.interceptors.response.use(
    response => response,
    error => {
      if (
        error.response.status === 401 &&
        error.response.data?.message !== 'Invalid login'
      ) {
        dispatch(AuthenticationActions.forcedLogout());
      } else if (
        error.response.status === 403 &&
        error.response.data?.errors?.banData
      ) {
        dispatch(AuthenticationActions.forcedLogout());
        dispatch(
          PopupActions.show({
            popupType: PopupTheme.ban,
            options: {
              small: true,
              banData: error.response.data?.errors?.banData,
            },
          })
        );
      }
      throw error;
    }
  );
  return axiosClient;
};

const Api = createInstance(ApiUrls.BACKEND_URL, '/');
const WithdrawServiceApi = createInstance(ApiUrls.WITHDRAW_SERVICE_URL, '/');
const EventsServiceApi = createInstance(ApiUrls.EVENTS_SERVICE_URL, '/');

const setToken = token => {
  const authentication = 'Bearer ' + token;

  Api.defaults.headers.common['Authorization'] = authentication;
  WithdrawServiceApi.defaults.headers.common['Authorization'] = authentication;
  EventsServiceApi.defaults.headers.common['Authorization'] = authentication;
};

const sendSms = (phone) => {
  return Api.post(ApiUrls.API_AUTHENTICATION_SEND_SMS, {
    phone,
  })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const verifySms = (phone, smsToken, userId) => {
  return Api.post(ApiUrls.API_AUTHENTICATION_VERIFY_SMS, {
    phone,
    smsToken,
    userId,
  })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const verifyEmail = (userId, code) => {
  return Api.get(
    ApiUrls.API_AUTHENTICATION_VERIFY_EMAIL.replace(':userId', userId).replace(
      ':code',
      code
    )
  ).catch(error => {
    console.log('[API Error] called verifyEmail:', error);
  });
};

const resendEmailVerification = userId => {
  return Api.get(
    ApiUrls.API_AUTHENTICATION_RESEND_EMAIL_VERIFICATION.replace(
      ':userId',
      userId
    )
  ).catch(error => {
    console.log('[API Error] called verifyEmail:', error);
    throw error;
  });
};

const saveAdditionalInfo = (name, username, email) => {
  return Api.post(ApiUrls.API_AUTHENTICATION_SAVE_ADD_INFO_URL, {
    name,
    username,
    email,
  })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const fetchReferrals = userId => {
  return Api.get(ApiUrls.API_USER_REFERRAL_LIST, {
    user: {
      id: userId,
    },
  }).catch(error => {
    console.log('[API Error] called: fetchReferrals', error);
  });
};

const listEvents = () => {
  return Api.get(ApiUrls.API_EVENT_LIST).catch(error => {
    console.log('[API Error] called: listEvents', error);
  });
};

const listEventsFiltered = ({
  type,
  category,
  count,
  page,
  sortBy,
  upcoming,
  deactivated,
  searchQuery,
}) => {
  return Api.get(
    ApiUrls.API_EVENT_LIST_FILTERED.replace(':type', type)
      .replace(':category', category)
      .replace(':count', count)
      .replace(':page', page)
      .replace(':sortBy', sortBy)
      .replace(':upcoming', upcoming)
      .replace(':deactivated', deactivated)
      .replace(':searchQuery', searchQuery)
  ).catch(error => {
    console.log('[API Error] called: listEventsFIltered', error);
  });
};

const getUser = userId => {
  return Api.get(_.replace(ApiUrls.API_USER, ':id', userId)).catch(error => {
    console.log('[API Error] called: getUser', error);
  });
};

const getUserPublicInfo = userId => {
  return Api.get(_.replace(ApiUrls.API_USER_PUBLIC_INFO, ':id', userId)).catch(
    error => {
      console.log('[API Error] called: getUserPublicInfo', error);
    }
  );
};

const getUserPublicStats = userId => {
  return Api.get(_.replace(ApiUrls.API_USER_PUBLIC_STATS, ':id', userId)).catch(
    error => {
      console.log('[API Error] called: getUserPublicStats', error);
    }
  );
};

const checkUsername = username => {
  return Api.post(ApiUrls.API_USER_CHECK_USERNAME, { username }).catch(
    error => {
      console.log('[API Error] called: getUser', error);
    }
  );
};

const updateUser = (userId, user) => {
  return Api.patch(_.replace(ApiUrls.API_USER, ':id', userId), user).catch(
    error => {
      console.log('[API Error] called: patchUser', error);
      return error;
    }
  );
};

const requestTokens = () => {
  return Api.post(ApiUrls.API_USER_REQUEST_TOKENS);
};

const updateUserPreferences = (userId, preferences) => {
  return Api.patch(_.replace(ApiUrls.API_USER_PREFERENCES, ':id', userId), {
    preferences,
  })
    .then(response => ({ response }))
    .catch(error => {
      return {
        error: error.response?.message || 'Update user preferences failed',
      };
    });
};

const getLeaderboard = (skip, limit) => {
  return Api.get(
    ApiUrls.API_LEADERBOARD.replace(':skip', skip).replace(':limit', limit)
  ).catch(error => {
    console.log('[API Error] called: getLeaderboard', error);
  });
};

const createBet = payload => {
  return Api.post(ApiUrls.API_BET_CREATE, payload).catch(error => {
    console.log('[API Error] called: createBet', error);
  });
};

const getOutcomes = (betId, amount) => {
  return Api.post(_.replace(ApiUrls.API_BET_OUTCOMES, ':id', betId), {
    amount,
  }).catch(error => {
    console.log('[API Error] called: getOutcomes', error);
  });
};

const getSellOutcomes = (betId, amount) => {
  return Api.post(_.replace(ApiUrls.API_BET_SELL_OUTCOMES, ':id', betId), {
    amount,
  }).catch(error => {
    console.log('[API Error] called: getSellOutcomes', error);
  });
};

const pullOutBet = (betId, outcome) => {
  return EventsServiceApi.post(`/bets/${betId}/sell`, {
    outcome,
  }).catch(error => {
    console.log('[API Error] called: pullOutBet', error);
    throw error;
  });
};

const getOpenBets = () => {
  return EventsServiceApi.get('/trades?statuses=active').catch(error => {
    console.log('[API Error] called: getOpenBets', error);
  });
};

const getTradeHistory = () => {
  return EventsServiceApi.get('/trades/history').catch(error => {
    console.log('[API Error] called: getTradeHistory', error);
  });
};

const getTransactions = () => {
  return Api.get(ApiUrls.API_USER_HISTORY).catch(error => {
    console.log('[API Error] called: getTransactions', error);
  });
};

const placeBet = (betId, amount, outcome) => {
  return EventsServiceApi.post(`/bets/${betId}/place`, {
    amount,
    outcome,
  }).catch(error => {
    console.log('[API Error] called: placeBet', error);
    throw error;
  });
};

const getTags = () => {
  return Api.get(ApiUrls.API_TAGS_LIST).catch(error => {
    console.log('[API Error] called: getTags', error);
  });
};

const getEventHistoryChartData = (betId, params = {}) => {
  return Api.get(_.replace(ApiUrls.API_CHART_DATA, ':betId', betId), {
    params,
  }).catch(error => {
    console.log('[API Error] called: getEventHistoryChartData', error);
  });
};

const sendEventEvaluate = (betQuestion, rating, comment) => {
  const payload = {
    bet_question: betQuestion,
    rating,
    comment,
  };
  return Api.post(ApiUrls.API_EVENT_EVALUATE_SEND, {
    payload,
  }).catch(error => {
    console.log('[API Error] called: sendEventEvaluate', error);
  });
};

const getRewardsQuestions = (questionId, answerId) => {
  return Api.get('api/rewards/questions').catch(error => {
    console.log('[API Error] called: getUser', error);
    throw error;
  });
};

const postRewardAnswer = (questionId, answerId, userId) => {
  return Api.post('api/rewards/answer', {
    user: {
      id: userId,
    },
    questionId,
    answerId,
  }).catch(error => {
    console.log('[API Error] called: getUser', error);
    throw error;
  });
};

const createEvent = payload => {
  return Api.post(ApiUrls.API_EVENT_CREATE, payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const editEvent = (id, payload) => {
  return Api.post(ApiUrls.API_EVENT_EDIT.replace(':id', id), payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const deleteEvent = slug => {
  return EventsServiceApi.delete(`/events/${slug}`)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const bookmarkEvent = id => {
  return EventsServiceApi.put(`/events/${id}/bookmarks/add`);
};

const bookmarkEventCancel = id => {
  return EventsServiceApi.put(`/events/${id}/bookmarks/remove`);
};

const createEventBet = payload => {
  return Api.post(ApiUrls.API_EVENT_BET_CREATE, payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const getBetTemplates = () => {
  return Api.get(ApiUrls.API_BET_TEMPLATES)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const fetchChatMessagesByUser = (limit, skip) => {
  return Api.get(
    ApiUrls.API_USER_MESSAGES.replace(':limit', limit).replace(':skip', skip)
  )
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const fetchChatMessagesByRoom = (roomId, limit, skip) => {
  return Api.get(
    ApiUrls.API_CHAT_MESSAGES.replace(':roomId', roomId)
      .replace(':limit', limit)
      .replace(':skip', skip)
  )
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const setUserMessageRead = userMessageId => {
  return Api.put(
    ApiUrls.API_USER_MESSAGE_SET_READ.replace(':id', userMessageId)
  )
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const createEventFromTwitchUrl = data => {
  return Api.post(ApiUrls.API_EVENT_CREATE_FROM_TWITCH, data)
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const createEventFromYoutubeUrl = data => {
  return Api.post(ApiUrls.API_EVENT_CREATE_FROM_YOUTUBE, data)
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const getCoverStream = () => {
  return Api.get(ApiUrls.API_EVENT_GET_COVER_STREAM)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response?.data }));
};

const resolveBet = (betId, data) => {
  return EventsServiceApi.post(`/bets/${betId}/resolve`, data)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const closeBet = (betId, data) => {
  return EventsServiceApi.post(`/bets/${betId}/close`, data)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const cancelBet = (betId, payload) => {
  return EventsServiceApi.post(`/bets/${betId}/cancel`, payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const deleteBet = betId => {
  return EventsServiceApi.delete(`/bets/${betId}`)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const getTradeById = id => {
  return Api.get(_.replace(ApiUrls.API_TRADE_GET_BY_ID, ':id', id)).catch(
    error => {
      console.log('[API Error] called: getTradeById', error);
    }
  );
};

const getNotificationEvents = params => {
  const limit = _.get(params, 'limit', 10);
  const category = _.get(params, 'category', 10);
  const gameId = _.get(params, 'gameId');

  let urlToCall = ApiUrls.API_GET_NOTIFICATION_EVENTS.replace(
    ':limit',
    limit
  ).replace(':category', category);

  if (gameId) {
    urlToCall = ApiUrls.API_GET_NOTIFICATION_EVENTS_BY_GAME.replace(
      ':limit',
      limit
    )
      .replace(':category', category)
      .replace(':gameId', gameId);
  }

  return Api.get(urlToCall).catch(error => {
    console.log('[API Error] called: getNotificationEvents', error);
  });
};

const getNotificationEventsByBet = params => {
  const limit = _.get(params, 'limit', 10);
  const betId = _.get(params, 'betId', 10);
  return Api.get(
    ApiUrls.API_GET_NOTIFICATION_EVENTS_BY_BET.replace(':limit', limit).replace(
      ':betId',
      betId
    )
  ).catch(error => {
    console.log('[API Error] called: getNotificationEventsByBet', error);
  });
};

const getNotificationEventsByUser = params => {
  const limit = _.get(params, 'limit', 10);
  const userId = _.get(params, 'userId', 10);
  return Api.get(
    ApiUrls.API_GET_NOTIFICATION_EVENTS_BY_USER.replace(
      ':limit',
      limit
    ).replace(':userId', userId)
  ).catch(error => {
    console.log('[API Error] called: getNotificationEventsByUser', error);
  });
};

const signUp = payload => {
  return Api.post(ApiUrls.API_AUTH_SIGNUP, payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const loginExternal = ({ provider, body }) => {
  return Api.post(
    ApiUrls.API_AUTH_LOGIN_EXTERNAL.replace(':provider', provider),
    body
  )
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const login = payload => {
  return Api.post(ApiUrls.API_AUTH_LOGIN, payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const forgotPassword = payload => {
  return Api.post(ApiUrls.API_AUTH_FORGOT_PASSWORD, payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const resetPassword = payload => {
  return Api.post(ApiUrls.API_AUTH_RESET_PASSWORD, payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const shortenerTinyUrl = url => {
  return Api.get(ApiUrls.TINYURL_SHORTENER, {
    params: {
      url,
    },
    paramsSerializer: function (params) {
      return `url=${params.url}`;
    },
  })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const updateStatus = (userId, status) => {
  return Api.post(ApiUrls.API_USER_UPDATE_STATUS.replace(':id', userId), {
    status,
  })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const convertCurrency = ({ convertFrom, convertTo, amount }) => {
  return Api.get(ApiUrls.CONVERT_CURRENCY, {
    params: {
      convertFrom,
      convertTo,
      amount,
    },
  })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response?.data }));
};

const generateCryptopayChannel = body => {
  return Api.post(ApiUrls.GENERATE_CRYPTOPAY_CHANNEL, body)
    .then(({ data }) => data.data)
    .catch(error => ({ error: error.response?.data }));
};

const getWalletTransactions = () => {
  return Api.get(ApiUrls.API_USER_WALLET_TRANSACTIONS).catch(error => {
    console.log('[API Error] called: getWalletTransactions', error);
  });
};

const getWithdrawQuote = ({ amount, network }) => {
  return WithdrawServiceApi.post(ApiUrls.API_GETQUOTE, { amount, network })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const processWithdraw = ({ amount, network, toAddress }) => {
  return WithdrawServiceApi.post(ApiUrls.API_WITHDRAW, {
    amount,
    network,
    to_address: toAddress,
  })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const getWithdrawStatus = transactionId => {
  return WithdrawServiceApi.post(
    ApiUrls.API_WITHDRAW_STATUS.replace(':id', transactionId)
  )
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const getUserKycData = userId => {
  return Api.get(ApiUrls.KYC_DATA_FOR_USER.replace(':userId', userId))
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const refreshKycStatus = userId => {
  return Api.get(ApiUrls.KYC_REFRESH_STATUS)
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const getRandomUsername = () => {
  return Api.get(ApiUrls.RANDOM_USERNAME).catch(error => ({
    error: error.message,
  }));
};

const sendBuyWithCrypto = data => {
  if (!Api.defaults.headers.common['Authorization']) return;
  return Api.post(ApiUrls.SEND_BUY_WITH_CRYPTO, data)
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const sendBuyWithFiat = data => {
  if (!Api.defaults.headers.common['Authorization']) return;
  return Api.post(ApiUrls.SEND_BUY_WITH_FIAT, data)
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const generateMoonpayUrl = data => {
  if (!Api.defaults.headers.common['Authorization']) return;
  return Api.post(ApiUrls.GENERATE_MOONPAY_URL, data)
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const acceptToS = () => {
  if (!Api.defaults.headers.common['Authorization']) return;
  return Api.post(ApiUrls.ACCEPT_TOS)
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const getUserCount = () => {
  return Api.get(ApiUrls.USER_COUNT)
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

const getBonusCount = bonusId => {
  return Api.get(ApiUrls.BONUS_COUNT.replace(':id', bonusId))
    .then(response => ({ response }))
    .catch(error => ({ error: error.message }));
};

/// EVENTS-SERVICE API

const createMarketEvent = payload => {
  return EventsServiceApi.post('/events/market-events', payload)
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: createMarketEvent ', err);
      throw err;
    });
};

const editMarketEvent = (id, payload) => {
  return EventsServiceApi.patch(`/events/market-events/${id}`, payload)
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: editMarketEvent ', err);
      throw err;
    });
};

const deleteMarketEvent = id => {
  return EventsServiceApi.delete(`/admin/market-events/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: deleteMarketEvent ', err);
      throw err;
    });
};

const getMarketEvents = (category, statuses, page, limit, name = '') => {
  // additionaly provide params for status, search by name sorting, pagination etc
  return EventsServiceApi.get(
    `/events/market-events?category=${category}&statuses=${statuses.join(
      ','
    )}&name=${name}&limit=${limit}&page=${page}`
  )
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: getMarketEvents ', err);
      throw err;
    });
};

const getEventBySlug = slug => {
  return EventsServiceApi.get(`/events/market-events/${slug}`)
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: getEventBySlug ', err);
      throw err;
    });
};

const calculateBuyOutcome = (betId, amount) => {
  return EventsServiceApi.post(`/bets/${betId}/outcomes/buy`, {
    amount,
  })
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: calculateBuyOutcome ', err);
      throw err;
    });
};

const getOutcomesHistoryForChart = (betId, params = {}) => {
  return EventsServiceApi.get(`/bets/${betId}/history`, {
    params,
  })
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: getOutcomesHistoryForChart ', err);
      throw err;
    });
};

const editEventBet = (betId, payload) => {
  return EventsServiceApi.put(`/admin/bet/${betId}`, payload)
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: editEventBet ', err);
      throw err;
    });
};

const openDispute = (betId, payload) => {
  return EventsServiceApi.post(`/bets/${betId}/disputes`, payload)
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: openDispute ', err);
      throw err;
    });
};

const getDisputes = (betId) => {
  return EventsServiceApi.get(`/bets/${betId}/disputes`)
    .then(res => res.data)
    .catch(err => {
      console.log('[API-Error]: getDisputes ', err);
      throw err;
    });
};

const claimTokens = () => {
  return Api.post('/api/user/tokens')
    .then((res) => res.data)
    .catch((e) => {
      console.log('[API-Error]: claimTokens ', e);
      throw e;
    });
}

export {
  Api,
  createBet,
  fetchReferrals,
  getOpenBets,
  getTradeHistory,
  getOutcomes,
  getSellOutcomes,
  getTransactions,
  getUser,
  updateUser,
  getLeaderboard,
  listEvents,
  listEventsFiltered,
  placeBet,
  pullOutBet,
  sendSms,
  saveAdditionalInfo,
  setToken,
  verifySms,
  verifyEmail,
  resendEmailVerification,
  getTags,
  getEventHistoryChartData,
  sendEventEvaluate,
  getRewardsQuestions,
  postRewardAnswer,
  createEvent,
  editEvent,
  deleteEvent,
  bookmarkEvent,
  bookmarkEventCancel,
  createEventBet,
  editEventBet,
  getBetTemplates,
  fetchChatMessagesByRoom,
  updateUserPreferences,
  createEventFromTwitchUrl,
  createEventFromYoutubeUrl,
  getCoverStream,
  getTradeById,
  resolveBet,
  closeBet,
  cancelBet,
  deleteBet,
  login,
  signUp,
  loginExternal,
  forgotPassword,
  resetPassword,
  shortenerTinyUrl,
  getNotificationEvents,
  getNotificationEventsByBet,
  getNotificationEventsByUser,
  checkUsername,
  getUserPublicInfo,
  getUserPublicStats,
  updateStatus,
  requestTokens,
  fetchChatMessagesByUser,
  setUserMessageRead,
  convertCurrency,
  getWalletTransactions,
  getWithdrawQuote,
  processWithdraw,
  getWithdrawStatus,
  getUserKycData,
  getRandomUsername,
  sendBuyWithCrypto,
  sendBuyWithFiat,
  generateCryptopayChannel,
  acceptToS,
  getUserCount,
  getBonusCount,
  refreshKycStatus,
  generateMoonpayUrl,
  createMarketEvent,
  editMarketEvent,
  deleteMarketEvent,
  getMarketEvents,
  getEventBySlug,
  calculateBuyOutcome,
  getOutcomesHistoryForChart,
  openDispute,
  getDisputes,
  claimTokens,
};
