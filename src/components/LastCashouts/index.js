import styles from './styles.module.scss';
import {PopupActions} from '../../store/actions/popup';
import {connect} from 'react-redux';
import {displaySignedFormat} from "../../helper/FormatNumbers";
import {getSingleGameDetailById} from "../../api/casino-games";
import PopupTheme from "../Popup/PopupTheme";

const LastCashouts = ({spins, showPopup, text, game}) => {

    const handleClick = async (crash, e) => {
        const gameHash = crash?.gameHash;
        const response = await getSingleGameDetailById(gameHash, game.id).catch(err => {
            console.error("Can't get user by id:", err);
        });
        const resData = response?.data || null;

        if (resData) {
            showPopup(PopupTheme.singleGamesDetail, {
                maxWidth: true,
                data: {
                    resData,
                    game
                },
            });
        }
    };

  return (
    <div className={styles.container}>
      <span className={styles.title}>{text ? text : 'Last Crashes'}</span>
      <div className={styles.crashes}>
        {spins?.map((spin, i) => {
         const spinType = spin?.type;

          return (
            <span key={`${spin.value}${i}`} className={styles.crash} onClick={(e) => {
                handleClick(spin, e);
            }}>
              <span className={spinType === 'win' ? styles.reward :spinType === 'loss'? styles.lost : styles.even}>{displaySignedFormat(spin.value)}</span>
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

export default connect(null, mapDispatchToProps)(LastCashouts);
