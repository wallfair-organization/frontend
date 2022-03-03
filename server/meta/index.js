const axios = require('axios').default;
const _ = require('lodash');

// default routes, set meta values for static pages
let meta = {
  '/': {
    title: 'Wallfair',
    description: 'Fair, Social, Decentralized',
    image: 'https://staking.wallfair.io/logo512y.png?v=3',
    keywords: 'Wallfair, betting, esports, crypto',
  },
  '/events/all': {
    title: 'Wallfair Events',
    description: 'Intense, high-paced and hilarious events for everyone',
    image: 'https://staking.wallfair.io/logo512y.png?v=3',
    keywords:
      'wallfair, events, news, sports, esports, gaming, crypto',
  },
  '/events': {
    title: 'Wallfair Events',
    description: 'Intense, high-paced and hilarious events for everyone',
    image: 'https://staking.wallfair.io/logo512y.png?v=3',
    keywords:
      'wallfair, events, news, sports, esports, gaming, crypto',
  },
  '/games/elon-game': {
    title: 'Wallfair Elon Game',
    description: 'To the Moon with Elon, big wins, tiny rocket',
    image: 'https://app.wallfair.io/images/seo/rosi-games-banner.png?v=3',
    keywords:
      'Wallfair, Casino, Games, Elon, Moon, Rocket, Crash, Crypto, Betting',
  },
  '/games/pump-dump': {
    title: 'Wallfair Pump & Dump Game',
    description: 'Earn more with Wallfair games, all day, everyday',
    image: 'https://app.wallfair.io/images/seo/pump-dump-banner.png?v=3',
    keywords:
      'wallfair, pump, dump, crash, Casino, Games, Crypto, Betting',
  },
  '/winners': {
    title: 'Wallfair',
    description: 'Create events, earn free tokens and have a chance to win 5,000 EUR',
    image: 'https://files.wallfair.io/share/winners-page.png',
    keywords:
      'wallfair, social, games, crypto, betting',
  },
  // '/games': {
  //   title: 'Wallfair Games',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/logo_512.png?v=3',
  //   keywords:
  //     'wallfair, casino, games betting, vegas, gambling, odds, roulette, crypto-casino',
  // },
  // '/games/alpaca-wheel': {
  //   title: 'Wallfair Alpaca Wheel',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/images/seo/alpacawheel-banner.png?v=3',
  //   keywords:
  //     'wallfair, Casino, Games, Wheel, Crypto, Betting',
  // },
  // '/games/plinko': {
  //   title: 'Wallfair Plinko Game',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/images/seo/plinko-banner.png?v=3',
  //   keywords:
  //     'wallfair, plinko, Casino, Games, Crypto, Betting',
  // },
  // '/games/mines': {
  //   title: 'Wallfair Mines Game',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/images/seo/alpaca-mines-banner.png?v=3',
  //   keywords:
  //     'wallfair, mines, minesweeper, Games, Crypto, Casino, Betting',
  // },
  // '/games/alpacannon': {
  //   title: 'Wallfair Alpacannon Game',
  //   description: 'Earn more with Wallfair games, all day, everyday',
  //   image: 'https://app.wallfair.io/images/seo/alpacannon-banner.png?v=3',
  //   keywords:
  //     'wallfair, dice, cannon, alpacannon, Games, Crypto, Casino, Betting',
  // },
};

module.exports = {
  // Append routes
  appendRoutes: async (apiPath, listPaths = []) => {
    for (let listCounter = 0; listCounter < listPaths.length; listCounter++) {
      // quering api to get data

      console.log(`${apiPath}${listPaths[listCounter]}`);
      const response = await axios.get(`${apiPath}${listPaths[listCounter]}`);


      if (response && response.data && response.data.events) {
        const dataKeys = Object.keys(response.data.events);
        dataKeys.forEach(key => {
          const singleEvent = response.data.events[key];
          const { slug, name, preview_image_url : previewImageUrl, bet, tags } = singleEvent;

          const eventTags = _.map(tags, 'name') || [];
          const keywordsToUse = eventTags.length
            ? eventTags.join(', ')
            : meta['/'].keywords;

          const eventSlug = '/trade/' + slug;
          meta[eventSlug] = {
            title: name.split("\"").join(""),
            description: name.split("\"").join(""),
            image: previewImageUrl || meta['/'].image,
            keywords: keywordsToUse,
          };
          // Getting data from bets
          if (bet) {
              const {
                market_question : marketQuestion,
                description,
                evidenceDescription,
                slug: betSlug,
              } = bet;
              meta[`${eventSlug}/${betSlug}`] = {
                title: marketQuestion.split("\"").join(""),
                description: description ? description.split("\"").join("") : evidenceDescription.split("\"").join(""),
                image: previewImageUrl || meta['/'].image,
                keywords: `bet, ${keywordsToUse}`,
              };
          }
        });
      }
    }
    return meta;
  },
  // Append routes
  appendRoutesForUser: async (apiPath, userId) => {
    console.log(apiPath);
    const response = await axios.get(apiPath);
    if (response && response.data) {
      let data = response.data;
      const userName = data['username'] || 'alpaca';
      const aboutMe =
        data['aboutMe'] ||
        'This user has not provided an about info yet. How boring!';
      const photoUrl =
        data['profilePicture'] || 'https://staking.wallfair.io/logo512y.png?v=3';
      const userTag = '/user/' + userId;
      meta[userTag] = {
        title: userName,
        description: aboutMe,
        image: photoUrl,
        keywords: 'wallfair, casino, users, profile, social, gaming, crypto',
      };
    }
    return meta;
  },
};
