const axios = require('axios').default;
const _ = require('lodash');

// default routes, set meta values for static pages
let meta = {
  '/': {
    title: 'Wallfair.',
    description: 'Betting Reimagined',
    image: 'https://main.wallfair.io/logo192.png',
    keywords: 'wallfair, casino, betting, esports, crypto',
  },
  '/live-events/all': {
    title: 'Wallfair Live Events',
    description: 'High Energy, Live events',
    image: 'https://main.wallfair.io/logo192.png',
    keywords: 'wallfair, casino, live, events, betting, esports, gaming',
  },
  '/live-events': {
    title: 'Wallfair Live Events',
    description: 'Fast Paced Live-Events',
    image: 'https://main.wallfair.io/logo192.png',
    keywords:
      'wallfair, casino, live, events, esports, crypto, gaming, sports, betting',
  },
  '/events/all': {
    title: 'Wallfair Events',
    description: 'Intense, high-paced and hilarious events for everyone',
    image: 'https://main.wallfair.io/logo192.png',
    keywords:
      'wallfair, casino, events, politics, news, sports, esports, gaming, crypto',
  },
  '/events': {
    title: 'Wallfair Events',
    description: 'Will Harris take the 2024 US Election?',
    image: 'https://main.wallfair.io/logo192.png',
    keywords:
      'Wallfair, Casino, Events, Harris, Biden, Trump, Crypto, Esports, Sports, Gaming',
  },
  '/games': {
    title: 'Wallfair Games',
    description: 'Earn more with Wallfair games, all day, everyday',
    image: 'https://main.wallfair.io/logo192.png',
    keywords:
      'wallfair, casino, games betting, vegas, gambling, odds, roulette, crypto-casino',
  },
  '/games/elon-game': {
    title: 'Wallfair Elon Game',
    description: 'To the Moon with Elon, big wins, tiny rocket',
    image:
      'https://main.wallfair.io/static/media/rosi-games-banner.18d1e81c.png',
    keywords:
      'Wallfair, Casino, Games, Elon, Moon, Rocket, Crypto, Casino, Betting',
  },
};

module.exports = {
  // Append routes
  appendRoutes: async (apiPath, listPaths = []) => {
    for (let listCounter = 0; listCounter < listPaths.length; listCounter++) {
      // quering api to get data
      const response = await axios.get(`${apiPath}${listPaths[listCounter]}`);
      if (response && response.data) {
        const dataKeys = Object.keys(response.data);
        dataKeys.forEach(key => {
          const singleEvent = response.data[key];
          const { slug, name, previewImageUrl, bets, tags } = singleEvent;

          const eventTags = _.map(tags, 'name') || [];
          const keywordsToUse = eventTags.length
            ? eventTags.join(', ')
            : meta['/'].keywords;

          const eventSlug = '/trade/' + slug;
          meta[eventSlug] = {
            title: name,
            description: name,
            image: previewImageUrl || meta['/'].image,
            keywords: keywordsToUse,
          };
          // Getting data from bets
          if (bets) {
            bets.forEach(singleBet => {
              const {
                marketQuestion,
                description,
                evidenceDescription,
                slug: betSlug,
              } = singleBet;
              meta[`${eventSlug}/${betSlug}`] = {
                title: marketQuestion,
                description: description ? description : evidenceDescription,
                image: previewImageUrl || meta['/'].image,
                keywords: `bets, ${keywordsToUse}`,
              };
            });
          }
        });
      }
    }
    return meta;
  },
};
