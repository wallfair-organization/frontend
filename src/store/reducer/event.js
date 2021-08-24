import update from 'immutability-helper';
import { EventTypes } from '../actions/event';

const STREAMED = 'streamed';
const NONSTREAMED = 'non-streamed';

const initialState = {
    events: [],
    filteredEvents: [],
    tags: [],
    homeEvents: {
        [STREAMED]: [],
        [NONSTREAMED]: [],
    },
    defaultParams: {
        type: 'all',
        category: 'all',
        count: '30',
        page: '1',
        sortBy: 'name',
        searchQuery: '',
    },
    eventSortOptions: [
        {
            label: 'Alphabetically (A-Z)',
            value: 'name',
        },
        {
            label: 'Alphabetically (Z-A)',
            value: '-name',
        },
        {
            label: 'End date (newest first)',
            value: 'date',
        },
        {
            label: 'End date (oldest first)',
            value: '-date',
        },
    ],
};

const fetchAllSucceeded = (action, state) => {
    return update(state, {
        events: {
            $set: action.events,
        },
    });
};

const setFilteredEvents = (state, { payload }) => {
    return {
        ...state,
        filteredEvents: payload,
    };
};

const setDefaultParamsValues = (state, { payload }) => {
    return {
        ...state,
        defaultParams: {
            ...state.defaultParams,
            ...payload,
        },
    };
};

const resetDefaultParamsValues = (state, { payload }) => {
    return {
        ...state,
        defaultParams: {
            type: 'all',
            category: 'all',
            count: '30',
            page: '1',
            sortBy: 'name',
            searchQuery: '',
        },
    };
};

const fetchHomeEventsSuccess = (action, state) => {
    return {
        ...state,
        homeEvents: {
            ...state.homeEvents,
            [action.eventType]: action.events
        },
    }
};

const fetchTagsSuccess = (action, state) => {
    if (!action.tags) return {...state};

    return {
        ...state,
        tags: action.tags,
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        // @formatter:off
        case EventTypes.FETCH_ALL_SUCCEEDED:
            return fetchAllSucceeded(action, state);
        case EventTypes.FETCH_FILTERED_SUCCESS:
            return setFilteredEvents(state, action);
        case EventTypes.SET_DEFAULT_PARAMS_VALUES:
            return setDefaultParamsValues(state, action);
        case EventTypes.RESET_DEFAULT_PARAMS_VALUES:
            return resetDefaultParamsValues(state, action);
        case EventTypes.FETCH_HOME_EVENTS_SUCCESS:
            return fetchHomeEventsSuccess(action, state);
        case EventTypes.FETCH_TAGS_SUCCESS:
            return fetchTagsSuccess(action, state);
        default:
            return state;
        // @formatter:on
    }
}
