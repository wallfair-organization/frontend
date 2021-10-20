import styles from './styles.module.scss';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import TabOptions from '../../components/TabOptions';
import { getUserPublicInfo, getUserPublicStats } from '../../api';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';

import ProfileActivityTemplate1 from '../../data/backgrounds/profile/userprofile_activity1.png';
import ProfileActivityTemplate2 from '../../data/backgrounds/profile/userprofile_activity2.png';
import ProfileActivityTemplate3 from '../../data/backgrounds/profile/userprofile_activity3.png';

import ProfileActivityMobileTemplate1 from '../../data/backgrounds/profile/userprofile_mobile_activity1.png';
import ProfileActivityMobileTemplate2 from '../../data/backgrounds/profile/userprofile_mobile_activity2.png';
import ProfileActivityMobileTemplate3 from '../../data/backgrounds/profile/userprofile_mobile_activity3.png';
import ActivitiesTracker from '../../components/ActivitiesTracker';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AuthenticationActions } from 'store/actions/authentication';
import Leaderboard from 'components/Leaderboard';

const UserProfile = () => {
  let matchMediaMobile = window.matchMedia(`(max-width: ${768}px)`).matches;

  const { userId } = useParams();
  const [user, setUser] = useState();
  const [userStats, setUserStats] = useState();
  const [suspendButtonVisible, setSuspendButtonVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const tabOptions = [
    { name: 'TRANSACTION HISTORY', index: 0 },
    { name: 'ACTIVITIES', index: 1 },
    { name: 'LEADERBOARD', index: 2 },
  ];
  const currentUser = useSelector(state => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser(userId);
    fetchUserStats(userId);
  }, [userId]);

  const fetchUser = async userId => {
    const userResponse = await getUserPublicInfo(userId).catch(err => {
      console.error("Can't get user by id:", err);
    });
    const user = _.get(userResponse, 'data', null);
    setUser({ ...user, userId });
    setLocked(user?.status === 'locked');
    setSuspendButtonVisible(currentUser.admin && currentUser.userId !== userId);
  };

  const fetchUserStats = async userId => {
    const statsResponse = await getUserPublicStats(userId).catch(err => {
      console.error("Can't get user stats by id:", err);
    });
    const userStats = _.get(statsResponse, 'data.stats', null);
    setUserStats(userStats);
  };

  const handleSwitchTab = option => {
    setTabIndex(option.index);
  };

  const onSuspendButtonClick = status => {
    dispatch(AuthenticationActions.updateStatus({ userId, status }));
    setLocked(status === 'locked');
  };

  const renderTabConditional = () => {
    switch (tabIndex) {
      case 0:
        return (
          <>
            <img
              src={
                matchMediaMobile
                  ? ProfileActivityMobileTemplate1
                  : ProfileActivityTemplate1
              }
              className={styles.templateImage}
              alt=""
            />
            <div className={styles.inactivePlaceholder}>Coming soon</div>
          </>
        );
      case 1:
        return (
          <div className={styles.activities}>
            <ActivitiesTracker
              showCategories={false}
              activitiesLimit={50}
              userId={userId}
              className={styles.activitiesTrackerUserPage}
            />
          </div>
        );
      case 2:
        return (
          <div className={styles.leaderboard}>
            <Leaderboard
              fetch={true}
              headingClass={styles.heading}
              userRef={user}
            />
          </div>
        );
    }
  };

  const UserStatsSide = () => {
    return (
      <>
        <div className={styles.header}>Statistics</div>
        <div className={styles.statsBlock}>
          <div className={styles.statItem}>
            <div className={styles.statItemHead}>
              <span>{userStats?.casinoGamePlayCount}</span> Games
            </div>
            <div className={styles.statItemHint}>Total casino games played</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statItemHead}>
              <span>{userStats?.casinoGameCashoutCount}</span> Cashouts
            </div>
            <div className={styles.statItemHint}>Total casino cashouts</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statItemHead}>
              <span>{userStats?.userBetsAmount?.totalBets}</span> Bets
            </div>
            <div className={styles.statItemHint}>Total bets</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statItemHead}>
              <span>{userStats?.userBetsCashouts?.totalCashouts}</span> Cashouts
            </div>
            <div className={styles.statItemHint}>Total bet cashouts</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statItemHead}>
              <span>{userStats?.userBetsRewards?.totalRewards}</span> Rewards
            </div>
            <div className={styles.statItemHint}>Total bet rewards</div>
          </div>
        </div>
      </>
    );
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
              <div>
                <div className={styles.profileTitle}>
                  <h2>{user?.userName}</h2>
                </div>
                <div className={styles.aboutSection}>
                  <h3>About</h3>
                  <p>
                    {' '}
                    {user?.aboutMe ||
                      'This user has not provided an about info yet. How boring!'}{' '}
                  </p>
                </div>
              </div>
              {suspendButtonVisible && (
                <Button
                  className={styles.suspendButton}
                  onClick={() =>
                    onSuspendButtonClick(locked ? 'active' : 'locked')
                  }
                >
                  <span>{locked ? 'Reactivate' : 'Suspend'}</span>
                </Button>
              )}
            </div>

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
          </div>
          <div className={styles.contentBlock}>
            <div className={styles.mainContent}>
              <div className={styles.userActivities}>
                {renderTabConditional()}
              </div>
            </div>

            <div className={styles.sideContent}>
              <UserStatsSide />
            </div>
          </div>
        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

export default UserProfile;
