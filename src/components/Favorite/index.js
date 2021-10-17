import styles from './styles.module.scss';
import _ from 'lodash';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import classNames from 'classnames';

const Favorite = props => {
  const {
    isFavorite = false,
    onBookmark = () => {},
    onBookmarkCancel = () => {},
    isMobile = false,
    buttonClass,
  } = props;

  const iconToUse = isFavorite ? IconType.starFull : IconType.star;

  return (
    <div className={styles.fvtTrigger}>
      <div className={styles.fvtContainer}>
        <div
          className={classNames(styles.fvtButton, buttonClass)}
          onClick={() => {
            isFavorite ? onBookmarkCancel() : onBookmark();
          }}
        >
          <div className={styles.fvtIcon}>
            <Icon iconType={iconToUse} iconTheme={IconTheme.favorite} />
          </div>
          {!isMobile && `Favorite`}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
