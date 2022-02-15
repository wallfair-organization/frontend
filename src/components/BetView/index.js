// @TODO: this component is WAY TOO BIG IMO, hard to read for new devs and the state logic is very complex,
// would be good to refactor this and break it down in smaller components
import _ from 'lodash';
import Button from '../Button';
import ChoiceSelector from '../ChoiceSelector';
import classNames from 'classnames';
import HighlightType from '../../components/Highlight/HighlightType';
import moment from 'moment';
import { useCallback } from 'react';
import styles from './styles.module.scss';
import TokenNumberInput from '../TokenNumberInput';
import { connect, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import ChoiceSelectorList from '../ChoiceSelectorList';
import LoadingAnimation from '../../data/animations/wcoin.gif';
import IconType from '../Icon/IconType';
import TextHelper from '../../helper/Text';
import BetState from '../../constants/BetState';
import { PopupActions } from '../../store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import ErrorHint from '../ErrorHint';
import { formatToFixed } from '../../helper/FormatNumbers';
import { TOKEN_NAME } from '../../constants/Token';
import ReactTooltip from 'react-tooltip';
import { selectUser } from 'store/selectors/authentication';
import { convert } from 'helper/Currency';
import DateText from 'helper/DateText';
import AdminOnly from 'components/AdminOnly';
import StateBadge from 'components/StateBadge';
import AuthedOnly from 'components/AuthedOnly';
import ButtonSmall from 'components/ButtonSmall';
import ButtonSmallTheme from 'components/ButtonSmall/ButtonSmallTheme';
import InfoBox from 'components/InfoBox';
import BetActionsMenu from 'components/BetActionsMenu';
import { trackNonstreamedEventPlaceTrade } from '../../config/gtm';
import { OnboardingActions } from 'store/actions/onboarding';
import { calculateBuyOutcome, placeBet } from 'api';
import { calculateGain } from 'helper/Calculation';
import ButtonTheme from 'components/Button/ButtonTheme';
import { EVENT_CATEGORIES } from 'constants/EventCategories';

const BetView = ({
  event,
  actionIsInProgress,
  closed,
  isPopup = false,
  showPopup,
  isTradeViewPopup,
  startOnboarding,
  fetchChartHistory,
}) => {
  // Static balance amount to simulate for non-logged users
  // Slider is also using 2800 as max value
  const BALANCE_NOT_LOGGED = 2800;
  const { currency, balance } = useSelector(selectUser);
  const defaultBetValue = 50;
  const bet = event.bet;
  const state = _.get(bet, 'status');
  const userLoggedIn = useSelector(
    state => state.authentication.authState === 'LOGGED_IN'
  );

  // LOCAL
  const [validInput, setValidInput] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [commitmentErrorText, setCommitmentErrorText] = useState('');
  const [showAllEvidence, setShowAllEvidence] = useState(false);
  const [choice, setChoice] = useState(null);
  const [commitment, setCommitment] = useState(defaultBetValue);
  const [convertedCommitment, setConvertedCommitment] = useState(
    convert(commitment, currency)
  );
  const [outcomes, setOutcomes] = useState({});

  const validateInput = () => {
    const betEndDate = _.get(bet, 'end_date');
    const current = moment(new Date());
    let valid = true;

    if (current.isAfter(betEndDate)) {
      // TODO valid = false;
    }

    if (choice === null) {
      valid = false;
    }

    if (!commitment) {
      valid = false;
    }

    if (
      userLoggedIn &&
      _.toNumber(commitment) > _.toNumber(balance)
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

  const fetchOutcomes = () => {
    calculateBuyOutcome(bet.id, commitment).then(res => {
      setOutcomes(res.reduce((map, b) => {
        map[b.index] = {
          outcome: b.outcome,
          gain: calculateGain(commitment, b.outcome),
        };
        return map;
      }, {}));
    });
  };

  useEffect(() => {
    if (!closed && !!bet?.id) {
      validateInput();
      fetchOutcomes();
      setConvertedCommitment(convert(commitment, currency));
    }
  }, [commitment, currency, bet]);

  useEffect(() => {
    validateInput();
  }, [choice]);

  useEffect(() => {
    setShowLoadingAnimation(actionIsInProgress);

    if (!actionIsInProgress) {
      setChoice(null);
    }
  }, [actionIsInProgress]);

  const onTradeButtonConfirm = () => {
    const validInput = validateInput();

    if (validInput) {
      placeBet(bet.id, commitment, choice).then((res) => {
        showPopup(PopupTheme.betApprove,
        {
          data: {
            ...res.data,
            event,
          },
          hideShare: true,
        });
        fetchChartHistory(bet.id);
      });
    }
  };

  const showJoinPopup = () => {
    startOnboarding();
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

  const renderChoiceSelector = (
    index,
    name,
    choiceSelectorTheme,
    styles,
    resolved = false,
    forceSelect = false
  ) => {
    const enabled = state === BetState.active;
    const outcome = _.get(outcomes, [index]);

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

  const renderImage = () => {
    const key = 'preview_image_url';
    const imgUrl = _.get(event, key);
    return (
      <div className={styles.imageContainer}>
        <img src={imgUrl} alt={`trade`} />
      </div>
    );
  };

  const renderTokenSelection = () => {
    return (
      <>
        <div className={styles.labelWrapper}>
          <label className={styles.label}>You trade:</label>
          <InfoBox
            position='topRight'
            autoWidth={true}
            iconType={IconType.question}
            dataTrackingId="nonstreamed-event-trade-help"
          >
            You need to have a sufficient amount of {TOKEN_NAME} tokens to
            participate in events
            {/* How to buy {TOKEN_NAME} token? */}
          </InfoBox>
        </div>
        <TokenNumberInput
          className={styles.tokenNumberInput}
          value={convertedCommitment}
          setValue={onTokenNumberChange}
          currency={currency}
          errorText={commitmentErrorText}
          maxValue={formatToFixed(
            userLoggedIn ? balance : BALANCE_NOT_LOGGED
          )}
          dataTrackingIds={{
            inputFieldHalf: 'nonstreamed-event-input-field-half',
            inputFieldDouble: 'nonstreamed-event-input-field-double',
            inputFieldAllIn: 'nonstreamed-event-input-field-allin',
          }}
        />
      </>
    );
  };

  const renderTradeDesc = (withTitle = true) => {
    const evidenceSource = bet.evidence_source;

    const shortLength = 200;
    const evidenceDescription = TextHelper.linkifyIntextURLS(
      bet.evidence_description
    );
    const plainEvidenceDescription = TextHelper.linkifyIntextURLS(
      bet.evidence_description,
      true
    );
    const desc = evidenceSource
      ? TextHelper.linkifyIntextURLS(bet.evidence_source)
      : evidenceDescription;
    const plainDesc = evidenceSource
      ? TextHelper.linkifyIntextURLS(bet.evidence_source, true)
      : plainEvidenceDescription;

    const isDescShort =
      plainDesc.length +
        (evidenceSource ? plainEvidenceDescription.length : 0) <=
      shortLength;

    return (
      <>
        {evidenceSource && withTitle && (
          <h4 className={styles.tradeDescTitle}>Evidence Source</h4>
        )}
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
            {showAllEvidence ? 'HIDE' : 'LEARN MORE'}
          </button>
        )}
      </>
    );
  };

  const renderTradeButton = () => {
    const finalOutcome = _.get(bet, 'final_outcome', false);

    if (!finalOutcome) {
      const tradeButtonDisabled =
        !(validInput && state === BetState.active) || !userLoggedIn;
      let tradeButtonTheme = null;

      const handleClick = () => {
        if (!userLoggedIn) {
          showJoinPopup();
        } else if (!tradeButtonDisabled) {
          onTradeButtonConfirm();
          fetchOutcomes();
          trackNonstreamedEventPlaceTrade({
            eventTitle: bet?.market_question,
            amount: commitment,
          });
        } else {
          _.noop();
        }
      };

      return (
        <>
          {/* {renderTradeDesc()} */}
          <span
            data-for="tool-tip"
            data-tip={
              userLoggedIn ? 'You Need To Select An Option First' : null
            }
          >
            <Button
              theme={ButtonTheme.primaryButtonXL}
              className={styles.betButton}
              onClick={handleClick}
              highlightType={HighlightType.highlightHomeCtaBet}
              highlightTheme={tradeButtonTheme}
              disabled={
                userLoggedIn && !(validInput && state === BetState.active)
              }
              disabledWithOverlay={false}
              dataTrackingId={
                userLoggedIn
                  ? 'nonstreamed-event-place-trade'
                  : 'nonstreamed-event-join-now'
              }
            >
              {userLoggedIn ? 'Place Trade' : 'Join Now And Start Trading'}
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
    return (
      <ChoiceSelectorList
        outcomes={bet.outcomes}
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
          <div className={styles.buttonContainer}>
            <div className={styles.pickOutcomeContainer}>
              <label className={styles.label}>Pick outcome</label>
              <InfoBox
                position="topRight"
                iconType={IconType.question}
                dataTrackingId="nonstreamed-event-outcome-help"
              >
                <p>How to place a bet?</p>
                <p>
                  - First select the amount (in {TOKEN_NAME}) you want to put
                  into this bet by tapping on the desired percentage of your
                  portfolio or by typing in the amount you want to trade with.
                </p>
                <p>
                  - After that pick your outcome by tapping on the outcome you
                  think will come true. The potential gains in {TOKEN_NAME} and
                  percent will automatically adjust according to your placed bet
                  amount.
                </p>
                <p>
                  - To finalize your bet click on the Place bet Button and enjoy
                  the thrill
                </p>
              </InfoBox>
            </div>
            <div className={styles.choiceContainer}>
              {renderChoiceSelectors(enabled)}
            </div>
          </div>
        </div>
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
        <BetActionsMenu event={event} bet={bet} />
      </div>
    );
  };

  const renderStateConditionalContent = () => {
    if (state === BetState.active || state === BetState.published) {
      return (
        <>
          {renderPlaceBetContentContainer()}
          <div className={styles.betButtonContainer}>{renderTradeButton()}</div>
        </>
      );
    } else if (state === BetState.resolved || state === BetState.closed) {
      const isClosed = state === BetState.closed;
      const outcomeNames = _.map(bet.outcomes, 'name') || [];
      const finalOutcome = _.get(bet, [
        'outcomes',
        _.get(bet, 'final_outcome'),
        'name',
      ]);
      const evidence = _.get(bet, 'evidence_actual');

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
            {data(
              `Bet ${isClosed ? 'closed' : 'resolved'} at`,
              DateText.formatDate(bet.end_date)
            )}
            {isClosed &&
              data(
                'Outcomes',
                <ul>
                  {outcomeNames.map(outcome => (
                    <li>{outcome}</li>
                  ))}
                </ul>
              )}
            {data(
              'Outcome',
              isClosed
                ? 'This bet is awaiting resolution, see details below'
                : finalOutcome
            )}
            {data('Evidence', renderTradeDesc(false))}
            {!isClosed && data('Final Evidence', evidence, { smallText: true })}
          </div>
          {!isClosed && (
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
          )}
        </div>
      );
    } else if (state === BetState.canceled) {
      return (
        <div className={styles.canceledErrorContainer}>
          <ErrorHint
            className={styles.canceledErrorText}
            errorText={'All participants will be refunded.'}
          />
        </div>
      );
    }
  };

  const getStickerStyle = category => {
    const cat = EVENT_CATEGORIES.find(c => c.value === category);
    if (!cat) return {};
    return {
      backgroundImage: 'url("' + cat.image + '")',
    };
  };

  if (!event || !bet) {
    return null;
  }

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
          {renderMenuContainerWithCurrentBalance()}
          
          {renderImage()}
          
          <div
            className={classNames([styles.categorySticker])}
            style={getStickerStyle(event.category)}
          />
          
          <div
            className={classNames(
              styles.betMarketQuestion,
              // styles.nonStreamedQuestion
            )}
          >
           
            <span>{bet.market_question}</span>
            {bet.description && (
              <span className={styles.info}>
                <InfoBox position={'bottomRight'}>{bet.description}</InfoBox>
              </span>
            )}
          </div>
          {renderStateConditionalContent()}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    actionIsInProgress: state.bet.actionIsInProgress,
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
    startOnboarding: () => {
      dispatch(OnboardingActions.start());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BetView);
