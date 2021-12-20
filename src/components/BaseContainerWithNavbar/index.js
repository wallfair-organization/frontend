import React from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ContentFooter from 'components/ContentFooter';
import HeaderVideo from 'data/videos/header-video.mp4'
import AlpacaHeader from 'data/images/alpaca-header.png';

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
         <div className={styles.headerContianer}>
            <video loop autoPlay muted playsInline id="myVideo">
                <source src={HeaderVideo} type="video/mp4" />
            </video>
            <div className={styles.gradientLayer}></div>
            <img className={styles.aplacaHeader} src={AlpacaHeader} alt="Alpaca-header"/>
          </div> 
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
