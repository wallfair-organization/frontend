import Image from './image.png';
import styles from './styles.module.scss';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import AuthenticationType from 'components/Authentication/AuthenticationType';

const SectionPolygon = ({ classes }) => {
  const dispatch = useDispatch();

  const showLoginPopup = () => {
    dispatch(
      PopupActions.show({
        popupType: PopupTheme.auth,
        options: {
          small: true,
          authenticationType: AuthenticationType.register,
        },
      })
    );
  };

  return (
    <section className={classes.section}>
      <div className={classes.sectionNumber}>05</div>
      <div className={classes.textContainer}>
        <h2 className={classes.sectionHeading}>Why Blockchain, Why Polygon?</h2>
        <p className={classes.textParagraph}>
          We are built on Blockchain Technology. Polygon to be precise. That
          means transparent betting for our players, no more greedy bookmakers,
          no more high fees and odds that are determined by the players, not the
          house. Betting on Wallfair is as simple as searching for your
          favourite event, or why not even create one of your own, jumping right
          into the action and simply clicking the “place bet” button. Then sit
          back and watch your $WFAIR tokens grow. The more you play, the more
          you earn.
        </p>
        {/* <br />
        <br />
        <Button className={styles.button} onClick={showLoginPopup}>
          Sign Up and start earning now
        </Button> */}
      </div>
      <div className={styles.imageContainer}>
        <img
          className={classes.sectionImage}
          src={Image}
          width={136}
          alt="section-one"
        />
      </div>
    </section>
  );
};

export default SectionPolygon;
