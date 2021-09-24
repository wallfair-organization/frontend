import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _ from 'lodash';
import Icon from '../../components/Icon';
import Link from '../../components/Link';
import LiveBadge from 'components/LiveBadge';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import TimeLeftCounter from 'components/TimeLeftCounter';
import ViewerBadge from 'components/ViewerBadge';
import { Carousel } from 'react-responsive-carousel';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import EmbedVideo from '../../components/EmbedVideo';
import BetView from '../../components/BetView';
import RelatedBetCard from '../../components/RelatedBetCard';
import MyBetCard from '../../components/MyBetCard';
import { useHistory } from 'react-router-dom';
import Chat from '../../components/Chat';
import News from '../../components/News';
import TabOptions from '../../components/TabOptions';
import classNames from 'classnames';
import { SwiperSlide, Swiper } from 'swiper/react';
import EventTradesContainer from '../../components/EventTradesContainer';
import EventTradeViewsHelper from '../../helper/EventTradeViewsHelper';
import State from '../../helper/State';
import { LOGGED_IN } from 'constants/AuthState';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PopupTheme from '../../components/Popup/PopupTheme';
import { BetActions } from 'store/actions/bet';
import { useBetPreviousLocation } from './hooks/useBetPreviousLocation';
import Chart from '../../components/Chart';
import { useChartData } from './hooks/useChartData';
import Placeholder from '../../components/Placeholder';
import { useNewsFeed } from './hooks/useNewsFeed';
import { useTabOptions } from './hooks/useTabOptions';
import AdminOnly from 'components/AdminOnly';
import { selectOpenBets } from 'store/selectors/bet';
import { selectTransactions } from 'store/selectors/transaction';
import { TransactionActions } from 'store/actions/transaction';
import { ChatActions } from 'store/actions/chat';
import ContentFooter from 'components/ContentFooter';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import OfflineBadge from 'components/OfflineBadge';
import { EVENT_STATES } from 'constants/EventStates';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import EventTypes from 'constants/EventTypes';

const BET_ACTIONS = {
  Chat: 0,
  News: 1,
  EventTrades: 2,
  MyTrades: 3,
};

