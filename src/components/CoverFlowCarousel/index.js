import styles from './styles.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';
import ProgressCircle from 'components/ProgressCircle';

// timer ref must outlive render, otherwise a memory leak occurs
let nextSlideTimer = null;
let loader = null;

const CoverFlowCarousel = ({
  children,
  currentSlide = 0,
  slideDurationSeconds = 10,
  onSlideChange = index => {},
}) => {
  const numOfPages = children.length;
  const ref = useRef(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(currentSlide);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    ref.current = true;

    onSlideChange(currentSlideIndex);

    setProgress(0);
    window.clearTimeout(nextSlideTimer);
    window.clearInterval(loader);
    nextSlideTimer = null;
    loader = null;

    if (slideDurationSeconds > 0 && ref.current) {
      nextSlideTimer = window.setTimeout(() => {
        ref.current && setCurrentSlideIndex(getNextIndex(currentSlideIndex));
      }, slideDurationSeconds * 1_000);

      loader = setInterval(() => {
        ref.current &&
          setProgress(prevProgress =>
            prevProgress >= 100 ? 0 : prevProgress + 1
          );
      }, 100);
    }

    return () => (ref.current = false);
  }, [currentSlideIndex]);

  const getPreviousIndex = index => (index === 0 ? numOfPages - 1 : index - 1);
  const getNextIndex = index => (index === numOfPages - 1 ? 0 : index + 1);

  if (children.length === 1) {
    // no sliding if only one slide provided
    return (
      <div className={styles.sliderContainer}>
        <div className={classNames(styles.slide, styles.slideCurrent)}>
          {children[0]}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sliderContainer}>
      {children.map((el, index) => (
        <div
          key={index}
          className={classNames(
            styles.slide,
            currentSlideIndex === index && styles.slideCurrent,
            index === getPreviousIndex(currentSlideIndex) &&
              styles.slidePrevious,
            index === getNextIndex(currentSlideIndex) && styles.slideNext
          )}
          data-slide-index={index}
        >
          {el}
        </div>
      ))}
      <button
        className={styles.previousSlideButton}
        onClick={() =>
          setCurrentSlideIndex(getPreviousIndex(currentSlideIndex))
        }
      >
        <Icon iconType={'arrowLeft'} />
      </button>
      <button
        className={styles.nextSlideButton}
        onClick={() => setCurrentSlideIndex(getNextIndex(currentSlideIndex))}
      >
        <Icon iconType={'arrowLeft'} />
        <ProgressCircle percentage={progress} />
      </button>
    </div>
  );
};

export default CoverFlowCarousel;
