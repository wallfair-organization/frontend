import Image from './image.png';

const SectionOne = ({ classes }) => {
  return (
    <section className={classes.section}>
      <div className={classes.sectionNumber}>01</div>
      <div className={classes.textContainer}>
        <h1 className={classes.sectionHeading}>What is Wallfair Alpha?</h1>
        <p className={classes.textParagraph}>
          Wallfair Alpha is a trial version of Wallfair gambling platform
          allowing the users to learn how to set up bets, win money and become a
          community leader without risking financial losses. We are built on
          Blockchain Technology, Polygon chain to be precise. That means low or
          non-existent fees, transparent decentralized betting, getting rid of
          greedy bookmakers as well as odds that are determined by the players
          and not the house. Betting on Wallfair is as simple as searching for
          your favorite event or creating a bet of your own jumping right into
          the action by simply clicking the “place bet” button.
        </p>
        <br />
        <p className={classes.textParagraph}>
          Our platform is built on an easy to use and super secure WFAIR token.
          We realize that the blockchain world and the token operations might
          seem challenging at first if you have never taken a deep dive into
          those topics before, therefore we decided to create a secure
          environment where the players can learn, make mistakes and try out new
          things finding their favorite method of betting and winning. Wallfair
          is about opening up an entire world of betting options for the players
          while sitting back and watching your $WFAIR token amount grow.
        </p>
        <br />
        <p className={classes.textParagraph}>
          Think of it as your own in-game currency, think of it as coins in your
          wallet or even a casino chip. The $WFAIR token is our very own
          in-house crypto and the best part is, it’s easy crypto.
        </p>
        <p className={classes.textParagraph}>
          You buy the tokens from our top up store, or one of our exchange
          partners and that's it, you’re ready to go. Not only that, but we have
          hidden more ways to earn more tokens everywhere throughout our
          platform, either through rewards or hidden items and collectables.
          Users will get new $WFAIR tokens every week as well as from referring
          friends, family and completing feedback tasks to help the Wallfair
          team improve the user journey for our players. The more you play, the
          more you earn - sign up now.
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
