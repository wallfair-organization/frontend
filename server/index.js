const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { meta } = require('./meta/tags');

const PORT = process.env.PORT || 3000;

const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');
const routes = Object.keys(meta);
routes.forEach(route => {
  app.get(route, (req, res) => {
    const indexFile = fs.readFileSync(indexPath, 'utf8');
    let data = route in meta ? meta[route] : meta['/'];
    const toHydrate = indexFile
      .replace(/__title__/g, data.title)
      .replace(/__description__/g, data.description)
      .replace(/__image__/g, data.image);
    res.send(toHydrate);
  });
});

// in case of missing routes
app.get('*', (req, res) => {
  const indexFile = fs.readFileSync(indexPath, 'utf8');
  let data = meta['/'];
  const toHydrate = indexFile
    .replace(/__title__/g, data.title)
    .replace(/__description__/g, data.description)
    .replace(/__image__/g, data.image);
  res.send(toHydrate);
});

app.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
