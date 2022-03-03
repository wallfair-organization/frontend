import { addPath } from 'graphql/jsutils/Path';
import { OnboardingTypes, OnboardingSteps } from '../actions/onboarding';

const initialState = {
  currentStep: null,
  username: null,
  suggestion: '',
  initialOnboarding: true,
};

export const Order = [
  OnboardingSteps.setUsername,
  OnboardingSteps.registerEmail,
  OnboardingSteps.setPhoneNumber,
  OnboardingSteps.phoneVerification,
  //todo: show success popup
  OnboardingSteps.wallet,
];

const start = (action, state) => {
  return {
    ...state,
    currentStep: Order[0]
  }
};

const setPhone = (action, state) => {
  return {
    ...state,
    initialOnboarding: action?.payload?.initialOnboarding === true,
    currentStep: OnboardingSteps.setPhoneNumber,
  }
};


const next = (action, state) => {
  console.log('next action', action);
  console.log('next state', state);
  var current = Order.findIndex(e => e === state.currentStep) || 0;
  var next = current;
  if(current <= Order.length-1) next = current +1;
  return {
    ...state,
    currentStep: Order[next],
    username: action?.payload?.username ? action.payload.username : state.username,
    phoneNumber: action?.payload?.phoneNumber ? action.payload.phoneNumber : state.phoneNumber,
    initialOnboarding: action?.payload?.initialOnboarding === true
  }
};

const addSuggestion = (action, state) => {
  return {...state,
    suggestion: action.username
  }
}
const reset = (action, state) => {
  return initialState;
}

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case OnboardingTypes.START:
      return start(action, state);
    case OnboardingTypes.NEXT:
      return next(action, state);
    case OnboardingTypes.ADD_USERNAME_SUGGESTION:
      return addSuggestion(action, state);
    case OnboardingTypes.ADD_PHONE:
      return setPhone(action, state);
    case OnboardingTypes.RESET:
      return reset(action, state);
    default:
      return state;
    // @formatter:on
  }
}