const Bet = ({
  showPopup,
  authState,
  events,
  fetchOpenBets,
  fetchTransactions,
  fetchChatMessages,
}) => {
  const { eventSlug, betSlug } = useParams();

  const [betId, setBetId] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [betAction, setBetAction] = useState(0);
  const [betViewIsOpen, setBetViewIsOpen] = useState(false);
  const [singleBet, setSingleBet] = useState(false);
  const [event, setEvent] = useState(null);
  const [relatedBets, setRelatedBets] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const mobileChatRef = useRef(null);
  const ref = useRef(null);
  const history = useHistory();

  const openBets = useSelector(selectOpenBets);
  const transactions = useSelector(selectTransactions);

  const currentFromLocation = useBetPreviousLocation();
  const {
    chartData,
    filterActive,
    handleChartPeriodFilter,
    handleChartDirectionFilter,
  } = useChartData(betId);

  useNewsFeed(event);

  const { tabOptions, handleSwitchTab, selectedTab } = useTabOptions(event);

  const status = {
    active: 1,
    resolved: 2,
    closed: 3,
  };

  window.onresize = () => ref.current && setIsMobile(window.innerWidth < 992);

  const selectSingleBet = bets => {
    if (relatedBets.length || bets.length) {
      const loneBet = _.get(relatedBets.length ? relatedBets : bets, '[0]');
      if (loneBet?.status !== 'active') return;

      const betId = _.get(loneBet, '_id');
      const betSlug = _.get(loneBet, 'slug');
      selectBet(betId, betSlug);
      setSingleBet(true);
    }
  };

  useEffect(() => {
    const sluggedEvent = _.find(events, {
      slug: eventSlug,
    });
    if (!_.isEqual(sluggedEvent, event)) {
      setEvent(sluggedEvent);
    }
  }, [events, eventSlug]);

  useEffect(() => {
    ref.current = true;
    if (!event) return;

    setSingleBet(false);
    setBetViewIsOpen(false);

    const eventBets = [..._.get(event, 'bets', [])].sort(
      (a, b) => status[a.status] - status[b.status]
    );

    setRelatedBets(eventBets);

    const currentBet = _.find(eventBets, {
      slug: betSlug,
    });
    const currentBetId = _.get(currentBet, '_id');
    setBetId(currentBetId);

    if (betSlug) {
      selectBet(currentBetId, betSlug);
    }

    if (!isMobile && eventBets.length === 1 && !singleBet) {
      selectSingleBet(eventBets);
    }

    fetchChatMessages(event._id);
    fetchOpenBets();
    fetchTransactions();
    return () => (ref.current = false);
  }, [eventSlug, betSlug, event]);

  useEffect(() => {
    if (ref.current && !isMobile && relatedBets.length === 1) {
      selectSingleBet();
    }
    if (isMobile) {
      setBetAction(BET_ACTIONS.Chat);
    } else {
      setBetAction(BET_ACTIONS.EventTrades);
    }
  }, [isMobile, relatedBets]);

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      swiper.slideTo(betAction);
    }
  }, [betAction]);

  const onBetClose = () => {
    return () => {
      const eventSlug = _.get(event, 'slug', null);

      history.push(
        Routes.getRouteWithParameters(Routes.bet, {
          eventSlug,
          betSlug: '',
        })
      );

      setBetViewIsOpen(false);
      onBetActionSwitch(BET_ACTIONS.EventTrades);
    };
  };

  const onSwiper = swiper => {
    setSwiper(swiper);
    swiper.slideTo(betAction);
  };

  const onBetActionSwitch = newIndex => {
    setBetAction(newIndex);
    if (newIndex === 0) {
      mobileChatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const selectBet = (betId, betSlug) => {
    history.push(
      Routes.getRouteWithParameters(Routes.bet, {
        eventSlug,
        betSlug,
      })
    );
    setBetId(betId);
    setBetViewIsOpen(true);
  };

  const onBetClick = (bet, popup) => {
    return () => {
      const betId = _.get(bet, '_id');
      const eventId = _.get(event, '_id');
      const betSlug = _.get(bet, 'slug');

      selectBet(betId, betSlug);
      setBetId(betId);

      if (popup) {
        setBetViewIsOpen(false);
        showPopup(PopupTheme.tradeView, {
          betId,
          eventId,
          openBets: _.filter(openBets, { betId }),
        });
      }
    };
  };

  const getMyEventTrades = () => {
    return _.map([...transactions], transaction => {
      const betId = _.get(transaction, 'bet');
      const bet = State.getTradeByEvent(betId, event);
      const openBet = _.find(openBets, { betId });

      if (bet) {
        return {
          ...transaction,
          event,
          bet,
          openBet,
        };
      }
    })
      .filter(Boolean)
      .sort((a, b) => status[a.bet.status] - status[b.bet.status]);
  };

  const renderNoTrades = () => {
    return <div className={styles.relatedBetsNone}>No trades placed.</div>;
  };

  const getRelatedBetSliderPages = (bets, size) => {
    return _.ceil(_.size(bets) / size);
  };

  const renderRelatedBetList = (popup = false) => {
    return _.map(relatedBets, (bet, index) => {
      return renderRelatedBetCard(bet, index, popup);
    });
  };

  const renderMyTradesList = (popup = false) => {
    const myEventTrades = getMyEventTrades();
    if (!isLoggedIn() || myEventTrades.length < 1) {
      return renderNoTrades();
    }
    return _.map(myEventTrades, (transaction, index) => {
      return renderMyBetCard(transaction, index, popup);
    });
  };

  const renderRelatedBetCard = (bet, index, popup) => {
    if (bet) {
      return (
        <RelatedBetCard
          key={index}
          bet={bet}
          onClick={onBetClick(bet, popup)}
        />
      );
    }

    return <div />;
  };

  const renderMyBetCard = (transaction, index, popup) => {
    if (transaction) {
      return (
        <MyBetCard
          key={index}
          transaction={transaction}
          onClick={onBetClick(transaction.bet, popup)}
        />
      );
    }

    return <div />;
  };

  const renderMyBetSliders = myEventTrades => {
    const size = getRelatedBetSliderPages(myEventTrades, 2);

    return _.map(_.range(0, size), (sliderPage, index) =>
      renderMyBetSlider(sliderPage, index, myEventTrades)
    );
  };

  const renderMyBetSlider = (pageIndex, index, myEventTrades) => {
    const indexes = [];
    const listLength = myEventTrades.length > 2 ? 2 : myEventTrades.length;

    for (let i = 0; i < listLength; i++) {
      indexes.push(pageIndex * 2 + i);
    }

    return (
      <div
        key={index}
        className={classNames(styles.carouselSlide, styles.relatedBetSlide)}
      >
        {renderMyBetCard(_.get(myEventTrades, '[' + indexes[0] + ']'))}
        {renderMyBetCard(_.get(myEventTrades, '[' + indexes[1] + ']'))}
      </div>
    );
  };

  const renderRelatedBetSliders = () => {
    const size = getRelatedBetSliderPages(relatedBets, 3);

    return _.map(_.range(0, size), (sliderPage, index) =>
      renderRelatedBetSlider(sliderPage, index)
    );
  };

  const renderRelatedBetSlider = (pageIndex, index) => {
    const indexes = [];
    const listLength = relatedBets.length > 3 ? 3 : relatedBets.length;

    for (let i = 0; i < listLength; i++) {
      indexes.push(pageIndex * 3 + i);
    }

    return (
      <div
        key={index}
        className={classNames(styles.carouselSlide, styles.relatedBetSlide)}
      >
        {renderRelatedBetCard(_.get(relatedBets, '[' + indexes[0] + ']'))}
        {renderRelatedBetCard(_.get(relatedBets, '[' + indexes[1] + ']'))}
        {renderRelatedBetCard(_.get(relatedBets, '[' + indexes[2] + ']'))}
      </div>
    );
  };

  const renderSwitchableView = () => {
    const eventViews = [
      EventTradeViewsHelper.getView('Chat', undefined, false, styles.chatTab),
      EventTradeViewsHelper.getView(
        'News',
        undefined,
        false,
        styles.newsTab,
        event.type === 'streamed'
      ),
      EventTradeViewsHelper.getView('Event Trades'),
      EventTradeViewsHelper.getView(
        'My Trades',
        isLoggedIn() ? getMyEventTrades().length : 0,
        true
      ),
    ];

    return (
      <EventTradesContainer
        className={styles.eventTradesContainer}
        fullWidth={false}
        eventViews={eventViews}
        currentIndex={betAction}
        setCurrentIndex={onBetActionSwitch}
      />
    );
  };

  const renderContent = () => {
    if (betAction === BET_ACTIONS.Chat) {
      return (
        <Chat
          className={styles.mobileChat}
          roomId={event._id}
          chatMessageType={ChatMessageType.event}
        />
      );
    } else if (betAction === BET_ACTIONS.EventTrades) {
      return (
        <div className={styles.relatedBets}>
          <Carousel
            className={classNames(
              styles.relatedBetsCarousel,
              relatedBets.length > 3 ? '' : styles.oneCarouselPage
            )}
            dynamicHeight={false}
            emulateTouch={true}
            infiniteLoop={true}
            autoPlay={false}
            showArrows={false}
            showStatus={false}
            interval={1e11}
          >
            {renderRelatedBetSliders()}
          </Carousel>
        </div>
      );
    }

    const myEventTrades = getMyEventTrades();

    if (!isLoggedIn() || myEventTrades.length < 1) {
      return renderNoTrades();
    }

    return (
      <div className={styles.relatedBets}>
        <Carousel
          className={classNames(
            styles.relatedBetsCarousel,
            myEventTrades.length > 2 ? '' : styles.oneCarouselPage
          )}
          dynamicHeight={false}
          emulateTouch={true}
          infiniteLoop={true}
          autoPlay={false}
          showArrows={false}
          showStatus={false}
          interval={1e11}
        >
          {renderMyBetSliders(myEventTrades)}
        </Carousel>
      </div>
    );
  };

  const renderMobileContent = () => {
    return (
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: false,
        }}
        autoHeight={true}
        onSlideChange={swiper => onBetActionSwitch(swiper.activeIndex)}
        onSwiper={onSwiper}
      >
        <SwiperSlide className={styles.carouselSlide}>
          <div ref={mobileChatRef}>
            <Chat
              roomId={event._id}
              chatMessageType={ChatMessageType.event}
              className={styles.mobileChat}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.carouselSlide}>
          {event.type !== 'streamed' && (
            <div>
              <News />
            </div>
          )}
        </SwiperSlide>
        <SwiperSlide className={styles.carouselSlide}>
          <div>{renderRelatedBetList(true)}</div>
        </SwiperSlide>
        <SwiperSlide className={styles.carouselSlide}>
          <div>{renderMyTradesList(true)}</div>
        </SwiperSlide>
      </Swiper>
    );
  };

  const renderBetSidebarContent = () => {
    if (betViewIsOpen) {
      return (
        <div>
          {(isMobile || relatedBets.length > 1) && (
            <div className={styles.betViewClose} onClick={onBetClose()}>
              <Icon
                iconType={'arrowLeft'}
                iconTheme={'white'}
                className={styles.arrowBack}
              />
              <span>Go back to all tracks</span>
            </div>
          )}
          <div className={classNames({ [styles.betViewContent]: !singleBet })}>
            <BetView
              betId={betId}
              eventId={event._id}
              openBets={_.filter(openBets, { betId })}
              closed={false}
              showEventEnd={true}
              handleChartDirectionFilter={handleChartDirectionFilter}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        {renderSwitchableView()}
        <div className={styles.desktopCarousel}>{renderContent()}</div>
        <div className={styles.mobileCarousel}>{renderMobileContent()}</div>
      </div>
    );
  };

  if (!event) {
    return null;
  }

  const hasOnlineState = event?.state === EVENT_STATES.ONLINE;
  const hasOfflineState = event?.state === EVENT_STATES.OFFLINE;

  return (
    <BaseContainerWithNavbar withPaddingTop={true} withoutPaddingBottom={true}>
      <div className={styles.bet}>
        <div className={styles.upperLeftOval}></div>
        <div className={styles.centeredBottomOval}></div>
        <div className={styles.headlineContainer}>
          <div>
            <Link
              to={currentFromLocation?.pathname || '/'}
              className={styles.linkBack}
            >
              <div className={styles.arrowBack}></div>
              <div className={styles.headline}>
                <h2>{_.get(event, 'name')}</h2>
                {(hasOnlineState || hasOfflineState) && (
                  <div className={styles.streamStateBadge}>
                    {hasOnlineState && <LiveBadge />}
                    {hasOfflineState && <OfflineBadge />}
                  </div>
                )}
              </div>
            </Link>
          </div>
          <AdminOnly>
            <div className={styles.eventAdminActionsContainer}>
              <span
                className={styles.editEventLink}
                onClick={() => showPopup(PopupTheme.editEvent, event)}
              >
                <Icon
                  className={styles.icon}
                  iconType={IconType.edit}
                  iconTheme={IconTheme.white}
                  height={20}
                  width={20}
                />
                Edit Event
              </span>
              {event.type === EventTypes.streamed && (
                <span
                  className={styles.newBetLink}
                  onClick={() => showPopup(PopupTheme.newBet, { event })}
                >
                  <Icon
                    className={styles.icon}
                    iconType={IconType.addBet}
                    iconTheme={IconTheme.white}
                    height={24}
                    width={24}
                  />
                  New Bet
                </span>
              )}
            </div>
          </AdminOnly>
        </div>
        <div className={styles.row}>
          <div className={styles.columnLeft}>
            <div
              className={
                event.type === 'streamed'
                  ? styles.streamContainer
                  : styles.nonStreamContainer
              }
            >
              {event.type === 'non-streamed' ? (
                <div className={styles.chart}>
                  {betViewIsOpen ? (
                    <Chart
                      height={400}
                      data={chartData}
                      filterActive={filterActive}
                      handleChartPeriodFilter={handleChartPeriodFilter}
                    />
                  ) : (
                    <Placeholder style={{ height: '400px' }}>
                      <img src={event.previewImageUrl} alt="pic" />
                    </Placeholder>
                  )}
                </div>
              ) : (
                <EmbedVideo
                  video={event.streamUrl}
                  autoPlay={true}
                  controls={true}
                />
              )}
              {/* {event.type === 'streamed' && (
                <div className={styles.timeLeft}>
                  <span>Estimated end:</span>
                  <TimeLeftCounter
                    endDate={new Date(_.get(event, 'endDate'))}
                  />
                </div>
              )} */}
            </div>
            <TabOptions options={tabOptions} className={styles.tabOptions}>
              {option => (
                <div
                  className={styles.tabStyle}
                  onClick={() => handleSwitchTab(option)}
                >
                  {option.name}
                </div>
              )}
            </TabOptions>
            {selectedTab === 'chat' ? (
              <Chat
                className={styles.desktopChat}
                roomId={event._id}
                chatMessageType={ChatMessageType.event}
              />
            ) : (
              <News />
            )}
          </div>
          <div className={styles.columnRight}>{renderBetSidebarContent()}</div>
        </div>
        <ContentFooter className={styles.betFooter} />
      </div>
    </BaseContainerWithNavbar>
  );
};
const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    events: state.event.events,
  };
};

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
    fetchOpenBets: () => {
      dispatch(BetActions.fetchOpenBets());
    },
    fetchTransactions: () => {
      dispatch(TransactionActions.fetchAll());
    },
    fetchChatMessages: eventId => {
      dispatch(ChatActions.fetchByRoom({ roomId: eventId }));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bet);
