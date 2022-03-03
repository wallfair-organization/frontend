import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { RosiGameActions } from 'store/actions/rosi-game';
import {
  selectUserBet,
  selectHasStarted,
  selectGameOffline,
} from 'store/selectors/rosi-game';
import styles from './styles.module.scss';
import { formatToFixed } from '../../helper/FormatNumbers';
import { selectUser } from 'store/selectors/authentication';
import { PopupActions } from 'store/actions/popup';
import TokenNumberInput from 'components/TokenNumberInput';
import PopupTheme from '../Popup/PopupTheme';
import Input from '../Input';
import { round } from 'lodash/math';
import _ from 'lodash';
import { OnboardingActions } from 'store/actions/onboarding';
import {
  betInQueue,
  isCashedOut,
  selectDisplayBetButton,
  selectTimeStarted,
} from '../../store/selectors/rosi-game';
import ReactCanvasConfetti from 'react-canvas-confetti';
import InfoBox from 'components/InfoBox';
import IconType from '../Icon/IconType';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import Timer from '../RosiGameAnimation/Timer';
import { calcCrashFactorFromElapsedTime } from '../RosiGameAnimation/canvas/utils';
import {
  trackElonChangeAutoCashout,
  trackElonPlaceBetGuest,
  trackElonStartAutobet,
  trackElonStopAutobet,
  trackPumpDumpChangeAutoCashout,
  trackPumpDumpPlaceBetGuest,
  trackPumpDumpStartAutobet,
  trackPumpDumpStopAutobet,
} from '../../config/gtm';
import { useHistory, useParams } from 'react-router';
import { GAMES } from 'constants/Games';
import { GAMES_CURRENCY_DEFAULT_BET } from '../../constants/Currency';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import Routes from 'constants/Routes';
import { currencyDisplay } from 'helper/Currency';

