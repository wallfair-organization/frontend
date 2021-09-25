import Authentication from 'components/Authentication';
import styles from './styles.module.scss';

const AuthenticationPopup = ({ authenticationType }) => {
  return (
    <div className={styles.registration}>
      <Authentication authenticationType={authenticationType} />
    </div>
  );
};

export default AuthenticationPopup;
