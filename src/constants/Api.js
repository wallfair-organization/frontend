export default class Api {
    static getBackendUrl () {
        if (this.isLocal()) {
            return LOCAL_BACKEND_URL;
        }

        if(this.isStaging()) {
            return STAGING_BACKEND_URL;
        }

        return PRODUCTION_BACKEND_URL;
    };

    static getBackendSocketUrl () {
        if (this.isLocal()) {
            return LOCAL_BACKEND_SOCKET_URL;
        }

        if (this.isStaging()) {
            return STAGING_BACKEND_URL;
        }

        return PRODUCTION_BACKEND_SOCKET_URL;
    };

    static isLocal () {
        const url                       = window.location.href;
        const localBackendUrlIndicators = [
            '.test',
            'localhost',
            '127.0.0.1',
            '.ngrok.io',
        ];

        for (const localBackendUrlIndicator of localBackendUrlIndicators) {
            if (url.indexOf(localBackendUrlIndicator) > -1) {
                return true;
            }
        }

        return false;
    }

    static isStaging () {
        const url                       = window.location.href;
        const localBackendUrlIndicators = [
            'staging-frontend-k2t68.ondigitalocean.app',
            'staging.wallfair.io',
        ];

        for (const localBackendUrlIndicator of localBackendUrlIndicators) {
            if (url.indexOf(localBackendUrlIndicator) > -1) {
                return true;
            }
        }

        return false;
    }
}

export const PRODUCTION_BACKEND_URL               = 'https://prod-k9lh9.ondigitalocean.app';
export const STAGING_BACKEND_URL                  = 'https://staging-zeaec.ondigitalocean.app';
export const PRODUCTION_BACKEND_SOCKET_URL        = PRODUCTION_BACKEND_URL;
export const LOCAL_BACKEND_URL                    = STAGING_BACKEND_URL;
export const LOCAL_BACKEND_SOCKET_URL             = LOCAL_BACKEND_URL;
export const BACKEND_URL                          = Api.getBackendUrl();
export const BACKEND_SOCKET_URL                   = Api.getBackendSocketUrl();
export const API_AUTHENTICATION_REQUEST_SMS_URL   = 'api/user/login';
export const API_AUTHENTICATION_SAVE_ADD_INFO_URL = 'api/user/saveAdditionalInformation';
export const API_AUTHENTICATION_VERIFY_SMS_URL    = 'api/user/verifyLogin';
export const API_BIND_WALLET_URL                  = 'api/user/bindWalletAddress';
export const API_AUTHENTICATION_VERIFY_EMAIL      = 'api/user/confirm-email/?userId=:userId&code=:code';
export const API_AUTHENTICATION_RESEND_EMAIL_VERIFICATION = 'api/user/resend-confirm';
export const API_BET_CREATE                       = 'api/event/bet/create';
export const API_BET_OUTCOMES                     = 'api/event/bet/:id/outcomes/buy';
export const API_BET_PLACE                        = 'api/event/bet/:id/place';
export const API_BET_PULL_OUT                     = 'api/event/bet/:id/pullout';
export const API_BET_SELL_OUTCOMES                = 'api/event/bet/:id/outcomes/sell';
export const API_EVENT_CREATE                     = 'api/event/create';
export const API_EVENT_LIST                       = 'api/event/list';
export const API_EVENT_LIST_FILTERED              = 'api/event/list/:type/:category/:count/:page/:sortBy/:searchQuery';
export const API_EVENT_CHAT_MESSAGES              = 'api/event/chat-messages/:id';
export const API_USER                             = 'api/user/:id';
export const API_LEADERBOARD                      = 'api/user/getLeaderboard/:skip/:limit';
export const API_USER_HISTORY                     = 'api/user/history';
export const API_USER_OPEN_BETS                   = 'api/user/open-bets';
export const API_USER_REFERRAL_LIST               = 'api/user/refList';
export const API_TAGS_LIST                        = 'api/event/tags';
