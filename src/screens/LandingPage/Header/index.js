import VideoPlayer from 'components/EmbedVideo/VideoPlayer';
import styles from './styles.module.scss';

const LandingPage = () => {
  return (
    <div className={styles.header}>
      <h6 className={styles.subHeading}>Join the ride.</h6>
      <h1 className={styles.mainHeading}>How it works for Normies</h1>
      <div className={styles.video}>
        <VideoPlayer
          video="https://files.wallfair.io/wallfair.mp4"
          controls={true}
          loop={true}
        />
      </div>
    </div>
  );
};

export default LandingPage;
