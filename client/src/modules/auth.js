/** @module client/modules/auth */
import { GET, POST, DELETE } from '../lib/request';

/**
 * Actions
 */
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';
const SIGNUP = 'auth/SIGNUP';
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'auth/SIGNUP_FAIL';
const LOADING = 'auth/LOADING';
const LOADING_SUCCESS = 'auth/LOADING_SUCCESS';
const LOADING_FAIL = 'auth/LOADING_FAIL';

/**
 * @namespace Auth Estado da aplicação que envolve a Autenticação
 * @property {boolean} loading Indicador de que está carregando dados do usuário
 * @property {boolean} logginIn Indicador de que está autenticando dados do usuário
 * @property {boolean} logginOut Indicador de que está desautenticando dados do usuário
 * @property {boolean} signingUp Indicador de que está registrando dados do usuário
 * @property {Object} signUpError Erros ao cadastrar usuário
 * @property {Object} loginError Erros ao autenticar usuário
 * @property {Object} logoutError Erros ao deslogar usuário
 * @property {Object} loadingError Erros ao carregar usuário
 * @property {boolean} authenticated Indicador de que usuário está autenticado
 * @property {module:api/models/user~User} user Objeto do usuário autenticado
 */
const initialState = {
  loading: false,
  logginIn: false,
  logginOut: false,
  signingUp: false,
  signUpError: null,
  loginError: null,
  logoutError: null,
  loadingError: null,
  authenticated: false,
  user: {
    id: '',
    username: ''
  }
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        signingUp: true,
        signUpError: null
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        signUpError: null
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        signingUp: false,
        signUpError: action.result
      };

    case LOGIN:
      return {
        ...state,
        logginIn: true,
        loginError: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        logginIn: false,
        authenticated: true,
        user: action.result,
        loginError: null
      };

    case LOGIN_FAIL:
      return {
        ...state,
        logginIn: false,
        authenticated: false,
        user: initialState.user,
        loginError: action.result
      };

    case LOGOUT:
      return {
        ...state,
        logginOut: true
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        logginOut: false,
        authenticated: false,
        user: initialState.user
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        logginOut: false,
        logoutError: action.result
      };
    case LOADING:
      return {
        ...state,
        loading: true,
        loadError: null
      };

    case LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: action.result,
        loadError: null
      };

    case LOADING_FAIL:
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: null,
        loadError: action.result
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */

/**
 * Ação indica que usuário está logando
 * @function logginIn
 * @return {Object} Objeto Ação do tipo LOGIN
 */
const logginIn = () => ({
  type: LOGIN
});

/**
 * Ação indica que usuário se logou com sucesso
 * @function logginIn
 * @param {module:api/models/user~User} user Objeto de usuário que veio da API
 * @return {Object} Objeto Ação do tipo LOGIN_SUCCESS
 */
const logginSuccess = user => ({
  type: LOGIN_SUCCESS,
  result: user
});

/**
 * Ação indica que usuário teve erros ao logar
 * @function logginError
 * @param {Object} error Objeto de erros vindo da api
 * @return {Object} Objeto Ação do tipo LOGIN_FAIL
 */
const logginError = error => ({
  type: LOGIN_FAIL,
  result: error
});

/**
 * Função loga usuário na API salvando token e userid na localstorage
 * Para autenticações futuras
 * @function login
 * @param {Object} user Objeto com informações para login
 * @param {Object} user.username Nome de usuário
 * @param {Object} user.password Senha do usuário
 */
export const login = ({ username, password }) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(logginIn());
    try {
      const response = await POST({
        url: '/api/auth',
        body: { username, password }
      });
      const result = await response.json();
      localStorage.setItem('token', result.token);
      localStorage.setItem('userid', result.user.id);
      dispatch(logginSuccess(result.user));
      resolve(response);
    } catch (e) {
      dispatch(logginError(e));
      localStorage.setItem('token', '');
      localStorage.setItem('userid', '');
      reject(e);
    }
  });

/**
 * Função indica que usuário está deslogando
 * @function logginOut
 * @return {object} Objeto Ação do tipo LOGOUT
 */
const logginOut = () => ({
  type: LOGOUT
});

/**
 * Função indica que usuário deslogou com sucesso
 * @function logoutSuccess
 * @return {object} Objeto Ação do tipo LOGOUT_SUCCESS
 */
const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

/**
 * Função desloga o usuário, deletando seu token e userid
 * no localstorage
 * @function logout
 */
export const logout = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch(logginOut());
  try {
    await DELETE({
      url: '/api/auth',
      auth: { token: localStorage.token, userid: user.id }
    });
    dispatch(logoutSuccess());
    localStorage.setItem('token', '');
    localStorage.setItem('userid', '');
  } catch (e) {
    dispatch(logginError(e));
    localStorage.setItem('token', '');
    localStorage.setItem('userid', '');
  }
};

/**
 * Função indica que usuário está registrando
 * @function signingUp
 * @return {object} Objeto Ação do tipo SIGNUP
 */
const signingUp = () => ({
  type: SIGNUP
});

/**
 * Função indica que usuário se registrando com sucesso
 * @function signingUpSuccess
 * @return {object} Objeto Ação do tipo SIGNUP_SUCCESS
 */
const signingUpSuccess = () => ({
  type: SIGNUP_SUCCESS
});

/**
 * Função indica que usuário teve um erro ao se registrar
 * @function signingUpFail
 * @param {object} error Objeto do erro vindo da API
 * @return {object} Objeto Ação do tipo SIGNUP_FAIL
 */
const signingUpFail = error => ({
  type: SIGNUP_FAIL,
  result: error
});

/**
 * Registra um novo usuário
 * @function signUp
 * @param  {object} body Corpo da requisição para registrar usuário
 * @param  {object} body.username Nome de usuário
 * @param  {object} body.password Senha do usuário
 */
export const signUp = body => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(signingUp());
    try {
      const response = await POST({ url: '/api/user', body });
      dispatch(signingUpSuccess());
      resolve(response);
    } catch (e) {
      dispatch(signingUpFail(e));
      reject(e);
    }
  });

/**
 * Função indica que informações do usuário estão sendo carregadas
 * @function loading
 * @return {object} Objeto Ação do tipo LOADING
 */
const loading = () => ({
  type: LOADING
});

/**
 * Função indica que informações do usuário foram carregadas
 * @function loadingSuccess
 * @return {object} Objeto Ação do tipo LOADING_SUCCESS
 */
const loadingSuccess = user => ({
  type: LOADING_SUCCESS,
  result: user
});

/**
 * Função indica que ocorreu um erro ao carregar informações do usuário
 * @function loadingFail
 * @param {object} error Objeto de erro da Api
 * @return {object} Objeto Ação do tipo LOADING_SUCCESS
 */
const loadingFail = error => ({
  type: LOADING_FAIL,
  result: error
});

/**
 * Carregar informações do usuário logado
 * @function loadUser
 */
export const loadUser = () => async dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(loading());
    try {
      const result = await GET({
        url: '/api/user/me',
        auth: { token: localStorage.token, userid: localStorage.userid }
      });
      const response = await result.json();
      dispatch(loadingSuccess(response));
      resolve(result);
    } catch (e) {
      dispatch(loadingFail(e));
      localStorage.setItem('token', '');
      localStorage.setItem('userid', '');
      reject(e);
    }
  });
