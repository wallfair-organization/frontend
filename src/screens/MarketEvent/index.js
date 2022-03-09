import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _ from 'lodash';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import { TransactionActions } from 'store/actions/transaction';
import { ChatActions } from 'store/actions/chat';
import { GeneralActions } from 'store/actions/general';
import { OnboardingActions } from 'store/actions/onboarding';
import classNames from 'classnames';
import PopupTheme from '../../components/Popup/PopupTheme';
import { LOGGED_IN } from 'constants/AuthState';
import Favorite from 'components/Favorite';
import Share from '../../components/Share';
import Chat from '../../components/Chat';
import ChatMessageType from 'components/ChatMessageWrapper/ChatMessageType';
import BackLink from '../../components/BackLink';
import BetState from 'constants/BetState';
import TimeCounterVTwo from 'components/TimeCounterVTwo';
import Chart from '../../components/Chart';
import { useChartData } from './hooks/useChartData';
import BetView from '../../components/BetView';
import ActivitiesTracker from '../../components/ActivitiesTracker';
import { bookmarkEvent, bookmarkEventCancel, getEventBySlug, getOutcomesHistoryForChart } from 'api';
import { ReactComponent as ArrowLeft } from 'data/icons/arrow-left.svg';
import Routes from 'constants/Routes';
import EventShareWidget from 'components/EventShareWidget';
import BetActionsMenu from 'components/BetActionsMenu';

