import { makeActionCreator } from '../../helper/Store';

export const OnboardingTypes = {
  START: 'Onboarding/START',
  NEXT: 'Onboarding/NEXT',
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
const addPhoneNumber = makeActionCreator(OnboardingTypes.ADD_PHONE, {});
const reset = makeActionCreator(OnboardingTypes.RESET, {});

export const OnboardingActions = {
  start,
  next,
  addPhoneNumber,
  reset,
};
