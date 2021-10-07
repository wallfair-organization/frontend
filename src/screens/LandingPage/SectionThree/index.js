import Image from './image.png';
import styles from './styles.module.scss';

const SectionThree = ({ classes }) => {
  return (
    <section className={classes.section}>
      <div className={classes.sectionNumber}>03</div>
      <div className={classes.textContainer}>
        <h2 className={classes.sectionHeading}>
          What can you win by
          <br /> signing up?
        </h2>
        <p className={classes.textParagraph}>
          When you sign up to Wallfair Alpha, not only do you receive 5000
          Play-WFAIR Tokens to use on our platform but the more you play, the
          more chances to win there are, we have hidden more ways to earn more
          Play-WFAIR tokens which means a higher chance of climbing to the top
          of our weekly and monthly community leaderboards. But I know what you
          are thinking “How can I win that real money, how can I get those
          $WFAIR tokens?” It’s easy, at the end of each week and month, we will
          reward our highest performing players with up to 20k in $WFAIR that
          can of course be used when we go live on Mainnet. Each week and each
          month the leaderboards reset back down to zero and you can start
          winning all over again.
        </p>
        <br />
        <p className={classes.textParagraph}>
          And of course, the more you play, the more you earn.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img src={Image} width={328} alt="section-one" />
      </div>
    </section>
  );
};

export default SectionThree;
