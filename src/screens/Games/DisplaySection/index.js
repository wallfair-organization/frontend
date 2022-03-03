import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { OnboardingActions } from 'store/actions/onboarding';
import { selectUser } from 'store/selectors/authentication';
import styles from '../styles.module.scss';
import _ from 'lodash';

const DisplaySection = (props) => {
//   let history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const {smartsoftGames, evoplayGames, softswissGames, selectedGamesNames, selectedGamesLabel} = props;

  const [games, setGames] = useState([]);
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

  const handleGameClick = (e, gameUrl, gameCfg) => {
    if(!user.isLoggedIn) {
      dispatch(OnboardingActions.start());
    } else {
      // history.push(gameUrl)
      // dispatch(
      //   PopupActions.show({
      //     popupType: PopupTheme.selectGameMode,
      //     options: {
      //       maxWidth: true,
      //       data: {
      //         gameUrl,
      //         gameCfg,
      //         user
      //       }
      //     },
      //   })
      // );
    }

  }

  const renderLinkByProvider = (game, index) => {
    if(game.GameProvider === 'evoplay') {
      const cfg = game._cfg;
      const name = cfg.absolute_name.substring(cfg.absolute_name.lastIndexOf("\\") + 1);
      const evoPlayUrl = `/evoplay-game/${cfg.name}/${cfg.game_sub_type}/${game.gameKey}`;
      return <div onClick={(e) => {
        handleGameClick(e,evoPlayUrl, game);
      }} key={name + game.GameProvider}>
        <Link
        to={user.isLoggedIn ? evoPlayUrl : undefined}
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
          <p className={styles.title}>{cfg.name}</p>
        </div>
      </Link></div>
    }
    if (game.GameProvider === 'softswiss') {
      const cfg = game._cfg;
      const name = cfg.title;
      const softswissUrl = `/softswiss-game/${cfg.identifier}`;
      return <div onClick={(e) => {
        handleGameClick(e, softswissUrl, game);
      }} key={name + game.GameProvider}>
        <Link
          to={user.isLoggedIn ? softswissUrl : undefined}
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
            <img src={`${game.GameThumb}`} alt={`img`} />
            <p className={styles.title}>{name}</p>
          </div>
        </Link></div>
    }
    if (game.TechnicalName !== undefined) {
    const smartSoftUrl = `/external-game/${game.TechnicalName}/${game.TechnicalCategory}`;

    return <div onClick={(e) => {
      handleGameClick(e, smartSoftUrl, game);
    }} key={game.TechnicalName + game.GameProvider}>

      <Link
      to={user.isLoggedIn ? smartSoftUrl : undefined}
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
    </Link></div>
  }
}

  useEffect(() => {

    if(smartsoftGames && evoplayGames && softswissGames) {
      if(selectedGamesNames && selectedGamesNames.length) {
        const allGames = [...smartsoftGames, ...evoplayGames, ...softswissGames];
        const selectedGames = [];

        selectedGamesNames.forEach((item)=> {
          const findGame = _.find(allGames, {TechnicalName: item});

          if(findGame) {
            selectedGames.push(findGame);
          }
        })

        setGames(selectedGames);
      } else {
        let ret = [];
        let map = new Map();
        smartsoftGames.forEach((x) => map.set(x.TechnicalName, { ...x }));
        evoplayGames.forEach((x) => map.set(x.TechnicalName, { ...x }));
        softswissGames.forEach((x) => map.set(x.TechnicalName, { ...x }));
        ret = [...map.values()];
        ret.sort(function (a, b) {
          if (a.TechnicalName < b.TechnicalName) {
            return -1;
          }
          if (a.TechnicalName > b.TechnicalName) {
            return 1;
          }
          return 0;
        });
        setGames([...ret,""]);
      }
    }

    return () => {
      setGames([])
    }
  }, [smartsoftGames, evoplayGames, softswissGames])

  let categories = games.reduce((gs, g) => { return gs.includes(g.GameCategory) ? gs :gs.concat(g.GameCategory) },[]);

  return (
    <div className={styles.gamesContainer}>
      {selectedGamesNames ? <div className={classNames(styles.gamesCategorySelected)}>
        <div className={styles.gamesCategory}>
          <h2>{selectedGamesLabel}</h2>
        </div>
        <div className={classNames(styles.games)}>
          {games.map((game, index) => {
              let entryKey = `gamecard-${index}-${game.TechnicalName}`;
              return <div
                className={styles.wrapper}
                key={entryKey}
              >
                {renderLinkByProvider(game, index)}
              </div>
            }
          )}
        </div>
      </div> : (categories.map((category1, index) => {
         return <div key={category1 + index}>
            <div className={styles.gamesCategory}>
              <h2>{category1}</h2>
            </div>

            <div className={classNames(styles.games)}>
              {games.filter(g => g.GameCategory===category1).map((game, index) => {

                  return <div
                    className={styles.wrapper}
                    key={`gamecard-${index}-${game.TechnicalName}`}
                  >
                    {renderLinkByProvider(game, index)}
                  </div>

                }
              )}
            </div>
          </div>
      }

      ))}
    </div>
  );
};

export default DisplaySection;
