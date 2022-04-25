import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import styles from '../styles.module.scss';
import { Link } from 'react-router-dom';
import StateBadge from '../../StateBadge';
import moment from 'moment';
import BetState from 'constants/BetState';
import { calculateGain } from '../../../helper/Calculation';
import { formatToFixed } from 'helper/FormatNumbers';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from '../../../store/actions/popup';
import PopupTheme from '../../Popup/PopupTheme';
import { selectPrices } from 'store/selectors/info-channel';
import { selectUser } from 'store/selectors/authentication';
import { TOKEN_NAME } from '../../../constants/Token';
import { convertAmount } from 'helper/Currency';

const isFinalizedTrade = status =>
  [BetState.closed, BetState.canceled, BetState.resolved].includes(status);

const getGain = trade => {
  let gain = { value: '', negative: false };

  if (
    isFinalizedTrade(trade.bet.status) &&
    trade.bet.finalOutcome &&
    parseInt(trade.bet.finalOutcome) !== trade.outcomeIndex
  ) {
    gain = {
      value: '-100%',
      negative: true,
    };
  } else if (trade.bet.status === BetState.canceled) {
    gain = {
      value: 'Refund',
      negative: false,
    };
  } else {
    gain = calculateGain(
      trade.investmentAmount,
      trade.status === 'sold' ? trade.sellAmount : trade.outcomeTokens
    );
  }

  return gain;
};

const TradeRow = ({
  data,
  allowCashout,
  showPulloutBetPopup,
  onApproveCashout,
}) => {
  const {
    bet,
    event,
    date,
    status,
    investmentAmount,
    outcomeTokens,
    sellAmount,
    outcomeIndex,
    direction,
  } = data;
  const gain = getGain(data);
  const prices = useSelector(selectPrices);
  const user = useSelector(selectUser);
  const currency = user.gamesCurrency;

  const convert = amount => {
    return currency !== TOKEN_NAME
      ? `${convertAmount(amount, prices[currency])}`
      : `${formatToFixed(amount, 0, true)}`;
  };

  const truncate = val => {
    return val.length > 20
      ? val.substr(0, 14) + '...' + val.substr(val.length - 6)
      : val;
  };

  return (
    <div className={styles.messageItem}>
      <Grid container alignItems="center">
        <Grid item xs>
          <div className={classNames(styles.messageFirst, styles.messageLeft)}>
            <Link to={`/trade/${event.slug}`} className={styles.titleLink}>
              <div className={styles.titleWithBadge}>
                {truncate(bet.question)}
                {status === 'active' && (
                  <StateBadge
                    state={bet.status.toLowerCase()}
                    withoutBackground={true}
                    withoutText={true}
                    className={styles.status}
                  />
                )}
              </div>
            </Link>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>{truncate(bet.outcome)}</p>
          </div>
        </Grid>
        <Grid item xs>
          <div className={styles.messageCenter}>
            <p>
              {convert(direction === 'SELL' ? outcomeTokens : investmentAmount)}
            </p>
          </div>
        </Grid>
        <Grid item xs>
          {allowCashout ? (
            <div className={styles.messageCenter}>
              <p>{convert(status === 'sold' ? sellAmount : outcomeTokens)}</p>
            </div>
          ) : (
            <div className={styles.messageCenter}>
              <p>{direction}</p>
            </div>
          )}
        </Grid>
        {allowCashout && (
          <Grid item xs>
            <div className={styles.messageCenter}>
              <span
                className={classNames(
                  styles.gain,
                  gain.negative ? styles.negative : null
                )}
              >
                {gain.value}
              </span>
            </div>
          </Grid>
        )}
        <Grid item xs>
          <div
            className={
              allowCashout
                ? styles.messageCenter
                : classNames(styles.messageLast, styles.messageRight)
            }
          >
            {moment(date).format('DD.MM.YYYY HH:mm:ss')}
          </div>
        </Grid>

        {allowCashout && (
          <Grid item xs>
            <div
              className={classNames(styles.messageLast, styles.messageRight)}
            >
              {bet.status === BetState.active && !isFinalizedTrade(bet.status) && (
                <button
                  className={styles.styledButton}
                  onClick={() =>
                    showPulloutBetPopup(
                      bet.id,
                      outcomeIndex,
                      convert(sellAmount),
                      bet.outcome,
                      onApproveCashout
                    )
                  }
                  data-tracking-id="wallet-cashout"
                >
                  Cashout
                </button>
              )}
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

const TradesTable = ({
  className,
  tradeRows = [],
  allowCashout,
  showPulloutBetPopup,
  refresh,
}) => {
  const onApproveCashout = () => {
    refresh();
  };

  return (
    <div className={classNames(styles.activitiesTrackerContainer, className)}>
      <div className={styles.header}>
        <Grid container>
          <Grid item xs>
            <p className={styles.titleFirst}>BET</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>YOUR PREDICTION</p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>
              {allowCashout ? 'INVESTMENT AMOUNT' : 'AMOUNT'}
            </p>
          </Grid>
          <Grid item xs>
            <p className={styles.title}>
              {allowCashout ? 'POTENTIAL REWARD' : 'TRANSACTION TYPE'}
            </p>
          </Grid>
          {allowCashout && (
            <Grid item xs>
              <p className={styles.title}>GAIN</p>
            </Grid>
          )}
          <Grid item xs>
            <p className={allowCashout ? styles.title : styles.titleLast}>
              DATE
            </p>
          </Grid>
          {allowCashout && (
            <Grid item xs>
              <p className={styles.titleLast}>CASHOUT</p>
            </Grid>
          )}
        </Grid>
      </div>
      <div className={styles.messageContainer}>
        {tradeRows?.map((row, index) => (
          <TradeRow
            data={row}
            allowCashout={allowCashout}
            onApproveCashout={onApproveCashout}
            showPulloutBetPopup={showPulloutBetPopup}
            key={index}
          />
        ))}
        {tradeRows.length === 0 && (
          <div className={styles.noEntries}>
            <span>No entries found</span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPulloutBetPopup: (betId, outcome, amount, outcomeName, onApprove) => {
      dispatch(
        PopupActions.show({
          popupType: PopupTheme.pulloutApprove,
          options: {
            small: true,
            onApprove,
            betData: {
              betId,
              outcome,
              amount,
              outcomeName,
            },
          },
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(TradesTable);
