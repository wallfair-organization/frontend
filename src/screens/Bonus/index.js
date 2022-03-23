import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import styles from './styles.module.scss';
import classNames from "classnames";
import Button from "../../components/Button";
import ButtonTheme from '../../components/Button/ButtonTheme';
import { useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopupActions } from "store/actions/popup";
import authState from "constants/AuthState";
import Routes from "constants/Routes";
import PopupTheme from "components/Popup/PopupTheme";
import { OnboardingActions } from "store/actions/onboarding";
import { isMobile } from 'react-device-detect';
import { selectUser } from "store/selectors/authentication";
import ClaimBonusWidget from "components/ClaimBonusWidget";
import BonusItem from "screens/BonusItem";
import { getPromoCodes } from "api";

const Bonus = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isLoggedIn = user.isLoggedIn;

  const [bonusList, setBonusList] = useState([]);

  const showPopup = useCallback((popupType, options) => {
    dispatch(PopupActions.show({popupType, options}));
  }, [dispatch]);

  useEffect(() => {
    const fetchBonus = async () => {
      const result = await getPromoCodes(['CLAIMED', 'FINALIZED', 'CANCELLED']);
      setBonusList(result);
    }

    fetchBonus();
  }, [])

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.bonus}>

        <div className={styles.headlineContainer}>
          <h1 className={styles.headline}>
            Bonus
          </h1>
          {/* <div className={styles.activeBonus}>
            1 Bonus ACTIVE
          </div> */}
        </div>

        <ClaimBonusWidget />

        <div className={styles.itemGrid}>
          {bonusList.map(bonusItemData => <BonusItem data={bonusItemData} />)}
        </div>
        
        
      </div>

    </BaseContainerWithNavbar>
  );
};

export default Bonus;