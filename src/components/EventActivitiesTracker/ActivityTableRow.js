import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles.module.scss';
import { TOKEN_NAME } from '../../constants/Token';
import medalCoin from '../../data/icons/medal-coin.png';
import { toNumericString } from 'helper/FormatNumbers';
import classNames from 'classnames';

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

const ActivityTableRow = ({ data, type, gameLabel }) => {
  const {
    userId,
    username,
    stakedAmount: stakedAmountRaw,
    rewardAmount: rewardAmountRaw,
    crashFactor,
  } = data;
  const stakedAmount = Number.parseInt(stakedAmountRaw);
  const rewardAmount = Number.parseInt(rewardAmountRaw);
  return (
    <div className={styles.messageItem}>
      {type === 'lost' ? (
        <Grid container>
          <Grid item xs>
            <div className={styles.messageLeft}>
              <p>{gameLabel}</p>
            </div>
          </Grid>
          <Grid item xs>
            <div className={styles.messageCenter}>
              <p>{userId}</p>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classNames(styles.messageRight)}>
              {toNumericString(stakedAmount)} {TOKEN_NAME}
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
          <Grid item xs>
            <div className={styles.messageCenter}>
              <p className={styles.rewardMulti}>{crashFactor}x</p>
            </div>
          </Grid>
          <Grid item xs>
            <div className={styles.messageLast}>
              <p className={'global-cashout-loss'}>
                -{toNumericString(stakedAmount)} {TOKEN_NAME}
              </p>
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs>
            <div className={styles.messageLeft}>
              <p>{gameLabel}</p>
            </div>
          </Grid>
          <Grid item xs>
            <div className={styles.messageCenter}>
              <p>
                {username ? (
                  <UserLink userId={userId} username={username} />
                ) : (
                  userId
                )}
              </p>
            </div>
          </Grid>
          <Grid item xs>
            <div className={styles.messageRight}>
              {toNumericString(stakedAmount)} {TOKEN_NAME}
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
          <Grid item xs>
            <div className={styles.messageCenter}>
              <p className={styles.rewardMulti}>{crashFactor}x</p>
            </div>
          </Grid>
          <Grid item xs>
            <div className={styles.messageLast}>
              <p className={styles.reward}>
                {toNumericString(rewardAmount)} {TOKEN_NAME}
              </p>
              <img src={medalCoin} alt="medal" />
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ActivityTableRow;
