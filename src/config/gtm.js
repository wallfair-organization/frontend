import TagManager from 'react-gtm-module';

export const initTagManager = () => {
  if (!process.env.REACT_APP_GTM_ID) {
    console.log('Google Tag Manager ID not configured!');
    return;
  }

  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
  };

  TagManager.initialize(tagManagerArgs);
};

export const dataLayerPush = dataLayerProps => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackPageView = dataLayerProps => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      pageUrl: window.location.href,
      event: 'virtualPageview',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackNonstreamedEventPlaceTrade = dataLayerProps => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      pageUrl: window.location.href,
      event: 'nonstreamedEventPlaceTrade',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackApproveCashout = dataLayerProps => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      event: 'approveCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackSignup = ({ method, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      method,
      event: 'signUp',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

/* ELON GAME CUSTOM EVENTS TRACKING */

export const trackElonChangeAutoCashout = ({
  multiplier,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      multiplier,
      event: 'elongameChangeAutoCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackElonPlaceBet = ({
  amount,
  multiplier,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      event: 'elongamePlaceBet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackElonPlaceBetGuest = ({
  amount,
  multiplier,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      event: 'elongamePlaceBetGuest',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackElonCashout = ({ amount, multiplier, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      event: 'elongameCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackElonCancelBet = ({ amount, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      event: 'elongameCancelBet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};


/* ALPACAWHEEL GAME CUSTOM EVENTS TRACKING */

export const trackAlpacaWheelPlaceBet = ({
  amount,
  multiplier,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      event: 'alpacawheelPlaceBet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackAlpacaWheelPlaceBetGuest = ({
  amount,
  multiplier,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      event: 'alpacawheelPlaceBetGuest',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackAlpacaWheelCashout = ({ amount, multiplier, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      event: 'alpacawheelCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export default TagManager;
