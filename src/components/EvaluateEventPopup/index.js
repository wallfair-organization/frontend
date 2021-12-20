import styles from './styles.module.scss';
import LikeSplash from '../../data/images/like-splash.png';
import { useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Textarea from '../Textarea';
import Button from 'components/Button';
import HighlightType from 'components/Highlight/HighlightType';
import * as Api from 'api';
import { useDispatch } from 'react-redux';
import { AlertActions } from 'store/actions/alert';

const EvaluateEventPopup = ({ betQuestion, hidePopup }) => {
  const rating = {
    Excellent: 0,
    Good: 1,
    Lame: 2,
    Unethical: 3,
  };

  const dispatch = useDispatch();
  const [currentRating, setCurrentRating] = useState(rating.Excellent);
  const [comment, setComment] = useState('');

  const handleComment = event => {
    setComment(event.target.value);
  };

  const handleSend = () => {
    Api.sendEventEvaluate(betQuestion, currentRating, comment)
      .then(response => {
        hidePopup();
      })
      .catch(error => {
        dispatch(AlertActions.showError(error.message));
      });
  };

  return (
    <div className={styles.evaluateEvent}>
      <img src={LikeSplash} className={styles.logo} />
      <div className={styles.title}>Evaluate Event</div>
      <div className={styles.subtitle}>{betQuestion}</div>

      <div className={styles.content}>
        <div className={styles.ratingTabs}>
          {_.map(rating, r => {
            return (
              <div
                onClick={() => setCurrentRating(r)}
                className={classNames(
                  styles.ratingItem,
                  currentRating === r ? styles.selected : null
                )}
              >
                {Object.keys(rating).find(k => rating[k] === r)}
              </div>
            );
          })}
        </div>

        <Textarea
          value={comment}
          onChange={handleComment}
          placeholder="Comment..."
        />
      </div>

      <Button
        className={styles.sendButton}
        onClick={handleSend}
        highlightType={HighlightType.highlightModalButton}
        disabled={false}
        disabledWithOverlay={false}
        withoutBackground={true}
      >
        Send
      </Button>
    </div>
  );
};

export default EvaluateEventPopup;
