import { Carousel } from 'react-responsive-carousel';
import styles from './styles.module.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { OnboardingActions } from 'store/actions/onboarding';
import { dataLayerPush, trackWalletAddWfair } from 'config/gtm';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import { GeneralActions } from 'store/actions/general';
import authState from 'constants/AuthState';
import Routes from 'constants/Routes';
import classNames from 'classnames';

import BackgroundFirst from '../../data/images/carousel/bg-first.png';
import BackgroundSecond from '../../data/images/carousel/bg-second.png';
import BackgroundThird from '../../data/images/carousel/bg-third.png';
import BannerImage1 from '../../data/images/carousel/banner-img1.png';
import CardBg from '../../data/images/carousel/bg-card2.png';
import Coins from '../../data/images/carousel/coins.png';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import BetCard from 'components/BetCard';
import { useEventsFilter } from 'components/Events/hooks/useEventsFilter';
import BetState from 'constants/BetState';
import _ from 'lodash';
import { useCallback } from 'react';
import { useNotificationFilter } from 'components/Events/hooks/useNotificationFilter';
import { TOKEN_NAME } from 'constants/Token';
import { currencyDisplay } from 'helper/Currency';
import HowToStartBanner from './HowToStartBanner';

const isPlayMoney = process.env.REACT_APP_PLAYMONEY === 'true';

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

