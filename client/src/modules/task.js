import { GET, POST, PUT, DELETE } from '../lib/request';

/**
 * Actions
 */
const FETCH_TASKS = 'tasks/FETCH_TASKS';
const FETCH_TASKS_SUCCESS = 'tasks/FETCH_TASKS_SUCCESS';
const FETCH_TASKS_FAIL = 'tasks/FETCH_TASKS_FAIL';
const CREATE_TASKS = 'tasks/CREATE_TASKS';
const CREATE_TASKS_SUCCESS = 'tasks/CREATE_TASKS_SUCCESS';
const CREATE_TASKS_FAIL = 'tasks/CREATE_TASKS_FAIL';
const DELETE_TASKS = 'tasks/DELETE_TASKS';
const DELETE_TASKS_SUCCESS = 'tasks/DELETE_TASKS_SUCCESS';
const DELETE_TASKS_FAIL = 'tasks/DELETE_TASKS_FAIL';
const EDIT_TASKS = 'tasks/EDIT_TASKS';
const EDIT_TASKS_SUCCESS = 'tasks/EDIT_TASKS_SUCCESS';
const EDIT_TASKS_FAIL = 'tasks/EDIT_TASKS_FAIL';
const ADD_TASK = 'tasks/ADD_TASK';
const REMOVE_TASK = 'tasks/REMOVE_TASK';
const CHANGE_LIST = 'tasks/CHANGE_LIST';

const initialState = {
  fetching: false,
  fetchingError: null,
  creating: false,
  creatingError: null,
  deleting: false,
  deletingError: null,
  editing: false,
  editingError: null,
  tasks: []
};

/**
 * Reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        fetching: true
      };

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchingError: null,
        tasks: action.result
      };

    case FETCH_TASKS_FAIL:
      return {
        ...state,
        fetching: false,
        fetchingError: action.result
      };

    case CREATE_TASKS:
      return {
        ...state,
        creating: true
      };

    case CREATE_TASKS_SUCCESS:
      return {
        ...state,
        creating: false,
        creatingError: null
      };

    case CREATE_TASKS_FAIL:
      return {
        ...state,
        creating: false,
        creatingError: action.result
      };

    case DELETE_TASKS:
      return {
        ...state,
        deleting: true
      };

    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        deleting: false,
        deletingError: null
      };

    case DELETE_TASKS_FAIL:
      return {
        ...state,
        deleting: false,
        deletingError: action.result
      };

    case EDIT_TASKS:
      return {
        ...state,
        editing: true
      };

    case EDIT_TASKS_SUCCESS:
      return {
        ...state,
        editing: false,
        editingError: null
      };

    case EDIT_TASKS_FAIL:
      return {
        ...state,
        editing: false,
        editingError: action.result
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.result]
      };

    case CHANGE_LIST: {
      const index = state.tasks.findIndex(task => task.id === action.result.id);
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, index),
          { ...state.tasks[index], ...action.result },
          ...state.tasks.slice(index + 1)
        ]
      };
    }
    case REMOVE_TASK: {
      const index = state.tasks.findIndex(task => task.id === action.result);
      return {
        ...state,
        tasks: [...state.tasks.slice(0, index), ...state.tasks.slice(index + 1)]
      };
    }

    default:
      return state;
  }
};

/**
 * Action Creators
 */

const addTask = task => ({
  type: ADD_TASK,
  result: task
});

const changeTask = list => ({
  type: CHANGE_LIST,
  result: list
});

const removeTask = taskId => ({
  type: REMOVE_TASK,
  result: taskId
});

const fetching = () => ({
  type: FETCH_TASKS
});

const fetchingSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  result: tasks
});

const fetchingError = error => ({
  type: FETCH_TASKS_FAIL,
  result: error
});

export const fetchTasks = listId => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(fetching());
    try {
      const userId = getState().auth.user.id;
      const response = await GET({
        url: `/api/user/${userId}/list/${listId}`,
        auth: {
          token: localStorage.token,
          userid: localStorage.userid
        }
      });
      const result = await response.json();
      dispatch(fetchingSuccess(result ? result.Tasks : []));
      resolve(response);
    } catch (e) {
      dispatch(fetchingError(e));
      reject(e);
    }
  });

const creating = () => ({
  type: CREATE_TASKS
});

const creatingSuccess = () => ({
  type: CREATE_TASKS_SUCCESS
});

const creatingFail = () => ({
  type: CREATE_TASKS_FAIL
});

export const create = ({ title }) => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(creating());
    try {
      const userId = getState().auth.user.id;
      const { selectedList } = getState().list;
      const response = await POST({
        url: `/api/user/${userId}/list/${selectedList.id}/task`,
        auth: {
          token: localStorage.token,
          userid: localStorage.userid
        },
        body: { title }
      });
      const result = await response.json();
      dispatch(creatingSuccess());
      dispatch(addTask(result));
      resolve(response);
    } catch (e) {
      dispatch(creatingFail(e));
      reject(e);
    }
  });

const deleting = () => ({
  type: DELETE_TASKS
});

const deletingSuccess = () => ({
  type: DELETE_TASKS_SUCCESS
});

const deletingFail = () => ({
  type: DELETE_TASKS_FAIL
});

export const deleteTask = id => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(deleting());
    try {
      const userId = getState().auth.user.id;
      const { selectedList } = getState().list;
      const response = await DELETE({
        url: `/api/user/${userId}/list/${selectedList.id}/task/${id}`,
        auth: {
          token: localStorage.token,
          userid: localStorage.userid
        }
      });
      dispatch(deletingSuccess());
      dispatch(removeTask(id));
      resolve(response);
    } catch (e) {
      dispatch(deletingFail(e));
      reject(e);
    }
  });

const editing = () => ({
  type: EDIT_TASKS
});

const editingSuccess = () => ({
  type: EDIT_TASKS_SUCCESS
});

const editingError = () => ({
  type: EDIT_TASKS_FAIL
});

export const editTask = task => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(editing());
    try {
      const userId = getState().auth.user.id;
      const { selectedList } = getState().list;
      const { id, title, done } = task;
      const response = await PUT({
        url: `/api/user/${userId}/list/${selectedList.id}/task/${id}`,
        auth: {
          token: localStorage.token,
          userid: localStorage.userid
        },
        body: { title, done }
      });
      dispatch(editingSuccess());
      dispatch(changeTask(task));
      resolve(response);
    } catch (e) {
      dispatch(editingError(e));
      reject(e);
    }
  });
