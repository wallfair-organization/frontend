import {memo, useEffect, useState} from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';

import styles from './styles.module.scss';
import {
  NEW_SLOTS_GAMES,
  SLOTS_GAMES,
  EXTERNAL_GAMES,
  EVOPLAY_GAMES,
  SOFTSWISS_GAMES,
  TOP_PICKS_GAMES,
  GAMES,
  GAME_CATEGORIES
} from '../../constants/Games';
import GameCards from '../../components/GameCards';

import {prepareEvoplayGames, prepareSoftSwissGames} from "../../helper/Games";
import SearchSection from './SearchSection';
import DisplaySection from './DisplaySection';
import { useIsMount } from 'components/hoc/useIsMount';
import { LOGGED_IN } from 'constants/AuthState';
import classNames from 'classnames';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import { ReactComponent as DiscordMarker } from '../../data/images/home/discord-mark.svg';
import EventActivitiesTabs from 'components/EventActivitiesTabs';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import CategoryList from 'components/CategoryList';
import Search from 'components/Search';

const Games = (
  authState,
  userId,
) => {
  const isMount = useIsMount();
  const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
  const [showDiscordBanner, setShowDiscordBanner] = useState(false);
  const [alpacaGames, setAlpacaGame] = useState(
    showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES
  );
  const [externalGames, setExternalGames] = useState(EXTERNAL_GAMES);
  const [externalGamesEvoplay, setExternalGamesEvoplay] = useState([...prepareEvoplayGames(EVOPLAY_GAMES)]);
  const [externalGamesSoftswiss, setExternalGamesSoftswiss] = useState([...prepareSoftSwissGames(SOFTSWISS_GAMES)]);

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  useEffect(() => {
    if (isMount) {
      setShowDiscordBanner(!checkdDiscordBanner());
    }
  }, []);

  const checkdDiscordBanner = () => {
    return localStorage.getItem('discordBanner') || false;
  };

  const hideDiscordBanner = () => {
    localStorage.setItem('discordBanner', true);
    setShowDiscordBanner(false);
  }

  const renderDiscordBanner =() => {
    return (
      <div className={classNames(styles.discordBanner, isLoggedIn() && styles.withPadding)}>
        <div className={styles.backgroundWrapper}>
          <div className={styles.whiteWrapper}>
            <div className={styles.whiteContainer}>
              <a
                href="https://discord.gg/vxAtN9y4Vt"
                target="_blank"
                rel="noreferrer"
              >
              <DiscordMarker />
              </a>
            </div>
          </div>
          <div className={styles.bodyContainer}>
            <Icon
              className={styles.closeButton}
              width={30}
              height={30}
              iconType={IconType.close}
              onClick={hideDiscordBanner}
            />
            <p>
              <a
                href="https://discord.gg/vxAtN9y4Vt"
                target="_blank"
                rel="noreferrer"
              >
                Join Discord for early access of Games, News and Airdrops
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderActivities = () => {
    return (
      <div className={styles.activities}>
        <div className={styles.title}>
          <h2>Activities</h2>
        </div>
        <Grid item xs={12}>
          <EventActivitiesTabs
            activitiesLimit={50}
            className={styles.activitiesTrackerGamesBlock}
            preselectedCategory={'game'}
            hideSecondaryColumns={true}
            layout="wide"
          ></EventActivitiesTabs>
        </Grid>
      </div>
    );
  };


  const setGames = (selectGame, gameCategory) => {
    if (selectGame) {
      const alpacaGamesDisplay =
        selectGame === 'alpaca'
          ? showUpcoming
            ? NEW_SLOTS_GAMES
            : SLOTS_GAMES
          : [];
      let externalGamesDisplaySmartsoft =
        selectGame === 'external' ? EXTERNAL_GAMES : [];
      let externalGamesDisplayEvoplay =
        selectGame === 'external' ? prepareEvoplayGames(EVOPLAY_GAMES, gameCategory) : [];
      let externalGamesDisplaySoftswiss =
        selectGame === 'external' ? prepareSoftSwissGames(SOFTSWISS_GAMES, gameCategory) : [];
     // let ret = [];
        if(gameCategory) {
          externalGamesDisplaySmartsoft = externalGamesDisplaySmartsoft.filter(game => {
            return game.GameCategory.indexOf(gameCategory) > -1;
          })

          externalGamesDisplayEvoplay = externalGamesDisplayEvoplay.filter(game => {
            return game.GameCategory.indexOf(gameCategory) > -1;
          })

          externalGamesDisplaySoftswiss = externalGamesDisplaySoftswiss.filter(game => {
            return game.GameCategory.indexOf(gameCategory) > -1;
          })
          // let map = new Map();
          // externalGamesDisplaySmartsoft.forEach((x) => map.set(x.TechnicalName, { ...x }));
          // externalGamesDisplayEvoplay.forEach((x) => map.set(x.TechnicalName, { ...x }));
          // ret = [...map.values()];
          // ret.sort(function (a, b) {
          //   if (a.TechnicalName < b.TechnicalName) {
          //     return -1;
          //   }
          //   if (a.TechnicalName > b.TechnicalName) {
          //     return 1;
          //   }
          //   return 0;
          // });
        }

      setAlpacaGame(alpacaGamesDisplay);
      setExternalGames(externalGamesDisplaySmartsoft);
      setExternalGamesEvoplay(externalGamesDisplayEvoplay);

      setExternalGamesSoftswiss(externalGamesDisplaySoftswiss);
      return;
    }

    setAlpacaGame(showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES);
    setExternalGames(EXTERNAL_GAMES);
    setExternalGamesEvoplay(prepareEvoplayGames(EVOPLAY_GAMES));
    setExternalGamesSoftswiss(prepareSoftSwissGames(SOFTSWISS_GAMES));
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true} carouselType='landingpage'>
      {/* <CustomCarousel carouselType={'landingpage'} /> */}
      <div className={styles.container}>
        <section className={styles.title}>
          <span>Games</span>
        </section>

        <section className={styles.header}>
          <div className={styles.categories}>
            <CategoryList
              className={styles.categoryList}
              categories={GAME_CATEGORIES}
              // handleSelect={handleSelectCategory}
            />
            <div className={styles.containerOptions}>
              <Search
                className={styles.searchInput}
                // value={searchTerm}
                // handleChange={setSearchTerm}
                // handleConfirm={onConfirmSearch}
              />
            </div>
          </div>
        </section>

        <DisplaySection selectedGamesLabel={TOP_PICKS_GAMES.header} selectedGamesNames={TOP_PICKS_GAMES.names} smartsoftGames={EXTERNAL_GAMES} evoplayGames={prepareEvoplayGames(EVOPLAY_GAMES)} softswissGames={prepareSoftSwissGames(SOFTSWISS_GAMES)}/>

        {/* <SearchSection
          setGames={setGames}
          alpacaGames={showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES}
          setAlpacaGame={setAlpacaGame}
          externalGames={EXTERNAL_GAMES}
          externalGamesEvoplay={externalGamesEvoplay}
          setExternalGamesEvoplay={setExternalGamesEvoplay}
          externalGamesSoftswiss={externalGamesSoftswiss}
          setExternalGamesSoftswiss={setExternalGamesSoftswiss}
          setExternalGames={setExternalGames}
        /> */}

        {alpacaGames.length > 0 && <GameCards games={alpacaGames} category="House Games" />}

        <DisplaySection smartsoftGames={externalGames} evoplayGames={externalGamesEvoplay} softswissGames={process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true' ? externalGamesSoftswiss : []} />
        {/* {showDiscordBanner && renderDiscordBanner()} */}
        {renderActivities()}
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    userId: state.authentication.userId,
  };
};

const Connected = connect(mapStateToProps, null)(Games);
export default memo(Connected);
