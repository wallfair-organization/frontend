const { GAMES } = require('../constants/Games');
const _ = require('lodash');

export const getGameById = gameTypeId => {
  return _.find(GAMES, { id: gameTypeId });
};
