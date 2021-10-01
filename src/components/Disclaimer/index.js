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
          that have not been prepared by or agreed with the team of Wallfair.
          The users need to be of age (18+) and sound body and mind (meaning
          unaffected by addiction or substances causing loss of control or
          consciousness) to use the website. The participation in the events and
          trades on the website is voluntary and final and the availability of
          the platform may be affected by the online connection enabled by your
          local internet provider. All questions and doubts can be addressed to
          the team at <a href="mailto:hello@wallfair.io">hello@wallfair.io</a>.
        </p>
        <p>
          Wallfair Ltd. is a company organized in accordance with the laws of
          Bailwick of Guernsey (Alderney), registration number 2024, located at
          2 Victoria Street, St. Anne, GY9 3UF, Alderney Channel Islands.
        </p>
        <p>
          Wallfair Ltd. has pending applications for gambling licenses with the
          Alderney Gambling Control Commission and the Curacao Gaming Authority.
          Curacao Gaming licensing and supervision is controlled by the
          Government of Curacao under National Decree No. 14 from 18. August
          1998 while the applicable law on Alderney is the Gambling Law of 1999.
          Under these licensing ordinances, the license applicant/holder is
          authorized to advertise and provide services in such countries and
          territories that have issued own gambling regulations or have been
          blacklisted by the regulatory authorities. Wallfair Ltd. is closely
          observing the applicability of the licensing regulations and taking
          all measures with the purpose to comply with the applicable legal
          requirements. All further questions and doubts can be addressed to the
          team at <a href="mailto:hello@wallfair.io">hello@wallfair.io</a>
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
