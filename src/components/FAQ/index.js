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
        <FAQItem title="What is Wallfair?" answer="Wallfair is a decentralized betting platform on anything. Any user can create new events or bet on existing. It&apos;s like sports betting mixed with youtube." />
        <FAQItem title="Who can I ask if I have any questions?" answer="You can come to our Discord channel and get answers for almost any question. <a href='https://discord.gg/VjYUYBKhTc' target='_blank' rel='noreferrer'>Join Discord</a>" />
      </div>
    </div>
  );
};

export default FAQ;