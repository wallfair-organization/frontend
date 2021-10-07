import VideoPlayer from 'components/EmbedVideo/VideoPlayer';
import styles from './styles.module.scss';
import SocialIcons from 'components/SocialIcons';

const LandingPage = () => {
  return (
    <div className={styles.header}>
      <h6 className={styles.subHeading}>Join the ride.</h6>
      <h1 className={styles.mainHeading}>Betting Reimagined</h1>
      <div className={styles.slogan}>Clear, Social &amp; Fair</div>

      <SocialIcons className={styles.socialIcons} />

      <div className={styles.video}>
        <VideoPlayer
          video="https://files.wallfair.io/wallfair.mp4"
          controls={true}
          loop={true}
        />
      </div>

      <div className={styles.howdoesitwork}>So how does it all work?</div>
    </div>
  );
};

export default LandingPage;
