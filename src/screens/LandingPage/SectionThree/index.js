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
          When you sign up on Wallfair Alpha, you will not only receive 5000
          Play-WFAIR Tokens to use on our platform but also more ways to earn
          further Play-WFAIR tokens which means a higher chance of climbing to
          the top of our weekly and monthly community leaderboards. Why is it
          worth your while? It’s easy, at the end of each week and month, we
          will reward our highest performing players with up to 20k in $WFAIR
          which will mean a lot of money once we go live on mainnet. Each week
          and each month the leaderboards reset back down to zero and you can
          start winning all over again. In addition, we will gradually add more
          communication channels with your favorite celebrities and influencers,
          entertaining video streams with the coolest content on the web, super
          exciting NFT deals for our leaderboard representatives and the
          opportunity to win tokens through a user lottery on Wallfair.io.
        </p>
        <br />
        <p className={classes.textParagraph}>
          And, of course, our motto remains: the more you play, the more you
          earn.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img src={Image} width={328} alt="section-one" />
      </div>
    </section>
  );
};

export default SectionThree;
