// Env vars
export const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  'https://staging-zeaec.ondigitalocean.app/';
export const BACKEND_SOCKET_URL = BACKEND_URL;
export const CRASH_GAME_BACKEND_URL =
  process.env.REACT_APP_CRASH_GAME_BACKEND_URL || 'http://localhost:8001/';
export const NEWS_API_URL = 'http://api.mediastack.com/v1/news';
export const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
export const NEWS_API_SSL_MODE =
  process.env.REACT_APP_NEWS_API_SSL_MODE === 'true';

// Services
export const API_AUTHENTICATION_REQUEST_SMS_URL = 'api/user/login';
export const API_AUTHENTICATION_SAVE_ADD_INFO_URL =
  'api/user/saveAdditionalInformation';
export const API_AUTHENTICATION_VERIFY_SMS_URL = 'api/user/verifyLogin';
export const API_AUTHENTICATION_VERIFY_EMAIL =
  'api/user/confirm-email/?userId=:userId&code=:code';
export const API_AUTHENTICATION_RESEND_EMAIL_VERIFICATION =
  'api/user/resend-confirm';
export const API_BET_CREATE = 'api/event/bet/create';
export const API_EVENT_BET_CREATE = 'api/event/bet/create';
export const API_EVENT_BET_EDIT = '/api/event/bet/:betId'; // or this endpoint /api/event/:id/bet/:betId
export const API_BET_OUTCOMES = 'api/event/bet/:id/outcomes/buy';
export const API_BET_PLACE = 'api/event/bet/:id/place';
export const API_BET_PULL_OUT = 'api/event/bet/:id/pullout';
export const API_BET_SELL_OUTCOMES = 'api/event/bet/:id/outcomes/sell';
export const API_BET_TEMPLATES = 'api/bet-template';
export const API_EVENT_CREATE = 'api/event/create';
export const API_EVENT_EDIT = 'api/event/:id';
export const API_EVENT_LIST = 'api/event/list';
export const API_EVENT_LIST_FILTERED =
  'api/event/list/:type/:category/:count/:page/:sortBy/:searchQuery';
export const API_EVENT_CHAT_MESSAGES = 'api/event/chat-messages/:id';
export const API_EVENT_EVALUATE_SEND = 'api/event/evaluate';
export const API_USER = 'api/user/:id';
export const API_USER_PREFERENCES = 'api/user/:id/preferences';
export const API_LEADERBOARD = 'api/user/getLeaderboard/:skip/:limit';
export const API_USER_HISTORY = 'api/user/history';
export const API_USER_OPEN_BETS = 'api/user/open-bets';
export const API_USER_TRADE_HISTORY = 'api/user/trade-history';
export const API_USER_REFERRAL_LIST = 'api/user/refList';
export const API_TAGS_LIST = 'api/event/tags';
export const API_CURRENT = 'api/current';
export const API_CHART_DATA = 'api/event/bet/:betId/history';
export const API_CHAT_MESSAGES =
  'api/chat/chat-messages/:roomId?skip=:skip&limit=:limit';
export const API_EVENT_CREATE_FROM_TWITCH = 'api/event/extract/twitch';
export const API_EVENT_CREATE_FROM_YOUTUBE = 'api/event/create-from-youtube';
export const API_EVENT_GET_COVER_STREAM = 'api/event/cover/streamed';
export const API_BET_RESOLVE = 'api/event/bet/:id/resolve';
export const API_TRADE_CREATE = 'api/trade';
export const API_CASH_OUT = 'api/cashout';
export const API_TRADE_GET_BY_ID = 'api/event/trade/:id';
export const API_AUTH_LOGIN = 'api/auth/login';
export const API_AUTH_SIGNUP = 'api/auth/sign-up';
export const API_AUTH_FORGOT_PASSWORD = 'api/auth/forgot-password';
export const API_AUTH_RESET_PASSWORD = 'api/auth/reset-password';
//3rd parties
export const TINYURL_SHORTENER = 'https://tinyurl.com/api-create.php';
