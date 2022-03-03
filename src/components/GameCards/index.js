import styles from './styles.module.scss';
import classNames from 'classnames';
import Link from 'components/Link';
// import InfoBox from 'components/InfoBox';
// import Icon from 'components/Icon';
// import IconType from 'components/Icon/IconType';
// import IconTheme from 'components/Icon/IconTheme';
// import PopupTheme from 'components/Popup/PopupTheme';
// import { useCallback } from 'react';
import { PopupActions } from 'store/actions/popup';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Grid } from '@material-ui/core';

const GameCards = ({ games,gameTitle = false, category, showHowtoLink, showPopup }) => {
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

  const renderHouseGames = (game, index) => {
    return (
      <Grid
        item
        lg={2}
        md={3}
        xs={6}
        key={`gamecard-${_.get(game, 'title')}-${index}-`}
      >
        <Link
          className={classNames(
            styles.gameLink,
            !game.active ? styles.gameLinkInactive : null
          )}
          to={game.active ? game.linkTo : ''}
        >
          <div
            key={index}
            className={classNames(
              styles.gameItem,
              game.active ? null : styles.inactive,
              // getGameItemSizeClass()
            )}
          >
            <img src={game.background} alt="game-background" />
          </div>
        </Link>
      </Grid>
    );
  };

  return (
    <div className={classNames(styles.gamesContainer, !gameTitle ? styles.gamesPageContainer : null)}>
      {gameTitle ?
      <div className={styles.title}>
          <h2>House Games</h2>
          <p>Games available only in Wallfair. 100% fun &amp; pure love </p>
        </div>
      
      : (
      <div className={styles.gamesCategory}>
        <h2>{category}</h2>
      </div>
      ) }
      <div className={styles.games}>
        <Grid container spacing={1}>
          {games.map((game, index) => renderHouseGames(game, index))}
        </Grid>
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
