import { makeActionCreator } from '../../helper/Store';

export const OnboardingTypes = {
  START: 'Onboarding/START',
  NEXT: 'Onboarding/NEXT',
  GET_USERNAME: 'Onboarding/GET_USERNAME',
  ADD_USERNAME_SUGGESTION: 'Onboarding/ADD_USERNAME_SUGGESTION',
  ADD_PHONE: 'Onboarding/ADD_PHONE',
  RESET: 'Onboarding/RESET',
};

export const OnboardingSteps = {
  // buildAvatar: "buildAvatar",
  registerEmail: "registerEmail",
  setUsername: "setUsername",
  setPhoneNumber: "setPhoneNumber",
  phoneVerification: "phoneVerification",
  // welcomeScreen: "welcomeScreen",
  wallet: "wallet",
};

const start = makeActionCreator(OnboardingTypes.START, {});

const next = makeActionCreator(OnboardingTypes.NEXT, {});
const getUsername = makeActionCreator(OnboardingTypes.GET_USERNAME, {});
const addUsernameSuggestion = makeActionCreator(OnboardingTypes.ADD_USERNAME_SUGGESTION,
  {username: null});
const addPhoneNumber = makeActionCreator(OnboardingTypes.ADD_PHONE, {});
const reset = makeActionCreator(OnboardingTypes.RESET, {});

export const OnboardingActions = {
  start,
  next,
  getUsername,
  addUsernameSuggestion,
  addPhoneNumber,
  reset,
};
