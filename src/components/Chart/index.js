import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.module.scss';
import ChartCtr from '../../config/chart';
import {
  chartOptions,
  dohnutChartOptions,
} from '../../helper/Chart/chartOptions';
import Button from '../Button';

export default function Chart({
  height,
  data,
  filterActive,
  handleChartPeriodFilter,
}) {
  const chartEl = useRef(null);
  const chartRender = useRef(1);
  const chartInstance = useRef({});

  useEffect(() => {
    if (chartEl.current) {
      if (chartRender.current > 1) {
        chartInstance.current.destroy();
      }

      const ctx = chartEl.current.getContext('2d');
      chartInstance.current = new ChartCtr(
        ctx,
        dohnutChartOptions('doughnut', data)
      );
    }

    chartRender.current += 1;
  }, [data]);

  useEffect(() => {
    return () => {
      handleChartPeriodFilter('24H');
      chartInstance.current.destroy();
    };
  }, []);

  return (
    <>
      <div className={styles.chartContainer}>
        {/* <div className={styles.filters}>
          <Button
            className={classNames(styles.filterButton, {
              [styles.active]: filterActive === '24H',
            })}
            onClick={() => handleChartPeriodFilter('24H')}
          >
            24H
          </Button>
          <Button
            className={classNames(styles.filterButton, {
              [styles.active]: filterActive === '7D',
            })}
            onClick={() => handleChartPeriodFilter('7D')}
          >
            7D
          </Button>
          <Button
            className={classNames(styles.filterButton, {
              [styles.active]: filterActive === '30D',
            })}
            onClick={() => handleChartPeriodFilter('30D')}
          >
            30D
          </Button>
        </div> */}
        <div className={styles.labelContainer}>Probabilities</div>
        <canvas ref={chartEl} height={height}></canvas>
      </div>
    </>
  );
}
