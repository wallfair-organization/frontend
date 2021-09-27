const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { appendRoutes } = require('./meta');
const { replaceMeta } = require('./utils/replaceMetaUtil');

// set main PORT
const PORT = process.env.PORT || 3000;
// set API path
const apiPath =
  process.env.REACT_APP_BACKEND_URL ||
  'https://staging-zeaec.ondigitalocean.app/';

// set apiEndpoints which you want to get data from and make them dynamic
const listPaths = ['api/event/list'];

const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');

appendRoutes(apiPath, listPaths).then(meta => {
  const routes = Object.keys(meta);
  routes.forEach(route => {
    app.get(route, (req, res) => {
      const indexFile = fs.readFileSync(indexPath, 'utf8');
      let data = route in meta ? meta[route] : meta['/'];
      res.send(replaceMeta(indexFile, data));
    });
  });

  // in case of new events
  app.get('/trade/:eventSlug?/:betSlug?', (req, res) => {
    appendRoutes(apiPath, listPaths).then(updatedMeta => {
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
