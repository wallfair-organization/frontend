import styles from './styles.module.scss';
import SwitchableContainer from '../../components/SwitchableContainer';
import SwitchableHelper from '../../helper/SwitchableHelper';
import { useState } from 'react';
import MyTradesList from '../MyTradesList';
import useTrades from '../../hooks/useTrades';

const MyTrades = ({ close: closeDrawer }) => {
  const [switchIndex, setSwitchIndex] = useState(0);

  const { activeBets, tradeHistory } = useTrades();

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
        bets={activeBets}
        withStatus={true}
        closeDrawer={closeDrawer}
        allowCashout={true}
      />
    );
  };

  const renderBetHistory = () => {
    return <MyTradesList bets={tradeHistory} closeDrawer={closeDrawer} />;
  };

  return (
    <div className={styles.myTradesContainer}>
      {renderSwitchableView()}
      <div className={styles.myTrades}>{renderContent()}</div>
    </div>
  );
};

export default MyTrades;
