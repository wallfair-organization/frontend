const axios = require('axios').default;
const _ = require('lodash');

// default routes, set meta values for static pages
let meta = {
  '/': {
    title: 'Wallfair.',
    description: 'The first Casino with no Bullshit',
    image: 'https://main.wallfair.io/logo192.png',
    keywords: 'wallfair, casino',
  },
  '/live-events/all': {
    title: 'Wallfair Live Events',
    description: 'The first Casino with no Bullshit',
    image: 'https://main.wallfair.io/logo192.png',
    keywords: 'wallfair, casino, live, events',
  },
  '/live-events': {
    title: 'Wallfair Live Events',
    description: 'The first Casino with no Bullshit',
    image: 'https://main.wallfair.io/logo192.png',
    keywords: 'wallfair, casino, live, events',
  },
  '/events/all': {
    title: 'Wallfair Events',
    description: 'The first Casino with no Bullshit',
    image: 'https://main.wallfair.io/logo192.png',
    keywords: 'wallfair, casino, events',
  },
  '/events': {
    title: 'Wallfair Events',
    description: 'The first Casino with no Bullshit',
    image: 'https://main.wallfair.io/logo192.png',
    keywords: 'wallfair, casino, events',
  },
  '/games': {
    title: 'Wallfair Games',
    description: 'The first Casino with no Bullshit',
    image: 'https://main.wallfair.io/logo192.png',
    keywords: 'wallfair, casino, games',
  },
  '/games/rosi-game': {
    title: 'Wallfair Rosi Game',
    description: 'The first Casino with no Bullshit',
    image:
      'https://main.wallfair.io/static/media/rosi-games-banner.18d1e81c.png',
    keywords: 'wallfair, casino, games, rosi',
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
