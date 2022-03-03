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
      event: 'placeBet',
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

export const trackCreateEvent = ({slug, ...dataLayerProps}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      eventTitle: slug,
      event: 'createEvent',
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

export const trackSignupPhone = ({...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      event: 'signUpPhone',
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
  autobet,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
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

export const trackElonCashout = ({ amount, multiplier, autobet, accumulated, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      accumulated,
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

export const trackElonStartAutobet = ({ amount, multiplier, autobet, profit, loss, wincrease, lincrease, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount, //bet amount
      multiplier, //attemp auto cashout at
      autobet, //autobet true/false
      profit, //stop on profit
      loss, //stop on loss
      wincrease, //on win inscrease
      lincrease, //on loss increase
      event: 'elongameStartAutobet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackElonStopAutobet = ({ amount, multiplier, autobet, profit, loss, wincrease, lincrease, accumulated, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount, //bet amount
      multiplier, //attemp auto cashout at
      autobet, //autobet true/false
      profit, //stop on profit
      loss, //stop on loss
      wincrease, //on win inscrease
      lincrease, //on loss increase
      accumulated,
      event: 'elongameStopAutobet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};


/* ALPACAWHEEL GAME CUSTOM EVENTS TRACKING */

export const trackAlpacaWheelPlaceBet = ({
  amount,
  multiplier,
  autobet,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
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

export const trackAlpacaWheelCashout = ({ amount, multiplier, accumulated, autobet, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      accumulated,
      event: 'alpacawheelCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackAlpacaWheelStartAutobet = ({ amount, multiplier, autobet, profit, loss, wincrease, lincrease, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount, //bet amount
      multiplier, //attemp auto cashout at
      autobet, //autobet true/false
      profit, //stop on profit
      loss, //stop on loss
      wincrease, //on win inscrease
      lincrease, //on loss increase
      event: 'alpacawheelStartAutobet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackAlpacaWheelStopAutobet = ({ amount, multiplier, autobet, profit, loss, wincrease, lincrease, accumulated, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount, //bet amount
      multiplier, //attemp auto cashout at
      autobet, //autobet true/false
      profit, //stop on profit
      loss, //stop on loss
      wincrease, //on win inscrease
      lincrease, //on loss increase
      accumulated,
      event: 'alpacawheelStopAutobet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};


// PLINKO

export const trackPlinkoPlaceBet = ({
  amount,
  multiplier,
  autobet,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      event: 'plinkoPlaceBet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackPlinkoCashout = ({ amount, multiplier, accumulated, autobet, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      accumulated,
      event: 'plinkoCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

// MINES

export const trackMinesPlaceBet = ({
  amount,
  mines,
  autobet,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      mines,
      autobet,
      event: 'minesPlaceBet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackMinesPlaceBetGuest = ({
  amount,
  mines,
  autobet,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      mines,
      autobet,
      event: 'minesPlaceBetGuest',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackMinesCashout = ({ amount, multiplier, accumulated, autobet, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      accumulated,
      event: 'minesCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

// PUMP AND DUMP

export const trackPumpDumpPlaceBet = ({
  amount,
  multiplier,
  autobet,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      event: 'pumpdumpPlaceBet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackPumpDumpPlaceBetGuest = ({
  amount,
  multiplier,
  autobet,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      event: 'pumpdumpPlaceBetGuest',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackPumpDumpCashout = ({ amount, multiplier, accumulated, autobet, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      accumulated,
      event: 'pumpdumpCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackPumpDumpCancelBet = ({ amount, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      event: 'pumpdumpCancelBet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackPumpDumpStartAutobet = ({ amount, multiplier, autobet, profit, loss, wincrease, lincrease, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount, //bet amount
      multiplier, //attemp auto cashout at
      autobet, //autobet true/false
      profit, //stop on profit
      loss, //stop on loss
      wincrease, //on win inscrease
      lincrease, //on loss increase
      event: 'pumpdumpStartAutobet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackPumpDumpStopAutobet = ({ amount, multiplier, autobet, profit, loss, wincrease, lincrease, accumulated, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount, //bet amount
      multiplier, //attemp auto cashout at
      autobet, //autobet true/false
      profit, //stop on profit
      loss, //stop on loss
      wincrease, //on win inscrease
      lincrease, //on loss increase
      accumulated,
      event: 'pumpdumpStopAutobet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackPumpDumpChangeAutoCashout = ({
  multiplier,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      multiplier,
      event: 'pumpdumpChangeAutoCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};


/* ALPACANNON */

export const trackAlpacannonPlaceBet = ({
  amount,
  multiplier,
  autobet,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      event: 'alpacannonPlaceBet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackAlpacannonPlaceBetGuest = ({
  amount,
  multiplier,
  ...dataLayerProps
}) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      event: 'alpacannonPlaceBetGuest',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackAlpacannonCashout = ({ amount, multiplier, accumulated, autobet, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount,
      multiplier,
      autobet,
      accumulated,
      event: 'alpacannonCashout',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackAlpacannonStartAutobet = ({ amount, multiplier, autobet, profit, loss, wincrease, lincrease, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount, //bet amount
      multiplier, //attemp auto cashout at
      autobet, //autobet true/false
      profit, //stop on profit
      loss, //stop on loss
      wincrease, //on win inscrease
      lincrease, //on loss increase
      event: 'alpacannonStartAutobet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};

export const trackAlpacannonStopAutobet = ({ amount, multiplier, autobet, profit, loss, wincrease, lincrease, accumulated, ...dataLayerProps }) => {
  const tagManagerArgs = {
    dataLayer: {
      ...dataLayerProps,
      amount, //bet amount
      multiplier, //attemp auto cashout at
      autobet, //autobet true/false
      profit, //stop on profit
      loss, //stop on loss
      wincrease, //on win inscrease
      lincrease, //on loss increase
      accumulated,
      event: 'alpacannonStopAutobet',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
};


/**********/
/* WALLET */
/**********/

// deprecated
export const trackWalletDepositTab = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletDepositTab',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// deprecated
export const trackWalletBuywfairTab = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletBuywfairTab',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// deprecated
export const trackWalletbuywithcryptoTab = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletBuywithcryptoTab',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// deprecated
export const trackWalletBuywfairLink = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletBuywfairLink',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// deprecated
export const trackWalletBuywithcryptoConfirm = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletBuywithcryptoConfirm',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// deprecated
export const trackWalletBuywithfiatRequest = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletBuywithfiatRequest',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}



// Track wallet deposit popup
export const trackWalletAddWfair = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletAddWfair',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// Track wallet buy wfair (deposit token)
export const trackWalletBuyWfair = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletBuyWfair',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// Track Wallet Icon on header
export const trackWalletIcon = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletIcon',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// Withdraw Button
export const trackWalletWithdraw = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletWithdraw',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// Click on Crypto Button
export const trackWalletBuyWithCryptoButton = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletBuyWithCryptoButton',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// Click on Buy USD/EUR Button 
export const trackWalletBuyWithFiatButton = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletBuyWithFiatButton',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// Click on Deposit Header Button 
export const trackWalletDepositIcon = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletDepositIcon',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// Connect Wallet Button
export const trackWalletConnect = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletConnect',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

// Proceed with fiat partner button
export const trackWalletFiatProceedPartner = () => {
  const tagManagerArgs = {
    dataLayer: {
      event: 'walletBuywithfiatProceed',
    },
  };

  TagManager.dataLayer(tagManagerArgs);
}

export default TagManager;
