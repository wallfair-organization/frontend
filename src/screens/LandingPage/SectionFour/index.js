import Image from './image.png';
import styles from './styles.module.scss';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import AuthenticationType from 'components/Authentication/AuthenticationType';
import { TOKEN_NAME } from 'constants/Token';

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
          width={194}
          height={194}
          alt="section-one"
        />
      </div>
      <div className={classes.sectionNumber}>04</div>
      <div className={classes.textContainer}>
        <h2 className={classes.sectionHeading}>
          The {TOKEN_NAME} Token and its Abilities
        </h2>
        <p className={classes.textParagraph}>
          Good question, Jimmy. Think of it as your own in-game currency, think
          of it as coins in your wallet or even a casino chip. The {TOKEN_NAME} token
          is our very own, in-house crypto and the best part is, it’s easy
          Crypto.
        </p>
        <br />
        <p className={classes.textParagraph}>
          You buy the tokens from our top up store, or one of our exchange
          partners and that's it, you’re ready to go. Not only that, but we have
          hidden more ways to earn more tokens everywhere throughout our
          platform, either through rewards or hidden items and collectables.
          Users will get new tokens every week as well as from referring
          friends, family and completing feedback tasks to help the Alpacasino
          team improve the user journey for our valued players.
        </p>
        {/* <br />
        <br /> */}
        {/* <Button className={styles.button} onClick={showLoginPopup}>
          Sign Up and start earning now
        </Button> */}
      </div>
    </section>
  );
};

export default SectionFour;
