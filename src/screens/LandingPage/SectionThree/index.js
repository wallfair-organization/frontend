import Image from './image.png';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { PopupActions } from 'store/actions/popup';
import PopupTheme from 'components/Popup/PopupTheme';
import styles from './styles.module.scss';
import AuthenticationType from 'components/Authentication/AuthenticationType';

const SectionThree = ({ classes }) => {
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
      <div className={classes.sectionNumber}>03</div>
      <div className={classes.textContainer}>
        <h2 className={classes.sectionHeading}>
          What can you win by
          <br /> signing up?
        </h2>
        <p className={classes.textParagraph}>
          With the Wallfair Alpha weekly and monthly Leaderboard you can win up
          to 20.000€ which will be provided in $WFAIR Tokens as soon as our
          platform goes live on Mainnet. Bet as much as possible (remember,
          without losing money) and climb to the top of our weekly and monthly
          Leaderboards, and of course, all with no revenues, no middle men and
          most importantly; no more boring bets. Sign up and start earning now.
        </p>
        <br />
        <br />
        <Button className={styles.button} onClick={showLoginPopup}>
          Sign Up and start earning now
        </Button>
      </div>
      <div className={styles.imageContainer}>
        <img src={Image} width={328} alt="section-one" />
      </div>
    </section>
  );
};

export default SectionThree;
