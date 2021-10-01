import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import TimeLeftCounter from '../TimeLeftCounter';
import classNames from 'classnames';
import { getOutcomes } from 'api';
import moment from 'moment';

const BetCard = ({
  betId,
  onClick,
  title,
  image,
  eventEnd,
  eventCardClass,
  outcomes,
}) => {
  const happensWithin24h = moment(eventEnd).diff(moment(), 'h') <= 24;

  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + image + '")',
    };
  };

  const [outcomeValues, setOutcomeValues] = useState([
    ...outcomes.map(outcome => ({ ...outcome, amount: '...' })),
  ]);

  const roundOutcome = value => {
    return Math.min(100, Math.floor((1 / value) * 100)) + '%';
  };

  useEffect(() => {
    const fetchOutcome = async () => {
      const result = await getOutcomes(betId, 1);
      if (result) {
        const populatedValues = result.data;
        const mergedData = outcomes.map(outcome => ({
          ...outcome,
          amount: roundOutcome(+populatedValues[outcome.index].outcome),
        }));
        setOutcomeValues(mergedData);
      }
    };

    fetchOutcome();
  }, []);

  return (
    <div className={styles.betCardContainer} onClick={onClick}>
      <div className={classNames(styles.betCard, eventCardClass)}>
        <>
          <div
            className={styles.betCardBackgroundBlur}
            style={getEventCardStyle()}
          ></div>
          <div className={styles.betCardBackground}></div>
          <div
            className={classNames(styles.content, {
              // [styles.timerActive]: eventEnd,
            })}
          >
            <span className={styles.title}>{title}</span>
            <div className={styles.outcomesContainer}>
              {outcomeValues.map(outcome => (
                <div className={styles.outcome}>
                  <span
                    className={styles.amount}
                    title="Likelihood of happening"
                  >
                    {outcome.amount}
                  </span>
                  <span className={styles.outcomeName} title={outcome.name}>
                    {outcome.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {eventEnd && happensWithin24h && (
            <div className={styles.timer}>
              <span className={styles.timerTitle}>Event ends in:</span>
              <span>
                <TimeLeftCounter endDate={eventEnd} viewSeconds={true} />
              </span>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default BetCard;
