import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ContentFooter from 'components/ContentFooter';

const BaseContainerWithNavbar = ({
  children,
  withPaddingTop,
  contentPadding,
  withoutPaddingBottom,
  loggedIn,
  home = false,
  user,
}) => {
  return (
    <>
    <div
      className={classNames(
        styles.baseContainer,
        withPaddingTop ? styles.baseContainerWithPaddingTop : null,
        contentPadding ? styles.baseContainerWithContentPadding : null,
        withoutPaddingBottom ? styles.baseContainerWithPaddingBottomZero : null
      )}
    >
      <div className={classNames(styles.headerBackground, loggedIn || !home ? styles.withTransparent : null)}>
        <div className={styles.gradientLayer}></div>
      </div>
      {children}      
    </div>
    <ContentFooter className={styles.betFooter} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
  };
};

export default connect(mapStateToProps, null)(BaseContainerWithNavbar);
