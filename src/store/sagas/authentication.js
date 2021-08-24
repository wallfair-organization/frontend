import * as Api                     from '../../api';
import _                            from 'lodash';
import AuthState                    from '../../constants/AuthState';
import Routes                       from '../../constants/Routes';
import { AuthenticationActions }    from '../actions/authentication';
import { EventActions }             from '../actions/event';
import { push }                     from 'connected-react-router';
import { put, call, select, delay } from 'redux-saga/effects';
import { UserActions }              from '../actions/user';
import { BetActions }               from '../actions/bet';
import { TransactionActions }       from '../actions/transaction';
import { PopupActions }             from '../actions/popup';
import { ChatActions }              from '../actions/chat';
import { WebsocketsActions }        from '../actions/websockets';
import PopupTheme                   from '../../components/Popup/PopupTheme';

const afterLoginRoute                = Routes.home;
const routesToRedirectWithoutSession = [
    Routes.home,
    Routes.bet,
    '/service-worker.js',
];

const requestSms = function* (action) {
    const country   = yield select(state => state.authentication.country);
    const phone     = yield select(state => state.authentication.phone);
    const referral  = yield select(state => state.authentication.referral);
    let phoneNumber = country + phone;

    if (phoneNumber) {
        if (!phoneNumber.startsWith('+')) {
            phoneNumber = '+' + phoneNumber;
        }

        if (phone.startsWith('0')) {
            phoneNumber = '+' + country + phone.substring(1);
        }

        const response = yield call(
            Api.requestSms,
            phoneNumber,
            referral,
        );

        if (response) {
            const data = response.data;

            yield put(AuthenticationActions.requestSmsSucceeded({
                ...data,
                phone,
                country,
            }));
            return;
        }
    }

    yield put(AuthenticationActions.requestSmsFailed({
        phone,
    }));
};

const verifySms = function* (action) {
    const country   = yield select(state => state.authentication.country);
    const phone     = yield select(state => state.authentication.phone);
    const smsToken  = action.smsToken;
    let phoneNumber = country + phone;

    if (phoneNumber) {
        if (!phoneNumber.startsWith('+')) {
            phoneNumber = '+' + phoneNumber;
        }

        if (phone.startsWith('0')) {
            phoneNumber = '+' + country + phone.substring(1);
        }

        const response = yield call(
            Api.verifySms,
            phoneNumber,
            smsToken,
        );

        if (response) {
            const data = response.data;

            Api.setToken(data.session);

            yield put(AuthenticationActions.verifySmsSucceeded({
                ...data,
            }));
        } else {
            yield put(AuthenticationActions.verifySmsFailed());
        }
    } else {
        yield put(AuthenticationActions.verifySmsFailed());
    }
};

const verifyEmail = function* (action) {
    const userId = action.userId;
    const code = action.code;

    if (userId && code) {
        const response = yield call(
            Api.verifyEmail,
            userId,
            code
        );

        if (response) {
            yield put(AuthenticationActions.verifyEmailSucceeded());
        } else {
            yield put(AuthenticationActions.verifyEmailFailed());
        }
    } else {
        yield put(AuthenticationActions.verifyEmailFailed());
    }
};

const setAdditionalInformation = function* (action) {
    const email    = yield select(state => state.authentication.email);
    const name     = yield select(state => state.authentication.name);
    const username = yield select(state => state.authentication.username);

    const response = yield call(
        Api.saveAdditionalInfo,
        name,
        username,
        email,
    );

    if (response) {
        const data = response.data;

        yield put(AuthenticationActions.saveAdditionalInfoSucceeded({
            ...data,
        }));
    } else {
        yield put(AuthenticationActions.saveAdditionalInfoFailed());
    }
};

const fetchReferrals = function* () {
    const userId = yield select(state => state.authentication.userId);
    const token = yield select(state => state.authentication.token);

    if (userId && token) {
        Api.setToken(token)

        const response = yield call(
            Api.fetchReferrals,
            userId,
        );

        if (response) {
            const referralList = _.get(response.data, 'refList', []);

            yield put(AuthenticationActions.fetchReferralsSucceeded({
                referralList,
            }));
        } else {
            yield put(AuthenticationActions.fetchReferralsFailed());
        }
    }
};

const fetchReferralsSucceeded = function* (action) {
    const referralList = action.referralList;

    for (const referral of referralList) {
        const userId = _.get(referral, 'id');

        if (userId) {
            yield put(UserActions.fetch({
                userId,
                forceFetch: false,
            }));
        }
    }
};

const registrationSucceeded = function* (action) {
    yield put(PopupActions.show({
        popupType: PopupTheme.welcome,
    }));
    yield put(PopupActions.show({
        popupType: PopupTheme.connectWallet,
    }));
};

const authenticationSucceeded = function* (action) {
    const authState = yield select(state => state.authentication.authState);
    const userId    = yield select(state => state.authentication.userId);

    if (authState === AuthState.LOGGED_IN) {
        yield put(UserActions.fetch({ userId, forceFetch: true }));
        yield put(EventActions.fetchAll());
        yield put(AuthenticationActions.fetchReferrals());
        yield put(WebsocketsActions.init());
        yield put(push(afterLoginRoute));
        yield put(PopupActions.show({
            popupType: PopupTheme.connectWallet,
        }));
    }
};

const logout = function* () {
    Api.setToken(null);
    yield put(WebsocketsActions.close());
    yield put(push(Routes.home));
};

const restoreToken = function* () {
    const locationPathname = window.location.pathname;
    const locationSearch   = window.location.search;
    const pathname         = yield select(state => state.router.location.pathname);
    const authentication   = yield select(state => state.authentication);
    const token            = authentication.token;
    const authState        = authentication.authState;

    if (authState !== AuthState.LOGGED_IN) {
        if (authState !== AuthState.LOGGED_OUT) {
            yield put(AuthenticationActions.resetAuthState());
        }

        const queryParams = new URLSearchParams(locationSearch);
        const referral    = queryParams.get('ref');

        if (referral) {
            yield put(AuthenticationActions.setReferral({ referral }));
        }
    }

    if (token) {
        Api.setToken(token);
    }

    if (token && authState === AuthState.LOGGED_IN) {
        if (
            pathname === Routes.home ||
            locationPathname === Routes.home
        ) {
            yield put(push(afterLoginRoute));
        }
    }
};

const refreshImportantData = function* () {
    const authState = yield select(state => state.authentication.authState);

    if (authState === AuthState.LOGGED_IN) {
        yield put(UserActions.fetch({ forceFetch: true }));
        yield put(EventActions.fetchAll());
        yield put(AuthenticationActions.fetchReferrals());
        yield put(BetActions.fetchOpenBets());
        yield put(TransactionActions.fetchAll());

        yield delay(10 * 1000);
        yield call(refreshImportantData);
    }
};

const firstSignUpPopup = function* (options) {
    yield delay((options && options.duration ? options.duration : 1) * 60 * 1000);
    const authState = yield select(state => state.authentication.authState);

    if (authState === AuthState.LOGGED_OUT) {
        yield put(PopupActions.show({
            popupType: options.last ? PopupTheme.signUpNotificationSecond : PopupTheme.signUpNotificationFirst
        }));
    }
}

export default {
    authenticationSucceeded,
    fetchReferrals,
    fetchReferralsSucceeded,
    logout,
    refreshImportantData,
    registrationSucceeded,
    requestSms,
    restoreToken,
    setAdditionalInformation,
    verifySms,
    verifyEmail,
    firstSignUpPopup
};
