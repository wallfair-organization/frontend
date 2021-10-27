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
  chartData: [],
  chartParams: {
    rangeType: 'hour',
    rangeValue: '24',
    direction: 'BUY',
  },
  newsData: {
    data: [],
  },
};

const fetchAllSucceeded = (action, state) => {
  return update(state, {
    events: {
      $set: action.events.map(e => ({ ...e, bookmarks: e.bookmarks || [] })),
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
      [action.eventType]: {
        ...state.homeEvents[action.eventType],
        [action.state]: action.events,
      },
    },
  };
};

const fetchTagsSuccess = (action, state) => {
  if (!action.tags) return { ...state };

  return {
    ...state,
    tags: action.tags,
  };
};

const fetchHistoryChartSuccess = (state, { payload }) => {
  return {
    ...state,
    chartData: payload,
  };
};

const updateChartParams = (state, action) => {
  return update(state, {
    chartParams: {
      $set: action.params,
    },
  });
};

const fetchNewsDataSuccess = (state, { payload }) => {
  return {
    ...state,
    newsData: payload,
  };
};

const bookmarkEvent = (state, { eventId, userId }) => {
  const idx = state.events.findIndex(event => event._id === eventId);
  const fidx = state.filteredEvents.findIndex(event => event._id === eventId);
  const bookmarks = [...state.events[idx]?.bookmarks, userId];
  if (idx > -1 && userId) {
    return update(state, {
      events: {
        [idx]: {
          bookmarks: { $set: bookmarks },
        },
      },
      filteredEvents: {
        [fidx]: {
          bookmarks: { $set: bookmarks },
        },
      },
    });
  }
  return state;
};

const bookmarkEventCancel = (state, { eventId, userId }) => {
  const idx = state.events.findIndex(event => event._id === eventId);
  const fidx = state.filteredEvents.findIndex(event => event._id === eventId);
  const bookmarks = (state.events[idx]?.bookmarks || []).filter(
    uid => uid !== userId
  );

  if (idx > -1 && userId) {
    return update(state, {
      events: {
        [idx]: {
          bookmarks: {
            $set: bookmarks,
          },
        },
      },
      filteredEvents: {
        [fidx]: {
          bookmarks: {
            $set: bookmarks,
          },
        },
      },
    });
  }
  return state;
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
    case EventTypes.FETCH_HISTORY_CHART_DATA_SUCCESS:
      return fetchHistoryChartSuccess(state, action);
    case EventTypes.UPDATE_CHART_PARAMS:
      return updateChartParams(state, action);
    case EventTypes.FETCH_NEWS_DATA_SUCCESS:
      return fetchNewsDataSuccess(state, action);
    case EventTypes.FETCH_HOME_EVENTS_SUCCESS:
      return fetchHomeEventsSuccess(action, state);
    case EventTypes.FETCH_TAGS_SUCCESS:
      return fetchTagsSuccess(action, state);
    case EventTypes.BOOKMARK_EVENT_INIT:
      return bookmarkEvent(state, action);
    case EventTypes.BOOKMARK_EVENT_FAILED:
      return bookmarkEventCancel(state, action);
    case EventTypes.BOOKMARK_EVENT_CANCEL_INIT:
      return bookmarkEventCancel(state, action);
    case EventTypes.BOOKMARK_EVENT_CANCEL_FAILED:
      return bookmarkEvent(state, action);
    default:
      return state;
    // @formatter:on
  }
}
