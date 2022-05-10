import BaseContainerWithNavbar from "components/BaseContainerWithNavbar";
import styles from './styles.module.scss';

import Button from "../../components/Button";
import ButtonTheme from '../../components/Button/ButtonTheme';
import { useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { PopupActions } from "store/actions/popup";
import authState from "constants/AuthState";

import AffiliatesFAQ from "components/FAQ/AffiliatesFAQ";
import { ReactComponent as PaymentMethodIcon } from '../../data/icons/payment-methods.svg';
import { Input } from "components/Form";
import Dropdown from "components/Dropdown";
import { RECAPTCHA_KEY } from "constants/Api";
import { AlertActions } from "store/actions/alert";
import { sendMail } from "api";
import { numberWithCommas } from "utils/common";

const CONTACTTYPE = ['Telegram', 'WhatsApp', 'E-Mail'];

const Whitelabel = ({loggedIn, showPopup}) => {
  const dispatch = useDispatch();
  const [mailSent, setMailSent] = useState(false);
  const [contactField1, setContactField1] = useState('');
  const [contactField2, setContactField2] = useState('');


  const handleReCaptchaVerify = () => {
    return new Promise((resolve, _) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(RECAPTCHA_KEY, { action: 'join' })
          .then(token => {
            resolve(token);
          })
      });
    });
  };


  const submitForm = useCallback(async () => {
    const recaptchaToken = await handleReCaptchaVerify();
    if (!recaptchaToken) {
      console.log('recaptcha failed!');
      dispatch(AlertActions.showError('Recaptcha verification failed! Please try again!'));
      return;
    }

    const result = await sendMail(
      {
        subject: `Request - Whitelabel`,
        text: `Request Whitelabel - Contact - via ${contactField1}: ${contactField2}`,
        recaptchaToken
    });

    if (result?.response?.data?.status === 'error') {
      console.error(result.response.data.message);

      dispatch(AlertActions.showError({ message: result.response.data.message }));
      return;
    }

    setMailSent(true);
  }, [dispatch, contactField1, contactField2]);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.affiliates}>
        <h2>WHITELABEL SOLUTION</h2>
        <h1 className={styles.headline}>
          <span>START YOUR OWN<br/>CRYPTO CASINO</span>
        </h1>

        <div className={styles.container}>

          <div className={styles.calculatorContainer}>

              <div className={styles.contentWrapper}>
                {!mailSent ?
                  <>
                    <span className={styles.calculatorTitle}>TELL US HOW TO CONTACT YOU</span>
                    <Dropdown
                      value={contactField1}
                      placeholder="How to contact you..."
                      setValue={setContactField1}
                      options={CONTACTTYPE}
                      className={styles.dropdown}
                      placeholderClassName={styles.dropdownPlaceholder}
                    />
                    <Input className={styles.userPhoneInput} placeholder={'Enter username or phone number...'} onChange={setContactField2} value={contactField2} />

                    <Button
                      disabled={contactField1.length === 0 || contactField2.length === 0}
                      theme={ButtonTheme.primaryButtonM} className={styles.startButton} onClick={submitForm}>
                      Send
                    </Button>
                  </>
                :
                  <span className={styles.calculatorTitle}>Request sent! We'll contact you soon!</span>
                }

              </div>

          </div>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <span className={styles.icon}>✅</span>
              <span className={styles.title}>LICENSE</span>
              <span className={styles.description}>Operate under our business structure and Curacao sublicense.</span>
            </div>
            <div className={styles.step}>
              <span className={styles.icon}>🎮</span>
              <span className={styles.title}>GAME PROVIDERS</span>
              <span className={styles.description}>We work only with licensed and certified game providers ensuring a high-level player experience.</span>
            </div>
            <div className={styles.step}>
              <span className={styles.icon}>🚀</span>
              <span className={styles.title}>LAUNCH FAST</span>
              <span className={styles.description}>Launch your project in 2 months or less.</span>
            </div>
          </div>

          <div className={styles.aboutContainer}>
            {/* <img src={''} alt='' /> */}
            <div className={styles.content}>
              {/* <span>WALLFAIR.IO</span> */}
              <h2>About wallfair.io</h2>
              <p>Wallfair is the entertainment platform for tomorrow available today. We offer licensed crypto gambling with a large number of coins and currencies.</p>
            </div>
          </div>

          {/* <div className={styles.statsContainer}>
            <div className={styles.statsDetail}>
              <svg className={styles.statsIcon}></svg>
              <div className={styles.statsBox}>
                <span className={styles.statsTitle}>10 MINUTES</span>
                <span className={styles.statsDescription}>Average Cashout time</span>
              </div>
            </div>

            <div className={styles.statsDetail}>
              <svg className={styles.statsIcon}></svg>
              <div className={styles.statsBox}>
                <span className={styles.statsTitle}>24/7</span>
                <span className={styles.statsDescription}>Live Chat Support</span>
              </div>
            </div>

            <div className={styles.statsDetail}>
              <svg className={styles.statsIcon}></svg>
              <div className={styles.statsBox}>
                <span className={styles.statsTitle}>3,200+</span>
                <span className={styles.statsDescription}>Casino Games</span>
              </div>
            </div>

            <div className={styles.statsDetail}>
              <svg className={styles.statsIcon}></svg>
              <div className={styles.statsBox}>
                <span className={styles.statsTitle}>1,000+</span>
                <span className={styles.statsDescription}>Registered Players</span>
              </div>
            </div>
          </div> */}

        <div className={styles.info}>

          <div className={styles.infoItem}>
            <h4>Product</h4>
            <p>We offer the most insane crypto gambling opportunity with over 3000 games available.</p>
          </div>

          <div className={styles.infoItem}>
            <h4>Deposits</h4>
            <p>Out platform accepts deposits in crypto and FIAT through Moonpay and CryptoPay.</p>
          </div>

          <div className={styles.infoItem}>
            <h4>Restricted Countries</h4>
            <p>Australia, Aruba, Bonaire, Curacao, France, Netherlands, Spain, Saint Marteen (Dutch area), United Kingdom, United States.</p>
          </div>

          <div className={styles.infoItem}>
            <h4>Currencies</h4>
            <p>We enable deposits in WFAIR, BTC, ETH, MATIC, LTC, USDC, USDT, DAI, XRP. In case there is a token or currency you are missing from this list, please let us know, we would love to hear from you.</p>
          </div>

        </div>

        <div className={styles.commissionContainer}>
          <h1>Sell our solution and <span>get a commission</span></h1>
          <span className={styles.commissionDescription}>Help us selling our services and earn money.</span>

          <Button
            theme={ButtonTheme.primaryButtonXL}
            className={styles.earnButton}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            I am interested
          </Button>
        </div>

          {/* <AffiliatesFAQ /> */}

        </div>
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authentication,
    loggedIn: state.authentication.authState === authState.LOGGED_IN,
    userId: state.authentication.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Whitelabel);
