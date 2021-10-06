import { makeActionCreator } from '../../helper/Store';

export const AuthenticationTypes = {
  FETCH_REFERRALS: 'Authentication/FETCH_REFERRALS',
  FETCH_REFERRALS_FAILED: 'Authentication/FETCH_REFERRALS_FAILED',
  FETCH_REFERRALS_SUCCEEDED: 'Authentication/FETCH_REFERRALS_SUCCEEDED',
  LOGOUT: 'Authentication/LOGOUT',
  REQUEST_SMS: 'Authentication/REQUEST_SMS',
  REQUEST_SMS_FAILED: 'Authentication/REQUEST_SMS_FAILED',
  REQUEST_SMS_SUCCEEDED: 'Authentication/REQUEST_SMS_SUCCEEDED',
  SAVE_ADDITIONAL_INFO_FAILED: 'Authentication/SAVE_ADDITIONAL_INFO_FAILED',
  SAVE_ADDITIONAL_INFO_SUCCEEDED:
    'Authentication/SAVE_ADDITIONAL_INFO_SUCCEEDED',
  SET_EMAIL: 'Authentication/SET_EMAIL',
  SET_NAME: 'Authentication/SET_NAME',
  SET_PHONE: 'Authentication/SET_PHONE',
  SET_COUNTRY_CODE: 'Authentication/SET_COUNTRY_CODE',
  SET_REFERRAL: 'Authentication/SET_REFERRAL',
  UPDATE_DATA: 'Authentication/UPDATE_DATA',
  VERIFY_SMS: 'Authentication/VERIFY_SMS',
  VERIFY_SMS_FAILED: 'Authentication/VERIFY_SMS_FAILED',
  VERIFY_SMS_SUCCEEDED: 'Authentication/VERIFY_SMS_SUCCEEDED',
  VERIFY_EMAIL: 'Authentication/VERIFY_EMAIL',
  VERIFY_EMAIL_FAILED: 'Authentication/VERIFY_EMAIL_FAILED',
  VERIFY_EMAIL_SUCCEEDED: 'Authentication/VERIFY_EMAIL_SUCCEEDED',
  RESET_AUTH_STATE: 'Authentication/RESET_AUTH_STATE',
  DOWNGRADE_AUTH_STATE: 'Authentication/DOWNGRADE_AUTH_STATE',
  INITIATE_UPDATE_USER_DATA: 'Authentication/INITIATE_UPDATE_USER_DATA',
  UPDATE_USER_DATA_SUCCEEDED: 'Authentication/UPDATE_USER_DATA_SUCCEEDED',
  UPDATE_USER_DATA_FAILED: 'Authentication/UPDATE_USER_DATA_FAILED',
  UPDATE_INVESTMENT_DATA: 'Authentication/UPDATE_INVESTMENT_DATA',
  SIGN_UP: 'Authentication/SIGN_UP',
  SIGN_UP_FAIL: 'Authentication/SIGN_UP_FAIL',
  LOGIN: 'Authentication/LOGIN',
  LOGIN_SUCCESS: 'Authentication/LOGIN_SUCCESS',
  LOGIN_FAIL: 'Authentication/LOGIN_FAIL',
  FORGOT_PASSWORD: 'Authentication/FORGOT_PASSWORD',
  FORGOT_PASSWORD_FAIL: 'Authentication/FORGOT_PASSWORD_FAIL',
  RESET_PASSWORD: 'Authentication/RESET_PASSWORD',
  RESET_PASSWORD_FAIL: 'Authentication/RESET_PASSWORD_FAIL',
};

const fetchReferrals = makeActionCreator(AuthenticationTypes.FETCH_REFERRALS);

const fetchReferralsFailed = makeActionCreator(
  AuthenticationTypes.FETCH_REFERRALS_FAILED
);

const fetchReferralsSucceeded = makeActionCreator(
  AuthenticationTypes.FETCH_REFERRALS_SUCCEEDED,
  {
    referralList: null,
  }
);
const logout = makeActionCreator(AuthenticationTypes.LOGOUT);

const requestSms = makeActionCreator(AuthenticationTypes.REQUEST_SMS);

const requestSmsFailed = makeActionCreator(
  AuthenticationTypes.REQUEST_SMS_FAILED,
  {
    phone: null,
  }
);

const requestSmsSucceeded = makeActionCreator(
  AuthenticationTypes.REQUEST_SMS_SUCCEEDED,
  {
    phone: null,
    smsStatus: null,
  }
);

const downgradeState = makeActionCreator(
  AuthenticationTypes.DOWNGRADE_AUTH_STATE
);

const saveAdditionalInfoFailed = makeActionCreator(
  AuthenticationTypes.SAVE_ADDITIONAL_INFO_FAILED,
  {
    error: null,
  }
);

