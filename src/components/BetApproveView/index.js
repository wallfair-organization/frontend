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
import { calculateGain } from 'helper/Calculation';
import { selectUser } from 'store/selectors/authentication';
import { convert } from '../../helper/Currency';
import Share from '../../components/Share';
import routes from '../../constants/Routes';
import useConfettiAnimation from 'hooks/useConfettiAnimation';
import { toNumericString } from 'helper/FormatNumbers';

const BetApproveView = ({ visible, hidePopup, options }) => {
  const { currency } = useSelector(selectUser);

  const { getAnimationInstance, canvasStyles } = useConfettiAnimation({
    visible,
  });

  const trade = _.get(options, 'data.trade');
  const bet = _.get(options, 'data.bet');

  const amountPlaced = convert(_.get(trade, 'investmentAmount', 0), currency);
  const potentialOutcome = convert(_.get(trade, 'outcomeTokens', 0), currency);
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

  return (
    <div className={styles.approveBetContainer}>
      <span className={styles.approveBetHeadline}>
        <img src={LogoSplash} className={styles.logo} alt="logo" />
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
            {toNumericString(amountPlaced)} <span>{currency}</span>
          </div>
        </div>
        <div className={classNames(styles.entry)}>
          <div className={styles.label}>Potential outcome</div>
          <div className={styles.value}>
            {toNumericString(potentialOutcome.toFixed(2))}{' '}
            <span>{currency}</span>
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

      <ReactCanvasConfetti
        refConfetti={getAnimationInstance}
        style={canvasStyles}
      />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BetApproveView);
