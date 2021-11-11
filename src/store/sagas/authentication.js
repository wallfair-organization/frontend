import * as Api from '../../api';
import * as crashGameApi from '../../api/crash-game';
import _ from 'lodash';
import AuthState from '../../constants/AuthState';
import Routes from '../../constants/Routes';
import { AuthenticationActions } from '../actions/authentication';
import { EventActions } from '../actions/event';
import { push } from 'connected-react-router';
import { put, call, select, delay } from 'redux-saga/effects';
import { UserActions } from '../actions/user';
import { PopupActions } from '../actions/popup';
import { UserMessageRoomId, WebsocketsActions } from '../actions/websockets';
import PopupTheme from '../../components/Popup/PopupTheme';
import { AlertActions } from 'store/actions/alert';
import { RosiGameActions } from '../actions/rosi-game';
import { ChatActions } from 'store/actions/chat';

const afterLoginRoute = Routes.home;

const requestSms = function* (action) {
  const country = yield select(state => state.authentication.country);
  const phone = yield select(state => state.authentication.phone);
  const referral = yield select(state => state.authentication.referral);
  let phoneNumber = country + phone;

  if (phoneNumber) {
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+' + phoneNumber;
    }

    if (phone.startsWith('0')) {
      phoneNumber = '+' + country + phone.substring(1);
    }

    const { response, error } = yield call(
      Api.requestSms,
      phoneNumber,
      referral
    );

    if (response) {
      const data = response.data;

      yield put(
        AuthenticationActions.requestSmsSucceeded({
          ...data,
          phone,
          country,
        })
      );
      return;
    } else {
      yield put(
        AuthenticationActions.requestSmsFailed({
          phone,
          error,
        })
      );
      return;
    }
  }

  yield put(
    AuthenticationActions.requestSmsFailed({
      phone,
    })
  );
};

const verifySms = function* (action) {
  const country = yield select(state => state.authentication.country);
  const phone = yield select(state => state.authentication.phone);
  const smsToken = action.smsToken;
  let phoneNumber = country + phone;

  if (phoneNumber) {
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+' + phoneNumber;
    }

    if (phone.startsWith('0')) {
      phoneNumber = '+' + country + phone.substring(1);
    }

    const { response, error } = yield call(
      Api.verifySms,
      phoneNumber,
      smsToken
    );

    if (response) {
      const data = response.data;

      Api.setToken(data.session);
      crashGameApi.setToken(data.session);

      yield put(
        AuthenticationActions.verifySmsSucceeded({
          ...data,
        })
      );
    } else {
      yield put(AuthenticationActions.verifySmsFailed(error));
    }
  } else {
    yield put(AuthenticationActions.verifySmsFailed());
  }
};

const verifyEmail = function* (action) {
  const userId = action.userId;
  const code = action.code;

  if (userId && code) {
    const response = yield call(Api.verifyEmail, userId, code);

    if (response) {
      yield put(AuthenticationActions.verifyEmailSucceeded());
    } else {
      yield put(AuthenticationActions.verifyEmailFailed());
    }
  } else {
    yield put(AuthenticationActions.verifyEmailFailed());
  }

  yield put(
    PopupActions.show({
      popupType: PopupTheme.verifyEmail,
    })
  );
};

const setAdditionalInformation = function* (action) {
  const email = yield select(state => state.authentication.email);
  let name = yield select(state => state.authentication.name);
  let username = yield select(state => state.authentication.username);

  if (email) {
    username = null;
    name = null;
  }

  const { response, error } = yield call(
    Api.saveAdditionalInfo,
    name,
    username,
    email
  );

  if (response) {
    const data = response.data;

    yield put(
      AuthenticationActions.saveAdditionalInfoSucceeded({
        ...data,
      })
    );
  } else {
    yield put(AuthenticationActions.saveAdditionalInfoFailed());
    yield put(AuthenticationActions.saveAdditionalInfoFailed(error));
  }
};

