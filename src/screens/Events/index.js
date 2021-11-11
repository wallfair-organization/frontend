import { useState, memo } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import NonStreamedEventsContent from 'components/Events/NonStreamedEventsContent';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';

const Events = () => {
  const [categories, setCategories] = useState(EVENT_CATEGORIES);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <NonStreamedEventsContent
        eventType="non-streamed"
        categories={categories}
        setCategories={setCategories}
      />
    </BaseContainerWithNavbar>
  );
};

export default memo(Events);