const CustomCarousel = ({loggedIn, showWalletDepositPopup, handleKycInfoVisible, setOpenDrawer, userId, showPopup}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { events } = useEventsFilter([BetState.active], 'all', null, true);
  const { events : eventsByCreationDate } = useEventsFilter([BetState.active], 'all', null, false, 15, '', 'most_popular');

  const {notifications} = useNotificationFilter('Notification/EVENT_USER_REWARD');

  const onClickItemFirstBanner = () => {
    if (loggedIn) {
      history.push(Routes.getRouteWithParameters(Routes.events, {category: 'all'}));

      showPopup(PopupTheme.eventForms, {});
    } else {
      dispatch(OnboardingActions.start());
      dataLayerPush({
        event:'gtm.click',
        'gtm.elementId': 'banner--create-events',
      });
    }
  };

  const onClickItemSecondBanner = useCallback(() => {
        history.push(Routes.getRouteWithParameters(Routes.events, {category: 'all'}));
        dataLayerPush({
          event:'gtm.click',
          'gtm.elementId': 'banner--fun-events',
        });
  }, []);

  // const onClickItemThirdBanner = useCallback(() => {
  //       history.push(Routes.leaderboard);
  //       dataLayerPush({
  //         event:'gtm.click',
  //         'gtm.elementId': 'banner--bonus',
  //       });
  // }, []);

  const renderBetCard = () => {
    if (events.length > 0) {
      const event = events[0];    
      const bet = event?.bet;
      const betId = _.get(event?.bet, 'id');
      const eventSlug = _.get(event, 'slug');
      const tags = _.get(event, 'tags');
      const marketQuestion = _.get(bet, 'market_question');
      const outcomes = _.get(bet, 'outcomes');

      return (
        <Link
          key={betId}
          to={{
            pathname: `/trade/${eventSlug}`,
            state: { fromLocation: location },
          }}
          className={styles.eventLink}
        >
          <BetCard
            key={betId}
            betId={betId}
            title={marketQuestion}
            organizer={''}
            image={event?.preview_image_url}
            eventEnd={bet?.end_date}
            outcomes={outcomes}
            eventCardClass={styles.eventCardHome}
            category={event?.category ? event.category : 'all'}
            isBookmarked={!!bet?.bookmarks?.includes(userId)}
            tags={tags}
            onBookmark={() => {}}
            onBookmarkCancel={() => {}}
          />
        </Link>
      );
    }
  };

  const render3BetCards = () => {
    return (
      <div className={styles.cardContainer}>
        {/* <span className={styles.title}>TOP 3 EVENTS</span> */}
        <span className={styles.title}>TOP 3 EVENTS</span>
        <div className={styles.cardsWrapper}>

        { eventsByCreationDate?.length && eventsByCreationDate?.slice(0, 3).map((event, index) => {

          const bet = event.bet;
          const betId = _.get(event.bet, 'id');
          const eventSlug = _.get(event, 'slug');
          const tags = _.get(event, 'tags');
          const marketQuestion = _.get(bet, 'market_question');
          const outcomes = _.get(bet, 'outcomes');

          return (
            <Link
              key={betId}
              to={{
                pathname: `/trade/${eventSlug}`,
                state: { fromLocation: location },
              }}
              className={styles.eventLink}
            >
              <BetCard
                key={betId}
                betId={betId}
                title={marketQuestion}
                organizer={''}
                image={event.preview_image_url}
                eventEnd={bet.end_date}
                outcomes={outcomes}
                eventCardClass={styles.card}
                category={event?.category ? event.category : 'all'}
                isBookmarked={!!bet?.bookmarks?.includes(userId)}
                tags={tags}
                onBookmark={() => {}}
                onBookmarkCancel={() => {}}
                small={true}
              />
            </Link>
          );
        })}
        </div>
      </div>
    )
  }

  const WinnerItem = ({number, title}) => {
    return (
      <div className={styles.winnerItem}>
        <span className={styles.rankNumber}>#{number}</span>
        <span>{`${title} - `}</span>
        <span className={styles.highlightWinner}>$50 in ETH</span>
      </div>
    )
  }
  const renderWinners = () => {
    return (
      <div className={styles.winnerContainer}>
        <span className={styles.title}>The 3 Winners</span>
        <WinnerItem number={1} title={'Highest cashout value in an Event'} />
        <WinnerItem number={2} title={'Highest cashout value from Elon Game and Pump & Dump'} />
        <WinnerItem number={3} title={'Creator of the event with highest volume'} />

        <div className={classNames(styles.buttonWrapper, styles.desktop)}>
          <Button className={styles.button} onClick={onClickItemFirstBanner}>Create Event now</Button>
        </div>
      </div>
    )
  }

  const renderSlidesPlayMoney = () => {
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
              <h2>CREATE YOUR<br/>OWN EVENT AND<br/><span className={styles.secondTitle}>MAKE MONEY!</span></h2>
              <p className={styles.description}>
                Create events within 2 minutes, share them<br />with 
                your friends and earn real money.
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} onClick={onClickItemFirstBanner}>Create an event</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            {renderBetCard()}
            <img src={Coins} className={styles.coins} alt="coins" />
          </div>
          <div className={styles.bottomBannerContainner}>
            {notifications && notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.user?.username}`}
                  price={`${Math.floor(activity.data?.winToken)} ${currencyDisplay(TOKEN_NAME)}`}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundThird}
          />
          <div className={styles.firstContainer}>
            <div className={styles.contentWrapper}>
              <span className={styles.title}>MARCH COMPETITION</span>
              <h2>
                WE WILL DRAW 3 WINNERS <span className={styles.highlightWinner}>EVERY DAY!</span><br/>
                THE DAILY PRIZE POOL IS WORTH <span className={styles.highlightWinner}>150 USD IN ETH.</span>
              </h2>
              <div className={classNames(styles.buttonWrapper, styles.mobile)}>
                <Button className={styles.button} onClick={onClickItemFirstBanner}>Create an Event</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            {renderWinners()}
          </div>
          {/* <div className={styles.bottomBannerContainner}>
            {notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.user?.username}`}
                  price={`${Math.floor(activity.data?.winToken)} ${currencyDisplay(TOKEN_NAME)}`}
                />
              )
            })}
          </div> */}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundSecond}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2>TRADE ON<br/><span className={styles.secondTitle}>FUN EVENTS!</span></h2>
              <p className={styles.description}>
                Share the events with your friends or community. <br/>
                The best and most interesting events will be rewarded.
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} theme={ButtonTheme.secondaryButton} onClick={onClickItemSecondBanner}>Discover all Events</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            {render3BetCards()}
          </div>
          <div className={styles.bottomBannerContainner}>
            {notifications && notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.user?.username}`}
                  price={`${Math.floor(activity.data?.winToken)} ${currencyDisplay(TOKEN_NAME)}`}
                />
              )
            })}
          </div>
        </div>
        
      </div>
    </Carousel>
    )
  }

  const TextItem = ({emoji, children}) => {
    return (
      <div className={styles.textItem}>
        <span className={styles.emoji}>{emoji}</span>
        {' '}{children}
        {/* <span className={styles.prize}></span> */}
      </div>
    )
  }

  const renderTextItems = () => {
    return (
      <div className={styles.textItemsContainer}>
        {/* <span className={styles.title}>The 3 daily winners</span> */}
        <TextItem emoji={'💩'}><span><span className={styles.highlighted}>No bullshit</span>: Web 3.0 - Instant MetaMask deposit &amp; withdrawal instead of sign up, KYC and deposit limits</span></TextItem>
        <TextItem emoji={'🥸'}><span><span className={styles.highlighted}>Fun</span>: Over 500 fun games and the first platform to bet on user generated events</span></TextItem>
        <TextItem emoji={'💰'}><span><span className={styles.highlighted}>Make money</span>: Create your own bets and earn 10% of the trading volume (Limit: 500,000 USD per event)</span></TextItem>
      </div>
    )
  }

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

      <HowToStartBanner />

      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundFirst}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2><span className={styles.secondTitle}>WALLFAIR</span> IS WEB 3.0<br/> FUN BETTING WITH<br/>NO BULLSHIT</h2>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} theme={ButtonTheme.secondaryButton} onClick={() => { history.push('/how-it-works')}}>How it works</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            {renderTextItems()}
          </div>
          <div className={styles.bottomBannerContainner}>
            {notifications && notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.user?.username}`}
                  price={`${Math.floor(activity.data?.winToken)} ${currencyDisplay(TOKEN_NAME)}`}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundFirst}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2>CREATE YOUR<br/>OWN EVENT AND<br/><span className={styles.secondTitle}>MAKE MONEY!</span></h2>
              <p className={styles.description}>
                Create events within 2 minutes, share them<br />with 
                your friends and earn real money.
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} onClick={onClickItemFirstBanner}>Create an event</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            {renderBetCard()}
            <img src={Coins} className={styles.coins} alt="coins" />
          </div>
          <div className={styles.bottomBannerContainner}>
            {notifications && notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.user?.username}`}
                  price={`${Math.floor(activity.data?.winToken)} ${currencyDisplay(TOKEN_NAME)}`}
                />
              )
            })}
          </div>
        </div>
      </div>


      <div className={styles.container}>
        <div className={styles.topContainer}>
          <img
            className={styles.backgroundImg}
            alt=""
            src={BackgroundSecond}
          />
          <div className={styles.firstContainer}>
            <div>
              <h2>TRADE ON<br/><span className={styles.secondTitle}>FUN EVENTS!</span></h2>
              <p className={styles.description}>
                Share the events with your friends or community. <br/>
                The best and most interesting events will be rewarded.
              </p>
              <div className={styles.buttonWrapper}>
                <Button className={styles.button} theme={ButtonTheme.secondaryButton} onClick={onClickItemSecondBanner}>Discover all Events</Button>
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            {render3BetCards()}
          </div>
          <div className={styles.bottomBannerContainner}>
            {notifications && notifications.slice(0, 5).map(activity => {
              return (
                <BottomBanner
                  title={`${activity.data?.user?.username}`}
                  price={`${Math.floor(activity.data?.winToken)} ${currencyDisplay(TOKEN_NAME)}`}
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
      {isPlayMoney ? renderSlidesPlayMoney() : renderSlidesRealMoney()}
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
    showWalletDepositPopup: () => {
      trackWalletAddWfair();
      dispatch(PopupActions.show({ popupType: PopupTheme.walletDeposit }));
    },
    handleKycInfoVisible: bool => {
      dispatch(GeneralActions.setKycInfoVisible(bool));
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomCarousel);
