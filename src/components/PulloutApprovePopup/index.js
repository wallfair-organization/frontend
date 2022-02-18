import styles from './styles.module.scss';
import { connect, useSelector } from 'react-redux';
import { PopupActions } from '../../store/actions/popup';
import Button from '../Button';
import LikeIcon from '../../data/icons/like-icon.svg';
import HighlightType from 'components/Highlight/HighlightType';
import { selectUser } from 'store/selectors/authentication';
import { trackApproveCashout } from '../../config/gtm';
import { pullOutBet } from 'api';
import { AlertActions } from 'store/actions/alert';
import { currencyDisplay } from 'helper/Currency';

const PulloutApprovePopup = ({
  hidePopup,
  showSuccess,
  showError,
  betData: { betId, amount, outcome, outcomeName },
  onApprove,
}) => {
  const { currency } = useSelector(selectUser);

  const onApprovePulloutClick = async () => {
    pullOutBet(betId, outcome)
      .then(_ => {
        hidePopup();
        showSuccess(
          `Successfully cashed out ${amount} ${currencyDisplay(currency)}`
        );
        onApprove(betId, outcome);
        trackApproveCashout({ eventTitle: outcomeName });
      })
      .catch(err => {
        console.log(err);
        hidePopup();
        showError('Failed to cash out.');
      });
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
          {amount} {currencyDisplay(currency)}
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
    showSuccess: message => {
      dispatch(AlertActions.showSuccess({ message }));
    },
    showError: message => {
      dispatch(AlertActions.showError({ message }));
    },
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
  };
};

export default connect(null, mapDispatchToProps)(PulloutApprovePopup);
