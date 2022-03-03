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
import { getGameById } from '../../helper/Games';
import { currencyDisplay } from 'helper/Currency';

const ActivityMessage = ({ activity, users, hideSecondaryColumns, layout, date, gameScreen = false }) => {
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

    const isPlayMoney = process.env.REACT_APP_PLAYMONEY === 'true';

    const data = activity.data;
    const userName = getUserProfileUrl(data);
    const initialRewardAmount = isPlayMoney ? data?.reward : data?.rewardWfair;
    const rewardAmountFormatted = formatToFixed(initialRewardAmount ?? 0, 0, false);
    const rewardAmount = toNumericString(rewardAmountFormatted);
    const gameName = data?.gameName;
    const gameTypeId = data?.gameTypeId;
    const gameLabel = getGameById(gameTypeId)?.name || gameName;
    const multiplier = (_.has(data, 'crashFactor') ? data.crashFactor : data?.winMultiplier) || 0;
    const stakedAmount = isPlayMoney ? data?.stakedAmountWfair : data?.stakedAmount;
    const crashFactor = roundToTwo(multiplier);
    const gamesCurrency = currencyDisplay(data?.gamesCurrency);

    switch (activity.type) {
      case 'Casino/CASINO_CASHOUT':
        const rowData = {
          userId: userName,
          rewardAmount,
          stakedAmount,
          crashFactor,
          gameLabel,
          gamesCurrency,
          date
        };
        return (
          <ActivityTableRow
            data={rowData}
            type={'cashout'}
            gameLabel={gameLabel}
            hideSecondaryColumns={hideSecondaryColumns}
            layout={layout}
            gameScreen={gameScreen}
          />
        );
      case 'Casino/EVENT_CASINO_LOST': {
        const rowData = {
          userId: userName,
          rewardAmount,
          stakedAmount,
          crashFactor,
          gameLabel,
          gamesCurrency,
          date
        };
        return (
          <ActivityTableRow
            data={rowData}
            type={'lost'}
            gameLabel={gameLabel}
            hideSecondaryColumns={hideSecondaryColumns}
            layout={layout}
            gameScreen={gameScreen}
          />
        );
      }
      default:
        console.log('skipped')
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
