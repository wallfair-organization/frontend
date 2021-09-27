import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import CarouselContainer from '../CarouselContainer';
import EventCard from '../EventCard';
import { EventActions } from '../../store/actions/event';
import { useIsMount } from 'components/hoc/useIsMount';
import styles from './styles.module.scss';

const EventsCarouselContainer = ({ events, eventType, fetchEvents }) => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const isMount = useIsMount();

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

  useEffect(() => {
    if (isMount) {
      fetchEvents(eventType, page, COUNT);
      setCurrentEvents(events[eventType]);
    }
  }, []);

  useEffect(() => {
    if (events[eventType].length != 0) {
      setCurrentEvents(events[eventType]);
      setAllLoaded(events[eventType].length < COUNT);
    } else if (page != 1) {
      setAllLoaded(true);
      setPage(page - 1);
    }
  }, [events, eventType]);

  const nextPage = () => {
    const next = page + 1;
    fetchEvents(eventType, next, COUNT);
    setPage(next);
  };

  const previousPage = () => {
    const previous = page - 1;
    fetchEvents(eventType, previous, COUNT);
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

  return (
    <CarouselContainer
      key={eventType}
      title={carouselProps[eventType].title}
      titleLink={carouselProps[eventType].titleLink}
      titleLinkTo={carouselProps[eventType].titleLinkTo}
      prevArrowInactive={page === 1}
      nextArrowInactive={allLoaded}
      onNext={nextPage}
      onPrevious={previousPage}
    >
      {renderLiveEvents()}
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
    fetchEvents: (eventType, page, count) => {
      dispatch(
        EventActions.fetchHomeEvents({
          eventType,
          page,
          count,
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsCarouselContainer);
