import _ from 'lodash';
import update from 'immutability-helper';
import { UserTypes } from '../actions/user';

export const initialState = {
  users: {},
};

const fetchSucceeded = (action, state) => {
  const user = action.user;
  const userId = _.get(user, 'userId');

  return update(state, {
    users: {
      [userId]: {
        $set: user,
      },
    },
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case UserTypes.FETCH_SUCCEEDED:
      return fetchSucceeded(action, state);
    default:
      return state;
    // @formatter:on
  }
}
