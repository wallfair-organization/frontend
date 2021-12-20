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
        <div className={styles.logoContainer}>
          <a
            href="https://wallfair.io/"
            target="_blank"
            rel="noreferrer"
            data-tracking-id="footer-wfair-logo"
          >
            <img src={LogoFooter} className={styles.footerLogo} alt={'Powered-by-Wallfair'} />
          </a>
          
          <iframe className={styles.license} title="license" src="https://licensing.gaming-curacao.com/validator/?lh=58e4868441e3bb0ff2fe2230d82a8091&amp;template=seal" width={125} height={50} style={{border:'none'}} />
        </div>
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
            href="https://wallfair.io/career"
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

          <div id="lang-switcher" />
        </div>
      </div>
      <p className={styles.footerDisclaimer}>
        This website offers gaming with risk experience. To be a user of our site you must be over 18 y.o. We are not responsible for the violation of your local laws related to i-gaming. Play responsibly and have fun on Alpacasino.
        <br/ >
        The platform providing the services is owned by Wallfair N.V, a limited liability company registered in Curacao with company registration number 159041, with its registered office at Zuikertuintjeweg Z/N (Zuikertuin Tower), Curacao (“Company”), licensed in Curaçao under the Licence no. 365/JAZ Sub-License GLH-OCCHKTW0712022021  issued by Gaming Services Provider N.V. for the provision of online games of chance.</p>
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
