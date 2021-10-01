import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import CarouselContainer from '../CarouselContainer';
import EventCard from '../EventCard';
import { EventActions } from '../../store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import styles from './styles.module.scss';
import BetCard from 'components/BetCard';

const EventsCarouselContainer = ({
  events,
  eventType,
  state = 'all',
  category = 'all',
  deactivated = false,
  upcoming = false,
  title,
  titleLink,
  noEventsMessage = 'No events',
  fetchEvents,
}) => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const isMount = useIsMount();

  const allEvents = useSelector(state => state.event.events);

  const COUNT = 4;
  const carouselProps = {
    streamed: {
      title: 'Live Events',
      titleLink: 'Discover more',
      titleLinkTo: '/live-events',
    },
    'non-streamed': {
      title: 'Events',
      titleLink: 'Discover more',
      titleLinkTo: '/events',
    },
  };

  let params = {
    eventType,
    state,
    category,
    deactivated,
    upcoming,
    page,
    count: COUNT,
  };

  const getEvents = params => {
    fetchEvents(params);
    setCurrentEvents(events[eventType][state]);
    setAllLoaded(events[eventType][state]?.length <= COUNT);
  };

  useEffect(() => {
    getEvents(params);
  }, [category]);

  useEffect(() => {
    const stateEvents = events[eventType][state];
    setCurrentEvents(stateEvents);

    if (stateEvents?.length !== 0) {
      setAllLoaded(stateEvents?.length < COUNT);
    } else if (page !== 1) {
      setAllLoaded(true);
      setPage(page - 1);
    }
  }, [events, eventType, page, state]);

  const nextPage = () => {
    const next = page + 1;
    const query = { ...params, page: next };
    fetchEvents(query);
    setPage(next);
  };

  const previousPage = () => {
    const previous = page - 1;
    const query = { ...params, page: previous };
    fetchEvents(query);
    setPage(previous);
  };

  const renderLiveEvents = () => {
    return _.map(currentEvents, event => {
      const eventId = _.get(event, '_id');
      const eventSlug = _.get(event, 'slug');
      const mappedTags = _.map(event.tags, tag => tag.name);

      return (
        <Link
          key={eventId}
          to={{
            pathname: `/trade/${eventSlug}`,
            state: { fromLocation: location },
          }}
          className={styles.eventLink}
        >
          <EventCard
            key={eventId}
            title={event.name}
            organizer={''}
            viewers={12345}
            live={eventType === 'streamed'}
            tags={mappedTags}
            image={event.previewImageUrl}
            eventEnd={event.date}
            eventCardClass={styles.eventCardHome}
            streamUrl={event.streamUrl}
            state={event.state}
          />
        </Link>
      );
    });
  };

  const renderBetCards = () => {
    //Improvement: use API endpoint /event/bets/... to list and filter bets

    const allBets = allEvents.reduce((acc, current) => {
      const bets = current.bets.map(bet => ({
        ...bet,
        eventSlug: current.slug,
        previewImageUrl: current.previewImageUrl,
        tags: _.map(current.tags, tag => tag.name),
      }));
      const concat = [...acc, ...bets];
      return concat;
    }, []);

    const betIdsFromCurrentEvents = currentEvents?.reduce((acc, current) => {
      const concat = [...acc, ...current.bets];
      return concat;
    }, []);

    const filteredBets = allBets.filter(bet => {
      return betIdsFromCurrentEvents.includes(bet._id) && bet.published;
    });

    return _.map(filteredBets, bet => {
      const betId = _.get(bet, '_id');
      const eventSlug = _.get(bet, 'eventSlug');
      const betSlug = _.get(bet, 'slug');
      // const mappedTags = _.map(bet.tags, tag => tag.name);
      const marketQuestion = _.get(bet, 'marketQuestion');
      const outcomes = _.get(bet, 'outcomes');

      return (
        <Link
          key={betId}
          to={{
            pathname: `/trade/${eventSlug}/${betSlug}`,
            state: { fromLocation: location },
          }}
          className={styles.eventLink}
        >
          <BetCard
            key={betId}
            betId={betId}
            title={marketQuestion}
            organizer={''}
            image={bet.previewImageUrl}
            eventEnd={bet.endDate}
            outcomes={outcomes}
            eventCardClass={styles.eventCardHome}
          />
        </Link>
      );
    });
  };

  return (
    <CarouselContainer
      key={eventType}
      title={title ?? carouselProps[eventType].title}
      titleLink={titleLink ?? carouselProps[eventType].titleLink}
      titleLinkTo={carouselProps[eventType].titleLinkTo}
      prevArrowInactive={page === 1}
      nextArrowInactive={allLoaded}
      onNext={nextPage}
      onPrevious={previousPage}
    >
      {eventType === 'streamed' && currentEvents?.length > 0
        ? renderLiveEvents()
        : renderBetCards()}
      {currentEvents?.length === 0 && (
        <div className={styles.noEventsBox}>{noEventsMessage}</div>
      )}
    </CarouselContainer>
  );
};

const mapStateToProps = state => {
  return {
    events: _.get(state.event, 'homeEvents', []),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: params => {
      dispatch(EventActions.fetchHomeEvents(params));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsCarouselContainer);
