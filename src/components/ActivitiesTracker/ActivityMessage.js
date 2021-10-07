import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import DateText from '../../helper/DateText';
import styles from './styles.module.scss';
import State from '../../helper/State';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getProfilePictureUrl } from '../../helper/ProfilePicture';
import { formatToFixed } from 'helper/FormatNumbers';

const ActivityMessage = ({ activity, date, users, events }) => {
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

  const getEventUrl = data => {
    const event = _.get(data, 'event');
    const eventType = _.get(event, 'type');
    const eventSlug = _.get(event, 'slug');
    const bets = _.get(event, 'bets', []);

    if (eventType === 'streamed') {
      const bet = _.get(data, 'bet');
      let thisUrl = `${window.location.origin}/trade/${_.get(event, 'slug')}`;

      if (bet) {
        thisUrl = `${window.location.origin}/trade/${_.get(
          event,
          'slug'
        )}/${_.get(bet, 'slug')}`;
      }

      return (
        <a target={'_blank'} href={thisUrl} rel="noreferrer">
          {_.get(event, 'name')}
        </a>
      );
    } else if (eventType === 'non-streamed' && bets.length === 1) {
      return (
        <a
          target={'_blank'}
          href={`${window.location.origin}/trade/${eventSlug}/${_.get(
            bets,
            '[0].slug'
          )}`}
          rel="noreferrer"
        >
          {_.get(event, 'bets[0].marketQuestion')}
        </a>
      );
    } else {
      return (
        <a
          target={'_blank'}
          href={`${window.location.origin}/trade/${eventSlug}/bet`}
          rel="noreferrer"
        >
          {_.get(event, 'name')}
        </a>
      );
    }
  };

  const getUserProfileUrl = user => {
    if (!user) {
      return 'Unknown user';
    }

    const userId = _.get(user, 'userId');

    return (
      <a
        target={'_blank'}
        href={`${window.location.origin}/user/${userId}`}
        rel="noreferrer"
      >
        {_.get(user, 'username', 'Unknown user')}
      </a>
    );
  };

  const prepareMessageByType = (activity, user) => {
    const data = activity.data;
    let event = _.get(data, 'event');

    if (!event) {
      event = State.getEvent(_.get(data, 'bet.event'), events);
    }

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
            <b>{formatToFixed(_.get(data, 'winToken'), 0)} WFAIR</b> from{' '}
            <b>{_.get(event, 'name')}</b>.
          </div>
        );
      case 'Notification/EVENT_ONLINE':
        return `Stream ${_.get(data, 'event.name')} has become online.`; //EDITED
      case 'Notification/EVENT_OFFLINE':
        return `Stream ${_.get(data, 'event.name')} has become offline.`; //EDITED
      case 'Notification/EVENT_NEW':
        return (
          <div>
            New event has been created <b>{getEventUrl(data)}</b>.
          </div>
        ); //EDITED
      case 'Notification/EVENT_NEW_BET':
        return (
          <div>
            New bet has been created{' '}
            <b>
              <a
                target={'_blank'}
                href={`${window.location.origin}/trade/${_.get(
                  event,
                  'slug'
                )}/${_.get(event, 'bets[0].slug')}`}
                rel="noreferrer"
              >
                {_.get(event, 'bets[0].marketQuestion')}
              </a>
            </b>
            .
          </div>
        ); //EDITED
      case 'Notification/EVENT_BET_PLACED':
        const outcomeIndex = _.get(data, 'trade.outcomeIndex');
        const outcomesName = _.get(data, `bet.outcomes[${outcomeIndex}].name`);
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has bet{' '}
            {_.get(data, 'trade.investmentAmount')} WFAIR on{' '}
            {
              <a
                target={'_blank'}
                href={`${window.location.origin}/trade/${_.get(
                  event,
                  'slug'
                )}/${_.get(data, 'bet.slug')}`}
                rel="noreferrer"
              >
                <b>{_.get(data, 'bet.marketQuestion')}</b>
              </a>
            }{' '}
            with <b>{outcomesName}</b>.
          </div>
        );
      case 'Notification/EVENT_BET_CASHED_OUT':
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has cashed out{' '}
            <b>{_.get(data, 'amount')} WFAIR</b> from{' '}
            <b>
              <a
                target={'_blank'}
                href={`${window.location.origin}/trade/${_.get(
                  event,
                  'slug'
                )}/${_.get(data, 'bet.slug')}`}
                rel="noreferrer"
              >
                <b>{_.get(data, 'bet.marketQuestion')}</b>
              </a>
            </b>
            .
          </div>
        );
      case 'Notification/EVENT_BET_RESOLVED':
        return (
          <div>
            Bet <b>{getEventUrl(data)}</b> has been resolved.
          </div>
        );
      case 'Casino/CASINO_PLACE_BET':
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has placed{' '}
            <b>{_.get(data, 'amount')} WFAIR</b> bet on Elon Game.{' '}
          </div>
          // TODO: Replace this hardcoded game name with actual one later
        );
      case 'Casino/CASINO_CASHOUT':
        return (
          <div>
            <b>{getUserProfileUrl(data)}</b> has cashed out{' '}
            <b>{_.get(data, 'reward')} WFAIR</b> from Elon Game.{' '}
          </div>
          // TODO: Replace this hardcoded game name with actual one later
        );
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

    if (!user) {
      //@todo sometimes user is not there, we are displaying 'Unknown user' we should do an api call to get this? Better to add missing part to the event message in USER_REWARDED
    }

    return (
      <div className={classNames(styles.chatMessage, styles.messageItem)}>
        {/*<img src={profilePicture} alt={userName} />*/}
        <div className={styles.dateStringContainer}>
          {prepareMessageByType(activity, user)}
          <small className={styles.dateString}>{dateString}</small>
        </div>
      </div>
    );

    return null;
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
