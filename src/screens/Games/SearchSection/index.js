import { Grid } from "@material-ui/core";
import classNames from "classnames";
import { useState } from "react";
import styles from '../styles.module.scss';
import {ReactComponent as SearchIcon} from '../../../data/icons/search-small.svg'

const SearchSection = ({ setGames,
  alpacaGames,
setAlpacaGame,
externalGames,
setExternalGames,
externalGamesEvoplay,
setExternalGamesEvoplay,
  externalGamesSoftswiss,
  setExternalGamesSoftswiss
 }) => {
  const gamesTitleList = [
    'House Games',
    'Casino',
    'Slot',
    'Roulette',
    'Card Games',
    'Instant Win',
    'Keno',
  ];
  const [search, setSearch] = useState('');
  const [selectedButton, setSelectedButton] = useState('All');
  const [searchSelected, setSearchSelected] = useState(false);

  const onChangeSearch = e => {
    const value = e.target.value;

    if (value === null) {
      setSelectedButton('All');
    } else {
      setSelectedButton(null);
    }

    setSearch(value);


    const searchedAlpacaGame = alpacaGames.filter(game => {
      const match = game.title.toLowerCase().match(value.toLowerCase());
      return Array.isArray(match);
    });


    const searchedExternalGames = externalGames.filter(game => {
      const match = game.TechnicalName.toLowerCase().match(value.toLowerCase());
      return Array.isArray(match);
    });

    const searchedExternalGamesEvoplay = externalGamesEvoplay.filter(game => {
      const match = game.TechnicalName.toLowerCase().match(value.toLowerCase());
      return Array.isArray(match);
    });
    const searchedExternalGamesSoftswiss = externalGamesSoftswiss.filter(game => {
      const match = game.TechnicalName.toLowerCase().match(value.toLowerCase());
      return Array.isArray(match);
    });

    setAlpacaGame(searchedAlpacaGame);
    setExternalGames(searchedExternalGames);
    setExternalGamesEvoplay(searchedExternalGamesEvoplay);
    setExternalGamesSoftswiss(searchedExternalGamesSoftswiss);

    if(!value) {
      setGames();
    }
  };

  const handleGameCategory = (gameCategory) => {
    selectGame(gameCategory);
    setSelectedButton(gameCategory);
    setSearch('');
  }

  const selectGame = (gameCategory, searched) => {
    if (gameCategory === 'All') {
      setGames();
      return;
    } else if (gameCategory === gamesTitleList[0]) {
      if (searched) {
      } else {
        setGames('alpaca');
      }
    } else {
      setGames('external', gameCategory);
    }
  };

  return (
    <div className={styles.searchContainer}>

        <div className={styles.searchWrapper}>
          <div className={styles.search}>
            <SearchIcon />
            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={onChangeSearch}
            />
          </div>
        </div>


          <div className={styles.categoryGrid}>
            {<div className={classNames(styles.searchItem, styles.selectAllDesktop)} onClick={e => handleGameCategory('All')}>All</div>}
            {gamesTitleList.map((game, index) => {
              return (
                <div key={index + game} className={classNames(styles.searchItem, selectedButton === game ? styles.active : null)} onClick={e => handleGameCategory(game)}>
                  {game}
                </div>
            );
            })}
            {selectedButton !== 'All' && <div className={classNames(styles.searchItem, styles.selectAllMobile)} onClick={e => handleGameCategory('All')}>All</div>}
          </div>
    </div>
  );
};

export default SearchSection;
