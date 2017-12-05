import { GET } from '../lib/request';

/**
 * Actions
 */
const FETCH_ACTIVITIES = 'activities/FETCH_ACTIVITIES';
const FETCH_ACTIVITIES_SUCCESS = 'activities/FETCH_ACTIVITIES_SUCCESS';
const FETCH_ACTIVITIES_FAIL = 'activities/FETCH_ACTIVITIES_FAIL';

const initialState = {
  fetching: false,
  fetchingError: null,
  activities: []
};

/**
 * Reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        fetching: true
      };

    case FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchingError: null,
        activities: action.result
      };

    case FETCH_ACTIVITIES_FAIL:
      return {
        ...state,
        fetching: false,
        fetchingError: action.result
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */

const fetching = () => ({
  type: FETCH_ACTIVITIES
});

const fetchingSuccess = activities => ({
  type: FETCH_ACTIVITIES_SUCCESS,
  result: activities
});

const fetchingError = error => ({
  type: FETCH_ACTIVITIES_FAIL,
  result: error
});

export const fetchActivities = listId => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(fetching());
    try {
      const userId = getState().auth.user.id;
      const response = await GET({
        url: `/api/user/${userId}/list/${listId}/activity`,
        auth: {
          token: localStorage.token,
          userid: localStorage.userid
        }
      });
      const result = await response.json();
      dispatch(fetchingSuccess(result));
      resolve(response);
    } catch (e) {
      dispatch(fetchingError(e));
      reject(e);
    }
  });
