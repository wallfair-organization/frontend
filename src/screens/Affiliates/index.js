import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import styles from './styles.module.scss';

import Medal from '../../data/images/how-it-works/medal.png';
import classNames from "classnames";
import Button from "../../components/Button";
import ButtonTheme from '../../components/Button/ButtonTheme';
import { Link, useHistory } from "react-router-dom";
import { useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { PopupActions } from "store/actions/popup";
import authState from "constants/AuthState";
import Routes from "constants/Routes";
import PopupTheme from "components/Popup/PopupTheme";
import { OnboardingActions } from "store/actions/onboarding";
import { isMobile } from 'react-device-detect';
import { trackWalletAddWfair } from "config/gtm";
import AffiliatesFAQ from "components/FAQ/AffiliatesFAQ";


const Affiliates = ({loggedIn, showPopup}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.howItWorks}>
        
        <h1 className={styles.headline}>
          WALLFAIR AFFILIATE PROGRAM
        </h1>

        <div className={styles.container}>

          <AffiliatesFAQ />
          
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
    loggedIn: state.authentication.authState === authState.LOGGED_IN,
    userId: state.authentication.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Affiliates);