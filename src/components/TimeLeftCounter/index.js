import React from 'react';
import { useState } from 'react';
import { calculateTimeLeft } from '../../helper/Time';
import { useEffect } from 'react';
import styles from './styles.module.scss';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';

const TimeLeftCounter = ({ endDate, viewSeconds = false }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

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
        <>
          <span className={styles.timePartContainer}>{value}</span>
          <span className={styles.timePartName}>{name}</span>
        </>
      );
    }

    return null;
  };

  return (
    <div>
      {renderTimeLeft('d', _.get(timeLeft, 'days'), false)}
      {renderTimeLeft('hrs', _.get(timeLeft, 'hours'))}
      {renderTimeLeft('min', _.get(timeLeft, 'minutes'))}
      {viewSeconds && renderTimeLeft('sec', _.get(timeLeft, 'seconds'))}
    </div>
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
