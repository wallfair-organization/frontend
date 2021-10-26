import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import styles from './styles.module.scss';
import State from '../../helper/State';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { formatToFixed } from 'helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';
import { calculateGain } from '../../helper/Calculation';
import medalCoin from '../../data/icons/medal-coin.png';

const ActivityMessage = ({ activity, date, users, events }) => {
  const getUserProfileUrl = data => {
    let user = _.get(data, 'user');
    let userId = _.get(user, '_id');
    let userName = _.get(user, 'username');

    //fallback if not yet, new event structure contains userId directly in event payload
    if (!userId) {
      userId = _.get(data, 'trade.userId');
    }

    if (!userId) {
      userId = _.get(data, 'userId');
    }

    if (!userName) {
      userName = _.get(data, 'username');
    }
    //use name as username
    if (!userName) {
      userName = _.get(data, 'name');
    }

    return (
      <a
        className={'global-link-style'}
        target={'_blank'}
        href={`${window.location.origin}/user/${userId}`}
        rel="noreferrer"
      >
        {userName || 'Unknown user'}
      </a>
    );
  };

  const prepareMessageByType = (activity, user) => {
    const data = activity.data;
    let event = _.get(data, 'event');

    if (!event) {
      event = State.getEvent(_.get(data, 'bet.event'), events);
    }
    const usrname = getUserProfileUrl(data);
    const amount = formatToFixed(_.get(data, 'amount'), 0, true);
    const rewardAmount = formatToFixed(_.get(data, 'reward'), 0, true);
    switch (activity.type) {
      case 'Casino/CASINO_CASHOUT':
        const game = _.get(data, 'gameName');
        const stakedAmount = _.get(data, 'stakedAmount');
        const crashFactor = _.get(data, 'crashFactor');
        const reward = _.get(data, 'reward');
        const gain = calculateGain(stakedAmount, reward);
        const gainValueCasino = _.get(gain, 'value');
        const gainNegativeCasino = _.get(gain, 'negative');
        return (
          <Grid container>
            <Grid item xs>
              <div className={styles.messageLeft}>
                <p>{'Elon Game'}</p>
              </div>
            </Grid>
            <Grid item xs>
              <div className={styles.messageCenter}>
                <p>{usrname}</p>
              </div>
            </Grid>
            <Grid item xs>
              <div className={styles.messageRight}>
                {stakedAmount} {TOKEN_NAME}
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
                  {rewardAmount} {TOKEN_NAME}
                </p>
                <img src={medalCoin} alt="medal" />
              </div>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  const renderMessageContent = () => {
    const type = _.get(activity, 'type');
    const userId = _.get(activity, 'userId', _.get(activity, 'data.userId'));
    let user = State.getUser(userId, users);

    if (!user) {
      user = _.get(activity, 'data.user');
    }

    return (
      <div className={classNames(styles.messageItem)}>
        {prepareMessageByType(activity, user)}
      </div>
    );
  };

  return renderMessageContent();
};

const mapStateToProps = (state, ownProps) => {
  return {
    users: _.get(state, 'user.users', []),
    events: _.get(state, 'event.events', []),
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityMessage);
