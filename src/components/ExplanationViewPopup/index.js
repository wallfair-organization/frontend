import styles from './styles.module.scss';
import { connect } from 'react-redux';
import Button from '../Button';
import { PopupActions } from '../../store/actions/popup';
import { TOKEN_NAME } from '../../constants/Token';
import { useLocation } from 'react-router';

const ExplanationViewPopup = ({ closed, hidePopup }) => {
  const { pathname } = useLocation();

  const renderExplanationLiveEvents = () => {
    return (
      <div className={styles.explanationTextContainer}>
        <h3 className={styles.explanationTextHeadline}>
          How to earn with Live Events
          <span className={styles.explanationTextHeadlineUnderline}></span>
        </h3>

        <span className={styles.explanationText}>
          <p>
            Live Events are a new kind of entertainment: You can watch live
            sports, funny and serious events and bet on the outcome of the
            stream.
          </p>

          <p>
            You simply choose an event, enter how much you want to trade and
            select between 2-4 outcomes and see how much return you make. You
            can place a bet in seconds from any where.That simple it is.
          </p>

          <p>
            Btw, you can “sell” your positions at any time, When the propability
            of your choice has gone up, you can sell any time before the event
            ends at a profit.
          </p>

          <p>
            Also, you can share, chat, see event details, trading history and
            your open positions.
          </p>
        </span>
      </div>
    );
  };

  const renderExplanationEvents = () => {
    return (
      <div className={styles.explanationTextContainer}>
        <h3 className={styles.explanationTextHeadline}>
          How to earn with Events
          <span className={styles.explanationTextHeadlineUnderline}></span>
        </h3>

        <span className={styles.explanationText}>
          <p>
            Events are bets around various topics that are not live streamed but
            can be traded in the same simplicity.
          </p>

          <p>
            You simply choose an event, enter how much you want to trade and
            select between 2-4 outcomes and see how much return you make. You
            can place a bet in seconds from any where.That simple it is.
          </p>

          <p>
            Btw, you can “sell” your positions at any time, When the propability
            of your choice has gone up, you can sell any time before the event
            ends at a profit.
          </p>

          <p>
            Also, you can share, chat, see event details, trading history and
            your open positions.
          </p>
        </span>
      </div>
    );
  };

  const renderExplanationGames = () => {
    return (
      <div className={styles.explanationTextContainer}>
        <h3 className={styles.explanationTextHeadline}>
          How to earn with Games
          <span className={styles.explanationTextHeadlineUnderline}></span>
        </h3>

        <span className={styles.explanationText}>
          <p>Elon Game is super fun and easy to use.</p>

          <p>
            Elon tanks his rocket with {TOKEN_NAME} tokens that users place
            before the rocket takes off.
          </p>

          <p>
            On the journey to Mars, the value of {TOKEN_NAME} tokens increases
            and you can (and should) cash out your position any time on the
            journey. But don’t wait too long, at some point the rocket crashes
            and the {TOKEN_NAME} tokens that are still in the rocket crash with
            it.
          </p>

          <p>
            Elon is known for a good surprise, so you might come across NFT
            rewards and special gifts at any future time.
          </p>
        </span>
      </div>
    );
  };

  const renderCTAButton = () => {
    return (
      <Button
        withoutBackground={true}
        onClick={hidePopup}
        className={styles.ctaButton}
      >
        Let's do it!
      </Button>
    );
  };

  return (
    <div className={styles.explanationContainer}>
      {pathname.indexOf('/live-events') != -1 && renderExplanationLiveEvents()}
      {pathname.indexOf('/events') != -1 && renderExplanationEvents()}
      {pathname.indexOf('/games') != -1 && renderExplanationGames()}
      {renderCTAButton()}
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

export default connect(null, mapDispatchToProps)(ExplanationViewPopup);
