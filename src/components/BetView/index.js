// @TODO: this component is WAY TOO BIG IMO, hard to read for new devs and the state logic is very complex,
// would be good to refactor this and break it down in smaller components
import _ from 'lodash';
import Button from '../Button';
import ChoiceSelector from '../ChoiceSelector';
import classNames from 'classnames';
import { useRouteMatch } from 'react-router-dom';
import HighlightType from '../../components/Highlight/HighlightType';
import moment from 'moment';
import { useCallback } from 'react';
import styles from './styles.module.scss';
import TimeCounter from '../../components/TimeCounter';
import TokenNumberInput from '../TokenNumberInput';
import { BetActions } from '../../store/actions/bet';
import { connect, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHasMounted } from '../hoc/useHasMounted';
import { useState } from 'react';
import ChoiceSelectorList from '../ChoiceSelectorList';
import Icon from '../Icon';
import LoadingAnimation from '../../data/animations/sending-transaction.gif';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import SummaryRowContainer from '../SummaryRowContainer';
import TextHelper from '../../helper/Text';
import BetState from '../../constants/BetState';
import { PopupActions, PopupTypes } from '../../store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import ErrorHint from '../ErrorHint';
import { formatToFixed } from '../../helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';
import { GeneralActions } from 'store/actions/general';
import ReactTooltip from 'react-tooltip';
import { selectOutcomes, selectSellOutcomes } from 'store/selectors/bet';
import { selectUser } from 'store/selectors/authentication';
import { convert } from 'helper/Currency';
import DateText from 'helper/DateText';
import AdminOnly from 'components/AdminOnly';
import StateBadge from 'components/StateBadge';
import AuthedOnly from 'components/AuthedOnly';
import ButtonSmall from 'components/ButtonSmall';
import ButtonSmallTheme from 'components/ButtonSmall/ButtonSmallTheme';
import InfoBox from 'components/InfoBox';
import EventTypes from 'constants/EventTypes';

