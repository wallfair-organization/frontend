import _ from 'lodash';
import { formatToFixed } from 'helper/FormatNumbers';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './styles.module.scss';
import { TOKEN_NAME } from '../../constants/Token';

const NotificationsItem = ({ notification, setUnread, events }) => {
  const markNotificationRead = () => {
    setUnread(notification);
  };

  const findBetInEvent = (event, betId) => {
    if (event) {
      return _.find(event.bets, {
        _id: betId,
      });
    }
  };

  const getEventByBetId = betId =>
    _.head(_.filter(events, event => !_.isEmpty(findBetInEvent(event, betId))));

  const renderMessage = () => {
    let content = null;
    let eventName = '';

    if (
      !!notification.betQuestion &&
      notification.message.includes(notification.betQuestion) &&
      !!notification.betId &&
      !!getEventByBetId(notification.betId)
    ) {
      const { betId, message, betQuestion, slug: betSlug } = notification;
      const event = getEventByBetId(betId);

      eventName = event.name;
      const [beforeLink, afterLink] = message.split(betQuestion);

      content = (
        <>
          {beforeLink}
          <Link
            to={`/trade/${event.slug}/${betSlug}`}
            onClick={markNotificationRead}
          >
            {betQuestion}
          </Link>
          {afterLink}
        </>
      );
    } else {
      content = notification.message;
    }
    const { eventPhotoUrl } = notification;
    return (
      <>
        {eventPhotoUrl ? (
          <img
            className={style.notificationCardThumbnail}
            alt={`${eventName} event thumbnail`}
            src={eventPhotoUrl}
          />
        ) : null}
        <p>{content}</p>
      </>
    );
  };

  const getTimeDifference = () => {
    const minuteDiff = (new Date() - new Date(notification.date)) / (1000 * 60);
    if (minuteDiff < 2) {
      return 'Just now';
    } else if (minuteDiff < 60) {
      return `${Math.round(minuteDiff)} mins ago`;
    } else if (minuteDiff < 60 * 24) {
      const hourDiff = (minuteDiff - (minuteDiff % 60)) / 60;
      return `${hourDiff} hr${hourDiff < 2 ? '' : 's'} ago`;
    } else {
      const dayDiff = (minuteDiff - (minuteDiff % 60)) / 60 / 24;
      return `${Math.round(dayDiff)} day${dayDiff < 2 ? '' : 's'} ago`;
    }
  };

  const renderCongratulatoryBanner = () => {
    const hasWonTokens = !!notification.tokensWon && notification.tokensWon > 0;
    if (!hasWonTokens) {
      return null;
    }

    return (
      <div className={style.congratulatoryBanner}>
        <span className={style.congratulatoryBannerConfettiLeft}></span>
        <span className={style.congratulatoryBannerConfettiRight}></span>
        <span className={style.congratulatoryBannerTitle}>
          Congratulations! You won
        </span>
        <span className={style.congratulatoryBannerAmount}>
          {formatToFixed(notification.tokensWon, 2, true)} {TOKEN_NAME}
        </span>
      </div>
    );
  };

  return (
    <>
      <div
        key={notification.id}
        className={
          notification.read === true
            ? style.notificationCardRead
            : style.notificationCardUnread
        }
      >
        <div className={style.notificationCardContent}>
          <div className={style.notificationMessage}>
            <div
              className={
                notification.read === true
                  ? style.notificationDotRead
                  : style.notificationDotUnread
              }
            />
            {renderMessage()}
          </div>
        </div>
        <p
          role="button"
          className={style.markSingleRead}
          onClick={markNotificationRead}
        >
          Mark as read
        </p>
        <div className={style.relativeTimeDifference}>
          {getTimeDifference()}
        </div>
      </div>
      <div className={style.notificationSeperator} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    events: state.event.events,
  };
};

export default connect(mapStateToProps, null)(NotificationsItem);
