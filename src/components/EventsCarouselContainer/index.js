import { useEffect, useState } from 'react';
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
// import { useEventsFilter } from 'components/Events/hooks/useEventsFilter';
import { isMobile } from 'react-device-detect';
import { getMarketEvents } from 'api';

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

  const [page, setPage] = useState(0);
  const limit = 4;

  // const { events, count } = useEventsFilter(
  //   statuses,
  //   category,
  //   page,
  //   false,
  //   COUNT,
  //   undefined,
  //   orderBy,
  //   order
  // );

  const params = {
    category,
    statuses,
    page,
    limit,
    orderBy,
    order,
  };

  const [events, setEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [count, setCount] = useState();

  const getEvents = (page) => {
    getMarketEvents({
      ...params,
      page,
    }).then(res => {
      setCurrentEvents(res.events);
      setEvents([...events, ...res.events]);
      setCount(res.count);
    });
  }

  useEffect(() => {
    getEvents(page);
  }, []);

  // LIMIT: 4
  // PAGE: 0
  const setNext = () => {
    const p = page + 1;
    setPage(p);
    // [0,1,2,3,4,5,6,7,8,9,10]
    if (events.length > limit * p) {
      // debugger;
      setCurrentEvents(events.slice(p * limit));
    } else {
      getEvents(p);
    }
  }

  const setPrevious = () => {
    const p = page - 1;
    setPage(p);
    setCurrentEvents(events.slice(p * limit));
  };

  const renderBetCards = () => {
    return _.map(currentEvents, (event) => {
      const bet = event.bet;
      const betId = _.get(event.bet, 'id');
      const eventSlug = _.get(event, 'slug');
      const tags = _.get(event, 'tags');
      const marketQuestion = _.get(bet, 'market_question');
      const outcomes = _.get(bet, 'outcomes');

      return (
        <Link
          key={event.id}
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
      titleLink={
        !isMobile && titleLink ? titleLink : carouselProps[eventType].titleLink
      }
      titleLinkTo={titleLinkTo ?? carouselProps[eventType].titleLinkTo}
      prevArrowInactive={page === 0}
      nextArrowInactive={count - (page * limit) <= 4}
      onNext={setNext}
      onPrevious={setPrevious}
    >
      {eventType === 'non-streamed' && events.length > 0 && renderBetCards()}
      {events.length === 0 && (
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
