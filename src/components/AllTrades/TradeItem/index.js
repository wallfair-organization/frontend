import { connect } from 'react-redux';
import moment from 'moment';
import cn from 'classnames';
import { calculateGain } from '../../../helper/Calculation';
import BetState from 'constants/BetState';
import { getProfilePictureUrl } from '../../../helper/ProfilePicture';
import styles from '../../MyTradesList/styles.module.scss';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';

const isFinalizedTrade = status =>
  [BetState.closed, BetState.canceled, BetState.resolved].includes(status);

const getGain = item => {
  let gain;

  if (
    isFinalizedTrade(item.status) &&
    item.finalOutcome &&
    parseInt(item.finalOutcome) !== item.outcome
  ) {
    gain = {
      value: '-100%',
      negative: true,
    };
  } else if (item.status === BetState.canceled) {
    gain = {
      value: 'Refund',
      negative: false,
    };
  } else {
    gain = calculateGain(item.investmentAmount, item.outcomeTokens);
  }

  return gain;
};

const TradeItem = ({ currentUserId, trade, showPulloutBetPopup }) => {
  const gain = getGain(trade);

  return (
    <div className={styles.betItem} style={{ maxWidth: 525 }}>
      <img
        src={getProfilePictureUrl(trade.profilePicture)}
        className={styles.eventImg}
        alt=""
      />
      <div className={styles.betInfo}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{trade.username}</div>
          <div className={styles.subtitle}>
            {moment(trade.date).format('DD.MM.YYYY')} | Your Prediction:{' '}
            {trade.outcomeName}
          </div>
        </div>
        <div className={styles.numbersContainer}>
          <div className={styles.value}>
            <span
              className={cn(
                styles.percentage,
                gain.negative && styles.negative
              )}
            >
              {gain.value}
            </span>
            {trade.outcomeTokens}
          </div>
          <div className={styles.small}>Invested: {trade.investmentAmount}</div>
          {currentUserId === trade.userId && Number(trade.outcomeSell) > 0 && (
            <>
              <div className={styles.small}>
                Sell amount: {trade.outcomeSell}
              </div>
              <button
                className={styles.betCashoutButton}
                onClick={() =>
                  showPulloutBetPopup(
                    trade.betId,
                    trade.outcomeIndex,
                    trade.outcomeSell,
                    trade.outcomeName
                  )
                }
                data-tracking-id="all-trades-cashout"
              >
                Cashout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPulloutBetPopup: (betId, outcome, amount, outcomeName) => {
      dispatch(
        PopupActions.show({
          popupType: PopupTheme.pulloutApprove,
          options: {
            small: true,
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

export default connect(null, mapDispatchToProps)(TradeItem);
