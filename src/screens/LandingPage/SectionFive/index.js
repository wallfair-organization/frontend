import Image from './image.png';

const SectionFive = ({ classes }) => {
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
          ​​To register, please follow the instructions on our website; we want
          to let you know that you will be joining the Alpha version of the
          platform where you will be granted a certain amount of WFAIR tokens to
          test our event creation and gambling experience.
        </p>
        <br />
        <p className={classes.textParagraph}>
          After registration the tokens will be placed into your platform
          account – you will be able to use them on the platform at your
          discretion.
        </p>
        <br />
        <p className={classes.textParagraph}>
          Everyone actively participating in the platform activities will have
          the opportunity to determine the setup and the governance structure of
          the platform and earn even more tokens than less active users, which
          is why we encourage you to become actively engaged.
        </p>
        <br />
        <p className={classes.textParagraph}>
          More ways to win real WFAIR tokens, more ways to win exclusive,
          valuable collectable items and more ways to engage with your favourite
          events.
        </p>
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
