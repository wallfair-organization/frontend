import { makeActionCreator } from '../../helper/Store';

export const EventTypes = {
  FETCH_ALL: 'Event/FETCH_ALL',
  FETCH_ALL_FAILED: 'Event/FETCH_ALL_FAILED',
  FETCH_ALL_SUCCEEDED: 'Event/FETCH_ALL_SUCCEEDED',
  FETCH_FILTERED: 'Event/FETCH_FILTERED',
  FETCH_FILTERED_SUCCESS: 'Event/FETCH_FILTERED_SUCCESS',
  FETCH_FILTERED_FAIL: 'Event/FETCH_FILTERED_FAIL',
  SET_DEFAULT_PARAMS_VALUES: 'Event/SET_DEFAULT_PARAMS_VALUES',
  RESET_DEFAULT_PARAMS_VALUES: 'Event/RESET_DEFAULT_PARAMS_VALUES',
  FETCH_HOME_EVENTS: 'Event/FETCH_HOME_EVENTS',
  FETCH_HOME_EVENTS_SUCCESS: 'Event/FETCH_HOME_EVENTS_SUCCESS',
  FETCH_HOME_EVENTS_FAIL: 'Event/FETCH_HOME_EVENTS_FAIL',
  FETCH_TAGS: 'Event/FETCH_TAGS',
  FETCH_TAGS_SUCCESS: 'Event/FETCH_TAGS_SUCCESS',
  FETCH_TAGS_FAIL: 'Event/FETCH_TAGS_FAIL',
  FETCH_HISTORY_CHART_DATA: 'Event/FETCH_HISTORY_CHART_DATA',
  FETCH_HISTORY_CHART_DATA_SUCCESS: 'Event/FETCH_HISTORY_CHART_DATA_SUCCESS',
  FETCH_HISTORY_CHART_FAIL: 'Event/FETCH_HISTORY_CHART_FAIL',
  UPDATE_CHART_PARAMS: 'Event/UPDATE_CHART_PARAMS',
  FETCH_NEWS_DATA: 'Event/FETCH_NEWS_DATA',
  FETCH_NEWS_DATA_SUCCESS: 'Event/FETCH_NEWS_DATA_SUCCESS',
  FETCH_NEWS_DATA_FAIL: 'Event/FETCH_NEWS_DATA_FAIL',
  CREATE_EVENT: 'Event/CREATE_EVENT',
  CREATE_EVENT_SUCCEEDED: 'Event/CREATE_EVENT_SUCCESS',
  CREATE_EVENT_FAILED: 'Event/CREATE_EVENT_FAIL',
  EDIT_EVENT: 'Event/EDIT_EVENT',
  EDIT_EVENT_SUCCEEDED: 'Event/EDIT_EVENT_SUCCESS',
  EDIT_EVENT_FAILED: 'Event/EDIT_EVENT_FAIL',
  DELETE_EVENT: 'Event/DELETE_EVENT',
  DELETE_EVENT_SUCCEEDED: 'Event/DELETE_EVENT_SUCCESS',
  DELETE_EVENT_FAILED: 'Event/DELETE_EVENT_FAIL',
};

const fetchAll = makeActionCreator(EventTypes.FETCH_ALL);

const fetchAllSucceeded = makeActionCreator(EventTypes.FETCH_ALL_SUCCEEDED, {
  events: null,
});

const fetchAllFailed = makeActionCreator(EventTypes.FETCH_ALL_FAILED);

// Live events (filtered)
const initiateFetchFilteredEvents = (params = {}) => {
  return {
    type: EventTypes.FETCH_FILTERED,
    payload: params,
  };
};
const fetchFilteredEventsSuccess = payload => ({
  type: EventTypes.FETCH_FILTERED_SUCCESS,
  payload,
});
const fetchFilteredEventsFail = () => ({
  type: EventTypes.FETCH_FILTERED_FAIL,
});

const setDefaultParamsValues = payload => ({
  type: EventTypes.SET_DEFAULT_PARAMS_VALUES,
  payload,
});

const resetDefaultParamsValues = payload => ({
  type: EventTypes.RESET_DEFAULT_PARAMS_VALUES,
  payload,
});

