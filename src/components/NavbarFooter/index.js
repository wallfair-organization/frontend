import styles from './styles.module.scss';
import classNames from 'classnames';
import { matchPath } from 'react-router-dom';
import { connect } from 'react-redux';

const NavbarFooter = ({
  children,
  location,
  className = null,
  skipRoutes = [],
  hideVisibility = false,
}) => {
  if (skipRoutes.some(route => matchPath(location.pathname, route))) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.navbarFooter,
        { [styles.hideVisibility]: hideVisibility },
        className
      )}
    >
      {children}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    location: state.router.location,
  };
};

export default connect(mapStateToProps)(NavbarFooter);
