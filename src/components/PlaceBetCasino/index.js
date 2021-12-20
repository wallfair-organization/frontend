import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { AlertActions } from 'store/actions/alert';
import {
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
import { RiskInput, NgamesInput, StandardInput, ToggleInput } from './components';
import ReactCanvasConfetti from 'react-canvas-confetti';
import InfoBox from 'components/InfoBox';
import IconType from '../Icon/IconType';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import Timer from '../RosiGameAnimation/Timer';
import { TOKEN_NAME } from 'constants/Token';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import Routes from 'constants/Routes';
import { useHistory } from 'react-router';

const PlaceBetCasino = ({
  gameName,
  connected,
  onBet,
  setBet,
  bet,
  setAmount,
  amount,
  setRisk,
  risk,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const userBalance = parseInt(user?.balance || 0, 10);

  const [ngame, setNgame] = useState(1);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [flag, setFlag] = useState(false);
  const [wincrease, setWincrease] = useState(0)
  const [lincrease, setLincrease] = useState(0)
  const [lossbutton, setLossbutton] = useState(false)
  const [winbutton, setWinbutton] = useState(false)
  const [spinlimit, setSpinlimit] = useState(false)
  const [accumulated, setAccumulated] = useState(0)
  const [selector, setSelector] = useState('manual')
  const userUnableToBet = amount < 1;

  const numberOfDemoPlays = Number(localStorage.getItem('numberOfElonGameDemoPlays')) || 0;

  const onGuestAmountChange = event => {
    let value = _.get(event, 'target.value', 0);
    const amount = round(value, 0);
    setAmount(amount <= 10000 ? amount : 10000);
  };

  const onBetAmountChanged = multiplier => {
    const changedValue = _.floor(amount * multiplier, 0);
    if (changedValue > 10000) {
      setAmount(10000);
    } else {
      setAmount(changedValue);
    }
  };

  const placeABet = async () => {
    if(flag) return
    setFlag(true)
    setTimeout(() => {
      setFlag(false)
    }, 250)
    if (userUnableToBet) return;
    if (amount > userBalance) return;
    const payload = {
      amount,
      ngame: ngame - 1,
      riskFactor: risk
    }
    const bet = await onBet(payload)
  }

  const placeAutoBet = async () => {
    if (userUnableToBet) return;
    if (amount > userBalance) return;
    const payload = {
      amount,
      autobet: true,
      profitStop: Number(profit),
      lossStop: Number(loss),
      wincrease: winbutton?0:Number(wincrease)/100,
      lincrease: lossbutton?0:Number(lincrease)/100,
      ngame: null,
      riskFactor: risk,
      accumulated
    };
    setAccumulated(0)
    const bet = await onBet(payload)
  };


  const placeGuestBet = () => {
    if (numberOfDemoPlays === 3) {
      showLoginPopup();
      return;
    }

    if (userUnableToBet) return;
    const payload = {
      amount,
      demo: true,
      ngame: ngame-1,
      riskFactor: risk,
      winIndex:  Math.floor((Math.random() * 12) | 0)
    };
    onBet(payload)
    if (numberOfDemoPlays < 3) {
      localStorage.setItem('numberOfElonGameDemoPlays', numberOfDemoPlays + 1);
    }
  };
  useEffect(() => {
    if(bet.ready && bet.ngame > 0) { //Multiple Games/Spins
      onBet({...bet, ngame: bet.ngame - 1});
    }else if(bet?.ready && bet.autobet){ // Autobet
      const acc = bet.profit + accumulated
      setAccumulated(acc)
      if(bet.profitStop >= 0 && bet.profitStop > acc && bet.lossStop >= 0 && bet.lossStop > -acc){
        const newamount = bet.profitStop > 0 ? Math.floor(winbutton ? amount : bet.amount*(1+bet.wincrease)) : Math.floor(lossbutton ? amount : bet.amount*(1+bet.lincrease))
        if(newamount < 1) setBet({autobet: false, ngame: 0, ready: true})
        else onBet({...bet, amount: newamount, ngame: bet.ngame ? bet.ngame -1 : bet.ngame})
      }
      else {
        setBet({autobet: false, ngame: 0, ready: true})
      }
    }
  }, [bet])
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
    if (!bet.autobet) {

      let buttonEnable = false;

      if (
        !connected ||
        userUnableToBet ||
        (amount > userBalance && user.isLoggedIn)
      ) buttonEnable = true;
      if(amount === 0) buttonEnable = false;

      return (
        <Button
          role="button"
          tabIndex="0"
          className={classNames(styles.button)}
          disabled={buttonEnable}
          onClick={!bet?.ready? null : (user.isLoggedIn && amount > 0) ? (selector === 'manual' ? placeABet : placeAutoBet) : placeGuestBet }
          data-tracking-id={
            user.isLoggedIn ? 'alpacawheel-place-bet' : 'alpacawheel-play-demo'
          }
        >
          {user.isLoggedIn && amount > 0
              ? selector === 'manual'
                ? 'Place Bet'
                : 'Start Auto Bet'
              : 'Play Demo'}
        </Button>
      );
    } else {
      return (
        <>
          <Button
            role="button"
            tabIndex="0"
            className={styles.button}
            theme={ButtonTheme.secondaryButton}
            onClick={() => bet.autobet ? setBet({...bet, autobet: false, ready: gameName === 'plinko' ? true: false}) : setBet({...bet, ngame: 0})}
            data-tracking-id={
              user.isLoggedIn ? null : 'alpacawheel-showloginpopup'
            }
          >
            {bet.autobet ? 'Stop Autobet' :  'Cancel Bet'}
          </Button>
        </>
      )
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
    if (!user.isLoggedIn) {
      return (
        <div className={classNames([styles.betInfo, styles.guestInfo])}>
          This is a simulated version. Sign in to start playing.
        </div>
      );
    }
  };

  const switchButton = () => {
    return (
      <div className={styles.selector}>
        <span className={styles.top} style={{ left: selector === 'manual' ? 2 : '49.4%' }}></span>
        <div className={classNames(styles.tab, selector === 'manual' ? styles.selected:styles.deselected)} onClick={() => setSelector('manual')} >
          <span>Manual Bet</span>
        </div>
        <div className={classNames(styles.tab, selector === 'auto' ? styles.selected:styles.deselected)} onClick={() => setSelector('auto')} >
          <span>Auto Bet</span>
        </div>
      </div>
    )
  }

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
        </div>
        {selector === 'manual' ?
          <div className={styles.sliderContainer}>
            <label className={styles.label}>Bet Amount</label>
            {user?.isLoggedIn ? (
              <TokenNumberInput
                value={amount}
                currency={user?.currency}
                setValue={(v)=>setAmount(v)}
                minValue={0}
                decimalPlaces={0}
                maxValue={10000}
                dataTrackingIds={{
                  inputFieldHalf: 'alpacawheel-input-field-half',
                  inputFieldDouble: 'alpacawheel-input-field-double',
                  inputFieldAllIn: 'alpacawheel-input-field-allin',
                }}
              />
            ) : (
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
                  <span>{TOKEN_NAME}</span>
                </span>
                <div className={styles.buttonWrapper}>
                  <span
                    className={styles.buttonItem}
                    data-tracking-id="alpacawheel-input-field-half"
                    onClick={() => onBetAmountChanged(0.5)}
                  >
                    ½
                  </span>
                  <span
                    className={styles.buttonItem}
                    data-tracking-id="alpacawheel-input-field-double"
                    onClick={() => onBetAmountChanged(2)}
                  >
                    2x
                  </span>
                  <span
                    className={styles.buttonItem}
                    data-tracking-id="alpacawheel-input-field-allin"
                    onClick={() => setAmount(10000)}
                  >
                    Max
                  </span>
                </div>
              </div>
            )}
            {gameName !== 'cannon' && <RiskInput disable={!bet.ready || bet?.ball > 0} number={gameName==='plinko'?3:7} risk={risk} setRisk={setRisk} />}
            {gameName==='wheel' && <NgamesInput text={'Number of Spins'} ngame={ngame} setNgame={setNgame} game={bet} />}
          </div>
          :
          <div className={styles.sliderContainer}>
            <label className={styles.label}>Bet Amount</label>
            {user?.isLoggedIn ? (
              <TokenNumberInput
                value={amount}
                currency={user?.currency}
                setValue={(v)=>setAmount(v)}
                minValue={1}
                decimalPlaces={0}
                maxValue={formatToFixed(
                  user.balance > 10000 ? 10000 : user.balance
                )}
                dataTrackingIds={{
                  inputFieldHalf: 'alpacawheel-input-field-half',
                  inputFieldDouble: 'alpacawheel-input-field-double',
                  inputFieldAllIn: 'alpacawheel-input-field-allin',
                }}
              />
            ) : (
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
                  <span>{TOKEN_NAME}</span>
                </span>
                <div className={styles.buttonWrapper}>
                  <span
                    className={styles.buttonItem}
                    data-tracking-id="alpacawheel-input-field-half"
                    onClick={() => onBetAmountChanged(0.5)}
                  >
                    ½
                  </span>
                  <span
                    className={styles.buttonItem}
                    data-tracking-id="alpacawheel-input-field-double"
                    onClick={() => onBetAmountChanged(2)}
                  >
                    2x
                  </span>
                  <span
                    className={styles.buttonItem}
                    data-tracking-id="alpacawheel-input-field-allin"
                    onClick={() => setAmount(10000)}
                  >
                    Max
                  </span>
                </div>
              </div>
            )}
            {gameName !== 'cannon' && <RiskInput disable={!bet.ready || bet.autobet || bet?.ball > 0} number={gameName==='plinko'?3:7} risk={risk} setRisk={setRisk} />}
            <StandardInput title={'Stop on Profit'} setValue={setProfit} value={profit} />
            <StandardInput title={'Stop on Loss'} setValue={setLoss} value={loss} />
            <ToggleInput title={'On Win'} setValue={setWincrease} value={wincrease} setToggle={setWinbutton} toggle={winbutton} />
            <ToggleInput title={'On Loss'} setValue={setLincrease} value={lincrease} setToggle={setLossbutton} toggle={lossbutton} />
            {bet.autobet &&
              <div className={styles.spinsleft}>
                <span className={accumulated > 0 ? styles.reward : styles.lost}>
                {Math.floor(accumulated)} {TOKEN_NAME}
                </span>
                accumulated
              </div>
            }
            {bet.autobet && bet.amount &&
              <div className={styles.spinsleft}>
                Current bet:
                <span className={styles.neutral}>
                {Math.floor(bet.amount)} {TOKEN_NAME}
                </span>
              </div>
            }
            {bet.ngame > 0 &&
              <div className={styles.spinsleft}>
                {bet.ngame} spins left
              </div>
            }
          </div>
        }
      </div>
      <ReactTooltip
        id={'rt'}
        place="top"
        effect="solid"
        offset={{ bottom: 10 }}
        multiline
        className={styles.tooltip}
      />
      {renderButton()}
      {renderBuyWFAIRMessage()}
      {renderMessage()}
    </div>
  );
};

export default PlaceBetCasino;
