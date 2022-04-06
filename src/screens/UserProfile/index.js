import styles from './styles.module.scss';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import TabOptions from '../../components/TabOptions';
import { getUserPublicInfo } from '../../api';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import { connect } from 'react-redux';
import Leaderboard from 'components/Leaderboard';
import BetTable from 'components/UserWalletTables/tables/BetTable';
import useRosiData from 'hooks/useRosiData';
import { RosiGameActions } from 'store/actions/rosi-game';

const UserProfile = ({refreshMyBetsData}) => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const tabOptions = [
    { name: 'BETS PLACED', index: 0 },
    { name: 'LEADERBOARD', index: 1 },
  ];
  // if(matchMediaMobile) tabOptions.push({ name: 'STATISTICS', index: 2});

  // const [sideTabIndex, setSideTabIndex] = useState(0);
  // const sideTabOptions = [
  //   { name: 'Statistics', index: 0 },
  // ];
  const { myBetsData } = useRosiData();
  const betsRow = myBetsData ? myBetsData: [];


  useEffect(() => {
    refreshMyBetsData({ userId });
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async userId => {
    const userResponse = await getUserPublicInfo(userId).catch(err => {
      console.error("Can't get user by id:", err);
    });
    const user = _.get(userResponse, 'data', null);
    setUser({ ...user, userId });
  };

  const handleSwitchTab = option => {
    setTabIndex(option.index);
  };

  const renderTabConditional = () => {
    switch (tabIndex) {
      case 0:
        return (
          <div className={styles.activities}>
            <BetTable 
              headingClass={styles.heading}
              renderRow={betsRow} />
          </div>
        );
      case 1:
        return (
          <div className={styles.leaderboard}>
            <Leaderboard
              fetch={true}
              headingClass={styles.heading}
              userRef={user}
              className={styles.leaderboardTable}
            />
          </div>
        );
    }
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.containerHeader}></div>
          <div className={styles.headerBody}>
            <div className={styles.avatarBox}>
              <img
                className={styles.profileImage}
                src={getProfilePictureUrl(user?.profilePicture)}
                alt="Profile"
              />
            </div>

            <div className={styles.userInfo}>
              <div className={styles.profileSection}>
                <h2>{user?.username}</h2>
                <p>
                  {' '}
                  {user?.aboutMe ||
                    'This user has not provided an about info yet. How boring!'}{' '}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.contentBlock}>
            <div className={styles.mainContent}>
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
              <div className={styles.userActivities}>
                {renderTabConditional()}
              </div>
            </div>

            {/* <div className={styles.sideContainer}>
              <TabOptions options={sideTabOptions} className={styles.tabLayout}>
                {option => (
                  <div
                    className={
                      option.index === sideTabIndex
                        ? styles.tabItemSelected
                        : styles.tabItem
                    }
                    onClick={() => handleSwitchSideTab(option)}
                  >
                    {option.name}
                  </div>
                )}
              </TabOptions>
              <div className={styles.sideContent}>
                <UserStatsSide />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.authentication.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshMyBetsData: data => dispatch(RosiGameActions.fetchMyBetsData(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
