import classNames from 'classnames';
import styles from './styles.module.scss';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import DefaultProfilePicture from 'data/images/alpaca-logo-mini.svg';
import EditProfilePicture from 'data/images/profile.svg';
import SettingNotification from 'data/images/setting-notifications.png';
import IconTheme from '../Icon/IconTheme';

const HomeSettings = ({
  loggedIn,
  profilePic,
  onWalletClick,
  onGamesClick,
  onActivitiesClick,
  onLeaderboardClick,
  onAlpacaBuilderClick,
  onEditClick,
  onReferralsClick,
  onEmailNotificationClick,
  onLogoutClick,
  onCloseProfile,
  onKycInfoClick,
}) => {
  return (
    <div className={styles.settings}>
      <div className={styles.settingContainer}>
        <div
          onClick={onGamesClick}
          className={classNames(
            styles.singleSettingHolder
          )}
        >
          <Icon className={styles.referralIcon} iconType={'game'} />
          <p className={styles.settingTitle}>Games</p>
        </div>
        <div
          onClick={onActivitiesClick}
          className={classNames(
            styles.singleSettingHolder
          )}
        >
          <Icon className={styles.referralIcon} iconType={'activities'} />
          <p className={styles.settingTitle}>Activities</p>
        </div>
        <div
          onClick={onLeaderboardClick}
          className={classNames(
            styles.singleSettingHolder
          )}
        >
          <Icon className={styles.referralIcon} iconType={'leaderboard'} />
          <p className={styles.settingTitle}>Leaderboard</p>
        </div>
        {loggedIn && (
        <>
          <div
            onClick={onAlpacaBuilderClick}
            className={classNames(
              styles.singleSettingHolder
            )}
          >
            <Icon className={styles.referralIcon} iconType={'alpaca'} />
            <p className={styles.settingTitle}>Customize your Alpaca</p>
          </div>
          <div
            onClick={onEditClick}
            className={classNames(
              styles.singleSettingHolder
            )}
          >
            <Icon className={styles.referralIcon} iconType={'profile'} />
            <p className={styles.settingTitle}>Edit my Profile</p>
          </div>
          <div
            onClick={() => onKycInfoClick()}
            className={classNames(
              styles.singleSettingHolder
            )}
          >
            <Icon className={styles.referralIcon} iconType={'question'} />
            <p className={styles.settingTitle}>KYC Verification</p>
          </div>
          <div
            className={classNames(
              styles.singleSettingHolder
            )}
            onClick={() => onReferralsClick()}
          >
            <Icon className={styles.referralIcon} iconType={'referral'} />
            <p className={styles.settingTitle}>Referrals</p>
          </div>
        
          <div
            className={classNames(
              styles.singleSettingHolder
            )}
            onClick={onLogoutClick}
          >
            <Icon className={styles.referralIcon} iconType={'logout'} />
            <p className={styles.settingTitle}>Logout</p>
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default HomeSettings;