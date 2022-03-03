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
import {formatToFixed, roundToTwo} from '../../helper/FormatNumbers';
import { selectUser } from 'store/selectors/authentication';
import { PopupActions } from 'store/actions/popup';
import TokenNumberInput from 'components/TokenNumberInput';
import { StandardInput, ToggleInput } from '../PlaceBetCasino/components';
import PopupTheme from '../Popup/PopupTheme';
import Input from '../Input';
import ButtonTheme from 'components/Button/ButtonTheme';
import { round } from 'lodash/math';
import _ from 'lodash';
/*import {
  selectDisplayBetButton,
} from '../../store/selectors/rosi-game';*/
import ReactCanvasConfetti from 'react-canvas-confetti';
import InfoBox from 'components/InfoBox';
import IconType from '../Icon/IconType';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import Timer from '../RosiGameAnimation/Timer';
import { TOKEN_NAME } from 'constants/Token';
import { MinesInput, ClearedInput} from "./MinesInput";
import { trackMinesPlaceBet, trackMinesPlaceBetGuest } from "../../config/gtm"
import { OnboardingActions } from 'store/actions/onboarding';
import { GAMES_CURRENCY_MAX_BET } from '../../constants/Currency';

import {
  FormGroup,
  InputLabel,
  Select
} from '../Form';
import Button from 'components/Button';
import Routes from 'constants/Routes';
import { useHistory } from 'react-router';
import { currencyDisplay } from 'helper/Currency';