const fetchReferrals = function* () {
  const userId = yield select(state => state.authentication.userId);
  const token = yield select(state => state.authentication.token);

  if (userId && token) {
    Api.setToken(token);
    crashGameApi.setToken(token);

    const response = yield call(Api.fetchReferrals, userId);

    if (response) {
      const referralList = _.get(response.data, 'refList', []);

      yield put(
        AuthenticationActions.fetchReferralsSucceeded({
          referralList,
        })
      );
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
      yield put(
        UserActions.fetch({
          userId,
          forceFetch: false,
        })
      );
    }
  }
};

const registrationSucceeded = function* (action) {
  const authState = yield select(state => state.authentication.authState);

  if (action.email && action.name && authState === AuthState.LOGGED_IN) {
    yield put(
      PopupActions.show({
        popupType: PopupTheme.welcome,
      })
    );
  }
};

const authenticationSucceeded = function* (action) {
  const authState = yield select(state => state.authentication.authState);
  const userId = yield select(state => state.authentication.userId);

  if (authState === AuthState.LOGGED_IN) {
    yield put(UserActions.fetch({ userId, forceFetch: true }));
    yield put(EventActions.fetchAll());
    yield put(AuthenticationActions.fetchReferrals());
    yield put(WebsocketsActions.init());
    yield put(RosiGameActions.clearGuestData());
    yield put(AlertActions.showSuccess({ message: 'Successfully logged in' }));

    yield put(
      WebsocketsActions.joinRoom({
        userId,
        roomId: UserMessageRoomId,
      })
    );
    yield put(ChatActions.fetchByRoom({ roomId: UserMessageRoomId }));

    if (action.newUser) {
      yield put(
        PopupActions.show({
          popupType: PopupTheme.username,
          options: {
            initialReward: action?.initialReward,
          },
        })
      );
    } else {
      yield put(PopupActions.hide());
    }
  }
};

const logout = function* () {
  Api.setToken(null);
  crashGameApi.setToken(null);
  yield put(push(Routes.home));
};

const forcedLogout = function* () {
  Api.setToken(null);
  crashGameApi.setToken(null);

  yield delay(1 * 1000);
  yield put(
    AlertActions.showError({ message: 'Session expired. Please log in again.' })
  );
};

const restoreToken = function* () {
  const locationPathname = window.location.pathname;
  const locationSearch = window.location.search;
  const pathname = yield select(state => state.router.location.pathname);
  const authentication = yield select(state => state.authentication);
  const token = authentication.token;
  const authState = authentication.authState;

  if (authState !== AuthState.LOGGED_IN) {
    if (authState !== AuthState.LOGGED_OUT) {
      yield put(AuthenticationActions.resetAuthState());
    }

    const queryParams = new URLSearchParams(locationSearch);
    const referral = queryParams.get('ref');

    if (referral) {
      yield put(AuthenticationActions.setReferral({ referral }));
    }
  }

  if (token) {
    Api.setToken(token);
    crashGameApi.setToken(token);
  }

  if (
    token &&
    authState === AuthState.LOGGED_IN &&
    locationPathname !== Routes.verify
  ) {
    if (pathname === Routes.home || locationPathname === Routes.home) {
      yield put(push(afterLoginRoute));
    }
  }
};

const refreshImportantData = function* () {
  const authState = yield select(state => state.authentication.authState);

  if (authState === AuthState.LOGGED_IN) {
    yield put(UserActions.fetch({ forceFetch: true }));
    yield put(EventActions.fetchAll());

    yield delay(10 * 1000);
    yield call(refreshImportantData);
  }
};

const firstSignUpPopup = function* (options) {
  yield delay((options && options.duration ? options.duration : 1) * 60 * 1000);
  const authState = yield select(state => state.authentication.authState);
  const popupVisible = yield select(state => state.popup.visible);
  const popupType = yield select(state => state.popup.popupType);
  const skip =
    popupVisible &&
    (popupType === PopupTheme.auth || popupType === PopupTheme.disclaimer);

  if (authState === AuthState.LOGGED_OUT && !skip) {
    yield put(
      PopupActions.show({
        popupType: options.last
          ? PopupTheme.signUpNotificationSecond
          : PopupTheme.signUpNotificationFirst,
      })
    );
  }
};

