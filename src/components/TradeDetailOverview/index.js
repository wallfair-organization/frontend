import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import TimeLeftCounter from '../TimeLeftCounter';
import _ from 'lodash';
import Link from '../Link';
import Routes from '../../constants/Routes';
import { useHistory } from 'react-router';
import { PopupActions } from '../../store/actions/popup';
import { connect } from 'react-redux';
import PopupTheme from '../Popup/PopupTheme';

const TradeDetailOverview = ({
  className,
  hidePopup,
  showPopup,
  event,
  trade,
}) => {
  const history = useHistory();

  const onGoToTradeClick = () => {
    const eventSlug = _.get(event, 'slug');
    const tradeSlug = _.get(trade, 'slug');

    hidePopup();

    history.push(
      Routes.getRouteWithParameters(Routes.event, {
        eventSlug
      })
    );
  };

  const onSeeDetailsClick = () => {
    const tradeId = _.get(trade, '_id');

    showPopup(PopupTheme.tradeDetails, { tradeId });
  };

  const renderContent = () => {
    const marketQuestion = _.get(trade, 'marketQuestion');

    return (
      <div className={styles.tradeDetailOverviewContent}>
        <div>{marketQuestion}</div>
        <div className={styles.linkContent}>
          <span onClick={onSeeDetailsClick}>See Details</span>
          <span onClick={onGoToTradeClick}>Go to Trade</span>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    const eventEnd = _.get(trade, 'endDate');

    return (
      <div className={styles.tradeDetailFooter}>
        <span>End of Trade:</span>
        <TimeLeftCounter endDate={eventEnd} />
      </div>
    );
  };

  return (
    <div className={classNames(className, styles.tradeDetailOverview)}>
      {renderContent()}
      {renderFooter()}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(TradeDetailOverview);
