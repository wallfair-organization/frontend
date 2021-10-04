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
          Have you always wanted to bet on your favorite influencer events,
          esports tournaments or Twitch streamers? Or did you want to predict
          who might win the next World Championship of Poker in Las Vegas? We
          have a wide range of traditional and non-traditional events whose
          setup and outcome are only limited by the imaginations of the event
          creators.
        </p>
        <br />
        <p className={classes.textParagraph}>
          To ensure an adequate level of quality and trust in our events we will
          be creating events exclusively with our partners and trusted community
          members during Wallfair Alpha. As we move forward, we will open the
          flood gates to event creation for everyone letting every user to
          create events at any time and to earn based on their own creativity.
        </p>
      </div>
    </section>
  );
};

export default SectionTwo;
