import styles from './styles.module.scss';
import classNames from 'classnames';
import Link from 'components/Link';
import { PopupActions } from 'store/actions/popup';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { getEvoplaygames } from 'api/casino-games';

const GameEvoplay = ({ showHowtoLink, showPopup, allgames }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    setGames(allgames)
    /*
    // Fetching games directly from them
    getEvoplaygames()
      .then(({data}) => {
        setGames(data?.games)
      })
      .catch(error => {
        console.log("error", error)
      });
    */
    return () => {
      setGames([])
    }
  }, [])

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

  const newGames = Object.values(games).filter(g => g.game_sub_type !== 'socketgames').map((g, i) => {return{...g, value: Object.keys(games)[i], game_sub_type:( g.game_sub_type === 'Blackjack' || g.game_sub_type === 'Table' || g.game_sub_type === 'Baccarat' ||g.game_sub_type === 'Roulette' ||g.game_sub_type === 'Poker')  ? 'Casino Games' : g.game_sub_type}})

  const categories = newGames.reduce((gs, g) => { return gs.includes(g.game_sub_type) ? gs :gs.concat(g.game_sub_type) },[])

  return (
    <div className={styles.gamesContainer}>
      {categories.reverse().map(category1 =>
       <>
         <div className={styles.gamesCategory}>
            <h2>{category1}</h2>
          </div>
          <div className={styles.games}>
            {newGames.filter(g => g.game_sub_type===category1).map((game, index) => {
              const name = game.absolute_name.substring(game.absolute_name.lastIndexOf("\\") + 1)
              return(
                <div
                  className={styles.wrapper}
                  key={`gamecard-${index}-`}
                >
                  <Link
                    to={`/evoplay-game/${game.value}`}
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
                      <img src={`/images/evoplay/${name}_360x360.jpg`} alt={`${name}`}/>
                      <p className={styles.title}>{game.name}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
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

export default connect(null, mapDispatchToProps)(GameEvoplay);
