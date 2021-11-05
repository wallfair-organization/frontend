import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import styles from './styles.module.scss';
import State from '../../helper/State';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { formatToFixed, toNumericString } from 'helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';
import { calculateGain } from '../../helper/Calculation';
import medalCoin from '../../data/icons/medal-coin.png';
import ActivityTableRow from './ActivityTableRow';
import { roundToTwo } from '../../helper/FormatNumbers';

const ActivityMessage = ({ activity, users }) => {
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
        {userName || 'User'}
      </a>
    );
  };

  const prepareMessageByType = (activity, user) => {
    const data = activity.data;
    const userName = getUserProfileUrl(data);
    const rewardAmountFormatted = formatToFixed(data?.reward, 0, false);
    const rewardAmount = toNumericString(rewardAmountFormatted);
    switch (activity.type) {
      case 'Casino/CASINO_CASHOUT':
        const stakedAmount = data?.stakedAmount;
        const crashFactor = roundToTwo(_.get(data, 'crashFactor'));
        const rowData = {
          userId: userName,
          rewardAmount,
          stakedAmount,
          crashFactor,
        };
        return <ActivityTableRow data={rowData} type={'cashout'} />;
      case 'Casino/EVENT_CASINO_LOST': {
        const stakedAmount = data?.stakedAmount;
        const crashFactor = roundToTwo(_.get(data, 'crashFactor'));
        const rowData = {
          userId: userName,
          rewardAmount,
          stakedAmount,
          crashFactor,
        };
        return <ActivityTableRow data={rowData} type={'lost'} />;
      }
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

    return prepareMessageByType(activity, user);
  };

  return renderMessageContent();
};

const mapStateToProps = state => {
  return {
    users: _.get(state, 'user.users', []),
    events: _.get(state, 'event.events', []),
  };
};

export default connect(mapStateToProps)(ActivityMessage);
