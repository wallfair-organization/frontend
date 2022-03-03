export const ChartTypes = {
  UPDATE_CHART_PARAMS: 'ChartParams/UPDATE_CHART_PARAMS',
};

const updateChartParams = (params = {}) => {
  return {
    type: ChartTypes.UPDATE_CHART_PARAMS,
    params,
  };
};

export const ChartParamsActions = {
  updateChartParams,
};
