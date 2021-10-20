import { LeaderboardTypes } from '../actions/leaderboard';

const initialState = {
  leaderboard: {
    currentUser: {
      _id: null,
      username: null,
      rank: null,
      amountWon: null,
      toNextRank: null,
    },
    users: [],
    usersWithCurrent: [],
    usersWithSelected: [],
    total: 0,
    page: 0,
    perPage: 0,
    openDrawer: false,
  },
};

const findUser = (userList, id) => {
  return userList.find(u => u._id === id);
};

const fetchAllSucceeded = (action, state) => {
  let users = [];
  let usersWithCurrent = action.leaderboard.usersWithCurrent;
  let currentUserSkip = action.leaderboard.skipForCurrent;

  if (usersWithCurrent && usersWithCurrent.length > 0) {
    usersWithCurrent = usersWithCurrent.map(user => {
      currentUserSkip += 1;
      return {
        ...user,
        rank: currentUserSkip,
      };
    });
  }

  if (action.leaderboard.skip === 0) {
    users = action.leaderboard.users;
  } else if (action.leaderboard.skip === state.leaderboard.skip) {
    users = state.leaderboard.users;
  } else {
    if (action.leaderboard.fetchAfterOnly) {
      users = action.leaderboard.users;
    } else {
      users = [...state.leaderboard.users, ...action.leaderboard.users];
    }
  }

  users = users.map((user, index) => {
    return {
      ...user,
      rank: index + 1,
    };
  });

  if (usersWithCurrent.length > 0) {
    let user = findUser(users, usersWithCurrent[0]._id);
    let overlap =
      user || users[users.length - 1].rank === usersWithCurrent[0].rank - 1;

    if (overlap) {
      usersWithCurrent.forEach(u => {
        if (!users.find(user => user._id === u._id)) {
          users.push(u);
        }
      });
      usersWithCurrent = [];
    }
  }

  return {
    ...state,
    leaderboard: {
      ...state.leaderboard,
      ...action.leaderboard,
      users,
      usersWithCurrent,
    },
  };
};

const handleDrawer = (action, state) => {
  return {
    ...state,
    leaderboard: {
      ...state.leaderboard,
      openDrawer: action.open,
    },
  };
};

const fetchByUserSuccess = (action, state) => {
  const usersState = state.leaderboard.usersWithSelected;
  const users = action.users;
  let skip = action.skip;

  let usersWithSelected = users.map(user => {
    skip += 1;
    const mapped = {
      ...user,
      rank: skip,
    };
    return mapped;
  });

  return {
    ...state,
    leaderboard: {
      ...state.leaderboard,
      usersWithSelected: action.paginate
        ? [...usersState, ...usersWithSelected]
        : usersWithSelected,
    },
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case LeaderboardTypes.FETCH_ALL_SUCCEEDED:
      return fetchAllSucceeded(action, state);
    case LeaderboardTypes.HANDLE_DRAWER:
      return handleDrawer(action, state);
    case LeaderboardTypes.FETCH_BY_USER_SUCCESS:
      return fetchByUserSuccess(action, state);
    default:
      return state;
    // @formatter:on
  }
}
