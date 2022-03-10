import styles from '../styles.module.scss';
import classNames from 'classnames';
import FAQItem from '../FAQItem';

const WalletFAQ = ({className}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <h2>Wallet FAQs</h2>
      <div className={styles.faqContainer}>
        <FAQItem title="What is Wallfair?" answer="Wallfair is a decentralized betting platform on anything. Any user can create new events or bet on existing. It&apos;s like sports betting mixed with youtube." />
        <FAQItem title="Who can I ask if I have any questions?" answer="You can come to our Discord channel and get answers for almost any question. <a href='https://discord.gg/VjYUYBKhTc' target='_blank' rel='noreferrer'>Join Discord</a>" />
      </div>
    </div>
  );
};

export default WalletFAQ;