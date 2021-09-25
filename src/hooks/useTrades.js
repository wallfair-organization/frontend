import { useSelector } from 'react-redux';
import State from '../helper/State';
import { selectOpenBets, selectTradeHistory } from 'store/selectors/bet';
import _ from 'lodash';
import { formatToFixed } from '../helper/FormatNumbers';

const getTrade = (betId, events) => {
  const event = State.getEventByTrade(betId, events);
  const bet = State.getTradeByEvent(betId, event);

  return {
    betId,
    eventId: event?._id,
    imageUrl: event?.previewImageUrl,
    marketQuestion: bet?.marketQuestion,
    status: bet?.status,
    outcomes: bet?.outcomes,
    eventSlug: event?.slug,
    betSlug: bet?.slug,
  };
};

const getOpenBets = (openBets, events) => {
  return _.map(openBets, openBet => {
    const trade = getTrade(openBet.betId, events);
    const outcomeValue = _.get(trade, ['outcomes', openBet.outcome, 'name']);
    const outcomeAmount = formatToFixed(_.get(openBet, 'outcomeAmount', 0));
    const investmentAmount = formatToFixed(
      _.get(openBet, 'investmentAmount', 0)
    );
    const sellAmount = formatToFixed(_.get(openBet, 'sellAmount', 0));
    const currentBuyAmount = formatToFixed(
      _.get(openBet, 'currentBuyAmount', 0)
    );

    return {
      ...trade,
      outcomeValue,
      outcomeAmount,
      investmentAmount,
      sellAmount,
      currentBuyAmount,
      date: openBet.lastDate,
      outcome: openBet.outcome,
      tradeStatus: openBet.status,
    };
  });
};

const getTransactions = (trades, events) => {
  return _.map(trades, t => {
    const trade = getTrade(t.betId, events);
    const outcomeValue = _.get(trade, ['outcomes', t.outcomeIndex, 'name']);
    const outcomeAmount = formatToFixed(_.get(t, 'outcomeAmount', 0));
    const investmentAmount = formatToFixed(_.get(t, 'investmentAmount', 0));
    const soldAmount = formatToFixed(_.get(t, 'soldAmount', 0));

    return {
      ...trade,
      outcomeValue,
      outcomeAmount,
      investmentAmount,
      soldAmount,
      date: t.lastDate,
      finalOutcome: t.bet?.finalOutcome,
      outcome: t.outcomeIndex,
      tradeStatus: t.status,
    };
  });
};

const useTrades = eventId => {
  const events = useSelector(state => state.event.events);
  const openBets = useSelector(selectOpenBets);
  const transactions = useSelector(selectTradeHistory);

  let activeBets = getOpenBets(openBets, events);
  const tradeHistory = getTransactions(transactions, events);

  if (eventId) {
    activeBets = activeBets.filter(bet => bet.eventId === eventId);
  }

  return {
    activeBets,
    tradeHistory,
  };
};

export default useTrades;
