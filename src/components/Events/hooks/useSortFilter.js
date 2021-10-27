import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventActions } from '../../../../store/actions/event';

export function useSortFilter() {
  const [selectedSortItem, setSelectedSortItem] = useState('name');

  const sortOptions = useSelector(state => state.event.eventSortOptions);

  const handleSelectSortItem = item => {
    console.log('item :>> ', item);
    setSelectedSortItem(item);
  };

  return {
    handleSelectSortItem,
    selectedSortItem,
    sortOptions,
  };
}
