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

import ChatMessageWrapper from '../ChatMessageWrapper';
import classNames from 'classnames';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType from '../../components/Icon/IconType';
import Input from '../Input';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { WebsocketsActions } from '../../store/actions/websockets';
import { usePrevPropValue } from '../../hooks/usePrevPropValue';
import { useIsMount } from '../hoc/useIsMount';
import { LOGGED_IN } from 'constants/AuthState';
import ActivityMessage from './ActivityMessage';
import CategoryListItem from '../CategoryList/CategoryListItem';
import { getNotificationEvents } from '../../api';

import { ACTIVITIES_TO_TRACK } from '../../constants/Activities';

import testData from './testData';
import { getTradeById } from '../../api';

SwiperCore.use([Navigation, Pagination]);

const ActivitiesTracker = ({
  className,
  inputClassName,
  messagesClassName,
  user,
  roomId,
  chatMessageType,
  sendChatMessage,
  hideInput = false,
}) => {
  const messageListRef = useRef();

  const [selectedCategory, setSelectedCategory] = useState(
    ACTIVITIES_TO_TRACK[0].value
  );

  const [activities, setActivities] = useState(testData);

  const [notifications, setInitialNotifications] = useState();
  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) {
      (async () => {
        const initialNotifications = await getNotificationEvents().catch(
          err => {
            console.error("Can't get trade by id:", err);
          }
        );

        setInitialNotifications(_.get(initialNotifications, 'data', []));
      })().catch(err => {
        console.error('initialNotification error', err);
      });
    }
  }, [isMount]);

  const renderActivities = () => {
    // console.log("notifications", notifications);
    // const categoryFiltered = _.filter(notifications, item => {
    //   return item.type.indexOf(selectedCategory) > -1;
    // });

    return _.map(notifications, (activityMessage, index) => {
      const date = _.get(activityMessage, 'updatedAt');
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
    user: state.authentication,
    connected: state.websockets.connected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendChatMessage: messageObject => {
      dispatch(WebsocketsActions.sendChatMessage({ messageObject }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesTracker);
