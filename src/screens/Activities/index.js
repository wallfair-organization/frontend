import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import ActivitiesTracker from '../../components/ActivitiesTracker';
import ContentFooter from 'components/ContentFooter';

import './swiper.scss'; //workaround for swiper module

const Activities = () => {
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.activitiesCategory}>
          <span>Activities</span>
        </div>

        <ActivitiesTracker
          showCategories={true}
          activitiesLimit={50}
          className={
            styles.activitiesTrackerContainerFull + ' activities-tracker-swiper'
          }
        />
        <ContentFooter />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Activities;
