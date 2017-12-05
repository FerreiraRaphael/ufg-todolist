/** @module client/modules/list */
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
const FILTER_BY_ARCHIVED = 'lists/FILTER_BY_ARCHIVED';
const FILTER_BY_UNARCHIVED = 'lists/FILTER_BY_UNARCHIVED';
const FILTER_BY_ALL = 'lists/FILTER_BY_ALL';

/**
 * @namespace List Estado da aplicação que envolve as Listas
 * @property {boolean} fetching Indicador de que está buscando listas
 * @property {Object} fetchingError Erros ao buscar listas
 * @property {boolean} creating Indicador de que está criando listas
 * @property {Object} creatingError Erros ao criar listas
 * @property {boolean} editing Indicador de que está editando listas
 * @property {Object} editingError Erros ao editar listas
 * @property {boolean} deleting Indicador de que está deletando listas
 * @property {Object} deletingError Erros ao deletar listas
 * @property {module:api/models/list~List[]} lists Array das listas na aplicação
 * @property {string} filter Filtro que está sendo usado na lista de listas
 * @property {module:api/models/list~List} selectedList Lista selecionada na Aplicação
 */
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
  filter: 'UNARCHIVED',
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
 * Ação adiciona uma lista para as listas
 * @function addLists
 * @param {module:api/models/list~List} lists Lista a ser adicionada
 * @return {Object} Objeto Ação do tipo ADD_LISTS
 */
const addLists = lists => ({
  type: ADD_LISTS,
  result: lists
});

/**
 * Ação edita uma lista
 * @function changeList
 * @param {module:api/models/list~List} list Lista a ser mudada
 * @return {Object} Objeto Ação do tipo CHANGE_LIST
 */
const changeList = list => ({
  type: CHANGE_LIST,
  result: list
});

/**
 * Ação remove uma lista
 * @function removeList
 * @param {string} listId ID da Lista a ser removida
 * @return {Object} Objeto Ação do tipo REMOVE_LIST
 */
const removeList = listId => ({
  type: REMOVE_LIST,
  result: listId
});

/**
 * Seleciona uma lista na aplicação
 * @function selectList
 * @param {string} listId ID da Lista a ser selecionada
 * @return {Object} Objeto Ação do tipo SELECT_LIST
 */
export const selectList = listId => ({
  type: SELECT_LIST,
  result: listId
});

/**
 * Ação indica que listas estão sendo buscadas
 * @function fetching
 * @return {Object} Objeto Ação do tipo FETCH_LISTS
 */
const fetching = () => ({
  type: FETCH_LISTS
});

/**
 * Ação indica que listas foram buscadas com sucesso e
 * adiciona listas vindas do server no estado da aplicação
 * @function fetchingSuccess
 * @param {module:api/models/list~List[]} lists Listas buscadas
 * @return {Object} Objeto Ação do tipo FETCH_LISTS_SUCCESS
 */
const fetchingSuccess = lists => ({
  type: FETCH_LISTS_SUCCESS,
  result: lists
});

/**
 * Ação indica que ouve um erro ao buscar as listas
 * @function fetchingError
 * @param {object} error Erro da Api
 * @return {Object} Objeto Ação do tipo FETCH_LISTS_FAIL
 */
const fetchingError = error => ({
  type: FETCH_LISTS_FAIL,
  result: error
});

/**
 * Função busca as listas do usuário logado
 * @function fetchLists
 */
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

/**
 * Ação indica que lista está sendo criada
 * @function creating
 * @return {Object} Objeto Ação do tipo CREATE_LIST
 */
const creating = () => ({
  type: CREATE_LIST
});

/**
 * Ação indica que lista foi criada com sucesso
 * @function creatingSuccess
 * @return {Object} Objeto Ação do tipo CREATE_LIST_SUCCESS
 */
const creatingSuccess = () => ({
  type: CREATE_LIST_SUCCESS
});

/**
 * Ação indica que houve um erro ao criar a lista
 * @function creatingFail
 * @return {Object} Objeto Ação do tipo CREATE_LIST_FAIL
 */
const creatingFail = () => ({
  type: CREATE_LIST_FAIL
});

/**
 * Criar uma lista para o usuário logado
 * @function create
 * @param {object} body Corpo da requisição
 * @param {object} body.title Titulo da lista
 */
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

/**
 * Ação indica que lista está sendo deletada
 * @function deleting
 * @return {Object} Objeto Ação do tipo DELETE_LIST
 */
const deleting = () => ({
  type: DELETE_LIST
});

/**
 * Ação indica que lista foi deletada com sucesso
 * @function deletingSuccess
 * @return {Object} Objeto Ação do tipo DELETE_LIST_SUCCESS
 */
const deletingSuccess = () => ({
  type: DELETE_LIST_SUCCESS
});

/**
 * Ação indica que houve um erro ao deletar lista
 * @function deletingFail
 * @return {Object} Objeto Ação do tipo DELETE_LIST_FAIL
 */
const deletingFail = () => ({
  type: DELETE_LIST_FAIL
});

/**
 * Deleta lista dado um id de uma lista
 * @function deleteList
 * @param  {string} id ID da lista a ser deletada
 */
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

/**
 * Ação indica que lista está sendo editada
 * @function editing
 * @return {Object} Objeto Ação do tipo EDIT_LIST
 */
const editing = () => ({
  type: EDIT_LIST
});

/**
 * Ação indica que lista foi editada com sucesso
 * @function editingSuccess
 * @return {Object} Objeto Ação do tipo EDIT_LIST_SUCCESS
 */
const editingSuccess = () => ({
  type: EDIT_LIST_SUCCESS
});

/**
 * Ação indica que houve um erro ao editar lista
 * @function editingFail
 * @param {object} error Objeto de erro da api
 * @return {Object} Objeto Ação do tipo EDIT_LIST_FAIL
 */
const editingFail = error => ({
  type: EDIT_LIST_FAIL,
  result: error
});

/**
 * Edita uma lista e salva a mesma nas listas do estado da splicação
 * @function editList
 * @param {module:api/models/list~List} list Objeto de lista a ser editado
 */
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
