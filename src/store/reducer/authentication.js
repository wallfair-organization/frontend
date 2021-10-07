import update from 'immutability-helper';
import { AuthenticationTypes } from '../actions/authentication';
import AuthState from '../../constants/AuthState';

const initialState = {
  loading: false,
  referral: null,
  userId: null,
  name: '',
  username: '',
  phone: '',
  country: '49',
  email: '',
  aboutMe: '',
  emailVerificationState: null,
  token: null,
  balance: 0,
  totalWin: 0,
  profilePicture: null,
  referralList: [],
  admin: false,
  authState: AuthState.LOGGED_OUT,
  rank: 0,
  amountWon: 0,
  toNextRank: 0,
  totalInvestmentAmount: 0,
  totalOpenTradesAmount: 0,
  preferences: {},
};

const requestSmsSucceeded = (action, state) => {
  return update(state, {
    loading: {
      $set: false,
    },
    phone: {
      $set: action.phone,
    },
    authState: {
      $set: AuthState.SMS_SENT,
    },
    existing: {
      $set: action.existing,
    },
    error: {
      $set: null,
    },
  });
};

const requestSmsFailed = (action, state) => {
  return update(state, {
    loading: {
      $set: false,
    },
    existing: {
      $set: null,
    },
    error: {
      $set: action.error?.message,
    },
  });
};

const requestSmsVerifyFailed = (action, state) => {
  return update(state, {
    loading: {
      $set: false,
    },
    error: {
      $set: action?.message,
    },
  });
};

const requestSmsVerified = (action, state) => {
  let authState = AuthState.LOGGED_IN;
  const name = action.name;
  const email = action.email;

  if (!email) {
    authState = AuthState.SET_EMAIL;
  }

  if (!name) {
    authState = AuthState.SET_NAME;
  }

  return update(state, {
    loading: {
      $set: false,
    },
    userId: {
      $set: action.userId,
    },
    name: {
      $set: name,
    },
    email: {
      $set: email,
    },
    token: {
      $set: action.session,
    },
    authState: {
      $set: authState,
    },
    existing: {
      $set: null,
    },
    error: {
      $set: null,
    },
  });
};

const requestEmailVerified = (action, state) => {
  return update(state, {
    emailVerificationState: {
      $set: true,
    },
  });
};

const requestEmailFailed = (action, state) => {
  return update(state, {
    emailVerificationState: {
      $set: false,
    },
  });
};

const setName = (action, state) => {
  return update(state, {
    name: {
      $set: action.name,
    },
    username: {
      $set: action.username,
    },
  });
};

const setEmail = (action, state) => {
  return update(state, {
    loading: {
      $set: true,
    },
    email: {
      $set: action.email,
    },
  });
};

const setPhone = (action, state) => {
  return update(state, {
    phone: {
      $set: action.phone,
    },
  });
};

const setCountryCode = (action, state) => {
  return update(state, {
    country: {
      $set: action.country,
    },
  });
};

const saveAdditionalInfoSucceeded = (action, state) => {
  let authState = AuthState.LOGGED_IN;
  const email = action.email;
  const name = action.name;

  if (!email) {
    authState = AuthState.SET_EMAIL;
  }

  if (!name) {
    authState = AuthState.SET_NAME;
  }

  return update(state, {
    loading: {
      $set: false,
    },
    authState: {
      $set: authState,
    },
  });
};

const saveAdditionalInfoFailed = (action, state) => {
  return update(state, {
    loading: {
      $set: false,
    },
    error: {
      $set: action?.message,
    },
  });
};

const updateData = (action, state) => {
  return update(state, {
    balance: {
      $set: action.balance,
    },
    profilePicture: {
      $set: action.profilePicture,
    },
    username: {
      $set: action.username,
    },
    email: {
      $set: action.email,
    },
    admin: {
      $set: action.admin,
    },
    totalWin: {
      $set: action.totalWin,
    },
    rank: {
      $set: action.rank,
    },
    amountWon: {
      $set: action.amountWon,
    },
    toNextRank: {
      $set: action.toNextRank,
    },
    preferences: {
      $set: action.preferences,
    },
    aboutMe: {
      $set: action.aboutMe,
    },
  });
};

const logout = (action, state) => {
  return update(state, {
    $set: initialState,
  });
};

const setLoading = (action, state) => {
  return update(state, {
    loading: {
      $set: true,
    },
    error: {
      $set: null,
    },
  });
};

const cleanErrors = (action, state) => {
  return update(state, {
    error: {
      $set: null,
    },
  });
};

const setReferral = (action, state) => {
  return update(state, {
    referral: {
      $set: action.referral,
    },
  });
};

const fetchReferralsSucceeded = (action, state) => {
  return update(state, {
    referralList: {
      $set: action.referralList,
    },
  });
};

const resetAuthState = (action, state) => {
  const authState = state.authState;

  if (authState !== AuthState.LOGGED_OUT && authState !== AuthState.LOGGED_IN) {
    return update(state, {
      authState: {
        $set: AuthState.LOGGED_OUT,
      },
      error: {
        $set: null,
      },
    });
  }

  return state;
};