const BetView = ({
  betId,
  eventId,
  openBets,
  actionIsInProgress,
  closed,
  isPopup = false,
  forceSellView,
  // disableSwitcher = false,
  showEventEnd,
  events,
  placeBet,
  // pullOutBet,
  showPopup,
  isTradeViewPopup,
  handleChartDirectionFilter,
  setOpenDrawer,
  fetchOutcomes,
  // fetchSellOutcomes,
  resetOutcomes,
}) => {
  const { currency, balance } = useSelector(selectUser);
  const wfairBalance = formatToFixed(
    _.get(
      useSelector(state => state.authentication),
      'balance',
      0
    )
  );
  const defaultBetValue = 1;
  const event = _.find(events, {
    _id: eventId,
  });
  const bet = _.find(_.get(event, 'bets', []), {
    _id: betId,
  });
  const state = _.get(bet, 'status');
  const outcomes = _.get(useSelector(selectOutcomes), 'outcomes', {});
  const sellOutcomes = _.get(useSelector(selectSellOutcomes), 'outcomes', {});
  const userLoggedIn = useSelector(
    state => state.authentication.authState === 'LOGGED_IN'
  );

  // LOCAL
  const [currentTradeView, setCurrentTradeView] = useState(
    forceSellView ? 1 : 0
  );
  const [validInput, setValidInput] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [commitmentErrorText, setCommitmentErrorText] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);
  // const [openBetsRef, setOpenBetsRef] = useState(openBets);
  const [showAllEvidence, setShowAllEvidence] = useState(false);
  const [choice, setChoice] = useState(null);
  const [commitment, setCommitment] = useState(defaultBetValue);
  const [convertedCommitment, setConvertedCommitment] = useState(
    convert(commitment, currency)
  );

  const hasMounted = useHasMounted();
  const match = useRouteMatch();

  const validateInput = () => {
    const betEndDate = _.get(bet, 'endDate');
    const current = moment(new Date());
    const isSell = hasSellView();
    let valid = true;

    if (current.isAfter(betEndDate)) {
      // TODO valid = false;
    }

    if (choice === null) {
      valid = false;
    }

    if (!commitment && !isSell) {
      valid = false;
    }

    if (
      userLoggedIn &&
      _.toNumber(commitment) > _.toNumber(wfairBalance) &&
      !isSell
    ) {
      valid = false;

      setCommitmentErrorText('Not enough balance.');
    } else if (!userLoggedIn) {
      valid = false;
      setCommitmentErrorText('Sign in to start trading.');
    } else {
      setCommitmentErrorText('');
    }

    setValidInput(valid);

    return valid;
  };

  useEffect(() => {
    return () => {
      resetOutcomes();
    };
  }, []);

  useEffect(
    () => {
      if (hasMounted) {
        setCurrentTradeView(forceSellView ? 1 : 0);

        // loadAfterMount();
      }
    },
    // @TODO: this possibly needs refactoring and or adding remaining deps,
    // the functions that do not depend on state or props should move out of the component.
    // for the other functions useCallback() would make sense to prevent unnecessary rerenders
    [hasMounted, closed]
  );

  useEffect(() => {
    if (!closed && !!betId) {
      validateInput();
      fetchOutcomes(commitment, betId);
      setConvertedCommitment(convert(commitment, currency));
    }
  }, [commitment, currency, betId]);

  useEffect(() => {
    validateInput();
  }, [choice]);

  useEffect(() => {
    setShowLoadingAnimation(actionIsInProgress);

    if (!actionIsInProgress) {
      setChoice(null);
    }
  }, [actionIsInProgress]);

  const hasSellView = () => {
    return (currentTradeView === 1 || forceSellView) && _.size(openBets);
  };

  const getFinalOutcome = () => {
    return _.get(bet, 'finalOutcome', false);
  };

  const onTradeButtonConfirm = () => {
    const validInput = validateInput();

    if (validInput) {
      placeBet(betId, commitment, choice);

      if (event.type === 'non-streamed') {
        setTimeout(() => {
          handleChartDirectionFilter();
        }, 1000);
      }
    }
  };

  const showJoinPopup = () => {
    showPopup(PopupTheme.auth, { small: true });
  };

  const onChoiceSelect = (id, enabled) => {
    return () => {
      if (enabled) {
        setChoice(id);
      }
    };
  };

  const debouncedSetCommitment = useCallback(
    _.debounce((number, toCurrency) => {
      const newCommitment =
        toCurrency !== TOKEN_NAME
          ? convert(number, TOKEN_NAME, toCurrency)
          : number;
      setCommitment(newCommitment);
    }, 300),
    []
  );

  const onTokenNumberChange = number => {
    setConvertedCommitment(number);
    debouncedSetCommitment(number, currency);
  };

  const getOpenBet = index => {
    return _.find(openBets, {
      outcome: index,
    });
  };

  const getOpenBetsValue = index => {
    const openBet = getOpenBet(index);

    if (openBet) {
      return _.get(openBet, 'outcomeAmount');
    }

    return 0;
  };

  const getOutcome = index => {
    return _.get(hasSellView() ? sellOutcomes : outcomes, [index]);
  };

  const isChoiceSelectorEnabled = index => {
    if (state !== BetState.active) {
      return false;
    }
    return !hasSellView() || getOpenBetsValue(index) > 0;
  };

  const renderChoiceSelector = (
    index,
    name,
    choiceSelectorTheme,
    styles,
    resolved = false,
    forceSelect = false
  ) => {
    const enabled = isChoiceSelectorEnabled(index);
    const outcome = getOutcome(index);

    return (
      <ChoiceSelector
        key={index}
        theme={choiceSelectorTheme}
        className={styles.choice}
        name={name}
        winAmount={outcome?.outcome || 0}
        currency={currency}
        gain={outcome?.gain || 0}
        selected={choice === index || forceSelect}
        onClick={!resolved ? onChoiceSelect(index, enabled) : _.noop}
        hideAmount={resolved}
        disabled={!enabled || !userLoggedIn}
      />
    );
  };

  const renderTokenSelection = () => {
    const isSell = hasSellView();

    if (isSell) {
      return null;
    }

    return (
      <>
        <label className={styles.label}>You trade:</label>
        <TokenNumberInput
          value={convertedCommitment}
          setValue={onTokenNumberChange}
          currency={currency}
          errorText={commitmentErrorText}
          maxValue={formatToFixed(balance)}
        />
      </>
    );
  };

  const renderTradeDesc = () => {
    const evidenceSource = bet.evidenceSource;

    const shortLength = 100;
    const evidenceDescription = TextHelper.linkifyIntextURLS(
      bet.evidenceDescription
    );
    const plainEvidenceDescription = TextHelper.linkifyIntextURLS(
      bet.evidenceDescription,
      true
    );
    const desc = evidenceSource
      ? TextHelper.linkifyIntextURLS(bet.evidenceSource)
      : evidenceDescription;
    const plainDesc = evidenceSource
      ? TextHelper.linkifyIntextURLS(bet.evidenceSource, true)
      : plainEvidenceDescription;

    const isDescShort =
      plainDesc.length + plainEvidenceDescription.length <= shortLength;

    return (
      <>
        <p
          className={classNames(
            styles.tradeDesc,
            !isDescShort && !showAllEvidence && styles.hidden,
            isDescShort && styles.tradeShortDesc
          )}
        >
          {desc}
          {evidenceSource && evidenceDescription && showAllEvidence && (
            <p className={styles.evidenceDescription}>{evidenceDescription}</p>
          )}
        </p>

        {((desc && !isDescShort) ||
          (evidenceSource && plainEvidenceDescription)) && (
          <button
            className={styles.seeMore}
            onClick={() => setShowAllEvidence(!showAllEvidence)}
          >
            {showAllEvidence ? 'SHOW LESS' : 'SEE MORE'}
          </button>
        )}
      </>
    );
  };

  const renderTradeButton = () => {
    const isSell = hasSellView();
    const finalOutcome = getFinalOutcome();

    if (!isSell && !finalOutcome) {
      const tradeButtonDisabled =
        !(validInput && state === BetState.active) || !userLoggedIn;
      let tradeButtonTheme = null;

      const handleClick = () => {
        if (!userLoggedIn) {
          showJoinPopup();
        } else if (!tradeButtonDisabled) {
          onTradeButtonConfirm();
        } else {
          _.noop();
        }
      };

      return (
        <>
          {renderTradeDesc()}
          <span
            data-for="tool-tip"
            data-tip={'You Need To Select An Option First'}
          >
            <Button
              className={classNames(styles.betButton)}
              onClick={handleClick}
              highlightType={HighlightType.highlightHomeCtaBet}
              highlightTheme={tradeButtonTheme}
              disabled={
                userLoggedIn && !(validInput && state === BetState.active)
              }
              disabledWithOverlay={false}
            >
              <span className={'buttonText'}>
                {userLoggedIn ? 'Trade!' : 'Join Now And Start Trading'}
              </span>
            </Button>
          </span>

          <ReactTooltip
            id="tool-tip"
            className={styles.tooltip}
            place="top"
            effect="solid"
            offset={{ bottom: 10 }}
            disable={!tradeButtonDisabled}
          />
        </>
      );
    }
  };

  const renderChoiceSelectors = (resolved = false, forceSelect) => {
    const outcomes = bet.outcomes;

    return (
      <ChoiceSelectorList
        outcomes={outcomes}
        resolved={resolved}
        forceSelect={forceSelect}
        renderChoiceSelector={renderChoiceSelector}
      />
    );
  };

  const renderPlaceBetContentContainer = enabled => {
    return (
      <>
        {/* {renderSwitchableView()} */}
        <div className={styles.placeBetContentContainer}>
          {renderTokenSelection()}
          <div
            className={classNames(
              styles.buttonContainer,
              hasSellView() ? styles.sellButtonContainer : null
            )}
          >
            <div className={styles.pickOutcomeContainer}>
              <label className={styles.label}>Pick outcome</label>
              <InfoBox iconType={IconType.question}>
                <p>How to place a bet?</p>
                <p>
                  - First select the amount (in WFAIR) you want to put into this
                  bet by tapping on the desired percentage of your portfolio or
                  by typing in the amount you want to trade with.
                </p>
                <p>
                  - After that pick your outcome by tapping on the outcome you
                  think will come true. The potential gains in WFAIR and percent
                  will automatically adjust according to your placed bet amount.
                </p>
                <p>
                  - To finalize your bet click on the Trade! Button and enjoy
                  the thrill
                </p>
              </InfoBox>
            </div>
            <div className={styles.choiceContainer}>
              {renderChoiceSelectors(enabled)}
            </div>
          </div>
        </div>
        {state === BetState.canceled && (
          <div className={styles.canceledErrorContainer}>
            <ErrorHint
              className={styles.canceledErrorText}
              errorText={'All participants will be refunded.'}
            />
          </div>
        )}
      </>
    );
  };

  const getLoadingAnimationStyle = () => {
    return {
      backgroundImage: 'url("' + LoadingAnimation + '")',
    };
  };

  const renderLoadingAnimation = () => {
    if (showLoadingAnimation) {
      return (
        <div className={classNames(styles.loadingAnimationContainer)}>
          <div className={styles.loadingAnimationBackground}></div>
          <div
            className={styles.loadingAnimation}
            style={getLoadingAnimationStyle()}
          ></div>
        </div>
      );
    }

    return null;
  };

  const renderMenuContainerWithCurrentBalance = () => {
    return (
      <div
        className={classNames(
          styles.menuContainer,
          isPopup ? styles.popupMenuContainer : null
        )}
      >
        {/* {renderCurrentBalance()} */}
        {renderMenu()}
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <div className={styles.menu}>
        <Icon
          className={styles.menuIcon}
          iconType={IconType.menu}
          iconTheme={null}
          onClick={() => setMenuOpened(!menuOpened)}
        />
        <div
          className={classNames(
            styles.menuBox,
            menuOpened ? styles.menuBoxOpened : null
          )}
        >
          <div
            className={styles.menuItem}
            onClick={() => showPopup(PopupTheme.editBet, { event, bet })}
          >
            <Icon
              className={styles.menuInfoIcon}
              iconType={IconType.edit}
              iconTheme={null}
              width={16}
            />
            <span>Edit Bet</span>
          </div>
          {bet?.status === BetState.active && (
            <div
              className={styles.menuItem}
              onClick={() =>
                showPopup(PopupTheme.resolveBet, {
                  eventId: event._id,
                  tradeId: bet._id,
                })
              }
            >
              <Icon
                className={styles.menuInfoIcon}
                iconType={IconType.hourglass}
                iconTheme={null}
                width={16}
              />
              <span>Resolve Bet</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStateConditionalContent = () => {
    if (
      state === BetState.active ||
      state === BetState.canceled ||
      state === BetState.closed
    ) {
      return (
        <>
          {renderPlaceBetContentContainer()}
          <div className={styles.betButtonContainer}>{renderTradeButton()}</div>
        </>
      );
    } else if (state === BetState.resolved) {
      const finalOutcome = _.get(bet, [
        'outcomes',
        _.get(bet, 'finalOutcome'),
        'name',
      ]);
      const evidence = _.get(bet, 'evidenceActual');

      const data = (label, value, opts = {}) => (
        <div className={styles.resolutionData}>
          <h3>{label}</h3>
          <p
            className={classNames({
              [styles.smallText]: opts.smallText,
            })}
          >
            {value}
          </p>
        </div>
      );

      return (
        <div className={styles.resolvedBetLayout}>
          <div className={styles.stateBadgeContainer}>
            <StateBadge state={state} />
          </div>
          <div className={styles.summaryRowContainer}>
            {data('Bet resolved at', DateText.formatDate(endDate))}
            {data('Outcome', finalOutcome)}
            {data('Evidence', evidence, { smallText: true })}
          </div>
          <AuthedOnly>
            <div className={styles.disputeButtonContainer}>
              <ButtonSmall
                text="Dispute"
                butonTheme={ButtonSmallTheme.red}
                onClick={() =>
                  showPopup(PopupTheme.reportEvent, { small: true })
                }
              />
            </div>
          </AuthedOnly>
        </div>
      );
    }
  };

  if (!event || !bet) {
    return null;
  }

  const endDate = _.get(bet, 'endDate');

  return (
    <>
      <div
        className={classNames(
          styles.placeBetParentContainer,
          styles[state + 'Status'],
          isTradeViewPopup ? styles.isPopup : null
        )}
      >
        <div
          className={classNames(
            styles.placeBetContainer,
            isTradeViewPopup ? styles.isPopup : null
          )}
        >
          {renderLoadingAnimation()}
          <AdminOnly>
            {!isTradeViewPopup && renderMenuContainerWithCurrentBalance()}
          </AdminOnly>
          <div className={classNames(
              styles.betMarketQuestion,
              _.get(event, 'type') === EventTypes.nonStreamed &&
                styles.nonStreamedQuestion
            )}>
            <span>{bet.marketQuestion}</span>
            {bet.description && (
              <span className={styles.info}>
                <InfoBox>{bet.description}</InfoBox>
              </span>
            )}
          </div>
          {showEventEnd && state !== BetState.resolved && (
            <>
              <span className={styles.timerLabel}>Event ends in:</span>
              <div
                className={classNames(
                  styles.timeLeftCounterContainer,
                  isTradeViewPopup && styles.fixedTimer
                )}
              >
                <TimeCounter endDate={endDate} />
              </div>
            </>
          )}
          {renderStateConditionalContent()}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    actionIsInProgress: state.bet.actionIsInProgress,
    events: state.event.events,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOutcomes: (amount, betId) => {
      dispatch(BetActions.fetchOutcomes({ amount, betId }));
    },
    fetchSellOutcomes: (amount, betId) => {
      dispatch(BetActions.fetchSellOutcomes({ amount, betId }));
    },
    placeBet: (betId, amount, outcome) => {
      dispatch(BetActions.place({ betId, amount, outcome }));
    },
    pullOutBet: (betId, outcome, amount) => {
      dispatch(BetActions.pullOutBet({ betId, outcome, amount }));
    },
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
    setOpenDrawer: drawer => {
      dispatch(GeneralActions.setDrawer(drawer));
    },
    resetOutcomes: () => {
      dispatch(BetActions.setOutcomes());
      dispatch(BetActions.setSellOutcomes());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BetView);
