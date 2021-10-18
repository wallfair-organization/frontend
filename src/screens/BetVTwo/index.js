import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _ from 'lodash';
import Icon from '../../components/Icon';
import BackLink from '../../components/BackLink';
import LiveBadge from 'components/LiveBadge';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useParams, useHistory } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import EmbedVideo from '../../components/EmbedVideo';
import BetView from '../../components/BetView';
import Chat from '../../components/Chat';
import News from '../../components/News';
import classNames from 'classnames';
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
import { useIsMount } from '../../components/hoc/useIsMount';
import { ReactComponent as LineChartIcon } from '../../data/icons/line-chart-new.svg';
import ActivitiesTracker from '../../components/ActivitiesTracker';
import TimeCounterVTwo from 'components/TimeCounterVTwo';
import { EVENT_CATEGORIES } from 'constants/EventCategories';
import { EventActions } from 'store/actions/event';
import Favorite from 'components/Favorite';
import SwitchButton from 'components/SwitchButton';
import AuthenticationType from 'components/Authentication/AuthenticationType';
// import { trackPageView } from 'config/gtm';

const BET_ACTIONS = {
  Chat: 0,
  News: 1,
  EventTrades: 2,
  MyTrades: 3,
};

const BetVTwo = ({
  showPopup,
  authState,
  userId,
  events,
  fetchOpenBets,
  fetchTransactions,
  fetchChatMessages,
  handleDislaimerHidden,
  bookmarkEvent = () => {},
  bookmarkEventCancel = () => {},
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

    // const currentBetTitle =
    //   isNonStreamed || event.bets.length === 1
    //     ? _.get(event, 'bets[0].marketQuestion')
    //     : _.get(currentBet, 'name');

    // trackPageView({
    //   pageTitle: `Bet - ${currentBetTitle}`,
    // });

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
    } else {
      if (isMounted) {
        setIsReady(true);
      }
    }
  }, [event, isMounted]);

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
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

  const onBetActionSwitch = newIndex => {
    setBetAction(newIndex);
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

  const renderTitle = () => {
    const key = isNonStreamed ? 'bets[0].marketQuestion' : 'name';
    const title = _.get(event, key);
    return <h2>{title}</h2>;
  };

  const renderImage = () => {
    const key = 'previewImageUrl';
    const imgUrl = _.get(event, key);
    return <img src={imgUrl} alt={`trade`} />;
  };

  const getStickerStyle = category => {
    const cat = EVENT_CATEGORIES.find(c => c.value === category);
    if (!cat) return {};
    return {
      backgroundImage: 'url("' + cat.image + '")',
    };
  };

  const renderBetSidebarContent = () => {
    return (
      <div className={styles.betViewWrapper}>
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

        <div className={styles.betViewContent}>
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
  };

  const renderTradeDesc = () => {
    return (
      <p>
        <div dangerouslySetInnerHTML={{ __html: bet.description }}></div>
        <div>
          <strong>Evidence source: </strong>{' '}
          <span dangerouslySetInnerHTML={{ __html: bet.evidenceSource }}></span>
        </div>
      </p>
    );
  };
  const hasOnlineState = event?.state === EVENT_STATES.ONLINE;
  const hasOfflineState = event?.state === EVENT_STATES.OFFLINE;

  let matchMediaMobile = window.matchMedia(`(max-width: ${768}px)`).matches;

  if (!isReady) {
    return null;
  }
  return (
    <BaseContainerWithNavbar withPaddingTop={true} withoutPaddingBottom={true}>
      <div className={styles.bet}>
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
                canDeleteEvent && showPopup(PopupTheme.deleteEvent, { event })
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
                  All bets must be cancelled or deleted in order to delete an
                  event.
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

        {event ? (
          <>
            <div className={styles.headlineContainer}>
              <div className={styles.headlineImage}>
                <div>
                  <div
                    className={classNames([styles.categorySticker])}
                    style={getStickerStyle(event.category)}
                  />

                  {(hasOnlineState || hasOfflineState) && (
                    <div className={styles.streamStateBadge}>
                      {hasOnlineState && <LiveBadge />}
                      {hasOfflineState && <OfflineBadge />}
                    </div>
                  )}
                  {renderImage()}
                </div>
                {matchMediaMobile && (
                  <div className={styles.shareButton}>
                    <Favorite
                      isFavorite={!!event?.bookmarks?.includes(userId)}
                      onBookmark={() => {
                        isLoggedIn()
                          ? bookmarkEvent(event?._id)
                          : showPopup(PopupTheme.auth, {
                              small: true,
                              authenticationType: AuthenticationType.register,
                            });
                      }}
                      onBookmarkCancel={() => {
                        bookmarkEventCancel(event?._id);
                      }}
                      buttonClass={styles.mobileFavorite}
                      isMobile={true}
                    />
                    <Share
                      buttonClass={styles.mobileFavorite}
                      isMobile={true}
                    />
                  </div>
                )}
              </div>
              <div className={styles.headline}>
                {renderTitle()}
                {bet && renderTradeDesc()}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.columnLeft}>
                <div className={styles.timeOutterWrapper}>
                  <div
                    className={classNames(
                      styles.timeLeftCounterContainer,
                      styles.fixedTimer,
                      styles.timerOnlyDesktop
                    )}
                  >
                    {![BetState.resolved, BetState.closed].includes(
                      _.get(bet, 'status')
                    ) && (
                      <>
                        <div className={styles.timerLabel}>Event ends in:</div>

                        <div className={styles.timerParts}>
                          <TimeCounterVTwo endDate={bet?.endDate} />
                        </div>
                      </>
                    )}
                  </div>
                  {event.type === 'non-streamed' && matchMediaMobile && (
                    <div
                      className={styles.diagramButton}
                      onClick={onShowHideChart}
                    >
                      {' '}
                      <LineChartIcon />
                      <SwitchButton checked={showChart} size={`small`} />
                    </div>
                  )}
                </div>
                <div
                  className={classNames(
                    styles.chartMainWrapper,
                    event.type === 'streamed'
                      ? styles.streamContainer
                      : styles.nonStreamContainer
                  )}
                >
                  {event.type === 'non-streamed' ? (
                    <div className={styles.chart}>
                      {((matchMediaMobile && showChart) ||
                        !matchMediaMobile) && (
                        <Chart
                          height={300}
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
                {!matchMediaMobile && (
                  <div className={styles.chatWrapper}>
                    <Chat
                      className={styles.desktopChat}
                      roomId={event._id}
                      chatMessageType={ChatMessageType.event}
                    />
                  </div>
                )}
              </div>
              <div className={styles.columnRight}>
                {!matchMediaMobile && (
                  <div className={styles.shareButton}>
                    <Favorite
                      isFavorite={!!event?.bookmarks?.includes(userId)}
                      onBookmark={() => {
                        isLoggedIn()
                          ? bookmarkEvent(event?._id)
                          : showPopup(PopupTheme.auth, {
                              small: true,
                              authenticationType: AuthenticationType.register,
                            });
                      }}
                      onBookmarkCancel={() => {
                        bookmarkEventCancel(event?._id);
                      }}
                    />
                    <Share />
                  </div>
                )}
                {renderBetSidebarContent()}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.columnFull}>
                {matchMediaMobile && (
                  <div className={styles.chatWrapper}>
                    <Chat
                      className={styles.desktopChat}
                      inputClassName={styles.inputArea}
                      messagesClassName={styles.messageArea}
                      roomId={event._id}
                      chatMessageType={ChatMessageType.event}
                    />
                  </div>
                )}
                {bet && (
                  <div className={styles.evidenceWrapper}>
                    <div className={styles.sectionHeader}>
                      <h4>{`EVIDENCE`}</h4>
                    </div>
                    <div className={styles.evidenceTabContainerDesktop}>
                      <div className={styles.evidenceSource}>
                        <b>Evidence source: </b>{' '}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: bet.evidenceSource,
                          }}
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
                  </div>
                )}
                <div className={styles.activitiesWrapper}>
                  <div className={styles.sectionHeader}>
                    <h4>{`ACTIVITIES`}</h4>
                  </div>
                  <div className={styles.activitiesTabContainerDesktop}>
                    {betId && (
                      <ActivitiesTracker
                        showCategories={false}
                        activitiesLimit={50}
                        betId={betId}
                        className={styles.activitiesTrackerTabBlock}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.newsWrapper}>
                  <div className={styles.sectionHeader}>
                    <h4>{`NEWS`}</h4>
                  </div>
                  <News
                    className={styles.newsContainer}
                    showMoreButton={true}
                    limit={3}
                  />
                </div>
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
    userId: state.authentication.userId,
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
    handleDislaimerHidden: bool => {
      dispatch(GeneralActions.setDisclaimerHidden(bool));
    },
    bookmarkEvent: eventId => {
      dispatch(EventActions.bookmarkEvent({ eventId }));
    },
    bookmarkEventCancel: eventId => {
      dispatch(EventActions.bookmarkEventCancel({ eventId }));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BetVTwo);
