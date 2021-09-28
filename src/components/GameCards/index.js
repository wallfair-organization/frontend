import styles from './styles.module.scss';
import classNames from 'classnames';
import Link from 'components/Link';
import InfoBox from 'components/InfoBox';

const GameCards = ({ games, category }) => {
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

  return (
    <div className={styles.gamesContainer}>
      <div className={styles.gamesCategory}>{category}</div>
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

export default GameCards;
