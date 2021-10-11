import IconTheme from '../Icon/IconTheme';
import Icon from '../Icon';
import { NavLink } from 'react-router-dom';
import style from './styles.module.scss';
import classNames from 'classnames';

const NavbarFooterAction = ({
  route,
  text,
  iconType,
  className = null,
  onClick = null,
  trackingId,
}) => {
  const renderNavbarLink = () => {
    return (
      <NavLink
        exact={route === '/'}
        to={route}
        className={classNames(style.navbarItem, className)}
        activeClassName={style.navbarItemActive}
        data-tracking-id={trackingId}
      >
        <div className={style.navbarLink}>
          <Icon iconType={iconType} iconTheme={IconTheme.black} />
          {text}
        </div>
      </NavLink>
    );
  };

  const renderNavbarAction = () => {
    return (
      <div
        className={classNames(
          style.navbarItem,
          style.navbarItemAction,
          className
        )}
        onClick={onClick}
        data-tracking-id={trackingId}
      >
        <div className={style.navbarLink}>
          <Icon iconType={iconType} iconTheme={IconTheme.black} />
          {text}
        </div>
      </div>
    );
  };

  const isEventAction = () => {
    return onClick != null && !route;
  };

  return <>{isEventAction() ? renderNavbarAction() : renderNavbarLink()}</>;
};

export default NavbarFooterAction;
