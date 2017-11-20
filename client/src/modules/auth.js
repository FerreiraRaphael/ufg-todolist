import { POST, DELETE } from '../lib/request';

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

const initialState = {
  logginIn: false,
  logginOut: false,
  signingUp: false,
  signUpError: null,
  loginError: null,
  logoutError: null,
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
        user: action.result,
        loginError: null
      };

    case LOGIN_FAIL:
      return {
        ...state,
        logginIn: false,
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
        user: initialState.user
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        logginOut: false,
        logoutError: action.result
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

export const login = ({ username, password }) => async dispatch => {
  dispatch(logginIn());
  try {
    const result = await POST({ url: 'auth', body: { username, password } });
    dispatch(logginSuccess(result.data.user));
    localStorage.setItem('token', result.data.token);
  } catch (e) {
    dispatch(logginError(e));
    localStorage.setItem('token', '');
  }
};

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
      url: 'auth',
      auth: { token: localStorage.token, userid: user.id }
    });
    dispatch(logoutSuccess());
    localStorage.setItem('token', '');
  } catch (e) {
    dispatch(logginError(e));
    localStorage.setItem('token', '');
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

export const signUp = body => async dispatch => {
  dispatch(signingUp());
  try {
    await POST({ url: 'user', body });
    dispatch(signingUpSuccess());
  } catch (e) {
    dispatch(signingUpFail(e));
  }
};
