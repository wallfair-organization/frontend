import _ from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import Grid from '@material-ui/core/Grid';
// swiper bundle styles
import 'swiper/swiper-bundle.min.css';

// swiper core styles
import 'swiper/swiper.min.css';
// modules styles
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import SwiperCore, { Pagination, Navigation } from 'swiper';

import classNames from 'classnames';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useIsMount } from '../hoc/useIsMount';
import ActivityMessage from './ActivityMessage';
import {
  getNotificationEvents,
  getNotificationEventsByBet,
  getNotificationEventsByUser,
} from '../../api';

import { ACTIVITIES_TO_TRACK } from '../../constants/Activities';
import { NotificationActions } from '../../store/actions/notification';

SwiperCore.use([Navigation, Pagination]);

/***
 *
 * @param className - class name for container
 * @param messagesClassName - class name for messages
 * @param activities - saga state for global activities (api initial call + websocket combined)
 * @param addInitialActivities - saga action to dispatch
 * @param activitiesLimit - api call activities limit to fetch
 * @param betId - when exist we are showing things related with defined betId
 * @param preselectedCategory - focus on specific categories only
 * @returns {JSX.Element}
 * @constructor
 */

const callByParams = async params => {
  const { betId, userId, activitiesLimit, selectedCategory } = params;
  if (betId) {
    return await getNotificationEventsByBet({
      limit: activitiesLimit || 10,
      betId,
    }).catch(err => {
      console.error("Can't getNotificationEventsByBet", err);
    });
  }

  if (userId) {
    return await getNotificationEventsByUser({
      limit: activitiesLimit || 10,
      userId,
    }).catch(err => {
      console.error("Can't getNotificationEventsByUser", err);
    });
  }

  return getNotificationEvents({
    limit: activitiesLimit || 10,
    category: selectedCategory,
  }).catch(err => {
    console.error("Can't getNotificationEvents", err);
  });
};

const EventActivitiesTracker = ({
  className,
  messagesClassName,
  activities,
  addInitialActivities,
  activitiesLimit,
  betId,
  userId,
  preselectedCategory,
}) => {
  const messageListRef = useRef();

  const preselectCategory = preselectedCategory
    ? _.get(
        _.find(ACTIVITIES_TO_TRACK, { value: preselectedCategory }),
        'value'
      )
    : ACTIVITIES_TO_TRACK[0].value;

  const [selectedCategory, setSelectedCategory] = useState(preselectCategory);

  const [initialLoaded, setInitialLoaded] = useState(false);

  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) {
      (async () => {
        let initialActivities = await callByParams({
          betId,
          userId,
          activitiesLimit,
          selectedCategory,
        }).catch(err => {
          console.error("Can't callByParams", err);
        });

        addInitialActivities(initialActivities);
        setInitialLoaded(true);
      })().catch(err => {
        console.error('initialNotification error', err);
      });
    }
  }, [isMount, selectedCategory]);

  useEffect(() => {
    if (initialLoaded) {
      (async () => {
        const initialActivities = await getNotificationEvents({
          limit: activitiesLimit || 10,
          category: selectedCategory,
        }).catch(err => {
          console.error("Can't get trade by id:", err);
        });
        addInitialActivities(initialActivities);
      })().catch(err => {
        console.error('initialNotification error', err);
      });
    }
  }, [selectedCategory]);

  const renderActivities = () => {
    const selectedCategoryLower = selectedCategory.toLowerCase();
    const categoryCfg = _.find(ACTIVITIES_TO_TRACK, {
      value: selectedCategoryLower,
    });
    const categoryEvents = _.get(categoryCfg, 'eventsCats', []);
    // console.log("notifications", notifications);
    const categoryFiltered = _.filter(activities, item => {
      if (selectedCategoryLower === 'all') {
        return true;
      }

      return item.type === 'Casino/CASINO_CASHOUT';
    });

    return _.map(categoryFiltered, (activityMessage, index) => {
      let date = _.get(activityMessage, 'updatedAt');

      //try to get trade updatedAt date
      if (!date) {
        date = _.get(activityMessage, 'data.trade.updatedAt');
      }

      //try to get bet updatedAt date
      if (!date) {
        date = _.get(activityMessage, 'data.bet.date');
      }

      //try to get event updatedAt date
      if (!date) {
        date = _.get(activityMessage, 'data.event.date');
      }

      if (!date) {
        date = _.get(activityMessage, 'data.updatedAt');
      }

      return (
        <ActivityMessage key={index} activity={activityMessage} date={date} />
      );
    });
  };

  const messageListScrollToBottom = () => {
    if (messageListRef) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (initialLoaded) {
      messageListScrollToBottom();
    }
  }, [activities, initialLoaded]);

  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>GAME</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>USER</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>TRADE</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>MULT</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>CASHOUT</p>
          </Grid>
        </Grid>
      </div>
      <div
        className={classNames(messagesClassName, styles.messageContainer)}
        ref={messageListRef}
      >
        {initialLoaded && renderActivities()}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    activities: state.notification.activities,
    user: state.authentication,
    connected: state.websockets.connected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addActivity: (type, activity) => {
      dispatch(NotificationActions.addActivity({ type, activity }));
    },
    addInitialActivities: data => {
      const responseData = _.get(data, 'data', []);

      dispatch(
        NotificationActions.addInitialActivities({
          data: responseData,
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventActivitiesTracker);
