import styles from './styles.module.scss';
import classNames from 'classnames';

const Disclaimer = ({ className = '' }) => {
  return (
    <div className={classNames(styles.lightbox, className)}>
      <div className={styles.content}>
        <p>Disclaimer</p>
        <p>
          Wallfair.io serves informational, entertainment and educational
          purposes only. We neither plan to take custody of any user's or
          participant's fiat or cryptocurrency assets nor to host any events
          that have not been prepared by or agreed with the team of Wallfair. We
          use the Ethereum blockchain smart contracts as a tool for both
          visualizing data and market trends from on-chain activity, and
          interacting with the users directly. The users need to be of age (18+)
          and sound body and mind (meaning unaffected by addiction or substances
          causing loss of control or consciousness) to use the website. The
          participation in the events and trades on the website is voluntary and
          final and the availability of the platform may be affected by the
          online connection enabled by your local internet provider. All
          questions and doubts can be addressed to the team at{' '}
          <a href="mailto:hello@wallfair.io">hello@wallfair.io</a>.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
