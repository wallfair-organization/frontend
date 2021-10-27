import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { getOutcomes } from 'api';
import { calculateTimeLeft } from '../../helper/Time';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';
import { nanoid } from 'nanoid';
const BetCard = ({
  betId,
  onClick,
  onBookmark = () => {},
  onBookmarkCancel = () => {},
  title,
  image,
  eventEnd,
  eventCardClass,
  outcomes,
  category,
  item,
  isBookmarked = false,
}) => {
  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + image + '")',
    };
  };

  const getStickerStyle = category => {
    const cat = EVENT_CATEGORIES.find(c => c.value === category);
    if (!cat) return {};
    return {
      backgroundImage: 'url("' + cat.image + '")',
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(eventEnd))
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(eventEnd)));
    }, 60000);

    return () => clearTimeout(timerId);
  }, [eventEnd]);

  const [outcomeValues, setOutcomeValues] = useState([
    ...outcomes.map(outcome => ({ ...outcome, amount: '...' })),
  ]);

  const roundOutcome = value => {
    return Math.min(100, Math.floor((1 / value) * 100));
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

  function getGaugeWidth(amount = 1) {
    return {
      width: `${amount}px`,
    };
  }

  return (
    <div className={styles.betCardContainer} onClick={onClick}>
      <div className={classNames(styles.betCard, eventCardClass)}>
        <div className={styles.picture} style={getEventCardStyle()} />
        <div className={styles.header}>
          <div
            className={classNames([styles.categorySticker])}
            style={getStickerStyle(category)}
          />
          <span className={styles.section}>{category}</span>

          <div className={styles.special}>
            {isBookmarked ? (
              <div className={styles.starFull} onClick={onBookmarkCancel} />
            ) : (
              <div className={styles.star} onClick={onBookmark} />
            )}

            {eventEnd && new Date(eventEnd) > new Date() ? (
              <div className={styles.timer}>
                <span>
                  {timeLeft?.days || 0}d {timeLeft?.hours || 0}h{' '}
                  {timeLeft?.minutes || 0}m
                </span>
              </div>
            ) : (
              <div className={styles.timer}>
                <span>Ended</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.titleContainer} title={title}>
            <span className={styles.title}>{title}</span>
          </div>
          <div className={styles.outcomesContainer}>
            {outcomeValues.map(outcome => (
              <div className={styles.outcome} key={nanoid()}>
                <span className={styles.outcomeName} title={outcome.name}>
                  {outcome.name}
                </span>
                <div className={styles.visualization}>
                  <div
                    className={styles.gauge}
                    style={getGaugeWidth(outcome.amount)}
                  />
                </div>
                <span className={styles.amount} title="Likelihood of happening">
                  {outcome.amount}%
                </span>
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.button}>Trade</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetCard;
