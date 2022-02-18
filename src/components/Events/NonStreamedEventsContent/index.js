import _ from 'lodash';
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import CategoryList from '../../CategoryList';
import { useMappedActions } from '../hooks/useMappedActions';
import { useRouteHandling } from '../hooks/useRouteHandling';
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
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';

import { ReactComponent as PlusIcon } from 'data/icons/plus-icon.svg';
import Search from 'components/Search';
import BuyWFAIRWidget from 'components/BuyWFAIRWidget';
import EventActivitiesTabs from 'components/EventActivitiesTabs';
import { LOGGED_IN } from 'constants/AuthState';
import { getMarketEvents } from 'api';

const NonStreamedEventsContent = ({
  categories,
  setCategories,
  showPopup,
  userId,
  token,
  bookmarkEvent,
  bookmarkEventCancel,
  startOnboarding,
  authState,
}) => {
  const eventType = 'non-streamed';

  const { location, category: encodedCategory } = useRouteHandling(eventType);
  const category = decodeURIComponent(encodedCategory);

  const [status, setStatus] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  // const { fetchFilteredEvents, resetDefaultParamsValues } =
  //   useMappedActions(eventType);
  const [events, setEvents] = useState([]);

  const handleSelectCategory = useCallback(
    value => {
      const updatedCats = categories.map(cat => ({
        ...cat,
        isActive: true,
      }));

      setCategories(updatedCats);
      setPage(0);
    },
    [setCategories]
  );

   const changeStatus = useCallback((value) => {
     setPage(0);
     setStatus(value);
   }, [status, page]);

  const onConfirmSearch = useCallback(() => {
    setPage(0);
    getEvents(searchTerm);
  }, [searchTerm, page]);

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
      disabled: false,
    };
  });

  const getEvents = useCallback(
    (search = '') => {
      getMarketEvents(
        category,
        status === 'current'
          ? ['ACTIVE']
          : [
              'RESOLVED',
              'CANCELLED',
              'CLOSED',
              'WAITING_RESOLUTION',
              'DISPUTED',
            ],
        page,
        limit,
        search
      ).then(res => {
        setEvents(res);
      });
    },
    [status, page, category, searchTerm]
  );

  useEffect(() => {
    handleSelectCategory(category);
    getEvents();
  }, [category, status]);

  const loadMoreEvents = useCallback(() => {
    setPage(page+1);

    getMarketEvents(
      category,
      status === 'current'
        ? ['ACTIVE']
        : ['RESOLVED', 'CANCELLED', 'CLOSED', 'WAITING_RESOLUTION', 'DISPUTED'],
      page + 1,
      limit,
      searchTerm
    ).then(res => {
      setEvents([...events, ...res]);
    });
  }, [page, events, status]);

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
            className={styles.categoryList}
            eventType={eventType}
            categories={mappedCategories}
            handleSelect={handleSelectCategory}
          />
          <div className={styles.containerOptions}>
            <Search
              className={styles.searchInput}
              value={searchTerm}
              handleChange={setSearchTerm}
              handleConfirm={onConfirmSearch}
            />
            {authState === LOGGED_IN && (
              <Button
                theme={ButtonTheme.primaryButtonS}
                onClick={() => showPopup(PopupTheme.eventForms, {})}
                className={styles.createButton}
              >
                <PlusIcon />
                <span>Create an event</span>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className={classNames([styles.main, styles.notStreamed])}>
        <StatusTabs onSelect={changeStatus} />

        {events.length === 0 && (
          <span className={styles.notFound}>
            No events found in this category
          </span>
        )}

        <div className={styles.nonStreamed}>
          {events &&
            events.map(item => (
              <Link
                className={styles.betLinkWrapper}
                to={{
                  // pathname: `/trade/${item.slug}/${item.bet.slug}`,
                  pathname: `/trade/${item.slug}`,
                  state: { fromLocation: location },
                }}
                key={item.bet.id}
              >
                <BetCard
                  item={item.bet}
                  key={item.id}
                  betId={item.bet.id}
                  title={item.bet.market_question}
                  organizer={''}
                  viewers={12345}
                  state={item.bet.status}
                  tags={item.tags}
                  image={item.preview_image_url}
                  eventEnd={item.bet.end_date}
                  category={item.category}
                  isBookmarked={!!item?.bookmarks?.includes(userId)}
                  onBookmark={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!userId) {
                      return showJoinPopup(e);
                    }
                    bookmarkEvent(item.id);
                  }}
                  onBookmarkCancel={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    bookmarkEventCancel(item.id);
                  }}
                />
              </Link>
            ))}
        </div>

        <Button onClick={loadMoreEvents} theme={ButtonTheme.secondaryButton}>
          Load more
        </Button>

        <BuyWFAIRWidget />

        <EventActivitiesTabs
          activitiesLimit={50}
          className={styles.activities}
          preselectedCategory={'game'}
          hideSecondaryColumns={true}
          layout="wide"
        />
      </section>
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
    },
  };
};

function mapStateToProps(state) {
  return {
    authState: state.authentication.authState,
    userId: state.authentication.userId,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonStreamedEventsContent);
