import _ from 'lodash';
import State from '../../helper/State';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import BetSummaryHelper from '../../helper/BetSummary';
import SummaryRowContainer from '../SummaryRowContainer';
import StateBadge from '../StateBadge';

const TradeDetailView = ({ trade, tradeCreator }) => {
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
          See <strong>Trade</strong> Details
        </span>
      </div>
    );
  };

  const renderHeadline = () => {
    const marketQuestion = _.get(trade, 'marketQuestion');

    return <div className={styles.tradeDetailHeadline}>{marketQuestion}</div>;
  };

  const renderSummary = () => {
    const creatorName = _.get(tradeCreator, 'name', 'Alpacasino Admin');
    const marketQuestion = _.get(trade, 'marketQuestion');
    const tradeState = _.get(trade, 'status');
    const outcomes = _.get(trade, 'outcomes', []);
    const possibleOutcomes = _.join(
      _.map(outcomes, outcome => _.get(outcome, 'name')),
      ' | '
    );
    const resolutionEvidenceDescription = _.get(trade, 'description');
    const tradeSummaryRows = [
      BetSummaryHelper.getDivider(),
      BetSummaryHelper.getKeyValue('Trade Creator', creatorName),
      BetSummaryHelper.getKeyValue('Trade Question', marketQuestion),
      BetSummaryHelper.getKeyValue(
        'Trade Status',
        null,
        false,
        false,
        null,
        false,
        false,
        null,
        <span>
          <StateBadge state={tradeState} withoutBackground={true} />
        </span>
      ),
      BetSummaryHelper.getKeyValue('Possible Outcomes', possibleOutcomes),
      BetSummaryHelper.getDivider(),
    ];

    if (!_.isEmpty(resolutionEvidenceDescription)) {
      tradeSummaryRows.push(
        BetSummaryHelper.getKeyValue(
          'Resolution Evidence Description',
          resolutionEvidenceDescription,
          false,
          false,
          null,
          false,
          false,
          null,
          null,
          true
        )
      );
    }

    return (
      <div className={styles.summaryRowContainer}>
        <SummaryRowContainer
          className={styles.summaryRow}
          summaryRows={tradeSummaryRows}
        />
      </div>
    );
  };

  return (
    <div className={styles.tradeDetailContainer}>
      {renderHeader()}
      {renderHeadline()}
      {renderSummary()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const tradeId = _.get(ownProps, 'tradeId');
  const trade = State.getTrade(tradeId, state.event.events);
  const tradeCreatorUserId = _.get(trade, 'creator');
  const tradeCreator = State.getUser(tradeCreatorUserId, state.user.users);

  return {
    trade,
    tradeCreator,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeDetailView);
