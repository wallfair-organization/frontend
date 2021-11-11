import { useState, useEffect } from 'react';
import TradeItem from './TradeItem';
import * as ApiUrls from '../../constants/Api';

const AllTrades = ({ bet, currentUserId }) => {
  const betId = bet?._id;
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    async function getData() {
      const url = `${ApiUrls.BACKEND_URL}api/event/bet/${betId}/open-bets`;
      const { openBets } = await fetch(url).then(d => d.json());
      const tradesLocal = openBets.map(ob => ({
        ...ob,
        outcomeName: bet.outcomes[ob.outcomeIndex]?.name,
      }));
      setTrades(tradesLocal);
    }
    getData();
  }, []);

  if (trades.length === 0) {
    return <div>No Trades</div>;
  }

  return (
    <>
      {trades.map((trade, idx) => (
        <TradeItem key={idx} trade={trade} currentUserId={currentUserId} />
      ))}
    </>
  );
};

export default AllTrades;
