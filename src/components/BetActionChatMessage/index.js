import _ from 'lodash';
import { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Routes from '../../constants/Routes';
import { useHistory } from 'react-router';
import ProfilePicture from '../ProfilePicture';
import ChatMessageType from '../ChatMessageWrapper/ChatMessageType';
import { formatToFixed } from '../../helper/FormatNumbers';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/selectors/authentication';
import { convert } from 'helper/Currency';
import { useChatIntersection } from '../../hooks/useChatIntersection';

const BetActionChatMessage = ({
  chatMessageType,
  user,
  message,
  dateString,
  parentRef,
  lastMessage,
}) => {
  const history = useHistory();

  const { betId, roomId, amount, outcome } = message;

  const events = useSelector(state => state.event.events) || [];
  const event = events.find(e => e._id === roomId);
  const bets = event.bets || [];
  const bet = bets.find(b => b._id === betId);

  const { currency } = useSelector(selectUser);

  const userName = _.get(user, 'username');
  const tokenAmount = formatToFixed(convert(amount, currency), 2, true);
  const betOutcome = _.get(bet, ['outcomes', outcome]);
  const outcomeValue = _.get(betOutcome, 'name');

  const [isVisible, setVisible] = useState(false);
  const elementRef = useChatIntersection(parentRef, setVisible);

  if (!user) {
    return null;
  }

  const onClick = () => {
    history.push(
      Routes.getRouteWithParameters(Routes.bet, {
        eventSlug: event?.slug,
        betSlug: bet?.slug,
      })
    );
  };

  const getMessage = () => {
    switch (chatMessageType) {
      case ChatMessageType.createBet:
        return (
          <>
            <b>{userName}</b> created trade{' '}
            <div className={'global-token-currency'}>
              <strong>{`${tokenAmount} ${currency}`}</strong>
            </div>{' '}
            on <strong>{outcomeValue}</strong>.
          </>
        );

      case ChatMessageType.placeBet:
        return (
          <>
            <b>{userName}</b> bought{' '}
            <div className={'global-token-currency'}>
              <strong>{`${tokenAmount} ${currency}`}</strong>
            </div>{' '}
            of <strong>{outcomeValue}</strong>.
          </>
        );

      case ChatMessageType.pulloutBet:
        return (
          <>
            <b>{userName}</b> sold <strong>{outcomeValue}</strong> for{' '}
            <div className={'global-token-currency'}>
              <strong>{`${tokenAmount} ${currency}`}</strong>
            </div>
            .
          </>
        );
    }

    return null;
  };

  const renderText = () => {
    return <div>{getMessage()}</div>;
  };

  return (
    <div
      className={classNames(
        styles.betActionChatMessage,
        lastMessage ? styles.newMessage : null,
        isVisible ? styles.isVisible : null
      )}
      ref={elementRef}
      onClick={onClick}
    >
      <ProfilePicture user={user} width={20} height={20} />
      {renderText()}
      <small>{dateString}</small>
    </div>
  );
};

export default BetActionChatMessage;
