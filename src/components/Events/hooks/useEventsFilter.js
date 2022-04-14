import { getMarketEvents } from 'api';
import BetState from 'constants/BetState';
import { useEffect, useState } from 'react';

export function useEventsFilter(
  statuses,
  category = 'all',
  page,
  random = false,
  limit = 12,
  name,
  orderBy,
  order
) {

  const [events, setEvents] = useState([]);
  const [count, setCount] = useState();

  useEffect(() => {
    if (getMarketEvents) {
      getMarketEvents({
        category,
        statuses: !statuses ? [BetState.active] : statuses,
        page,
        limit,
        name,
        orderBy,
        order
      }).then(res => {

        const filteredEvents = res.events.filter(event => event.category !== 'Politics');

        if (random) {
          const randomIndex = Math.floor(Math.random() * filteredEvents.length);
          const randomEvent = filteredEvents[randomIndex];
          setEvents([randomEvent]);
          return;
        }

        setEvents(filteredEvents);
        setCount(res.count);
      });
    }
  }, []);

  return { events, count };
}
