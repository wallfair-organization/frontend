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
import BonusItem from "components/BonusItem";
import { getPromoCodes } from "api";
import { Grid } from "@material-ui/core";
import EventActivitiesTabs from "components/EventActivitiesTabs";
import TabOptions from "components/TabOptions";

const Bonus = () => {
  const [bonusList, setBonusList] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  let tabOptions = [
    // { name: 'Money Bonus', index: 0 },
    // { name: 'Freespin Bonus', index: 1 },
    { name: 'Currently Active', index: 0 },
    { name: 'History of Activated Bonus', index: 1 },
  ];

  const fetchBonus = (index = tabIndex) => {
    switch (index) {
      // case 0: 
      //   fetchMoneyBonus();
      //   break;
      // case 1:
      //   fetchFreespinBonus();
      //   break;
      // case 2:
      case 0:
        fetchActivatedBonus();
        break;
      case 1:
        fetchAllBonus();
        break;
    }
  }

  const handleSwitchTab = ({ index }) => {
    fetchBonus(index);
    setTabIndex(index);
  };

  const fetchAllBonus = async () => {
    const result = await getPromoCodes(['FINALIZED', 'CANCELLED', 'EXPIRED']);
    const filteredResult = result?.sort((a, b) => new Date(b.claimed_at) - new Date(a.claimed_at)) || [];
    setBonusList(filteredResult);
  }

  const fetchMoneyBonus = async () => {
    const result = await getPromoCodes(['CLAIMED', 'FINALIZED', 'CANCELLED']);
    const filteredResult = result?.filter(bonusItemData => bonusItemData.type === 'BONUS')?.sort((a, b) => new Date(b.claimed_at) - new Date(a.claimed_at)) || [];
    setBonusList(filteredResult);
  }

  const fetchFreespinBonus = async () => {
    const result = await getPromoCodes(['CLAIMED', 'FINALIZED', 'CANCELLED']);
    const filteredResult = result?.filter(bonusItemData => bonusItemData.type === 'FREESPIN')?.sort((a, b) => new Date(b.claimed_at) - new Date(a.claimed_at)) || [];
    setBonusList(filteredResult);
  }

  const fetchActivatedBonus = async () => {
    const result = await getPromoCodes(['CLAIMED']);
    setBonusList(result || []);
  }

  useEffect(() => {
    fetchActivatedBonus();
  }, []);

  const renderActivities = () => {
    return (
      <div className={styles.activitiesTracker}>
        <div className={styles.title}>
          <h2>Activities</h2>
        </div>
        <Grid item xs={12}>
          <EventActivitiesTabs
            activitiesLimit={50}
            className={styles.activitiesTrackerGamesBlock}
            preselectedCategory={'game'}
            hideSecondaryColumns={true}
            hideFirstColumn={true}
            layout="wide"
          />
        </Grid>
      </div>
    );
  };

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

        <ClaimBonusWidget fetchBonus={fetchBonus} />
        
        <TabOptions options={tabOptions} className={styles.tabLayout}>
          {option => (
            <div
              className={
                option.index === tabIndex
                  ? styles.tabItemSelected
                  : styles.tabItem
              }
              onClick={() => handleSwitchTab(option)}
            >
              {option.name}
            </div>
          )}
        </TabOptions>

        {bonusList.length > 0 &&
          <div className={styles.itemGrid}>
            {bonusList.map((bonusItemData, index) => <BonusItem key={index} fetchBonus={fetchBonus} data={bonusItemData} />)}
          </div>
        }

        {bonusList.length === 0 &&
          (tabIndex === 0 ?
            <p className={styles.noBonus}>You have no active bonus.</p>
          :
            <p className={styles.noBonus}>You have not claimed any bonus yet.</p>
          )
        }

        {renderActivities()} 
      </div>

    </BaseContainerWithNavbar>
  );
};

export default Bonus;