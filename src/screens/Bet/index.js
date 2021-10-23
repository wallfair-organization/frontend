import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _ from 'lodash';
import Icon from '../../components/Icon';
import Link from '../../components/Link';
import BackLink from '../../components/BackLink';
import LiveBadge from 'components/LiveBadge';
import AllTrades from '../../components/AllTrades';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { Carousel } from 'react-responsive-carousel';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useParams, useHistory } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import EmbedVideo from '../../components/EmbedVideo';
import BetView from '../../components/BetView';
import RelatedBetCard from '../../components/RelatedBetCard';
import MyTradesList from '../../components/MyTradesList';
import Chat from '../../components/Chat';
import News from '../../components/News';
import TabOptions from '../../components/TabOptions';
import classNames from 'classnames';
import { SwiperSlide, Swiper } from 'swiper/react';
import EventTradesContainer from '../../components/EventTradesContainer';
import EventTradeViewsHelper from '../../helper/EventTradeViewsHelper';
import { LOGGED_IN } from 'constants/AuthState';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import PopupTheme from '../../components/Popup/PopupTheme';
import { BetActions } from 'store/actions/bet';
import { useBetPreviousLocation } from './hooks/useBetPreviousLocation';
import Chart from '../../components/Chart';
import { useChartData } from './hooks/useChartData';
import { useNewsFeed } from './hooks/useNewsFeed';
import { useTabOptions } from './hooks/useTabOptions';
import AdminOnly from 'components/AdminOnly';
import { selectOpenBets } from 'store/selectors/bet';
import { TransactionActions } from 'store/actions/transaction';
import { ChatActions } from 'store/actions/chat';
import { GeneralActions } from 'store/actions/general';
import ContentFooter from 'components/ContentFooter';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import OfflineBadge from 'components/OfflineBadge';
import { EVENT_STATES } from 'constants/EventStates';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import EventTypes from 'constants/EventTypes';
import Share from '../../components/Share';
import useTrades from '../../hooks/useTrades';
import BetState from 'constants/BetState';
import TimeCounter from '../../components/TimeCounter';
import { useIsMount } from '../../components/hoc/useIsMount';
import { ReactComponent as LineChartIcon } from '../../data/icons/line-chart.svg';
import ActivitiesTracker from '../../components/ActivitiesTracker';
// import { trackPageView } from 'config/gtm';

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
  handleDislaimerHidden,
  userId,
}) => {
  const { eventSlug, betSlug } = useParams();
  const isMounted = useIsMount();

  const [betId, setBetId] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [betAction, setBetAction] = useState(0);
  const [betViewIsOpen, setBetViewIsOpen] = useState(false);
  const [singleBet, setSingleBet] = useState(false);
  const [event, setEvent] = useState(null);
  const [relatedBets, setRelatedBets] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isReady, setIsReady] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [title, setTitle] = useState('');

  const mobileChatRef = useRef(null);
  const ref = useRef(null);
  const history = useHistory();

  const onShowHideChart = useCallback(event => {
    setShowChart(current => !current);
  }, []);

  const openBets = useSelector(selectOpenBets);

  const currentFromLocation = useBetPreviousLocation();
  const {
    chartData,
    filterActive,
    handleChartPeriodFilter,
    handleChartDirectionFilter,
  } = useChartData(betId);

  useNewsFeed(event);

  const isNonStreamed = _.get(event, 'type') === EventTypes.nonStreamed;
  const canDeleteEvent = _.get(event, 'bets')?.every(
    ({ status }) => status === BetState.canceled
  );

  const { tabOptions, handleSwitchTab, selectedTab } = useTabOptions(event);
  const { activeBets } = useTrades(event?._id);

  const bet = _.find(_.get(event, 'bets', []), {
    _id: betId,
  });

  const status = {
    active: 1,
    resolved: 2,
    closed: 3,
  };

  window.onresize = () => ref.current && setIsMobile(window.innerWidth < 992);

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
    const currentBetId =
      isNonStreamed || event.bets.length === 1
        ? _.get(event, 'bets[0]._id')
        : _.get(currentBet, '_id');
    setBetId(currentBetId);

    const key = isNonStreamed ? 'bets[0].marketQuestion' : 'name';
    const title = _.get(event, key);
    setTitle(title);

    if (betSlug) {
      selectBet(currentBetId, betSlug);
    }

    if (
      !isMobile &&
      eventBets.length === 1 &&
      !singleBet &&
      !betSlug &&
      !betViewIsOpen
    ) {
      selectSingleBet(eventBets);
    }

    fetchChatMessages(event._id);
    fetchOpenBets();
    fetchTransactions();

    return () => (ref.current = false);
  }, [eventSlug, betSlug, event]);

  useEffect(() => {
    if (!event) return;
    if (
      ref.current &&
      !isMobile &&
      !betSlug &&
      !singleBet &&
      !betViewIsOpen &&
      (relatedBets.length === 1 || isNonStreamed)
    ) {
      selectSingleBet();
    }
    if (!isMobile) {
      setBetAction(BET_ACTIONS.EventTrades);
    }
    if (isMobile && (isNonStreamed || relatedBets.length === 1)) {
      onBetClose()();
      setBetAction(BET_ACTIONS.EventTrades);
    }
  }, [isMobile, relatedBets, event]);

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      swiper.slideTo(betAction);
    }
  }, [betAction]);

  useEffect(() => {
    if (event) {
      setIsReady(true);
      const timerId = setTimeout(() => {
        if (hasAcceptedTerms() && !isPopupDisplayed(event)) {
          showPopup(PopupTheme.explanation);
          localStorage.setItem(`eventHowDoesItWorkTip-${event.type}`, true);
        }
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      if (isMounted) {
        setIsReady(true);
      }
    }
  }, [event, isMounted]);

  const hasAcceptedTerms = () => {
    return localStorage.getItem('acceptedTerms') || false;
  };

  const isPopupDisplayed = () => {
    return localStorage.getItem(`eventHowDoesItWorkTip-${event.type}`) || false;
  };

  const onBetClose = () => {
    return () => {
      const eventSlug = _.get(event, 'slug', null);

      history.replace(
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
  };

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const selectSingleBet = bets => {
    if (singleBet) return;

    if (relatedBets?.length || bets?.length) {
      const loneBet = _.get(relatedBets.length ? relatedBets : bets, '[0]');
      const betId = _.get(loneBet, '_id');
      const betSlug = _.get(loneBet, 'slug');
      selectBet(betId, betSlug);
      setSingleBet(true);
    }
  };

  const selectBet = (betId, betSlug) => {
    history.replace(
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
      const betSlug = _.get(bet, 'slug');

      selectBet(betId, betSlug);
      setBetId(betId);
    };
  };

  const renderNoTrades = () => {
    return <div className={styles.relatedBetsNone}>No trades placed.</div>;
  };

  const getRelatedBetSliderPages = (bets, size) => {
    return _.ceil(_.size(bets) / size);
  };

  const renderTitle = () => {
    const key = isNonStreamed ? 'bets[0].marketQuestion' : 'name';
    const title = _.get(event, key);
    return <h2>{title}</h2>;
  };

  const renderRelatedBetList = (popup = false) => {
    return _.map(relatedBets, (bet, index) => {
      return renderRelatedBetCard(bet, index, popup);
    });
  };

  const renderMyTradesList = () => {
    if (!isLoggedIn() || activeBets.length < 1) {
      return renderNoTrades();
    }

    return (
      <div className={styles.myTrades}>
        <MyTradesList bets={activeBets} withStatus={true} allowCashout={true} />
      </div>
    );
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
      EventTradeViewsHelper.getView('Event Trades'),
      event.type === 'non-streamed'
        ? EventTradeViewsHelper.getView('Evidence', undefined, false)
        : EventTradeViewsHelper.getView(
            'My Trades',
            isLoggedIn() ? activeBets.length : 0,
            true
          ),
      ...(isNonStreamed && [EventTradeViewsHelper.getView('All Trades')]),
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

    if (!isLoggedIn() || activeBets.length < 1) {
      return renderNoTrades();
    }

    return (
      <div className={styles.relatedBets}>
        <Carousel
          className={classNames(
            styles.relatedBetsCarousel,
            activeBets.length > 2 ? '' : styles.oneCarouselPage
          )}
          dynamicHeight={false}
          emulateTouch={true}
          infiniteLoop={true}
          autoPlay={false}
          showArrows={false}
          showStatus={false}
          interval={1e11}
        >
          {renderMyTradesList()}
        </Carousel>
      </div>
    );
  };

  const renderMobileContent = () => {
    return (
      <Swiper
        className={'swiper-events-tabs'}
        slidesPerView={1}
        pagination={{
          clickable: false,
        }}
        autoHeight={true}
        onSlideChange={swiper => {
          handleDislaimerHidden(!swiper.activeIndex);
          onBetActionSwitch(swiper.activeIndex);
        }}
        onSwiper={onSwiper}
        noSwipingClass={`MuiSlider-root`}
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
          {!isNonStreamed && relatedBets.length > 1 ? (
            <div>{renderRelatedBetList(true)}</div>
          ) : (
            <BetView
              betId={betId}
              eventId={event._id}
              openBets={_.filter(openBets, {
                betId: betId,
              })}
              closed={false}
              showEventEnd={true}
              handleChartDirectionFilter={handleChartDirectionFilter}
            />
          )}
        </SwiperSlide>
        <SwiperSlide className={styles.carouselSlide}>
          {isNonStreamed ? (
            bet && (
              <div>
                <div className={styles.evidenceSource}>
                  <b>Evidence source: </b>{' '}
                  <span
                    dangerouslySetInnerHTML={{ __html: bet.evidenceSource }}
                  ></span>
                </div>
                <br />
                <div className={styles.evidenceDescription}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: bet.evidenceDescription,
                    }}
                  ></div>
                </div>
              </div>
            )
          ) : (
            <div>{renderMyTradesList()}</div>
          )}
        </SwiperSlide>
        <SwiperSlide className={styles.carouselSlide}>
          <div>All Trades</div>
        </SwiperSlide>
      </Swiper>
    );
  };

  const renderBetSidebarContent = () => {
    if (betViewIsOpen) {
      return (
        <div>
          {event.type === EventTypes.streamed && relatedBets.length > 1 && (
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
            {![BetState.resolved, BetState.closed].includes(
              _.get(bet, 'status')
            ) && (
              <>
                <div
                  className={classNames(
                    styles.timeLeftCounterContainer,
                    styles.fixedTimer,
                    styles.timerOnlyDesktop
                  )}
                >
                  <div className={styles.timerLabel}>Event ends in:</div>

                  <div className={styles.timerParts}>
                    <TimeCounter endDate={bet?.endDate} />
                  </div>
                </div>
              </>
            )}

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

  const hasOnlineState = event?.state === EVENT_STATES.ONLINE;
  const hasOfflineState = event?.state === EVENT_STATES.OFFLINE;

  let matchMediaMobile = window.matchMedia(`(max-width: ${768}px)`).matches;

  const renderTradeDesc = (withTitle = false) => {
    const evidenceSource = bet.evidenceSource;

    return (
      <>
        <div className={styles.descriptionContainer}>
          {evidenceSource && withTitle && (
            <h4 className={styles.tradeDescTitle}>Evidence Source</h4>
          )}
          <p className={classNames(styles.tradeDesc)}>
            <div
              className={styles.betDescription}
              dangerouslySetInnerHTML={{ __html: bet.description }}
            ></div>
            <div className={styles.evidenceSource}>
              <b>Evidence source: </b>{' '}
              <span
                dangerouslySetInnerHTML={{ __html: bet.evidenceSource }}
              ></span>
            </div>
          </p>
        </div>

        <div className={styles.timerOnlyMobile}>
          {![BetState.resolved, BetState.closed].includes(
            _.get(bet, 'status')
          ) && (
            <>
              <div
                className={classNames(
                  styles.timeLeftCounterContainer,
                  styles.fixedTimer
                )}
              >
                <div className={styles.timerLabel}>Event ends in:</div>

                <div className={styles.timerParts}>
                  <TimeCounter
                    endDate={bet.endDate}
                    externalStyles={{
                      timePartContainer: styles.timePartContainer,
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  if (!isReady) {
    return null;
  }

  return (
    <BaseContainerWithNavbar withPaddingTop={true} withoutPaddingBottom={true}>
      <div className={styles.bet}>
        <div className={styles.upperLeftOval}></div>
        <div className={styles.centeredBottomOval}></div>
        {event ? (
          <>
            <div className={styles.headlineContainer}>
              <div>
                <Link
                  to={currentFromLocation?.pathname || '/'}
                  className={styles.linkBack}
                >
                  <div className={styles.arrowBack}></div>
                  <div className={styles.headline}>
                    {renderTitle()}
                    {(hasOnlineState || hasOfflineState) && (
                      <div className={styles.streamStateBadge}>
                        {hasOnlineState && <LiveBadge />}
                        {hasOfflineState && <OfflineBadge />}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
              <div className={styles.shareButton}>
                <Share
                  popupPosition={
                    matchMediaMobile ? '' : title.length < 16 ? 'right' : 'left'
                  }
                />
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
                  <span
                    className={classNames(
                      styles.deleteEventLink,
                      !canDeleteEvent && styles.fadedLink
                    )}
                    onClick={() =>
                      canDeleteEvent &&
                      showPopup(PopupTheme.deleteEvent, { event })
                    }
                  >
                    <Icon
                      className={styles.icon}
                      iconType={IconType.trash}
                      iconTheme={IconTheme.white}
                      height={20}
                      width={20}
                    />
                    Delete Event
                    {!canDeleteEvent && (
                      <span className={styles.infoTooltip}>
                        All bets must be cancelled or deleted in order to delete
                        an event.
                      </span>
                    )}
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
                      {bet && renderTradeDesc()}
                      {matchMediaMobile && (
                        <div
                          className={styles.diagramButton}
                          onClick={onShowHideChart}
                        >
                          {' '}
                          <LineChartIcon />
                          <span>
                            {showChart
                              ? 'Hide probabilities'
                              : 'Show probabilities'}
                          </span>
                        </div>
                      )}
                      {((matchMediaMobile && showChart) ||
                        !matchMediaMobile) && (
                        <Chart
                          height={matchMediaMobile ? 300 : 400}
                          data={chartData}
                          filterActive={filterActive}
                          handleChartPeriodFilter={handleChartPeriodFilter}
                        />
                      )}
                    </div>
                  ) : (
                    <div className={styles.streamPositioner}>
                      <EmbedVideo
                        video={event.streamUrl}
                        autoPlay={true}
                        controls={true}
                      />
                    </div>
                  )}
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
                {selectedTab === 'chat' && (
                  <Chat
                    className={styles.desktopChat}
                    roomId={event._id}
                    chatMessageType={ChatMessageType.event}
                  />
                )}

                {selectedTab === 'news' && <News />}

                {selectedTab === 'evidence' && (
                  <div className={styles.evidenceTabContainerDesktop}>
                    <div className={styles.evidenceSource}>
                      <b>Evidence source: </b>{' '}
                      <span
                        dangerouslySetInnerHTML={{ __html: bet.evidenceSource }}
                      ></span>
                    </div>
                    <br />
                    <div className={styles.evidenceDescription}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: bet.evidenceDescription,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {selectedTab === 'activities' && (
                  <div className={styles.activitiesTabContainerDesktop}>
                    <ActivitiesTracker
                      showCategories={false}
                      activitiesLimit={50}
                      betId={betId}
                      className={styles.activitiesTrackerTabBlock}
                    />
                  </div>
                )}

                {selectedTab === 'all trades' && (
                  <div className={styles.activitiesTabContainerDesktop}>
                    <AllTrades bet={event.bets[0]} currentUserId={userId} />
                  </div>
                )}
              </div>
              <div className={styles.columnRight}>
                {renderBetSidebarContent()}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.eventNotExist}>
            <BackLink to="/" text="Home"></BackLink>
            <div>Event does not exist.</div>

            <div className={styles.eventNotExistLabel}>
              {window.location.href}
            </div>
          </div>
        )}
        <ContentFooter className={styles.betFooter} />
      </div>
    </BaseContainerWithNavbar>
  );
};
const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    events: state.event.events,
    userId: state.authentication.userId,
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
    handleDislaimerHidden: bool => {
      dispatch(GeneralActions.setDisclaimerHidden(bool));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bet);
