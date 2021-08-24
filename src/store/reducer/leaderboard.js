import update         from 'immutability-helper';
import { act } from 'react-dom/test-utils';
import { LeaderboardTypes } from '../actions/leaderboard';
import user from './user';

const initialState = {
    leaderboard: {
        currentUser: {
            _id: null,
            username: null,
            rank: null,
            amountWon: null,
            toNextRank: null
        },
        users: [],
        usersWithCurrent: [],
        total: 0,
        page: 0,
        perPage: 0,
        openDrawer: false,
    },
};

const findUser = (userList, id) => {
    return userList.find(u => u._id === id);
}

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
        let overlap = user || users[users.length - 1].rank === usersWithCurrent[0].rank - 1;

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
        }
    };
};

const handleDrawer = (action, state) => {
    return {
        ...state,
        leaderboard: {
            ...state.leaderboard,
            openDrawer: action.open
        }
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case LeaderboardTypes.FETCH_ALL_SUCCEEDED: return fetchAllSucceeded(action, state);
        case LeaderboardTypes.HANDLE_DRAWER:         return handleDrawer(action, state);
        default:                                   return state;
        // @formatter:on
    }
}