const PlaceBetMines = ({
  connected,
  onBet,
  bet,
  setAmount,
  amount,
  setMines,
  mines,
  gameInProgress,
  setGameInProgress,
  setBet,
  currentStep,
  setCurrentStep,
  onCashout,
  multiplier,
  profit,
  demoCount,
  setDemoCount,
  confetti,
  setConfetti
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userBalance = parseInt(user?.balance || 0, 10);
  const gamesCurrency = user.gamesCurrency;
  const [wincrease, setWincrease] = useState(0)
  const [lincrease, setLincrease] = useState(0)
  const [lossbutton, setLossbutton] = useState(false)
  const [winbutton, setWinbutton] = useState(false)
  const [profit1, setProfit1] = useState(0);
  const [loss, setLoss] = useState(0);
  const [accumulated, setAccumulated] = useState(0)
  const [cleared, setCleared] = useState(1);
  const history = useHistory();


  const gameOffline = false//useSelector(selectGameOffline);

  const userUnableToBet = amount < 1 || gameOffline;

  const onTokenNumberChange = number => {
    setAmount(number);
  };

  const onGuestAmountChange = event => {
    let value = _.get(event, 'target.value', 0);
    const amount = round(value, 0);
    setAmount(amount <= GAMES_CURRENCY_MAX_BET ? amount : GAMES_CURRENCY_MAX_BET);
  };

  const onBetAmountChanged = multiplier => {
    const changedValue = _.floor(amount * multiplier, 0);
    if (changedValue > GAMES_CURRENCY_MAX_BET) {
      setAmount(GAMES_CURRENCY_MAX_BET);
    } else if (changedValue < 1) {
      setAmount(1);
    } else {
      setAmount(changedValue);
    }
  };

  const placeABet = async () => {
    if (userUnableToBet) return;
    if (amount > userBalance) return;
    setConfetti(false);
    const payload = {
      amount,
      minesCount: mines,
      gamesCurrency
    }

    trackMinesPlaceBet({ amount, mines });
    await onBet(payload);
  }

  const placeAutoBet = async () => {
    if (userUnableToBet) return;
    if (amount > userBalance) return;
    setConfetti(false);
    const payload = {
      amount,
      cleared,
      autobet: true,
      profitStop: Number(profit1),
      lossStop: Number(loss),
      wincrease: winbutton?0:Number(wincrease)/100,
      lincrease: lossbutton?0:Number(lincrease)/100,
      minesCount: mines,
      accumulated,
      gamesCurrency
    };
    setAccumulated(0)
    setBet((bet) => {
      return{
      ...bet,
      ...payload,
      stopped: false,
      done: true
    }})
    onBet(payload);
  }

  useEffect(() => {
    if(bet.autobet && !bet.done){
      if(bet.win) {
        handleCashout()
        //document.getElementById('mines-cashout-btn').click();

        if(bet.profitStop >= 0 && bet.profitStop > accumulated && bet.lossStop >= 0 && bet.lossStop > -accumulated){
          const newamount = bet.profitStop > 0 && Math.floor(winbutton ? amount : bet.amount*(1+bet.wincrease))

          if(newamount < 1) {
            setBet({autobet: false, pending: false})
          } else {
            // setTimeout(()=> {
            //   setAccumulated((a)=> {return a- newamount})
              setBet((bet) => {return{...bet, amount: newamount }})
              onBet({...bet, amount: newamount, done: true})
            // }, 1000)
          }

          setAccumulated((a)=> {return a + profit})
        }
        else {
          setBet({autobet: false, pending: false})
        }
      }else{
        if(bet.profitStop >= 0 && bet.profitStop > accumulated && bet.lossStop >= 0 && bet.lossStop > -accumulated){
          const newamount = bet.lossStop >= 0 && Math.floor(lossbutton ? amount : bet.amount*(1+bet.lincrease))
          if(newamount < 1) setBet({autobet: false, pending: false})
          else {
            setBet((bet) => {return{...bet, amount: newamount }})
            onBet({...bet, amount: newamount, done: true})
          }
        }
        else {
          setBet({autobet: false, pending: false})
        }

        setAccumulated((a)=> {return a - bet.amount})

      }
    }else if(!bet.autobet && bet.stopped){
      setTimeout(()=> {
        document.getElementById('mines-cashout-btn')?.click();
      }, 500)

    }
  }, [bet.autobet, bet.done])

  const placeGuestBet = async () => {
    const payload = {
      demo: true,
      amount,
      minesCount: mines
    }
    trackMinesPlaceBetGuest({ amount, mines });
    if(demoCount >= 3) {
      showLoginPopup();
      setBet({
        ...bet,
        done: false
      })
      return;
    }

    await onBet(payload);

    setBet({
      ...bet,
      done: true
    })
  };

  const handleCashout = e => {
    e?.preventDefault();
    e?.stopPropagation();
    onCashout();
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
  };

  const renderButton = () => {
    if (!gameInProgress && !bet.autobet) {
      let buttonEnable = false;
      if (
        !connected ||
              userUnableToBet ||
              bet?.pending ||
              (amount > userBalance && user.isLoggedIn)
      ) buttonEnable = true;
      if(amount === 0) buttonEnable = false;
      return (
        <Button
          role="button"
          tabIndex="0"
          className={classNames(styles.button)}
          disabled={buttonEnable}
          onClick={bet?.pending ? null : (user.isLoggedIn && amount > 0) ? (selector === 'manual' ? placeABet : placeAutoBet) : placeGuestBet }
        >
          {(user.isLoggedIn && amount > 0) ? (selector === 'manual' ? 'Place Bet' : 'Start Auto Bet') : 'Play Demo'}
        </Button>
      );
    } else {
      return (
        <>
          <div className={styles.currentMultiplier}>Multiplier: <span className={classNames('global-cashout-profit')}>{!multiplier ? "-" : 'x' + multiplier}</span></div>
          <div className={styles.currentProfit}>Profit: <span className={classNames('global-cashout-profit')}>{!profit ? "-" : '+' + roundToTwo(profit)}</span></div>
          {bet.autobet && <Button
            role="button"
            tabIndex="0"
            style={{display: bet.autobet ? 'auto':'none'}}
            className={styles.button}
            theme={ButtonTheme.redButton}
            onClick={() => setBet({...bet, autobet: false, stopped: true})}
            data-tracking-id={
              user.isLoggedIn ? null : 'alpacawheel-showloginpopup'
            }
          >
            <p>Stop Autobet</p>
          </Button>}

          {!bet.autobet && <Button
            id={"mines-cashout-btn"}
            role="button"
            tabIndex="0"
            style={{display: !bet.autobet ? 'auto':'none'}}
            className={classNames(
              styles.button,
              {[styles.buttonDisabled]: currentStep === 0})
            }
            onClick={currentStep === 0 ? ()=>{} : handleCashout }
          >
            Cashout
          </Button>}
        </>
      )
    }
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
    if (!user.isLoggedIn) {
      return (
        <div className={classNames([styles.betInfo, styles.guestInfo])}>
          This is a simulated version. Sign in to start playing.
        </div>
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


  const [selector, setSelector] = useState('manual')

  const switchButton = () => {
    return (
      <div className={styles.selector}>
        <span className={styles.top} style={{ marginLeft: selector === 'manual' ? 0 : '48.3%' }}></span>
        <div className={classNames(styles.tab)} onClick={() => setSelector('manual')} >
          <span className={selector === 'manual' ? styles.selected : styles.deselected}>Manual Bet</span>
        </div>
        <div className={classNames(styles.tab)} onClick={() => setSelector('auto')} >
          <span className={selector !== 'manual' ? styles.selected : styles.deselected}>Auto Bet</span>
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
        fire={confetti}
        particleCount={300}
        spread={360}
        origin={{ x: 0.4, y: 0.45 }}
      />
      <div className={styles.inputContainer}>
        <div className={styles.placeBetContainer}>
          {switchButton(styles)}
        </div>

        {selector === 'manual' ?
          <div className={classNames(styles.sliderContainer, {
            [styles.hidden]: false && bet.done
          })}>
            <label className={styles.label}>Bet Amount</label>
            {user?.isLoggedIn ? (
              <TokenNumberInput
                value={amount}
                currency={gamesCurrency}
                setValue={onTokenNumberChange}
                minValue={0}
                decimalPlaces={0}
                maxValue={GAMES_CURRENCY_MAX_BET}
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
                  disabled={bet.autobet ? true : false}
                  onChange={onGuestAmountChange}
                  step={0.01}
                  min="1"
                  max={GAMES_CURRENCY_MAX_BET}
                />
                <span className={styles.eventTokenLabel}>
                  <span>{currencyDisplay(gamesCurrency)}</span>
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
                    onClick={() => setAmount(GAMES_CURRENCY_MAX_BET)}
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
                )}
              >
                Mines
              </label>
              <div className={styles.riskSelection}>
                <MinesInput mines={mines} setMines={setMines}/>
              </div>
            </div>
          </div>
          :
          <div className={styles.sliderContainer}>
            <label className={styles.label}>Bet Amount</label>
            {user?.isLoggedIn ? (
              <TokenNumberInput
                value={amount}
                currency={gamesCurrency}
                setValue={(v)=>setAmount(v)}
                minValue={1}
                decimalPlaces={0}
                maxValue={formatToFixed(
                  user.balance > GAMES_CURRENCY_MAX_BET ? GAMES_CURRENCY_MAX_BET : user.balance
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
                  max={GAMES_CURRENCY_MAX_BET}
                />
                <span className={styles.eventTokenLabel}>
                  <span>{currencyDisplay(gamesCurrency)}</span>
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
                    onClick={() => setAmount(GAMES_CURRENCY_MAX_BET)}
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
                )}
              >
                Random Cards to Pick
              </label>
              <div className={styles.riskSelection}>
                <ClearedInput mines={cleared} setMines={setCleared} min={1} max={25-mines} />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label
                className={classNames(
                  styles.label,
                )}
              >
                Mines
              </label>
              <div className={styles.riskSelection}>
                <MinesInput mines={mines} setMines={(m)=>{setMines(m);m > 25-cleared && setCleared(25-m)}}/>
              </div>
            </div>
            <StandardInput title={'Stop on Profit'} setValue={setProfit1} value={profit1} currency={gamesCurrency}/>
            <StandardInput title={'Stop on Loss'} setValue={setLoss} value={loss} currency={gamesCurrency}/>
            <ToggleInput title={'On Win'} setValue={setWincrease} value={wincrease} setToggle={setWinbutton} toggle={winbutton} />
            <ToggleInput title={'On Loss'} setValue={setLincrease} value={lincrease} setToggle={setLossbutton} toggle={lossbutton} />
            {bet.autobet &&
              <div className={styles.spinsleft}>
                <span className={accumulated > 0 ? styles.reward : styles.lost}>
                {Math.floor(accumulated)} {currencyDisplay(gamesCurrency)}
                </span>
                accumulated
              </div>
            }
            {bet.autobet && bet.amount &&
              <div className={styles.spinsleft}>
                Current bet:
                <span className={styles.neutral}>
                {Math.floor(bet.amount)} {currencyDisplay(gamesCurrency)}
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

export default PlaceBetMines;
