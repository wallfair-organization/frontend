import _ from 'lodash';
import { convert } from '../../helper/Currency';
import { selectCurrency } from './authentication';

export const selectTotalUsers = state => {
  return state.leaderboard.leaderboard.total;
};
export const selectLeaderboard = state => {
  const currency = selectCurrency(state);
  const leaderboard = state.leaderboard.leaderboard;
  const currentUser = leaderboard.currentUser;

  return {
    ...leaderboard,
    currentUser: {
      ...currentUser,
      amountWon: convert(_.get(currentUser, 'amountWon', 0), currency),
      toNextRank: convert(_.get(currentUser, 'toNextRank', 0), currency),
    },
    users: _.map(leaderboard.users, user => {
      return {
        ...user,
        amountWon: convert(_.get(user, 'amountWon', 0), currency),
      };
    }),
    usersWithCurrent: _.map(leaderboard.usersWithCurrent, user => {
      return {
        ...user,
        amountWon: convert(_.get(user, 'amountWon', 0), currency),
      };
    }),
  };
};
