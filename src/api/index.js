import * as ApiUrls from '../constants/Api';
import _ from 'lodash';
import axios from 'axios';
import ContentTypes from '../constants/ContentTypes';
import Store from '../store';
import { AuthenticationActions } from 'store/actions/authentication';

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
      if (error.response.status === 401) {
        dispatch(AuthenticationActions.forcedLogout());
      }
      throw error;
    }
  );
  return axiosClient;
};

const Api = createInstance(ApiUrls.BACKEND_URL, '/');

const setToken = token => {
  const authentication = 'Bearer ' + token;

  Api.defaults.headers.common['Authorization'] = authentication;
};

const requestSms = (phone, ref) => {
  return Api.post(ApiUrls.API_AUTHENTICATION_REQUEST_SMS_URL, {
    phone,
    ref,
  })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const verifySms = (phone, smsToken) => {
  return Api.post(ApiUrls.API_AUTHENTICATION_VERIFY_SMS_URL, {
    phone,
    smsToken,
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
    .catch(error => ({ error: error.response.message }));
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

const pullOutBet = (betId, amount, outcome) => {
  return Api.post(_.replace(ApiUrls.API_BET_PULL_OUT, ':id', betId), {
    amount,
    outcome,
  }).catch(error => {
    console.log('[API Error] called: pullOutBet', error);
  });
};

const getOpenBets = () => {
  return Api.get(ApiUrls.API_USER_OPEN_BETS).catch(error => {
    console.log('[API Error] called: getOpenBets', error);
  });
};

const getTradeHistory = () => {
  return Api.get(ApiUrls.API_USER_TRADE_HISTORY).catch(error => {
    console.log('[API Error] called: getTradeHistory', error);
  });
};

const getTransactions = () => {
  return Api.get(ApiUrls.API_USER_HISTORY).catch(error => {
    console.log('[API Error] called: getTransactions', error);
  });
};

const placeBet = (betId, amount, outcome) => {
  return Api.post(_.replace(ApiUrls.API_BET_PLACE, ':id', betId), {
    amount,
    outcome,
  }).catch(error => {
    console.log('[API Error] called: placeBet', error);
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

const deleteEvent = id => {
  return Api.delete(ApiUrls.API_EVENT_DELETE.replace(':id', id))
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const bookmarkEvent = id => {
  return Api.put(ApiUrls.API_EVENT_BOOKMARK.replace(':id', id));
};

const bookmarkEventCancel = id => {
  return Api.put(ApiUrls.API_EVENT_BOOKMARK_CANCEL.replace(':id', id));
};

const createEventBet = payload => {
  return Api.post(ApiUrls.API_EVENT_BET_CREATE, payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const editEventBet = (betId, payload) => {
  return Api.post(ApiUrls.API_EVENT_BET_EDIT.replace(':betId', betId), payload)
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
  return Api.post(ApiUrls.API_BET_RESOLVE.replace(':id', betId), data)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const cancelBet = (betId, payload) => {
  return Api.post(ApiUrls.API_BET_CANCEL.replace(':id', betId), payload)
    .then(response => ({ response }))
    .catch(error => ({ error: error.response.data }));
};

const deleteBet = betId => {
  return Api.delete(ApiUrls.API_BET_DELETE.replace(':id', betId))
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
  return Api.get(
    ApiUrls.API_GET_NOTIFICATION_EVENTS.replace(':limit', limit).replace(
      ':category',
      category
    )
  ).catch(error => {
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
  requestSms,
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
  cancelBet,
  deleteBet,
  login,
  signUp,
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
};
