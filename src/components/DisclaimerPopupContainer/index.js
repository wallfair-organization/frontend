import PopupTheme from 'components/Popup/PopupTheme';
import { PopupActions } from 'store/actions/popup';
import { connect } from 'react-redux';

const DisclaimerPopupContainer = ({ showPopup }) => {
  const hasAcceptedTerms = () => {
    return localStorage.getItem('acceptedTerms') || false;
  };

  const showTermsDisclaimerPopup = () => {
    console.log(hasAcceptedTerms());
    if (!hasAcceptedTerms()) {
      showPopup(PopupTheme.disclaimer);
    }
  };

  showTermsDisclaimerPopup();

  return null;
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(DisclaimerPopupContainer);
