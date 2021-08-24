import { makeActionCreator } from '../../helper/Store';

export const LeaderboardTypes = {
    FETCH_ALL:           'Leaderboard/FETCH_ALL',
    FETCH_ALL_FAILED:    'Leaderboard/FETCH_ALL_FAILED',
    FETCH_ALL_SUCCEEDED: 'Leaderboard/FETCH_ALL_SUCCEEDED',
    HANDLE_DRAWER:       'Leaderboard/HANDLE_DRAWER',
};

const fetchAll = makeActionCreator(
    LeaderboardTypes.FETCH_ALL,
    {
        skip: 0,
        limit: 10,
        fetchAfterCurrent: false,
        skipForCurrent: 0,
        limitForCurrent: 0,
    }
);

const fetchAllSucceeded = makeActionCreator(
    LeaderboardTypes.FETCH_ALL_SUCCEEDED,
    {
        leaderboard: null,
    },
);

const fetchAllFailed = makeActionCreator(
    LeaderboardTypes.FETCH_ALL_FAILED,
);

const handleDrawer = makeActionCreator(
    LeaderboardTypes.HANDLE_DRAWER,
    {
        open: true
    }
);

export const LeaderboardActions = {
    fetchAll,
    fetchAllSucceeded,
    fetchAllFailed,
    handleDrawer,
};