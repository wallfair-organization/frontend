
import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import authState from 'constants/AuthState';
import Routes from 'constants/Routes';
import classNames from 'classnames';

import BackgroundFirst from '../../data/images/carousel/elon-bg-2x.png';
import BackgroundSecond from '../../data/images/carousel/unlimited-wishes-bg.jpg';
import { useEventsFilter } from 'components/Events/hooks/useEventsFilter';
import BetState from 'constants/BetState';  
import { useCallback } from 'react';
import { useNotificationFilter } from 'components/Events/hooks/useNotificationFilter';
import Button from 'components/Button';
import { currencyDisplay } from 'helper/Currency';
import { TOKEN_NAME } from 'constants/Token';
import HowToStartBanner from 'components/CustomCarousel/HowToStartBanner';


const BottomBanner = ({title, price}) => {
  return (
    <div className={styles.bottomBanner}>
      {/* <img src={BannerImage1} alt='' /> */}
      <div className={styles.bottomBannerContent}>
        <a href={`/activities`} >
          <p className={styles.title}>{title}<br />just earned</p>
          <p className={styles.price}>{price}</p>
        </a>
      </div>
    </div>
  )
}

const GamesCarousel = ({loggedIn, userId, showPopup}) => {
  // const dispatch = useDispatch();
  const history = useHistory();
  // const location = useLocation();

  // const { events } = useEventsFilter([BetState.active], 'all', null, true);
  // const { events : eventsByCreationDate } = useEventsFilter([BetState.active], 'all', null, false, 15, '', 'most_popular');

  const {notifications} = useNotificationFilter('Casino/CASINO_CASHOUT', 'game');

  const onClickItemFirstBanner = useCallback(() => {
    history.push(Routes.elonGame);
  }, []);

  const onClickItemSecondBanner = useCallback(() => {
    history.push('/evoplay-game/Unlimited%20Wishes/Slot/5759');
  }, []);

  // const onClickItemThirdBanner = useCallback(() => {
  //       history.push(Routes.leaderboard);
  //       dataLayerPush({
  //         event:'gtm.click',
  //         'gtm.elementId': 'banner--bonus',
  //       });
  // }, []);


  const renderSlidesRealMoney = () => {
    return (
      <Carousel
        className={styles.carousel}
        autoPlay={true}
        interval={6500}
        transitionTime={800}
        infiniteLoop={true}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeable={false}
        stopOnHover={true}
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        
      >
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundFirst}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2>PLAY THE ELON GAME<br/> AND <span className={styles.secondTitle}>MAKE MONEY!</span></h2>
              <p className={styles.description}>
                Place a bet and cash out before the coin explodes.
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} onClick={onClickItemFirstBanner}>Play now!</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
          </div>
          <div className={styles.bottomBannerContainner}>
            {notifications && notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.username}`}
                  price={`${Math.floor(activity.data?.reward * 100) / 100} ${activity.data?.gamesCurrency}`}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundFirst}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2>THE ELON GAME<br/><span className={styles.secondTitle}>TOURNAMENT!</span><br/>WIN <span className={styles.secondTitle}>1,000 USDT</span></h2>
              <p className={styles.description}>
                Score the highest cash-out on <span className={styles.highlight}>March 15th between 7PM and 8:30PM GMT</span> and win <span className={styles.highlight}>1,000 USDT</span><br />
                Required buy-in to participate: <span className={styles.highlight}>10 USD</span>
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} onClick={onClickItemFirstBanner}>Play now!</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
          </div>
          <div className={styles.bottomBannerContainner}>
            {notifications && notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.username}`}
                  price={`${Math.floor(activity.data?.reward * 100) / 100} ${activity.data?.gamesCurrency}`}
                />
              )
            })}
          </div>
        </div>
      </div> */}

      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundSecond}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2><span className={styles.secondTitle}>UNLIMITED WISHES</span><br />SLOT GAME</h2>
              <p className={styles.description}>
                You could win a maximum prize of x2100 when you get into the hidden Bonus game, Infinity Magic.
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} onClick={onClickItemSecondBanner}>Start spinning!</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
          </div>
          <div className={styles.bottomBannerContainner}>
            {notifications && notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.username}`}
                  price={`${Math.floor(activity.data?.reward * 100) / 100} ${activity.data?.gamesCurrency}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </Carousel>
    )
  }

  return (
    <div className={classNames(styles.carouselContainer)}>
      {renderSlidesRealMoney()}
    </div>
  )
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
)(GamesCarousel);
