nvm use 14.17.3
REACT_APP_NEWS_API_KEY=dcc5a2750201e19f396c43f98d1d07f0 REACT_APP_CRASH_GAME_BACKEND_URL=crash-game-backend REACT_APP_BACKEND_URL=http://backend-k8s.wallfair.io REACT_APP_NEWS_API_SSL_MODE=true npm run build

doctl registry login
docker build . -t registry.digitalocean.com/wallfair/k8s-frontend
docker push registry.digitalocean.com/wallfair/k8s-frontend
