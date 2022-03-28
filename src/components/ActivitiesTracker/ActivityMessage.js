import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import DateText from '../../helper/DateText';
import styles from './styles.module.scss';
import State from '../../helper/State';
import { roundToTwo } from '../../helper/FormatNumbers';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { formatToFixed } from 'helper/FormatNumbers';
import { TOKEN_DISPLAY_NAME, TOKEN_NAME } from '../../constants/Token';
import { calculateGain } from '../../helper/Calculation';
import { getGameById } from '../../helper/Games';
import { currencyDisplay } from 'helper/Currency';
import moment from 'moment';

const isPlayMoney = process.env.REACT_APP_PLAYMONEY === 'true';

const ActivityLink = ({ path, text }) => (
  <b>
    <a
      className={'global-link-style'}
      target={'_blank'}
      href={`${window.location.origin}${path}`}
      rel="noreferrer"
    >
      {text}
    </a>
  </b>
);

const ActivityMessage = ({ activity, date, users, events, showBetName = true }) => {
  const [dateString, setDateString] = useState('');

  const updateDateText = useCallback(() => {
    const dateText = DateText.getChatTimeText(date);

    setDateString(dateText);
  }, [date]);

  useEffect(() => {
    updateDateText();
    const timerId = window.setInterval(updateDateText, 5 * 1000);

    return () => clearInterval(timerId);
  }, [date, updateDateText]);

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
    let event = _.get(data, 'event');

    if (!event) {
      event = State.getEvent(_.get(data, 'bet.event'), events);
    }

    const gameName = data?.gameName;
    const gameTypeId = data?.gameTypeId;
    const gameLabel = getGameById(gameTypeId)?.name || gameName;

    switch (activity.type) {
      case 'Notification/EVENT_BET_CANCELED':
        return (
          <div>
            Event <b>{_.get(event, 'name')}</b> cancelled.
          </div>
        );
      case 'Notification/EVENT_USER_REWARD':
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has been rewarded with{' '}
            <div className={'global-token-currency'}>
              <b>
                {formatToFixed(
                  _.get(data, 'currencyWinToken') || _.get(data, 'winToken'),
                  0,
                  true
                )}{' '}
                {_.get(data, 'currency') || TOKEN_DISPLAY_NAME}
              </b>
            </div>{' '}
            from <b>{_.get(event, 'name')}</b>.
          </div>
        );
      case 'Notification/EVENT_ONLINE':
        return `Stream ${_.get(data, 'event.name')} has become online.`; //EDITED
      case 'Notification/EVENT_OFFLINE':
        return `Stream ${_.get(data, 'event.name')} has become offline.`; //EDITED
      case 'Notification/EVENT_NEW':
        const creator = data.creator;
        return (
          <div>
            {creator ? (
              <>
                <ActivityLink
                  path={'/user/' + creator.id}
                  text={creator.username || 'User'}
                />{' '}
                created a new event:{' '}
              </>
            ) : (
              <>New event has been created: </>
            )}
            <ActivityLink path={'/trade/' + data.slug} text={data.name} />
          </div>
        );
      case 'Notification/EVENT_NEW_BET':
        return (
          <div>
            New event has been created:{' '}
            <ActivityLink
              path={'/trade/' + data.bet?.market_event?.slug}
              text={event.bets[0]?.market_question}
            />
            .
          </div>
        );
      case 'Notification/EVENT_BET_PLACED':
        const outcomeIndex = _.get(data, 'trade.outcome_index');
        const outcomesName = _.get(data, `bet.outcomes[${outcomeIndex}].name`);

        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has bet{' '}
            <div className={'global-token-currency'}>
              {formatToFixed(
                _.get(data, 'trade.currency_investment') ||
                  _.get(data, 'trade.investment_amount'),
                0,
                true
              )}{' '}
              {_.get(data, 'trade.currency') || TOKEN_DISPLAY_NAME}
            </div>{' '}
            {showBetName && (
              <>
                on{' '}
                <ActivityLink
                  path={'/trade/' + data.bet?.market_event?.slug}
                  text={data.bet?.market_question}
                />{' '}
              </>
            )}
            on <b>{outcomesName}</b>.
          </div>
        );
      case 'Notification/EVENT_BET_CASHED_OUT': {
        const gainValueEvent = _.get(data, 'gain.value');
        const gainNegativeEvent = _.get(data, 'gain.negative');
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has cashed out{' '}
            <div className={'global-token-currency'}>
              <b>
                {formatToFixed(_.get(data, 'amount'), 0, true)}{' '}
                {_.get(data, 'currency') || TOKEN_DISPLAY_NAME}
              </b>
            </div>{' '}
            {gainValueEvent && (
              <div
                className={
                  gainNegativeEvent
                    ? 'global-cashout-loss'
                    : 'global-cashout-profit'
                }
              >
                ({gainValueEvent})
              </div>
            )}{' '}
            {showBetName && (
              <>
                from{' '}
                <ActivityLink
                  path={'/trade/' + data.bet?.market_event?.slug}
                  text={data.bet?.market_question}
                />
                .
              </>
            )}
          </div>
        );
      }
      case 'Notification/EVENT_BET_RESOLVED':
      case 'Notification/EVENT_BET_CLOSED': {
        const event = _.get(data, 'event');
        const eventSlug = _.get(event, 'slug');
        const bet = _.get(data, 'bet', []);
        const outcomeIndex = _.get(bet, 'final_outcome');
        const outcomesName = _.get(bet, `outcomes[${outcomeIndex}].name`);

        return (
          <div>
            Bet{' '}
            <ActivityLink
              path={'/trade/' + eventSlug}
              text={bet?.market_question}
            />{' '}
            has been{' '}
            {activity.type === 'Notification/EVENT_BET_CLOSED'
              ? 'closed'
              : 'resolved'}{' '}
            with <b>{outcomesName}</b>.
          </div>
        );
      }
      case 'Notification/EVENT_BET_DISPUTED': {
        const user = data.user;
        const event = data.event;

        return (
          <div>
            User{' '}
            <ActivityLink
              path={'/user/' + user._id}
              text={user.username || 'User'}
            />{' '}
            has disputed event{' '}
            <ActivityLink
              path={'/trade/' + event.slug}
              text={event.name || 'Event'}
            />
            : {data.explanation}
          </div>
        );
      }
      case 'Notification/EVENT_BET_WAITING_RESOLUTION':
        return (
          <div>
            Event{' '}
            {showBetName && (
              <ActivityLink
                path={'/trade/' + data.event?.slug}
                text={data.bet?.market_question}
              />
            )}{' '}
            is waiting to be resolved
          </div>
        );
      case 'Notification/EVENT_BET_ACTIVE':
        return (
          <div>
            Event{' '}
            {showBetName && (
              <ActivityLink
                path={'/trade/' + data.event?.slug}
                text={data.bet?.market_question}
              />
            )}{' '}
            has been activated at{' '}
            {moment(data.bet?.start_date).format('DD.MM.YYYY HH:mm')}
          </div>
        );
      case 'Notification/EVENT_BET_EVALUATED':
        return (
          <div>
            Bet <b>{_.get(data, 'bet_question')}</b> has been rated as{' '}
            <b>{_.get(data, 'rating')}</b>.
          </div>
        );
      case 'Casino/CASINO_PLACE_BET': {
        const stakedAmount = data?.amount || data?.stakedAmount;
        const gamesCurrency = currencyDisplay(data?.gamesCurrency);
        const numDecimals = gamesCurrency === TOKEN_NAME ? 0 : 2;

        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has placed{' '}
              <b>
                {formatToFixed(stakedAmount, numDecimals, true)} {gamesCurrency}
              </b>
            {' '}
            bet on {gameLabel}.{' '}
          </div>
          // TODO: Replace this hardcoded game name with actual one later
        );
      }
      case 'Casino/CASINO_CASHOUT':
        const stakedAmount = _.get(data, 'stakedAmount');
        const gamesCurrency = currencyDisplay(data?.gamesCurrency);
        const reward = _.get(data, 'reward');
        const gain = calculateGain(stakedAmount, reward);
        const gainValueCasino = _.get(gain, 'value');
        const gainNegativeCasino = _.get(gain, 'negative');
        const numDecimals = gamesCurrency === TOKEN_NAME ? 0 : 2;
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has cashed out{' '}
            
              <b>
                {formatToFixed(_.get(data, 'reward'), numDecimals, true)} {gamesCurrency}
              </b>
            {' '}
            {gainValueCasino && (
              <div
                className={
                  gainNegativeCasino
                    ? null
                    : 'global-cashout-profit'
                }
              >
                ({gainValueCasino})
              </div>
            )}{' '}
            from {gameLabel}.{' '}
          </div>
          // TODO: Replace this hardcoded game name with actual one later
        );
      case 'Notification/EVENT_USER_SIGNED_UP':
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has signed up.
          </div>
        );
      // case 'Notification/EVENT_USER_UPLOADED_PICTURE':
      //   return (
      //     <div>
      //       <b>{getUserProfileUrl(data)}</b> has updated avatar.
      //     </div>
      //   );
      case 'Notification/EVENT_USER_CHANGED_USERNAME':
        return (
          <div>
            <b>{_.get(data, 'oldUsername')}</b> has changed username to{' '}
            <b>{getUserProfileUrl(data)}</b>.
          </div>
        );
      case 'Notification/EVENT_USER_CHANGED_NAME':
        return (
          <div>
            <b>{_.get(data, 'oldName')}</b> has changed name to{' '}
            <b>{getUserProfileUrl(data)}</b>.
          </div>
        );
      case 'Notification/EVENT_USER_CHANGED_ABOUT_ME':
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has changed its profile's "About
            me" section.
          </div>
        );
      case 'Casino/EVENT_CASINO_LOST': {
        const multiplier = data?.crashFactor || data?.winMultiplier || 0;
        const multiplierLabel = data?.crashFactor
          ? 'crash factor'
          : 'multiplier';

        const gamesCurrency = currencyDisplay(data?.gamesCurrency);
        const stakedAmount = isPlayMoney
          ? _.get(data, 'stakedAmountWfair')
          : _.get(data, 'stakedAmount');
        const numDecimals = gamesCurrency === TOKEN_NAME ? 0 : 2;
        
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has lost{' '}
            
              <b>
                {formatToFixed(stakedAmount, numDecimals, true)} {gamesCurrency}
              </b>
            {' '}
            at{' '}
            {roundToTwo(multiplier)}
            {' '}
            {multiplierLabel} on {gameLabel}.{' '}
          </div>
          // TODO: Replace this hardcoded game name with actual one later
        );
      }
      default:
        return null;
    }
  };

  const renderMessageContent = () => {
    const type = _.get(activity, 'type');
    const userId = _.get(activity, 'userId', _.get(activity, 'data.userId'));
    let user = State.getUser(userId, users);
    // const profilePicture = getProfilePictureUrl(_.get(user, 'profilePicture'));
    // const userName = _.get(user, 'username', _.get(activity, 'data.user.username'));

    if (!user) {
      user = _.get(activity, 'data.user');
    }

    //avoid showing 'upload picture' notification
    if (type === 'Notification/EVENT_USER_UPLOADED_PICTURE') return null;

    return (
      <div className={classNames(styles.chatMessage, styles.messageItem)}>
        {/*<img src={profilePicture} alt={userName} />*/}
        <div className={styles.dateStringContainer}>
          {prepareMessageByType(activity, user)}
          <small className={styles.dateString}>{dateString}</small>
        </div>
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
