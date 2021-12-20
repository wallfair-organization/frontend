import styles from './styles.module.scss';
import { PopupActions } from '../../store/actions/popup';
import { connect } from 'react-redux';
import PopupTheme from '../Popup/PopupTheme';
import { getGameDetailById } from '../../api/crash-game';
import _ from 'lodash';

const LastCrashes = ({ lastCrashes, showPopup, text, game }) => {
  const handleCrashFactorClick = async (crash, e) => {
    const gameHash = crash?.gameHash;
    const response = await getGameDetailById(gameHash, game.id).catch(err => {
      console.error("Can't get user by id:", err);
    });
    const details = response?.data || null;

    if (details?.match) {
      showPopup(PopupTheme.lastGamesDetail, {
        maxWidth: true,
        data: {
          details,
          game
        },
      });
    }
  };

  return (
    <div id="lastCrashes" className={styles.container}>
      <span className={styles.title}>{text ? text : 'Last Crashes'}</span>
      <div className={styles.crashes}>
        {/* <div className={styles.overlay}></div> */}
        {lastCrashes.map((crash, i) => (
          /* Crash factors are not guaranteed to be unique, so create a unique key - crash + index */
          <span
            data-crash-index={i}
            onClick={e => handleCrashFactorClick(crash, e)}
            key={`${crash?.crashFactor}${i}`}
            className={styles.crash}
          >
            {crash?.crashFactor?.toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    showPopup: (popupType, options) => {
      dispatch(
        PopupActions.show({
          popupType,
          options,
        })
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(LastCrashes);
