import styles from './styles.module.scss';
import _ from 'lodash';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import classNames from 'classnames';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';

const Favorite = props => {
  const {
    isFavorite = false,
    onBookmark = () => {},
    onBookmarkCancel = () => {},
  } = props;

  const iconToUse = isFavorite ? IconType.starFull : IconType.star;

  return (
    <div className={styles.fvtTrigger}>
      <div className={styles.fvtContainer}>
        <Button
          className={styles.fvtButton} 
          onClick={() => {
            isFavorite ? onBookmarkCancel() : onBookmark();
          }}
          theme={ButtonTheme.secondaryButton}
        >
          <Icon iconType={iconToUse} iconTheme={IconTheme.white} />
        </Button>
      </div>
    </div>
  );
};

export default Favorite;
