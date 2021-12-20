import _ from 'lodash';
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import CategoryList from '../../CategoryList';
import { useMappedActions } from '../hooks/useMappedActions';
import { useRouteHandling } from '../hooks/useRouteHandling';
import ContentFooter from 'components/ContentFooter';
import AdminOnly from 'components/AdminOnly';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import classNames from 'classnames';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import BetCard from '../../BetCard';

import { EventActions } from '../../../store/actions/event';
import StatusTabs from './StatusTabs';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import { OnboardingActions } from 'store/actions/onboarding';

const NonStreamedEventsContent = ({
  categories,
  setCategories,
  showPopup,
  userId,
  bookmarkEvent,
  bookmarkEventCancel,
  events,
  filteredEvents,
  startOnboarding,
}) => {
  const eventType = 'non-streamed';

  const { location, category: encodedCategory } = useRouteHandling(eventType);
  const category = decodeURIComponent(encodedCategory);

  const [status, setStatus] = useState('current');

  const { fetchFilteredEvents, resetDefaultParamsValues } =
    useMappedActions(eventType);

  const handleSelectCategory = useCallback(
    value => {
      const updatedCats = categories.map(cat => ({
        ...cat,
        isActive: value !== cat.value,
      }));

      setCategories(updatedCats);
    },
    [setCategories]
  );

  const mappedTags = id =>
    events.find(event => event._id === id)?.tags.map(tag => tag.name) || [];

  const statusWhitelist = {
    current: ['active'],
    past: ['closed'],
  }[status];

  //Improvement: API endpoints to list and filter bets?
  const mappedCategories = _.map(categories, c => {
    return {
      ...c,
      disabled:
        c.value !== 'all' &&
        !events.some(e => {
          return (
            e.type === eventType &&
            e.category === c.value &&
            e.bets?.some(
              b => b.published && ['closed', 'active'].includes(b.status)
            )
          );
        }),
    };
  });

  const allBets = filteredEvents.reduce((acc, current) => {
    const bets = current.bets.map(bet => ({
      ...bet,
      eventSlug: current.slug,
      previewImageUrl: current.previewImageUrl,
      tags: mappedTags(current._id),
      category: current.category,
      eventId: current._id,
      bookmarks: current.bookmarks,
    }));
    const concat = [...acc, ...bets];
    return concat;
  }, []);

  const filteredBets = allBets.filter(bet => {
    return bet.published && statusWhitelist.includes(bet.status);
  });

  useEffect(() => {
    handleSelectCategory(category);

    fetchFilteredEvents({
      category: encodedCategory,
      sortBy: 'date',
      count: 0,
    });
  }, [category]);

  useEffect(() => () => resetDefaultParamsValues(), []);

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation, {
      type: eventType,
    });
  }, []);

  const showJoinPopup = useCallback(event => {
    startOnboarding();
  }, []);

  return (
    <>
      <section className={styles.title}>
        <span>Events</span>
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

      <section className={classNames([styles.main, styles.notStreamed])}>
        <StatusTabs onSelect={setStatus} />

        <div className={styles.nonStreamed}>
          <AdminOnly>
            <div
              className={styles.newEventLink}
              onClick={() => showPopup(PopupTheme.newEvent, { eventType })}
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
          </AdminOnly>

          {filteredBets
            .filter(item => item.eventSlug && item.slug)
            .map(item => (
              <Link
                className={styles.betLinkWrapper}
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
                  isBookmarked={!!item?.bookmarks?.includes(userId)}
                  onBookmark={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!userId) {
                      return showJoinPopup(e);
                    }
                    bookmarkEvent(item.eventId);
                  }}
                  onBookmarkCancel={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    bookmarkEventCancel(item.eventId);
                  }}
                />
              </Link>
            ))}
        </div>
      </section>
      <ContentFooter />
    </>
  );
};

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

function mapStateToProps(state) {
  return {
    userId: state.authentication.userId,
    events: state.event.events,
    filteredEvents: state.event.filteredEvents,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonStreamedEventsContent);
