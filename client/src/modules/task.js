/** @module client/modules/task */
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
const FILTER_BY_ARCHIVED = 'tasks/FILTER_BY_ARCHIVED';
const FILTER_BY_UNARCHIVED = 'tasks/FILTER_BY_UNARCHIVED';
const FILTER_BY_ALL = 'tasks/FILTER_BY_ALL';
const FILTER_BY_UNDONE = 'tasks/FILTER_BY_UNDONE';
const FILTER_BY_DONE = 'tasks/FILTER_BY_DONE';

/**
 * @namespace Task Estado da aplicação que envolve as Tarefas
 * @property {boolean} fetching Indicador de que está buscando tarefas
 * @property {Object} fetchingError Erros ao buscar tarefas
 * @property {boolean} creating Indicador de que está criando tarefas
 * @property {Object} creatingError Erros ao criar tarefas
 * @property {boolean} editing Indicador de que está editando tarefas
 * @property {Object} editingError Erros ao editar tarefas
 * @property {boolean} deleting Indicador de que está deletando tarefas
 * @property {Object} deletingError Erros ao deletar tarefas
 * @property {module:api/models/task~Task[]} tasks Array das tarefas na aplicação
 * @property {string} filter Filtro que está sendo usado na Lista de tarefas
 */
const initialState = {
  fetching: false,
  fetchingError: null,
  creating: false,
  creatingError: null,
  deleting: false,
  deletingError: null,
  editing: false,
  editingError: null,
  filter: 'UNARCHIVED',
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

    case FILTER_BY_ALL:
      return {
        ...state,
        filter: 'ALL'
      };

    case FILTER_BY_UNARCHIVED:
      return {
        ...state,
        filter: 'UNARCHIVED'
      };

    case FILTER_BY_ARCHIVED:
      return {
        ...state,
        filter: 'ARCHIVED'
      };

    case FILTER_BY_UNDONE:
      return {
        ...state,
        filter: 'UNDONE'
      };

    case FILTER_BY_DONE:
      return {
        ...state,
        filter: 'DONE'
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */

/**
 * Ação muda filtro para todos
 * @function filterByAll
 * @return {Object} Objeto Ação do tipo FILTER_BY_ALL
 */
export const filterByAll = () => ({
  type: FILTER_BY_ALL
});

/**
 * Ação muda filtro para arquivados
 * @function filterByArchived
 * @return {Object} Objeto Ação do tipo FILTER_BY_ARCHIVED
 */
export const filterByArchived = () => ({
  type: FILTER_BY_ARCHIVED
});

/**
 * Ação muda filtro para não arquivados
 * @function filterByUnarchived
 * @return {Object} Objeto Ação do tipo FILTER_BY_UNARCHIVED
 */
export const filterByUnarchived = () => ({
  type: FILTER_BY_UNARCHIVED
});

/**
 * Ação muda filtro para concluidos
 * @function filterByDone
 * @return {Object} Objeto Ação do tipo FILTER_BY_DONE
 */
export const filterByDone = () => ({
  type: FILTER_BY_DONE
});

/**
 * Ação muda filtro para não concluidos
 * @function filterByUndone
 * @return {Object} Objeto Ação do tipo FILTER_BY_UNDONE
 */
export const filterByUndone = () => ({
  type: FILTER_BY_UNDONE
});

/**
 * Ação adiciona uma tarefa para a lista de tarefas
 * @function addLists
 * @param {module:api/models/task~Task} task Tarefa a ser adicionada
 * @return {Object} Objeto Ação do tipo ADD_TASK
 */
const addTask = task => ({
  type: ADD_TASK,
  result: task
});

/**
 * Ação altera uma tarefa na lista de tarefas
 * @function changeTask
 * @param {module:api/models/task~Task} task Tarefa a ser alterada
 * @return {Object} Objeto Ação do tipo CHANGE_LIST
 */
const changeTask = task => ({
  type: CHANGE_LIST,
  result: task
});

/**
 * Ação remove uma tarefa na lista de tarefas
 * @function changeTask
 * @param {string} taskId ID da Tarefa a ser removida
 * @return {Object} Objeto Ação do tipo REMOVE_TASK
 */
const removeTask = taskId => ({
  type: REMOVE_TASK,
  result: taskId
});

/**
 * Ação indica que tarefas estão sendo buscadas
 * @function fetching
 * @return {Object} Objeto Ação do tipo FETCH_TASKS
 */
const fetching = () => ({
  type: FETCH_TASKS
});

/**
 * Ação indica que tarefas foram buscadas com sucesso
 * @function fetchingSuccess
 * @param {module:api/models/task~Task[]} tasks Array de Tarefas buscadas
 * @return {Object} Objeto Ação do tipo FETCH_TASKS_SUCCESS
 */
const fetchingSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  result: tasks
});

