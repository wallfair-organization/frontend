import { GeneralTypes } from '../actions/general';

const initialState = {
  openDrawer: '',
  editProfileVisible: false,
  myTradesVisible: false,
  emailNotificationsVisible: false,
  preferencesVisible: false,
  referralsVisible: false,
  disclaimerHidden: false,
};

const setDrawer = (state, { payload }) => {
  if (!payload || payload.length === 0) {
    return {
      ...state,
      openDrawer: payload,
      editProfileVisible: false,
      myTradesVisible: false,
      emailNotificationsVisible: false,
      preferencesVisible: false,
    };
  }

  return {
    ...state,
    openDrawer: payload,
  };
};

const setEditProfileVisible = (state, { payload }) => {
  return {
    ...state,
    editProfileVisible: payload,
  };
};

const setMyTradesVisible = (state, action) => {
  return {
    ...state,
    myTradesVisible: action.visible,
  };
};

const setEmailNotificationsVisible = (state, action) => {
  return {
    ...state,
    emailNotificationsVisible: action.visible,
  };
};

const setPreferencesVisible = (state, action) => {
  return {
    ...state,
    preferencesVisible: action.visible,
  };
};

const setReferralsVisible = (state, action) => {
  return {
    ...state,
    referralsVisible: action.visible,
  };
};

const setDisclaimerHidden = (state, action) => {
  return {
    ...state,
    disclaimerHidden: action.visible,
  };
};

const reducers = {
  [GeneralTypes.SET_GLOBAL_DRAWER]: setDrawer,
  [GeneralTypes.SET_EDIT_PROFILE_VISIBLE]: setEditProfileVisible,
  [GeneralTypes.SET_MY_TRADES_VISIBLE]: setMyTradesVisible,
  [GeneralTypes.SET_EMAIL_NOTIFICATIONS_VISIBLE]: setEmailNotificationsVisible,
  [GeneralTypes.SET_PREFERENCES_VISIBLE]: setPreferencesVisible,
  [GeneralTypes.SET_REFERRALS_VISIBLE]: setReferralsVisible,
  [GeneralTypes.SET_DISCLAIMER_VISIBLE]: setDisclaimerHidden,
};

export default function (state = initialState, action) {
  return reducers[action.type] ? reducers[action.type](state, action) : state;
}
