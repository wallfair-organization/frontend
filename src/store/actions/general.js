export const GeneralTypes = {
  SET_GLOBAL_DRAWER: 'General/SET_GLOBAL_DRAWER',
  SET_EDIT_PROFILE_VISIBLE: 'General/SET_EDIT_PROFILE_VISIBLE',
  SET_MY_TRADES_VISIBLE: 'General/SET_MY_TRADES_VISIBLE',
  SET_EMAIL_NOTIFICATIONS_VISIBLE: 'General/EMAIL_NOTIFICATIONS_VISIBLE',
  SET_PREFERENCES_VISIBLE: 'General/SET_PREFERENCES_VISIBLE',
  SET_REFERRALS_VISIBLE: 'General/SET_REFFERRALS_VISIBLE',
  SET_DISCLAIMER_VISIBLE: 'General/SET_DISCLAIMER_VISIBLE',
};

const setDrawer = payload => ({
  type: GeneralTypes.SET_GLOBAL_DRAWER,
  payload,
});

const setEditProfileVisible = payload => ({
  type: GeneralTypes.SET_EDIT_PROFILE_VISIBLE,
  payload,
});

const setMyTradesVisible = visible => ({
  type: GeneralTypes.SET_MY_TRADES_VISIBLE,
  visible,
});

const setEmailNotificationsVisible = visible => ({
  type: GeneralTypes.SET_EMAIL_NOTIFICATIONS_VISIBLE,
  visible,
});

const setPreferencesVisible = visible => ({
  type: GeneralTypes.SET_PREFERENCES_VISIBLE,
  visible,
});

const setReferralsVisible = visible => ({
  type: GeneralTypes.SET_REFERRALS_VISIBLE,
  visible,
});

const setDisclaimerHidden = visible => ({
  type: GeneralTypes.SET_DISCLAIMER_VISIBLE,
  visible,
});

export const GeneralActions = {
  setDrawer,
  setEditProfileVisible,
  setMyTradesVisible,
  setEmailNotificationsVisible,
  setPreferencesVisible,
  setReferralsVisible,
  setDisclaimerHidden,
};
