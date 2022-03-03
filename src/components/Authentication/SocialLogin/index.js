import classNames from 'classnames';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';
import Icon from 'components/Icon';
import IconType from 'components/Icon/IconType';
import { useEffect, useState } from 'react';
import AuthenticationType from '../AuthenticationType';
import { useSocialLogins } from './useSocialLogins';

const LoginButton = ({ children, onClick, styles, disabled }) => (
  <Button
    onClick={onClick}
    className={classNames(styles.signInButton)}   
    theme={ButtonTheme.secondaryButtonLight} 
    // disabled={disabled}
  >
    {children}
  </Button>
);

const SocialLogin = ({ styles, prepend = [], signUp = true, authenticationType, disabled, validateInput }) => {
  const {
    initGoogleLogin,
    initFacebookLogin,
    initTwitchLogin,
    initDiscordLogin,
    isVisible
  } = useSocialLogins();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const cb = () => {
      const isSmall = window.innerWidth < 768;
      if (isMobile !== isSmall) {
        setIsMobile(isSmall);
      }
    };
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
  }, [])

  const iconProps = {
    className: styles.buttonIcon,
  };
  const isRegistration = authenticationType === AuthenticationType.register

  const login = (provider, ToSAccepted) => () => {
    signUp && validateInput({tosOnly: true});

    return !disabled && {
      'google': initGoogleLogin,
      'facebook': initFacebookLogin,
      'twitch': initTwitchLogin,
      'discord': initDiscordLogin,
    }[provider]({tosAccepted: ToSAccepted});
  }

  const showLarge = (signUp && !isMobile);

  return (
    <div
      className={classNames(
        styles.socialContainer,
        showLarge && styles.verticalContainer
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
        (showLarge ? (
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
          <Button
            theme={ButtonTheme.secondaryButtonLight}
            className={styles.socialCircleButton}
            onClick={(event) => {
              login('google', isRegistration)();
              event.preventDefault();
            }}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.google}
              {...iconProps}
            />
          </Button>
        ))}
      {isVisible.twitch &&
        (showLarge ? (
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
          <Button
            theme={ButtonTheme.secondaryButtonLight}
            className={styles.socialCircleButton}
            onClick={(event) => {
              login('twitch', isRegistration)();
              event.preventDefault();
            }}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.twitch}
              {...iconProps}
            />
          </Button>
        ))}
      {isVisible.discord &&
        (showLarge ? (
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
          <Button
            theme={ButtonTheme.secondaryButtonLight}
            className={styles.socialCircleButton}
            onClick={(event) => {
              login('discord', isRegistration)();
              event.preventDefault();
            }}
            disabled={disabled}
          >
            <Icon
              className={styles.socialIcon}
              iconType={IconType.discord}
              {...iconProps}
            />
          </Button>
        ))}
    </div>
  );
};

export default SocialLogin;
