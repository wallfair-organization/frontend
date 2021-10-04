import Image from './image.png';
import styles from './styles.module.scss';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import AuthenticationType from 'components/Authentication/AuthenticationType';

const SectionFour = ({ classes }) => {
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
      <div className={styles.imageContainer}>
        <img
          className={classes.sectionImage}
          src={Image}
          width={350}
          alt="section-one"
        />
      </div>
      <div className={classes.sectionNumber}>04</div>
      <div className={classes.textContainer}>
        <h2 className={classes.sectionHeading}>How can I join?</h2>
        <p className={classes.textParagraph}>
          To register, please follow the instructions on our website; as
          mentioned, you will be joining the Alpha version of the platform where
          you will be granted a certain amount of Play-WFAIR tokens to test our
          event and betting experience. After registration, the tokens will be
          placed into your platform account – you will be able to use them on
          the platform at your discretion.
        </p>
        <br />
        <p className={classes.textParagraph}>
          Everyone actively participating in the Alpha platform will have the
          opportunity to determine the setup and the governance structure of the
          platform and earn even more tokens than less active users. We are
          defining a new era of betting and entertainment at a press of a
          button.
        </p>
        <br />
        <br />
        <Button className={styles.button} onClick={showLoginPopup}>
          Sign Up and start earning now
        </Button>
      </div>
    </section>
  );
};

export default SectionFour;
