const axios = require('axios').default;
const _ = require('lodash');

// default routes, set meta values for static pages
let meta = {
  '/': {
    title: 'Alpacasino',
    description: 'Fair, Social, Decentralized',
    image: 'https://alpacasino.io/logo_512.png?v=3',
    keywords: 'alpacasino, casino, betting, esports, crypto',
  },
  '/live-events/all': {
    title: 'Alpacasino Live Events',
    description: 'High Energy, Live events',
    image: 'https://alpacasino.io/logo_512.png?v=3',
    keywords: 'alpacasino, casino, live, events, betting, esports, gaming',
  },
  '/live-events': {
    title: 'Alpacasino Live Events',
    description: 'Fast Paced Live-Events',
    image: 'https://alpacasino.io/logo_512.png?v=3',
    keywords:
      'alpacasino, casino, live, events, esports, crypto, gaming, sports, betting',
  },
  '/events/all': {
    title: 'Alpacasino Events',
    description: 'Intense, high-paced and hilarious events for everyone',
    image: 'https://alpacasino.io/logo_512.png?v=3',
    keywords:
      'alpacasino, casino, events, politics, news, sports, esports, gaming, crypto',
  },
  '/events': {
    title: 'Alpacasino Events',
    description: 'Will Harris take the 2024 US Election?',
    image: 'https://alpacasino.io/logo_512.png?v=3',
    keywords:
      'Alpacasino, Casino, Events, Harris, Biden, Trump, Crypto, Esports, Sports, Gaming',
  },
  '/games': {
    title: 'Alpacasino Games',
    description: 'Earn more with Alpacasino games, all day, everyday',
    image: 'https://alpacasino.io/logo_512.png?v=3',
    keywords:
      'alpacasino, casino, games betting, vegas, gambling, odds, roulette, crypto-casino',
  },
  '/games/elon-game': {
    title: 'Alpacasino Elon Game',
    description: 'To the Moon with Elon, big wins, tiny rocket',
    image: 'https://alpacasino.io/rosi-games-banner.png?v=3',
    keywords:
      'alpacasino, Casino, Games, Elon, Moon, Rocket, Crypto, Casino, Betting',
  },
  '/games/alpaca-wheel': {
    title: 'Alpacasino Alpaca Wheel',
    description: 'Earn more with Alpacasino games, all day, everyday',
    image: 'https://alpacasino.io/logo_512.png?v=3',
    keywords:
      'alpacasino, Casino, Games, Wheel, Rocket, Crypto, Casino, Betting',
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
  // Append routes
  appendRoutesForUser: async (apiPath, userId) => {
    const response = await axios.get(apiPath);
    if (response && response.data) {
      let data = response.data;
      const userName = data['username'] || 'alpaca';
      const aboutMe =
        data['aboutMe'] ||
        'This user has not provided an about info yet. How boring!';
      const photoUrl =
        data['profilePicture'] || 'https://alpacasino.io/logo_192.png';
      const userTag = '/user/' + userId;
      meta[userTag] = {
        title: userName,
        description: aboutMe,
        image: photoUrl,
        keywords: 'alpacasino, casino, users, profile, social, gaming, crypto',
      };
    }
    return meta;
  },
};
