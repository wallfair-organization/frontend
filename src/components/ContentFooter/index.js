import { connect } from 'react-redux';
import styles from './styles.module.scss';
import LogoDemo from '../../data/images/logo-demo.svg';
import GitHubLogo from '../../data/icons/github.svg';
import FairTradeIcon from '../../data/icons/fair-trade.svg';
import BlockchainIcon from '../../data/icons/blockchain.svg';
import NoMiddleMan from '../../data/icons/no-middle-man.svg';
import OpenSourceIcon from '../../data/icons/open-source.svg';

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import SocialIcons from 'components/SocialIcons';
import { LeaderboardActions } from 'store/actions/leaderboard';
import { useCallback } from 'react';
import { GeneralActions } from 'store/actions/general';
import Routes from 'constants/Routes';

const ContentFooter = ({ className = '', disclaimerHidden, setOpenDrawer }) => {
  const openLeaderboard = useCallback(event => {
    window.scrollTo(0, 0);
    setOpenDrawer('leaderboard');
  }, []);

  return (
    <div className={styles.container}>
      <div className={classNames(styles.footer, className)}>
        <img src={LogoDemo} width={150} alt={'Wallfair'} />

        <div className={styles.links}>
          <div className={styles.column}>
            <div className={styles.firstRow}>
              <a
                href="https://wallfair.gitbook.io/wallfair/"
                target="_blank"
                rel="noreferrer"
              >
                Documentation
              </a>

              <Link to={Routes.blog}>Blog</Link>

              <button onClick={openLeaderboard} href="#">
                Leaderboard
              </button>

              <a
                href="https://wallfair.io/career"
                target="_blank"
                rel="noreferrer"
              >
                Career
              </a>
            </div>

            <div className={styles.firstRow}>
              <a
                href="https://app.uniswap.org/#/swap?inputCurrency=ETH&amp;outputCurrency=0xc6065b9fc8171ad3d29bad510709249681758972&amp;exactAmount=1"
                target="_blank"
                rel="noreferrer"
                data-tracking-id="footer-buy-wfair"
              >
                Buy WFAIR real tokens
              </a>

              <a
                href="https://github.com/wallfair-organization"
                target="_blank"
                rel="noreferrer"
              >
                <img src={GitHubLogo} width={18} alt={'Github Logo'} />
                Source Code
              </a>
            </div>

            <div className={styles.secondRow}>
              <Link to={'/privacy-policy'}>Imprint</Link>

              <Link to={'/terms-and-conditions'}>{'Terms & Conditions'}</Link>
            </div>
          </div>
        </div>

        <SocialIcons className={styles.socialIcons} />
      </div>

      <div className={classNames(styles.iconsContainer, className)}>
        <div className={styles.icon}>
          <img src={FairTradeIcon} alt="Fair trade icon" />
          <span>100% fair</span>
        </div>
        <div className={styles.icon}>
          <img src={OpenSourceIcon} alt="Open source icon" />
          <span>Open source</span>
        </div>
        <div className={styles.icon}>
          <img src={BlockchainIcon} alt="Blockchain icon" />
          <span>Blockchain</span>
        </div>
        <div className={styles.icon}>
          <img src={NoMiddleMan} alt="No middle man icon" />
          <span>No middle man</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentFooter);
