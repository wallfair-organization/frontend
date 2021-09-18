import React from 'react';
import styles from './styles.module.scss';
import LiveBadge from '../LiveBadge';
import OfflineBadge from '../OfflineBadge';
import ViewerBadge from '../ViewerBadge';
import Tags from '../Tags';
import TimeLeftCounter from '../TimeLeftCounter';
import classNames from 'classnames';

const EventCard = ({
  onClick,
  title,
  organizer,
  image,
  live,
  viewers,
  tags,
  eventEnd,
  eventCardClass,
}) => {
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
          {live ? (
            <>
              <LiveBadge />
              <ViewerBadge viewers={viewers} />
            </>
          ) : (
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
