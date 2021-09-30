import { connect } from 'react-redux';
import styles from './styles.module.scss';
import LogoDemo from '../../data/images/logo-demo.svg';
import GitHubLogo from '../../data/icons/github.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Disclaimer from 'components/Disclaimer';
import { GeneralActions } from 'store/actions/general';

const ContentFooter = ({ className = '', disclaimerHidden }) => {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.footer, className)}>
        <img src={LogoDemo} width={150} alt={'Wallfair'} />
        <div className={styles.links}>
          <span>Copyright 2021 Wallfair</span>
          <Link to={'/'}>Documentation</Link>
          <Link to={'/privacy-policy'}>Imprint</Link>
          <Link to={'/terms-and-conditions'}>{'Terms & Conditions'}</Link>
          <a
            href="https://github.com/wallfair-organization"
            target="_blank"
            rel="noreferrer"
          >
            <img src={GitHubLogo} width={20} alt={'Github Logo'} />
            Source Code
          </a>
        </div>

        <div className={styles.linksMobile}>
          <div className={styles.firstRow}>
            <span>Copyright 2021 Wallfair</span>
            <Link to={'/privacy-policy'}>Imprint</Link>
            <Link to={'/terms-and-conditions'}>{'Terms & Conditions'}</Link>
          </div>
          <div className={styles.secondRow}>
            <a href="https://www.gitbook.com/" target="_blank" rel="noreferrer">
              Documentation
            </a>
            <a
              href="https://github.com/wallfair-organization"
              target="_blank"
              rel="noreferrer"
            >
              <img src={GitHubLogo} width={25} alt={'Github Logo'} />
            </a>
          </div>
        </div>
      </div>
      {!disclaimerHidden && <Disclaimer />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    disclaimerHidden: state.general.disclaimerHidden,
  };
};

export default connect(mapStateToProps)(ContentFooter);
