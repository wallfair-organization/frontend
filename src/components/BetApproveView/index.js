import { useEffect, useState } from 'react';
import _ from 'lodash';
import ReactCanvasConfetti from 'react-canvas-confetti';
import styles from './styles.module.scss';
import LogoSplash from '../../data/images/wfair-logo-splash.png';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import classNames from 'classnames';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from '../Popup/PopupTheme';
import { connect, useSelector } from 'react-redux';
import Icon from '../Icon';
import IconType from '../Icon/IconType';
import IconTheme from '../Icon/IconTheme';
import { calculateGain } from 'helper/Calculation';
import { selectUser } from 'store/selectors/authentication';
import { convert } from '../../helper/Currency';
import ReactTooltip from 'react-tooltip';

import Share from '../../components/Share';

import routes from '../../constants/Routes';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

let animationInstance;
const BetApproveView = ({ visible, hidePopup, options, events }) => {
  const { currency } = useSelector(selectUser);

  const trade = _.get(options, 'data.trade');
  const bet = _.get(options, 'data.bet');

  const amountPlaced = convert(
    _.get(trade, 'investmentAmount', 0),
    currency
  ).toFixed(2);
  const potentialOutcome = convert(
    _.get(trade, 'outcomeTokens', 0),
    currency
  ).toFixed(2);
  const potentialPercent = calculateGain(amountPlaced, potentialOutcome);
  const potentialPercentGain = _.get(potentialPercent, 'value');
  const potentialPercentType = _.get(potentialPercent, 'negative', false);
  const gainTypeClass = potentialPercentType ? 'negative' : 'positive';
  const outcomeIndex = _.get(trade, 'outcomeIndex');
  const outcomeValue = _.get(bet, ['outcomes', outcomeIndex, 'name']);

  //for later - share button logic
  const tradeId = _.get(trade, '_id');
  const eventId = _.get(bet, 'event');
  const betId = _.get(trade, 'betId._id');

  const buildDirectLink = routes.betApproveDirect
    .replace(':eventId', eventId)
    .replace(':tradeId', tradeId)
    .replace(':betId', betId);

  const urlOrigin = window.location.origin;

  const directUrlObj = new URL(urlOrigin + buildDirectLink);

  const makeShot = (particleRatio, opts) => {
    animationInstance &&
      animationInstance({
        ...opts,
        origin: { y: 0.6 },
        particleCount: Math.floor(1000 * particleRatio),
      });
  };

  const startAnimation = () => {
    makeShot(0.35, {
      spread: 60,
      startVelocity: 55,
      decay: 0.9,
    });

    makeShot(0.2, {
      spread: 90,
      decay: 0.9,
    });

    makeShot(0.35, {
      spread: 120,
      decay: 0.95,
      scalar: 0.8,
    });

    makeShot(0.3, {
      spread: 150,
      startVelocity: 25,
      decay: 0.99,
      scalar: 1.2,
    });

    makeShot(0.3, {
      spread: 120,
      decay: 1,
      startVelocity: 45,
    });
  };

  const getInstance = instance => {
    animationInstance = instance;
  };

  useEffect(() => {
    if (visible) {
      startAnimation();
    }
  }, [visible]);

  return (
    <div className={styles.approveBetContainer}>
      <span className={styles.approveBetHeadline}>
        <img src={LogoSplash} className={styles.logo} />
        Congratulations!
      </span>
      <span className={styles.betPostedHeadline}>
        Your Bet Has Been <br />
        Posted
      </span>

      <div className={styles.betOverview}>
        <div className={classNames(styles.entry)}>
          <div className={styles.label}>Amount placed</div>
          <div className={styles.value}>
            {amountPlaced} <span>{currency}</span>
          </div>
        </div>
        <div className={classNames(styles.entry)}>
          <div className={styles.label}>Potential outcome</div>
          <div className={styles.value}>
            {potentialOutcome} <span>{currency}</span>
          </div>
        </div>
        <div className={classNames(styles.entry, styles.alignRight)}>
          <div className={classNames(styles.valueHint, styles[gainTypeClass])}>
            {potentialPercentGain}
          </div>
        </div>
        <div className={classNames(styles.entry)}>
          <div className={styles.label}>Option selected</div>
          <div className={styles.value}>{outcomeValue}</div>
        </div>
      </div>

      <div className={styles.betButtonContainer}>
        <Button
          className={classNames(styles.betButton)}
          highlightType={HighlightType.highlightHomeCtaBet}
          disabledWithOverlay={false}
          onClick={hidePopup}
        >
          <span className={'buttonText'}>Keep Going</span>
        </Button>
      </div>

      {options.hideShare ? null : (
        <div className={styles.ShareButtonContainer}>
          <Share
            popupPosition={'top'}
            directUrl={directUrlObj.toString()}
            skipCalculatePos={true}
          />
        </div>
      )}

      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

const mapStateToProps = state => {
  return {
    visible:
      state.popup.popupType === PopupTheme.betApprove && state.popup.visible,
    events: _.get(state, 'event.events', []),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BetApproveView);
