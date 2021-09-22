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
import Routes from 'constants/Routes';
import Input from '../Input';
import useCurrentUser from 'hooks/useCurrentUser';
import TokenSlider from 'components/TokenSlider';
import { round, ceil } from 'lodash/math';
import _ from 'lodash';

const PlaceBet = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userBalance = parseInt(user?.balance || 0, 10);
  const sliderMinAmount = userBalance > 50 ? 50 : 0;
  // const sliderMaxAmount = Math.min(500, userBalance);
  const isGameRunning = useSelector(selectHasStarted);
  const userPlacedABet = useSelector(selectUserBet);
  const [amount, setAmount] = useState(sliderMinAmount);
  const [crashFactor, setCrashFactor] = useState(1);
  const [showCashoutWarning, setShowCashoutWarning] = useState(false);
  const [crashFactorDirty, setCrashFactorDirty] = useState(false);
  const userUnableToBet =
    isGameRunning || userPlacedABet || amount < 1 || crashFactor < 1;

  const onTokenNumberChange = number => {
    console.log(number);
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

  const showLoginPopup = () => {
    dispatch(
      PopupActions.show({
        popupType: PopupTheme.auth,
        options: { small: true },
      })
    );
  };

  return (
    <div className={classNames(styles.container)}>
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
            maxValue={formatToFixed(user.balance)}
            disabled={!user.isLoggedIn}
          />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label
          className={classNames(
            styles.label,
            showCashoutWarning ? styles.warning : null
          )}
        >
          Auto Cashout at
        </label>
        <div
          className={classNames(
            styles.cashedOutInputContainer,
            showCashoutWarning ? styles.warning : null
          )}
        >
          <Input
            className={styles.input}
            type={'number'}
            value={!crashFactorDirty ? '1.00' : crashFactor}
            onChange={onCrashFactorChange}
            step={0.01}
            min="1"
            disabled={!user.isLoggedIn}
          />
          <span className={styles.eventTokenLabel}>
            <span>X</span>
          </span>
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
      </div>
      <span
        role="button"
        tabIndex="0"
        className={classNames(styles.button, {
          [styles.buttonDisabled]: userUnableToBet,
        })}
        onClick={user.isLoggedIn ? placeABet : showLoginPopup}
      >
        {user.isLoggedIn ? 'Place Bet' : 'Join To Start Betting'}
      </span>
    </div>
  );
};

export default PlaceBet;
