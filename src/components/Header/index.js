import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classnames';
import moment from 'moment';
import { EVENT_STATES } from 'constants/EventStates';
import LiveBadge from '../LiveBadge';
import styles from './styles.module.scss';
import TwitchEmbedVideo from '../TwitchEmbedVideo';
import CoverFlowCarousel from '../CoverFlowCarousel';
import TimeLeftCounter from '../TimeLeftCounter';

const Header = ({ events }) => {
  let [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentEvents, setCurrentEvents] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setCurrentEvents(
      events.filter(event => event.state === EVENT_STATES.ONLINE)
    );
  }, [events]);

  const renderContent = (event, eventIndex, index) => {
    if (eventIndex !== index || event.type !== 'streamed') {
      return (
        <img src={event.previewImageUrl} className={styles.previewImage} />
      );
    } else {
      return (
        <TwitchEmbedVideo
          targetId={event._id}
          className={styles.twitchStream}
          video={event.streamUrl}
          muted={true}
        />
      );
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <CoverFlowCarousel onSlideChange={setCurrentSlideIndex}>
          {currentEvents &&
            currentEvents.map((event, eventIndex) => {
              const startDate = moment(_.get(event, 'date'));
              const endDate = moment(_.get(event, 'endDate'));
              const currentDate = moment();
              const isLive = event.type === 'streamed'; //currentDate.isBetween(startDate, endDate);

              return (
                <Link
                  to={{
                    pathname: `trade/${event.slug}`,
                    state: {
                      fromLocation: location,
                    },
                  }}
                  className={styles.eventContainer}
                  key={eventIndex}
                >
                  <div className={styles.headerOverlay}></div>

                  {renderContent(event, eventIndex, currentSlideIndex)}

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
                  <div
                    className={classNames(
                      styles.timeLeftCounterContainer,
                      currentSlideIndex === eventIndex &&
                        styles.showTimeLeftCounter
                    )}
                  >
                    <span className={styles.timeLeftCaption}>
                      Event ends in:
                    </span>
                    <TimeLeftCounter endDate={endDate} />
                  </div>
                </Link>
              );
            })}
        </CoverFlowCarousel>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    events: state.event.events,
  };
};

export default connect(mapStateToProps)(Header);