const MarketEvent = ({
  showPopup,
  authState,
  userId,
  fetchChatMessages,
  chartParams,
  isAdmin,
  activities,
}) => {
  const { eventSlug, betSlug } = useParams();
  const [event, setEvent] = useState(null);
  const [canDeleteEvent, setCanDeleteEvent] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const userCreator = userId === event?.bet?.creator;

  const activitiesRef = useRef([]);

  const { filterActive, handleChartPeriodFilter } = useChartData(
    event?.bet?.id
  );

  useEffect(() => {
    getEventBySlug(eventSlug)
      .then(res => {
        if (!_.isEqual(res, event)) {
          setEvent(res);
          setIsFavorite(!!res.bookmarks?.find(b => b.user_id === userId));
          setCanDeleteEvent(res.bet.status === BetState.canceled);
          fetchChatMessages(res.id);
          fetchChartHistory(res.bet.id);
        }
      })
      .catch(() => {
        history.push(
          Routes.getRouteWithParameters(Routes.events, { category: 'all' })
        );
      });
  }, [eventSlug, betSlug]);

  useEffect(() => {
    if (activities.length && activities.length !== activitiesRef.current.length) {
      activitiesRef.current = activities;
      getEventBySlug(eventSlug)
        .then(res => setEvent(res));
    }
  }, [activities]);

  const fetchChartHistory = betId => {
    getOutcomesHistoryForChart(betId, chartParams).then(history => {
      setChartData(history);
    });
  };

  useEffect(() => {
    if(event) {
      fetchChartHistory(event.bet.id);
    }
  }, [chartParams]);

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const renderBetSidebarContent = () => {
    return (
      <div className={styles.betViewWrapper}>
        <div className={styles.betViewContent}>
          <BetView
            event={event}
            closed={false}
            showEventEnd={true}
          />
        </div>
      </div>
    );
  };

  const renderOptions = () => {
    if (!isLoggedIn()) return null;

    return (
      <div className={styles.shareButton}>
        <Favorite
          isFavorite={isFavorite}
          onBookmark={() => {
            isLoggedIn()
              ? bookmarkEvent(event?.id).then(() => setIsFavorite(true))
              : showPopup(PopupTheme.loginRegister, {
                  small: false,
                });
          }}
          onBookmarkCancel={() => {
            bookmarkEventCancel(event?.id).then(() => setIsFavorite(false));
          }}
        />
        <Share popupPosition={'bottom'} skipCalculatePos={true} />
        <BetActionsMenu event={event} bet={event?.bet} />
      </div>
    );
  };

  const renderTimer = () => {
    return (
      <div className={styles.timeLeftCounterContainer}>
        {![BetState.resolved, BetState.closed].includes(
          _.get(event.bet, 'status')
        ) && (
          <>
            <div className={styles.timerLabel}>Event ends in:</div>

            <div className={styles.timerParts}>
              <TimeCounterVTwo
                externalStyles={styles}
                endDate={event.bet?.end_date}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  let matchMediaMobile = window.matchMedia(`(max-width: ${768}px)`).matches;

  return (
    <BaseContainerWithNavbar withPaddingTop={true} withoutPaddingBottom={true}>
      <div className={styles.bet}>
        {event ? (
          <>
            {/* {isLoggedIn && (userCreator || isAdmin) && (
              <div className={styles.eventAdminActionsContainer}>
                <span
                  className={styles.editEventLink}
                  onClick={() =>
                    showPopup(PopupTheme.eventForms, { event, bet: event.bet })
                  }
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
            )} */}
            <div className={styles.topContainer}>
              <div className={styles.eventTopContainer}>
                <div className={styles.backButtonTitle}>
                  <button
                    onClick={() =>
                      history.push(
                        Routes.getRouteWithParameters(Routes.events, {
                          category: 'all',
                        })
                      )
                    }
                  >
                    <ArrowLeft />

                    <span className={styles.titleLabelMobile}>{event.name}</span>
                    <span className={styles.titleLabel}>Back to events</span>

                  </button>
                </div>
                <div className={styles.timerShareContainer}>
                  {renderTimer()}
                  {renderOptions()}
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.columnLeft}>
                {renderBetSidebarContent()}
              </div>
              <div className={styles.columnRight}>
                <div className={classNames(styles.chartMainWrapper)}>
                  <div className={styles.chart}>
                    {/* {!matchMediaMobile && chartData && ( */}
                    {chartData && (
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
                      showHeadline={true}
                    />
                  </div>
                )}
              </div>
            </div>
            <EventShareWidget />
            <div className={styles.row}>
              <div className={styles.columnFull}>
                {/* {matchMediaMobile && (
                  <div className={styles.chatWrapper}>
                    <Chat
                      className={styles.desktopChat}
                      inputClassName={styles.inputArea}
                      messagesClassName={styles.messageArea}
                      roomId={event.id}
                      chatMessageType={ChatMessageType.event}
                      showHeadline={true}
                    />
                  </div>
                )} */}

                
                <div className={styles.activitiesWrapper}>
                  <div className={styles.sectionHeader}>
                    <h4>{`Activities`}</h4>
                  </div>
                  <div className={styles.activitiesTabContainerDesktop}>
                    <ActivitiesTracker
                      showCategories={false}
                      activitiesLimit={50}
                      betId={event.bet?.id}
                      className={styles.activitiesTrackerTabBlock}
                      showBetName={false}
                    />
                  </div>
                </div>
                <div className={styles.evidenceWrapper}>
                  <div className={styles.sectionHeader}>
                    <h4>{`Evidence`}</h4>
                  </div>
                  <div className={styles.evidenceTabContainerDesktop}>
                    <div className={styles.evidenceSource}>
                      <b>Evidence source: </b>{' '}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: event.bet?.evidence_source,
                        }}
                      ></span>
                    </div>
                    <br />
                    <div className={styles.evidenceDescription}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: event.bet?.evidence_description,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.eventNotExist}>
            <BackLink to="/events/all" text="Events"></BackLink>
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
    isAdmin: state.authentication.admin,
    chartParams: state.chartParams,
    activities: state.notification.activities
      .filter((a) => a.data.roomId === state.websockets.room),
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
    fetchTransactions: () => {
      dispatch(TransactionActions.fetchAll());
    },
    fetchChatMessages: eventId => {
      dispatch(ChatActions.fetchByRoom({ roomId: eventId }));
    },
    handleDislaimerHidden: bool => {
      dispatch(GeneralActions.setDisclaimerHidden(bool));
    },
    startOnboardingFlow: () => {
      dispatch(OnboardingActions.start());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MarketEvent);
