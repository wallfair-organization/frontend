import 'swiper/swiper.min.css';
import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import Icon from '../Icon';
import { Link, NavLink } from 'react-router-dom';

const CarouselContainer = ({
  children,
  title,
  titleLink,
  titleLinkTo,
  prevArrowInactive,
  nextArrowInactive,
  onNext,
  onPrevious,
  withComingSoonBanner,
}) => {
  return (
    <div className={classNames(styles.carouselContainer)}>
      {withComingSoonBanner && (
        <div className={styles.inactivePlaceholder}>Coming soon</div>
      )}
      <div className={styles.titleContainer}>
        <div className={styles.title}>{title}</div>

        <div
          className={classNames(styles.scrollButtons, {
            [styles.blurContainer]: withComingSoonBanner,
          })}
        >
          {withComingSoonBanner && (
            <div className={styles.comingSoonContainer} />
          )}
          {titleLink && (
            <Link to={titleLinkTo} className={styles.titleLink}>
              {titleLink}
            </Link>
          )}

          <div className={styles.buttons}>
            <button
              className={classNames(
                styles.arrowPrev,
                prevArrowInactive ? styles.inactive : null
              )}
              onClick={onPrevious}
              disabled={prevArrowInactive}
            >
              <Icon iconType={IconType.arrowLeft} iconTheme={IconTheme.white} />
            </button>
            <button
              className={classNames(
                styles.arrowNext,
                nextArrowInactive ? styles.inactive : null
              )}
              onClick={onNext}
              disabled={nextArrowInactive}
            >
              <Icon
                iconType={IconType.arrowSmallRight}
                iconTheme={IconTheme.white}
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(styles.carousel, {
          [styles.blurContainer]: withComingSoonBanner,
        })}
      >
        {withComingSoonBanner && <div className={styles.comingSoonContainer} />}
        {children}
      </div>
    </div>
  );
};

export default CarouselContainer;
