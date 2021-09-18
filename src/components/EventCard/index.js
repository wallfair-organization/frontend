import React from 'react';
import styles from './styles.module.scss';
import { EVENT_STATES } from 'constants/EventStates';
import LiveBadge from '../LiveBadge';
import ViewerBadge from '../ViewerBadge';
import OfflineBadge from '../OfflineBadge';
import Tags from '../Tags';
import TimeLeftCounter from '../TimeLeftCounter';
import classNames from 'classnames';
import OfflineBadge from 'components/OfflineBadge';

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
}) => {
  const isOnlineState = state === EVENT_STATES.ONLINE;
  const isOfflineState = state === EVENT_STATES.OFFLINE;

  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + image + '")',
    };
  };

  return (
    <div className={styles.eventCardContainer} onClick={onClick}>
      <div className={classNames(styles.eventCard, eventCardClass)}>
        <div
          className={styles.eventCardBackgroundBlur}
          style={getEventCardStyle()}
        ></div>
        <div className={styles.eventCardBackground}></div>
        <div>
          {isOnlineState && (
            <>
              <LiveBadge />
              <ViewerBadge viewers={viewers} />
            </>
          )}
          {isOfflineState && (
            <>
              <OfflineBadge />
              <ViewerBadge viewers={viewers} />
            </>
          )}
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