/**
 * Ação indica que ocorreu um erro ao buscar tarefas
 * @function fetchingError
 * @param {object} error Objeto de erro da api
 * @return {Object} Objeto Ação do tipo FETCH_TASKS_FAIL
 */
const fetchingError = error => ({
  type: FETCH_TASKS_FAIL,
  result: error
});

/**
 * Busca as tarefas do usuário autenticado dado um listId
 * @function fetchTasks
 * @param {string} listId Id da lista dona das tarefas
 */
export const fetchTasks = listId => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(fetching());
    try {
      const userId = getState().auth.user.id;
      const response = await GET({
        url: `/api/user/${userId}/list/${listId}/task`,
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

/**
 * Ação indica que tarefa está sendo criada
 * @function creating
 * @return {Object} Objeto Ação do tipo CREATE_TASKS
 */
const creating = () => ({
  type: CREATE_TASKS
});

/**
 * Ação indica que tarefa foi criada com sucesso
 * @function creatingSuccess
 * @return {Object} Objeto Ação do tipo CREATE_TASKS_SUCCESS
 */
const creatingSuccess = () => ({
  type: CREATE_TASKS_SUCCESS
});

/**
 * Ação indica que ocorreu um erro ao criar tarefa
 * @function creatingFail
 * @return {Object} Objeto Ação do tipo CREATE_TASKS_FAIL
 */
const creatingFail = () => ({
  type: CREATE_TASKS_FAIL
});

/**
 * Cria uma tarefa a partir da lista selecionada e do usuário autenticado
 * @function create
 * @param {object} body Corpo da requisição
 * @param {object} body.tile Titulo da tarefa
 */
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

/**
 * Ação indica que tarefa está sendo deletada
 * @function deleting
 * @return {Object} Objeto Ação do tipo DELETE_TASKS
 */
const deleting = () => ({
  type: DELETE_TASKS
});

/**
 * Ação indica que tarefa foi deletada com sucesso
 * @function deletingSuccess
 * @return {Object} Objeto Ação do tipo DELETE_TASKS_SUCCESS
 */
const deletingSuccess = () => ({
  type: DELETE_TASKS_SUCCESS
});

/**
 * Ação indica que ocorreu um erro ao deletar tarefa
 * @function deletingFail
 * @return {Object} Objeto Ação do tipo DELETE_TASKS_FAIL
 */
const deletingFail = () => ({
  type: DELETE_TASKS_FAIL
});

/**
 * Deleta um tarefa dada a lista selecionada e o
 * usuário autenticado e o ID dessa tarefa
 * @function deleteTask
 * @param {string} id ID da tarefa a ser deletada
 */
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

/**
 * Ação indica que tarefa está sendo editada
 * @function editing
 * @return {Object} Objeto Ação do tipo EDIT_TASKS
 */
const editing = () => ({
  type: EDIT_TASKS
});

/**
 * Ação indica que tarefa foi editada com sucesso
 * @function editingSuccess
 * @return {Object} Objeto Ação do tipo EDIT_TASKS_SUCCESS
 */
const editingSuccess = () => ({
  type: EDIT_TASKS_SUCCESS
});

/**
 * Ação indica que ocorreu um erro ao editar a tarefa
 * @function editingError
 * @return {Object} Objeto Ação do tipo EDIT_TASKS_FAIL
 */
const editingError = () => ({
  type: EDIT_TASKS_FAIL
});

/**
 * Altera uma tarefa dado um objeto com o mesmo ID
 * @function editTask
 * @param {module:api/models/task~Task} task Objeto de Tarefa a ser alterado
 */
export const editTask = task => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(editing());
    try {
      const userId = getState().auth.user.id;
      const { selectedList } = getState().list;
      const { id, ...body } = task;
      const response = await PUT({
        url: `/api/user/${userId}/list/${selectedList.id}/task/${id}`,
        auth: {
          token: localStorage.token,
          userid: localStorage.userid
        },
        body
      });
      dispatch(editingSuccess());
      dispatch(changeTask(task));
      resolve(response);
    } catch (e) {
      dispatch(editingError(e));
      reject(e);
    }
  });
