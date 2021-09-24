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
        let dataKeys = Object.keys(response.data);
        dataKeys.forEach(key => {
          let singleEvent = response.data[key];
          let { slug, name, previewImageUrl, bets, tags } = singleEvent;
          let keywordsToUse = _.map(tags, 'name');
          let eventSlug = '/trade/' + slug;
          meta[eventSlug] = {
            title: name,
            description: name,
            image: previewImageUrl ? previewImageUrl : meta['/'].image,
            keywords:
              keywordsToUse && keywordsToUse.length
                ? keywordsToUse.join(', ')
                : meta['/'].keywords,
          };
          // Getting data from bets
          if (bets) {
            keywordsToUse.unshift('bets');
            bets.forEach(singleBet => {
              let {
                marketQuestion,
                description,
                evidenceDescription,
                slug: betSlug,
              } = singleBet;
              meta[`${eventSlug}/${betSlug}`] = {
                title: marketQuestion,
                description: description ? description : evidenceDescription,
                image: previewImageUrl ? previewImageUrl : meta['/'].image,
                keywords:
                  keywordsToUse && keywordsToUse.length
                    ? keywordsToUse.join(', ')
                    : meta['/'].keywords,
              };
            });
          }
        });
      }
    }
    return meta;
  },
};
