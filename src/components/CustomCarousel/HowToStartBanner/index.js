
import HowToStartCard from 'components/HowToStartCard';
import { connect, useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import BackgroundFourth from '../../../data/images/carousel/bg-fourth.png';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import metamask from 'data/images/carousel/metamask.png';
import wfair from 'data/images/carousel/wfair.png';
import polygon from 'data/images/carousel/polygon.png';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import { trackWalletAddWfair } from 'config/gtm';
import authState from 'constants/AuthState';
import { addMetaMaskEthereum, switchMetaMaskNetwork } from 'utils/helpers/ethereum';
import { numberWithCommas } from 'utils/common';
import { formatToFixed } from 'helper/FormatNumbers';


const BottomBanner = ({title, price, currency}) => {
  const formattedPrice = numberWithCommas(formatToFixed(price, 2));
  return (
    <div className={styles.bottomBanner}>
      {/* <img src={BannerImage1} alt='' /> */}
      <div className={styles.bottomBannerContent}>
        <a href={`/activities`} >
          <p className={styles.title}>{title}<br />just earned</p>
          <p className={styles.price}>{`${formattedPrice} ${currency}`}</p>
        </a>
      </div>
    </div>
  )
}

const HowToStartBanner = ({loggedIn, showWalletDepositPopup, showPopup, notifications}) => {
    const dispatch = useDispatch();

    const handlePolygon = async () => {
        await switchMetaMaskNetwork('0x89');
    }

    const handleWFAIR = async () => {
        await addMetaMaskEthereum();
    }

    const renderHowtoCards = () => {
        return (
            <div className={styles.cardContainer}>
                <span className={styles.title}>JUST FOLLOW THE 3 SIMPLE STEPS BY CLICKING ON THE YELLOW BUTTONS</span>
                <div className={styles.cardsWrapper}>
                    <HowToStartCard title="Install MetaMask" step="1" image={metamask} installMetamask={true}/>
                    <HowToStartCard title="Add Polygon" step="2" image={polygon} action={handlePolygon} />
                    <HowToStartCard title="Add WFAIR" step="3" image={wfair} action={handleWFAIR}/>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <img
                className={styles.backgroundImg}
                alt=""
                src={BackgroundFourth}
                />
                <div className={styles.firstContainer}>
                  <div>
                      <h2>HOW TO START<br/><span className={styles.secondTitle}>PLAYING</span></h2>
                      <p className={styles.description}>
                      Just follow the 3 simple steps to setup your MetaMask<br/>
                      and you are ready to start!
                      </p>
                      <div className={styles.buttonWrapper}>
                      <a href='https://discord.gg/VjYUYBKhTc' target='_blank' rel='noreferrer'>
                          <Button className={styles.button} theme={ButtonTheme.secondaryButton}>Need more help? Join Discord!</Button>
                      </a>
                      </div>
                  </div>
                </div>
                <div className={styles.secondContainer}>
                    {renderHowtoCards()}
                </div>
                <div className={styles.bottomBannerContainner}>
                  {notifications && notifications.slice(0, 5).map((activity, index) => {
                    return (
                      <BottomBanner
                        key={index}
                        title={`${activity.data?.username}`}
                        price={activity.data?.reward}
                        currency={activity.data?.gamesCurrency}
                      />
                    )
                  })}
               </div>
            </div>
        </div>
    )
}

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
    showWalletDepositPopup: () => {
      trackWalletAddWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HowToStartBanner);
