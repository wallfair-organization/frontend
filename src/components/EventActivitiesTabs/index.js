import { useEffect, memo, useState} from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import { connect, useDispatch } from 'react-redux';
import EventActivitiesTracker from 'components/EventActivitiesTracker';
import TabOptions from 'components/TabOptions';
import ActivityTable from 'components/EventActivitiesTracker/ActivityTable';
import { RosiGameActions } from 'store/actions/rosi-game';
import useRosiData from 'hooks/useRosiData';
import classNames from 'classnames';

const EventActivitiesTabs = ({ refreshHighData, refreshLuckyData, connected, userId, refreshMyBetsData, activitiesLimit, className,
  preselectedCategory, hideSecondaryColumns, layout, gameId, gameScreen = false}) => {

  const dispatch = useDispatch();
  const {
    highData,
    luckyData,
    myBetsData,
  } = useRosiData();
  const [activityTabIndex, setActivityTabIndex] = useState(0);
  let activityTabOptions = [
    { name: 'All', index: 0 },
    { name: 'High Wins', index: 1 },
    { name: 'Lucky Wins', index: 2 },
  ];

  if(userId) activityTabOptions.push({name: 'My Bets', index: 3});

  const handleActivitySwitchTab = ({ index }) => {
    switch (index) {
      case 1: // high wins
        refreshHighData({gameId});
        break;
      case 2: // lucky wins
        refreshLuckyData({gameId});
        break;
      case 3:
        if(userId) refreshMyBetsData({userId, gameId});
        break;
    }
    setActivityTabIndex(index);
  };
  const getActivityTableData = () => {
    switch (activityTabIndex) {
      case 1:
        return highData || [];
      case 2:
        return luckyData || [];
      case 3:
        return myBetsData || [];
    }
  }

  useEffect(() => {
    refreshHighData({gameId});
    refreshLuckyData({gameId});
    if(userId) refreshMyBetsData({userId, gameId});
  }, [dispatch, connected]);

  return (
    <div className={classNames(styles.activityWrapper, className)}>
      <TabOptions options={activityTabOptions} className={styles.tabLayout}>
        {option => (
          <div
            className={
              option.index === activityTabIndex
                ? styles.tabItemSelected
                : styles.tabItem
            }
            onClick={() => handleActivitySwitchTab(option)}
          >
            {option.name}
          </div>
        )}
      </TabOptions>
      <div className={styles.activityContainer}>
        {activityTabIndex === 0 && (
          <EventActivitiesTracker
            activitiesLimit={activitiesLimit}
            className={className}
            preselectedCategory={preselectedCategory}
            hideSecondaryColumns={hideSecondaryColumns}
            gameScreen={gameScreen}
            layout={layout}
            gameId={gameId}
          />
        )}
        {activityTabIndex !== 0 && (
          <ActivityTable
            hideSecondaryColumns={hideSecondaryColumns}
            gameScreen={gameScreen}
            rowData={getActivityTableData()}
            layout={layout}
            gameId={gameId}
          />
        )}
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    connected: state.websockets.connected,
    userId: state.authentication.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshHighData: (data) => dispatch(RosiGameActions.fetchHighData(data)),
    refreshLuckyData: (data) => dispatch(RosiGameActions.fetchLuckyData(data)),
    refreshMyBetsData: (data) => dispatch(RosiGameActions.fetchMyBetsData(data)),
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(EventActivitiesTabs);
export default memo(Connected);
