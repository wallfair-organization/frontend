import LOADER from '../../data/icons/loader.svg';
// import Logo from '../Logo';
import styles from './styles.module.scss';

const Loader = ({ withHeader = false }) => {
  if (withHeader) {
    return (
      <div className={styles.withHeader}>
        {/* <Logo /> */}
        <div className={styles.loading}>
          <img src={LOADER} alt={`Loading`} />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.loading}>
      <img src={LOADER} alt={`Loading`} />
    </div>
  );
};

export default Loader;
