import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import CategoryList from '../../CategoryList';
import { useMappedActions } from './hooks/useMappedActions';
import { useRouteHandling } from './hooks/useRouteHandling';
import ContentFooter from 'components/ContentFooter';
import AdminOnly from 'components/AdminOnly';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import EventJumbotron from 'components/EventJumbotron';
import { getCoverStream } from 'api';
import classNames from 'classnames';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import BetCard from '../../BetCard';
import EventsCarouselContainer from 'components/EventsCarouselContainer';

function EventsContent({ eventType, categories, setCategories, showPopup }) {
  const dispatch = useDispatch();
  const [coverStream, setCoverStream] = useState('');

  const { location, category: encodedCategory } = useRouteHandling(eventType);
  const category = decodeURIComponent(encodedCategory);

  const { fetchFilteredEvents, resetDefaultParamsValues } =
    useMappedActions(eventType);

  const handleSelectCategory = useCallback(
    value => {
      const updatedCats = categories.map(cat => {
        if (value !== cat.value)
          return {
            ...cat,
            isActive: false,
          };
        return {
          ...cat,
          isActive: true,
        };
      });

      setCategories(updatedCats);
    },
    [setCategories]
  );

  const events = _.orderBy(
    useSelector(state => state.event.filteredEvents),
    ['date'],
    ['desc']
  );

  const mappedTags = id =>
    events.find(event => event._id === id)?.tags.map(tag => tag.name) || [];

  //Improvement: API endpoints to list and filter bets?
  const allEvents = useSelector(state => state.event.events);
  const mappedCategories = _.map(categories, c => {
    return {
      ...c,
      disabled:
        c.value !== 'all' &&
        !allEvents.some(e => {
          let match = e.type === eventType && e.category === c.value;
          if (eventType === 'non-streamed') {
            match =
              match && e.bets?.some(b => b.published && b.status === 'active');
          }
          return match;
        }),
    };
  });
  const allBets = allEvents.reduce((acc, current) => {
    const bets = current.bets.map(bet => ({
      ...bet,
      eventSlug: current.slug,
      previewImageUrl: current.previewImageUrl,
      tags: mappedTags(current._id),
      category: current.category,
    }));
    const concat = [...acc, ...bets];
    return concat;
  }, []);

  const betIdsFromCurrentEvents = events.reduce((acc, current) => {
    const concat = [...acc, ...current.bets];
    return concat;
  }, []);

  const filteredBets = allBets.filter(bet => {
    return (
      betIdsFromCurrentEvents.includes(bet._id) &&
      bet.published &&
      bet.status === 'active'
    );
  });

  useEffect(() => {
    handleSelectCategory(category);

    fetchFilteredEvents({
      category: encodedCategory,
      sortBy: 'name',
    });
  }, [category, fetchFilteredEvents, handleSelectCategory]);

  useEffect(() => {
    getCoverStream().then(({ response }) => {
      const responseCoverStream = _.chain(response).get('data').first().value();
      setCoverStream(responseCoverStream);
    });
    return () => {
      resetDefaultParamsValues();
    };
  }, []);

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation, {
      type: eventType,
    });
  }, []);

  return (
    <>
      {eventType === 'streamed' && (
        <section className={classNames(styles.title, styles.hideMobile)}>
          <EventJumbotron event={coverStream} />
        </section>
      )}
      <section className={styles.title}>
        <span>{eventType === 'streamed' ? 'Live Events' : 'Events'}</span>
        <Icon
          className={styles.questionIcon}
          iconType={IconType.question}
          iconTheme={IconTheme.white}
          height={25}
          width={25}
          onClick={handleHelpClick}
        />
        <span onClick={handleHelpClick} className={styles.howtoLink}>
          How does it work?
        </span>
      </section>
      <section className={styles.header}>
        <div className={styles.categories}>
          <CategoryList
            eventType={eventType}
            categories={mappedCategories}
            handleSelect={handleSelectCategory}
          />
        </div>
      </section>
      <AdminOnly>
        <section className={styles.main}>
          <div
            className={styles.newEventLink}
            onClick={() => {
              dispatch(
                PopupActions.show({
                  popupType: PopupTheme.newEvent,
                  options: {
                    eventType,
                  },
                })
              );
            }}
          >
            <Icon
              className={styles.newEventIcon}
              iconType={IconType.addYellow}
              iconTheme={IconTheme.white}
              height={25}
              width={25}
            />
            <span>New Event</span>
          </div>
        </section>
      </AdminOnly>
      <section
        className={classNames([
          styles.main,
          eventType !== 'streamed' ? styles.notStreamed : '',
        ])}
      >
        {eventType === 'streamed' && (
          <div className={styles.streamedContainer}>
            <EventsCarouselContainer
              eventType="streamed"
              category={encodedCategory}
              state="online"
              title="Current Live Streams"
              titleLink={false}
              noEventsMessage="No live events right now. Please check back soon."
            />
            <EventsCarouselContainer
              eventType="streamed"
              category={encodedCategory}
              state="coming_soon"
              title="Upcoming Events"
              titleLink={false}
              upcoming={true}
              noEventsMessage="No upcoming events on this category. Please check back soon."
            />
            <EventsCarouselContainer
              eventType="streamed"
              category={encodedCategory}
              state="offline"
              title="Past events"
              titleLink={false}
              deactivated={true}
              noEventsMessage="No past events in this category yet. Please check back soon."
            />
          </div>
        )}

        <div className={styles.nonStreamed}>
          {eventType === 'non-streamed' &&
            filteredBets
              .filter(item => item.eventSlug && item.slug)
              .map(item => (
                <Link
                  to={{
                    pathname: `/trade/${item.eventSlug}/${item.slug}`,
                    state: { fromLocation: location },
                  }}
                  key={item._id}
                >
                  <BetCard
                    item={item}
                    key={item._id}
                    betId={item._id}
                    title={item.marketQuestion}
                    organizer={''}
                    viewers={12345}
                    state={item.status}
                    tags={item.tags}
                    image={item.previewImageUrl}
                    eventEnd={item.endDate}
                    outcomes={item.outcomes}
                    category={item.category}
                  />
                </Link>
              ))}
        </div>
      </section>
      <ContentFooter />
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(EventsContent);
