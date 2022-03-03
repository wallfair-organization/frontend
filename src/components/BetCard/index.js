import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { calculateTimeLeft } from '../../helper/Time';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';
import BetState from 'constants/BetState';
import EmbedVideo from 'components/EmbedVideo';

const BetCard = ({
  betId,
  onClick,
  onBookmark = () => {},
  onBookmarkCancel = () => {},
  title,
  image,
  eventEnd,
  eventCardClass,
  outcomes,
  category,
  item,
  state,
  isBookmarked = false,
  tags,
  small = false,
}) => {
  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + image + '")',
    };
  };

  const isVideoBackground = () => {
    const urlObj = new URL(image);
    return urlObj.host.indexOf('twitch') > -1;
  }

  const eventState = {
    [BetState.disputed]: 'Event disputed',
    [BetState.closed]: 'Event closed',
    [BetState.canceled]: 'Event cancelled',
    [BetState.resolved]: 'Event resolved',
    [BetState.waitingResolution]: 'Event waiting for resolution',
  }

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(eventEnd))
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(eventEnd)));
    }, 60000);

    return () => clearTimeout(timerId);
  }, [eventEnd]);

  return (
    <div
      className={classNames(styles.betCardContainer, eventCardClass)}
      onClick={onClick}
    >
      <div className={styles.picture} style={getEventCardStyle()} />
      { isVideoBackground() && <EmbedVideo className={styles.video} video={image} muted={true} autoPlay={false} controls={false} /> }
      <div className={classNames(styles.picture, styles.overlay)} />
      <div className={classNames(styles.betCard)}>
        <div className={styles.badgeContainer}>
          {/* <LiveBadge className={styles.liveBadge} /> */}
          {/* <HotBetBadge className={styles.hotBadge} theme={HotBetBadgeTheme.opacity05}>3,212 Trade Vol.</HotBetBadge> */}
        </div>
        <div className={styles.titleContainer}>
          <span className={styles.title}>{title}</span>
          <div className={styles.tags}>
            {!small && tags && tags.map(tag => <span>#{tag.name}</span>)}
          </div>
        </div>
      </div>

      {eventEnd && new Date(eventEnd) > new Date() ? (
        <div className={styles.timerContainer}>
          <div
            className={classNames(
              styles.contentWrapper,
              small ? styles.smallTimer : null
            )}
          >
            {!small && (
              <span className={styles.timerLabel}>Event ends in: </span>
            )}
            {small && <span className={styles.timerLabel}>Ends in: </span>}
            <span className={styles.timerValue}>{timeLeft?.days || 0}</span>
            <span className={styles.timerUnit}>days </span>
            <span className={styles.timerValue}>{timeLeft?.hours || 0}</span>
            <span className={styles.timerUnit}>hrs </span>
            <span className={styles.timerValue}>{timeLeft?.minutes || 0}</span>
            <span className={styles.timerUnit}>min </span>
          </div>
        </div>
      ) : (
        <div className={styles.timerContainer}>
          <div className={styles.contentWrapper}>
            <span className={styles.timerLabel}>
              {eventState[state] || 'Event ended'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BetCard;
