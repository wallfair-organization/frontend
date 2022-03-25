// import { getNotificationEvents } from 'api';

import { getLuckyUsers } from 'api/crash-game';
import { useEffect, useState } from 'react';

export function useLuckyWins() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    (async () => {
      const initialActivities = await getLuckyUsers()
      .then(activities => activities?.data)
      .catch(err => {
        console.error("Can't get lucky users:", err);
      });

      const mappedActivities = initialActivities.map(activity => {
        return {
          username: activity?.username,
          reward: activity?.rewardAmount,
          gamesCurrency: activity?.gamesCurrency,
        };
      });

      setActivities(mappedActivities);

    })().catch(err => {
      console.error('initialNotification error', err);
    });
  }, []);

  return { activities };
}
