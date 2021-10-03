import Image from './image.png';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import styles from './styles.module.scss';

const SectionFive = ({ classes }) => {
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
        <h2 className={classes.sectionHeading}>
          How can I join?
          <br />
          What’s in it for me?
        </h2>
        <p className={classes.textParagraph}>
          To register, please follow the instructions on our website; we want to
          let you know that you will be joining the Alpha version of the
          platform where you will be granted a certain amount of Play-WFAIR
          tokens to test our event and betting experience.
        </p>
        <br />
        <p className={classes.textParagraph}>
          After registration, the tokens will be placed into your platform
          account – you will be able to use them on the platform at your
          discretion.
        </p>
        <br />
        <p className={classes.textParagraph}>
          Everyone actively participating in Alpha activities will have the
          opportunity to determine the setup and the governance structure of the
          platform and earn even more tokens than less active users. We are
          defining a new era of betting and entertainment, all at the touch of a
          button.
        </p>
        <br />
        <p className={classes.textParagraph}>
          More ways to win real WFAIR tokens, more ways to win exclusive,
          valuable collectable items and more ways to engage with your favourite
          events.
        </p>
        <br />
        <br />
        <Button className={styles.button} onClick={showLoginPopup}>
          Sign Up and start earning now
        </Button>
      </div>
      <img
        className={classes.sectionImage}
        src={Image}
        width={350}
        alt="section-one"
      />
    </section>
  );
};

export default SectionFive;
