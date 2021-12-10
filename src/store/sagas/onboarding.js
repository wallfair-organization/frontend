import { put } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import { OnboardingSteps } from 'store/actions/onboarding';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from '../../components/Popup/PopupTheme';

const loadOnboardingStep = function* (action) {
  const step = yield select(state => state.onboarding.currentStep);
  switch(step){
    case OnboardingSteps.buildAvatar:
      return yield put(
        PopupActions.show({
          popupType: PopupTheme.alpacaBuilder,
          options: {
            ...action?.options,
            saveLabel:"Next",
            cancelLabel: "Skip",
            popUpTitle: "Build your Alpaca",
            small: false
          },
        })
      );
    case OnboardingSteps.registerEmail:
      return yield put(
        PopupActions.show({
          popupType: PopupTheme.auth,
          options: {
            ...action?.options,
            small: true,
          },
        })
      );
    case OnboardingSteps.setUsername:
      return yield put(
        PopupActions.show({
          popupType: PopupTheme.username,
          options: {
            ...action?.options,
            small: false,
          },
        })
      );
    case OnboardingSteps.welcomeScreen:
      //just do nothing for now
      return yield put(
        PopupActions.hide()
      )
      // return yield put(
      //   PopupActions.show({
      //     popupType: PopupTheme.welcome,
      //     options: {
      //       ...action?.options,
      //       small: false,
      //     },
      //   })
      // );
    }
};


export default {
  loadOnboardingStep,
};
