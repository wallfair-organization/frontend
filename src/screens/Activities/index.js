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
import React, { useEffect, useState } from 'react';
import { useIsMount } from '../../components/hoc/useIsMount'; //workaround for swiper module

const Activities = () => {
  const dispatch = useDispatch();
  const isMounted = useIsMount();

  const [data24h, setData24h] = useState();
  const [dataLastWeek, setDataLastWeek] = useState();
  const [dataAllTime, setDataAllTime] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isMounted) {
      (async () => {
        try {
          const response24 = await getTotalBetsVolumeByRange('24h').catch(
            err => {
              throw new Error(
                'An error occurred fetching game statistics. (24h)'
              );
            }
          );

          const responseLastWeek = await getTotalBetsVolumeByRange('1w').catch(
            err => {
              throw new Error(
                'An error occurred fetching game statistics. (1w)'
              );
            }
          );

          const responseAllTime = await getTotalBetsVolumeByRange('all').catch(
            err => {
              throw new Error(
                'An error occurred fetching game statistics. (all)'
              );
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
      })();
    }
  }, [isMounted]);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      {ready && (
        <div className={styles.container}>
          <div className={styles.globalStats}>
            <div className={styles.statsBlock}>
              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span>{toNumericString(data24h?.trades)}</span> 24h # of bets
                </div>
                {/*<div className={styles.statItemHint}>last 24 hours</div>*/}
              </div>
              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span>{toNumericString(dataLastWeek?.trades)}</span> 7d # of
                  bets
                </div>
                {/*<div className={styles.statItemHint}>last week</div>*/}
              </div>

              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span>{toNumericString(dataAllTime?.trades)}</span> Total # of
                  bets
                </div>
                {/*<div className={styles.statItemHint}>all time</div>*/}
              </div>

              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span>
                    {toNumericString(data24h?.volume)} {TOKEN_NAME}
                  </span>{' '}
                  24h volume
                </div>
                {/*<div className={styles.statItemHint}>last 24 hours</div>*/}
              </div>

              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span>
                    {toNumericString(dataLastWeek?.volume)} {TOKEN_NAME}
                  </span>{' '}
                  7d volume
                </div>
                {/*<div className={styles.statItemHint}>last week</div>*/}
              </div>
              <div className={styles.statItem}>
                <div className={styles.statItemHead}>
                  <span>
                    {toNumericString(dataAllTime?.volume)} {TOKEN_NAME}
                  </span>{' '}
                  Total volume
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
          />
          <ContentFooter />
        </div>
      )}
    </BaseContainerWithNavbar>
  );
};

export default Activities;
