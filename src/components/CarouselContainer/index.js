import classNames from 'classnames';
import styles from './styles.module.scss';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import Icon from '../Icon';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import { isMobile } from 'react-device-detect';

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
        <div className={styles.inactivePlaceholder}>Coming Soon</div>
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
            <Link
              to={titleLinkTo}
            >
              <Button
                theme={ButtonTheme.secondaryButton} 
                className={styles.titleLink}>
                {titleLink}
              </Button>
            </Link>
          )}

          <div className={styles.buttons}>
            {!isMobile && <Button
              theme={ButtonTheme.secondaryButton} 
              className={classNames(
                styles.arrowPrev,
                prevArrowInactive ? styles.inactive : null
              )}
              onClick={onPrevious}
              disabled={prevArrowInactive}
            >
              <Icon iconType={IconType.arrowLeft} iconTheme={IconTheme.white} />
            </Button>}
            {!isMobile && <Button
              theme={ButtonTheme.secondaryButton} 
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
            </Button>}
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
