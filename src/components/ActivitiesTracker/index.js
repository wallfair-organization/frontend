import _ from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import { getNotificationEvents } from '../../api';

import { ACTIVITIES_TO_TRACK } from '../../constants/Activities';
import { NotificationActions } from '../../store/actions/notification';

SwiperCore.use([Navigation, Pagination]);

const ActivitiesTracker = ({
  className,
  messagesClassName,
  activities,
  addInitialActivities,
}) => {
  const messageListRef = useRef();

  const [selectedCategory, setSelectedCategory] = useState(
    ACTIVITIES_TO_TRACK[0].value
  );

  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) {
      (async () => {
        const initialActivities = await getNotificationEvents().catch(err => {
          console.error("Can't get trade by id:", err);
        });

        await addInitialActivities(initialActivities).catch(err => {
          console.error('[addInitialActivities] err', err);
        });
      })().catch(err => {
        console.error('initialNotification error', err);
      });
    }
  }, [isMount]);

  useEffect(() => {
    messageListScrollToBottom();
  }, [activities.length]);

  const renderActivities = () => {
    // console.log("notifications", notifications);
    // const categoryFiltered = _.filter(notifications, item => {
    //   return item.type.indexOf(selectedCategory) > -1;
    // });

    return _.map(activities, (activityMessage, index) => {
      let date = _.get(activityMessage, 'updatedAt');

      //try to get trade updatedAt date
      if (!date) {
        date = _.get(activityMessage, 'data.trade.updatedAt');
      }

      return (
        <ActivityMessage key={index} activity={activityMessage} date={date} />
      );
    });
  };

  const categorySelectHandler = (activity, e) => {
    setSelectedCategory(activity.value);
  };

  const renderCategories = () => {
    return (
      <div className={styles.categoryList}>
        <Swiper
          navigation={true}
          slidesPerView={6}
          spaceBetween={0}
          pagination={{
            clickable: true,
            type: 'progressbar',
          }}
          autoHeight={true}
          className={classNames(styles.swiperElement)}
        >
          {ACTIVITIES_TO_TRACK.map((activity, index) => (
            <SwiperSlide key={`swiper-slide-${index}`}>
              <div
                className={classNames(styles.boxIcon, {
                  [styles.categorySelected]:
                    selectedCategory === activity.value,
                })}
                role="button"
                tabIndex="0"
                onClick={e => {
                  categorySelectHandler(activity, e);
                }}
              >
                <img
                  src={activity.image}
                  alt={`category ${activity.value}`}
                  className={classNames(styles.imageIcon)}
                />
                <label className={classNames(styles.label)}>
                  {activity.category}
                </label>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
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

  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      {/*{renderCategories()}*/}
      <div
        className={classNames(messagesClassName, styles.messageContainer)}
        ref={messageListRef}
      >
        {renderActivities()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesTracker);
