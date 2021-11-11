import styles from './styles.module.scss';

const GameOffline = () => (
  <div className={styles.preparingRound}>
    <div>
      <h2 className={styles.title}>Connecting to the game engine</h2>
      <div className={styles.description}>
        If this takes too long, try reloading the page
      </div>
    </div>
  </div>
);

export default GameOffline;
