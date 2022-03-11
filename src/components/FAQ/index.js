import styles from './styles.module.scss';
import classNames from 'classnames';
import FAQItem from './FAQItem';

const isPlayMoney = process.env.REACT_APP_PLAYMONEY === 'true';

const FAQ = ({className}) => {
  if (isPlayMoney) {
    return (
      <div className={classNames(styles.container, className)}>
        <h2>FAQ</h2>
        <div className={styles.faqContainer}>
          <FAQItem title="What is Wallfair?" answer="Wallfair is a decentralized betting platform on anything. Any user can create new events or bet on existing. It&apos;s like sports betting mixed with youtube." />
          <FAQItem title="What is play.wallfair.io?" answer="Basically like the real platform but instead of WFAIR tokens you trade PFAIR tokens. WFAIR tokens can be bought and sold for real money, PFAIR token are for free. This means you have 0% risk of losing any real money on PFAIR but you can win up to 150 USD daily." />
          <FAQItem title="How does it work?" answer="You create a free account in 10 sec and claim 100 PFAIR every day for free.<br/><br/>You can win $150 USD daily:<ul><li>50 USD for creating the event with most trading volume</li><li>50 USD for making highest gains from trading events (you cannot trade on your own events)</li><li>50 USD for the highest amount won in a single Elon Game or Pump &amp; Dump Game</li></ul>" />
          <FAQItem title="Can I lose any real money or crypto?" answer="No" />
          <FAQItem title="Who can I ask if I have any questions?" answer="You can come to our Discord channel and get answers for almost any question. <a href='https://discord.gg/VjYUYBKhTc' target='_blank' rel='noreferrer'>Join Discord</a>" />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.container, className)}>
      <h2>FAQ</h2>
      <div className={styles.faqContainer}>
        <FAQItem title="What is Wallfair?" answer="Wallfair is a Web 3.0 betting platform on (polygon) blockchain - anonymous, decentral and fun. You can have fun and make money in 3 simple ways: Creating own events (you get 10% on all trading volume), trading on other events (you can make up to 99,9% on your capital invested) or playing house games or over 500 external casino games." />
        <FAQItem title="How do I get started?" answer="You simply connect your metamask by clicking on “Connect” in the header. If you do not have MetaMask, please go do <a href='https://metamask.io' target='_blank' rel='noreferrer'>metamask.io</a> and install in your browser (works also on mobile, but it is way smoother on desktop)." />
        <FAQItem title="How to get money into the platform / deposited?" answer="You can convert your ETH, BTC, Litecoin into WFAIR deposits and can start making money within seconds. You do not need to sign up via email, verify your address etc. If you do not have crypto currency in your MetaMask, please buy WFAIR, ETH or MATIC in MetaMask. There are no deposit limits." />
        <FAQItem title="How do I get money out of the plattform / withdrawn?" answer="We are paying out wins in WFAIR instantly and around the clock with a daily limit of USD 1,500. There are no KYC or other delays. Simple as that." />
        <FAQItem title="Can I create events on anything or is there a limit?" answer="Every new event is reviewed by an independent moderator team to make sure the event has a clear objective outcome visible to the public, cannot be influenced by the creator and does not violate ethical rules." />
        <FAQItem title="How much does it cost to create an event?" answer="Creating an event costs nothing for now. You can create for free and get 10% of the overall traded volume. So sharing your event on social media and inviting friends is directly working into your pockets." />
        <FAQItem title="Is there a fee?" answer="Wallfair does not charge any fees on event trading, however 10% of the trading volume goes to the event creator." />
        <FAQItem title="How do you determine the outcome of an event?" answer="An independent event resolution team is currently resoluting events. Over time, we are moving this toward proof of stake / DAO governance. Any event outcome can be disputed and events can be reversed (meaning every user gets back his / her initial betting amount) for 24h after the resolution in case the outcome changes." />
        <FAQItem title="Where can I get fast support for any question?" answer="You can come to our Discord channel and get answers for almost any question instantly. <a href='https://discord.gg/VjYUYBKhTc' target='_blank' rel='noreferrer'>Join Discord</a>" />
      </div>
    </div>
  );
};

export default FAQ;