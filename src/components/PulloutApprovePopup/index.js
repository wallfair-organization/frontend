import styles from './styles.module.scss';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import Button from '../Button';
import { BetActions } from 'store/actions/bet';
import LikeIcon from '../../data/icons/like-icon.svg';
import HighlightType from 'components/Highlight/HighlightType';
import { selectUser } from 'store/selectors/authentication';
import { trackApproveCashout } from '../../config/gtm';

const PulloutApprovePopup = ({
  hidePopup,
  pullOutBet,
  betData: { betId, amount, outcome, outcomeName },
}) => {
  const { currency } = useSelector(selectUser);

  const onApprovePulloutClick = () => {
    pullOutBet(betId, outcome, amount);
    hidePopup();
    trackApproveCashout({ eventTitle: outcomeName });
  };

  const onCancelPulloutClick = () => {
    hidePopup();
  };

  return (
    <div className={styles.pulloutContainer}>
      <img src={LikeIcon} alt="thumbs up icon" className={styles.approveIcon} />

      <span className={styles.pulloutTitle}>Confirmation</span>

      <p className={styles.pulloutText}>
        Are you sure you want to cash out&nbsp;
        <strong>
          {amount} {currency}
        </strong>
        ?
      </p>

      <div className={styles.buttonContainer}>
        <Button
          withoutBackground={true}
          className={styles.cancelPulloutButton}
          onClick={onCancelPulloutClick}
        >
          Cancel
        </Button>

        <Button
          className={styles.approvePulloutButton}
          highlightType={HighlightType.highlightModalButton}
          withoutBackground={true}
          onClick={onApprovePulloutClick}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
    pullOutBet: (betId, outcome, amount, gain) => {
      dispatch(BetActions.pullOutBet({ betId, outcome, amount, gain }));
    },
  };
};

export default connect(null, mapDispatchToProps)(PulloutApprovePopup);
