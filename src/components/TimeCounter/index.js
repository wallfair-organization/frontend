import React from 'react';
import { useState } from 'react';
import { calculateTimeLeft } from '../../helper/Time';
import { useEffect } from 'react';
import componentStyles from './styles.module.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';

const TimeLeftCounter = ({ endDate, externalStyles }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

  const styles = {
    ...componentStyles,
    ...externalStyles,
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearTimeout(timerId);
  });

  const renderTimeLeft = (name, value, forceRender = true) => {
    if (value > 0 || forceRender) {
      if (!value) {
        value = 0;
      }

      return (
        <div className={styles.timePartContainer}>
          <div className={styles.timePartValue}>{value}</div>
          <div className={styles.timePartName}>{name}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {renderTimeLeft('days', _.get(timeLeft, 'days'), false)}
      {_.get(timeLeft, 'days') ? (
        <div className={styles.timerColon}>:</div>
      ) : null}
      {renderTimeLeft('hours', _.get(timeLeft, 'hours'))}
      <div className={styles.timerColon}>:</div>
      {renderTimeLeft('minutes', _.get(timeLeft, 'minutes'))}
      {/*<div className={styles.timerColon}>:</div>*/}
      {/* {renderTimeLeft('sec', _.get(timeLeft, 'seconds'))} */}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  let endDate = _.get(ownProps, 'endDate', new Date());
  endDate = moment(endDate).toDate();

  return {
    endDate,
  };
};

export default connect(mapStateToProps, null)(TimeLeftCounter);
