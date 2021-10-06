import { useState } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';
import { EVENT_CATEGORIES } from 'constants/EventCategories';

const LiveEvents = () => {
  const [categories, setCategories] = useState(EVENT_CATEGORIES);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <EventsContent
        eventType="streamed"
        categories={categories}
        setCategories={setCategories}
      />
    </BaseContainerWithNavbar>
  );
};

export default LiveEvents;
