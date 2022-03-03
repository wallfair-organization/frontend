import React, { useEffect, useRef, useState, useMemo } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import HomeSettings from '../HomeSettings';
import MyTrades from '../MyTrades';
import { AuthenticationActions } from 'store/actions/authentication';
import { GeneralActions } from 'store/actions/general';
import EmailNotifications from 'components/EmailNotifications';
import Preferences from 'components/Preferences';
import Referrals from 'components/Referrals';
import Textarea from 'components/Textarea';
import { LOGGED_IN } from 'constants/AuthState';
import { checkUsername } from '../../api';
import { AlertActions } from 'store/actions/alert';
import { useDispatch } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import KycStatus from 'components/KycStatus';

const MainMenu = ({
  opened,
  user,
  updateUser,
  setEditVisible,
  setOpenDrawer,
  handleMyTradesVisible,
  handleEmailNotificationsVisible,
  handlePreferencesVisible,
  handleReferralsVisible,
  editVisible,
  myTradesVisible,
  emailNotificationsVisible,
  preferencesVisible,
  referralsVisible,
  close,
  updateNotificationSettings,
  fetchReferrals,
  showPopup,
  kycInfoVisible = false,
  handleKycInfoVisible,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePicture);
  const [imageName, setImageName] = useState(null);
  const [aboutMe, setAboutMe] = useState(user.aboutMe);
  const [profileSubmitActive, setProfileSubmitActive] = useState(true);
  const [profileErrorMessage, setProfileErrorMessage] = useState();
  const { deactivate } = useWeb3React();

  const profilePictureRefName = useRef(null);

  useEffect(() => {
    if (editVisible) return;
    setProfilePic(user.profilePicture);
    setUsername(user.username);
    setName(user.name);
    setEmail(user.email);
    setAboutMe(user.aboutMe);
  }, [user, editVisible]);

  const history = useHistory();

  const onClickGoToRoute = destinationRoute => {
    history.push(destinationRoute);
  };

  const onEventsClick = () => {
    onClickGoToRoute('/events/all');
  };

  const onGamesClick = () => {
    onClickGoToRoute(Routes.games);
  };

  const onProfileClick = () => {
    onClickGoToRoute(`/user/${user.userId}`);
  }

  const onActivitiesClick = () => {
    onClickGoToRoute(Routes.activities);
  }

  const onLeaderboardClick = () => {
    setOpenDrawer('leaderboard');
  }

  const onClickShowEditProfile = () => {
    setProfilePic(user.profilePicture);
    setEditVisible(!editVisible);
  };

  const onWalletClick = name => {
    onClickGoToRoute(Routes.wallet);
  };

  const onEmailNotificationClick = () => {
    handleEmailNotificationsVisible(!emailNotificationsVisible);
  };

  const onPreferencesClick = () => {
    handlePreferencesVisible(!preferencesVisible);
  };

  const onReferralsClick = () => {
    handleReferralsVisible(!referralsVisible);
  };

  const onKycInfoClick = () => {
    handleKycInfoVisible(!kycInfoVisible);
  };

  const handleName = e => {
    setName(e.target.value);
  };

  const handleUsernameDebounceAction = useMemo(() => {
    return _.debounce(async eventValue => {
      const response = await checkUsername(eventValue).catch(err => {
        console.error('checkUsername err', err);
      });

      const isUnique = _.get(response, 'data.isUnique', false);

      if (isUnique) {
        setProfileErrorMessage('');
        setProfileSubmitActive(true);
      } else {
        setProfileErrorMessage(
          <div>
            Username <b>"{eventValue}"</b> already exists. Please use another
            name.
          </div>
        );
      }
    }, 300);
  }, []);

  const handleUsername = e => {
    if(e.target.value.length > 25) {
      dispatch(
        AlertActions.showError({
          message: 'Username can have a maximum of 25 characters.',
        })
      );
    }
    else {
      setProfileSubmitActive(false);
      setUsername(e.target.value);
      handleUsernameDebounceAction(e.target.value);
    }

  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateUser(name, username, email, imageName, aboutMe, profilePic);
    setEditVisible(false);
  };

  const handleFileUpload = async blob => {
    const base64 = await convertToBase64(blob);
    if (blob.size / 1024 / 1024 > 1) {
      const newPicture = await resizePicture(base64);
      setProfilePic(newPicture);
      setImageName(blob.name);
    } else {
      setProfilePic(base64);
      setImageName(blob.name);
    }
  }

  const handleProfilePictureUpload = async e => {
    if (!e.target.files.length) return;
    await handleFileUpload(e.target.files[0]);
  };

  const resizePicture = base64 =>
    new Promise((resolve, reject) => {
      const size = 300;
      var canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        if (img.width < img.height) {
          const width = size;
          const height = (img.height / img.width) * width;
          const top = (size - height) / 2;
          ctx.drawImage(img, 0, top, width, height);
          resolve(canvas.toDataURL());
        } else {
          const height = size;
          const width = (img.width / img.height) * height;
          const left = (size - width) / 2;
          ctx.drawImage(img, left, 0, width, height);
          resolve(canvas.toDataURL());
        }
      };
      img.onerror = error => reject(error);
      img.setAttribute('hidden', true); // works for me
      img.setAttribute('crossorigin', 'anonymous'); // put before img.src :)
      img.src = base64;
    });

  const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
  };

  const renderMyTradesDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !myTradesVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => handleMyTradesVisible(!myTradesVisible)}
          />
          My Trades
        </h2>

        <MyTrades close={close} />
      </div>
    );
  };

  const renderEmailNotificationDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !emailNotificationsVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() =>
              handleEmailNotificationsVisible(!emailNotificationsVisible)
            }
          />
          Email Notification
        </h2>
        <div className={styles.emailNotificationContent}>
          <EmailNotifications
            close={close}
            updateNotificationSettings={updateNotificationSettings}
            settings={user.notificationSettings}
          />
        </div>
      </div>
    );
  };

  const renderPreferencesDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !preferencesVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => handlePreferencesVisible(!preferencesVisible)}
          />
          Preferences
        </h2>

        <Preferences close={close} />
      </div>
    );
  };

  const renderKycInfoDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !kycInfoVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => handleKycInfoVisible(!kycInfoVisible)}
          />
          KYC Info
        </h2>
        <div className={styles.kycWrapper}>
          <KycStatus/>
        </div>
      </div>
    );
  };

  const renderReferralsDrawer = () => {
    return (
      <div
        className={classNames(
          styles.panel,
          !referralsVisible && styles.panelHidden
        )}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => handleReferralsVisible(!referralsVisible)}
          />
          Referrals
        </h2>
        <div className={styles.referralsContent}>
          <Referrals close={close} />
        </div>
      </div>
    );
  };

  const editProfileWrapper = () => {
    return (
      <div
        className={classNames(styles.panel, !editVisible && styles.panelHidden)}
      >
        <h2 className={styles.profileHeading}>
          <Icon
            className={styles.backButton}
            iconType={'arrowTopRight'}
            onClick={() => setEditVisible(!editVisible)}
          />
          Edit My Profile
        </h2>
        <div className={styles.editProfileContent}>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.profileContent}>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>
                  My username is...
                </label>
                <input
                  className={styles.profileInput}
                  value={username}
                  onChange={handleUsername}
                />
              </div>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>About me</label>
                <Textarea
                  className={classNames(styles.profileInput, styles.textarea)}
                  value={aboutMe}
                  onChange={e => setAboutMe(e.target.value)}
                  placeholder="Tell us something about yourself..."
                />
              </div>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>E-Mail</label>
                <input
                  className={styles.profileInput}
                  disabled
                  value={email}
                  onChange={handleEmail}
                />
              </div>

              {!_.isEmpty(profileErrorMessage) && (
                <div className={styles.profileErrorHandLing}>
                  {profileErrorMessage}
                </div>
              )}
              <div className={styles.submitButtonContainer}>
                <input
                  disabled={profileSubmitActive ? false : true}
                  className={styles.profileSubmit}
                  type={'submit'}
                  value={'Save changes'}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const doLogout = () => {
    deactivate();
    onClickGoToRoute(Routes.logout);
  };

  return (
    <div className={classNames(styles.menu, opened ? styles.menuOpened : null)}>
      <div
        className={classNames(
          styles.panel,
          styles.firstPanel,
          (myTradesVisible ||
            editVisible ||
            emailNotificationsVisible ||
            preferencesVisible ||
            referralsVisible) &&
            styles.panelHidden
        )}
      >
        <div className={styles.mainContent}>
          <HomeSettings
            user={user}
            loggedIn={user.authState === LOGGED_IN}
            profilePic={profilePic}
            onWalletClick={onWalletClick}
            onEventsClick={onEventsClick}
            onGamesClick={onGamesClick}
            onActivitiesClick={onActivitiesClick}
            onLeaderboardClick={onLeaderboardClick}
            onEditClick={() => onClickShowEditProfile()}
            onReferralsClick={() => onReferralsClick()}
            onEmailNotificationClick={() => onEmailNotificationClick()}
            onPreferencesClick={() => onPreferencesClick()}
            onLogoutClick={() => doLogout()}
            onCloseProfile={() => close()}
            onKycInfoClick={() => onKycInfoClick()}
            onProfileClick={onProfileClick}
          />
        </div>
      </div>
      {editVisible && editProfileWrapper()}
      {myTradesVisible && renderMyTradesDrawer()}
      {referralsVisible && renderReferralsDrawer()}
      {emailNotificationsVisible && renderEmailNotificationDrawer()}
      {preferencesVisible && renderPreferencesDrawer()}
      {kycInfoVisible && renderKycInfoDrawer()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
    editVisible: state.general.editProfileVisible,
    myTradesVisible: state.general.myTradesVisible,
    emailNotificationsVisible: state.general.emailNotificationsVisible,
    preferencesVisible: state.general.preferencesVisible,
    referralsVisible: state.general.referralsVisible,
    kycInfoVisible: state.general.kycInfoVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (name, username, email, imageName, aboutMe, profilePic) => {
      dispatch(
        AuthenticationActions.initiateUpdateUserData({
          user: { name, username, email, imageName, aboutMe, profilePic },
        })
      );
    },
    updateNotificationSettings: notificationSettings => {
      dispatch(
        AuthenticationActions.initiateUpdateUserData({
          user: { notificationSettings },
        })
      );
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
    setEditVisible: bool => {
      dispatch(GeneralActions.setEditProfileVisible(bool));
    },
    handleMyTradesVisible: bool => {
      dispatch(GeneralActions.setMyTradesVisible(bool));
    },
    handleEmailNotificationsVisible: bool => {
      dispatch(GeneralActions.setEmailNotificationsVisible(bool));
    },
    handlePreferencesVisible: bool => {
      dispatch(GeneralActions.setPreferencesVisible(bool));
    },
    handleReferralsVisible: bool => {
      dispatch(GeneralActions.setReferralsVisible(bool));
    },
    handleKycInfoVisible: bool => {
      dispatch(GeneralActions.setKycInfoVisible(bool));
    },
    fetchReferrals: () => {
      dispatch(AuthenticationActions.fetchReferrals());
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
