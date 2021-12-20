import styles from './styles.module.scss';
import AuthenticationType from './AuthenticationType';
import Register from './Register';
import Login from './Login';
import EmailSignUp from './Register/EmailSignUp';
import SocialLogin from './SocialLogin';

const Authentication = ({
  authenticationType,
  preloadEmailSignUp
}) => {

  const renderSocialLogin = (disabled = false) => (
    <div className={styles.dontHaveAnAccount}>
      <p>continue with social links</p>
      <SocialLogin styles={styles} disabled={disabled} authenticationType={AuthenticationType.register} />
    </div>
  );

  return {
    [AuthenticationType.register]: 
        <EmailSignUp styles={styles} renderSocialLogin={renderSocialLogin} />
      ,
    [AuthenticationType.login]: 
      <Login styles={styles} />
  }[authenticationType] || ''
};

export default Authentication;
