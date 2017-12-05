/** @module client/modules/activity */

import { GET } from '../lib/request';

/**
 * Actions
 */

const FETCH_ACTIVITIES = 'activities/FETCH_ACTIVITIES';
const FETCH_ACTIVITIES_SUCCESS = 'activities/FETCH_ACTIVITIES_SUCCESS';
const FETCH_ACTIVITIES_FAIL = 'activities/FETCH_ACTIVITIES_FAIL';

/**
 * @namespace Activity Estado da aplicação que envolve as Atividades
 * @property {boolean} fetching Indicador de que está buscando atividades
 * @property {Object} fetchingError Erros ao buscar atividades
 * @property {module:api/models/activity~Activity[]} activities Array das atividades na aplicação
 */
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

/**
 * Função indica que aplicação está procurando por atividades
 * @function fetching
 * @return {Object} Ação de FETCH_ACTIVITIES
 */
const fetching = () => ({
  type: FETCH_ACTIVITIES
});

/**
 * Função indica que aplicação buscou atividades com sucesso
 * @function fetchingSuccess
 * @param  {module:api/models/activity~Activity[]} activities Atividades que vieram do servidor
 * @return {Object} Ação do tipo FETCH_ACTIVITIES_SUCCESS
 */
const fetchingSuccess = activities => ({
  type: FETCH_ACTIVITIES_SUCCESS,
  result: activities
});

/**
 * Função indica que aplicação falhou a buscar atividades
 * @function fetchingError
 * @param  {Object} error Erro que veio do servidor
 * @return {Object} Ação do tipo FETCH_ACTIVITIES_FAIL
 */
const fetchingError = error => ({
  type: FETCH_ACTIVITIES_FAIL,
  result: error
});

/**
 * Função buscar atividades apartir de um ListId
 * @function fetchActivities
 * @param  {sting} listId Id da lista para procurar atividades
 */
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
