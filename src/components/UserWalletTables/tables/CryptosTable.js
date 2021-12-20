import React, {useEffect,useMemo, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectHistory, selectStakes } from 'store/selectors/wallfair';
import { formatTxStatus, numberWithCommas, shortenAddress } from 'utils/common';
import Text from 'helper/Text';
import moment from 'moment';
import { TOKEN_NAME } from 'constants/Token';
import { getCryptosTransactionURL, getTransactionURL } from '../../../utils/constants';


const OnRampRow = ({ data, hideSecondaryColumns = false }) => {
  const {
    amount,
    input_amount,
    input_currency,
    created_at,
    status,
    transaction_hash,
  } = data;
  return (
    <div className={styles.messageItem}>
      <Grid container>
        <Grid item xs>
          <div className={classNames(styles.messageFirst, styles.messageLeft)}>
            {<p>{numberWithCommas(Text.formatByONEConstant(amount, 0))}</p>}
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{input_amount || 'No data'}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{input_currency || 'No data'}</p>
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
            className={styles.messageCenter}
          >
            <p>{formatTxStatus(status)}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classNames(styles.messageLast, styles.messageRight)}>
              <a
                href={getCryptosTransactionURL(input_currency, transaction_hash)}
                target="_blank"
                rel="noreferrer"
              >
                <p>{shortenAddress(transaction_hash, false)}</p>
              </a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const CryptosTable = ({
  className,
  hideSecondaryColumns = false,
  renderRow = [],
}) => {
  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>{TOKEN_NAME}</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>AMOUNT</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>CURRENCY</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>DATE</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>STATUS</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>TX HASH</p>
          </Grid>
        </Grid>
      </div>
      <div className={styles.messageContainer}>
        {renderRow?.map((row) => (
          <OnRampRow data={row} key={row.id} />
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

export default React.memo(CryptosTable);
