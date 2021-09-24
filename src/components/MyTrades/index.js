import styles from './styles.module.scss';
import SwitchableContainer from '../../components/SwitchableContainer';
import SwitchableHelper from '../../helper/SwitchableHelper';
import { useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import State from '../../helper/State';
import { formatToFixed } from '../../helper/FormatNumbers';
import MyTradesList from '../MyTradesList';
import { selectOpenBets } from 'store/selectors/bet';
import { selectTransactions } from 'store/selectors/transaction';

const MyTrades = ({ close: closeDrawer }) => {
  const [switchIndex, setSwitchIndex] = useState(0);

  const events = useSelector(state => state.event.events);
  const openBets = useSelector(selectOpenBets);
  const transactions = useSelector(selectTransactions);

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
      };
    });
  };

  const getTransactions = () => {
    return _.map(transactions, transaction => {
      const trade = getTrade(transaction.bet);
      const outcomeValue = _.get(trade, [
        'outcomes',
        transaction.outcome,
        'name',
      ]);
      const outcomeAmount = formatToFixed(
        _.get(transaction, 'outcomeTokensBought', 0)
      );
      const investmentAmount = formatToFixed(
        _.get(transaction, 'investmentAmount', 0)
      );

      return {
        ...trade,
        outcomeValue,
        outcomeAmount,
        investmentAmount,
        date: transaction.trx_timestamp,
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
    return (
      <MyTradesList
        bets={getOpenBets()}
        withStatus={true}
        closeDrawer={closeDrawer}
        allowCashout={true}
      />
    );
  };

  const renderBetHistory = () => {
    return <MyTradesList bets={getTransactions()} closeDrawer={closeDrawer} />;
  };

  return (
    <div className={styles.myTradesContainer}>
      {renderSwitchableView()}
      <div className={styles.myTrades}>{renderContent()}</div>
    </div>
  );
};

export default MyTrades;
