import React from 'react';
import _ from 'lodash';
import BetSummaryHelper from '../../helper/BetSummary';
import Divider from '../Divider';
import Icon from '../Icon';
import IconTheme from '../Icon/IconTheme';
import IconType from '../Icon/IconType';
import moment from 'moment';
import State from '../../helper/State';
import StateBadge from '../StateBadge';
import styles from './styles.module.scss';
import SummaryRowContainer from '../SummaryRowContainer';
import SwitchableContainer from '../SwitchableContainer';
import SwitchableHelper from '../../helper/SwitchableHelper';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import { useState } from 'react';
import TradeDetailOverview from '../TradeDetailOverview';

const EventDetailView = ({ event, isAdmin }) => {
  const [currentView, setCurrentView] = useState(0);

  const renderHeader = () => {
    return (
      <div className={styles.headline}>
        <Icon
          className={styles.headlineIcon}
          iconType={IconType.info}
          width={16}
          height={16}
        />
        <span className={styles.headlineText}>
          See <strong>Event</strong> Details
        </span>
      </div>
    );
  };

  const renderEventDetails = () => {
    const eventCreator = 'Alpacasino Admin';
    const eventTitle = _.get(event, 'name');
    const eventClass = 'Streamed';
    const eventCategory = 'Live Event';
    const eventFeedSource = _.get(event, 'streamUrl');
    const tradeCreatePermission = isAdmin ? 'Yes' : 'No';
    const dateFormat = 'MM/DD/YYYY';
    const eventStartDate = moment(_.get(event, 'date', null)).format(
      dateFormat
    );
    const eventEndDate = moment(_.get(event, 'endDate', eventStartDate)).format(
      dateFormat
    );
    const eventState = _.get(event, 'state', 'active');
    const summaryRows = [
      BetSummaryHelper.getKeyValue('Event Creator', eventCreator),
      BetSummaryHelper.getKeyValue(
        'Name of the Event',
        eventTitle,
        false,
        true
      ),
      BetSummaryHelper.getKeyValue('Event Class', eventClass),
      BetSummaryHelper.getKeyValue('Event Category', eventCategory),
      BetSummaryHelper.getKeyValue(
        'Event Feed Source Type',
        null,
        false,
        false,
        false,
        false,
        false,
        false,
        <span>
          <Icon
            className={styles.summaryRowIcon}
            iconType={IconType.twitch}
            width={16}
          />
          Twitch
        </span>
      ),
      BetSummaryHelper.getKeyValue(
        'Event Feed Source',
        eventFeedSource,
        false,
        false,
        false,
        null,
        true,
        null,
        null,
        false,
        new URL(eventFeedSource).hostname
      ),
      BetSummaryHelper.getKeyValue(
        'User Permission to Create Trades',
        tradeCreatePermission
      ),
      BetSummaryHelper.getKeyValue(
        'Start Date',
        null,
        false,
        false,
        null,
        false,
        false,
        null,
        <span>
          <Icon
            className={styles.summaryRowIcon}
            iconTheme={IconTheme.black}
            iconType={IconType.calendar}
            width={20}
            height={20}
          />
          {eventEndDate}
        </span>
      ),
      BetSummaryHelper.getKeyValue(
        'Start Date',
        null,
        false,
        false,
        null,
        false,
        false,
        null,
        <span>
          <Icon
            className={styles.summaryRowIcon}
            iconTheme={IconTheme.black}
            iconType={IconType.calendar}
            width={20}
            height={20}
          />
          {eventStartDate}
        </span>
      ),
      BetSummaryHelper.getKeyValue(
        'Event Status',
        null,
        false,
        false,
        null,
        false,
        false,
        null,
        <span>
          <StateBadge state={eventState} withoutBackground={true} />
        </span>
      ),
    ];

    return (
      <div className={styles.summaryRowContainer}>
        <SummaryRowContainer
          className={styles.summaryRow}
          summaryRows={summaryRows}
        />
      </div>
    );
  };

  const renderTradeOverview = trade => {
    return <TradeDetailOverview event={event} trade={trade} />;
  };

  const renderTradesOverview = () => {
    const trades = _.get(event, 'bets', []);

    return (
      <div className={styles.tradeOverview}>
        {_.map(trades, renderTradeOverview)}
      </div>
    );
  };

  const renderSwitchableContent = () => {
    if (currentView === 0) {
      return renderEventDetails();
    } else {
      return renderTradesOverview();
    }
  };

  const renderSwitchableView = () => {
    const switchableViews = [
      SwitchableHelper.getSwitchableView('Event Details'),
      SwitchableHelper.getSwitchableView('Trades'),
    ];

    return (
      <SwitchableContainer
        className={styles.switchableContainer}
        switchableViews={switchableViews}
        currentIndex={currentView}
        setCurrentIndex={setCurrentView}
        fullWidth={false}
      />
    );
  };

  return (
    <div className={styles.eventDetailContainer}>
      {renderHeader()}
      {renderSwitchableView()}
      <Divider className={styles.divider} />
      {renderSwitchableContent()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const eventId = _.get(ownProps, 'eventId');
  const event = State.getEvent(eventId, state.event.events);

  return {
    event,
    isAdmin: state.authentication.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailView);
