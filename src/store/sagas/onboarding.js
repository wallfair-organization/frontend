import {call, delay, put} from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import { push } from 'connected-react-router'
import { OnboardingSteps } from 'store/actions/onboarding';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from '../../components/Popup/PopupTheme';
import {getRandomUsername} from '../../api'
import {OnboardingActions} from '../actions/onboarding'
import AuthState from 'constants/AuthState';
import { AuthenticationActions } from 'store/actions/authentication';

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
            popUpTitle: "Alpacavatar",
            small: false
          },
        })
      );
    case OnboardingSteps.registerEmail:
      const authState = yield select(state => state.authentication.authState);
      if(authState === AuthState.LOGGED_IN) {
        const alpacaBuilderData = yield select(state => state.authentication.alpacaBuilderData);
        const username = yield select(state => state.onboarding.username);
        const email = yield select(state => state.authentication.email);
        let userData = {
          email
        };
        if(alpacaBuilderData){
          userData = {
            ...userData,
            imageName: alpacaBuilderData.fileName,
            profilePic: alpacaBuilderData.base64,
            alpacaBuilderProps: alpacaBuilderData.alpacaBuilderProps,
          };
        }
        if(username) {
          userData = {
            ...userData,
            username,
          };
        }
        yield put(AuthenticationActions.initiateUpdateUserData({
          user: userData,
          newUser: false //otherwise it triggers welcome popup
        }))
        return yield put(
          PopupActions.show({
            popupType: PopupTheme.acceptToS,
            options: {
              small: false,
              isOnboarding: true,
            },
          })
        )
      } else {
        return yield put(
          PopupActions.show({
            popupType: PopupTheme.auth,
            options: {
              ...action?.options,
              small: false,
            },
          })
        );
      }
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
    case OnboardingSteps.wallet:
      yield put(push('/wallet'))
      yield delay(1000);
      yield put(OnboardingActions.reset());
  }
};

const getUsernameSuggestion = function* (){
  const result = yield call(getRandomUsername);
  return yield put(OnboardingActions.addUsernameSuggestion({username: result.data.username}))
}


export default {
  loadOnboardingStep,
  getUsernameSuggestion
};
