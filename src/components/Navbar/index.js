import _ from 'lodash';
import classNames from 'classnames';
import medalGold from '../../data/icons/medal-gold.png';
import LogoDemo from '../../data/images/logo-demo.svg';
import style from './styles.module.scss';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import Routes from '../../constants/Routes';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import { useEffect, useState } from 'react';
import MainMenu from '../MainMenu';
import Leaderboard from '../Leaderboard';
import Notifications from '../Notifications';
import { connect } from 'react-redux';
import { NotificationActions } from 'store/actions/notification';
import { LOGGED_IN } from 'constants/AuthState';
import Button from '../Button';
import Wallet from '../Wallet';
import { NavLink } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { LeaderboardActions } from '../../store/actions/leaderboard';
import { GeneralActions } from '../../store/actions/general';
import { useSelector } from 'react-redux';
import PopupTheme from '../Popup/PopupTheme';
import { PopupActions } from '../../store/actions/popup';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { selectUser } from 'store/selectors/authentication';
import { formatToFixed } from 'helper/FormatNumbers';
import AuthenticationType from '../Authentication/AuthenticationType';

const Navbar = ({
  user,
  notifications,
  setUnread,
  authState,
  location,
  handleLeaderboardDrawer,
  leaderboardOpen,
  skipRoutes = [],
  setOpenDrawer,
  setEditProfileVisible,
  showPopup,
}) => {
  const [missingWinnerAmount, setMisingWinnerAmount] = useState(null);
  const openDrawer = useSelector(state => state.general.openDrawer);

  const drawerWrapper = useOutsideClick(() => {
    closeDrawers();
  });

  const { balance, currency, toNextRank } = useSelector(selectUser);

  useEffect(() => {
    if (leaderboardOpen) {
      setOpenDrawer(drawers.leaderboard);
    }
  }, [leaderboardOpen]);

  useEffect(() => {
    if (openDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openDrawer]);

  useEffect(() => {
    closeDrawers();
  }, [location.pathname]);

  if (skipRoutes.some(route => matchPath(location.pathname, route))) {
    return null;
  }

  const drawers = {
    notifications: 'notifications',
    leaderboard: 'leaderboard',
    profile: 'profile',
    wallet: 'wallet',
    emailNotifications: 'emailNotifications',
  };

  const unreadNotifications = notifications.filter(
    notification => !notification.read
  ).length;

  const toggleOpenDrawer = drawerName => {
    if (!drawers.hasOwnProperty(drawerName)) {
      return;
    }
    const isDrawerOpen = openDrawer === drawerName;
    setOpenDrawer(isDrawerOpen ? '' : drawerName);
    if (!isDrawerOpen) {
      setEditProfileVisible(false);
    }
    if (drawerName === drawers.leaderboard && isDrawerOpen) {
      handleLeaderboardDrawer(false);
    }
  };

  const isOpen = drawerName => openDrawer === drawerName;

  const closeDrawers = () => {
    setOpenDrawer('');
    setEditProfileVisible(false);
  };

  const getProfileStyle = () => {
    const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));

    return {
      backgroundImage: 'url("' + profilePicture + '")',
    };
  };

  const renderNavbarLink = (route, text, isLogo = false) => {
    return (
      <NavLink
        to={route}
        activeClassName={isLogo ? null : style.active}
        className={isLogo ? style.logoLink : null}
      >
        {text}
      </NavLink>
    );
  };

  const hasOpenDrawer = !isOpen('');

  const showPopupForUnauthenticated = authenticationType => {
    if (!isLoggedIn()) {
      showPopup(PopupTheme.auth, { small: true, authenticationType });
    }
  };

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const renderNavButtons = () => {
    const leaderboardBtn = (
      <div
        className={classNames(
          style.ranking,
          style.pillButton,
          !isLoggedIn() ? style.hiddenMobile : null,
          isOpen(drawers.leaderboard) ? style.pillButtonActive : null
        )}
        onClick={() => toggleOpenDrawer(drawers.leaderboard)}
      >
        <img src={medalGold} alt="medal" className={style.medal} />
        <p className={style.rankingText}>
          {isLoggedIn() ? `# ${user.rank}` : 'Leaderboard'}
        </p>
      </div>
    );

    const notificationsBtn = (
      <div
        className={style.notificationOverview}
        onClick={() => toggleOpenDrawer(drawers.notifications)}
      >
        <Icon iconType={IconType.bell} className={style.notificationIcon} />
        {unreadNotifications > 0 && (
          <div className={style.notificationNew}>
            <p className={style.notificationNewText}>{unreadNotifications}</p>
          </div>
        )}
      </div>
    );

    const walletBtn = (
      <div
        className={classNames(
          style.balanceOverview,
          style.pillButton,
          isOpen(drawers.wallet) ? style.pillButtonActive : null
        )}
        onClick={() => toggleOpenDrawer(drawers.wallet)}
      >
        <Icon iconType={'wallet'} />
        {formatToFixed(balance, 0)} {currency}
      </div>
    );

    const profileBtn = (
      <div
        role="button"
        className={classNames(
          style.profileContainer,
          isOpen(drawers.profile) && style.menuOpened
        )}
        onClick={() => toggleOpenDrawer(drawers.profile)}
      >
        <div
          role="img"
          className={style.profile}
          style={getProfileStyle()}
        ></div>
        <Icon
          className={style.downCaret}
          iconType={'arrowDown'}
          iconTheme={'white'}
        />
      </div>
    );

    const joinBtn = (
      <div className={style.navbarItems}>
        <Button
          className={style.loginButton}
          withoutBackground={true}
          onClick={() => showPopupForUnauthenticated(AuthenticationType.login)}
        >
          Login
        </Button>
        <Button
          className={style.signUpButton}
          withoutBackground={true}
          onClick={() =>
            showPopupForUnauthenticated(AuthenticationType.register)
          }
        >
          Sign Up
        </Button>
      </div>
    );

    if (isLoggedIn()) {
      return (
        <div className={style.navbarItems}>
          {leaderboardBtn}
          {walletBtn}
          {/* {notificationsBtn} */}
          {profileBtn}
        </div>
      );
    } else {
      return (
        <div className={style.navbarItems}>
          {leaderboardBtn}
          {joinBtn}
        </div>
      );
    }
  };

  const renderLeaderboardInfo = (text, number) => {
    return (
      <div className={style.leaderboardInfoItem}>
        <div className={style.leaderboardInfoItemText}>{text}</div>
        <div className={style.leaderboardInfoItemNumber}>
          {formatToFixed(number)}
          <span className={style.leaderboardInfoItemToken}> {currency}</span>
        </div>
      </div>
    );
  };

  const renderLeaderboardDrawer = () => {
    return (
      <div
        className={classNames(
          style.leaderboard,
          style.drawer,
          !isOpen(drawers.leaderboard || leaderboardOpen) && style.drawerHidden
        )}
      >
        <Icon
          iconType={'cross'}
          onClick={closeDrawers}
          className={style.closeLeaderboard}
        />
        <div className={style.leaderboardHeadingWrapper}>
          <p className={style.leaderboardHeading}>
            Community
            <br />
            Leaderboard
          </p>
          {isLoggedIn() && (
            <div className={style.leaderboardHeadingRank}>
              <div className={style.leaderboardHeadingRankText}>MY RANK</div>
              <div className={style.leaderboardHeadingRankValue}>
                #{user.rank}
              </div>
            </div>
          )}
        </div>
        {isLoggedIn() && (
          <div className={style.leaderboardInfo}>
            {renderLeaderboardInfo('MISSING TO WINNER', missingWinnerAmount)}
            {renderLeaderboardInfo('MISSING TO NEXT RANK', toNextRank)}
          </div>
        )}
        <Leaderboard
          fetch={openDrawer === drawers.leaderboard}
          setMissingAmount={setMisingWinnerAmount}
        />
      </div>
    );
  };

  const renderNotificationsDrawer = () => {
    return (
      <div
        className={classNames(
          style.drawer,
          !isOpen(drawers.notifications) && style.drawerHidden
        )}
      >
        <Notifications
          notifications={notifications}
          unreadNotifications={unreadNotifications}
          closeNotifications={closeDrawers}
          setUnread={setUnread}
        />
      </div>
    );
  };

  const renderMenuDrawer = () => {
    return (
      <MainMenu
        opened={isOpen(drawers.profile)}
        closeMobileMenu={closeDrawers}
        close={closeDrawers}
      />
    );
  };

  const renderWalletDrawer = () => {
    return <Wallet show={isOpen(drawers.wallet)} close={closeDrawers} />;
  };

  const renderEmailNotificationDrawer = () => {
    return (
      <MainMenu
        opened={isOpen(drawers.profile)}
        closeMobileMenu={closeDrawers}
        close={closeDrawers}
      />
    );
  };

  return (
    <div
      className={classNames(style.navbar, hasOpenDrawer && style.navbarSticky)}
    >
      <div className={style.logoMobileWrapper}>
        {renderNavbarLink(
          Routes.home,
          <Icon iconType={IconType.logoSmall} className={style.logoMobile} />,
          true
        )}
      </div>
      <div className={classNames(style.navbarItems, style.hideOnMobile)}>
        {renderNavbarLink(
          Routes.home,
          <img src={LogoDemo} width={200} alt={'Wallfair'} />,
          true
        )}

        <div className={style.linkWrapper}>
          {renderNavbarLink(`/live-events/all`, 'Live Events')}
          {renderNavbarLink(`/events`, 'Events')}
          {renderNavbarLink(`/games`, 'Games')}
          {/* {isLoggedIn() && renderNavbarLink(`/rewards`, 'Earn')} */}
        </div>
      </div>

      <div ref={drawerWrapper} className={style.drawerWrapper}>
        {renderNavButtons()}
        {renderLeaderboardDrawer()}
        {isLoggedIn() && (
          <>
            {renderNotificationsDrawer()}
            {renderMenuDrawer()}
            {renderWalletDrawer()}
            {renderEmailNotificationDrawer()}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    notifications: state.notification.notifications,
    user: state.authentication,
    location: state.router.location,
    leaderboardOpen: state.leaderboard.leaderboard.openDrawer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUnread: notification => {
      dispatch(NotificationActions.setUnread({ notification }));
    },
    handleLeaderboardDrawer: open => {
      dispatch(LeaderboardActions.handleDrawer({ open }));
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
    setEditProfileVisible: bool => {
      dispatch(GeneralActions.setEditProfileVisible(bool));
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
