import Image from './image.png';

const SectionOne = ({ classes }) => {
  return (
    <section className={classes.section}>
      <div className={classes.sectionNumber}>01</div>
      <div className={classes.textContainer}>
        <h1 className={classes.sectionHeading}>What is Wallfair Alpha?</h1>
        <p className={classes.textParagraph}>
          Wallfair is a betting platform, why are we different to other betting
          platforms and what makes using Wallfair, easier and more entertaining
          than using other bookmaking platforms?
        </p>
        <br />
        <p className={classes.textParagraph}>
          With Wallfair Alpha you have the opportunity to play on our platform,
          have all the advantages of entertainment, betting and winning money
          without actually losing any. We give our players more ways to win and
          more ways to bet on things they love. No longer is this about regular
          sports betting, or predicting who will score the next goal against
          Manchester United. Wallfair is about opening up an entire world of
          betting options for our players. Sign up now.
        </p>
      </div>
      <img
        className={classes.sectionImage}
        src={Image}
        width={400}
        alt="section-one"
      />
    </section>
  );
};

export default SectionOne;
