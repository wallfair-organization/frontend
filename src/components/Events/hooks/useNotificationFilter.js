import { getNotificationEvents } from 'api';
import { useEffect, useState } from 'react';

export function useNotificationFilter(category, typeNotification = 'game') {

  const [notifications, setNotifications] = useState([]);

  const filterByCategory = (notificationArr) => {
    return notificationArr.filter(item => category === item.type && item.data?.reward > 10 && ['EUR', 'USD'].includes(item.data?.gamesCurrency));
  }

  useEffect(() => {
    (async () => {
      const initialActivities = await getNotificationEvents({
        limit: 200,
        category: typeNotification,
      }).catch(err => {
        console.error("Can't get trade by id:", err);
      });

      if (category) {
        const notificationByCategory = filterByCategory(initialActivities?.data);
        setNotifications(notificationByCategory);
      } else {
        setNotifications(initialActivities?.data);
      }
    })().catch(err => {
      console.error('initialNotification error', err);
    });
  }, []);

  return { notifications };
}
