import styles from './styles.module.scss';
import classNames from 'classnames';
import Link from 'components/Link';
import { PopupActions } from 'store/actions/popup';
import { connect } from 'react-redux';
import _ from 'lodash';

const GameSmartsoft = ({ games, category, showHowtoLink, showPopup }) => {
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
  const categories = games.reduce((gs, g) => { return gs.includes(g.GameCategory) ? gs :gs.concat(g.GameCategory) },[])

  return (
    <div className={styles.gamesContainer}>
      {categories.map(category1 =>
       <>
        <div className={styles.gamesCategory}>
          {/* <img src={AlpacaIcon} alt={'Alpaca Icon'} /> */}
          <h2>{category1}</h2>
        </div>
        <div className={styles.games}>
          {games.filter(g => g.GameCategory===category1).map((game, index) =>
            <div
              className={styles.wrapper}
              key={`gamecard-${index}-`}
            >
              <Link
                to={`/external-game/${game.TechnicalName}/${game.TechnicalCategory}`}
                className={classNames(
                  styles.game,
                  styles.gameLink
                )}
              >
                <div
                  key={index}
                  className={classNames(
                    styles.gameItem,
                    getGameItemSizeClass()
                  )}
                >
                  <img src={game.picture ? game.picture : `https://www.smartsoftgaming.com/Content/Images/GameIcons/${game.TechnicalName}.png`} alt={`${game.TechnicalName}`}/>
                  <p className={styles.title}>{game.TechnicalName}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
        </>
     )}
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

export default connect(null, mapDispatchToProps)(GameSmartsoft);