const PlaceBet = ({ connected, onBet, onCashout, onCancel }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(selectUser);
  const userBalance = parseInt(user?.balance || 0, 10);
  const gamesCurrency = user.gamesCurrency;
  const sliderMinAmount = GAMES_CURRENCY_DEFAULT_BET;
  // const sliderMaxAmount = Math.min(500, userBalance);
  const isGameRunning = useSelector(selectHasStarted);
  const gameStartedTimeStamp = useSelector(selectTimeStarted);
  const gameStartedTime = new Date(gameStartedTimeStamp).getTime();
  const userPlacedABet = useSelector(selectUserBet);
  const displayBetButton = useSelector(selectDisplayBetButton);
  const isBetInQueue = useSelector(betInQueue);
  const userCashedOut = useSelector(isCashedOut);
  const [amount, setAmount] = useState(sliderMinAmount);
  const [crashFactor, setCrashFactor] = useState('25.00');
  const [showCashoutWarning, setShowCashoutWarning] = useState(false);
  const [crashFactorDirty, setCrashFactorDirty] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [canBet, setCanBet] = useState(true);
  const gameOffline = useSelector(selectGameOffline);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);
  const [wincrease, setWincrease] = useState(0);
  const [lincrease, setLincrease] = useState(0);
  const [lossbutton, setLossbutton] = useState(false);
  const [winbutton, setWinbutton] = useState(false);
  const [autobet, setAutobet] = useState(null);
  const [betted, setBetted] = useState(false);
  const { slug } = useParams();

  const userUnableToBet = amount < 1 || !canBet || gameOffline;
  const numberOfDemoPlays =
    Number(localStorage.getItem('numberOfElonGameDemoPlays')) || 0;

  useEffect(() => {
    const handler = setTimeout(() => {
      setCanBet(true);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [canBet]);

  const onTokenNumberChange = number => {
    setAmount(number);
  };

  const processAutoCashoutValue = value => {
    const regex = new RegExp('^[0w]+(?!$)', 'g');
    let v = value.replaceAll(regex, '');
    v = v.replaceAll(',', '.');
    v = v.replaceAll(/[^0-9.]+/g, '');
    return v;
  };

  const onCrashFactorChange = event => {
    setCrashFactorDirty(true);
    let value = _.get(event, 'target.value', 0);
    const v = processAutoCashoutValue(value);
    event.target.value = v;

    setCrashFactor(v);
    let result = parseFloat(v);
    if (result > 0 && result < 1) {
      setShowCashoutWarning(true);
    } else {
      setShowCashoutWarning(false);
    }
  };

  const onCrashFactorLostFocus = event => {
    let value = _.get(event, 'target.value', 0);
    const v = processAutoCashoutValue(value);
    let result = parseFloat(v);

    if (slug === GAMES['elonGame'].slug) {
      trackElonChangeAutoCashout({ multiplier: result });
    } else if (slug === GAMES['pumpDump'].slug) {
      trackPumpDumpChangeAutoCashout({ multiplier: result });
    }
  };

  const onGuestAmountChange = event => {
    let value = _.get(event, 'target.value', 0);
    const amount = round(value, 0);
    setAmount(amount <= 10000 ? amount : 10000);
  };

  const onBetAmountChanged = multiplier => {
    const changedValue = _.floor(amount * multiplier, 0);
    if (changedValue > 10000) {
      setAmount(10000);
    } else if (changedValue < 0) {
      setAmount(0);
    } else {
      setAmount(changedValue);
    }
  };

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [showCashoutWarning]);

  useEffect(() => {
    setAnimate(false);
    if (isGameRunning) setBetted(false);
  }, [isGameRunning]);

  useEffect(() => {
    const intervalTime = 4;
    let intervalId;
    const tick = () => {
      let now = Date.now();
      const diff = now - gameStartedTime;
      const autoCashoutAt = parseFloat(crashFactor);
      const factor = calcCrashFactorFromElapsedTime(diff < 1 ? 1 : diff);
      if (factor >= autoCashoutAt) {
        if (user.isLoggedIn) {
          cashOut();
        } else {
          cashOutGuest();
        }
        clearInterval(intervalId);
      }
    };
    //multiple
    if (!userPlacedABet || !isGameRunning || userCashedOut) return;
    if (userPlacedABet && isGameRunning) {
      intervalId = setInterval(tick, intervalTime);
      return () => clearInterval(intervalId);
    }
  }, [isGameRunning, crashFactor, userCashedOut]);

  useEffect(() => {
    if (!isGameRunning && autobet && !betted) {
      const newautobet = {
        ...autobet,
        amount: parseInt(
          autobet.amount *
            (autobet.win ? 1 + autobet.wincrease : 1 + autobet.lincrease)
        ),
      };

      if (
        newautobet.profit > newautobet.accumulated &&
        newautobet.loss > -newautobet.accumulated
      ) {
        console.log('1');
        setBetted(true);
        setAutobet({
          ...newautobet,
          accumulated: autobet.accumulated - newautobet.amount,
        });
        onBet(newautobet, newautobet.crashFactor);
      } else {
        console.log('2');
        setAutobet(null);
      }
    }
  }, [isGameRunning, betted, autobet]);
  const stopAutobet = () => {
    const payload = {
      amount,
      autobet: 1,
      profit: Number(profit),
      loss: Number(loss),
      wincrease: winbutton ? 0 : Number(wincrease) / 100,
      lincrease: lossbutton ? 0 : Number(lincrease) / 100,
      multiplier: crashFactor,
      accumulated: autobet.accumulated,
      gamesCurrency
    };

    if (slug === GAMES['elonGame'].slug) {
      trackElonStopAutobet({ ...payload });
    } else if (slug === GAMES['pumpDump'].slug) {
      trackPumpDumpStopAutobet({ ...payload });
    }

    setAutobet(null);
  };

  const placeABet = e => {
    e.preventDefault();
    e.stopPropagation();
    if (userUnableToBet) return;
    if (amount > userBalance) return;

    const payload = {
      amount,
      crashFactor: 999,
      gamesCurrency
    };
    const result = onBet(payload, crashFactor);
  };
  const placeAutoBet = async () => {
    if (userUnableToBet) return;
    if (amount > userBalance) return;
    const payload = {
      amount,
      accumulated: -amount,
      autobet: true,
      profit: Number(profit),
      loss: Number(loss),
      wincrease: winbutton ? 0 : Number(wincrease) / 100,
      lincrease: lossbutton ? 0 : Number(lincrease) / 100,
      crashFactor: 999,
      gamesCurrency
    };

    if (slug === GAMES['elonGame'].slug) {
      trackElonStartAutobet({
        ...payload,
        autobet: 1,
        multiplier: crashFactor,
      });
    } else if (slug === GAMES['pumpDump'].slug) {
      trackPumpDumpStartAutobet({
        ...payload,
        autobet: 1,
        multiplier: crashFactor,
      });
    }

    setAutobet(payload);
    setBetted(true);
    await onBet(payload, payload.crashFactor);
  };

  const cancelBet = async e => {
    e.preventDefault();
    e.stopPropagation();
    setCanBet(false);
    const result = await onCancel(user.userId, amount);
  };

  const placeGuestBet = () => {
    if (numberOfDemoPlays === 3) {
      showLoginPopup();
      return;
    }
    if (userUnableToBet) return;
    onBet();
    const payload = {
      amount,
      crashFactor: Math.round(Math.abs(parseFloat(crashFactor)) * 100) / 100,
      username: 'Guest',
      userId: 'Guest',
    };

    if (slug === GAMES['elonGame'].slug) {
      trackElonPlaceBetGuest({
        amount: payload.amount,
        multiplier: payload.crashFactor,
      });
    } else if (slug === GAMES['pumpDump'].slug) {
      trackPumpDumpPlaceBetGuest({
        amount: payload.amount,
        multiplier: payload.crashFactor,
      });
    }

    dispatch(RosiGameActions.setUserBet(payload));
    dispatch(RosiGameActions.addInGameBet(payload));

    if (numberOfDemoPlays < 3) {
      localStorage.setItem('numberOfElonGameDemoPlays', numberOfDemoPlays + 1);
    }
  };

  const cashOut = async () => {
    setCanBet(false);
    dispatch(RosiGameActions.cashOut());
    const response = await onCashout(false, autobet);
    autobet &&
      setAutobet({
        ...autobet,
        accumulated: autobet.accumulated + response.data.reward,
        win: true,
      });
    setAnimate(true);
  };

  const cashOutGuest = () => {
    onCashout(true);
    setCanBet(false);
    dispatch(RosiGameActions.cashOutGuest());
    setAnimate(true);
  };

  const cancelGuestBet = () => {
    setCanBet(false);
    dispatch(RosiGameActions.clearGuestData());
  };

  const showLoginPopup = () => {
    dispatch(OnboardingActions.start());
    // dispatch(
    //   PopupActions.show({
    //     popupType: PopupTheme.auth,
    //     options: {
    //       small: false,
    //       authenticationType: AuthenticationType.register,
    //     },
    //   })
    // );
    // dispatch(
    //   PopupActions.show({
    //     popupType: PopupTheme.auth,
    //     options: {
    //       small: false,
    //       authenticationType: AuthenticationType.register,
    //     },
    //   })
    // );
  };

  const renderButton = () => {
    if (autobet) {
      return (
        <>
          <Button
            role="button"
            tabIndex="0"
            className={styles.button}
            theme={ButtonTheme.redButton}
            onClick={stopAutobet}
          >
            Stop Autobet
          </Button>
        </>
      );
    } else if (displayBetButton) {
      let buttonEnable = false;

      if (
        !connected ||
        userUnableToBet ||
        isBetInQueue ||
        (amount > userBalance && user.isLoggedIn)
      ) buttonEnable = true;
      if(amount === 0) buttonEnable = false;


        //  else{
        return (
          <Button
            role="button"
            tabIndex="0"
            className={classNames(styles.button)}
            disabled={buttonEnable}
            onClick={
              user.isLoggedIn && amount > 0
                ? selector === 'manual'
                  ? placeABet
                  : placeAutoBet
                : placeGuestBet
            }
            data-tracking-id={
              user.isLoggedIn ? 'elongame-place-bet' : 'elongame-play-demo'
            }
          >
            {user.isLoggedIn && amount > 0
              ? selector === 'manual'
                ? 'Place Bet (Next Round)'
                : 'Start Auto Bet'
              : 'Play Demo'}
          </Button>
        );
      //  }
    } else if ((userPlacedABet && !isGameRunning) || isBetInQueue) {
      return (
        <>
          <Button
            role="button"
            tabIndex="0"
            className={styles.button}
            theme={ButtonTheme.redButton}
            onClick={user.isLoggedIn ? cancelBet : cancelGuestBet}
            data-tracking-id={
              user.isLoggedIn ? null : 'elongame-showloginpopup'
            }
          >
            {user.isLoggedIn ? 'Cancel Bet' : 'Cancel Bet'}
          </Button>
        </>
      );
    } else {
      return (
        <Button
          role="button"
          tabIndex="0"
          className={classNames(styles.button, {
            [styles.buttonDisabled]:
              !connected ||
              (!userPlacedABet && isGameRunning) ||
              !isGameRunning,
            [styles.notConnected]: !connected,
          })}
          onClick={user.isLoggedIn ? cashOut : cashOutGuest}
          data-tracking-id={
            user.isLoggedIn ? 'elongame-cashout' : 'elongame-cashout-guest'
          }
        >
          {user.isLoggedIn ? 'Cash Out' : 'Cash Out'}
        </Button>
      );
    }
  };

  const renderBuyWFAIRMessage = () => {
    return (
      <div className={styles.buyTokenInfo}>
        <p
          className={classNames([
            user.isLoggedIn && amount > userBalance ? styles.visible : null,
          ])}
        >
          Insufficient balance to place this bet.{' '}
          <span onClick={() => history.push(Routes.wallet)}>Add funds</span>
        </p>
      </div>
    );
  };

  const renderMessage = () => {
    if (gameOffline) {
      return (
        <div
          className={classNames([
            styles.betInfo,
            !user.isLoggedIn ? styles.guestInfo : [],
          ])}
        >
          Waiting for connection...
        </div>
      );
    }
    if ((userPlacedABet && !isGameRunning) || isBetInQueue) {
      return (
        <div
          className={classNames([
            styles.betInfo,
            !user.isLoggedIn ? styles.guestInfo : [],
          ])}
        >
          Waiting for the next round to start
        </div>
      );
    }
    if (!user.isLoggedIn) {
      return (
        <div className={classNames([styles.betInfo, styles.guestInfo])}>
          This is a simulated version. Sign in to start playing.
        </div>
      );
    }
  };

  const renderProfit = () => {
    if (userPlacedABet && isGameRunning) {
      return (
        <div className={styles.profit} style={{ bottom: 0 }} data-wg-notranslate>
          <Timer
            showIncome
            pause={!isGameRunning}
            startTimeMs={gameStartedTime}
            currency={gamesCurrency}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.profitPlaceholder} data-wg-notranslate>
          <span>+0 {currencyDisplay(gamesCurrency)}</span>
        </div>
      );
    }
  };

  const [selector, setSelector] = useState('manual');

  const switchButton = () => {
    return (
      <div className={styles.selector}>
        <span
          className={styles.top}
          style={{ left: selector === 'manual' ? 2 : '49.4%' }}
        ></span>
        <div
          className={classNames(styles.tab)}
          onClick={() => {
            setSelector('manual');
            setAutobet(null);
          }}
        >
          <span
            className={
              selector === 'manual' ? styles.selected : styles.deselected
            }
          >
            Manual Bet
          </span>
        </div>
        <div
          className={classNames(styles.tab)}
          onClick={() => setSelector('auto')}
        >
          <span
            className={
              selector !== 'manual' ? styles.selected : styles.deselected
            }
          >
            Auto Bet
          </span>
        </div>
      </div>
    );
  };

  const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 999,
  };

  return (
    <div className={classNames(styles.container)}>
      <ReactCanvasConfetti
        style={canvasStyles}
        fire={animate}
        particleCount={300}
        spread={360}
        origin={{ x: 0.4, y: 0.45 }}
      />
      <div className={styles.inputContainer}>
        <div className={styles.placeBetContainer}>
          {switchButton(styles)}
          {/* <InfoBox iconType={IconType.info} position={`bottomLeft`}>
            <p>
              <strong>How to place a bet at Elon Game?</strong>
            </p>
            <p>&nbsp;</p>
            <p>
              At the top of the betting box, you see „Bet Amount“ that you can
              change as you wish.
            </p>
            <p>
              After you click the yellow button „Place Bet“ you will join the
              game.
            </p>
            <p>
              After you join the game you need to click the „Cash out“ button
              before the coin explodes.
            </p>
            <p>
              Please note that when you place a bet in a running game, your bet
              will wait for the next game start.
            </p>
            <p>
              You can place a bet for the next game or you can do this when the
              round is preparing.
            </p>
            <p>
              At the top of the page, you can see green numbers which show the
              previous crash numbers.
            </p>
          </InfoBox> */}
        </div>
        {selector === 'manual' ? (
          <div className={styles.sliderContainer}>
            <label className={styles.label}>Bet Amount</label>
            {user?.isLoggedIn ? (
              // LOGGED IN + MANUAL SELECTOR
              <TokenNumberInput
                value={amount}
                currency={gamesCurrency}
                setValue={onTokenNumberChange}
                minValue={0}
                decimalPlaces={0}
                maxValue={10000}
                dataTrackingIds={{
                  inputFieldHalf: 'elongame-input-field-half',
                  inputFieldDouble: 'elongame-event-input-field-double',
                  inputFieldAllIn: 'elongame-event-input-field-allin',
                }}
              />
            ) : (
              // NOT LOGGED + MANUAL SELECTOR
              <div
                className={classNames(
                  styles.cashedOutInputContainer,
                  styles.demoInput
                )}
              >
                <Input
                  className={classNames(styles.input)}
                  type={'number'}
                  value={amount}
                  onChange={onGuestAmountChange}
                  step={0.01}
                  min="1"
                  max={'10000'}
                />
                <span className={styles.eventTokenLabel}>
                  <span>{currencyDisplay(gamesCurrency)}</span>
                </span>
                <div className={styles.buttonWrapper}>
                  <span
                    className={styles.buttonItem}
                    onClick={() => onBetAmountChanged(0.5)}
                  >
                    ½
                  </span>
                  <span
                    className={styles.buttonItem}
                    onClick={() => onBetAmountChanged(2)}
                  >
                    2x
                  </span>
                  <span
                    className={styles.buttonItem}
                    onClick={() => setAmount(10000)}
                  >
                    Max
                  </span>
                </div>
              </div>
            )}
            <div className={styles.inputContainer}>
              <label
                className={classNames(
                  styles.label,
                  showCashoutWarning ? styles.warning : null
                )}
              >
                Attempt Auto Cashout at
              </label>
              <div
                className={classNames(
                  styles.cashedOutInputContainer,
                  showCashoutWarning ? styles.warning : null
                )}
              >
                <Input
                  className={styles.input}
                  type={'text'}
                  value={crashFactor}
                  onChange={onCrashFactorChange}
                  onBlur={onCrashFactorLostFocus}
                  min="1"
                  pattern={/^[^0-9.]+/}
                />
                <span className={styles.eventTokenLabel}>
                  <span>×</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.sliderContainer}>
            <label className={styles.label}>Bet Amount</label>
            {user?.isLoggedIn ? (
              // LOGGED IN + AUTOPLAY SELECTOR
              <TokenNumberInput
                value={amount}
                currency={gamesCurrency}
                setValue={onTokenNumberChange}
                minValue={0}
                decimalPlaces={0}
                maxValue={10000}
                dataTrackingIds={{
                  inputFieldHalf: 'elongame-input-field-half',
                  inputFieldDouble: 'elongame-event-input-field-double',
                  inputFieldAllIn: 'elongame-event-input-field-allin',
                }}
              />
            ) : (
              // NOT LOGGED + AUTOPLAY SELECTOR
              <div
                className={classNames(
                  styles.cashedOutInputContainer,
                  styles.demoInput
                )}
              >
                <Input
                  className={classNames(styles.input)}
                  type={'number'}
                  value={amount}
                  onChange={onGuestAmountChange}
                  step={0.01}
                  min="1"
                  max={'10000'}
                />
                <span className={styles.eventTokenLabel}>
                  <span>{currencyDisplay(gamesCurrency)}</span>
                </span>
                <div className={styles.buttonWrapper}>
                  <span
                    className={styles.buttonItem}
                    onClick={() => onBetAmountChanged(0.5)}
                  >
                    ½
                  </span>
                  <span
                    className={styles.buttonItem}
                    onClick={() => onBetAmountChanged(2)}
                  >
                    2x
                  </span>
                  <span
                    className={styles.buttonItem}
                    onClick={() => setAmount(10000)}
                  >
                    Max
                  </span>
                </div>
              </div>
            )}
            <div className={styles.inputContainer}>
              <label
                className={classNames(
                  styles.label,
                  showCashoutWarning ? styles.warning : null
                )}
              >
                Attempt Auto Cashout at
              </label>
              <div
                className={classNames(
                  styles.cashedOutInputContainer,
                  showCashoutWarning ? styles.warning : null
                )}
              >
                <Input
                  className={styles.input}
                  type={'text'}
                  value={crashFactor}
                  onChange={onCrashFactorChange}
                  onBlur={onCrashFactorLostFocus}
                  min="1"
                  pattern={/^[^0-9.]+/}
                />
                <span className={styles.eventTokenLabel}>
                  <span>×</span>
                </span>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label className={classNames(styles.label)}>Stop on Profit</label>
              <div
                className={classNames(
                  styles.cashedOutInputContainer,
                  styles.demoInput
                )}
              >
                <Input
                  className={classNames(styles.input)}
                  type={'number'}
                  value={profit}
                  onChange={e => setProfit(e.target.value)}
                  step={1}
                  min="1"
                  max={'100'}
                />
                <span className={styles.eventTokenLabel}>
                  <span>{currencyDisplay(gamesCurrency)}</span>
                </span>
              </div>
            </div>
            <label className={classNames(styles.label)}>Stop on Loss</label>
            <div
              className={classNames(
                styles.cashedOutInputContainer,
                styles.demoInput
              )}
            >
              <Input
                className={classNames(styles.input)}
                type={'number'}
                value={loss}
                onChange={e => setLoss(e.target.value)}
                step={1}
                min="1"
                max={'100'}
              />
              <span className={styles.eventTokenLabel}>
                <span>{currencyDisplay(gamesCurrency)}</span>
              </span>
            </div>
            <label className={classNames(styles.label)}>On Win</label>
            <div
              className={classNames(
                styles.cashedOutInputContainer,
                styles.demoInput
              )}
            >
              <div className={styles.toggleButton}>
                <span
                  className={styles.toggleLabel}
                  style={{
                    marginLeft: winbutton ? 1 : '44.2%',
                    width: !winbutton && '55%',
                  }}
                ></span>
                <span
                  className={classNames(
                    styles.buttonItem,
                    winbutton && styles.selected
                  )}
                  onClick={() => setWinbutton(true)}
                >
                  Reset
                </span>
                <span
                  className={classNames(
                    styles.buttonItem,
                    !winbutton && styles.selected
                  )}
                  onClick={() => setWinbutton(false)}
                >
                  Increase
                </span>
              </div>
              <Input
                className={classNames(styles.input)}
                type={'number'}
                value={wincrease}
                onChange={e => setWincrease(e.target.value)}
                step={1}
                min="0"
                max={'100'}
              />
              <span className={styles.eventTokenLabel}>
                <span>%</span>
              </span>
            </div>
            <label className={classNames(styles.label)}>On Loss</label>
            <div
              className={classNames(
                styles.cashedOutInputContainer,
                styles.demoInput
              )}
            >
              <div className={styles.toggleButton}>
                <span
                  className={styles.toggleLabel}
                  style={{
                    marginLeft: lossbutton ? 1 : '44.2%',
                    width: !lossbutton && '55%',
                  }}
                ></span>
                <span
                  className={classNames(
                    styles.buttonItem,
                    lossbutton && styles.selected
                  )}
                  onClick={() => setLossbutton(true)}
                >
                  Reset
                </span>
                <span
                  className={classNames(
                    styles.buttonItem,
                    !lossbutton && styles.selected
                  )}
                  onClick={() => setLossbutton(false)}
                >
                  Increase
                </span>
              </div>
              <Input
                className={classNames(styles.input)}
                type={'number'}
                value={lincrease}
                onChange={e => setLincrease(e.target.value)}
                step={1}
                min="0"
                max={'100'}
              />
              <span className={styles.eventTokenLabel}>
                <span>%</span>
              </span>
            </div>
          </div>
        )}
      </div>
      {showCashoutWarning ? (
        <div className={styles.error}>
          <span>Betting less than 1 is not recommended. </span>
          <span
            data-for="rt"
            className={styles.why}
            data-tip="The multiplying factor defines your final reward.<br/>
             A multiplier of 2x means twice the reward, when the game ends.<br/>
              If the game ends before your multiplier,<br/> your amount invested is lost.<br/>"
          >
            Understand why.
          </span>
        </div>
      ) : null}
      <ReactTooltip
        id={'rt'}
        place="top"
        effect="solid"
        offset={{ bottom: 10 }}
        multiline
        className={styles.tooltip}
      />
      {autobet && (
        <>
          <div className={styles.spinsleft} style={{ marginTop: 18 }}>
            <span
              className={autobet.accumulated > 0 ? styles.reward : styles.lost}
              data-wg-notranslate
            >
              {Math.floor(autobet.accumulated)} {currencyDisplay(gamesCurrency)}
            </span>
            accumulated
          </div>
          <div className={styles.spinsleft}>
            Current bet:
            <span className={styles.neutral} data-wg-notranslate>
              {Math.floor(autobet.amount)} {currencyDisplay(gamesCurrency)}
            </span>
          </div>
        </>
      )}
      {renderProfit()}
      {renderButton()}
      {renderBuyWFAIRMessage()}
      {renderMessage()}
    </div>
  );
};

export default memo(PlaceBet);
