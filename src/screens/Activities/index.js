import { useEffect, useState } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import ActivitiesTracker from '../../components/ActivitiesTracker';
import ContentFooter from 'components/ContentFooter';
import { AlertActions } from 'store/actions/alert';
import { useDispatch } from 'react-redux';

import { toNumericString } from 'helper/FormatNumbers';

import { getTotalBetsVolumeByRange } from '../../api/crash-game';

import { TOKEN_NAME } from '../../constants/Token';

import './swiper.scss';
import { Link } from 'react-router-dom';
import Routes from 'constants/Routes';
import { currencyDisplay } from 'helper/Currency';

const Activities = ({showBets = true}) => {
  const dispatch = useDispatch();

  const [data24h, setData24h] = useState();
  const [dataLastWeek, setDataLastWeek] = useState();
  const [dataAllTime, setDataAllTime] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getBetInfo();
    const interval = setInterval(() => {
      getBetInfo();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getBetInfo = async () => {
    try {
      const response24 = await getTotalBetsVolumeByRange('24h').catch(err => {
        throw new Error('An error occurred fetching game statistics. (24h)');
      });

      const responseLastWeek = await getTotalBetsVolumeByRange('1w').catch(
        err => {
          throw new Error('An error occurred fetching game statistics. (1w)');
        }
      );

      const responseAllTime = await getTotalBetsVolumeByRange('all').catch(
        err => {
          throw new Error('An error occurred fetching game statistics. (all)');
        }
      );

      setData24h(response24?.data);
      setDataLastWeek(responseLastWeek?.data);
      setDataAllTime(responseAllTime?.data);
      setReady(true);
    } catch (err) {
      dispatch(
        AlertActions.showError({
          message: err.message,
        })
      );
    }
  };

  const renderWallpaperBanner = () => {
    return (
      <Link data-tracking-id="elon-wallpaper" to={Routes.elonWallpaper}>
        <div className={styles.banner}></div>
      </Link>
    );
  };

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>

      
      {ready && (
        <div className={styles.container}>
          <h1>Activities</h1>
          <div className={styles.globalStats}>
            <div className={styles.statsBlock}>
              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span className={styles.title}>24h # of bets</span>
                  <span>{toNumericString(data24h?.trades)}</span> 
                </div>
                {/*<div className={styles.statItemHint}>last 24 hours</div>*/}
              </div>
              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span className={styles.title}>7d # of bets</span>
                  <span>{toNumericString(dataLastWeek?.trades)}</span> 
                </div>
                {/*<div className={styles.statItemHint}>last week</div>*/}
              </div>

              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span className={styles.title}>Total # of bets</span>
                  <span>{toNumericString(dataAllTime?.trades)}</span> 
                </div>
                {/*<div className={styles.statItemHint}>all time</div>*/}
              </div>

              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span className={styles.title}>24h volume</span>
                  <span>
                    {toNumericString(data24h?.volume)} {currencyDisplay(TOKEN_NAME)}
                  </span>
                </div>
                {/*<div className={styles.statItemHint}>last 24 hours</div>*/}
              </div>

              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span className={styles.title}>7d volume</span>
                  <span>
                    {toNumericString(dataLastWeek?.volume)} {currencyDisplay(TOKEN_NAME)}
                  </span>
                </div>
                {/*<div className={styles.statItemHint}>last week</div>*/}
              </div>
              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span className={styles.title}>Total volume (IN {currencyDisplay(TOKEN_NAME)})</span>
                  <span>
                    {toNumericString(dataAllTime?.volume)}
                  </span>
                </div>
                {/*<div className={styles.statItemHint}>all time</div>*/}
              </div>
            </div>
          </div>

          <ActivitiesTracker
            showCategories={true}
            activitiesLimit={50}
            className={
              styles.activitiesTrackerContainerFull +
              ' activities-tracker-swiper'
            }
            showBets={showBets}
          />
          {/* {renderWallpaperBanner()} */}
        </div>
      )}
    </BaseContainerWithNavbar>
  );
};

export default Activities;
