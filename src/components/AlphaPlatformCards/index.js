import styles from './styles.module.scss';
import { PopupActions } from 'store/actions/popup';
import { connect } from 'react-redux';

const AlphaPlatformCards = ({ alphaplatforms, showHowtoLink, showPopup }) => {
  return (
    <div className={styles.alphaplatformsContainer}>
      <div className={styles.alphaplatformsCategory}>
        <span className={styles.title}>
          Welcome to Wallfair Alpha! Check out how it works:
        </span>
        <span className={styles.subtitle}>
          For more detailed information,
          <a
            href="https://wallfair.gitbook.io/wallfair/the-magical-leaderboard"
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.link}>click here.</span>
          </a>
        </span>
      </div>
      <div className={styles.alphaplatforms}>
        {alphaplatforms.map((alphaplatform, index) => {
          return (
            <div className={styles.wrapper} key={`alphaplatformcard-${index}`}>
              <div key={index} className={styles.alphaplatformItem}>
                <div className={styles.alphaplatformHeader}>
                  <img src={alphaplatform.title} className={styles.title} />
                  <img
                    src={alphaplatform.background}
                    className={styles.background}
                  />
                </div>
                <div className={styles.alphaplatformInfo}>
                  <div className={styles.description}>
                    {alphaplatform.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hidePopup: () => {
      dispatch(PopupActions.hide());
    },
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

export default connect(null, mapDispatchToProps)(AlphaPlatformCards);