const downgradeAuthState = (action, state) => {
  let authState =
    state.authState === AuthState.SET_EMAIL
      ? AuthState.SET_NAME
      : AuthState.LOGGED_OUT;

  return update(state, {
    authState: {
      $set: authState,
    },
    error: {
      $set: null,
    },
  });
};

const loginSuccess = (action, state) => {
  return update(state, {
    loading: {
      $set: false,
    },
    userId: {
      $set: action.userId,
    },
    token: {
      $set: action.session,
    },
    authState: {
      $set: AuthState.LOGGED_IN,
    },
    existing: {
      $set: null,
    },
    error: {
      $set: null,
    },
  });
};

const loginFail = (action, state) => {
  return update(state, {
    loading: {
      $set: false,
    },
    error: {
      $set: action?.message,
    },
  });
};

const signUpFail = (action, state) => {
  return update(state, {
    loading: {
      $set: false,
    },
    error: {
      $set: action?.message,
    },
  });
};

const forgotPasswordFail = (action, state) => {
  return update(state, {
    loading: {
      $set: false,
    },
    error: {
      $set: action?.message,
    },
  });
};

const resetPasswordFail = (action, state) => {
  return update(state, {
    loading: {
      $set: false,
    },
    error: {
      $set: action?.message,
    },
  });
};

// update user data reducers
const initiateUpdateUserData = ({ payload }, state) => {
  return {
    ...state,
    loading: true,
  };
};
const updateUserDataSucceeded = ({ payload }, state) => {
  return {
    ...state,
    ...payload,
    loading: false,
  };
};

const updateUserDataFailed = ({ payload }, state) => {
  return {
    ...state,
    loading: false,
  };
};

const updateInvestmentData = (action, state) => {
  return update(state, {
    totalInvestmentAmount: {
      $set: action.totalInvestmentAmount,
    },
    totalOpenTradesAmount: {
      $set: action.totalOpenTradesAmount,
    },
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case AuthenticationTypes.LOGOUT:
      return logout(action, state);
    case AuthenticationTypes.SET_EMAIL:
      return setEmail(action, state);
    case AuthenticationTypes.SET_NAME:
      return setName(action, state);
    case AuthenticationTypes.SET_PHONE:
      return setPhone(action, state);
    case AuthenticationTypes.SET_COUNTRY_CODE:
      return setCountryCode(action, state);
    case AuthenticationTypes.REQUEST_SMS_SUCCEEDED:
      return requestSmsSucceeded(action, state);
    case AuthenticationTypes.REQUEST_SMS_FAILED:
      return requestSmsFailed(action, state);
    case AuthenticationTypes.VERIFY_SMS_SUCCEEDED:
      return requestSmsVerified(action, state);
    case AuthenticationTypes.VERIFY_SMS_FAILED:
      return requestSmsVerifyFailed(action, state);
    case AuthenticationTypes.VERIFY_EMAIL_SUCCEEDED:
      return requestEmailVerified(action, state);
    case AuthenticationTypes.VERIFY_EMAIL_FAILED:
      return requestEmailFailed(action, state);
    case AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED:
      return saveAdditionalInfoSucceeded(action, state);
    case AuthenticationTypes.REQUEST_SMS:
    case AuthenticationTypes.VERIFY_SMS:
    case AuthenticationTypes.SIGN_UP:
    case AuthenticationTypes.LOGIN:
      return setLoading(action, state);
    case AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED:
      return saveAdditionalInfoFailed(action, state);
    case AuthenticationTypes.UPDATE_DATA:
      return updateData(action, state);
    case AuthenticationTypes.SET_REFERRAL:
      return setReferral(action, state);
    case AuthenticationTypes.FETCH_REFERRALS_SUCCEEDED:
      return fetchReferralsSucceeded(action, state);
    case AuthenticationTypes.RESET_AUTH_STATE:
      return resetAuthState(action, state);
    case AuthenticationTypes.DOWNGRADE_AUTH_STATE:
      return downgradeAuthState(action, state);
    case AuthenticationTypes.INITIATE_UPDATE_USER_DATA:
      return initiateUpdateUserData(action, state);
    case AuthenticationTypes.UPDATE_USER_DATA_SUCCEEDED:
      return updateUserDataSucceeded(action, state);
    case AuthenticationTypes.UPDATE_USER_DATA_FAILED:
      return updateUserDataFailed(action, state);
    case AuthenticationTypes.UPDATE_INVESTMENT_DATA:
      return updateInvestmentData(action, state);
    case AuthenticationTypes.LOGIN_SUCCESS:
      return loginSuccess(action, state);
    case AuthenticationTypes.LOGIN_FAIL:
      return loginFail(action, state);
    case AuthenticationTypes.SIGN_UP_FAIL:
      return signUpFail(action, state);
    case AuthenticationTypes.FORGOT_PASSWORD_FAIL:
      return forgotPasswordFail(action, state);
    case AuthenticationTypes.RESET_PASSWORD_FAIL:
      return resetPasswordFail(action, state);
    default:
      return cleanErrors(action, state);
    // @formatter:on
  }
}
