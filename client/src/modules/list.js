import { GET, POST, DELETE, PUT } from '../lib/request';

/**
 * Actions
 */
const FETCH_LISTS = 'lists/FETCH_LISTS';
const FETCH_LISTS_SUCCESS = 'lists/FETCH_LISTS_SUCCESS';
const FETCH_LISTS_FAIL = 'lists/FETCH_LISTS_FAIL';
const CREATE_LIST = 'lists/CREATE_LIST';
const CREATE_LIST_SUCCESS = 'lists/CREATE_LIST_SUCCESS';
const CREATE_LIST_FAIL = 'lists/CREATE_LIST_FAIL';
const EDIT_LIST = 'lists/EDIT_LIST';
const EDIT_LIST_SUCCESS = 'lists/EDIT_LIST_SUCCESS';
const EDIT_LIST_FAIL = 'lists/EDIT_LIST_FAIL';
const DELETE_LIST = 'lists/DELETE_LIST';
const DELETE_LIST_SUCCESS = 'lists/DELETE_LIST_SUCCESS';
const DELETE_LIST_FAIL = 'lists/DELETE_LIST_FAIL';
const ADD_LISTS = 'lists/ADD_LISTS';
const CHANGE_LIST = 'lists/CHANGE_LIST';
const REMOVE_LIST = 'lists/REMOVE_LIST';
const SELECT_LIST = 'lists/SELECT_LIST';

const initialState = {
  fetching: false,
  fetchingError: null,
  creating: false,
  creatingError: null,
  editing: false,
  editingError: null,
  deleting: false,
  deletingError: null,
  lists: [],
  selectedList: null
};

/**
 * Reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return {
        ...state,
        fetching: true
      };

    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchingError: null,
        lists: action.result
      };

    case FETCH_LISTS_FAIL:
      return {
        ...state,
        fetching: false,
        fetchingError: action.result
      };

    case CREATE_LIST:
      return {
        ...state,
        creating: true
      };

    case CREATE_LIST_SUCCESS:
      return {
        ...state,
        creating: false,
        creatingError: null
      };

    case CREATE_LIST_FAIL:
      return {
        ...state,
        creating: false,
        creatingError: action.result
      };

    case EDIT_LIST:
      return {
        ...state,
        editing: true
      };

    case EDIT_LIST_SUCCESS:
      return {
        ...state,
        editing: false,
        editingError: null
      };
    case EDIT_LIST_FAIL:
      return {
        ...state,
        editing: false,
        editingError: action.result
      };
    case DELETE_LIST:
      return {
        ...state,
        deleting: false
      };

    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        deleting: false,
        deletingError: null
      };

    case DELETE_LIST_FAIL:
      return {
        ...state,
        deleting: false,
        deletingError: action.result
      };

    case ADD_LISTS:
      return {
        ...state,
        lists: [...state.lists, action.result]
      };

    case CHANGE_LIST: {
      const index = state.lists.findIndex(list => list.id === action.result.id);
      return {
        ...state,
        lists: [
          ...state.lists.slice(0, index),
          { ...state.lists[index], ...action.result },
          ...state.lists.slice(index + 1)
        ]
      };
    }

    case SELECT_LIST: {
      const selectedList = state.lists.find(
        list => list.id === Number(action.result)
      );
      return {
        ...state,
        selectedList
      };
    }

    case REMOVE_LIST: {
      const index = state.lists.findIndex(list => list.id === action.result);
      return {
        ...state,
        lists: [...state.lists.slice(0, index), ...state.lists.slice(index + 1)]
      };
    }

    default:
      return state;
  }
};

/**
 * Action Creators
 */

const addLists = lists => ({
  type: ADD_LISTS,
  result: lists
});

const changeList = list => ({
  type: CHANGE_LIST,
  result: list
});

const removeList = list => ({
  type: REMOVE_LIST,
  result: list
});

export const selectList = list => ({
  type: SELECT_LIST,
  result: list
});

const fetching = () => ({
  type: FETCH_LISTS
});

const fetchingSuccess = lists => ({
  type: FETCH_LISTS_SUCCESS,
  result: lists
});

const fetchingError = error => ({
  type: FETCH_LISTS_FAIL,
  result: error
});

export const fetchLists = () => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(fetching());
    try {
      const userId = getState().auth.user.id;
      const response = await GET({
        url: `/api/user/${userId}/list`,
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

const creating = () => ({
  type: CREATE_LIST
});

const creatingSuccess = () => ({
  type: CREATE_LIST_SUCCESS
});

const creatingFail = () => ({
  type: CREATE_LIST_FAIL
});

export const create = ({ title }) => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(creating());
    try {
      const userId = getState().auth.user.id;
      const response = await POST({
        url: `/api/user/${userId}/list`,
        auth: {
          token: localStorage.token,
          userid: localStorage.userid
        },
        body: { title }
      });
      const result = await response.json();
      dispatch(creatingSuccess());
      dispatch(addLists(result));
      resolve(response);
    } catch (e) {
      dispatch(creatingFail(e));
      reject(e);
    }
  });

const deleting = () => ({
  type: DELETE_LIST
});

const deletingSuccess = () => ({
  type: DELETE_LIST_SUCCESS
});

const deletingFail = () => ({
  type: DELETE_LIST_FAIL
});

export const deleteList = id => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(deleting());
    try {
      const userId = getState().auth.user.id;
      const selectedId = getState().list.selectedList.id;
      const response = await DELETE({
        url: `/api/user/${userId}/list/${id}`,
        auth: {
          token: localStorage.token,
          userid: localStorage.userid
        }
      });
      dispatch(deletingSuccess());
      dispatch(removeList(id));
      const { lists } = getState().list;
      if (selectedId === id && lists[0]) {
        dispatch(selectList(lists[0].id));
      }
      resolve(response);
    } catch (e) {
      dispatch(deletingFail(e));
      reject(e);
    }
  });

const editing = () => ({
  type: EDIT_LIST
});

const editingSuccess = () => ({
  type: EDIT_LIST_SUCCESS
});

const editingFail = () => ({
  type: EDIT_LIST_FAIL
});

export const editList = list => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(editing());
    try {
      const userId = getState().auth.user.id;
      const selectedId = getState().list.selectedList.id;
      const { id, ...body } = list;
      const response = await PUT({
        url: `/api/user/${userId}/list/${id}`,
        auth: {
          token: localStorage.token,
          userid: localStorage.userid
        },
        body
      });
      dispatch(editingSuccess());
      dispatch(changeList(list));
      if (selectedId === list.id) {
        dispatch(selectList(list.id));
      }
      resolve(response);
    } catch (e) {
      dispatch(editingFail(e));
      reject(e);
    }
  });
