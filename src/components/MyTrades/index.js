import styles from './styles.module.scss';
import SwitchableContainer from '../../components/SwitchableContainer';
import SwitchableHelper from '../../helper/SwitchableHelper';
import { useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import State from '../../helper/State';
import { formatToFixed } from '../../helper/FormatNumbers';
import MyTradesList from '../MyTradesList';
import { selectOpenBets, selectTradeHistory } from 'store/selectors/bet';

const MyTrades = ({ close: closeDrawer }) => {
  const [switchIndex, setSwitchIndex] = useState(0);

  const events = useSelector(state => state.event.events);
  const openBets = useSelector(selectOpenBets);
  const trades = useSelector(selectTradeHistory);

  const getTrade = betId => {
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

  const getOpenBets = () => {
    return _.map(openBets, openBet => {
      const trade = getTrade(openBet.betId);
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

  const getTransactions = () => {
    return _.map(trades, t => {
      const trade = getTrade(t.betId);
      const outcomeValue = _.get(trade, ['outcomes', t.outcomeIndex, 'name']);
      const outcomeAmount = formatToFixed(_.get(t, 'outcomeAmount', 0));
      const investmentAmount = formatToFixed(_.get(t, 'investmentAmount', 0));

      return {
        ...trade,
        outcomeValue,
        outcomeAmount,
        investmentAmount,
        date: t.lastDate,
        finalOutcome: t.bet?.finalOutcome,
        outcome: t.outcomeIndex,
        tradeStatus: t.status,
        soldAmount: t.soldAmount,
      };
    });
  };

  const renderSwitchableView = () => {
    const switchableViews = [
      SwitchableHelper.getSwitchableView('Open trades'),
      SwitchableHelper.getSwitchableView('Trade history'),
    ];

    return (
      <SwitchableContainer
        className={styles.switchableViewContainer}
        whiteBackground={false}
        fullWidth={false}
        switchableViews={switchableViews}
        currentIndex={switchIndex}
        setCurrentIndex={setSwitchIndex}
      />
    );
  };

  const renderContent = () => {
    return switchIndex === 0 ? renderOpenBets() : renderBetHistory();
  };

  const renderOpenBets = () => {
    const openBets = getOpenBets();
    return (
      <MyTradesList
        bets={openBets}
        withStatus={true}
        closeDrawer={closeDrawer}
        allowCashout={true}
      />
    );
  };

  const renderBetHistory = () => {
    const transactions = getTransactions();
    return <MyTradesList bets={transactions} closeDrawer={closeDrawer} />;
  };

  return (
    <div className={styles.myTradesContainer}>
      {renderSwitchableView()}
      <div className={styles.myTrades}>{renderContent()}</div>
    </div>
  );
};

export default MyTrades;
