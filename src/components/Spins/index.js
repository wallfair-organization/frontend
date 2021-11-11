import styles from './styles.module.scss';
import {PopupActions} from '../../store/actions/popup';
import {connect} from 'react-redux';
import PopupTheme from '../Popup/PopupTheme';
import {getGameDetailById} from '../../api/crash-game';
import _ from 'lodash';

const Spins = ({spins, showPopup, text}) => {
  const handleCrashFactorClick = async (crash, e) => {
    const gameHash = crash?.gameHash;
    const response = await getGameDetailById(gameHash).catch(err => {
      console.error("Can't get user by id:", err);
    });
    const details = response?.data || null;

    if (details?.match) {
      showPopup(PopupTheme.lastGamesDetail, {
        maxWidth: true,
        data: {
          details,
        },
      });
    }
  };
  //  onClick={e => handleCrashFactorClick(crash, e)}
  return (
    <div className={styles.container}>
      <span className={styles.title}>{text ? text : 'Last Crashes'}</span>
      <div className={styles.crashes}>
        <div className={styles.overlay}></div>
        {spins?.map((spin, i) => {
         const spinType = spin?.type;

          return (
            <span key={`${spin.value}${i}`} className={styles.crash}>
              <span className={spinType === 'win' ? styles.reward : styles.lost}>{spin.value}</span>
          </span>
          )
        })}
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

export default connect(null, mapDispatchToProps)(Spins);
