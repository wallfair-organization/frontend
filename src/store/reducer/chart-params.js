import update from 'immutability-helper';
import { ChartTypes } from '../actions/chart-params';

const initialState = {
  rangeType: 'hour',
  rangeValue: '24',
};

const updateChartParams = (state, action) => {
  return update(state, {
    $set: action.params,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ChartTypes.UPDATE_CHART_PARAMS:
      return updateChartParams(state, action);
    default:
      return state;
  }
}
