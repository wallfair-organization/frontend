import {
  calcLabels,
  calcDatasets,
  calcDohnutLabels,
  calcDohnutDatasets,
} from './chartHelpers';
import legendPadding from './plugins/legendHeightPlugin';

export const chartOptions = (type, data) => {
  let matchMediaMobile = window.matchMedia(`(max-width: ${768}px)`).matches;

  return {
    type,
    plugins: [legendPadding],
    data: {
      labels: data[0] ? calcLabels(data[0].data) : [],
      datasets: calcDatasets(data),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tension: 0.35,
      plugins: {
        legend: {
          display: true,
          align: 'start',
          position: matchMediaMobile ? 'bottom' : 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            paddingTop: 50,
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          // position: 'nearest',
          // axis: 'y',
        },
      },
      scales: {
        x: {
          type: 'time',
          // time: {
          //     unit: 'months',
          //     displayFormats: {
          //         hour: 'HH:mm',
          //     },
          // },
          ticks: {
            source: 'auto',
            callback: function (value) {
              // console.log('value :>> ', value);
              return value;
            },
          },
        },
        y: {
          max: 1,
          beginAtZero: true,
        },
      },
    },
  };
};

export const dohnutChartOptions = (type, data) => {
  let matchMediaMobile = window.matchMedia(`(max-width: ${768}px)`).matches;

  return {
    type,
    data: {
      labels: calcDohnutLabels(data),
      datasets: calcDohnutDatasets(data),
    },
    options: {
      animation: false,
      hover: false,
      maintainAspectRatio: false,
      layout: {
        padding: 60,
      },
      plugins: {
        tooltip: false,
        legend: {
          display: false,
        },
        datalabels: {
          align: 'end',
          anchor: 'end',
          backgroundColor: null,
          borderColor: null,
          borderRadius: 4,
          borderWidth: 1,
          color: '#eee',
          font: {
            size: 13,
          },
          offset: 16,
          padding: 0,
          textAlign: 'center',
          formatter: function (value, context) {
            var label = context.chart.data.labels[context.dataIndex] || null;
            label += `\n${value}%`;
            return label;
          },
        },
      },
    },
  };
};
