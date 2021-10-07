import Image from './image.png';
import styles from './styles.module.scss';

const SectionTwo = ({ classes }) => {
  return (
    <section className={classes.section}>
      <div className={styles.imageContainer}>
        <img src={Image} alt="section-one" />
      </div>
      <div className={classes.sectionNumber}>02</div>
      <div className={classes.textContainer}>
        <h1 className={classes.sectionHeading}>What can you bet on?</h1>
        <p className={classes.textParagraph}>
          Have you always wanted to bet on your favourite Esports players? or
          predict who will win the next US election? We have everything from
          E-Sports betting, Live games in Vegas as well as chicken races and who
          will win Big Brother 2022, our range of events are second-to-none and
          are limited only by the imaginations of our players.
        </p>
        <br />
        <p className={classes.textParagraph}>
          To ensure a level of quality and trust in our events, during Wallfair
          Alpha we will be creating events exclusively with our partners and
          trusted community members. As we move forward into a new era of
          betting, we will open the flood gates to event creation for everyone,
          yes, that means you, our valuable players. This means anyone can
          create events at any time and start earning on their own creative
          speculations.
        </p>
      </div>
    </section>
  );
};

export default SectionTwo;
