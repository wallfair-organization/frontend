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

export default TagManager;
