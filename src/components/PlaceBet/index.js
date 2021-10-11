import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import * as Api from 'api/crash-game';
import { RosiGameActions } from 'store/actions/rosi-game';
import { AlertActions } from 'store/actions/alert';
import { selectUserBet, selectHasStarted } from 'store/selectors/rosi-game';
import styles from './styles.module.scss';
import { formatToFixed } from '../../helper/FormatNumbers';
import { selectUser } from 'store/selectors/authentication';
import { PopupActions } from 'store/actions/popup';
import TokenNumberInput from 'components/TokenNumberInput';
import PopupTheme from '../Popup/PopupTheme';
import Input from '../Input';
import { round } from 'lodash/math';
import _ from 'lodash';
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

const PlaceBet = ({ connected }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userBalance = parseInt(user?.balance || 0, 10);
  const sliderMinAmount = userBalance > 50 || !user.isLoggedIn ? 50 : 0;
  // const sliderMaxAmount = Math.min(500, userBalance);
  const isGameRunning = useSelector(selectHasStarted);
  const gameStartedTimeStamp = useSelector(selectTimeStarted);
  const gameStartedTime = new Date(gameStartedTimeStamp).getTime();
  const userPlacedABet = useSelector(selectUserBet);
  const displayBetButton = useSelector(selectDisplayBetButton);
  const isBetInQueue = useSelector(betInQueue);
  const userCashedOut = useSelector(isCashedOut);
  const [amount, setAmount] = useState(sliderMinAmount);
  const [crashFactor, setCrashFactor] = useState(999);
  const [showCashoutWarning, setShowCashoutWarning] = useState(false);
  const [crashFactorDirty, setCrashFactorDirty] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [canBet, setCanBet] = useState(true);
  const userUnableToBet = amount < 1 || !canBet;

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
    // debouncedSetCommitment(number, currency);
  };
  const onCrashFactorChange = event => {
    setCrashFactorDirty(true);
    let value = _.get(event, 'target.value', 0);
    const regex = new RegExp('^0+(?!$)', 'g');
    const v = value.replaceAll(regex, '');

    const [f, s] = v.split('.');
    let result = round(v, 2);
    //check so we don't round up values such as 1.05
    //TODO: look for a better way to achieve this
    if (f && s && s === '0') {
      result = v;
    }
    event.target.value = result;
    setCrashFactor(round(v, 2));
    if (result > 0 && result < 1) {
      setShowCashoutWarning(true);
    } else {
      setShowCashoutWarning(false);
    }
    // debouncedSetCommitment(number, currency);
  };

  const onGuestAmountChange = event => {
    let value = _.get(event, 'target.value', 0);
    const amount = round(value, 0);
    setAmount(amount <= 10000 ? amount : 10000);
  };

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [showCashoutWarning]);
  useEffect(() => {
    setAnimate(false);
  }, [isGameRunning]);

  const placeABet = () => {
    if (userUnableToBet) return;
    const payload = {
      amount,
      crashFactor: Math.round(Math.abs(parseFloat(crashFactor)) * 100) / 100,
    };

    Api.createTrade(payload)
      .then(response => {
        dispatch(RosiGameActions.setUserBet(payload));
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
  };

  const placeGuestBet = () => {
    if (userUnableToBet) return;
    const payload = {
      amount,
      crashFactor: Math.round(Math.abs(parseFloat(crashFactor)) * 100) / 100,
      username: 'Guest',
      userId: 'Guest',
    };
    dispatch(RosiGameActions.setUserBet(payload));
    dispatch(RosiGameActions.addInGameBet(payload));
  };

  const cashOut = () => {
    setCanBet(false);
    dispatch(RosiGameActions.cashOut());
    Api.cashOut()
      .then(response => {
        setAnimate(true);
        AlertActions.showSuccess(JSON.stringify(response));
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
  };

  const cashOutGuest = () => {
    setCanBet(false);
    dispatch(RosiGameActions.cashOutGuest());
    setAnimate(true);
  };

  const showLoginPopup = () => {
    dispatch(
      PopupActions.show({
        popupType: PopupTheme.auth,
        options: {
          small: true,
          authenticationType: AuthenticationType.register,
        },
      })
    );
  };

  const renderButton = () => {
    if (displayBetButton) {
      return (
        <span
          role="button"
          tabIndex="0"
          className={classNames(styles.button, {
            [styles.buttonDisabled]:
              !connected || userUnableToBet || isBetInQueue,
            [styles.notConnected]: !connected,
          })}
          onClick={user.isLoggedIn ? placeABet : placeGuestBet}
          data-tracking-id={
            user.isLoggedIn ? 'elongame-place-bet' : 'elongame-play-demo'
          }
        >
          {user.isLoggedIn ? 'Place Bet' : 'Play Demo'}
        </span>
      );
    } else if ((userPlacedABet && !isGameRunning) || isBetInQueue) {
      return (
        <>
          <span
            role="button"
            tabIndex="0"
            className={classNames(styles.button, styles.buttonDisabled)}
            onClick={user.isLoggedIn ? () => {} : showLoginPopup}
            data-tracking-id={
              user.isLoggedIn ? null : 'elongame-showloginpopup'
            }
          >
            {user.isLoggedIn ? 'Bet Placed' : 'Bet Placed'}
          </span>
        </>
      );
    } else {
      return (
        <span
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
        </span>
      );
    }
  };

  const renderMessage = () => {
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
          This is a simulated version. Signin to start playing.
        </div>
      );
    }
  };

  const renderProfit = () => {
    if (userPlacedABet && isGameRunning) {
      return (
        <div className={styles.profit}>
          <Timer
            showIncome
            pause={!isGameRunning}
            startTimeMs={gameStartedTime}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.profitPlaceholder}>
          <span>+0 WFAIR</span>
        </div>
      );
    }
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
        onFire={() => dispatch(RosiGameActions.playWinSound())}
      />
      <div className={styles.inputContainer}>
        <div className={styles.placeBetContainer}>
          <h2 className={styles.placebidTitle}>Place Bet</h2>
          <InfoBox iconType={IconType.info} position={`bottomLeft`}>
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
          </InfoBox>
        </div>
        <div className={styles.sliderContainer}>
          <label className={styles.label}>Bet Amount</label>
          {user?.isLoggedIn ? (
            <TokenNumberInput
              value={amount}
              currency={user?.currency}
              setValue={onTokenNumberChange}
              minValue={1}
              decimalPlaces={0}
              maxValue={formatToFixed(
                user.balance > 10000 ? 10000 : user.balance
              )}
            />
          ) : (
            <div className={classNames(styles.cashedOutInputContainer)}>
              <Input
                className={styles.input}
                type={'number'}
                value={amount}
                onChange={onGuestAmountChange}
                step={0.01}
                min="1"
                max={'10000'}
              />
              <span className={styles.eventTokenLabel}>
                <span>WFAIR</span>
              </span>
            </div>
          )}
        </div>
      </div>
      {renderProfit()}
      {renderButton()}
      {renderMessage()}
    </div>
  );
};

export default PlaceBet;
