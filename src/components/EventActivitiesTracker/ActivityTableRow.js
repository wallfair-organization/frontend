import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles.module.scss';
import { TOKEN_NAME } from '../../constants/Token';
import medalCoin from '../../data/icons/medal-coin.png';
import { toNumericString } from 'helper/FormatNumbers';
import classNames from 'classnames';
import { GAMES } from 'constants/Games';
import { roundToTwo } from '../../helper/FormatNumbers';
import { currencyDisplay } from 'helper/Currency';
import DateText from 'helper/DateText';

const UserLink = props => {
  const { userId, username } = props;
  return (
    <a
      className={'global-link-style'}
      target={'_blank'}
      href={`${window.location.origin}/user/${userId}`}
      rel="noreferrer"
    >
      {username || 'User'}
    </a>
  );
};

const extractNumber = (data) => {
  if(!data || Number.isNaN(data)) return 0;
  if(typeof data == "string") {
    data = data.indexOf(',') > -1 ?  data.replace(',','') : data;
    return Number.parseFloat(data);
  } else return data;
}

const ActivityTableRow = ({ data, type, gameLabel, hideSecondaryColumns = false, layout = 'compact', gameScreen = false}) => {
  const layoutCss = layout === 'compact' ? styles.compact : null;
  gameLabel = gameLabel ?? (Object.values(GAMES).find(g => g.id.indexOf(data.gameId) > -1))?.name ?? "Game";
  const {
    userId,
    username,
    stakedAmount,
    rewardAmount,
    crashFactor,
    date,
    createdAt,
  } = data;
  const stakedAmountNum = Math.round(extractNumber(stakedAmount));
  const rewardAmountNum = Math.round(extractNumber(rewardAmount));
  const crashFactorStr = roundToTwo(extractNumber(crashFactor));
  const stakedAmountStr = toNumericString(stakedAmountNum);
  const rewardAmountStr = toNumericString(rewardAmountNum);
  const lostAmountStr = toNumericString(stakedAmountNum - rewardAmountNum);
  const currency = currencyDisplay(data?.gamesCurrency);

  if(rewardAmountNum<stakedAmountNum) type = 'lost'
  else type = 'win';
  return (
    <div className={classNames(styles.messageItem, layoutCss)}>
        <Grid container className={styles.flexContainer}>
          {!gameScreen && 
            <Grid item xs>
              <div className={classNames(styles.messageFirst, styles.messageLeft)}>
                <p>{gameLabel}</p>
              </div>
            </Grid>
          }
          <Grid item xs className={hideSecondaryColumns ? styles.hideSecondaryColumns : null}>
            <div className={classNames(styles.messageLeft, styles.username)}>
              <p>
                {username ? (
                  <UserLink userId={userId} username={username} />
                ) : (
                  userId
                )}
              </p>
            </div>
          </Grid>
          {!gameScreen && 
            <Grid item xs className={hideSecondaryColumns ? styles.hideSecondaryColumns : null}>
              <div className={styles.messageLeft}>
                <p>
                  {date && DateText.formatDate(date)}
                  {!date && createdAt && DateText.formatDate(createdAt)}
                  {!date && !createdAt && '-'}
                </p>
              </div>
            </Grid>
          }
          <Grid item xs className={hideSecondaryColumns ? styles.hideSecondaryColumns : null}>
            <div className={styles.messageRight}>
              <p>{stakedAmountStr} {currency}</p>
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
          <Grid item xs className={hideSecondaryColumns ? styles.hideSecondaryColumns : null}>
            <div className={classNames(styles.messageCenter, styles.mult)}>
              <p className={styles.rewardMulti}>{crashFactorStr}x</p>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classNames(styles.messageLast, styles.messageRight)} data-wg-notranslate>
              {type==='lost' ? (
                  <p className={styles.loss}>{`-${lostAmountStr} ${currency}`}</p>
                ):(
                  <p className={styles.reward}>{`${rewardAmountStr} ${currency}`}</p>
                )}
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
        </Grid>
    </div>
  );
};

export default ActivityTableRow;
