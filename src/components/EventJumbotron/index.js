import { useLocation, Link } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classnames';
import moment from 'moment';
import LiveBadge from '../LiveBadge';
import styles from './styles.module.scss';
import TimeLeftCounter from '../TimeLeftCounter';
import EmbedVideo from '../EmbedVideo';

const EventJumbotron = ({ event }) => {
  const location = useLocation();
  const startDate = moment(_.get(event, 'date'));
  const endDate = moment(_.get(event, 'endDate'));
  const currentDate = moment();

  if (!event) {
    return null;
  }

  const isLive = event.type === 'streamed';

  return (
    <div>
      <div className={styles.header}>
        <Link
          to={{
            pathname: `/trade/${event.slug}`,
            state: {
              fromLocation: location,
            },
          }}
          className={styles.eventContainer}
        >
          <div className={styles.headerOverlay}></div>
          {isLive && (
            <EmbedVideo
              targetId={event._id}
              video={event.streamUrl}
              muted={true}
              controls={false}
            />
          )}
          {!isLive && (
            <img src={event.previewImageUrl} className={styles.previewImage} />
          )}
          <div className={styles.headerWrapper}>
            <div className={styles.headerContentContainer}>
              <div className={styles.badgeContainer}>
                {isLive && <LiveBadge />}
              </div>
              <span className={styles.title}>{event.name}</span>
              <div className={styles.tagList}>
                {event.tags.map(({ name }, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    #{name.toLowerCase()}
                  </span>
                ))}
              </div>
              <div>
                <div className={styles.goToEvent}>
                  <span>Go to event</span>
                  <div className={styles.arrowRight}></div>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className={classNames(
              styles.timeLeftCounterContainer,
              styles.showTimeLeftCounter
            )}
          >
            <span className={styles.timeLeftCaption}>Event ends in:</span>
            <TimeLeftCounter endDate={endDate} />
          </div> */}
        </Link>
      </div>
    </div>
  );
};

export default EventJumbotron;
