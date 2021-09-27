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
} from '../../store/selectors/rosi-game';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { playWinSound } from '../../helper/Audio';

const PlaceBet = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userBalance = parseInt(user?.balance || 0, 10);
  const sliderMinAmount = userBalance > 50 ? 50 : 0;
  // const sliderMaxAmount = Math.min(500, userBalance);
  const isGameRunning = useSelector(selectHasStarted);
  const userPlacedABet = useSelector(selectUserBet);
  const displayBetButton = useSelector(selectDisplayBetButton);
  const isBetInQueue = useSelector(betInQueue);
  const userCashedOut = useSelector(isCashedOut);
  const [amount, setAmount] = useState(sliderMinAmount);
  const [crashFactor, setCrashFactor] = useState(999);
  const [showCashoutWarning, setShowCashoutWarning] = useState(false);
  const [crashFactorDirty, setCrashFactorDirty] = useState(false);
  const [animate, setAnimate] = useState(false);
  const userUnableToBet = amount < 1;

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

  const cashOut = () => {
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

  const showLoginPopup = () => {
    dispatch(
      PopupActions.show({
        popupType: PopupTheme.auth,
        options: { small: true },
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
            [styles.buttonDisabled]: userUnableToBet || isBetInQueue,
          })}
          onClick={user.isLoggedIn ? placeABet : showLoginPopup}
        >
          {user.isLoggedIn ? 'Place Bet' : 'Join To Start Betting'}
        </span>
      );
    } else if ((userPlacedABet && !isGameRunning) || isBetInQueue) {
      return (
        <span
          role="button"
          tabIndex="0"
          className={classNames(styles.button, styles.buttonDisabled)}
          onClick={user.isLoggedIn ? () => {} : showLoginPopup}
        >
          {user.isLoggedIn ? 'Waiting...' : 'Join To Start Betting'}
        </span>
      );
    } else {
      return (
        <span
          role="button"
          tabIndex="0"
          className={classNames(styles.button, {
            [styles.buttonDisabled]:
              (!userPlacedABet && isGameRunning) || !isGameRunning,
          })}
          onClick={cashOut}
        >
          Cash Out
        </span>
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
        onFire={() => playWinSound()}
      />
      <div className={styles.inputContainer}>
        <div>
          <h2 className={styles.placebidTitle}>Place Bet</h2>
        </div>
        <div className={styles.sliderContainer}>
          <label className={styles.label}>Bet Amount</label>
          <TokenNumberInput
            value={amount}
            currency={user?.currency}
            setValue={onTokenNumberChange}
            minValue={1}
            decimalPlaces={0}
            maxValue={formatToFixed(
              user.balance > 10000 ? 10000 : user.balance
            )}
            disabled={!user.isLoggedIn}
          />
        </div>
      </div>
      {renderButton()}
    </div>
  );
};

export default PlaceBet;
