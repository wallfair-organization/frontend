import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EventActions } from '../../../../store/actions/event';

export function useMappedActions(eventType) {
  const dispatch = useDispatch();

  const fetchFilteredEvents = useCallback(
    (params = {}) =>
      dispatch(
        EventActions.initiateFetchFilteredEvents({
          ...params,
          type: eventType,
          upcoming: false,
          deactivated: false,
        })
      ),
    [dispatch, eventType]
  );

  const resetDefaultParamsValues = () =>
    dispatch(EventActions.resetDefaultParamsValues());

  return { fetchFilteredEvents, resetDefaultParamsValues };
}
