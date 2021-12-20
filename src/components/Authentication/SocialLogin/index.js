import classNames from 'classnames';
import Button from 'components/Button';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import AuthenticationType from '../AuthenticationType';
import { useSocialLogins } from './useSocialLogins';

const LoginButton = ({ children, onClick, styles, disabled }) => (
  <Button
    onClick={onClick}
    className={classNames(styles.signInButton)}    
    disabled={disabled}
  >
    {children}
  </Button>
);

const SocialLogin = ({ styles, prepend = [], signUp = true, authenticationType, disabled }) => {
  const {
    initGoogleLogin,
    initFacebookLogin,
    initTwitchLogin,
    initDiscordLogin,
    isVisible
  } = useSocialLogins();

  const showNewFeatures =
    process.env.REACT_APP_SHOW_UPCOMING_FEATURES === 'true';
  const iconProps = {
    className: styles.buttonIcon,
  };
  const isRegistration = authenticationType === AuthenticationType.register
  const prefixText = isRegistration ? "Sign up" : "Login";

  const login = (provider, ToSAccepted) => () => {
    return !disabled && {
      'google': initGoogleLogin,
      'facebook': initFacebookLogin,
      'twitch': initTwitchLogin,
      'discord': initDiscordLogin,
    }[provider]({tosAccepted: ToSAccepted});
  }

  return (
    <div
      className={classNames(
        styles.socialContainer,
        signUp && styles.verticalContainer
      )}
    >
      {prepend.map(({ content, onClick }) => (
        <LoginButton
          styles={styles}
          onClick={onClick}
          className={classNames(
            styles.loginButton,
            disabled && styles.disabled
          )}
        >
          {content}
        </LoginButton>
      ))}
      {isVisible.google && 
        (signUp ? (
          <LoginButton
            styles={styles}
            onClick={login('google', isRegistration)}
            signUp={signUp}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.google}
              {...iconProps}
            />
            <p>Sign up with Google</p>
          </LoginButton>
        ) : (
          <button
            className={styles.socialCircleButton}
            onClick={login('google', isRegistration)}>
            <Icon
              className={styles.socialIcon}
              iconType={IconType.google}
              {...iconProps}
            />
          </button>
        ))
      }
      {isVisible.twitch && 
        (signUp ? (
          <LoginButton
            styles={styles}
            onClick={login('twitch', isRegistration)}
            signUp={signUp}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.twitch}
              {...iconProps}
            />
            <p>Sign up with Twitch</p>
          </LoginButton>
        ) : (
          <button
            className={styles.socialCircleButton}
            onClick={login('twitch', isRegistration)}>
            <Icon
              className={styles.socialIcon}
              iconType={IconType.twitch}
              {...iconProps}
            />
          </button>
        ))
      }
      {isVisible.discord && 
        (signUp ? (
          <LoginButton
            styles={styles}
            onClick={login('discord', isRegistration)}
            signUp={signUp}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.discord}
              {...iconProps}
            />
            <p>Sign up with Discord</p>
          </LoginButton>
        ) : (
          <button
            className={styles.socialCircleButton}
            onClick={login('discord', isRegistration)}>
            <Icon
              className={styles.socialIcon}
              iconType={IconType.discord}
              {...iconProps}
            />
          </button>
        ))
      }
    </div>
  );
};

export default SocialLogin;
