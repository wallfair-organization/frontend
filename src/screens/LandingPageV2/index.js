import {memo, useEffect, useState} from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';

import styles from './styles.module.scss';
import {
  NEW_SLOTS_GAMES,
  SLOTS_GAMES,
  EXTERNAL_GAMES,
  EVOPLAY_GAMES,
  SOFTSWISS_GAMES,
  TOP_PICKS_GAMES
} from '../../constants/Games';
import GameCards from '../../components/GameCards';

import {prepareEvoplayGames, prepareSoftSwissGames} from "../../helper/Games";
import SearchSection from './SearchSection';
import DisplaySection from './DisplaySection';
import { useIsMount } from 'components/hoc/useIsMount';
import { useLocation } from 'react-router-dom';
import useOAuthCallback from 'hooks/useOAuthCallback';
import { LOGGED_IN } from 'constants/AuthState';
import classNames from 'classnames';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import { Grid } from '@material-ui/core';
import { GeneralActions } from 'store/actions/general';
import { PopupActions } from 'store/actions/popup';
import { OnboardingActions } from 'store/actions/onboarding';
import { connect } from 'react-redux';

import { ReactComponent as DiscordMarker } from '../../data/images/home/discord-mark.svg';
import FairPiece from '../../data/images/home/fair-piece.svg';
import UniquePiece from '../../data/images/home/unique-piece.svg';
import SocialPiece from '../../data/images/home/social-piece.svg';
import EventActivitiesTabs from 'components/EventActivitiesTabs';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';

const LandingPageV2 = (
  authState,
  showPopup,
  events,
  startOnboardingFlow,
  userId,
) => {
  const isMount = useIsMount();
  const location = useLocation();
  let urlParams = new URLSearchParams(location.search);
  const showUpcoming = process.env.REACT_APP_SHOW_UPCOMING_FEATURES || 'false';
  const [showDiscordBanner, setShowDiscordBanner] = useState(false);
  const [alpacaGames, setAlpacaGame] = useState(
    showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES
  );
  const [externalGames, setExternalGames] = useState(EXTERNAL_GAMES);
  const [externalGamesEvoplay, setExternalGamesEvoplay] = useState([...prepareEvoplayGames(EVOPLAY_GAMES)]);
  const [externalGamesSoftswiss, setExternalGamesSoftswiss] = useState([...prepareSoftSwissGames(SOFTSWISS_GAMES)]);

  useOAuthCallback();

  const isLoggedIn = () => {
    return authState === LOGGED_IN;
  };

  const handleRefPersistent = () => {
    const ref = urlParams.get('ref');

    if (ref) {
      localStorage.setItem('urlParam_ref', ref);
    }
  };

  const handleVoluumPersistent = () => {
    const sid = urlParams.get('sid');
    const cid = urlParams.get('cid');

    if (sid) {
      localStorage.setItem('urlParam_sid', sid);
    }

    if (cid) {
      localStorage.setItem('urlParam_cid', cid);
    }
  };

  const showPopupForUnauthenticated = () => {
    if (!isLoggedIn()) {
      startOnboardingFlow();
    }
  };

  useEffect(() => {
    if (isMount) {
      handleRefPersistent();
      handleVoluumPersistent();
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

  const renderAboutDescription = () => {
    return (
      <div className={styles.aboutDescritpion}>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item lg={4} md={4} xs={12}>
            <div className={styles.parentContainer}>
              <div className={styles.descriptionCardContainer}>
                <div className={styles.descriptionCard}>
                  <h1>Fair</h1>
                  <p>
                    We have a mission to prove that crypto casino can just the
                    pure entertainment. We operate on open source code, provide
                    honest bonuses, and publicly communicate the house edges
                    along with a full history of all the bets. Simply no hidden
                    tricks just awesome fun!
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <div className={styles.parentContainer}>
              <div className={styles.descriptionCardContainer}>
                <div className={styles.descriptionCard}>
                  <h1>Unique</h1>
                  <p>
                    In Wallfair you play with WFAIR, our own crypto currency.
                    It gives you the advantage to earn money even when you are
                    not playing. Stake your winnings and watch your wallet grow!
                    The more people sign up, deposit and play, the higher the
                    value of you wallet!{' '}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <div className={styles.parentContainer}>
              <div className={styles.descriptionCardContainer}>
                <div className={styles.descriptionCard}>
                  <h1>Social</h1>
                  <p>
                    Wallfair is our flagship project
                    that presents the future of the speculative entertainment.
                    The future where world of betting, gambling and gaming is
                    blended into one huge theme park metaverse. The place where
                    you meet people and enjoy the excitement of potential
                    rewards!
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

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
      <CustomCarousel carouselType={'landingpage'} />
      <div className={styles.container}>

        <DisplaySection selectedGamesLabel={TOP_PICKS_GAMES.header} selectedGamesNames={TOP_PICKS_GAMES.names} smartsoftGames={EXTERNAL_GAMES} evoplayGames={prepareEvoplayGames(EVOPLAY_GAMES)} softswissGames={prepareSoftSwissGames(SOFTSWISS_GAMES)}/>

        <SearchSection
          setGames={setGames}
          alpacaGames={showUpcoming ? NEW_SLOTS_GAMES : SLOTS_GAMES}
          setAlpacaGame={setAlpacaGame}
          externalGames={EXTERNAL_GAMES}
          externalGamesEvoplay={externalGamesEvoplay}
          setExternalGamesEvoplay={setExternalGamesEvoplay}
          externalGamesSoftswiss={externalGamesSoftswiss}
          setExternalGamesSoftswiss={setExternalGamesSoftswiss}
          setExternalGames={setExternalGames}
        />

        {alpacaGames.length > 0 && <GameCards games={alpacaGames} category="House Games" />}

        <DisplaySection smartsoftGames={externalGames} evoplayGames={externalGamesEvoplay} softswissGames={process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true' ? externalGamesSoftswiss : []} />
        {showDiscordBanner && renderDiscordBanner()}
        {renderAboutDescription()}
        {renderActivities()}
      </div>
    </BaseContainerWithNavbar>
  );
};

const mapStateToProps = state => {
  return {
    authState: state.authentication.authState,
    tags: state.event.tags,
    events: state.event.events,
    userId: state.authentication.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    startOnboardingFlow: () => {
      dispatch(OnboardingActions.start());
    },
  };
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(LandingPageV2);
export default memo(Connected);
