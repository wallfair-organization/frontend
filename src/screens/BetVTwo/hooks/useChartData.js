import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventActions } from '../../../store/actions/event';

export function useChartData(betId) {
  const dispatch = useDispatch();
  const [filterActive, setFilterActive] = useState('24H');

  const currentParams = useRef({
    rangeType: 'hour',
    rangeValue: '24',
    direction: 'BUY',
  });

  const chartData = useSelector(state => state.event.chartData);
  const chartParams = useSelector(state => state.event.chartParams);

  const filterMap = {
    '24H': {
      rangeType: 'hour',
      rangeValue: '24',
    },
    '7D': {
      rangeType: 'day',
      rangeValue: '7',
    },
    '30D': {
      rangeType: 'day',
      rangeValue: '30',
    },
  };

  const handleChartPeriodFilter = filterName => {
    if (betId) {
      setFilterActive(filterName);

      currentParams.current.rangeType = filterMap[filterName].rangeType;
      currentParams.current.rangeValue = filterMap[filterName].rangeValue;
      dispatch(
        EventActions.updateChartParams(betId, { ...currentParams.current })
      );
    }
  };

  const handleChartDirectionFilter = (directionIndex = 0) => {
    if (betId) {
      currentParams.current.direction = directionIndex === 0 ? 'BUY' : 'SELL';

      dispatch(
        EventActions.updateChartParams(betId, { ...currentParams.current })
      );
    }
  };

  useEffect(() => {
    if (betId) {
      if (chartParams) {
        currentParams.current = {
          ...currentParams.current,
          ...chartParams,
        };
        const active = Object.keys(filterMap).find(
          key => filterMap[key].rangeValue === chartParams.rangeValue
        );
        if (active) setFilterActive(active);
      }
      dispatch(
        EventActions.initiateFetchChartData(betId, currentParams.current)
      );
    }
  }, [betId]);

  return {
    chartData,
    filterActive,
    handleChartPeriodFilter,
    handleChartDirectionFilter,
  };
}
