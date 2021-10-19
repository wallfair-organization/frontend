import _ from 'lodash';
import { useSelector } from 'react-redux';
import { selectTransactions } from '../store/selectors/transaction';
import State from '../helper/State';

const useTransactions = () => {
  const transactions = useSelector(selectTransactions);
  const events = useSelector(state => state.event.events);

  const transactionsMapped = transactions.map(transaction => {
    const betId = _.get(transaction, 'bet');
    const event = State.getEventByTrade(betId, events);
    const bet = State.getTradeByEvent(betId, event);

    return {
      ...transaction,
      bet,
      event,
    };
  });

  return {
    transactions: _.orderBy(transactionsMapped, ['trx_timestamp'], ['desc']),
    transactionCount: _.size(transactionsMapped),
  };
};

export default useTransactions;
