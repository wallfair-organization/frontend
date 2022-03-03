import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventActions } from '../../../store/actions/event';

export function useTabOptions(event) {
  const [tabOptions, setTabOptions] = useState([
    { name: 'chat', isActive: true },
    // { name: 'news', isActive: false },
    { name: 'evidence', isActive: false },
    { name: 'activities', isActive: false },
    // { name: 'all trades', isActive: false },
  ]);

  useEffect(() => {
    if (event && event.type === 'streamed') {
      const updatedTabOptions = tabOptions.filter(item => {
        return (
          event.type === 'streamed' &&
            // item.name !== 'news' &&
            item.name !== 'evidence',
          item.name !== 'activities'
          // item.name !== 'all trades'
        );
      });
      setTabOptions(updatedTabOptions);
    }
  }, [event]);

  const handleSwitchTab = option => {
    const newValue = tabOptions.map(tabOption => {
      if (option.name !== tabOption.name)
        return {
          ...tabOption,
          isActive: false,
        };
      return {
        ...tabOption,
        isActive: true,
      };
    });

    setTabOptions(newValue);
  };

  const selectedTab = tabOptions.find(item => item.isActive).name || '';

  return { tabOptions, handleSwitchTab, selectedTab };
}
