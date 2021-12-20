import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import {getReadableAmount, roundToTwo} from '../../../helper/FormatNumbers';
import { toNumericString } from 'helper/FormatNumbers';
import { TOKEN_NAME } from '../../../constants/Token';
import { GAMES } from 'constants/Games';





const BetsRow = ({ data, gameLabel,hideSecondaryColumns = false }) => {
  const { gameId,username, crashFactor, stakedAmount } = data;
  gameLabel =
  gameLabel ??
  Object.values(GAMES).find(g => g.id.indexOf(gameId) > -1)?.name ??
  'Game';
  const cashout = stakedAmount * crashFactor;

  return (
    <div className={styles.messageItem}>
      <Grid container>
        <Grid item xs>
          <div className={classNames(styles.messageFirst, styles.messageLeft)}>
            <p>{gameLabel}</p>
          </div>
        </Grid>
        {/* <Grid
          item
          xs
          className={hideSecondaryColumns && styles.hideSecondaryColumns}
        >
          <div className={styles.messageCenter}>
            <p>{username}</p>
          </div>
        </Grid> */}
        <Grid
          item
          xs
          className={hideSecondaryColumns && styles.hideSecondaryColumns}
        >
          <div className={styles.messageCenter}>
            {toNumericString(stakedAmount)} {TOKEN_NAME}
            </div>
        </Grid>
        <Grid
          item
          xs
          className={hideSecondaryColumns && styles.hideSecondaryColumns}
        >
          <div className={styles.messageCenter}>
            <p className={styles.rewardMulti}>{roundToTwo(crashFactor)}x</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classNames(styles.messageLast, styles.messageRight)}>
            <p className={styles.reward}>{toNumericString(roundToTwo(cashout, 0))} {TOKEN_NAME}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const BetTable = ({
  renderRow,
  className,
  headingClass,
  hideSecondaryColumns = false,
}) => {
  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={classNames(headingClass, styles.header)}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>GAME</p>
          </Grid>
          {/* <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>USER</p>
          </Grid> */}
          <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>TRADE</p>
          </Grid>
          <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>MULT</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>CASHOUT</p>
          </Grid>
        </Grid>
      </div>
      <div className={styles.messageContainer}>
        {renderRow.map((row, index) => (
          <BetsRow data={row} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BetTable;
