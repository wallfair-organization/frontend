import { connect, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { formatToFixed } from 'helper/FormatNumbers';
import { PieChart } from 'react-minimal-pie-chart';
import { GeneralActions } from 'store/actions/general';
import _ from 'lodash';
import { selectUser } from 'store/selectors/authentication';

const WalletBalance = () => {
  const { balance, totalInvestmentAmount, totalOpenTradesAmount, currency } =
    useSelector(selectUser);

  const formattedBalance = _.toNumber(balance);
  // const overallFundsTotal = formattedBalance + totalInvestmentAmount;
  const overallFundsTotal = formattedBalance + totalOpenTradesAmount;
  const liquidFundsPercentage = (100 * formattedBalance) / overallFundsTotal;
  const investedFundsPercentage =
    (100 * totalInvestmentAmount) / overallFundsTotal;

  return (
    <div className={styles.walletBalance}>
      <div className={styles.walletBalanceHeading}>
        <p className={styles.walletBalanceTitle}>total balance</p>
      </div>
      <div className={styles.walletBalanceContent}>
        <div className={styles.walletBalanceItem}>
          <div className={styles.overallFunds}>
            <div className={styles.overallFundsAmount}>
              <PieChart
                data={[
                  {
                    title: 'Lock in trades',
                    value: investedFundsPercentage,
                    color: '#3570ff',
                  },
                  {
                    title: 'Available for trading',
                    value: liquidFundsPercentage,
                    color: '#69ffa5',
                  },
                ]}
                lineWidth={14}
                startAngle={270}
              />
              <p className={styles.overallFundsTotal}>
                {formatToFixed(overallFundsTotal, 2, true)}
              </p>
              <p className={styles.overallFundsTitle}>{currency}</p>
            </div>
          </div>
        </div>
        <div className={styles.walletBalanceSum}>
          <div className={styles.walletBalanceItem}>
            <div className={styles.availableWfairs}>
              <div className={styles.availableWfairsHeadline}>
                <div className={styles.availableWfairsDot} />
                Available for trading
              </div>
              <div className={styles.availableWfairsAmount}>
                <p className={styles.availableWfairsTotal}>
                  {formatToFixed(formattedBalance, 2, true)}
                </p>
                <p className={styles.availableWfairsTitle}>{currency}</p>
              </div>
            </div>
          </div>
          <div className={styles.walletBalanceItem}>
            <div className={styles.liquidFunds}>
              <div className={styles.liquidFundsHeadline}>
                <div className={styles.liquidFundsDot} />
                Locked in trades
              </div>
              <div className={styles.liquidFundsAmount}>
                <p className={styles.liquidFundsTotal}>
                  {formatToFixed(totalOpenTradesAmount, 2, true)}
                </p>
                <p className={styles.liquidFundsTitle}>{currency}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleMyTradesVisible: bool => {
      dispatch(GeneralActions.setMyTradesVisible(bool));
    },
    handleEmailNotificationsVisible: bool => {
      dispatch(GeneralActions.setEmailNotificationsVisible(bool));
    },
    handlePreferencesVisible: bool => {
      dispatch(GeneralActions.setPreferencesVisible(bool));
    },
    setOpenDrawer: drawerName => {
      dispatch(GeneralActions.setDrawer(drawerName));
    },
  };
};

export default connect(null, mapDispatchToProps)(WalletBalance);
