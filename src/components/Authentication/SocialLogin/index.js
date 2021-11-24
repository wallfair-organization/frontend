import Button from 'components/Button';
import HighlightTheme from 'components/Highlight/HighlightTheme';
import HighlightType from 'components/Highlight/HighlightType';
import Icon from 'components/Icon';
import IconTheme from 'components/Icon/IconTheme';
import IconType from 'components/Icon/IconType';
import { useSocialLogins } from './useSocialLogins';

const LoginButton = ({ children, onClick, styles }) => (
  <Button
    onClick={onClick}
    withoutBackground={true}
    highlightType={HighlightType.highlightModalButton}
    highlightTheme={HighlightTheme.fillPink}
    className={styles.signInButton}
    disabledWithOverlay={true}
  >
    {children}
  </Button>
);

const SocialLogin = ({ styles, prepend = [], type }) => {
  const { initGoogleLogin, initFacebookLogin } = useSocialLogins();
  const iconProps = {
    className: styles.buttonIcon,
  };

  if (process.env.REACT_APP_SHOW_UPCOMING_FEATURES !== 'true') {
    return null;
  }

  return (
    <>
      {
        prepend.map(({ content, onClick }) => (
          <LoginButton styles={styles} onClick={onClick}>
            {content}
          </LoginButton>
        ))
      }
      <LoginButton styles={styles} onClick={initGoogleLogin}>
        <Icon iconType={IconType.google} {...iconProps} />
        <span>{type === 'registration' ? 'Sign up' : 'Login'} with Google</span>
      </LoginButton>
      {/* <LoginButton styles={styles} onClick={initFacebookLogin}>
        <Icon iconType={IconType.facebook} {...iconProps} />
        <span>Login with Facebook</span>
      </LoginButton> */}
    </>
  );
};

export default SocialLogin;
