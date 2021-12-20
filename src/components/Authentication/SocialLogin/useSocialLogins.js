import { useMemo } from "react";
import { useLocation } from "react-router";

const initOAuthFlow = ({baseUrl, clientId, redirectUri, scope, state}) => {
  document.location.href = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
};
const enc = encodeURIComponent;
const redirectFactory = (provider) => enc(`${process.env.REACT_APP_URL}/oauth/${provider}`);

export const useSocialLogins = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const ref = params.get('ref');
  const init = (provider, payload) => initOAuthFlow({
    ...payload,
    redirectUri: redirectFactory(provider),
    state: enc(JSON.stringify({
      ...payload.state,
      ref: ref || null,
    }))
  });
  return {
    isVisible: {
      google: !!process.env.REACT_APP_GOOGLE_CLIENT_ID,
      facebook: !!process.env.REACT_APP_FACEBOOK_CLIENT_ID,
      twitch: false, //!!process.env.REACT_APP_TWITCH_CLIENT_ID && !!process.env.REACT_APP_SHOW_UPCOMING_FEATURES,
      discord: !!process.env.REACT_APP_DISCORD_CLIENT_ID,
    },
    initGoogleLogin: (state = {}) =>
      init('google', {
        state,
        baseUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        clientId: enc(process.env.REACT_APP_GOOGLE_CLIENT_ID),
        scope: enc(
          'https://www.googleapis.com/auth/user.birthday.read email profile'
        ),
      }),
    initFacebookLogin: (state = {}) =>
      init('facebook', {
        state,
        baseUrl: 'https://www.facebook.com/v12.0/dialog/oauth',
        clientId: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
        scope: enc('user_birthday,email'),
      }),
    initTwitchLogin: (state = {}) =>
      init('twitch', {
        state,
        baseUrl: 'https://id.twitch.tv/oauth2/authorize',
        clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
        scope: enc('user:read:email'),
      }),
    initDiscordLogin: (state = {}) =>
      init('discord', {
        state,
        baseUrl: 'https://discord.com/api/oauth2/authorize',
        clientId: process.env.REACT_APP_DISCORD_CLIENT_ID,
        scope: enc('identify email'),
      }),
  };
};
