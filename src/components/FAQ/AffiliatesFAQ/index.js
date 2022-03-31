import styles from '../styles.module.scss';
import classNames from 'classnames';
import FAQItem from '../FAQItem';

const AffiliatesFAQ = ({className}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <h2>FAQs</h2>
      <div className={styles.faqContainerAffiliates}>
        <FAQItem title="What is Wallfair Affiliates?" answer="Wallfair Affiliates is a program where we give you the opportunity to earn money every month simply by giving us the chance to welcome more players through our virtual doors." />
        <FAQItem title="How do I make money?" answer="Two ways: by inviting players to join your channel and by inviting other affiliates to your platform (10% of all bets from their streams will be assigned to you in form of WFAIR tokens)" />
        <FAQItem title="How much does it cost to join?" answer="Absolutely nothing. It's 100% free." />
        <FAQItem title="How do I join?" answer="To join Wallfair Affiliates and start earning today, all you have to do is signup on our affiliate website. After having your account activated, you will be able to start." />
        <FAQItem title="How are players connected to my affiliate?" answer="Every time a player clicks through to the Wallfair Platform from one of your links or banners, something called a cookie is placed on their computer. This means that when they register, we can see your unique code and will be able to assign that player to your affiliate account. You'll then earn a revenue share every time that player is active at Wallfair." />
        <FAQItem title="How do I get a banner for my affiliate website?" answer="Please contact us." />
        <FAQItem title="Who can I ask if I have any questions?" answer="You can come to our Discord channel and get answers for almost any question. <a href='https://discord.gg/VjYUYBKhTc' target='_blank' rel='noreferrer'>Join Discord</a>" />
      </div>
    </div>
  );
};

export default AffiliatesFAQ;