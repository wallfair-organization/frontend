import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Grid from '@material-ui/core/Grid';
import ActivityTableRow from './ActivityTableRow';

const ActivityTable = ({ rowData, gameLabel, hideSecondaryColumns = false, layout='compact', gameScreen = false }) => {
  const layoutCss = layout === 'compact' ? styles.compact : null;
  return (
    <div className={styles.activitiesTrackerContainer}>
      <div className={classNames(styles.header,layoutCss)}>
        <Grid container className={styles.flexContainer}>
          {!gameScreen && 
            <Grid item xs>
              <p className={styles.titleLeft}>GAME</p>
            </Grid>
          }
          <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
            <p className={styles.titleLeft}>USER</p>
          </Grid>
          {!gameScreen && 
            <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
              <p className={styles.titleLeft}>TIME</p>
            </Grid>
          }
          <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
            <p className={styles.titleRight}>TRADE</p>
          </Grid>
          <Grid item xs className={hideSecondaryColumns && styles.hideSecondaryColumns}>
            <p className={styles.title}>MULT</p>
          </Grid>
          <Grid item xs >
            <p className={styles.titleRight}>CASHOUT</p>
          </Grid>
        </Grid>
      </div>

      <div className={styles.messageContainer}>
        {rowData.map((r, i) => (
          <ActivityTableRow
            key={r.gameHash + i}
            data={r}
            gameLabel={gameLabel}
            hideSecondaryColumns={hideSecondaryColumns}
            gameScreen={gameScreen}
            layout={layout}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityTable;
