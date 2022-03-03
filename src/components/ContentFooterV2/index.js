import { memo } from 'react';
import {connect, useSelector} from 'react-redux';
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
import { selectUser } from 'store/selectors/authentication';


import classNames from 'classnames';
import { LeaderboardActions } from 'store/actions/leaderboard';
import { useCallback } from 'react';
import { GeneralActions } from 'store/actions/general';
import { Link, Route } from 'react-router-dom';
import Routes from '../../constants/Routes';
import {selectPrices} from '../../store/selectors/info-channel';
import {roundToTwo} from "../../helper/FormatNumbers";
import RealMoneyOnly from 'components/RealMoneyOnly';
import PlayMoneyOnly from 'components/PlayMoneyOnly';

const ContentFooter = ({ className = '', disclaimerHidden, setOpenDrawer }) => {
  const openLeaderboard = useCallback(event => {
    window.scrollTo(0, 0);
    setOpenDrawer('leaderboard');
  }, []);

  const prices = useSelector(selectPrices);
  const { gamesCurrency } = useSelector(selectUser);

  const selectedGamesCurrencyPrice = roundToTwo(prices?.[gamesCurrency], 4) || '-';

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
                data-tracking-id="footer-imprint"
                to={Routes.imprint}
              >
                <p>Imprint</p>
              </Link>

              <Link
                data-tracking-id="footer-privacy"
                to={Routes.privacy}
              >
                <p>Privacy Policy</p>
              </Link>
              
            </div>
            <RealMoneyOnly>
              <div className={styles.linksGroup}>
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
                
                {/* <div id="lang-switcher" className={styles.langSwitcher}/> */}
              </div>
            </RealMoneyOnly>
          </div>

          <RealMoneyOnly>
            <div className={styles.trustPilotBlock}>
              <div>
                <a href="https://www.trustpilot.com/review/app.wallfair.io" target="_blank" rel="noopener noreferrer"><img src={trustPilotIcon} className={styles.trustPilotIcon}/></a>
              </div>

              <div className={"trustpilot-widget"} data-locale="en-US" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="61dc05ba2525917592e9d274" data-style-height="24px" data-style-width="100%" data-theme="dark" data-min-review-count="10">
                <a href="https://www.trustpilot.com/review/app.wallfair.io" target="_blank" rel="noopener noreferrer">Trustpilot</a>
              </div>
            </div>
          </RealMoneyOnly>

        </div>



        <div className={styles.logosBlock}>
          <div className={styles.logosSeparator}></div>

          <RealMoneyOnly>
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
                <Link
                  data-tracking-id="footer-provably-fair"
                  to={Routes.provablyfair}
                >
                  <img src={handshakeIcon} className={styles.handshakeIcon} alt={'handshake icon'} />
                </Link>

                <Link
                  data-tracking-id="footer-provably-fair"
                  to={Routes.provablyfair}
                >
                  <img src={fair100Icon} className={styles.footerGenericIcons} alt={'fair 100 icon'} />
                </Link>

                <Link
                  data-tracking-id="footer-responsible-gambling"
                  to={Routes.responsibleGambling}
                >
                  <img src={responsibleGamingIcon} className={styles.responsibleGamingIcon} alt={'responsible gaming icon'} />
                </Link>
                <Link
                  data-tracking-id="footer-18-plus"
                  to={{
                    pathname: Routes.terms,
                    hash: "#restricted",
                  }}
                >
                  <img src={adultPlusIcon} className={styles.footerGenericIcons} alt={'adult plus icon'} />
                </Link>
              </div>
            </div>
            <div className={styles.logosSeparator}></div>
          </RealMoneyOnly>
        </div>


      </div>


      <div className={styles.poweredBy}>
        <a
          href="https://wallfair.io/"
          target="_blank"
          rel="noreferrer"
          data-tracking-id="footer-wfair-logo"
        >
          <img src={LogoFooter} className={styles.footerLogo} alt={'Wallfair Logo'} />
        </a>
      </div>

      <div className={styles.copyrightBlock}>
        <div>© 2022 Wallfair N.V. | All rights reserved.</div>
        <RealMoneyOnly>
          <div>1 WFAIR = {selectedGamesCurrencyPrice} {gamesCurrency}</div>
        </RealMoneyOnly>
      </div>
      
      <RealMoneyOnly>
        <p className={styles.footerDisclaimer}>
          This website offers gaming with risk experience. To be a user of our site you must be over 18 y.o. We are not responsible for the violation of your local laws related to i-gaming. Play responsibly and have fun on Wallfair.
          The platform providing the services is owned by Wallfair N.V, a limited liability company registered in Curacao with company registration number 159041, with its registered office at Zuikertuintjeweg Z/N (Zuikertuin Tower), Curacao (“Company”), licensed in Curaçao under the Licence no. 365/JAZ Sub-License GLH-OCCHKTW0712022021 issued by Gaming Services Provider N.V. for the provision of online games of chance.
        </p>
      </RealMoneyOnly>

      <div className={styles.supportBlock}>
        <div>Support: <b><a href='ma&#105;lt&#111;&#58;&#115;uppo&#114;t&#64;wallfair.io'>&#115;uppo&#114;t&#64;wallfair.io</a></b> | Partner: <b><a href='&#109;ailto&#58;p%6&#49;%7&#50;tne&#114;s&#64;wallfair&#46;i&#111;'>p&#97;r&#116;ners&#64;wallfair&#46;i&#111;</a></b></div>
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
