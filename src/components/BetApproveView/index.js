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
import { convert, currencyDisplay } from '../../helper/Currency';
import Share from '../../components/Share';
import routes from '../../constants/Routes';
import useConfettiAnimation from 'hooks/useConfettiAnimation';
import { toNumericString } from 'helper/FormatNumbers';
import ButtonTheme from 'components/Button/ButtonTheme';

const BetApproveView = ({ visible, hidePopup, options }) => {
  const { currency } = useSelector(selectUser);

  const { getAnimationInstance, canvasStyles } = useConfettiAnimation({
    visible,
  });

  const trade = _.get(options, 'data.trade');
  const bet = _.get(options, 'data.bet');
  const event = _.get(options, 'data.event');

  const amountPlaced = convert(_.get(trade, 'investment_amount', 0), currency);
  const potentialOutcome = convert(_.get(trade, 'outcome_tokens', 0), currency);
  const potentialPercent = calculateGain(amountPlaced, potentialOutcome);
  const potentialPercentGain = _.get(potentialPercent, 'value');
  const potentialPercentType = _.get(potentialPercent, 'negative', false);
  const gainTypeClass = potentialPercentType ? 'negative' : 'positive';
  const outcomeIndex = _.get(trade, 'outcome_index');
  const outcomeValue = _.get(bet, ['outcomes', outcomeIndex, 'name']);

  //for later - share button logic
  const buildDirectLink = routes.betApproveDirect
    .replace(':eventId', event.id)
    .replace(':tradeId', trade.id)
    .replace(':betId', bet.id);

  const urlOrigin = window.location.origin;

  const directUrlObj = new URL(urlOrigin + buildDirectLink);

  return (
    <div className={styles.approveBetContainer}>
      <span className={styles.approveBetHeadline}>
        <img src={LogoSplash} className={styles.logo} alt="logo" />
        Congratulations!
      </span>
      <span className={styles.betPostedHeadline}>
        Your bet has been <br />
        posted
      </span>

      <div className={styles.betOverview}>
        <div className={classNames(styles.entry)}>
          <div className={styles.label}>Amount placed</div>
          <div className={classNames(styles.value, styles.alignRight)}>
            {toNumericString(amountPlaced)} <span>{currencyDisplay(currency)}</span>
          </div>
        </div>
        <div className={classNames(styles.entry)}>
          <div className={styles.label}>Potential outcome</div>
          <div className={classNames(styles.value, styles.alignRight)}>
            {toNumericString(potentialOutcome)}{' '}
            <span>{currencyDisplay(currency)}</span>
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
          theme={ButtonTheme.primaryButtonL}
          disabledWithOverlay={false}
          onClick={hidePopup}
        >
          Keep Going
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
