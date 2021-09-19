import * as ApiUrls from '../constants/Api';
import _ from 'lodash';
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

const resendEmailVerification = () => {
  return Api.get(ApiUrls.API_AUTHENTICATION_RESEND_EMAIL_VERIFICATION).catch(
    error => {
      console.log('[API Error] called verifyEmail:', error);
      throw error;
    }
  );
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
  searchQuery,
}) => {
  return Api.get(
    ApiUrls.API_EVENT_LIST_FILTERED.replace(':type', type)
      .replace(':category', category)
      .replace(':count', count)
      .replace(':page', page)
      .replace(':sortBy', sortBy)
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

const updateUser = (userId, user) => {
  return Api.patch(_.replace(ApiUrls.API_USER, ':id', userId), user).catch(
    error => {
      console.log('[API Error] called: patchUser', error);
    }
  );
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

const createBet = (
  eventId,
  marketQuestion,
  description,
  outcomes,
  endDate,
  liquidityAmount
) => {
  return Api.post(ApiUrls.API_BET_CREATE, {
    eventId,
    marketQuestion,
    description,
    outcomes,
    endDate,
    liquidityAmount,
  }).catch(error => {
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

const fetchChatMessagesByRoom = (roomId, limit, skip) => {
  return Api.get(
    ApiUrls.API_CHAT_MESSAGES.replace(':roomId', roomId)
      .replace(':limit', limit)
      .replace(':skip', skip)
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
    .catch(error => ({ error: error.response.data }));
};

export {
  Api,
  createBet,
  fetchReferrals,
  getOpenBets,
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
  createEventBet,
  editEventBet,
  getBetTemplates,
  fetchChatMessagesByRoom,
  updateUserPreferences,
  createEventFromTwitchUrl,
  createEventFromYoutubeUrl,
  getCoverStream,
};
