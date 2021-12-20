import _ from 'lodash';
import classNames from 'classnames';
import CoinIcon from '../../data/icons/coin.png';
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
import Wallet from '../Wallet';
import { NavLink, useHistory } from 'react-router-dom';
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
import TimeLeftCounter from '../TimeLeftCounter';
import { UserMessageRoomId } from '../../store/actions/websockets';
import { ChatActions } from 'store/actions/chat';
import IconHeaderLogo from '../../data/images/alpaca-logo.svg';

import moment from 'moment';
import Link from 'components/Link';
import { OnboardingActions } from 'store/actions/onboarding';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';


const Navbar = ({
  user,
  setUnread,
  authState,
  location,
  handleLeaderboardDrawer,
  leaderboardOpen,
  skipRoutes = [],
  setOpenDrawer,
  setEditProfileVisible,
  showPopup,
  userMessages,
  setMessageRead,
  startOnboardingFlow,
}) => {
  const [leaderboardWeeklyDate, setLeaderboardWeeklyDate] = useState(
    new Date()
  );
  const [missingWinnerAmount, setMisingWinnerAmount] = useState(null);
  const openDrawer = useSelector(state => state.general.openDrawer);

  const drawerWrapper = useOutsideClick(() => {
    closeDrawers();
  });

  const { balance, currency, toNextRank } = useSelector(selectUser);

  const history = useHistory();

  useEffect(() => {
    let nextSunday = moment().day(7).startOf('day').toDate();
    setLeaderboardWeeklyDate(nextSunday);
  }, []);

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

  const handleLeaderboard = () => {
    toggleOpenDrawer(drawers.leaderboard);
  }

  const getProfileStyle = () => {
    const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));

    return {
      backgroundImage: 'url("' + profilePicture + '")',
    };
  };

  const renderNavbarLink = (route, text, isLogo = false, trackingId) => {
    return (
      <NavLink
        data-tracking-id={trackingId}
        to={route}
        activeClassName={isLogo ? null : style.active}
        className={isLogo ? style.logoLink : null}
      >
        {text}
      </NavLink>
    );
  };

  const hasOpenDrawer = !isOpen('');

  const showPopupForRegister = () => {
    if (!isLoggedIn()) {
      startOnboardingFlow();
    }
  }
  const showPopupForLogin = () => {
    if (!isLoggedIn()) {
      showPopup(PopupTheme.auth, { small: true, authenticationType:AuthenticationType.login });
    }
  }

  const showAlphaPlatformPopup = () => {
    showPopup(PopupTheme.alphaPlatform);
  };

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const renderWalletButton = () => {
    const walletBtn = (
      <span
        className={classNames(
          style.balanceOverview,
          style.walletButton,
          style.leaderboardValues,
          isOpen(drawers.wallet) ? style.pillButtonActive : null
        )}
        data-tracking-id="menu-wallet-icon"
        onClick={() => history.push(Routes.wallet)}
      >
        <img src={CoinIcon} alt="medal" className={style.medal} />
        <p>{formatToFixed(balance, 0, true)} {currency}</p>
        <span 
          className={style.plusButton}>+</span>
      </span>
    );
    return (
      <div className={style.centerContainer}>
        {isLoggedIn() && walletBtn}
      </div>
    )
  }
  const renderNavButtons = () => {
    const leaderboardBtn = (
      <span
        className={classNames(style.ranking, style.pillButton, style.hiddenMobile)}
        onClick={() => toggleOpenDrawer(drawers.leaderboard)}
        data-tracking-id="menu-leaderboard"
      >
        <img src={CoinIcon} alt="medal" className={style.medal} />
        <p className={style.rankingText}>
          {isLoggedIn() ? `# ${user.rank}` : 'Leaderboard'}
        </p>
      </span>
    );

    const notificationsBtn = (
      <div
        className={style.notificationOverview}
        onClick={() => toggleOpenDrawer(drawers.notifications)}
      >
        <Icon iconType={IconType.bell} className={style.notificationIcon} />
        {userMessages?.total > 0 && (
          <div className={style.notificationNew}>
            <p className={style.notificationNewText}>{userMessages.total}</p>
          </div>
        )}
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

    const hamburgerMenuBtn = (
      <div
        role="button"
        className={classNames(
          style.menuContainer
        )}
        onClick={() => toggleOpenDrawer(drawers.profile)}
      >
        <Icon
          className={style.menu}
          iconType={isOpen(drawers.profile) || isOpen(drawers.leaderboard) ? 'close' : 'hamburgerMenu'}
        />
      </div>
    );

    const joinBtn = (
      <div className={style.navbarItems}>
        <Button
          className={style.loginButton}
          theme={ButtonTheme.loginButton}
          onClick={() => showPopupForLogin()}
        >
          Login
        </Button>
      </div>
    );

    if (isLoggedIn()) {
      return (
        <div className={style.navbarItems}>
          {/* {leaderboardBtn} */}
          {/* {notificationsBtn} */}
          {/* {profileBtn} */}
          {hamburgerMenuBtn}
        </div>
      );
    } else {
      return (
        <div className={style.navbarItems}>
          {joinBtn}
          {hamburgerMenuBtn}
        </div>
      );
    }
  };

  const renderLeaderboardInfo = (text, number) => {
    return (
      <div className={style.leaderboardInfoItem}>
        <div className={style.leaderboardInfoItemText}>{text}</div>
        <div className={style.leaderboardInfoItemNumber}>
          {formatToFixed(number, 0, true)}
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
        <div className={classNames(style.drawerContent)}>
          <div className={style.leaderboardHeadingWrapper}>
            <Icon
              iconType={'leaderboard'}
              className={style.leaderboardIcon}
            />
            <p className={style.leaderboardHeading}>
              Community
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
        <div className={style.drawerBackdropBg}></div>
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
        <div className={classNames(style.drawerContent)}>
          {userMessages && (
            <Notifications
              notifications={userMessages.messages}
              total={userMessages.total}
              closeNotifications={closeDrawers}
              setUnread={setMessageRead}
            />
          )}
        </div>
        <div className={style.drawerBackdropBg}></div>
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
          <div className={style.logoContainer}>
            <img
              src={IconHeaderLogo}
              alt="Header Logo"
              className={style.logoImg}
            />
            <span className={style.logoText}>
              Alpacasino
            </span>
          </div>,          
          true
        )}
      </div>
      {renderWalletButton()}
      <div ref={drawerWrapper} className={style.drawerWrapper}>
        {renderNavButtons()}
        {renderLeaderboardDrawer()}
        {renderMenuDrawer()}
        {isLoggedIn() && (
          <>
            {renderNotificationsDrawer()}
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
    userMessages: state.chat?.messagesByRoom[UserMessageRoomId],
    user: state.authentication,
    location: state.router.location,
    leaderboardOpen: state.leaderboard.leaderboard.openDrawer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMessageRead: message => {
      dispatch(
        ChatActions.setMessageRead({
          messageId: message._id,
          roomId: message.roomId,
        })
      );
    },
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
    startOnboardingFlow: () =>{
      dispatch(OnboardingActions.start());
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
