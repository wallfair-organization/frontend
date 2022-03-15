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
  GAME_CATEGORIES,
  GAME_PROVIDERS,
} from '../../constants/Games';
import GameCards from '../../components/GameCards';

import {prepareEvoplayGames, prepareSoftSwissGames} from "../../helper/Games";
import DisplaySection from './DisplaySection';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import EventActivitiesTabs from 'components/EventActivitiesTabs';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import CategoryList from 'components/CategoryList';
import Search from 'components/Search';
import Routes from 'constants/Routes';
import ButtonTheme from 'components/Button/ButtonTheme';
import Button from 'components/Button';
import { useHistory } from 'react-router-dom';
import PumpDumpBanner from 'data/backgrounds/home/pumpdump-banner.jpg';
import ElonBanner from 'data/backgrounds/home/elon-banner.jpg';
import GamesCarousel from 'components/GamesCarousel';
import GameProviderFilter from 'components/GameProviderFilter';

const Games = () => {
    const history = useHistory();

  const initialHouse = NEW_SLOTS_GAMES;
  const initialExternal = EXTERNAL_GAMES;
  const initialEvoplay = [...prepareEvoplayGames(EVOPLAY_GAMES)];
  const initialSwiss = [...prepareSoftSwissGames(SOFTSWISS_GAMES)];

  const [houseGames, setHouseGames] = useState(initialHouse);
  const [externalGames, setExternalGames] = useState(initialExternal);
  const [externalGamesEvoplay, setExternalGamesEvoplay] = useState(initialEvoplay);
  const [externalGamesSoftswiss, setExternalGamesSoftswiss] = useState(initialSwiss);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');


  const onConfirmSearch = (value) => {
      if (value === null) {
        setSearchTerm('');
        return;
      } else {
        setSelectedProvider('all');
        setSelectedCategory('All');
        setSearchTerm(value);
      }

      const searchedExternalGames = initialExternal.filter(game => {
        const match = game.TechnicalName.toLowerCase().match(value.toLowerCase());
        return Array.isArray(match);
      });

      const searchedExternalGamesEvoplay = initialEvoplay.filter(game => {
        const match = game.TechnicalName.toLowerCase().match(value.toLowerCase());
        return Array.isArray(match);
      });
      const searchedExternalGamesSoftswiss = initialSwiss.filter(game => {
        const match = game.TechnicalName.toLowerCase().match(value.toLowerCase());
        return Array.isArray(match);
      });

      setExternalGames(searchedExternalGames);
      setExternalGamesEvoplay(searchedExternalGamesEvoplay);
      setExternalGamesSoftswiss(searchedExternalGamesSoftswiss);

      if(!value) {
        setGames('external', 'All');
      }

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

  const renderGamesBanner = () => {
    return (
      <div className={styles.houseGamesContainer}>
        <div className={styles.title}>
          <h2 id="games">House Games</h2>
        </div>
        <div className={styles.games}>
          <div
            onClick={() => history.push(Routes.elonGame)}
            className={styles.gameBanner}
          >
            <img src={ElonBanner} alt="Elon Game banner" />
            <span className={styles.bannerTitle}>
              Play the
              <br />
              Elon Game
            </span>
            <Button
              theme={ButtonTheme.primaryButtonM}
              className={styles.bannerButton}
            >
              Play now
            </Button>
          </div>
          <div
            onClick={() => history.push(Routes.pumpdumpGame)}
            className={styles.gameBanner}
          >
            <img src={PumpDumpBanner} alt="Pump Dump Game banner" />
            <span className={styles.bannerTitle}>
              Let's play
              <br />
              Pump &amp; Dump
            </span>
            <Button
              theme={ButtonTheme.primaryButtonM}
              className={styles.bannerButton}
            >
              Play now
            </Button>
          </div>
        </div>
      </div>
    );
  };


  const setGames = (selectGame, gameCategory, provider) => {

    if (provider !== 'all' || gameCategory !== 'All') {

      let externalGamesDisplaySmartsoft =
        ['all', 'smartsoft'].includes(provider) ? EXTERNAL_GAMES : [];
      let externalGamesDisplayEvoplay =
        ['all', 'evoplay'].includes(provider) ? prepareEvoplayGames(EVOPLAY_GAMES, gameCategory) : [];
      let externalGamesDisplaySoftswiss =
        ['all', 'bgaming', 'evolution','yggdrasil', 'wazdan','1spin4win','thunderkick','slotmill'].includes(provider) ? prepareSoftSwissGames(SOFTSWISS_GAMES, gameCategory, provider) : [];
        // ['all', 'bgaming', 'evolution','yggdrasil', 'wazdan','1spin4win','thunderkick','playngo','slotmill','merkur'].includes(provider) ? prepareSoftSwissGames(SOFTSWISS_GAMES, gameCategory, provider) : [];
      // let ret = [];

        if(gameCategory) {
          externalGamesDisplaySmartsoft = externalGamesDisplaySmartsoft.filter(game => {
            return (gameCategory === 'All' || game.GameCategory.indexOf(gameCategory) > -1);
          })

          externalGamesDisplayEvoplay = externalGamesDisplayEvoplay.filter(game => {
            return (gameCategory === 'All' || game.GameCategory.indexOf(gameCategory) > -1);
          })

          externalGamesDisplaySoftswiss = externalGamesDisplaySoftswiss.filter(game => {
            return (gameCategory === 'All' || game.GameCategory.indexOf(gameCategory) > -1);
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

      // setHouseGames(houseGamesDisplay);

      setExternalGames(externalGamesDisplaySmartsoft);

      setExternalGamesEvoplay(externalGamesDisplayEvoplay);

      setExternalGamesSoftswiss(externalGamesDisplaySoftswiss);
      return;
    }

    // setHouseGames(initialHouse);
    setExternalGames(initialExternal);
    setExternalGamesEvoplay(initialEvoplay);
    setExternalGamesSoftswiss(initialSwiss);
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true} carouselType='landingpage'>
      <GamesCarousel />
      <div className={styles.container}>

        {renderGamesBanner()}

        <DisplaySection selectedGamesLabel={TOP_PICKS_GAMES.header} selectedGamesNames={TOP_PICKS_GAMES.names} smartsoftGames={EXTERNAL_GAMES} evoplayGames={prepareEvoplayGames(EVOPLAY_GAMES)} softswissGames={prepareSoftSwissGames(SOFTSWISS_GAMES)}/>

        <div className={styles.categories}>
          <GameProviderFilter
            className={styles.gameproviderList}
            providers={GAME_PROVIDERS}
            setSelectedProvider={(provider) => {
              setSelectedProvider(provider);
              setGames('external', selectedCategory, provider);
              setSearchTerm('');
            }}
            selectedProvider={selectedProvider}
          />
        </div>

        <section className={styles.header}>
          <div className={styles.categories}>
            <CategoryList
              className={styles.categoryList}
              categories={GAME_CATEGORIES}
              setSelectedCategory={(category) => {
                setSelectedCategory(category);
                setGames('external', category, selectedProvider)
                setSearchTerm('');
              }}
              selectedCategory={selectedCategory}
            />
            <div className={styles.containerOptions}>
              <Search
                className={styles.searchInput}
                value={searchTerm}
                handleChange={setSearchTerm}
                handleConfirm={onConfirmSearch}
              />
            </div>
          </div>
        </section>

        {/* <SearchSection
          setGames={setGames}
          houseGames={showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES}
          setHouseGame={setHouseGame}
          externalGames={EXTERNAL_GAMES}
          externalGamesEvoplay={externalGamesEvoplay}
          setExternalGamesEvoplay={setExternalGamesEvoplay}
          externalGamesSoftswiss={externalGamesSoftswiss}
          setExternalGamesSoftswiss={setExternalGamesSoftswiss}
          setExternalGames={setExternalGames}
        /> */}



        <DisplaySection smartsoftGames={externalGames} evoplayGames={externalGamesEvoplay} softswissGames={externalGamesSoftswiss} />
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
