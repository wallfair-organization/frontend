import Image from './image.png';
import styles from './styles.module.scss';

const SectionFour = ({ classes }) => {
  return (
    <section className={classes.section}>
      <div className={styles.imageContainer}>
        <img src={Image} width={194} height={194} alt="section-four" />
      </div>
      <div className={classes.sectionNumber}>04</div>
      <div className={classes.textContainer}>
        <h2 className={classes.sectionHeading}>
          What is the WFAIR Token and what can you do with it?
        </h2>
        <p className={classes.textParagraph}>
          Have you always wanted to bet on your favourite Esports players? or
          predict who will win the next US election? We have everything from
          Sports betting, Live games in Vegas as well as chicken races and who
          will win Big Brother 2022, our range of events are second-to-none and
          are limited only by the imaginations of our players.
        </p>
        <br />
        <p className={classes.textParagraph}>
          We are built on Blockchain Technology. That means transparent betting
          for our players, no more greedy bookmakers, no more high fees and odds
          that are determined by the players, not the house. Betting on Wallfair
          is as simple as searching for your favourite event, or why not even
          create one of your own, jumping right into the action and simply
          clicking the “place bet” button. Then sit back and watch your $WFAIR
          tokens grow. The more you play, the more you earn.
        </p>
      </div>
    </section>
  );
};

export default SectionFour;