const saveAdditionalInfoSucceeded = makeActionCreator(
  AuthenticationTypes.SAVE_ADDITIONAL_INFO_SUCCEEDED
);

const setEmail = makeActionCreator(AuthenticationTypes.SET_EMAIL, {
  email: null,
});

const setPhone = makeActionCreator(AuthenticationTypes.SET_PHONE, {
  phone: null,
});

const setCountry = makeActionCreator(AuthenticationTypes.SET_COUNTRY_CODE, {
  country: null,
});

const setName = makeActionCreator(AuthenticationTypes.SET_NAME, {
  name: null,
  username: null,
});

const setReferral = makeActionCreator(AuthenticationTypes.SET_REFERRAL, {
  referral: null,
});

const updateData = makeActionCreator(AuthenticationTypes.UPDATE_DATA, {
  balance: null,
  profilePicture: null,
  username: null,
  admin: false,
  totalWin: null,
  rank: null,
  amountWon: null,
  toNextRank: null,
  preferences: null,
  aboutMe: null,
});

const verifySms = makeActionCreator(AuthenticationTypes.VERIFY_SMS, {
  smsToken: null,
});

const verifySmsFailed = makeActionCreator(
  AuthenticationTypes.VERIFY_SMS_FAILED,
  {
    error: null,
  }
);

const resetAuthState = makeActionCreator(AuthenticationTypes.RESET_AUTH_STATE);

const verifySmsSucceeded = makeActionCreator(
  AuthenticationTypes.VERIFY_SMS_SUCCEEDED,
  {
    userId: null,
    name: null,
    email: null,
    session: null,
  }
);

const verifyEmail = makeActionCreator(AuthenticationTypes.VERIFY_EMAIL, {
  userId: null,
  code: null,
});

const verifyEmailFailed = makeActionCreator(
  AuthenticationTypes.VERIFY_EMAIL_FAILED
);

const verifyEmailSucceeded = makeActionCreator(
  AuthenticationTypes.VERIFY_EMAIL_SUCCEEDED
);

// update user data actions
const initiateUpdateUserData = (payload, newUser = false) => ({
  type: AuthenticationTypes.INITIATE_UPDATE_USER_DATA,
  newUser,
  payload,
});

const updateUserDataSucceeded = payload => ({
  type: AuthenticationTypes.UPDATE_USER_DATA_SUCCEEDED,
  payload,
});

const updateUserDataFailed = payload => ({
  type: AuthenticationTypes.UPDATE_USER_DATA_FAILED,
  payload,
});

const updateInvestmentData = makeActionCreator(
  AuthenticationTypes.UPDATE_INVESTMENT_DATA,
  {
    totalInvestmentAmount: null,
    totalOpenTradesAmount: null,
  }
);

const signUp = makeActionCreator(AuthenticationTypes.SIGN_UP, {
  email: null,
  password: null,
  passwordConfirm: null,
  ref: null,
});

const signUpFail = makeActionCreator(AuthenticationTypes.SIGN_UP_FAIL, {
  message: null,
});

const login = makeActionCreator(AuthenticationTypes.LOGIN, {
  email: null,
  password: null,
  showWelcome: false,
});

const loginSuccess = makeActionCreator(AuthenticationTypes.LOGIN_SUCCESS, {
  userId: null,
  session: null,
  newUser: false,
});

const loginFail = makeActionCreator(AuthenticationTypes.LOGIN_FAIL, {
  message: null,
});

const forgotPassword = makeActionCreator(AuthenticationTypes.FORGOT_PASSWORD, {
  email: null,
});

const forgotPasswordFail = makeActionCreator(
  AuthenticationTypes.FORGOT_PASSWORD_FAIL
);

const resetPassword = makeActionCreator(AuthenticationTypes.RESET_PASSWORD, {
  email: null,
  password: null,
  passwordConfirmation: null,
  token: null,
});

const resetPasswordFail = makeActionCreator(
  AuthenticationTypes.RESET_PASSWORD_FAIL
);

export const AuthenticationActions = {
  fetchReferrals,
  fetchReferralsFailed,
  fetchReferralsSucceeded,
  logout,
  requestSms,
  requestSmsFailed,
  requestSmsSucceeded,
  saveAdditionalInfoFailed,
  saveAdditionalInfoSucceeded,
  setEmail,
  setName,
  setPhone,
  setCountry,
  setReferral,
  updateData,
  verifySms,
  verifySmsFailed,
  verifySmsSucceeded,
  verifyEmail,
  verifyEmailSucceeded,
  verifyEmailFailed,
  resetAuthState,
  downgradeState,
  initiateUpdateUserData,
  updateUserDataSucceeded,
  updateUserDataFailed,
  updateInvestmentData,
  signUp,
  signUpFail,
  login,
  loginSuccess,
  loginFail,
  forgotPassword,
  forgotPasswordFail,
  resetPassword,
  resetPasswordFail,
};
