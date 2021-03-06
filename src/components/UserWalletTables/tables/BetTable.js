import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import _ from 'lodash';
import {getReadableAmount, roundToTwo} from '../../../helper/FormatNumbers';
import { toNumericString } from 'helper/FormatNumbers';
import { TOKEN_NAME } from '../../../constants/Token';
import { GAMES } from 'constants/Games';
import {getGameById, getExternalGames,getSoftswissGameName,getEvoplayGameName} from "../../../helper/Games";
import { convertAmount, currencyDisplay } from 'helper/Currency';
import { selectPrices } from 'store/selectors/info-channel';
import { selectUser } from 'store/selectors/authentication';
import { useSelector } from 'react-redux';

const BetsRow = ({ data, gameLabel, hideSecondaryColumns = false }) => {
  const { gameId, username, crashFactor, stakedAmount } = data;

  const prices = useSelector(selectPrices);
  const { gamesCurrency: userCurrency } = useSelector(selectUser);

  const gamesCurrency = data?.gamesCurrency;

  gameLabel = getGameById(gameId)?.name;

  if(!gameLabel) {
    const topGames = getExternalGames();
    const topGameEntry = _.find(topGames, {TechnicalName: gameId});
    gameLabel = topGameEntry?.TechnicalName;
  }
  if(!gameLabel){
    //console.log(`Softswiss game name ${getSoftswissGameName(gameId)}`);
    gameLabel = getSoftswissGameName(gameId);
  }
  if(!gameLabel){
    gameLabel = getEvoplayGameName(gameId);
  }
  if(!gameLabel) {
    gameLabel = "Game";
  }

  const cashout = stakedAmount * crashFactor;

  let convertedAmount = "";
  let convertedCashout = "";

  if (gamesCurrency === TOKEN_NAME) {
    convertedAmount = `${roundToTwo(convertAmount(stakedAmount, prices[userCurrency]), 2)} ${userCurrency}`;
    convertedCashout = `${roundToTwo(convertAmount(cashout, prices[userCurrency]), 2)} ${userCurrency}`;
    
  } else {
  
    convertedAmount = `${roundToTwo(stakedAmount, 2)} ${gamesCurrency}`;
    convertedCashout = `${roundToTwo(cashout, 2)} ${gamesCurrency}`;
  }
  

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
            {convertedAmount}
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
            <p className={styles.reward}>{convertedCashout}</p>
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
