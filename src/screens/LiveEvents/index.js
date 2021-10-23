import { useEffect, useState } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';
import { EVENT_CATEGORIES } from 'constants/EventCategories';
import LiveEventsScreenshot from 'data/images/live-events-screenshot.png';
import LiveEventsScreenshotMobile from 'data/images/live-events-screenshot-mobile.png';
import styles from './styles.module.scss';

const LiveEvents = () => {
  const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
  const [categories, setCategories] = useState(EVENT_CATEGORIES);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      {showUpcoming === 'false' ? (
        <div className={styles.placeholderLiveEventsScreenshot}>
          <div className={styles.inactivePlaceholder}>Coming Soon</div>
          <img
            src={LiveEventsScreenshot}
            alt="live events screenshot"
            className={styles.desktop}
          />
          <img
            src={LiveEventsScreenshotMobile}
            alt="live events screenshot mobile"
            className={styles.mobile}
          />
        </div>
      ) : (
        <EventsContent
          eventType="streamed"
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </BaseContainerWithNavbar>
  );
};

export default LiveEvents;
