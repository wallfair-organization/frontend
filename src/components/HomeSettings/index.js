import classNames from 'classnames';
import styles from './styles.module.scss';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import DefaultProfilePicture from 'data/images/logo.png';
import SettingNotification from 'data/images/setting-notifications.png';
import IconTheme from '../Icon/IconTheme';

const HomeSettings = ({
  onEditClick,
  onReferralsClick,
  onEmailNotificationClick,
  onLogoutClick,
  onCloseProfile,
}) => {
  return (
    <div className={styles.settings}>
      <div className={styles.settingContainer}>
        <div
          onClick={onEditClick}
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
        >
          <img
            src={DefaultProfilePicture}
            alt="profile_picture"
            className={styles.profilePicture}
          />
          <p className={styles.settingTitle}>Edit my Profile</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
          onClick={() => onReferralsClick()}
        >
          <Icon className={styles.referralIcon} iconType={'chat'} />
          <p className={styles.settingTitle}>Referrals</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
          onClick={onEmailNotificationClick}
        >
          <img
            src={SettingNotification}
            alt="notifications"
            className={styles.settingIcon}
            style={{ width: '22px', marginLeft: '4px' }}
          />
          <p className={styles.settingTitle}>Email Notifications</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div
          className={classNames(
            styles.singleSettingHolder,
            styles.settingActive
          )}
          onClick={onLogoutClick}
        >
          <Icon
            width={15}
            iconType={IconType.logout}
            className={classNames(styles.settingIcon)}
            style={{ width: '22px', marginLeft: '4px' }}
          />
          <p className={styles.settingTitle}>Logout</p>
          <Icon
            width={15}
            iconType={IconType.arrowSmallRight}
            className={styles.goIntoSettingIcon}
          />
        </div>
        <div className={styles.closeProfileContainer} onClick={onCloseProfile}>
          <Icon
            iconTheme={IconTheme.white}
            iconType={IconType.cross}
            className={styles.closeProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSettings;
