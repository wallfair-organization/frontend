import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import moment from 'moment';
import { getTransactionURL } from 'utils/constants';
import { shortenAddress, formatTxStatus } from 'utils/common';
import Text from 'helper/Text';
import { TOKEN_NAME } from 'constants/Token';

const DepositRow = ({ data, hideSecondaryColumns = false }) => {
  const { amount, fee, network_code, receiver, created_at, transaction_hash, status } = data;
  return (
    <div className={styles.messageItem}>
      <Grid container>
        <Grid item xs>
          <div className={classNames(styles.messageFirst, styles.messageLeft)}>
            <p>{Text.formatByONEConstant(amount, 2)}</p>
          </div>
        </Grid>
        <Grid
          item
          xs
          className={hideSecondaryColumns && styles.hideSecondaryColumns}
        >
          <div className={styles.messageCenter}>
            <p>{fee ? Text.formatByONEConstant(fee, 4) : 'No data'}</p>
          </div>
        </Grid>
        <Grid
          item
          xs
          className={hideSecondaryColumns && styles.hideSecondaryColumns}
        >
          <div className={styles.messageCenter}>
            {shortenAddress(receiver, false)}
          </div>
        </Grid>
        <Grid
          item
          xs
          className={hideSecondaryColumns && styles.hideSecondaryColumns}
        >
          <div className={styles.messageCenter}>{network_code}</div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            {moment(created_at).format('DD.MM.YYYY HH:mm:ss')}
          </div>
        </Grid>
        <Grid item xs>
          <div
            className={classNames(
              styles.messageLast,
              styles.messageRight,
              styles.messageTranform
            )}
          >
            <p>{formatTxStatus(status)}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classNames(styles.messageLast, styles.messageRight)}>
            <a
              href={getTransactionURL(network_code, transaction_hash)}
              target="_blank"
              rel="noreferrer"
            >
              <p>
                {transaction_hash
                  ? shortenAddress(transaction_hash, false)
                  : 'No data'}
              </p>
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const WithDrawalsTable = ({ renderRow, className, hideSecondaryColumns = false }) => {
  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>{TOKEN_NAME}</p>
          </Grid>
          <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>FEE</p>
          </Grid>
          <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>RECEIVER</p>
          </Grid>
          <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>NETWORK</p>
          </Grid>
          <Grid
            item
            xs
            className={hideSecondaryColumns && styles.hideSecondaryColumns}
          >
            <p className={styles.title}>START DATE</p>
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
        {renderRow.map((row, index) => (
          <DepositRow data={row} key={index} />
        ))}
        {renderRow.length === 0 && (
          <div className={styles.noEntries}>
            <span>No entries found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithDrawalsTable;
