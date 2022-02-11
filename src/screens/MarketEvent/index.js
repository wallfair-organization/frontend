import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _ from 'lodash';
import styles from './styles.module.scss';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useParams, useHistory } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import { BetActions } from 'store/actions/bet';
import { TransactionActions } from 'store/actions/transaction';
import { ChatActions } from 'store/actions/chat';
import { GeneralActions } from 'store/actions/general';
import { EventActions } from 'store/actions/event';
import { OnboardingActions } from 'store/actions/onboarding';
import classNames from 'classnames';
import PopupTheme from '../../components/Popup/PopupTheme';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import AdminOnly from 'components/AdminOnly';
import Icon from '../../components/Icon';
import { EVENT_CATEGORIES } from 'constants/EventCategories';
import { LOGGED_IN } from 'constants/AuthState';
import Favorite from 'components/Favorite';
import Share from '../../components/Share';
import Chat from '../../components/Chat';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import BackLink from '../../components/BackLink';
import BetState from 'constants/BetState';
import TimeCounterVTwo from 'components/TimeCounterVTwo';
import { ReactComponent as LineChartIcon } from '../../data/icons/line-chart-new.svg';
import SwitchButton from 'components/SwitchButton';
import Chart from '../../components/Chart';
import { useChartData } from './hooks/useChartData';
import BetView from '../../components/BetView';
import ActivitiesTracker from '../../components/ActivitiesTracker';
import { getEventBySlug, getOutcomesHistoryForChart } from 'api';

const MarketEvent = ({
  showPopup,
  authState,
  userId,
  events,
  fetchOpenBets,
  fetchTransactions,
  fetchChatMessages,
  handleDislaimerHidden,
  chartParams,
  bookmarkEvent = () => {},
  bookmarkEventCancel = () => {},
  startOnboardingFlow,
}) => {
  const { eventSlug, betSlug } = useParams();
  const [event, setEvent] = useState(null);
  const [canDeleteEvent, setCanDeleteEvent] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState(null);

  const {
    filterActive,
    handleChartPeriodFilter,
  } = useChartData(event?.bet.id);

  const ref = useRef(null);

  window.onresize = () => ref.current && setIsMobile(window.innerWidth < 992);

  useEffect(() => {
    getEventBySlug(eventSlug).then(res => {
      if (!_.isEqual(res, event)) {
        setEvent(res);
        setCanDeleteEvent(res.bet?.status === BetState.canceled);
        fetchChatMessages(res.id);
        fetchChartHistory(res.bet.id);
      }
    });
  }, [eventSlug]);

  const fetchChartHistory = betId => {
    getOutcomesHistoryForChart(betId, chartParams).then(history => {
      setChartData(history);
    });
  };

  const getStickerStyle = category => {
    const cat = EVENT_CATEGORIES.find(c => c.value === category);
    if (!cat) return {};
    return {
      backgroundImage: 'url("' + cat.image + '")',
    };
  };

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const renderImage = () => {
    const key = 'preview_image_url';
    const imgUrl = _.get(event, key);
    return <img src={imgUrl} alt={`trade`} />;
  };

  const renderTitle = () => {
    const key = 'market_question';
    const title = _.get(event.bet, key);
    return <h2>{title}</h2>;
  };

  const onShowHideChart = useCallback(event => {
    setShowChart(current => !current);
  }, []);

  const renderTradeDesc = () => {
    return (
      <p>
        <div dangerouslySetInnerHTML={{ __html: event.bet.description }}></div>
        <div>
          <strong>Evidence source: </strong>{' '}
          <span
            dangerouslySetInnerHTML={{ __html: event.bet.evidence_source }}
          ></span>
        </div>
      </p>
    );
  };

  const renderBetSidebarContent = () => {
    return (
      <div className={styles.betViewWrapper}>
        <div className={styles.betViewContent}>
          <BetView
            event={event}
            closed={false}
            showEventEnd={true}
            fetchChartHistory={fetchChartHistory}
          />
        </div>
      </div>
    );
  };

  let matchMediaMobile = window.matchMedia(`(max-width: ${768}px)`).matches;

  return (
    <BaseContainerWithNavbar withPaddingTop={true} withoutPaddingBottom={true}>
      <div className={styles.bet}>
        {event ? (
          <>
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
              </div>
            </AdminOnly>
            <div className={styles.headlineContainer}>
              <div className={styles.headlineImage}>
                <div>
                  <div
                    className={classNames([styles.categorySticker])}
                    style={getStickerStyle(event.category)}
                  />
                  {renderImage()}
                </div>
                {matchMediaMobile && (
                  <div className={styles.shareButton}>
                    <Favorite
                      isFavorite={!!event?.bookmarks?.includes(userId)}
                      onBookmark={() => {
                        isLoggedIn()
                          ? bookmarkEvent(event?.id)
                          : startOnboardingFlow();
                      }}
                      onBookmarkCancel={() => {
                        bookmarkEventCancel(event?.id);
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
                {event.bet && renderTradeDesc()}
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
                      _.get(event.bet, 'status')
                    ) && (
                      <>
                        <div className={styles.timerLabel}>Event ends in:</div>

                        <div className={styles.timerParts}>
                          <TimeCounterVTwo endDate={event.bet.end_date} />
                        </div>
                      </>
                    )}
                  </div>
                  {matchMediaMobile && (
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
                    styles.nonStreamContainer
                  )}
                >
                  <div className={styles.chart}>
                    {((matchMediaMobile && showChart) || !matchMediaMobile) &&
                      chartData && (
                        <Chart
                          height={300}
                          data={chartData}
                          filterActive={filterActive}
                          handleChartPeriodFilter={handleChartPeriodFilter}
                        />
                      )}
                  </div>
                </div>
                {!matchMediaMobile && (
                  <div className={styles.chatWrapper}>
                    <Chat
                      className={styles.desktopChat}
                      roomId={event.id}
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
                          ? bookmarkEvent(event?.id)
                          : showPopup(PopupTheme.loginRegister, {
                              small: false,
                            });
                      }}
                      onBookmarkCancel={() => {
                        bookmarkEventCancel(event?.id);
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
                      roomId={event.id}
                      chatMessageType={ChatMessageType.event}
                    />
                  </div>
                )}

                <div className={styles.evidenceWrapper}>
                  <div className={styles.sectionHeader}>
                    <h4>{`EVIDENCE`}</h4>
                  </div>
                  <div className={styles.evidenceTabContainerDesktop}>
                    <div className={styles.evidenceSource}>
                      <b>Evidence source: </b>{' '}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: event.bet.evidence_source,
                        }}
                      ></span>
                    </div>
                    <br />
                    <div className={styles.evidenceDescription}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: event.bet.evidence_description,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className={styles.activitiesWrapper}>
                  <div className={styles.sectionHeader}>
                    <h4>{`ACTIVITIES`}</h4>
                  </div>
                  <div className={styles.activitiesTabContainerDesktop}>
                    <ActivitiesTracker
                      showCategories={false}
                      activitiesLimit={50}
                      betId={event.bet.id}
                      className={styles.activitiesTrackerTabBlock}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.eventNotExist}>
            <BackLink to="/events/all" text="Events"></BackLink>
            <div>Event does not exist.</div>

            <div className={styles.eventNotExistLabel}>
              {window.location.href}
            </div>
          </div>
        )}
      </div>
    </BaseContainerWithNavbar>
  );
};
const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    userId: state.authentication.userId,
    chartParams: state.chartParams,
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
    startOnboardingFlow: () => {
      dispatch(OnboardingActions.start());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MarketEvent);
