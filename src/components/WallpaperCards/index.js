import styles from './styles.module.scss';
import classNames from 'classnames';
import Link from 'components/Link';
import { PopupActions } from 'store/actions/popup';
import { connect } from 'react-redux';
import _ from 'lodash';

const WallpaperCards = ({ wallpapers, category, showHowtoLink, showPopup }) => {
  const getItemSizeClass = () => {
    switch (wallpapers.length) {
      case 3:
        return styles.cardItemMd;
      case 4:
        return styles.cardItemSm;
      default:
        return styles.cardItemLg;
    }
  };

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cardsCategory}>
        <span>{category}</span>
      </div>
      <div className={styles.cards}>
        {wallpapers.map((card, index) => {
          return (
            <div
              className={styles.wrapper}
              key={`card-${_.get(card, 'title')}-${index}-`}
            >
              <Link
                to={card.linkTo}
                className={classNames(
                  styles.cardLink,
                  !card.active ? styles.cardLinkInactive : null
                )}
                target="_blank"
              >
                <div
                  key={index}
                  className={classNames(
                    styles.cardItem,
                    card.active ? null : styles.inactive,
                    getItemSizeClass()
                  )}
                >
                  <img src={card.background} />
                  <div className={styles.cardInfo}>
                    {card.subtitle && (
                      <div className={styles.subtitle}>{card.subtitle}</div>
                    )}
                    <div className={styles.title}>{card.title}</div>
                    <div className={styles.description}>{card.description}</div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(WallpaperCards);
