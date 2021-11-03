import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import { connect } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import moment from 'moment';
import { getGameDetailById } from '../../api/crash-game';
import PopupTheme from '../Popup/PopupTheme';

const roundToTwo = num => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

const getReadableAmount = amount => {
  const one = 10000;
  return roundToTwo(+amount / one);
};

const BetsTable = props => {
  const { bets } = props;
  return (
    <table className={styles.betsTable}>
      <thead>
        <tr>
          <th scope="col">User</th>
          <th scope="col">Bet amount</th>
          <th scope="col">Crash factor</th>
          <th scope="col">Cashout</th>
        </tr>
      </thead>
      <tbody>
        {bets.map((bet, index) => {
          return (
            <tr>
              <td>
                <a
                  className={'global-link-style'}
                  target={'_blank'}
                  href={`${window.location.origin}/user/${bet.userid}`}
                  rel="noreferrer"
                >
                  {bet.userid}
                </a>
              </td>
              <td className={styles[`betState${bet.state}`]}>
                {getReadableAmount(bet.stakedamount)}
              </td>
              <td className={styles[`betState${bet.state}`]}>
                {roundToTwo(bet.crashfactor)}
              </td>
              <td className={styles[`betState${bet.state}`]}>
                {bet.state == 2
                  ? getReadableAmount(bet.stakedamount * bet.crashfactor)
                  : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const LastGamesDetailsPopup = ({ hidePopup, showPopup, data }) => {
  const { details } = data;
  const { match, bets } = details;

  const matchDate = match?.created_at;

  const date = matchDate
    ? moment(matchDate).format('HH:mm:ss | DD/MM/YYYY')
    : '---';

  const handleCrashFactorChange = async (gameHash, type) => {
    const response = await getGameDetailById(gameHash, type).catch(err => {
      console.error('getGameDetailById err', err);
    });
    const details = response?.data || null;

    if (details.match) {
      showPopup(PopupTheme.lastGamesDetail, {
        maxWidth: true,
        data: {
          details,
        },
      });
    } else {
      hidePopup();
    }
  };

  return (
    <div className={styles.gameDetails}>
      <img src={LogoSplash} className={styles.logo} />
      <div className={styles.title}>
        Game details
        <div
          className={styles.nextGame}
          onClick={() => {
            handleCrashFactorChange(match.gamehash, 'next');
          }}
        >
          {'<'} Next
        </div>
        <div
          className={styles.prevGame}
          onClick={() => {
            handleCrashFactorChange(match.gamehash, 'prev');
          }}
        >
          Prev {'>'}
        </div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.gameDate}>
        <span>{date}</span>
      </div>
      <div className={styles.content}>
        <div>
          <b>Crash factor:</b>{' '}
          <span>{roundToTwo(match?.crashfactor).toFixed(2)}</span>
        </div>
        <div>
          <b>Game ID:</b> <span>{match?.id}</span>
        </div>
        <div>
          <b>Game Hash:</b> <span>{match?.gamehash}</span>
        </div>
        <div>
          <b>Game duration (s):</b>{' '}
          <span>{match?.gamelengthinseconds / 1000}</span>
        </div>
        <div>
          <b>Sum invested:</b>{' '}
          <span>{getReadableAmount(match?.amountinvestedsum) || 0}</span>
        </div>
        <div>
          <b>Sum rewarded:</b>{' '}
          <span>{getReadableAmount(match?.amountrewardedsum) || 0}</span>
        </div>
        <div>
          <b>Total trades:</b> <span>{match?.numtrades || 0}</span>
        </div>
        <div>
          <b>Total cashouts:</b> <span>{match?.numcashouts || 0}</span>
        </div>

        <div className={styles.betsTableContainer}>
          <BetsTable bets={bets} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(LastGamesDetailsPopup);
