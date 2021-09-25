import _ from 'lodash';
import moment from 'moment';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { useState } from 'react';
import classNames from 'classnames';
import { getDefaultUser } from '../../helper/Profile';
import TimeLeftCounter from 'components/TimeLeftCounter';
import Icon from 'components/Icon';
import StateBadge from 'components/StateBadge';
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import IconType from '../Icon/IconType';
import ButtonSmall from '../ButtonSmall';
import ButtonSmallTheme from 'components/ButtonSmall/ButtonSmallTheme';
import BetState from '../../constants/BetState';
import { BET_STATUS_DESCRIPTIONS } from '../../helper/BetStatusDesc';
import AdminOnly from 'components/AdminOnly';
import AuthedOnly from 'components/AuthedOnly';

const RelatedBetCard = ({ onClick, bet, showPopup, events }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const event = _.find(events, {
    _id: _.get(bet, 'event'),
  });

  const renderFooter = () => {
    const status = _.get(bet, 'status');

    return (
      <div className={styles.pillFooter}>
        <div className={styles.timeLeftCounterContainer}>
          <span className={styles.description}>
            {BET_STATUS_DESCRIPTIONS[status]}
          </span>
          {['resolved', 'canceled', 'closed'].includes(status) && (
            <span className={styles.endDate}>
              {moment(bet.endDate).format('MM/DD/YYYY')}
            </span>
          )}
          {['active', 'upcoming'].includes(status) && (
            <TimeLeftCounter
              endDate={status === 'active' ? bet.endDate : bet.date}
            />
          )}
        </div>
      </div>
    );
  };

  const renderOutcome = () => {
    const status = _.get(bet, 'status');
    if (status !== BetState.resolved) {
      return null;
    }

    const { outcomes, finalOutcome } = bet;
    const outcome = outcomes?.find(({ index }) => index === +finalOutcome);

    if (!outcome) {
      return null;
    }

    return (
      <div className={styles.resolutionOutcome}>
        <span className={styles.outcomeLabel}>Outcome:</span>
        <span className={styles.outcomeValue}>{outcome.name}</span>
      </div>
    );
  };

  const openInfoPopup = (popupType, e) => {
    e.stopPropagation();
    const options = {
      tradeId: bet._id,
      eventId: _.get(bet, 'event'),
    };

    showPopup(popupType, options);
  };

  const openMenu = e => {
    e.stopPropagation();
    setMenuOpened(!menuOpened);
  };

  const openEvaluate = event => {
    event.stopPropagation();
    showPopup(PopupTheme.evaluateEvent, {
      small: true,
      bet: {
        question: bet.marketQuestion,
      },
    });
  };

  const openReport = () => {
    showPopup(PopupTheme.reportEvent, { small: true });
  };

  const betLinkLabel = label => (
    <span className={styles.betLinkButtonLabel}>{label}</span>
  );

  return (
    <div className={styles.relatedBetCard}>
      <div className={styles.relatedBetCardContainer}>
        <div className={styles.relatedBetCardHeader}>
          <span className={styles.title} onClick={onClick}>
            {bet.marketQuestion}
          </span>

          <div className={styles.menuMain}>
            <AuthedOnly>
              <ButtonSmall
                text="Evaluate"
                iconType={IconType.thumbUp}
                iconLeft={true}
                butonTheme={ButtonSmallTheme.grey}
                onClick={openEvaluate}
              />
            </AuthedOnly>

            <AdminOnly>
              <div>
                <Icon
                  iconType={IconType.menu}
                  iconTheme={null}
                  onClick={e => openMenu(e)}
                  className={styles.menuBoxIcon}
                />
                <div
                  className={classNames(
                    styles.menuBox,
                    menuOpened ? styles.menuBoxOpened : null
                  )}
                >
                  <div
                    className={styles.menuItem}
                    onClick={() =>
                      showPopup(PopupTheme.editBet, { event, bet })
                    }
                  >
                    <Icon
                      className={styles.menuInfoIcon}
                      iconType={IconType.edit}
                      iconTheme={null}
                      width={16}
                    />
                    <span>Edit bet</span>
                  </div>
                </div>
              </div>
            </AdminOnly>
          </div>
        </div>
        {renderOutcome()}
        <div className={styles.stateBadgeContainer}>
          <StateBadge
            className={styles.stateBadge}
            state={_.get(bet, 'status')}
          />
          {bet?.status === BetState.resolved && (
            <AuthedOnly>
              <ButtonSmall
                text="Dispute"
                butonTheme={ButtonSmallTheme.red}
                onClick={openReport}
              />
            </AuthedOnly>
          )}
          {[BetState.active, BetState.closed].includes(bet?.status) && (
            <AdminOnly>
              <ButtonSmall
                text="Resolve"
                butonTheme={ButtonSmallTheme.dark}
                onClick={e => openInfoPopup(PopupTheme.resolveBet, e)}
              />
            </AdminOnly>
          )}
          {[BetState.active, BetState.resolved, BetState.closed].includes(
            bet?.status
          ) && (
            <ButtonSmall
              text={
                {
                  [BetState.active]: betLinkLabel('Bet'),
                  [BetState.resolved]: betLinkLabel('View'),
                  [BetState.closed]: betLinkLabel('View'),
                }[bet.status]
              }
              iconType={IconType.arrowButtonRight}
              butonTheme={ButtonSmallTheme.dark}
              onClick={onClick}
            />
          )}
        </div>
      </div>
      {renderFooter()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps;
  let user = getDefaultUser();

  if (userId) {
    user = _.get(state.user.users, userId);
  }

  return {
    user: user,
    events: state.event.events,
  };
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedBetCard);
