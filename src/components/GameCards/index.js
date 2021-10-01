import styles from './styles.module.scss';
import classNames from 'classnames';
import Link from 'components/Link';
import InfoBox from 'components/InfoBox';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import IconTheme from 'components/Icon/IconTheme';
import PopupTheme from 'components/Popup/PopupTheme';
import { useCallback } from 'react';
import { PopupActions } from 'store/actions/popup';
import { connect } from 'react-redux';

const GameCards = ({ games, category, showHowtoLink, showPopup }) => {
  const getGameItemSizeClass = () => {
    switch (games.length) {
      case 3:
        return styles.gameItemMd;
      case 4:
        return styles.gameItemSm;
      default:
        return styles.gameItemLg;
    }
  };

  const handleHelpClick = useCallback(event => {
    showPopup(PopupTheme.explanation);
  }, []);

  return (
    <div className={styles.gamesContainer}>
      <div className={styles.gamesCategory}>
        <span>{category}</span>
        {showHowtoLink && (
          <>
            <Icon
              className={styles.questionIcon}
              iconType={IconType.question}
              iconTheme={IconTheme.white}
              height={25}
              width={25}
              onClick={handleHelpClick}
            />
            <span onClick={handleHelpClick} className={styles.howtoLink}>
              How does it work?
            </span>
          </>
        )}
      </div>
      <div className={styles.games}>
        {games.map((game, index) => {
          return (
            <div className={styles.wrapper}>
              {game?.infoIcon && (
                <InfoBox
                  iconType={game.infoIcon.iconType}
                  position={`bottomLeft`}
                  iconClassName={`infoIconGame`}
                >
                  {game.infoIcon.content}
                </InfoBox>
              )}
              <Link
                to={game.linkTo}
                className={classNames(
                  styles.gameLink,
                  !game.active ? styles.gameLinkInactive : null
                )}
              >
                <div
                  key={index}
                  className={classNames(
                    styles.gameItem,
                    game.active ? null : styles.inactive,
                    getGameItemSizeClass()
                  )}
                >
                  <img src={game.background} />
                  <div className={styles.gameInfo}>
                    <div className={styles.subtitle}>{game.subtitle}</div>
                    <div className={styles.title}>{game.title}</div>
                    <div className={styles.description}>{game.description}</div>
                  </div>
                  {!game.active && (
                    <div className={styles.inactivePlaceholder}>
                      Coming Soon
                    </div>
                  )}
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

export default connect(null, mapDispatchToProps)(GameCards);