const updateUserData = function* (action) {
  try {
    const userId = yield select(state => state.authentication.userId);

    let userFiltered = Object.fromEntries(
      Object.entries(action.payload.user).filter(([key, value]) => value)
    );

    if (userFiltered.imageName) {
      userFiltered.image = {
        filename: userFiltered.imageName,
        src: userFiltered.profilePic,
      };

      userFiltered = _.omit(userFiltered, ['imageName', 'profilePic']);
    }

    const response = yield call(Api.updateUser, userId, userFiltered);
    if (response) {
      const stateUser = yield select(state => state.authentication);

      yield put(
        AuthenticationActions.updateUserDataSucceeded({
          ...stateUser,
          ...response.data,
        })
      );

      if (action.newUser) {
        yield put(
          PopupActions.show({
            popupType: PopupTheme.welcome,
            options: {
              initialReward: action?.initialReward,
            },
          })
        );
      }
    }
  } catch (error) {
    yield put(AuthenticationActions.updateUserDataFailed());
  }
};

const signUp = function* (action) {
  const payload = {
    email: action.email,
    country: action.country,
    birth: action.birth,
    password: action.password,
    passwordConfirm: action.passwordConfirm,
    ref: action.ref,
    recaptchaToken: action.recaptchaToken,
  };
  const { response, error } = yield call(Api.signUp, payload);
  if (response) {
    const initialReward = response?.data?.initialReward;
    yield put(
      AuthenticationActions.login({
        email: action.email,
        password: action.password,
        newUser: true,
        initialReward,
      })
    );
    localStorage.removeItem('urlParam_ref');
  } else {
    yield put(
      AuthenticationActions.signUpFail({
        message: error.message,
      })
    );
  }
};

const login = function* (action) {
  const payload = {
    userIdentifier: action.email,
    password: action.password,
  };

  const { response, error } = yield call(Api.login, payload);

  if (response) {
    const data = response.data;

    Api.setToken(data.session);
    crashGameApi.setToken(data.session);

    yield put(
      AuthenticationActions.loginSuccess({
        userId: data.userId,
        session: data.session,
        newUser: action.newUser,
        initialReward: action?.initialReward,
      })
    );
  } else {
    yield put(
      AuthenticationActions.loginFail({
        message: error.message,
      })
    );
  }
};

const forgotPassword = function* (action) {
  const payload = { email: action.email };

  const { response, error } = yield call(Api.forgotPassword, payload);

  if (response) {
    yield put(PopupActions.hide());
    yield put(
      AlertActions.showSuccess({
        message: `Email sent to ${payload.email}`,
      })
    );
  } else {
    yield put(
      AuthenticationActions.forgotPasswordFail({
        message: error.message,
      })
    );
  }
};

const resetPassword = function* (action) {
  const payload = {
    email: action.email,
    password: action.password,
    passwordConfirmation: action.passwordConfirmation,
    passwordResetToken: action.token,
  };

  const { response, error } = yield call(Api.resetPassword, payload);

  if (response) {
    yield put(push(Routes.home));
    yield put(
      AlertActions.showSuccess({
        message: 'Password changed successfully',
      })
    );
  } else {
    yield put(
      AuthenticationActions.resetPasswordFail({
        message: error.message,
      })
    );
  }
};

const updateStatus = function* (action) {
  const { response, error } = yield call(
    Api.updateStatus,
    action.userId,
    action.status
  );

  if (response) {
    yield put(
      AlertActions.showSuccess({
        message: 'User status has been updated successfully',
      })
    );
  } else {
    yield put(
      AlertActions.showError({
        message: error.message,
      })
    );
  }
};

export default {
  authenticationSucceeded,
  fetchReferrals,
  fetchReferralsSucceeded,
  logout,
  forcedLogout,
  refreshImportantData,
  registrationSucceeded,
  requestSms,
  restoreToken,
  setAdditionalInformation,
  verifySms,
  verifyEmail,
  firstSignUpPopup,
  updateUserData,
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updateStatus,
};
