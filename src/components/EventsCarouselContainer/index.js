import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import CarouselContainer from '../CarouselContainer';
import { EventActions } from '../../store/actions/event';
import styles from './styles.module.scss';
import BetCard from 'components/BetCard';
import BetState from 'constants/BetState';
import { PopupActions } from '../../store/actions/popup';
import { OnboardingActions } from 'store/actions/onboarding';
import { useEventsFilter } from 'components/Events/hooks/useEventsFilter';
import { isMobile } from 'react-device-detect';

const EventsCarouselContainer = ({
  eventType = 'non-streamed',
  statuses = [BetState.active],
  category = 'all',
  orderBy = 'created_at',
  order = 'DESC',
  title,
  titleLink,
  titleLinkTo,
  noEventsMessage = 'No events',
  userId,
}) => {
  const location = useLocation();
  const carouselProps = {
    streamed: {
      title: 'Live Events',
      titleLink: 'Discover more',
      titleLinkTo: '/live-events',
    },
    'non-streamed': {
      title: 'Events',
      titleLink: 'Show all',
      titleLinkTo: '/events',
    },
  };

  const { events } = useEventsFilter(statuses, category, undefined, false, undefined, undefined, orderBy, order);

  const [page, setPage] = useState(1);
  const COUNT = 4;

  // const [currentEvents, setCurrentEvents] = useState([]);
  // const [allLoaded, setAllLoaded] = useState(false);
  
  // let params = {
  //   eventType,
  //   statuses,
  //   category,
  //   deactivated,
  //   page,
  //   count: COUNT,
  // };

  // const getEvents = params => {
  //   fetchEvents(params);
  //   setCurrentEvents(events[eventType][state]);
  //   setAllLoaded(events[eventType][state]?.length <= COUNT);
  // };

  // useEffect(() => {
  //   getEvents(params);
  // }, [category]);

  // useEffect(() => {
  //   const stateEvents = events[eventType][state];
  //   setCurrentEvents(stateEvents);

  //   if (stateEvents?.length !== 0) {
  //     setAllLoaded(stateEvents?.length < COUNT);
  //   } else if (page !== 1) {
  //     setAllLoaded(true);
  //     setPage(page - 1);
  //   }
  // }, [events, eventType, page, state]);

  // const nextPage = () => {
  //   const next = page + 1;
  //   const query = { ...params, page: next };
  //   fetchEvents(query);
  //   setPage(next);
  // };

  // const previousPage = () => {
  //   const previous = page - 1;
  //   const query = { ...params, page: previous };
  //   fetchEvents(query);
  //   setPage(previous);
  // };

  // const showJoinPopup = useCallback(event => {
  //   startOnboarding();
  // }, []);


  const renderBetCards = () => {
    return _.map(events, (event) => {
      const bet = event.bet;
      const betId = _.get(event.bet, 'id');
      const eventSlug = _.get(event, 'slug');
      const betSlug = _.get(bet, 'slug');
      const tags = _.get(event, 'tags');
      const marketQuestion = _.get(bet, 'market_question');
      const outcomes = _.get(bet, 'outcomes');

      return (
        <Link
          key={betId}
          to={{
            // pathname: `/trade/${eventSlug}/${betSlug}`,
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
            eventCardClass={styles.eventCardHome}
            category={event?.category ? event.category : 'all'}
            isBookmarked={!!bet?.bookmarks?.includes(userId)}
            tags={tags}
            onBookmark={e => {
              e.preventDefault();
              e.stopPropagation();
              // if (!userId) {
              //   return showJoinPopup(e);
              // }
              // bookmarkEvent(bet.eventId);
            }}
            onBookmarkCancel={e => {
              e.preventDefault();
              e.stopPropagation();
              // bookmarkEventCancel(bet.eventId);
            }}
          />
        </Link>
      );
    });
  };

  return (
    <CarouselContainer
      title={title ?? carouselProps[eventType].title}
      titleLink={!isMobile && titleLink ? titleLink : carouselProps[eventType].titleLink}
      titleLinkTo={titleLinkTo ?? carouselProps[eventType].titleLinkTo}
      prevArrowInactive={page === 1}
      nextArrowInactive={events.length <= COUNT}
      // onNext={nextPage}
      // onPrevious={previousPage}
      onNext={() => {}}
      onPrevious={() => {}}
    >
      {eventType === 'non-streamed' && events?.length > 0 &&
        renderBetCards()
      }
      {events?.length === 0 && (
        <div className={styles.noEventsBox}>{noEventsMessage}</div>
      )}
    </CarouselContainer>
  );
};

const mapStateToProps = state => {
  return {
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
    bookmarkEvent: eventId => {
      dispatch(EventActions.bookmarkEvent({ eventId }));
    },
    bookmarkEventCancel: eventId => {
      dispatch(EventActions.bookmarkEventCancel({ eventId }));
    },
    startOnboarding: () => {
      dispatch(OnboardingActions.start());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsCarouselContainer);