const fetchHomeEvents = makeActionCreator(EventTypes.FETCH_HOME_EVENTS, {
  eventType: null,
  state: null,
  category: null,
  deactivated: false,
  upcoming: false,
  page: null,
  count: null,
});

const fetchHomeEventsSuccess = makeActionCreator(
  EventTypes.FETCH_HOME_EVENTS_SUCCESS,
  {
    eventType: null,
    page: null,
    count: null,
    state: null,
    category: null,
    events: [],
  }
);

const fetchHomeEventsFail = makeActionCreator(
  EventTypes.FETCH_HOME_EVENTS_FAIL
);

const fetchTags = makeActionCreator(EventTypes.FETCH_TAGS, {
  params: {},
});

const fetchTagsSuccess = makeActionCreator(EventTypes.FETCH_TAGS_SUCCESS, {
  tags: [],
});

const fetchTagsFail = makeActionCreator(EventTypes.FETCH_TAGS_FAIL);

// HISTORY CHART DATA
const initiateFetchChartData = (betId, params = {}) => {
  return {
    type: EventTypes.FETCH_HISTORY_CHART_DATA,
    betId,
    params,
  };
};
const fetchChartDataSuccess = payload => ({
  type: EventTypes.FETCH_HISTORY_CHART_DATA_SUCCESS,
  payload,
});

const fetchChartDataFail = () => ({
  type: EventTypes.FETCH_HISTORY_CHART_FAIL,
});

const updateChartParams = (betId, params = {}) => ({
  type: EventTypes.UPDATE_CHART_PARAMS,
  betId,
  params,
});

// NEWS DATA
const initiateFetchNewsData = (params = {}) => {
  return {
    type: EventTypes.FETCH_NEWS_DATA,
    params,
  };
};
const fetchNewsDataSuccess = payload => ({
  type: EventTypes.FETCH_NEWS_DATA_SUCCESS,
  payload,
});
const fetchNewsDataFail = () => ({
  type: EventTypes.FETCH_NEWS_DATA_FAIL,
});

// EVENT CREATION
const createEvent = makeActionCreator(EventTypes.CREATE_EVENT, {
  event: null,
});
const createEventSuccess = makeActionCreator(
  EventTypes.CREATE_EVENT_SUCCEEDED,
  {
    event: null,
  }
);
const createEventFail = makeActionCreator(EventTypes.CREATE_EVENT_FAILED);

// EVENT EDIT
const editEvent = makeActionCreator(EventTypes.EDIT_EVENT, {
  eventId: null,
  event: null,
});
const editEventSuccess = makeActionCreator(EventTypes.EDIT_EVENT_SUCCEEDED, {
  event: null,
});
const editEventFail = makeActionCreator(EventTypes.EDIT_EVENT_FAILED);

// EVENT DELETION
const deleteEvent = makeActionCreator(EventTypes.DELETE_EVENT, {
  eventId: null,
});
const deleteEventSuccess = makeActionCreator(
  EventTypes.DELETE_EVENT_SUCCEEDED,
  {
    event: null,
  }
);
const deleteEventFail = makeActionCreator(EventTypes.DELETE_EVENT_FAILED);

export const EventActions = {
  fetchAll,
  fetchAllSucceeded,
  fetchAllFailed,
  initiateFetchFilteredEvents,
  fetchFilteredEventsSuccess,
  fetchFilteredEventsFail,
  setDefaultParamsValues,
  resetDefaultParamsValues,
  fetchHomeEvents,
  fetchHomeEventsSuccess,
  fetchHomeEventsFail,
  fetchTags,
  fetchTagsSuccess,
  fetchTagsFail,
  initiateFetchChartData,
  fetchChartDataSuccess,
  fetchChartDataFail,
  initiateFetchNewsData,
  fetchNewsDataSuccess,
  fetchNewsDataFail,
  updateChartParams,
  createEvent,
  createEventSuccess,
  createEventFail,
  editEvent,
  editEventSuccess,
  editEventFail,
  deleteEvent,
  deleteEventSuccess,
  deleteEventFail,
};
