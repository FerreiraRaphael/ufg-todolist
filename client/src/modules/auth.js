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
const logginIn = () => ({
  type: LOGIN
});

const logginSuccess = user => ({
  type: LOGIN_SUCCESS,
  result: user
});

const logginError = error => ({
  type: LOGIN_FAIL,
  result: error
});

export const login = ({ username, password }) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(logginIn());
    try {
      const response = await POST({
        url: 'api/auth',
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

const logginOut = () => ({
  type: LOGOUT
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

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

const signingUp = () => ({
  type: SIGNUP
});

const signingUpSuccess = () => ({
  type: SIGNUP_SUCCESS
});

const signingUpFail = error => ({
  type: SIGNUP_FAIL,
  result: error
});

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

const loading = () => ({
  type: LOADING
});

const loadingSuccess = user => ({
  type: LOADING_SUCCESS,
  result: user
});

const loadingFail = error => ({
  type: LOADING_FAIL,
  result: error
});

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
