import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const DisputesPopup = ({ disputes }) => {
  return (
    <>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>USER</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>REASON</p>
          </Grid>
          <Grid item xs>
            <p className={styles.titleLast}>EXPLANATION</p>
          </Grid>
        </Grid>
      </div>
      <div className={styles.messageContainer}>
        {disputes?.map((dispute, index) => (
          <div className={styles.messageItem}>
            <Grid container alignItems='center' key={index}>
              <Grid item xs>
                <Link to={`/user/${dispute.user_id}`}>
                  <p
                    className={classNames(
                      styles.messageLeft,
                      styles.messageLong
                    )}
                  >
                    {dispute.user_id}
                  </p>
                </Link>
              </Grid>
              <Grid item xs>
                <p className={styles.messageCenter}>{dispute.reason}</p>
              </Grid>
              <Grid item xs>
                <p
                  className={classNames(
                    styles.messageRight,
                    styles.messageLong
                  )}
                >
                  {dispute.explanation}
                </p>
              </Grid>
            </Grid>
          </div>
        ))}
        {disputes.length === 0 && (
          <div className={styles.noEntries}>
            <span>No entries found</span>
          </div>
        )}
      </div>
    </>
  );
};

export default DisputesPopup;
