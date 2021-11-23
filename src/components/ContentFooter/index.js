import { memo } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import LogoFooter from '../../data/icons/wfair-logo-footer.svg';

import classNames from 'classnames';
import { LeaderboardActions } from 'store/actions/leaderboard';
import { useCallback } from 'react';
import { GeneralActions } from 'store/actions/general';
import { Link } from 'react-router-dom';
import Routes from '../../constants/Routes';

const ContentFooter = ({ className = '', disclaimerHidden, setOpenDrawer }) => {
  const openLeaderboard = useCallback(event => {
    window.scrollTo(0, 0);
    setOpenDrawer('leaderboard');
  }, []);

  return (
    <div className={styles.container}>
      <div className={classNames(styles.footer, className)}>
        <a
          href="https://wallfair.io/"
          target="_blank"
          rel="noreferrer"
          data-tracking-id="footer-wfair-logo"
        >
          <img src={LogoFooter} className={styles.footerLogo} alt={'Powered-by-Wallfair'} />
        </a>
        <div className={styles.links}>
          <Link
            data-tracking-id="footer-provablyfair"
            to={Routes.provablyfair}
          >
            <p>{'Provably Fair'}</p>
          </Link>
          <a
            href="https://wallfair.medium.com"
            target="_blank"
            rel="noreferrer"
            data-tracking-id="footer-buy-wfair"
          >
            <p>Blog</p>
          </a>
          <a
            href="https://wallfair.io/about-us#career"
            target="_blank"
            rel="noreferrer"
            data-tracking-id="footer-career"
          >
            <p>Career</p>
          </a>
          <a
            href="https://github.com/wallfair-organization"
            target="_blank"
            rel="noreferrer"
            data-tracking-id="footer-source-code"
          >
            <p>Source Code</p>
          </a>

          <Link
            data-tracking-id="footer-terms"
            to={Routes.terms}
          >
            <p>{'Terms & Conditions'}</p>
          </Link>

          <Link
            data-tracking-id="footer-kyc"
            to={Routes.kyc}
          >
            <p>{'KYC Policy'}</p>
          </Link>

          <Link
            data-tracking-id="footer-responsible-gambling"
            to={Routes.responsibleGambling}
          >
            <p>{'Responsible Gambling'}</p>
          </Link>

          <Link
            data-tracking-id="footer-privacy"
            to={Routes.privacy}
          >
            <p>Privacy Policy</p>
          </Link>

          <Link
            data-tracking-id="footer-imprint"
            to={Routes.imprint}
          >
            <p>Imprint</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    disclaimerHidden: state.general.disclaimerHidden,
    leaderboardOpen: state.leaderboard.leaderboard.openDrawer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLeaderboardDrawer: open => {
      dispatch(LeaderboardActions.handleDrawer({ open }));
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(ContentFooter);
export default memo(Connected);
