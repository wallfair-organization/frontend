const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { appendRoutes, appendRoutesForUser } = require('./meta');
const { replaceMeta } = require('./utils/replaceMetaUtil');

// set main PORT
const PORT = process.env.PORT || 3000;
// set API path
const apiEventsPath = process.env.REACT_APP_EVENTS_SERVICE_URL || 'https://events-staging.wallfair.io/';
const apiBackendPath = process.env.REACT_APP_BACKEND_URL || 'https://staging-api.alpacasino.io/';

// set apiEndpoints which you want to get data from and make them dynamic
//ACTIVE,RESOLVED,CANCELLED,CLOSED,WAITING_RESOLUTION,DISPUTED;
const listPaths = [
  'events/market-events?categories=all&statuses=ACTIVE&limit=200',
  'events/market-events?categories=all&statuses=RESOLVED,CANCELLED,CLOSED,WAITING_RESOLUTION,DISPUTED&limit=200',
];
const listPathForUser = 'api/user/';

const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');

appendRoutes(apiEventsPath, listPaths).then(meta => {
  const routes = Object.keys(meta);
  routes.forEach(r => {
    app.get(r, (req, res) => {
      let route = req.originalUrl;
      const indexFile = fs.readFileSync(indexPath, 'utf8');
      let data = route in meta ? meta[route] : meta['/']; 
      res.send(replaceMeta(indexFile, data));
    });
  });

  // in case of new events
  app.get('/trade/:eventSlug?/:betSlug?', (req, res) => {
    appendRoutes(apiEventsPath, listPaths).then(updatedMeta => {
      const indexFile = fs.readFileSync(indexPath, 'utf8');
      console.log(updatedMeta);
      let data = updatedMeta[req.path] ? updatedMeta[req.path] : meta['/'];
      res.send(replaceMeta(indexFile, data));
    }).catch(err => {
      console.error(err);
    });
  });

  // in case of users
  app.get('/user/:userId?', (req, res) => {
    let userId = req.params.userId;
    let userApiPath = `${apiBackendPath}${listPathForUser}${userId}/info`;
    appendRoutesForUser(userApiPath, userId).then(updatedMeta => {
      const indexFile = fs.readFileSync(indexPath, 'utf8');
      let data = updatedMeta[req.path] ? updatedMeta[req.path] : meta['/'];
      res.send(replaceMeta(indexFile, data));
    });
  });

  app.use(
    express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
  );

  // in case of missing routes
  app.get('*', (req, res) => {
    const indexFile = fs.readFileSync(indexPath, 'utf8');
    let data = meta['/'];
    res.send(replaceMeta(indexFile, data));
  });

  app.listen(PORT, console.log(`Server running on port ${PORT}`));
});
