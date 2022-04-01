import classNames from 'classnames';
import styles from './styles.module.scss';
import Icon from '../Icon';
import RealMoneyOnly from 'components/RealMoneyOnly';
import PlayMoneyOnly from 'components/PlayMoneyOnly';
import Routes from 'constants/Routes';
import { useHistory } from 'react-router-dom';

const HomeSettings = ({
  loggedIn,
  profilePic,
  onWalletClick,
  onEventsClick,
  onGamesClick,
  onActivitiesClick,
  onLeaderboardClick,
  onEditClick,
  onReferralsClick,
  onEmailNotificationClick,
  onLogoutClick,
  onCloseProfile,
  // onKycInfoClick,
  onProfileClick,
  onHowItWorksClick,
}) => {

  const history = useHistory();

  return (
    <div className={styles.settings}>
      <div className={styles.settingContainer}>
        <div
          onClick={onHowItWorksClick}
          className={classNames(styles.singleSettingHolder)}
        >
          <Icon
            className={classNames(styles.referralIcon, styles.strokeIcon)}
            iconType={'question'}
          />
          <p className={styles.settingTitle}>How it works</p>
        </div>
        {loggedIn && (
          <>
            <div
              onClick={onProfileClick}
              className={classNames(styles.singleSettingHolder)}
            >
              <Icon
                className={classNames(styles.referralIcon, styles.fillIcon)}
                iconType={'userProfile'}
              />
              <p className={styles.settingTitle}>My Profile</p>
            </div>
          </>
        )}
        <div
          onClick={onEventsClick}
          className={classNames(styles.singleSettingHolder)}
        >
          <Icon
            className={classNames(styles.referralIcon, styles.fillIcon)}
            iconType={'starMenu'}
          />
          <p className={styles.settingTitle}>Events</p>
        </div>

        <RealMoneyOnly>
          <div
            onClick={onGamesClick}
            className={classNames(styles.singleSettingHolder)}
          >
            <Icon
              className={classNames(styles.referralIcon, styles.strokeIcon)}
              iconType={'game'}
            />
            <p className={styles.settingTitle}>Games</p>
          </div>
        </RealMoneyOnly>

        {loggedIn && (
          <div
            onClick={onWalletClick}
            className={classNames(styles.singleSettingHolder)}
          >
            <Icon
              className={classNames(styles.referralIcon, styles.fillIcon)}
              iconType={'wallet3'}
            />
            <p className={styles.settingTitle}>Wallet</p>
          </div>
        )}

        {loggedIn &&
          <div
            onClick={() => {history.push(Routes.bonus)}}
            className={classNames(styles.singleSettingHolder)}
          >
            <Icon
              className={classNames(styles.referralIcon, styles.fillIcon)}
              iconType={'wallet3'}
            />
            <p className={styles.settingTitle}>Bonus</p>
          </div>
        }

        <div
          onClick={onActivitiesClick}
          className={classNames(styles.singleSettingHolder)}
        >
          <Icon
            className={classNames(styles.referralIcon, styles.strokeIcon)}
            iconType={'activities'}
          />
          <p className={styles.settingTitle}>Activities</p>
        </div>

        <div
          onClick={onLeaderboardClick}
          className={classNames(styles.singleSettingHolder)}
        >
          <Icon
            className={classNames(styles.referralIcon, styles.strokeIcon)}
            iconType={'leaderboard'}
          />
          <p className={styles.settingTitle}>Leaderboard</p>
        </div>

        {loggedIn && (
          <>
            <div
              onClick={onEditClick}
              className={classNames(styles.singleSettingHolder)}
            >
              <Icon
                className={classNames(styles.referralIcon, styles.fillIcon)}
                iconType={'profile'}
              />
              <p className={styles.settingTitle}>Edit my Profile</p>
            </div>

            <div
              className={classNames(styles.singleSettingHolder)}
              onClick={() => onReferralsClick()}
            >
              <Icon
                className={classNames(styles.referralIcon, styles.fillIcon)}
                iconType={'referral'}
              />
              <p className={styles.settingTitle}>Referrals</p>
            </div>

            <a
              href={'https://staking.wallfair.io'}
              target='_blank'
              rel='noreferrer'
              className={classNames(styles.singleSettingHolder)}
            >
              <Icon
                className={classNames(styles.referralIcon, styles.fillIcon)}
                iconType={'wallet3'}
              />
              <p className={styles.settingTitle}>Staking 35% APY</p>
            </a>

            <div
              className={classNames(styles.singleSettingHolder)}
              onClick={onLogoutClick}
            >
              <Icon
                className={classNames(styles.referralIcon, styles.fillIcon)}
                iconType={'logout'}
              />
              <p className={styles.settingTitle}>Logout</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeSettings;
