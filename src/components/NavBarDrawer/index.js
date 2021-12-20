import { memo } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import navbarStyle from '../Navbar/styles.module.scss';

const NavBarDrawer = ({
  visible,
  onClose,
  children
}) => {

  const closeDrawer = () => {
    onClose();
  };

  return (
    <div
      className={classNames(
        styles.navBarDrawer,
        styles.drawer,
        !visible && styles.drawerHidden
      )}
    >
      <div className={classNames(navbarStyle.drawerContent)}>
        {children}
        <Icon
          iconType={'cross'}
          onClick={closeDrawer}
          className={styles.closeButton}
        />
      </div>
      <div className={navbarStyle.drawerBackdropBg}></div>
    </div>
  );
};


const Connected = connect(null)(NavBarDrawer);
export default memo(Connected);
