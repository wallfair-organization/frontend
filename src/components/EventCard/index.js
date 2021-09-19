import React, { useState } from 'react';
import styles from './styles.module.scss';
import { EVENT_STATES } from 'constants/EventStates';
import LiveBadge from '../LiveBadge';
import ViewerBadge from '../ViewerBadge';
import OfflineBadge from '../OfflineBadge';
import Tags from '../Tags';
import TimeLeftCounter from '../TimeLeftCounter';
import classNames from 'classnames';
import TwitchEmbedVideo from 'components/TwitchEmbedVideo';

const EventCard = ({
  onClick,
  title,
  organizer,
  image,
  state,
  viewers,
  tags,
  eventEnd,
  eventCardClass,
  streamUrl,
}) => {
  const isOnlineState = state === EVENT_STATES.ONLINE;
  const isOfflineState = state === EVENT_STATES.OFFLINE;

  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + image + '")',
    };
  };

  const imgContainer = (
    <div
      className={styles.eventCardBackgroundBlur}
      style={getEventCardStyle()}
    ></div>
  );

  const videoPlayer = (
    <div className={styles.eventCardBackground}>
      <TwitchEmbedVideo video={streamUrl} controls={false} />
    </div>
  );

  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      className={styles.eventCardContainer}
      onClick={onClick}
      onMouseEnter={() => setShowVideo(true)}
      onMouseLeave={() => setShowVideo(false)}
    >
      <div className={classNames(styles.eventCard, eventCardClass)}>
        {!showVideo && imgContainer}
        {showVideo && videoPlayer}
        <div className={styles.eventCardBackground}></div>
        <div>
          {isOnlineState && (
            <>
              <LiveBadge />
              <ViewerBadge viewers={viewers} />
            </>
          )}
          {isOfflineState && <OfflineBadge />}
        </div>
        <div
          className={classNames(styles.content, {
            [styles.timerActive]: eventEnd,
          })}
        >
          <span className={styles.title}>
            {title}
            <br />
            {organizer}
          </span>
          <Tags tags={tags} />
        </div>
        {eventEnd && (
          <div className={styles.timer}>
            <span className={styles.timerTitle}>Event ends in:</span>
            <span>
              <TimeLeftCounter endDate={eventEnd} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
