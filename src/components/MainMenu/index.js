import React, { useEffect, useRef, useState, useMemo } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import HomeSettings from '../HomeSettings';
import MyTrades from '../MyTrades';
import { AuthenticationActions } from 'store/actions/authentication';
import { GeneralActions } from 'store/actions/general';
import EmailNotifications from 'components/EmailNotifications';
import Preferences from 'components/Preferences';
import Referrals from 'components/Referrals';
import Textarea from 'components/Textarea';
import { Link } from 'react-router-dom';
import { checkUsername } from '../../api';

const MainMenu = ({
  opened,
  user,
  updateUser,
  setEditVisible,
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
}) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePicture);
  const [imageName, setImageName] = useState(null);
  const [aboutMe, setAboutMe] = useState(user.aboutMe);
  const [profileSubmitActive, setProfileSubmitActive] = useState(true);
  const [profileErrorMessage, setProfileErrorMessage] = useState();

  const profilePictureRefName = useRef(null);

  useEffect(() => {
    if (editVisible) return;
    setProfilePic(user.profilePicture);
    setUsername(user.username);
    setName(user.name);
    setEmail(user.email);
    setAboutMe(user.aboutMe);
  }, [user, editVisible]);

  const clickUploadProfilePicture = () => {
    profilePictureRefName.current?.click();
  };

  const history = useHistory();

  const onClickGoToRoute = destinationRoute => {
    history.push(destinationRoute);
  };

  const onClickShowEditProfile = () => {
    setProfilePic(user.profilePicture);
    setEditVisible(!editVisible);
  };

  const onMyWalletClick = name => {
    // fetchOpenBets();
    // fetchTransactions();
    // setOpenDrawer(name);
    // handleMyTradesVisible(!myTradesVisible);
    fetchReferrals();
    // setOpenMenu(menus.referrals);
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
    setProfileSubmitActive(false);
    setUsername(e.target.value);

    //debounce 300ms, to avoid unnecessary multiple calls
    handleUsernameDebounceAction(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateUser(name, username, email, imageName, aboutMe, profilePic);
    setEditVisible(false);
  };

  const handleProfilePictureUpload = async e => {
    if (!e.target.files.length) return;
    const base64 = await convertToBase64(e.target.files[0]);
    if (e.target.files[0].size / 1024 / 1024 > 1) {
      const newPicture = await resizePicture(base64);
      setProfilePic(newPicture);
      setImageName(e.target.files[0].name);
    } else {
      setProfilePic(base64);
      setImageName(e.target.files[0].name);
    }
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
          <div className={styles.profilePictureWrapper}>
            <div className={styles.profilePicture}>
              <div
                className={styles.profilePictureUpload}
                onClick={clickUploadProfilePicture}
              >
                {!profilePic ? (
                  <div className={styles.iconContainer}>
                    <Icon
                      className={styles.uploadIcon}
                      iconTheme={IconTheme.white}
                      iconType={IconType.avatarUpload}
                    />
                  </div>
                ) : (
                  <img
                    src={profilePic}
                    className={styles.profileImage}
                    alt="profile pic"
                  />
                )}
                <input
                  ref={profilePictureRefName}
                  type={'file'}
                  accept={'image/*'}
                  style={{ display: 'none' }}
                  onChange={handleProfilePictureUpload}
                />
              </div>
              <p className={styles.profilePictureUploadLabel}>Your avatar</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.profileContent}>
              <div className={styles.profileInputGroup}>
                <label className={styles.profileInputLabel}>
                  My full name is...
                </label>
                <input
                  className={styles.profileInput}
                  value={name}
                  onChange={handleName}
                />
              </div>
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
              <input
                disabled={profileSubmitActive ? false : true}
                className={styles.profileSubmit}
                type={'submit'}
                value={'Save changes'}
              />
            </div>
          </form>
        </div>
      </div>
    );
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
        <h2 className={styles.profileHeading}>
          <Link to={Routes.user.replace(':userId', user.userId)}>
            My Profile
          </Link>
        </h2>
        <div className={styles.mainContent}>
          <HomeSettings
            onEditClick={() => onClickShowEditProfile()}
            onReferralsClick={() => onReferralsClick()}
            onEmailNotificationClick={() => onEmailNotificationClick()}
            onPreferencesClick={() => onPreferencesClick()}
            onLogoutClick={() => onClickGoToRoute(Routes.logout)}
            onCloseProfile={() => close()}
          />
        </div>
      </div>
      {editVisible && editProfileWrapper()}
      {myTradesVisible && renderMyTradesDrawer()}
      {referralsVisible && renderReferralsDrawer()}
      {emailNotificationsVisible && renderEmailNotificationDrawer()}
      {preferencesVisible && renderPreferencesDrawer()}
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
    fetchReferrals: () => {
      dispatch(AuthenticationActions.fetchReferrals());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
