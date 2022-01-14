import { memo } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import WfairTokenEmblem from '../../data/images/token/wfair_token_emblem.png';
import LogoFooter from '../../data/icons/wfair-logo-footer.svg';
import SmartsoftLogo from '../../data/icons/footer/smartsoft.png';
import EvoplayLogo from '../../data/icons/footer/evoplay.png';
import bitcoinLogo from '../../data/icons/footer/bitcoin_logo.png';
import ethereumLogo from '../../data/icons/footer/ethereum_logo.png';
import litecoinLogo from '../../data/icons/footer/litecoin_logo.png';
import moonPayLogo from '../../data/icons/footer/moon-pay-logo.png';
import cryptoPay from '../../data/icons/footer/crypto-pay-logo.png';
import handshakeIcon from '../../data/icons/footer/handshake-icon.png';
import fair100Icon from '../../data/icons/footer/100-fair-icon.png';
import responsibleGamingIcon from '../../data/icons/footer/responsible-gaming-icon.png';
import adultPlusIcon from '../../data/icons/footer/18-icon.png';
import trustPilotIcon from '../../data/icons/footer/trust_pilot_icon.png';


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
        {/*<div className={styles.footerSeparator}></div>*/}
        <div className={styles.splittedBlock}>
          <div className={styles.links}>
            <div className={styles.linksGroup}>
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
            </div>

            <div className={styles.linksGroup}>
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
            </div>

            <div className={styles.linksGroup}>
              <Link
                data-tracking-id="footer-imprint"
                to={Routes.imprint}
              >
                <p>Imprint</p>
              </Link>

              <div id="lang-switcher" />
            </div>
          </div>

          <div className={styles.trustPilotBlock}>
            <div>
              <a href="https://www.trustpilot.com/review/alpacasino.io" target="_blank" rel="noopener"><img src={trustPilotIcon} className={styles.trustPilotIcon}/></a>
            </div>

            <div className={"trustpilot-widget"} data-locale="en-US" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="61dc05ba2525917592e9d274" data-style-height="24px" data-style-width="100%" data-theme="dark" data-min-review-count="10">
              <a href="https://www.trustpilot.com/review/alpacasino.io" target="_blank" rel="noopener">Trustpilot</a>
            </div>
          </div>

        </div>



        <div className={styles.logosBlock}>
          <div className={styles.logosSeparator}></div>


          <div className={styles.splittedBlock}>
            <div className={styles.logoContainer}>
              <a
                href="https://wallfair.io/"
                target="_blank"
                rel="noreferrer"
                className={styles.wfairTokenEmblem}
              >
                <img src={WfairTokenEmblem} className={styles.footerLogo} alt={'WFAIR Token emblem'} /> WFAIR
              </a>

              <a
                href="https://wallfair.io/"
                target="_blank"
                rel="noreferrer"
                className={styles.cryptoTokenIcon}
              >
                <img src={bitcoinLogo}  alt={'Bitcoin logo'} />
              </a>

              <a
                href="https://wallfair.io/"
                target="_blank"
                rel="noreferrer"
                className={styles.cryptoTokenIcon}
              >
                <img src={ethereumLogo} alt={'Ethereum loco'} />
              </a>
              <a
                href="https://wallfair.io/"
                target="_blank"
                rel="noreferrer"
                className={styles.cryptoTokenIcon}
              >
                <img src={litecoinLogo} alt={'Litecoin loco'} />
              </a>
            </div>
            <div className={styles.logoContainer}>
              <a
                href="https://www.moonpay.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.cryptoTokenIcon}
              >
                <img src={moonPayLogo} className={styles.moonpayLogo} alt={'MoonPay logo'} />
              </a>

              <a
                href="https://cryptopay.me/"
                target="_blank"
                rel="noreferrer"
                className={styles.cryptoTokenIcon}
              >
                <img src={cryptoPay} className={styles.cryptoPayLogo} alt={'CryptoPay logo'} />
              </a>
            </div>
          </div>


          <div className={styles.logosSeparator}></div>

          <div className={styles.splittedBlock}>
            <div className={styles.logoContainer}>
              <iframe className={styles.license} title="license" src="https://licensing.gaming-curacao.com/validator/?lh=58e4868441e3bb0ff2fe2230d82a8091&amp;template=seal" width={125} height={50} style={{border:'none'}} />

              <a href="https://www.smartsoftgaming.com/" rel="noreferrer" target="_blank"><img src={SmartsoftLogo} className={styles.partnerLogoSmartsoft} alt="smartsoft games logo" /></a>
              <a href="https://evoplay.games/" rel="noreferrer" target="_blank"><img src={EvoplayLogo} className={styles.partnerLogoEvoplay} alt="evoplay logo" /></a>

            </div>
            <div className={styles.logoContainer}>
              <a
                href="https://wallfair.io/"
                target="_blank"
                rel="noreferrer"
                className={styles.cryptoTokenIcon}
              >
                <img src={handshakeIcon} className={styles.handshakeIcon} alt={'handshake icon'} />
              </a>

              <a
                href="https://wallfair.io/"
                target="_blank"
                rel="noreferrer"
                className={styles.cryptoTokenIcon}
              >
                <img src={fair100Icon} className={styles.footerGenericIcons} alt={'fair 100 icon'} />
              </a>

              <a
                href="https://wallfair.io/"
                target="_blank"
                rel="noreferrer"
                className={styles.cryptoTokenIcon}
              >
                <img src={responsibleGamingIcon} className={styles.responsibleGamingIcon} alt={'responsible gaming icon'} />
              </a>
              <a
                href="https://wallfair.io/"
                target="_blank"
                rel="noreferrer"
                className={styles.cryptoTokenIcon}
              >
                <img src={adultPlusIcon} className={styles.footerGenericIcons} alt={'adult plus icon'} />
              </a>
            </div>
          </div>
          <div className={styles.logosSeparator}></div>
        </div>


      </div>


      <div className={styles.poweredBy}>
        <a
          href="https://wallfair.io/"
          target="_blank"
          rel="noreferrer"
          data-tracking-id="footer-wfair-logo"
        >
          <img src={LogoFooter} className={styles.footerLogo} alt={'Powered-by-Wallfair'} />
        </a>
      </div>

      <div className={styles.copyrightBlock}>
        <div>© 2022 alpacasino.io | All rights reserved.</div>
        {/*<div>1 WFAIR = 0,02843 $</div>*/}
      </div>

      <p className={styles.footerDisclaimer}>
        This website offers gaming with risk experience. To be a user of our site you must be over 18 y.o. We are not responsible for the violation of your local laws related to i-gaming. Play responsibly and have fun on Alpacasino.
        The platform providing the services is owned by Wallfair N.V, a limited liability company registered in Curacao with company registration number 159041, with its registered office at Zuikertuintjeweg Z/N (Zuikertuin Tower), Curacao (“Company”), licensed in Curaçao under the Licence no. 365/JAZ Sub-License GLH-OCCHKTW0712022021 issued by Gaming Services Provider N.V. for the provision of online games of chance.
      </p>

      <div className={styles.supportBlock}>
        <div>Support: <b><a href='ma&#105;lt&#111;&#58;s%7&#53;p%&#55;0%&#54;F&#114;&#37;74%40&#97;&#108;%70ac%61sin&#37;&#54;F&#46;i&#111;'>&#115;uppo&#114;t&#64;al&#112;acasi&#110;&#111;&#46;io</a></b> | Partner: <b><a href='&#109;ailto&#58;p%6&#49;%7&#50;tne&#114;s&#64;%61lp&#97;%63&#97;s%69no&#46;&#105;&#37;6F'>p&#97;r&#116;ners&#64;&#97;lpacasino&#46;i&#111;</a></b></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
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