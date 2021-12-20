import React, {useEffect,useMemo, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectHistory, selectStakes } from 'store/selectors/wallfair';
import { numberWithCommas, shortenAddress } from 'utils/common';
import Text from 'helper/Text';
import moment from 'moment';
import {getTransactionURL} from '../../../utils/constants';
import { TOKEN_NAME } from 'constants/Token';

const DepositRow = ({ data, hideSecondaryColumns = false }) => {
  const { amount, network_code, sender, created_at, transaction_hash, status } = data;
  return (
    <div className={styles.messageItem}>
      <Grid container>
        <Grid item xs>
          <div className={classNames(styles.messageFirst, styles.messageLeft)}>
            <p>{numberWithCommas(Text.formatByONEConstant(amount, 0))}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{network_code}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{shortenAddress(sender)}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p className={styles.rewardMulti}>
              {moment(created_at).format('DD.MM.YYYY HH:mm:ss')}
            </p>
          </div>
        </Grid>
        <Grid item xs>
         <div 
          className={classNames(styles.messageLast, styles.messageRight, styles.messageTranform)}
          >
            <p >{status}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classNames(styles.messageLast, styles.messageRight)}>
            <a href={getTransactionURL(network_code, transaction_hash)} target="_blank" rel="noreferrer">
              <p>{shortenAddress(transaction_hash, false)}</p>
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const DepositTable = ({
  className,
  hideSecondaryColumns = false,
  depositRows = [],
}) => {
  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>{TOKEN_NAME}</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>NETWORK</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>ADDRESS</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>DATE</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>STATUS</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>TX HASH</p>
          </Grid>
        </Grid>
      </div>
      <div className={styles.messageContainer}>
        {depositRows?.map((row) => (
          <DepositRow data={row} key={row.id} />
        ))}
        {depositRows.length === 0 && (
          <div className={styles.noEntries}>
            <span>No entries found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DepositTable);
