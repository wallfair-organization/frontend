import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles.module.scss';
import { TOKEN_NAME } from '../../constants/Token';
import medalCoin from '../../data/icons/medal-coin.png';
import { toNumericString } from 'helper/FormatNumbers';
import classNames from 'classnames';
import { GAMES } from 'constants/Games';
import { roundToTwo } from '../../helper/FormatNumbers';
import { convertAmount, currencyDisplay } from 'helper/Currency';
import DateText from 'helper/DateText';
import { useSelector } from 'react-redux';
import { selectPrices } from 'store/selectors/info-channel';
import { selectUser } from 'store/selectors/authentication';
import { getGameNameById } from 'helper/Games';

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
  // gameLabel = gameLabel ?? (Object.values(GAMES).find(g => g.id.indexOf(data.gameId) > -1))?.name ?? "Game";
  gameLabel = gameLabel ?? getGameNameById(data.gameId);
  
  const {
    userId,
    username,
    stakedAmount,
    rewardAmount,
    crashFactor,
    date,
    createdAt,
  } = data;

  const prices = useSelector(selectPrices);
  const { gamesCurrency : currency } = useSelector(selectUser);
  const userPreferredCurrency = currency === TOKEN_NAME ? 'USD' : currency;
  const gamesCurrency = currencyDisplay(data?.gamesCurrency);

  const stakedAmountNum = extractNumber(stakedAmount);
  const rewardAmountNum = extractNumber(rewardAmount);
  const crashFactorStr = roundToTwo(extractNumber(crashFactor));

  let convertedStakedAmount = stakedAmountNum
  let convertedRewardAmount = rewardAmountNum;

  if (gamesCurrency === TOKEN_NAME) {
    convertedStakedAmount = convertAmount(stakedAmountNum, prices[userPreferredCurrency]);
    convertedRewardAmount = convertAmount(rewardAmountNum, prices[userPreferredCurrency]);
  }

  const stakedAmountStr = toNumericString(convertedStakedAmount);
  const rewardAmountStr = toNumericString(convertedRewardAmount);
  const lostAmountStr = toNumericString(convertedStakedAmount - convertedRewardAmount);
  
  const convertedCurrency = gamesCurrency === TOKEN_NAME ? userPreferredCurrency : gamesCurrency;

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
              <p>{stakedAmountStr} {convertedCurrency}</p>
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
                  <p className={styles.loss}>{`-${lostAmountStr} ${convertedCurrency}`}</p>
                ):(
                  <p className={styles.reward}>{`${rewardAmountStr} ${convertedCurrency}`}</p>
                )}
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
        </Grid>
    </div>
  );
};

export default ActivityTableRow;
